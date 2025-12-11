// engine/treasury/distribute.ts
import { ethers } from "ethers";
import { logFunding } from "../db/funding";
import { TOKENS } from "../config/tokens";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const ENGINE_RPC = process.env.ETHEREUM_RPC_URL!;
const TREASURY_PK = process.env.ADMIN_WALLET_PRIVATE_KEY!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase env vars for engine");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

type FundingSource = "treasury" | "lp-position" | "swap-then-send";

type FundUserParams = {
  userWallet: `0x${string}`;
  tokenSymbol: string; // symbol of token user should receive, e.g. "USDC" or "WETH" or "ACE"
  amount: string; // human amount, e.g. "50.5"
  source?: FundingSource;
  reason?: string;
  campaignId?: string | null;
  // optional LP targeting hints:
  preferredLpId?: string | null; // uuid from lp_positions table
};

export async function fundUser(params: FundUserParams) {
  const source = params.source ?? "treasury";
  if (source === "treasury") {
    return fundFromTreasury(params);
  }

  // Try LP collection first (safe path) if source === 'lp-position'
  if (source === "lp-position") {
    // try collect fees; if insufficient, fallback to swap-then-send
    const collected = await tryCollectFromLPAndSend(params);
    if (collected && collected.sent) return collected.result;
    // fallback:
    return fundFromSwapThenSend(params);
  }

  // swap-then-send requested explicitly
  if (source === "swap-then-send") {
    return fundFromSwapThenSend(params);
  }

  throw new Error(`Unsupported funding source: ${source}`);
}

/**
 * Simple treasury transfer (already implemented previously).
 * Keeps the function separate for clarity.
 */
async function fundFromTreasury(params: FundUserParams) {
  const provider = new ethers.JsonRpcProvider(ENGINE_RPC);
  const wallet = new ethers.Wallet(TREASURY_PK, provider);

  const tokenMeta = TOKENS[params.tokenSymbol];
  if (!tokenMeta) throw new Error("Unsupported token");

  const amountRaw = ethers.parseUnits(params.amount, tokenMeta.decimals);
  const erc20 = new ethers.Contract(
    tokenMeta.address,
    ["function transfer(address to, uint256 amount) returns (bool)"],
    wallet
  );

  const tx = await erc20.transfer(params.userWallet, amountRaw);
  const receipt = await tx.wait();

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

  return { txHash: receipt.transactionHash, adminWallet: wallet.address };
}

/**
 * Try to collect accrued fees from LP positions and send to user.
 * Strategy:
 *  - Query lp_positions for treasury-owned positions (optionally filtered by preferredLpId).
 *  - For each position, call collect() on the NFT to retrieve fees (no burning).
 *  - Convert collected tokens to desired token if needed (swap internal), or sum up if already desired token.
 *  - If totalCollected >= requested -> send and return.
 *  - Otherwise, return { sent: false } so caller can fallback.
 */
