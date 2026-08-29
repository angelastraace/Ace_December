import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const { wallet, amount, reason } = await req.json();

    if (!wallet || !amount || typeof amount !== "number") {
      return NextResponse.json(
        { error: "wallet and numeric amount are required" },
        { status: 400 }
      );
    }

    // 1) Fetch current XP
    const { data: stats } = await supabase
      .from("xp_stats")
      .select("total_xp")
      .eq("wallet", wallet)
      .maybeSingle();

    const currentXp = stats?.total_xp ?? 0;
    const newXp = currentXp + amount;

    // 2) Upsert XP
    const { error: upsertError } = await supabase
      .from("xp_stats")
      .upsert({
        wallet: wallet,
        total_xp: newXp,
        updated_at: new Date().toISOString(),
      }, { onConflict: "wallet" });

    if (upsertError) {
      console.error("XP upsert failed:", upsertError);
      return NextResponse.json(
        { error: "Failed to save XP" },
        { status: 500 }
      );
    }

    // 3) Call achievement unlock engine
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/achievements/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet }),
    });

    return NextResponse.json({
      wallet,
      before: currentXp,
      after: newXp,
      gained: amount,
      reason: reason ?? null,
    });

  } catch (e) {
    console.error("XP add error:", e);
    return NextResponse.json(
      { error: "XP add failed" },
      { status: 500 }
    );
  }
}
