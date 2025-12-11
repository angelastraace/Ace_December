// src/app/api/vault/deposit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/serverSupabase";

// TEMP: demo profile until wallet login is wired.
// You can move this into an env var like ACE_DEMO_PROFILE_ID later.
const DEMO_PROFILE_ID =
  process.env.ACE_DEMO_PROFILE_ID ??
  "e446031b-9dea-4ba9-866d-a3656ef75f99";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { vaultId } = body as { vaultId?: string };

    if (!vaultId) {
      return NextResponse.json(
        { ok: false, error: "vaultId is required" },
        { status: 400 }
      );
    }

    if (!DEMO_PROFILE_ID) {
      return NextResponse.json(
        { ok: false, error: "Demo profile id is not configured" },
        { status: 500 }
      );
    }

    const supabase = createServerSupabaseClient();

    // 1) Load and validate the vault
    const { data: vault, error: vaultError } = await supabase
      .from("vaults")
      .select("id, slug, name, apr, risk_band, is_active")
      .eq("id", vaultId)
      .single();

    if (vaultError || !vault) {
      return NextResponse.json(
        { ok: false, error: "Vault not found" },
        { status: 404 }
      );
    }

    if (vault.is_active === false) {
      return NextResponse.json(
        { ok: false, error: "Vault is not active" },
        { status: 400 }
      );
    }

    // 2) Compute XP award (simple demo logic)
    // Base: 500 XP, scaled slightly by APR.
    const rawApr =
      typeof vault.apr === "number" ? vault.apr : Number(vault.apr ?? 0);
    const aprPct = Number.isFinite(rawApr)
      ? rawApr <= 1
        ? rawApr * 100
        : rawApr
      : 0;
    const base = 500;
    const multiplier = 1 + aprPct / 100; // 18% APR -> 1.18x
    const xpAward = Math.round(base * multiplier);

    // 3) Insert xp_events row
    const { data: event, error: insertError } = await supabase
      .from("xp_events")
      .insert({
        profile_id: DEMO_PROFILE_ID,
        source: "vault_yield", // must be allowed in your CHECK constraint
        amount: xpAward,
        vault_id: vault.id,
        metadata: {
          kind: "demo_vault_deposit",
          vault_slug: vault.slug,
          vault_name: vault.name,
          apr_pct: aprPct,
        },
      })
      .select("id, created_at")
      .single();

    if (insertError || !event) {
      console.error("xp_events insert failed", insertError);
      return NextResponse.json(
        { ok: false, error: "Failed to record XP event" },
        { status: 500 }
      );
    }

    // Trigger will update xp_balances automatically.
    return NextResponse.json({
      ok: true,
      xpAward,
      eventId: event.id,
    });
  } catch (err: any) {
    console.error("vault/deposit error", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Unexpected error",
        details: err?.message ?? String(err),
      },
      { status: 500 }
    );
  }
}
