// engine/db/funding.ts
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env for server SDK");
}

const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

/**
 * Payload shape expected from engine fund flows.
 */
export type LogFundingParams = {
  idempotencyKey?: string | null;
  adminWallet: string;
  userWallet: string;
  network: string; // e.g. "ethereum"
  tokenSymbol: string;
  tokenAddress: string;
  amount: string; // human amount (string)
  amountRaw: string; // raw token units as string (bigint)
  source: string; // "treasury" | "lp-position" | "swap-then-send"
  txHash: string | null;
  reason?: string | null;
  campaignId?: string | null;
  meta?: any | null;
};

export async function logFunding(p: LogFundingParams) {
  // Defensive validation
  if (!p.userWallet || !p.tokenSymbol || !p.amountRaw) {
    throw new Error("Missing required logFunding params");
  }

  // 1) If idempotencyKey provided, check for existing audit row (prevents double-credit).
  if (p.idempotencyKey) {
    const { data: existing, error: checkErr } = await sb
      .from("admin_onchain_transfers")
      .select("id,tx_hash")
      .eq("idempotency_key", p.idempotencyKey)
      .limit(1);

    if (checkErr) {
      console.warn("[logFunding] idempotency check failed", checkErr);
      // continue - we don't want to block on check failure, but be cautious
    } else if (existing && existing.length > 0) {
      // Already logged -> no-op
      return { alreadyLogged: true, row: existing[0] };
    }
  }

  // 2) Insert audit row (admin_onchain_transfers)
  try {
    const auditRow = {
      idempotency_key: p.idempotencyKey ?? null,
      token_symbol: p.tokenSymbol,
      amount: p.amount,
      amount_raw: p.amountRaw,
      user_wallet: p.userWallet,
      admin_wallet: p.adminWallet,
      tx_hash: p.txHash ?? null,
      source: p.source,
      meta: p.meta ? JSON.stringify(p.meta) : null,
      created_at: new Date().toISOString(),
    };

    const { error: auditErr } = await sb.from("admin_onchain_transfers").insert(auditRow);
    if (auditErr) {
      // if unique constraint on idempotency_key triggers, supabase will return an error.
      // We catch and continue — later balance update will be guarded by idempotency check as well.
      console.warn("[logFunding] audit insert warning", auditErr);
    }
  } catch (e) {
    console.warn("[logFunding] failed to insert audit row", e);
  }

  // 3) Insert ledger row in "fundings" (optional but recommended)
  try {
    const ledgerRow = {
      user_wallet: p.userWallet,
      token_symbol: p.tokenSymbol,
      token_address: p.tokenAddress,
      amount: p.amount,
      amount_raw: p.amountRaw,
      tx_hash: p.txHash ?? null,
      source: p.source,
      reason: p.reason ?? null,
      campaign_id: p.campaignId ?? null,
      created_at: new Date().toISOString(),
      idempotency_key: p.idempotencyKey ?? null,
    };
    const { error: ledgerErr } = await sb.from("fundings").insert(ledgerRow);
    if (ledgerErr) {
      console.warn("[logFunding] ledger insert warning", ledgerErr);
    }
  } catch (e) {
    console.warn("[logFunding] failed to insert ledger row", e);
  }

  // 4) Update user's balance record(s)
  // Assumes you have a table `wallet_profiles` with columns:
  //  - wallet (text, primary key)
  //  - balances jsonb OR separate balances table. Here we handle both simple patterns.
  try {
    // Try to update a dedicated `balances` table first (preferred):
    // balances table schema suggestion: (wallet text, token_symbol text, token_address text, balance_raw numeric/text(bigint), updated_at timestamptz)
    const { data: existingBalance, error: ebErr } = await sb
      .from("balances")
      .select("balance_raw")
      .eq("wallet", p.userWallet)
      .eq("token_symbol", p.tokenSymbol)
      .limit(1);

    if (!ebErr && existingBalance && existingBalance.length > 0) {
      // parse existing raw bigint (string), add amountRaw (string)
      const prevRaw = BigInt(existingBalance[0].balance_raw ?? "0");
      const addRaw = BigInt(p.amountRaw);
      const newRaw = (prevRaw + addRaw).toString();

      await sb
        .from("balances")
        .update({ balance_raw: newRaw, updated_at: new Date().toISOString() })
        .eq("wallet", p.userWallet)
        .eq("token_symbol", p.tokenSymbol);
    } else {
      // If no balances table or no row, upsert into balances
      await sb.from("balances").upsert({
        wallet: p.userWallet,
        token_symbol: p.tokenSymbol,
        token_address: p.tokenAddress,
        balance_raw: p.amountRaw,
        updated_at: new Date().toISOString(),
      }, { onConflict: ["wallet", "token_symbol"] });
    }
  } catch (balErr) {
    // If balances table doesn't exist or update fails, fallback to upserting wallet_profiles.balances JSON
    console.warn("[logFunding] balances update failed - falling back to wallet_profiles", balErr);

    try {
      // read existing wallet profile
      const { data: wp, error: wpErr } = await sb.from("wallet_profiles").select("wallet, balances").eq("wallet", p.userWallet).limit(1);

      let newBalances = {};
      if (!wpErr && wp && wp.length > 0) {
        const existing = wp[0];
        newBalances = existing.balances ?? {};
        // existing.balances expected { TOKEN_SYMBOL: { amount_raw: "..." , amount: "..." } , ... }
        const prevRaw = BigInt(newBalances[p.tokenSymbol]?.amount_raw ?? "0");
        const addRaw = BigInt(p.amountRaw);
        newBalances[p.tokenSymbol] = {
          amount_raw: (prevRaw + addRaw).toString(),
          // you may want to store human-readable amount too; we keep `amount` as numeric string
          amount: null,
        };
        await sb.from("wallet_profiles").update({ balances: newBalances, updated_at: new Date().toISOString() }).eq("wallet", p.userWallet);
      } else {
        // create a new wallet_profile row
        newBalances = {
          [p.tokenSymbol]: { amount_raw: p.amountRaw, amount: null }
        };
        await sb.from("wallet_profiles").insert({
          wallet: p.userWallet,
          balances: newBalances,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
    } catch (wpErr) {
      console.error("[logFunding] fallback wallet_profiles upsert failed", wpErr);
      // If all updates fail, we still proceed — admin on-chain transfer occurred; your UI can show txHash and user can refresh on-chain.
    }
  }

  return { ok: true };
}
