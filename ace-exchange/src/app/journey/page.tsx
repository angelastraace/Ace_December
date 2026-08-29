"use client";

import { useAccount } from "wagmi";
import QuestPanel from "@/components/QuestPanel";

export default function JourneyPage() {
  const { address } = useAccount();
  const walletAddress = address ?? null;

  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold">Journey</h1>
        <p className="text-sm text-white/60">Your ACE timeline.</p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-black/40 p-6">
        <p className="text-sm text-white/60">
          Major milestones, level-ups, and legendary moments will live here.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Journey Quests</h2>
        <QuestPanel wallet={walletAddress} />
      </section>
    </div>
  );
}
