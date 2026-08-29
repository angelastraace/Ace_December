import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json(
      { error: "Missing wallet" },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from("wallet_profiles")
      .select("*")
      .eq("wallet_address", wallet)
      .maybeSingle();

    if (error) {
      console.error("wallet_profiles GET error", error);
      return NextResponse.json(
        { error: "Failed to load profile" },
        { status: 500 }
      );
    }

    // If no profile exists, return a default shell (frontend can show "Set up profile")
    if (!data) {
      return NextResponse.json({
        profile: {
          wallet_address: wallet,
          display_name: null,
          avatar_url: null,
          bio: null,
          country: null,
          timezone: null,
        },
      });
    }

    return NextResponse.json({ profile: data });
  } catch (e) {
    console.error("wallet_profiles GET unexpected error", e);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      wallet_address,
      display_name,
      avatar_url,
      bio,
      country,
      timezone,
    } = body || {};

    if (!wallet_address) {
      return NextResponse.json(
        { error: "wallet_address is required" },
        { status: 400 }
      );
    }

    const payload = {
      wallet_address,
      display_name: display_name ?? null,
      avatar_url: avatar_url ?? null,
      bio: bio ?? null,
      country: country ?? null,
      timezone: timezone ?? null,
    };

    const { data, error } = await supabase
      .from("wallet_profiles")
      .upsert(payload, { onConflict: "wallet_address" })
      .select("*")
      .maybeSingle();

    if (error) {
      console.error("wallet_profiles UPSERT error", error);
      return NextResponse.json(
        { error: "Failed to save profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({ profile: data });
  } catch (e) {
    console.error("wallet_profiles POST unexpected error", e);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}
