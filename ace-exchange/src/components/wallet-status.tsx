"use client";

import { useState } from "react";
import { Wallet, PlugZap } from "lucide-react";

export function WalletStatus() {
  const [connected, setConnected] = useState(false);

  const label = connected ? "0xAce...Live" : "Connect Wallet";

  return (
    <button
      onClick={() => setConnected((v) => !v)}
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] transition-colors ${
        connected
          ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-100 hover:bg-emerald-500/20"
          : "border-cyan-400/60 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20"
      }`}
    >
      {connected ? (
        <Wallet className="w-3 h-3" />
      ) : (
        <PlugZap className="w-3 h-3" />
      )}
      <span>{label}</span>
    </button>
  );
}
