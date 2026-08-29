"use client";

import { useAccount } from "wagmi";
import QuestPanel from "@/components/QuestPanel";

export default function DashboardPage() {
  const { address } = useAccount();
  const walletAddress = address ?? null;

  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-white/60">Your command center.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <p className="text-xs text-white/50">Total XP</p>
          <p className="mt-1 text-xl font-semibold text-purple-300">Live</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <p className="text-xs text-white/50">Vaults</p>
          <p className="mt-1 text-xl font-semibold">Live</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <p className="text-xs text-white/50">Quests</p>
          <p className="mt-1 text-xl font-semibold text-emerald-300">Live</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Active Quests</h2>
        <QuestPanel wallet={walletAddress} />
      </section>
    </div>
  );
}
