import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { swapEthToUsdcAndSend } from "@/engine/uniswap/swapEthToUsdcAndSend";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      admin_wallet,
      target_wallet,
      source_asset,
      reward_asset,
      amount,
      network,
      dex,
    } = body;

    if (!admin_wallet || !target_wallet || !amount || Number(amount) <= 0) {
      return NextResponse.json(
        { error: "Missing or invalid parameters" },
        { status: 400 }
      );
    }

    const numericAmount = Number(amount);

    // --- Admin auth ---
    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("*")
      .eq("wallet", admin_wallet)
      .maybeSingle();

    if (!admin || adminError) {
      return NextResponse.json(
        { error: "Not authorized" },
        { status: 403 }
      );
    }

    // --- Safety limit (tweak as needed) ---
    if (numericAmount > 5) {
      // max 5 ETH for now
      return NextResponse.json(
        { error: "Amount exceeds pool funding limit (max 5 ETH for now)" },
        { status: 403 }
      );
    }

    let txHash = "";

    // --- LIVE SWAP LOGIC (limited case) ---
    if (
      dex === "uniswap_v3" &&
      network === "ethereum" &&
      source_asset === "ETH" &&
      reward_asset === "USDC"
    ) {
      // amount = ETH spent from treasury / pool
      txHash = await swapEthToUsdcAndSend({
        recipient: target_wallet,
        amountInEth: String(numericAmount),
      });
    } else {
      // For all other combos, keep as simulated for now
      txHash = "SIMULATED_TX_" + Math.floor(Math.random() * 1e9);
    }

    // --- Log into DB ---
    const { error: logError } = await supabase
      .from("admin_funding_logs")
      .insert({
        admin_wallet,
        target_wallet,
        source_asset,
        reward_asset,
        network,
        dex,
        amount: numericAmount,
        tx_hash: txHash,
        status:
          dex === "uniswap_v3" &&
          source_asset === "ETH" &&
          reward_asset === "USDC"
            ? "executed"
            : "simulated",
      });

    if (logError) {
      console.error("Funding log failed:", logError);
    }

    return NextResponse.json({
      success: true,
      message:
        dex === "uniswap_v3" &&
        source_asset === "ETH" &&
        reward_asset === "USDC"
          ? "Pool funding executed via Uniswap V3"
          : "Pool funding simulated (no live swap for this pair yet)",
      tx_hash: txHash,
    });
  } catch (e: any) {
    console.error("Funding engine error:", e);
    return NextResponse.json(
      { error: "Unexpected funding error" },
      { status: 500 }
    );
  }
}
