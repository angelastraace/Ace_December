// engine/treasury/distribute.ts
import { ethers } from "ethers";
import { logFunding } from "../db/funding";
import { TOKENS } from "../config/tokens";
import { createClient } from "@supabase/supabase-js";

/**
 * Treasury engine: fundUser(...)
 *
 * Important:
 * - Written for ethers v6 (parseUnits / balanceOf etc. return bigint)
 * - Returns canonical shape:
 *   { success: boolean, txHash?: string, adminWallet?: string, reason?: string, meta?: any }
 *
 * NOTE: This file intentionally tolerates missing Supabase env vars.
 * Audit logging will run only when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set.
 */

/* ---------- ENV + supabase client (optional) ---------- */

const SUPABASE_URL = process.env.SUPABASE_URL ?? null;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? null;
const ENGINE_RPC = process.env.ETHEREUM_RPC_URL!;
const TREASURY_PK = process.env.ADMIN_WALLET_PRIVATE_KEY!;

let supabase: ReturnType<typeof createClient> | null = null;
if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
} else {
  // don't throw — let engine run without audit logging in dev if desired
  supabase = null;
}

/* ---------- Types ---------- */

type FundingSource = "treasury" | "lp-position" | "swap-then-send";

type FundUserParams = {
  userWallet: `0x${string}`;
  tokenSymbol: string; // symbol of token user should receive, e.g. "USDC" or "WETH" or "ACE"
  amount: string; // human amount, e.g. "50.5"
  source?: FundingSource;
  reason?: string;
  campaignId?: string | null;
  preferredLpId?: string | null;
  idempotencyKey?: string | null;
};

type EngineResult =
  | { success: true; txHash?: string; adminWallet?: string; meta?: any }
  | { success: false; reason: string; meta?: any };

/* ---------- Helpers ---------- */

function toBigIntUnits(amountStr: string, decimals: number): bigint {
  // parseUnits returns bigint in ethers v6
  return ethers.parseUnits(amountStr, decimals);
}

function isHexAddress(addr: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(addr);
}

/* ---------- Public API ---------- */

export async function fundUser(params: FundUserParams): Promise<EngineResult> {
  const source = params.source ?? "treasury";

  try {
    if (!params.userWallet || !isHexAddress(params.userWallet)) {
      return { success: false, reason: "Invalid userWallet address" };
    }
    if (!params.tokenSymbol || !TOKENS[params.tokenSymbol]) {
      return { success: false, reason: "Unsupported tokenSymbol" };
    }

    if (!params.amount || isNaN(Number(params.amount)) || Number(params.amount) <= 0) {
      return { success: false, reason: "Invalid amount" };
    }

    if (source === "treasury") {
      return await fundFromTreasury(params);
    }

    if (source === "lp-position") {
      const collected = await tryCollectFromLPAndSend(params);
      if (collected.sent && collected.result) return { success: true, txHash: collected.result.txHash, adminWallet: collected.result.adminWallet, meta: collected.result.meta ?? null };
      // fallback to swap-then-send
      return await fundFromSwapThenSend(params);
    }

    if (source === "swap-then-send") {
      return await fundFromSwapThenSend(params);
    }

    return { success: false, reason: `Unsupported source: ${source}` };
  } catch (err: any) {
    console.error("[fundUser] unexpected error:", err);
    return { success: false, reason: err?.message ?? "unexpected error" };
  }
}

/* ---------- Implementation: treasury transfer ---------- */

