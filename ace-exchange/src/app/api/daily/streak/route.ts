import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get("wallet");

    if (!wallet) {
      return NextResponse.json({
        current_streak: 0,
        best_streak: 0,
        last_completed_date: null,
      });
    }

    const { data, error } = await supabase
      .from("user_daily_streaks")
      .select("*")
      .eq("wallet_address", wallet)
      .maybeSingle();

    if (error) {
      console.error("Streak fetch error:", error);
      return NextResponse.json({
        current_streak: 0,
        best_streak: 0,
        last_completed_date: null,
      });
    }

    if (!data) {
      return NextResponse.json({
        current_streak: 0,
        best_streak: 0,
        last_completed_date: null,
      });
    }

    return NextResponse.json({
      current_streak: data.current_streak ?? 0,
      best_streak: data.best_streak ?? 0,
      last_completed_date: data.last_completed_date,
    });
  } catch (e) {
    console.error("Unexpected streak API error:", e);
    return NextResponse.json({
      current_streak: 0,
      best_streak: 0,
      last_completed_date: null,
    });
  }
}
