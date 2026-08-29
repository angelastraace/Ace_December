"use client";

import { useEffect, useState } from "react";
import { getLevelInfo } from "@/lib/leveling";

type ProfileSummary = {
  wallet: string;
  total_xp: number;
  quests_completed: number;
};

type ProfileCardProps = {
  wallet: string | null;
};

export default function ProfileCard({ wallet }: ProfileCardProps) {
  const demoWallet = "0xDEMO000000000000000000000000000000000000";
  const activeWallet = wallet || demoWallet;

  const [data, setData] = useState<ProfileSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/profile/summary?wallet=${activeWallet}`);
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error || `Failed (${res.status})`);
        }

        if (!cancelled) {
          const summary = json.summary ?? json;

          setData({
            wallet: activeWallet,
            total_xp: summary.total_xp ?? 0,
            quests_completed: summary.quests_completed ?? 0
          });
        }
      } catch (e: any) {
        console.error("Profile summary error:", e);
        if (!cancelled) {
          setError(e.message || "Failed to load profile");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [activeWallet]);

  if (loading) {
    return (
      <div className="cockpit-panel bg-glass border-subtle p-4 text-sm text-white/70">
        Syncing telemetry…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="cockpit-panel bg-glass border-subtle p-4 text-sm text-red-400">
        Failed to load profile: {error ?? "Unknown error"}
      </div>
    );
  }

  const { total_xp, quests_completed } = data;

  // ✅ Real level system
  const levelInfo = getLevelInfo(total_xp);
  const level = levelInfo.level;
  const xpToNext = levelInfo.xpToNext;
  const progressPct = levelInfo.progressPercent;

  const shortWallet =
    activeWallet.slice(0, 6) + "…" + activeWallet.slice(-4);

  return (
    <div className="cockpit-panel bg-glass border-subtle p-4 flex items-center justify-between gap-6">
      <div className="space-y-1">
        <div className="hud-label">Pilot profile</div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="text-sm font-medium">
            {wallet ? "Connected wallet" : "Demo wallet"}
          </div>
          <div className="font-mono text-xs text-muted">{shortWallet}</div>
        </div>

        <div className="flex items-center gap-6 mt-2 flex-wrap">
          <div>
            <div className="hud-label">Level</div>
            <div className="text-xl font-semibold">LVL {level}</div>
          </div>

          <div>
            <div className="hud-label">Total XP</div>
            <div className="xp-glow text-lg font-semibold">
              {total_xp.toLocaleString()} XP
            </div>
          </div>

          <div>
            <div className="hud-label">Quests completed</div>
            <div className="text-sm font-medium">
              {quests_completed.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-56 min-w-[12rem]">
        <div className="hud-label mb-1">
          Progress to next level ({xpToNext} XP to go)
        </div>
        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full xp-glow bg-green-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
