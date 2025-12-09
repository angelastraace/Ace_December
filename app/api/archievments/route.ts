import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseAdmin } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get("user_id")

  try {
    const supabase = createSupabaseAdmin()

    // Base query to get all achievements
    let query = supabase.from("achievements").select("*").order("required_xp", { ascending: true })

    // If user_id is provided, also fetch user's progress
    if (userId) {
      query = supabase
        .from("achievements")
        .select(`
          *,
          user_achievements!inner(
            completed,
            completed_at,
            user_id
          )
        `)
        .eq("user_achievements.user_id", userId)
        .order("required_xp", { ascending: true })
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching achievements:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
