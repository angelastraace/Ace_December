// src/components/VaultDepositButton.tsx
"use client";

import { useState } from "react";

type VaultDepositButtonProps = {
  vaultId: string;
  vaultName: string;
};

export function VaultDepositButton({
  vaultId,
  vaultName,
}: VaultDepositButtonProps) {
  const [loading, setLoading] = useState(false);
  const [lastAward, setLastAward] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    setLastAward(null);
    try {
      const res = await fetch("/api/vault/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vaultId }),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Failed to record XP");
      }

      if (typeof json.xpAward === "number") {
        setLastAward(json.xpAward);
      }
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-xl border border-emerald-400/70 bg-emerald-500/20 px-3 py-1.5 text-[12px] font-medium text-emerald-50 hover:bg-emerald-500/30 hover:shadow-cockpit-strong disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? "Logging deposit…" : "Simulate vault deposit"}
      </button>
      {lastAward != null && (
        <p className="text-[10px] text-emerald-300">
          +{lastAward.toLocaleString()} XP recorded for {vaultName}
        </p>
      )}
      {error && (
        <p className="text-[10px] text-rose-400">
          XP event failed: {error}
        </p>
      )}
      <p className="text-[10px] text-slate-500">
        Demo-only: creates a <span className="font-mono">vault_yield</span> XP
        event in Supabase for your demo profile.
      </p>
    </div>
  );
}
