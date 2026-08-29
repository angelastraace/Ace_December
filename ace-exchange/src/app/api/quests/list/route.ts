import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json({ error: "Missing wallet" }, { status: 400 });
  }

  // All active quests
  const { data: quests, error: questsError } = await supabase
    .from("quests")
    .select("*")
    .eq("is_active", true);

  if (questsError) {
    console.error("Error loading quests", questsError);
    return NextResponse.json(
      { error: "Failed to load quests" },
      { status: 500 },
    );
  }

  // Completed by this wallet
  const { data: completed, error: completedError } = await supabase
    .from("quest_completions")
    .select("quest_id")
    .eq("wallet_address", wallet);

  if (completedError) {
    console.error("Error loading quest completions", completedError);
    return NextResponse.json(
      { error: "Failed to load completions" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    quests: quests || [],
    completed: (completed || []).map((q) => q.quest_id),
  });
}
