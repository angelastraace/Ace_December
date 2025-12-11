import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json(
      { error: "Missing wallet" },
      { status: 400 }
    );
  }

  // XP balance (one row per wallet)
  const { data: balance, error: balanceError } = await supabase
    .from("xp_balances")
    .select("total_xp")
    .eq("wallet_address", wallet)
    .maybeSingle();

  if (balanceError) {
    console.error("Error loading xp_balances", balanceError);
  }

  // Quest completions count
  const { count: questsCompleted, error: questsError } = await supabase
    .from("quest_completions")
    .select("id", { count: "exact", head: true })
    .eq("wallet_address", wallet);

  if (questsError) {
    console.error("Error counting quest_completions", questsError);
  }

  const totalXp = balance?.total_xp ?? 0;

  return NextResponse.json({
    wallet,
    total_xp: totalXp,
    level: 0, // not used; UI derives level from total_xp
    quests_completed: questsCompleted ?? 0,
  });
}