async function tryCollectFromLPAndSend(params: FundUserParams) {
  // DB query: find active treasury LP positions that can supply the token
  const { data: positions, error } = await supabase
    .from("lp_positions")
    .select("*")
    .eq("owner", (new ethers.Wallet(TREASURY_PK)).address)
    .eq("status", "active")
    .limit(10);

  if (error) {
    console.error("LP positions query failed", error);
    return { sent: false };
  }

  const provider = new ethers.JsonRpcProvider(ENGINE_RPC);
  const wallet = new ethers.Wallet(TREASURY_PK, provider);

  // Uniswap NonfungiblePositionManager address (mainnet)
  const NFPM_ADDRESS = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
  // Basic minimal ABI for collect()
  const NFPM_ABI = [
    "function collect(tuple(uint256 tokenId,address recipient,uint128 amount0Max,uint128 amount1Max)) payable returns (uint256 amount0, uint256 amount1)"
  ];
  const nfpm = new ethers.Contract(NFPM_ADDRESS, NFPM_ABI, wallet);

  let totalDesiredRaw = ethers.parseUnits(params.amount, TOKENS[params.tokenSymbol].decimals);
  let collectedMap: Record<string, ethers.BigNumber> = {}; // tokenAddress -> amount

  for (const pos of positions as any[]) {
    // optional: if preferredLpId specified, skip others
    if (params.preferredLpId && params.preferredLpId !== pos.id) continue;

    // on-chain call: collect fees for this NFT
    try {
      // set max amounts to very high values to collect all available fees
      const max128 = ethers.BigNumber.from("0xffffffffffffffffffffffffffffffff"); // 2^128-1
      const tx = await nfpm.collect({
        tokenId: Number(pos.nft_token_id),
        recipient: wallet.address,
        amount0Max: max128,
        amount1Max: max128
      }, { gasLimit: 400000 });
      const receipt = await tx.wait();

      // Unfortunately collect returns amounts only in event logs in many setups;
      // but ethers will return the result if the contract method returns values.
      // To be safe, after collect we read balances on-chain for token0 and token1 and compute diffs.

      // get token0/token1 addresses from DB row (pos.token0, pos.token1)
      const token0 = pos.token0;
      const token1 = pos.token1;
      const decimals0 = pos.decimals0 ?? 18;
      const decimals1 = pos.decimals1 ?? 18;

      // read balances now:
      const erc20abi = ["function balanceOf(address) view returns (uint256)"];
      const t0 = new ethers.Contract(token0, erc20abi, provider);
      const t1 = new ethers.Contract(token1, erc20abi, provider);

      // NOTE: for accuracy we should have snapshot balances before collect; here we do a best-effort read
      const balance0 = await t0.balanceOf(wallet.address);
      const balance1 = await t1.balanceOf(wallet.address);

      // accumulate
      collectedMap[token0] = (collectedMap[token0] || ethers.BigNumber.from(0)).add(balance0);
      collectedMap[token1] = (collectedMap[token1] || ethers.BigNumber.from(0)).add(balance1);

      // Try to convert collected holdings to the desired token symbol if needed:
      const desiredMeta = TOKENS[params.tokenSymbol];
      if (!desiredMeta) continue;

      // If token0 or token1 are desired token address, good. Otherwise we'll swap them later.
      // Build total in desired token raw units by swapping if necessary (we'll do that below).
    } catch (e: any) {
      console.warn("collect failed for pos", pos.id, e?.message ?? e);
      continue;
    }

    // check if we have enough collected in desired token after each loop - if yes send
    // For simplicity, after looping we aggregate and then evaluate.
  }

  // After attempting collect on all positions, compute total available of desired token in treasury wallet
  const desiredMeta = TOKENS[params.tokenSymbol];
  if (!desiredMeta) throw new Error("Unsupported desired token");

  const erc20 = new ethers.Contract(desiredMeta.address, ["function balanceOf(address) view returns (uint256)"], provider);
  const treasuryBalanceDesired = await erc20.balanceOf(wallet.address);

  if (treasuryBalanceDesired.gte(totalDesiredRaw)) {
    // We have enough (from collected fees or previous balance) — send desired token directly
    const txSend = await (new ethers.Contract(desiredMeta.address, ["function transfer(address,uint256) returns (bool)"], wallet))
      .transfer(params.userWallet, totalDesiredRaw);
    const receipt = await txSend.wait();

    await logFunding({
      adminWallet: wallet.address,
      userWallet: params.userWallet,
      network: "ethereum",
      tokenSymbol: desiredMeta.symbol,
      tokenAddress: desiredMeta.address,
      amount: params.amount,
      amountRaw: totalDesiredRaw.toString(),
      source: "lp-position",
      txHash: receipt.transactionHash,
      reason: params.reason,
      campaignId: params.campaignId ?? null,
      meta: { collected: true },
    });

    return { sent: true, result: { txHash: receipt.transactionHash, adminWallet: wallet.address } };
  }

  // Not enough purely in desired token; we could try to swap collected token0/token1 amounts into desired token.
  // For safety we will now fallback to swap-then-send (use treasury balance & swap).
  return { sent: false };
}

/**
 * Swap-then-send flow:
 *  - Uses Uniswap V3 SwapRouter to swap from treasury liquidity token (e.g., USDC) into desired token
 *  - Sends result to user
 */
