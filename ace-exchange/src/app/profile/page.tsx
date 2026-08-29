"use client";

import { useAccount } from "wagmi";
import ProfileCard from "@/components/ProfileCard";
import XPEventFeed from "@/components/XPEventFeed";

export default function ProfilePage() {
  const { address } = useAccount();
  const walletAddress = address ?? null;

  return (
    <div className="p-6 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Profile
        </h1>
        <p className="text-sm text-white/60 max-w-xl">
          Your ACE pilot card. Track your XP, level, and actions across the
          exchange.
        </p>
      </header>

      {/* XP HUD / profile summary */}
      <section>
        <ProfileCard wallet={walletAddress} />
      </section>

      {/* XP event log */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Activity</h2>
        <XPEventFeed wallet={walletAddress} />
      </section>
    </div>
  );
}
