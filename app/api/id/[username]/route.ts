import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseAdmin } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  const username = params.username

  try {
    const supabase = createSupabaseAdmin()

    // Fetch user's ACE ID data
    const { data: userData, error: userError } = await supabase
      .from("ace_id")
      .select("*")
      .eq("username", username)
      .single()

    if (userError) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Fetch user's badges
    const { data: badges, error: badgesError } = await supabase
      .from("ace_badges")
      .select("*")
      .eq("user_id", userData.id)
      .order("date_earned", { ascending: false })

    if (badgesError) {
      console.error("Error fetching badges:", badgesError)
    }

    // Fetch user's recent activity
    const { data: activity, error: activityError } = await supabase
      .from("ace_activity")
      .select("*")
      .eq("user_id", userData.id)
      .order("timestamp", { ascending: false })
      .limit(20)

    if (activityError) {
      console.error("Error fetching activity:", activityError)
    }

    // Fetch user's reputation data
    const { data: reputation, error: reputationError } = await supabase
      .from("ace_reputation")
      .select("*")
      .eq("user_id", userData.id)
      .single()

    if (reputationError) {
      console.error("Error fetching reputation:", reputationError)
    }

    return NextResponse.json({
      id: userData.id,
      username: userData.username,
      walletAddress: userData.wallet_address,
      joinedDate: userData.joined_date,
      tier: userData.tier,
      tierProgress: userData.tier_progress,
      xp: userData.xp,
      nextTierXp: userData.next_tier_xp,
      reputation: reputation || {},
      badges: badges || [],
      recentActivity: activity || [],
      nftMetadata: userData.nft_metadata || {},
      trustScore: userData.trust_score,
      inviteCode: userData.invite_code,
      inviteStats: userData.invite_stats || {},
      isPublic: userData.is_public,
    })
  } catch (error) {
    console.error("Error fetching ACE ID data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { username: string } }) {
  const username = params.username

  try {
    const supabase = createSupabaseAdmin()
    const body = await request.json()

    // Update user's ACE ID data
    const { data, error } = await supabase
      .from("ace_id")
      .update({
        is_public: body.isPublic !== undefined ? body.isPublic : undefined,
        tier_progress: body.tierProgress !== undefined ? body.tierProgress : undefined,
        xp: body.xp !== undefined ? body.xp : undefined,
        next_tier_xp: body.nextTierXp !== undefined ? body.nextTierXp : undefined,
        trust_score: body.trustScore !== undefined ? body.trustScore : undefined,
        tier: body.tier !== undefined ? body.tier : undefined,
        nft_metadata: body.nftMetadata !== undefined ? body.nftMetadata : undefined,
        invite_stats: body.inviteStats !== undefined ? body.inviteStats : undefined,
      })
      .eq("username", username)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error("Error updating ACE ID:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
