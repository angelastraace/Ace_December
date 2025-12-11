// src/app/api/admin/onchain/fund-user/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fundUser } from "@/engine/treasury/distribute";

// --- Simple admin guard (choose one below) ---
function requireAdminSimple(req: NextRequest) {
  // DEV option: check a cookie named 'ace_admin' equals ADMIN_SECRET
  // or check a special header 'x-admin-secret' (use HTTPS in prod).
  const adminHeader = req.headers.get("x-admin-secret");
  if (adminHeader && adminHeader === process.env.ADMIN_SECRET) return true;

  // Check cookie fallback
  const cookie = req.cookies.get("ace_admin")?.value;
  if (cookie && cookie === process.env.ADMIN_SECRET) return true;

  return false;
}

export async function POST(req: NextRequest) {
  try {
    // --------------- ADMIN AUTH ---------------
    const isAdmin = requireAdminSimple(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // --------------- BODY ---------------
    const body = await req.json();
    const userWallet = body.userWallet as `0x${string}`;
    const tokenSymbol = body.tokenSymbol as string;
    const amount = body.amount as string;
    const source = body.source as string | undefined;
    const reason = body.reason as string | undefined;
    const campaignId = body.campaignId as string | undefined;

    if (!userWallet || !tokenSymbol || !amount) {
      return NextResponse.json({ error: "userWallet, tokenSymbol and amount required" }, { status: 400 });
    }

    // --------------- CALL ENGINE ---------------
    const result = await fundUser({
      userWallet,
      tokenSymbol,
      amount,
      source,
      reason,
      campaignId: campaignId ?? null,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (e: any) {
    console.error("Admin onchain fund-user error:", e);
    return NextResponse.json({ error: e.message ?? "Unexpected" }, { status: 500 });
  }
}
