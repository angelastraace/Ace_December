// src/app/api/admin/onchain/fund-user/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fundUser } from "@/engine/treasury/distribute";
import { createClient } from "@supabase/supabase-js";

/**
 * Admin-only route to send funds from the treasury / LP etc -> user wallet.
 *
 * Improvements:
 * - stronger validation and clear HTTP status codes
 * - parses amounts consistently (string or numeric)
 * - optional Supabase audit logging (only if SUPABASE_URL + SERVICE_ROLE key are set)
 * - defensive error handling and clear responses for the client UI
 */

/* ---------- helpers ---------- */
function isAdmin(req: NextRequest) {
  // dev guard: header or cookie
  const header = req.headers.get("x-admin-secret");
  if (header && header === process.env.ADMIN_SECRET) return true;

  const cookie = req.cookies.get("ace_admin")?.value;
  if (cookie && cookie === process.env.ADMIN_SECRET) return true;

  // TODO: replace with real server-side Supabase auth check
  return false;
}

function parseAmount(value: unknown): string | null {
  if (value === undefined || value === null) return null;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") return null;
    // allow number-like strings (e.g. "0.5" or "1000")
    const n = Number(trimmed);
    if (!Number.isFinite(n) || n <= 0) return null;
    // keep canonical string form
    return trimmed;
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value) || value <= 0) return null;
    return String(value);
  }
  // fallback: not supported
  return null;
}

function isHexAddress(addr: string) {
  // basic validation: 0x + 40 hex chars
  return /^0x[a-fA-F0-9]{40}$/.test(addr);
}

/* ---------- optional Supabase client for audit logging ---------- */
function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY; // keep service role out of client builds
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

/* ---------- API handler ---------- */
export async function POST(req: NextRequest) {
  try {
    if (!isAdmin(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));

    // Accept canonical and legacy param names
    const userWallet = (body.userWallet || body.target_wallet) as string | undefined;
    const tokenSymbol = (body.tokenSymbol || body.reward_asset) as string | undefined;
    const rawAmount = body.amount ?? body.qty ?? body.value;
    const source = (body.source || body.mode) as
      | "treasury"
      | "lp-position"
      | "swap-then-send"
      | undefined;
    const sourceAsset = body.source_asset as string | undefined; // optional
    const idempotencyKey = (body.idempotencyKey || req.headers.get("x-idempotency-key")) as string | undefined;

    if (!userWallet || !tokenSymbol || rawAmount === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: userWallet, tokenSymbol, amount" },
        { status: 400 }
      );
    }

    if (!isHexAddress(userWallet)) {
      return NextResponse.json({ error: "Invalid userWallet address" }, { status: 422 });
    }

    const amount = parseAmount(rawAmount);
    if (!amount) {
      return NextResponse.json({ error: "Invalid amount (must be positive number or numeric string)" }, { status: 422 });
    }

    // Log intent server-side (console) — helpful while debugging
    console.log("[admin/fund-user] intent:", { userWallet, tokenSymbol, amount, source, sourceAsset, idempotencyKey });

    // Call the engine implementation that performs the on-chain action.
    // fundUser is expected to:
    //  - perform transfer / swap / LP logic
    //  - update any related on-chain state if applicable
    //  - return an object { success: boolean, txHash?: string, adminWallet?: string, reason?: string, meta?: any }
    const result = await fundUser({
      userWallet,
      tokenSymbol,
      amount,
      source: source ?? "treasury",
      ...(sourceAsset ? { sourceAsset } : {}),
      idempotencyKey,
    });

    // Basic result validation
    if (!result || typeof result !== "object") {
      console.error("[admin/fund-user] fundUser returned unexpected value", result);
      return NextResponse.json({ error: "Internal engine error" }, { status: 500 });
    }

    if (!result.success) {
      // engine signaled failure (e.g. insufficient funds, swap failure)
      console.error("[admin/fund-user] engine failure:", result.reason || result);
      return NextResponse.json({ error: result.reason || "Funding failed" }, { status: 422 });
    }

    // Optional: store audit log in Supabase for bookkeeping (only if configured)
    try {
      const sb = getSupabaseClient();
      if (sb) {
        const payload = {
          idempotency_key: idempotencyKey ?? null,
          token_symbol: tokenSymbol,
          amount: amount,
          user_wallet: userWallet,
          admin_wallet: result.adminWallet ?? null,
          tx_hash: result.txHash ?? null,
          source: source ?? "treasury",
          meta: result.meta ? JSON.stringify(result.meta) : null,
          created_at: new Date().toISOString(),
        };
        // Upsert style insert: insert a new row (you can change to upsert if you prefer)
        const { error: insertErr } = await sb.from("admin_onchain_transfers").insert(payload);
        if (insertErr) {
          console.warn("[admin/fund-user] supabase insert warning:", insertErr.message);
        } else {
          console.log("[admin/fund-user] logged transfer to supabase");
        }
      }
    } catch (logErr) {
      console.warn("[admin/fund-user] supabase audit failed", logErr);
      // don't fail the entire request because audit logging failed
    }

    // canonical response
    return NextResponse.json(
      {
        success: true,
        txHash: result.txHash ?? null,
        adminWallet: result.adminWallet ?? null,
        tokenSymbol,
        amount,
        source: source ?? "treasury",
        meta: result.meta ?? null,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("admin fund-user error", err);
    return NextResponse.json({ error: err?.message ?? "Unexpected error" }, { status: 500 });
  }
}
