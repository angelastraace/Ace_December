// inside AdminOnchainFundingPanel.tsx (client)
async function handleSend() {
  try {
    setLoading(true);
    setError(null);
    setResult(null);

    // map UI fields to server API payload
    const payload = {
      userWallet: target_wallet,          // ensure this is 0x...
      tokenSymbol: reward_asset,          // e.g. "USDC" or "WETH"
      amount: amount,                     // string, e.g. "10.5"
      source: mode,                       // "treasury" | "lp-position" | "swap-then-send"
      // optional:
      source_asset: source_asset,         // if you want server to use custom source for swaps
    };

    const res = await fetch("/api/admin/onchain/fund-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Use header auth for dev. In prod swap for cookie + server guard.
        "x-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET || "",
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json?.error || `Request failed: ${res.status}`);
    }

    // expected server response: { success: true, txHash, adminWallet, tokenSymbol, amount, source }
    setResult(json);
  } catch (e: any) {
    console.error("Admin funding error", e);
    setError(e.message || "Failed to send funds");
  } finally {
    setLoading(false);
  }
}
