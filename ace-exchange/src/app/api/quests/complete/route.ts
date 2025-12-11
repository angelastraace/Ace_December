import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

async function updateDailyStreak(wallet: string) {
  try {
    const now = new Date();

    // Use UTC date for consistency
    const todayStr = now.toISOString().slice(0, 10);

    const yesterday = new Date(now);
    yesterday.setUTCDate(now.getUTCDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    const { data: row, error } = await supabase
      .from("user_daily_streaks")
      .select("*")
      .eq("wallet_address", wallet)
      .maybeSingle();

    if (error) {
      console.error("Streak load error:", error);
      return null;
    }

    let currentStreak = 1;
    let bestStreak = 1;

    if (row) {
      const lastDate: string | null = row.last_completed_date;

      if (lastDate === todayStr) {
        // Already counted today – don't increment
        currentStreak = row.current_streak;
        bestStreak = row.best_streak;
      } else if (lastDate === yesterdayStr) {
        // Consecutive day → streak++
        currentStreak = row.current_streak + 1;
        bestStreak = Math.max(row.best_streak, currentStreak);
      } else {
        // Streak broken → reset to 1
        currentStreak = 1;
        bestStreak = Math.max(row.best_streak ?? 0, 1);
      }
    }

    const { error: upsertError } = await supabase
      .from("user_daily_streaks")
      .upsert({
        wallet_address: wallet,
        current_streak: currentStreak,
        best_streak: bestStreak,
        last_completed_date: todayStr,
      });

    if (upsertError) {
      console.error("Streak upsert error:", upsertError);
      return null;
    }

    return { current_streak: currentStreak, best_streak: bestStreak };
  } catch (e) {
    console.error("Unexpected streak update error:", e);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { wallet, quest_code } = await req.json();

    if (!wallet || !quest_code) {
      return NextResponse.json(
        { error: "wallet and quest_code are required" },
        { status: 400 }
      );
    }

    // 1) Load quest definition
    const { data: quest, error: questError } = await supabase
      .from("quests")
      .select("*")
      .eq("code", quest_code)
      .eq("active", true)
      .maybeSingle();

    if (questError || !quest) {
      console.error("Quest load error:", questError);
      return NextResponse.json(
        { error: "Quest not found or inactive" },
        { status: 404 }
      );
    }

    const questId = quest.id;
    const xpReward: number = quest.xp_reward ?? 0;

    // 2) Check if already completed for this wallet (ever)
    const { data: existing, error: completionError } = await supabase
      .from("quest_completions")
      .select("id")
      .eq("wallet_address", wallet)
      .eq("quest_id", questId)
      .maybeSingle();

    if (completionError) {
      console.error("Quest completions load error:", completionError);
      return NextResponse.json(
        { error: "Failed to check quest completion" },
        { status: 500 }
      );
    }

    if (existing) {
      // Already done; no double XP (still could count for streak, but we keep it simple)
      return NextResponse.json({
        status: "already_completed",
        quest_code,
        xp_reward: 0,
      });
    }

    // 3) Insert completion
    const { error: insertError } = await supabase
      .from("quest_completions")
      .insert({
        quest_id: questId,
        wallet_address: wallet,
        completed_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error("Quest completion insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to mark quest completed" },
        { status: 500 }
      );
    }

    // 4) Try to grant XP via /api/xp/add, but DO NOT fail quest if this breaks
    if (xpReward > 0) {
      try {
        const xpUrl = new URL("/api/xp/add", req.url);
        await fetch(xpUrl.toString(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            wallet,
            amount: xpReward,
            reason: `quest:${quest_code}`,
          }),
        });
      } catch (xpErr) {
        console.error(
          "XP grant via /api/xp/add failed (quest still completed):",
          xpErr
        );
        // quest is still completed; we don't throw
      }
    }

    // 5) Update daily streak (based on quest completion)
    const streak = await updateDailyStreak(wallet);

    return NextResponse.json({
      status: "completed",
      quest_code,
      xp_reward: xpReward,
      streak, // { current_streak, best_streak } or null
    });
  } catch (e) {
    console.error("Quest complete error:", e);
    return NextResponse.json(
      { error: "Unexpected error completing quest" },
      { status: 500 }
    );
  }
}
