"use client";

import WalletProfilePanel from "@/components/WalletProfilePanel";
import AchievementsPanel from "@/components/AchievementsPanel";

export default function XPPage() {
  // Later you can replace this with real wallet integration
  // Example: const { address } = useAccount();
  const walletAddress: string | null = null;

  return (
    <div className="min-h-screen p-6 space-y-6 bg-black text-white">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Wallet Profile */}
        <WalletProfilePanel wallet={walletAddress} />

        {/* Achievements */}
        <AchievementsPanel wallet={walletAddress} />

      </div>
    </div>
  );
}