async function fundFromTreasury(params: FundUserParams): Promise<EngineResult> {
  try {
    const provider = new ethers.JsonRpcProvider(ENGINE_RPC);
    const wallet = new ethers.Wallet(TREASURY_PK, provider);

    const tokenMeta = TOKENS[params.tokenSymbol];
    if (!tokenMeta) return { success: false, reason: "Unsupported token" };

    const amountRaw = toBigIntUnits(params.amount, tokenMeta.decimals);

    const erc20 = new ethers.Contract(tokenMeta.address, ["function transfer(address to, uint256 amount) returns (bool)"], wallet);

    const tx = await erc20.transfer(params.userWallet, amountRaw);
    const receipt = await tx.wait();

    // ensure logFunding resolves or at least is awaited to avoid race conditions
    try {
      await logFunding({
        adminWallet: wallet.address,
        userWallet: params.userWallet,
        network: "ethereum",
        tokenSymbol: tokenMeta.symbol,
        tokenAddress: tokenMeta.address,
        amount: params.amount,
        amountRaw: amountRaw.toString(),
        source: "treasury",
        txHash: receipt.transactionHash,
        reason: params.reason,
        campaignId: params.campaignId ?? null,
        meta: null,
      });
    } catch (logErr) {
      console.warn("[fundFromTreasury] logFunding failed:", logErr);
    }

    // optional audit log in supabase (best-effort)
    if (supabase) {
      try {
        await supabase.from("admin_onchain_transfers").insert({
          idempotency_key: params.idempotencyKey ?? null,
          token_symbol: tokenMeta.symbol,
          amount: params.amount,
          amount_raw: amountRaw.toString(),
          user_wallet: params.userWallet,
          admin_wallet: wallet.address,
          tx_hash: receipt.transactionHash,
          source: "treasury",
          meta: null,
          created_at: new Date().toISOString(),
        });
      } catch (sbErr) {
        console.warn("[fundFromTreasury] supabase audit failed", sbErr);
      }
    }

    return { success: true, txHash: receipt.transactionHash, adminWallet: wallet.address };
  } catch (err: any) {
    console.error("[fundFromTreasury] error:", err);
    return { success: false, reason: err?.message ?? "treasury transfer failed" };
  }
}

/* ---------- Implementation: try collect fees from LP NFT positions ---------- */

/**
 * Attempt to collect fees from treasury-owned LP positions and send desired token to user.
 * Returns { sent: boolean, result?: { txHash, adminWallet, meta } }
 */
