import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseAdmin } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get("userId")
  const category = searchParams.get("category")
  const rarity = searchParams.get("rarity")
  const limit = Number.parseInt(searchParams.get("limit") || "50")
  const offset = Number.parseInt(searchParams.get("offset") || "0")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  try {
    const supabase = createSupabaseAdmin()

    let query = supabase
      .from("ace_badges")
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .order("date_earned", { ascending: false })
      .range(offset, offset + limit - 1)

    if (category) {
      query = query.eq("category", category)
    }

    if (rarity) {
      query = query.eq("rarity", rarity)
    }

    const { data, error, count } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      badges: data,
      total: count,
      limit,
      offset,
    })
  } catch (error) {
    console.error("Error fetching badges:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createSupabaseAdmin()
    const body = await request.json()

    // Validate required fields
    if (!body.userId || !body.name || !body.description || !body.category || !body.rarity || !body.icon) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new badge
    const { data, error } = await supabase
      .from("ace_badges")
      .insert({
        user_id: body.userId,
        name: body.name,
        description: body.description,
        category: body.category,
        rarity: body.rarity,
        icon: body.icon,
        date_earned: body.dateEarned || new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Add activity entry for earning the badge
    await supabase.from("ace_activity").insert({
      user_id: body.userId,
      type: "badge",
      description: `Earned '${body.name}' badge`,
      timestamp: body.dateEarned || new Date().toISOString(),
      xp_earned: body.xpEarned || 0,
    })

    return NextResponse.json({
      success: true,
      badge: data,
    })
  } catch (error) {
    console.error("Error creating badge:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
