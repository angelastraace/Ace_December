import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get("wallet");

    if (!wallet) {
      return NextResponse.json(
        { error: "Missing wallet parameter" },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });

    // 1) Get user XP stats
    const { data: stats, error: statsError } = await supabase
      .from("xp_stats")
      .select("total_xp")
      .eq("wallet", wallet.toLowerCase())
      .maybeSingle();

    if (statsError) {
      console.error("Error loading xp_stats:", statsError);
      return NextResponse.json(
        { error: "Failed to load XP stats" },
        { status: 500 }
      );
    }

    const totalXp = stats?.total_xp ?? 0;

    // 2) Load achievements definitions
    const { data: achievements, error: achievementsError } = await supabase
      .from("xp_achievements")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("target_xp", { ascending: true });

    if (achievementsError) {
      console.error("Error loading achievements:", achievementsError);
      return NextResponse.json(
        { error: "Failed to load achievements" },
        { status: 500 }
      );
    }

    if (!achievements || achievements.length === 0) {
      return NextResponse.json(
        {
          achievements: [],
          message: "No achievements defined yet. Command will push new challenges soon.",
        },
        { status: 200 }
      );
    }

    // 3) Enrich with progress & completion
    const enriched = achievements.map((a) => {
      const targetXp = a.target_xp ?? 0;
      const progressRaw = targetXp > 0 ? totalXp / targetXp : 0;
      const progress = Math.max(0, Math.min(progressRaw, 1)); // clamp 0–1

      return {
        id: a.id,
        slug: a.slug,
        title: a.title,
        description: a.description,
        category: a.category,
        icon: a.icon,
        targetXp,
        currentXp: totalXp,
        progress,              // 0–1
        progressPercent: Math.round(progress * 100),
        completed: progress >= 1,
      };
    });

    return NextResponse.json({ achievements: enriched }, { status: 200 });
  } catch (err) {
    console.error("Unexpected error in /api/xp/achievements:", err);
    return NextResponse.json(
      { error: "Unexpected error loading achievements" },
      { status: 500 }
    );
  }
}
 