async function tryCollectFromLPAndSend(params: FundUserParams): Promise<{ sent: boolean; result?: { txHash?: string; adminWallet?: string; meta?: any } } | { sent: false }> {
  try {
    if (!supabase) {
      // no supabase -> cannot query lp_positions table
      console.warn("[tryCollectFromLPAndSend] supabase client not configured. skipping LP path.");
      return { sent: false };
    }

    // query LP positions owned by treasury (owner address)
    const treasuryAddress = (new ethers.Wallet(TREASURY_PK)).address;
    const { data: positions, error } = await supabase
      .from("lp_positions")
      .select("*")
      .eq("owner", treasuryAddress)
      .eq("status", "active")
      .limit(20);

    if (error) {
      console.warn("[tryCollectFromLPAndSend] supabase lp_positions query error", error);
      return { sent: false };
    }
    if (!positions || positions.length === 0) {
      return { sent: false };
    }

    const provider = new ethers.JsonRpcProvider(ENGINE_RPC);
    const wallet = new ethers.Wallet(TREASURY_PK, provider);

    // Uniswap V3 NonfungiblePositionManager
    const NFPM_ADDRESS = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
    const NFPM_ABI = [
      "function collect((uint256 tokenId,address recipient,uint128 amount0Max,uint128 amount1Max)) payable returns (uint256 amount0, uint256 amount1)"
    ];
    const nfpm = new ethers.Contract(NFPM_ADDRESS, NFPM_ABI, wallet);

    const desiredMeta = TOKENS[params.tokenSymbol];
    if (!desiredMeta) return { sent: false };

    // Snapshot balances before collect so we compute deltas.
    const tokensToSnapshot = new Set<string>();
    for (const pos of positions as any[]) {
      if (params.preferredLpId && params.preferredLpId !== pos.id) continue;
      if (pos.token0) tokensToSnapshot.add(pos.token0);
      if (pos.token1) tokensToSnapshot.add(pos.token1);
    }
    // also include desired token address
    tokensToSnapshot.add(desiredMeta.address);

    // helper contract for balanceOf
    const erc20abi = ["function balanceOf(address) view returns (uint256)"];
    const snapshotBefore: Record<string, bigint> = {};
    for (const tokenAddr of Array.from(tokensToSnapshot)) {
      try {
        const c = new ethers.Contract(tokenAddr, erc20abi, provider);
        const b: bigint = await c.balanceOf(wallet.address);
        snapshotBefore[tokenAddr] = b;
      } catch (e) {
        snapshotBefore[tokenAddr] = 0n;
      }
    }

    // collect loop - best-effort
    for (const pos of positions as any[]) {
      if (params.preferredLpId && params.preferredLpId !== pos.id) continue;

      try {
        const tokenId = Number(pos.nft_token_id);
        if (!Number.isFinite(tokenId)) continue;

        const max128 = (1n << 128n) - 1n; // 2^128-1

        // call collect. If contract returns values, great; otherwise rely on balance diff
        const tx = await nfpm.collect({
          tokenId,
          recipient: wallet.address,
          amount0Max: max128.toString(),
          amount1Max: max128.toString()
        }, { gasLimit: 500000 });
        await tx.wait();
      } catch (e: any) {
        console.warn("[tryCollectFromLPAndSend] collect failed for pos", pos.id, e?.message ?? e);
        // continue to next position
      }
    }

    // Snapshot after collect
    const snapshotAfter: Record<string, bigint> = {};
    for (const tokenAddr of Array.from(tokensToSnapshot)) {
      try {
        const c = new ethers.Contract(tokenAddr, erc20abi, provider);
        const b: bigint = await c.balanceOf(wallet.address);
        snapshotAfter[tokenAddr] = b;
      } catch (e) {
        snapshotAfter[tokenAddr] = 0n;
      }
    }

    // compute deltas and (optionally) swap non-desired tokens to desired token
    let desiredDecimals = desiredMeta.decimals;
    const desiredAddr = desiredMeta.address;
    const deltaDesired = (snapshotAfter[desiredAddr] ?? 0n) - (snapshotBefore[desiredAddr] ?? 0n);

    // If idle treasury already held desired tokens (before snapshot) those are also counted later when checking balance.
    // Now check if treasury total desired balance >= requested amount
    const desiredTokenContract = new ethers.Contract(desiredAddr, erc20abi, provider);
    const treasuryBalanceDesired: bigint = await desiredTokenContract.balanceOf(wallet.address);
    const desiredAmountRaw = toBigIntUnits(params.amount, desiredDecimals);

    if (treasuryBalanceDesired >= desiredAmountRaw) {
      // transfer desired token to user
      const erc20 = new ethers.Contract(desiredAddr, ["function transfer(address,uint256) returns (bool)"], wallet);
      const sendTx = await erc20.transfer(params.userWallet, desiredAmountRaw);
      const sendReceipt = await sendTx.wait();

      // log
      try {
        await logFunding({
          adminWallet: wallet.address,
          userWallet: params.userWallet,
          network: "ethereum",
          tokenSymbol: desiredMeta.symbol,
          tokenAddress: desiredAddr,
          amount: params.amount,
          amountRaw: desiredAmountRaw.toString(),
          source: "lp-position",
          txHash: sendReceipt.transactionHash,
          reason: params.reason,
          campaignId: params.campaignId ?? null,
          meta: { collectedDeltaDesired: deltaDesired.toString() },
        });
      } catch (logErr) {
        console.warn("[tryCollectFromLPAndSend] logFunding failed:", logErr);
      }

      // supabase audit
      if (supabase) {
        try {
          await supabase.from("admin_onchain_transfers").insert({
            idempotency_key: params.idempotencyKey ?? null,
            token_symbol: desiredMeta.symbol,
            amount: params.amount,
            amount_raw: desiredAmountRaw.toString(),
            user_wallet: params.userWallet,
            admin_wallet: wallet.address,
            tx_hash: sendReceipt.transactionHash,
            source: "lp-position",
            meta: JSON.stringify({ collectedDeltaDesired: deltaDesired.toString() }),
            created_at: new Date().toISOString(),
          });
        } catch (sbErr) {
          console.warn("[tryCollectFromLPAndSend] supabase insert failed", sbErr);
        }
      }

      return { sent: true, result: { txHash: sendReceipt.transactionHash, adminWallet: wallet.address, meta: { collectedDeltaDesired: deltaDesired.toString() } } };
    }

    // Not enough desired tokens after collects; fallback
    return { sent: false };
  } catch (err: any) {
    console.error("[tryCollectFromLPAndSend] unexpected error", err);
    return { sent: false };
  }
}

/* ---------- Implementation: swap then send ---------- */

