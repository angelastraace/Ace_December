import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase/server"
import { createLoreEntry, loreTypes, getAllKatLore } from "@/lib/kat-lore-service"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const userId = url.searchParams.get("userId")

  if (userId) {
    // Fetch lore entries for a specific user
    try {
      const { data: loreEntries, error: loreError } = await supabaseServer
        .from("kat_lore")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (loreError) {
        return NextResponse.json({ error: "Failed to fetch lore entries" }, { status: 500 })
      }

      return NextResponse.json({ userId, loreEntries: loreEntries || [] })
    } catch (error) {
      console.error("Error fetching lore entries:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
  } else {
    // No userId provided — return all lore
    try {
      const lore = await getAllKatLore()
      return NextResponse.json(lore)
    } catch (error) {
      console.error("Error fetching all lore:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
  }
}

export async function POST(request: Request) {
  try {
    const { userId, type, data } = await request.json()

    if (!userId || !type || !data) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create lore entry
    const loreEntry = createLoreEntry(type, data)

    // Save lore entry to database
    const { error: insertError } = await supabaseServer.from("kat_lore").insert({
      user_id: userId,
      title: loreEntry.title,
      content: loreEntry.content,
      type: loreEntry.type,
      has_nft: loreEntry.hasNFT,
      metadata: data,
      created_at: loreEntry.date,
    })

    if (insertError) {
      return NextResponse.json({ error: "Failed to create lore entry" }, { status: 500 })
    }

    return NextResponse.json({ success: true, loreEntry })
  } catch (error) {
    console.error("Error creating lore entry:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { userId, loreId } = await request.json()

    if (!userId || !loreId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get lore entry
    const { data: loreEntry, error: loreError } = await supabaseServer
      .from("kat_lore")
      .select("*")
      .eq("id", loreId)
      .eq("user_id", userId)
      .single()

    if (loreError || !loreEntry) {
      return NextResponse.json({ error: "Lore entry not found" }, { status: 404 })
    }

    if (loreEntry.has_nft) {
      return NextResponse.json({ error: "Lore entry already minted as NFT" }, { status: 400 })
    }

    // Pretend to mint NFT — update database record
    const { error: updateError } = await supabaseServer
      .from("kat_lore")
      .update({
        has_nft: true,
        nft_metadata: {
          tokenId: `lore-${loreId}`,
          image: `/images/lore-nft-${(loreId % 5) + 1}.png`,
          attributes: [
            { trait_type: "Type", value: loreEntry.type },
            { trait_type: "Date", value: new Date(loreEntry.created_at).toLocaleDateString() },
            { trait_type: "Rarity", value: loreEntry.type === loreTypes.SPECIAL ? "Legendary" : "Rare" },
          ],
        },
      })
      .eq("id", loreId)

    if (updateError) {
      return NextResponse.json({ error: "Failed to update lore entry" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Lore entry minted as NFT successfully" })
  } catch (error) {
    console.error("Error minting lore as NFT:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
