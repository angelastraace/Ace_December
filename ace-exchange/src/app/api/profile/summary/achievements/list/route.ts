// src/app/api/achievements/list/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json({ achievements: [] });
  }

  try {
    // All achievement definitions
    const { data: allAchievements, error: achievementsError } = await supabase
      .from("achievements")
      .select("*")
      .order("sort_order", { ascending: true });

    if (achievementsError) {
      console.error("Error loading achievements", achievementsError);
      return NextResponse.json({ achievements: [] });
    }

    // Which ones this wallet has unlocked
    const { data: userRows, error: userError } = await supabase
      .from("user_achievements")
      .select("achievement_id, earned_at")
      .eq("wallet_address", wallet);

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

    const unlockedById = new Map<string, string | null>();
    (userRows || []).forEach((row: any) => {
      if (row.achievement_id) {
        unlockedById.set(row.achievement_id, row.earned_at ?? null);
      }
    });

    const enriched =
      (allAchievements || []).map((a: any) => {
        const unlockedAt = unlockedById.get(a.id) ?? null;
        return {
          ...a,
          unlocked: unlockedById.has(a.id),
          unlocked_at: unlockedAt,
        };
      }) ?? [];

    return NextResponse.json({ achievements: enriched });
  } catch (e) {
    console.error("Unexpected achievements API error", e);
    return NextResponse.json({ achievements: [] });
  }
}
