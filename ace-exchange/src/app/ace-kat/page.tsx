"use client";

import { useAccount } from "wagmi";
import QuestPanel from "@/components/QuestPanel";

export default function AceKatPage() {
  const { address } = useAccount();
  const walletAddress = address ?? null;

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <aside className="max-w-md rounded-2xl border border-white/10 bg-black/50 p-6">
        <h1 className="text-xl font-semibold text-purple-300">ACE Kat</h1>
        <p className="mt-2 text-sm text-white/70">
          You survived the market today.  
          The chain noticed. Pick a mission.
        </p>
      </aside>

      <main className="flex-1 space-y-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">Missions</h2>
          <p className="text-xs text-white/50">Assigned by a cat with privileges.</p>
        </div>

        <QuestPanel wallet={walletAddress} />
      </main>
    </div>
  );
}