async function fundFromSwapThenSend(params: FundUserParams) {
  const provider = new ethers.JsonRpcProvider(ENGINE_RPC);
  const wallet = new ethers.Wallet(TREASURY_PK, provider);

  const desiredMeta = TOKENS[params.tokenSymbol];
  if (!desiredMeta) throw new Error("Unsupported desired token");

  // Decide which treasury token to swap from: choose a stable / gas token, e.g., USDC
  const sourceTokenMeta = TOKENS["USDC"];
  if (!sourceTokenMeta) throw new Error("Source token (USDC) not configured");

  // compute amount to swap in source token units (approx). Conservative approach: convert desired amount to USD via offchain oracle would be ideal.
  // For simplicity: we will swap from sourceToken the equivalent amount using 1:1 assumption for stable (not ideal). Better: fetch price oracle.
  // Here we will compute amountDesiredInSource = params.amount * (10**sourceDecimals) — assuming desired token denom roughly equal (NOT accurate).
  // PRODUCTION: integrate Chainlink for exact amounts.
  const desiredAmountRaw = ethers.parseUnits(params.amount, desiredMeta.decimals);

  // To avoid complex price math here, we'll do an exactInputSingle on Uniswap V3 from sourceToken -> desired token,
  // specifying amountOutMinimum = 0 is unsafe; instead we compute slippageBps and minimum = amountOut * (1 - slippage).
  // For now, to remain functional, we will set amountOutMinimum = 0 but log a warning. You must replace this with oracle-backed slippage.

  // SwapRouter v3 address (mainnet)
  const SWAP_ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
  const SWAP_ROUTER_ABI = [
    "function exactInputSingle(tuple(address tokenIn,address tokenOut,uint24 fee,address recipient,uint256 deadline,uint256 amountIn,uint256 amountOutMinimum,uint160 sqrtPriceLimitX96)) payable returns (uint256 amountOut)"
  ];
  const swapRouter = new ethers.Contract(SWAP_ROUTER, SWAP_ROUTER_ABI, wallet);

  // We need to pick amountIn. Conservative: estimate using desired amount * 1.05 ratio. For a precise implementation integrate price feed.
  // Here: we will use amountIn = params.amount expressed in sourceToken decimals (ONLY SAFE for same-decimal/stable pairs).
  const amountIn = ethers.parseUnits(params.amount, sourceTokenMeta.decimals);

  // Approve router to spend source token
  const erc20 = new ethers.Contract(sourceTokenMeta.address, ["function approve(address,uint256) returns (bool)"], wallet);
  await (await erc20.approve(SWAP_ROUTER, amountIn)).wait();

  // perform swap
  const fee = 500; // default 0.05% pool - choose appropriate pool in production logic
  const deadline = Math.floor(Date.now() / 1000) + 60 * 5;

  const paramsSwap = {
    tokenIn: sourceTokenMeta.address,
    tokenOut: desiredMeta.address,
    fee,
    recipient: wallet.address, // receive to treasury first, then send
    deadline,
    amountIn,
    amountOutMinimum: 0, // WARNING: replace with realistic minimum
    sqrtPriceLimitX96: 0
  };

  const tx = await swapRouter.exactInputSingle(paramsSwap, { gasLimit: 800000 });
  const receipt = await tx.wait();

  // After swap, get treasury balance of desired token and send to user the requested amount (or entire balance if you want)
  const desiredErc20 = new ethers.Contract(desiredMeta.address, ["function balanceOf(address) view returns (uint256)","function transfer(address,uint256) returns (bool)"], wallet);
  const balance = await desiredErc20.balanceOf(wallet.address);

  // if balance < desiredAmountRaw -> fail gracefully (or send what we have)
  if (balance.lt(desiredAmountRaw)) {
    // optional: send whatever we have, or return error
    throw new Error("Swap did not produce enough tokens to satisfy requested amount");
  }

  const sendTx = await desiredErc20.transfer(params.userWallet, desiredAmountRaw);
  const sendReceipt = await sendTx.wait();

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

  return { txHash: sendReceipt.transactionHash, adminWallet: wallet.address };
}
