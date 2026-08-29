"use client";

import { useState } from "react";

const ASSETS = ["USDT", "BTC", "ETH", "ACE"];

export default function AdminFundUserPanel() {
  const [wallet, setWallet] = useState("");
  const [asset, setAsset] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFund() {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const numericAmount = Number(amount);
      if (!wallet || !asset || !numericAmount || numericAmount <= 0) {
        setError("Wallet, asset and positive amount are required.");
        return;
      }

      const res = await fetch("/api/admin/fund-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target_wallet: wallet,
          asset,
          amount: numericAmount,
          reason: reason || undefined,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || `Failed (${res.status})`);
      }

      setResult(
        `Funded ${numericAmount} ${asset} to ${wallet}. New pool balance: ${json.pool_balance}, user balance: ${json.user_balance}`
      );
      setAmount("");
      setReason("");
    } catch (e: any) {
      console.error("Admin fund error:", e);
      setError(e.message || "Failed to fund user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cockpit-panel bg-glass border-subtle p-4 space-y-3 text-sm">
      <div className="flex items-center justify-between">
        <div className="hud-label">Admin · Fund user</div>
        <div className="text-[0.7rem] text-red-300/80">
          Admin-only. All actions are logged.
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <label className="block text-[0.7rem] text-muted mb-1">
            Target wallet address
          </label>
          <input
            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1 text-xs outline-none focus:border-accent focus:ring-0"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            placeholder="0x..."
          />
        </div>
} else {
  const txHash = await swapViaUniswapV3({
    walletClient,
    sourceAsset,
    rewardAsset,
    amountOut: numericAmount,
  });

  setResult(`Swap executed: ${txHash}`);
}

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-[0.7rem] text-muted mb-1">
              Asset
            </label>
            <select
              className="w-full rounded border border-white/10 bg-black/40 px-2 py-1 text-xs outline-none focus:border-accent focus:ring-0"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
            >
              {ASSETS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-[0.7rem] text-muted mb-1">
              Amount
            </label>
            <input
              type="number"
              min="0"
              step="0.00000001"
              className="w-full rounded border border-white/10 bg-black/40 px-2 py-1 text-xs outline-none focus:border-accent focus:ring-0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-[0.7rem] text-muted mb-1">
            Reason / note (optional)
          </label>
          <textarea
            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1 text-xs outline-none focus:border-accent focus:ring-0 min-h-[60px]"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Promo credit, compensation, manual correction…"
          />
        </div>
      </div>

      <button
        onClick={handleFund}
        disabled={loading}
        className="mt-2 inline-flex items-center justify-center rounded-md border border-accent/60 bg-accent/10 px-3 py-1 text-xs font-medium text-accent hover:bg-accent/20 disabled:opacity-60"
      >
        {loading ? "Processing…" : "Fund user from pool"}
      </button>

      {error && (
        <div className="text-xs text-red-400 mt-2">
          {error}
        </div>
      )}
      {result && (
        <div className="text-xs text-emerald-300 mt-2">
          {result}
        </div>
      )}
    </div>
  );
}
