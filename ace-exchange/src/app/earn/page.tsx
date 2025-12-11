"use client";

import { useAccount } from "wagmi";
import ProfileCard from "@/components/ProfileCard";
import QuestPanel from "@/components/QuestPanel";
import WalletProfilePanel from "@/components/WalletProfilePanel";
import XPSummaryBar from "@/components/XPSummaryBar";
import DailyStreakPanel from "@/components/DailyStreakPanel";

export default function EarnPage() {
  const { address } = useAccount();
  const walletAddress = address ?? null;

  return (
    <div className="space-y-8 p-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Earn</h1>
        <p className="text-sm text-white/60">
          Stake into ACE vaults and complete quests to stack XP.
        </p>
      </header>

      {/* Profile + XP summary */}
      <section className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <ProfileCard wallet={walletAddress} />
          <WalletProfilePanel wallet={walletAddress} />
        </div>

        <XPSummaryBar wallet={walletAddress} />
      </section>

      {/* Quests */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Quests</h2>
          <p className="text-xs text-white/50">Earn extra XP.</p>
        </div>

        <QuestPanel wallet={walletAddress} />
      </section>
    </div>
  );
}
