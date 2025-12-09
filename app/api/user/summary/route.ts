import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: NextRequest) {
  // Get wallet_address from URL search params
  const searchParams = request.nextUrl.searchParams
  const wallet_address = searchParams.get("wallet_address")

  if (!wallet_address) {
    return NextResponse.json({ error: "Wallet address is required" }, { status: 400 })
  }

  try {
    // 1. Resolve user ID from wallet
    const { data: user, error: userError } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("wallet_address", wallet_address)
      .single()

    if (userError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const user_id = user.id

    // 2. Fetch XP total
    const { data: xpData } = await supabase.from("xp_logs").select("xp_change").eq("user_id", user_id)

    const xp = xpData?.reduce((sum, row) => sum + row.xp_change, 0) || 0

    // 3. Fetch wallet balance
    const { data: wallet } = await supabase.from("wallet_stats").select("balance").eq("user_id", user_id).single()

    // Return the user summary data
    return NextResponse.json({
      xp,
      balance: wallet?.balance || 0,
    })
  } catch (error) {
    console.error("Error fetching user summary:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
