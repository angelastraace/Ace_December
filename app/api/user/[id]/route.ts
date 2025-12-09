import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseAdmin } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = params.id

  try {
    const supabase = createSupabaseAdmin()

    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single()

    if (profileError) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Fetch user's recent activity
    const { data: activity } = await supabase
      .from("user_activity")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10)

    return NextResponse.json({
      profile,
      activity: activity || [],
    })
  } catch (error) {
    console.error("Error fetching user data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = params.id

  try {
    const supabase = createSupabaseAdmin()
    const body = await request.json()

    // Update user profile
    const { data, error } = await supabase.from("user_profiles").update(body).eq("id", userId).select().single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
