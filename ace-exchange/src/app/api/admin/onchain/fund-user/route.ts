// src/app/api/admin/onchain/fund-user/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fundUser } from "@/engine/treasury/distribute";

function isAdmin(req: NextRequest) {
  // dev guard: header or cookie
  const header = req.headers.get("x-admin-secret");
  if (header && header === process.env.ADMIN_SECRET) return true;

  const cookie = req.cookies.get("ace_admin")?.value;
  if (cookie && cookie === process.env.ADMIN_SECRET) return true;

  // TODO: replace with real server-side Supabase auth check
  return false;
}

export async function POST(req: NextRequest) {
  try {
    if (!isAdmin(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Accept both naming styles but prefer canonical ones
    const userWallet = (body.userWallet || body.target_wallet) as `0x${string}` | undefined;
    const tokenSymbol = (body.tokenSymbol || body.reward_asset) as string | undefined;
    const amount = (body.amount || body.qty || body.value) as string | undefined;
    const source = (body.source || body.mode) as "treasury" | "lp-position" | "swap-then-send" | undefined;
    const sourceAsset = body.source_asset as string | undefined; // optional

    if (!userWallet || !tokenSymbol || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: userWallet, tokenSymbol, amount" },
        { status: 400 }
      );
    }

    // Optional: validate format of userWallet (very basic)
    if (!userWallet.startsWith("0x") || userWallet.length !== 42) {
      return NextResponse.json({ error: "Invalid userWallet address" }, { status: 400 });
    }

    // call engine
    const result = await fundUser({
      userWallet,
      tokenSymbol,
      amount,
      source,
      // pass sourceAsset if you want server logic to choose swap source
      // (you’ll need to update fundUser to read and use this)
      ...(sourceAsset ? { sourceAsset } : {}),
    });

    // canonical response shape
    return NextResponse.json({
      success: true,
      txHash: result.txHash,
      adminWallet: result.adminWallet,
      tokenSymbol,
      amount,
      source: source ?? "treasury",
    });
  } catch (err: any) {
    console.error("admin fund-user error", err);
    return NextResponse.json({ error: err.message || "Unexpected error" }, { status: 500 });
  }
}