async function fundFromSwapThenSend(params: FundUserParams): Promise<EngineResult> {
  try {
    const provider = new ethers.JsonRpcProvider(ENGINE_RPC);
    const wallet = new ethers.Wallet(TREASURY_PK, provider);

    const desiredMeta = TOKENS[params.tokenSymbol];
    if (!desiredMeta) return { success: false, reason: "Unsupported desired token" };

    // Choose source token to swap from (configurable). Default to USDC if available
    const sourceTokenMeta = TOKENS["USDC"] ?? Object.values(TOKENS)[0];
    if (!sourceTokenMeta) return { success: false, reason: "Source token not configured" };

    const desiredAmountRaw = toBigIntUnits(params.amount, desiredMeta.decimals);

    // NOTE: This implementation is functional but NOT PRODUCTION SAFE:
    // - amountOutMinimum is 0 (unsafe against sandwich attacks/slippage)
    // - you'd want to compute exact expected amountOut using an oracle or prior on-chain quote
    // - route selection (pool fee) should be dynamic
    // Keep meta to help debug
    const meta: Record<string, any> = {};

    // Approve router to spend source token
    const SWAP_ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
    const SWAP_ROUTER_ABI = [
      "function exactInputSingle(tuple(address tokenIn,address tokenOut,uint24 fee,address recipient,uint256 deadline,uint256 amountIn,uint256 amountOutMinimum,uint160 sqrtPriceLimitX96)) payable returns (uint256 amountOut)"
    ];
    const swapRouter = new ethers.Contract(SWAP_ROUTER, SWAP_ROUTER_ABI, wallet);

    // compute amountIn conservatively: use same numeric amount in source decimals (NOT accurate).
    // TODO: replace with on-chain quote or price oracle to compute proper amountIn/amountOutMinimum
    const amountIn = toBigIntUnits(params.amount, sourceTokenMeta.decimals);

    const erc20in = new ethers.Contract(sourceTokenMeta.address, ["function approve(address,uint256) returns (bool)"], wallet);
    const approveTx = await erc20in.approve(SWAP_ROUTER, amountIn);
    await approveTx.wait();

    // default pool fee - choose appropriate value in production (500, 3000 etc.)
    const fee = 500;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 5;

    const paramsSwap = {
      tokenIn: sourceTokenMeta.address,
      tokenOut: desiredMeta.address,
      fee,
      recipient: wallet.address,
      deadline,
      amountIn,
      amountOutMinimum: 0n, // WARNING: must be replaced with safe minimum
      sqrtPriceLimitX96: 0n,
    };

    meta.swapParams = { amountIn: amountIn.toString(), tokenIn: sourceTokenMeta.address, tokenOut: desiredMeta.address };

    const tx = await swapRouter.exactInputSingle(paramsSwap, { gasLimit: 900000 });
    const receipt = await tx.wait();

    // After swap, check treasury balance of desired token
    const desiredErc20 = new ethers.Contract(desiredMeta.address, ["function balanceOf(address) view returns (uint256)","function transfer(address,uint256) returns (bool)"], wallet);
    const balance: bigint = await desiredErc20.balanceOf(wallet.address);

    if (balance < desiredAmountRaw) {
      // Swap didn't return enough - return failure with meta
      return { success: false, reason: "Swap produced insufficient amount", meta: { swapTx: receipt.transactionHash, balance: balance.toString(), desiredAmountRaw: desiredAmountRaw.toString() } };
    }

    const sendTx = await desiredErc20.transfer(params.userWallet, desiredAmountRaw);
    const sendReceipt = await sendTx.wait();

    // log
    try {
      await logFunding({
        adminWallet: wallet.address,
        userWallet: params.userWallet,
        network: "ethereum",
        tokenSymbol: desiredMeta.symbol,
        tokenAddress: desiredMeta.address,
        amount: params.amount,
        amountRaw: desiredAmountRaw.toString(),
        source: "swap-then-send",
        txHash: sendReceipt.transactionHash,
        reason: params.reason,
        campaignId: params.campaignId ?? null,
        meta: { swapTx: receipt.transactionHash },
      });
    } catch (logErr) {
      console.warn("[fundFromSwapThenSend] logFunding failed:", logErr);
    }

    if (supabase) {
      try {
        await supabase.from("admin_onchain_transfers").insert({
          idempotency_key: params.idempotencyKey ?? null,
          token_symbol: desiredMeta.symbol,
          amount: params.amount,
          amount_raw: desiredAmountRaw.toString(),
          user_wallet: params.userWallet,
          admin_wallet: wallet.address,
          tx_hash: sendReceipt.transactionHash,
          source: "swap-then-send",
          meta: JSON.stringify({ swapTx: receipt.transactionHash }),
          created_at: new Date().toISOString(),
        });
      } catch (sbErr) {
        console.warn("[fundFromSwapThenSend] supabase insert failed", sbErr);
      }
    }

    return { success: true, txHash: sendReceipt.transactionHash, adminWallet: wallet.address, meta: { swapTx: receipt.transactionHash } };
  } catch (err: any) {
    console.error("[fundFromSwapThenSend] error:", err);
    return { success: false, reason: err?.message ?? "swap-then-send failed" };
  }
}
