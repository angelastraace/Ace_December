import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseAdmin } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get("userId")
  const type = searchParams.get("type")
  const limit = Number.parseInt(searchParams.get("limit") || "20")
  const offset = Number.parseInt(searchParams.get("offset") || "0")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  try {
    const supabase = createSupabaseAdmin()

    let query = supabase
      .from("ace_activity")
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .order("timestamp", { ascending: false })
      .range(offset, offset + limit - 1)

    if (type) {
      query = query.eq("type", type)
    }

    const { data, error, count } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      activity: data,
      total: count,
      limit,
      offset,
    })
  } catch (error) {
    console.error("Error fetching activity:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createSupabaseAdmin()
    const body = await request.json()

    // Validate required fields
    if (!body.userId || !body.type || !body.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new activity entry
    const { data, error } = await supabase
      .from("ace_activity")
      .insert({
        user_id: body.userId,
        type: body.type,
        description: body.description,
        timestamp: body.timestamp || new Date().toISOString(),
        xp_earned: body.xpEarned || 0,
        metadata: body.metadata || {},
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Update user's XP if XP was earned
    if (body.xpEarned && body.xpEarned > 0) {
      await supabase.rpc("update_user_xp", {
        user_id_param: body.userId,
        xp_amount: body.xpEarned,
      })
    }

    return NextResponse.json({
      success: true,
      activity: data,
    })
  } catch (error) {
    console.error("Error creating activity:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
