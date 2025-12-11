import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const { wallet } = await req.json();

    if (!wallet) {
      return NextResponse.json(
        { error: "Missing wallet" },
        { status: 400 }
      );
    }

    // 1) Load user XP
    const { data: xpRow } = await supabase
      .from("xp_stats")
      .select("total_xp")
      .eq("wallet", wallet)
      .maybeSingle();

    const totalXp = xpRow?.total_xp ?? 0;

    // 2) Load all achievements with XP conditions
    const { data: achievements } = await supabase
      .from("achievements")
      .select("*")
      .not("target_xp", "is", null);

    if (!achievements || achievements.length === 0) {
      return NextResponse.json({ unlocked: [] });
    }

    // 3) Load already unlocked
    const { data: alreadyUnlocked } = await supabase
      .from("user_achievements")
      .select("achievement_id")
      .eq("wallet_address", wallet);

    const unlockedIds = new Set(
      (alreadyUnlocked || []).map((a: any) => a.achievement_id)
    );

    // 4) Determine new unlocks
    const newlyUnlocked = achievements.filter((a: any) => {
      if (unlockedIds.has(a.id)) return false;
      if (a.target_xp == null) return false;
      return totalXp >= a.target_xp;
    });

    if (newlyUnlocked.length === 0) {
      return NextResponse.json({ unlocked: [] });
    }

    // 5) Insert new unlocks
    const inserts = newlyUnlocked.map((a: any) => ({
      wallet_address: wallet,
      achievement_id: a.id,
      earned_at: new Date().toISOString(),
    }));

    await supabase
      .from("user_achievements")
      .insert(inserts);

    return NextResponse.json({ unlocked: newlyUnlocked });
  } catch (e) {
    console.error("Achievement check failed:", e);
    return NextResponse.json(
      { error: "Unlock engine failed" },
      { status: 500 }
    );
  }
}
