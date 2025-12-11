"use client";

import { useEffect, useState } from "react";
import { getLevelInfo } from "@/lib/leveling";

type XPSummaryBarProps = {
  wallet: string | null;
};

export default function XPSummaryBar({ wallet }: XPSummaryBarProps) {
  const demoWallet = "0xDEMO000000000000000000000000000000000000";
  const activeWallet = wallet || demoWallet;

  const [totalXp, setTotalXp] = useState(0);
  const [questsCompleted, setQuestsCompleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `/api/profile/summary?wallet=${activeWallet}`
        );
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error || `Failed (${res.status})`);
        }

        if (cancelled) return;

        // Try to be defensive about the response shape
        const summary = json.summary ?? json;

        const xp =
          summary.total_xp ??
          summary.totalXp ??
          0;

        const qc =
          summary.quests_completed ??
          summary.questsCompleted ??
          0;

        setTotalXp(typeof xp === "number" ? xp : 0);
        setQuestsCompleted(typeof qc === "number" ? qc : 0);
      } catch (e: any) {
        console.error("XP summary load error:", e);
        if (!cancelled) {
          setError(e.message || "Failed to load XP summary");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    function handleRefresh() {
      if (!cancelled) load();
    }

    // React to quests emitting xp:refresh
    window.addEventListener("xp:refresh", handleRefresh);

    return () => {
      cancelled = true;
      window.removeEventListener("xp:refresh", handleRefresh);
    };
  }, [activeWallet]);

  if (loading) {
    return (
      <div className="text-xs text-white/60">
        Calculating flight level…
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-xs text-red-400">
        Failed to load XP summary: {error}
      </div>
    );
  }

  const levelInfo = getLevelInfo(totalXp);
  const level = levelInfo.level;
  const xpToNext = levelInfo.xpToNext;
  const progressPercent = levelInfo.progressPercent;

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs gap-2">
      <div className="flex flex-wrap gap-4">
        <span>LVL {level}</span>
        <span>{totalXp} XP</span>
        <span>{questsCompleted} quests completed</span>
      </div>

      <div className="text-right">
        <div className="text-[0.7rem] text-muted">
          PROGRESS TO NEXT LEVEL ({xpToNext} XP TO GO)
        </div>
        <div className="mt-1 h-1.5 w-48 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-green-400"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
