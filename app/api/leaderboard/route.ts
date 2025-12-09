import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseAdmin } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const offset = Number.parseInt(searchParams.get("offset") || "0")

  try {
    const supabase = createSupabaseAdmin()

    // Fetch leaderboard data
    const { data, error, count } = await supabase
      .from("user_profiles")
      .select(
        `
        id, 
        username, 
        avatar_url, 
        wallet_address,
        xp:xp_total
      `,
        { count: "exact" },
      )
      .order("xp_total", { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      data,
      pagination: {
        total: count,
        limit,
        offset,
      },
    })
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
