import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  // If no wallet, just return an empty list instead of erroring
  if (!wallet) {
    return NextResponse.json({ achievements: [] });
  }

  try {
    // 1) Load all achievements definitions
    const { data: allAchievements, error: achievementsError } = await supabase
      .from("achievements")
      .select("*")
      .order("sort_order", { ascending: true });

    // If the table doesn't exist or any error: log & return empty
    if (achievementsError) {
      console.error("Error loading achievements", achievementsError);
      return NextResponse.json({ achievements: [] });
    }

    // 2) Load which achievements this wallet has unlocked
    const { data: userRows, error: userError } = await supabase
      .from("user_achievements")
      .select("achievement_code, unlocked_at")
      .eq("wallet_address", wallet);

    // If user table is broken, just mark everything as locked
    if (userError) {
      console.error("Error loading user_achievements", userError);
      const lockedOnly =
        (allAchievements || []).map((a: any) => ({
          ...a,
          unlocked: false,
          unlocked_at: null,
        })) ?? [];

      return NextResponse.json({ achievements: lockedOnly });
    }

    const unlockedMap = new Map<string, string | null>();
    (userRows || []).forEach((row: any) => {
      const code = row.achievement_code ?? row.code;
      if (code) {
        unlockedMap.set(code, row.unlocked_at ?? null);
      }
    });

    const enriched =
      (allAchievements || []).map((a: any) => {
        const unlockedAt = unlockedMap.get(a.code) ?? null;

        return {
          ...a,
          unlocked: unlockedMap.has(a.code),
          unlocked_at: unlockedAt,
        };
      }) ?? [];

    return NextResponse.json({ achievements: enriched });
  } catch (e) {
    console.error("Unexpected achievements API error", e);
    // Hard fallback: never break the page
    return NextResponse.json({ achievements: [] });
  }
}
