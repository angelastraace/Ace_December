// src/components/XPSummaryBar.tsx
"use client";

import { useEffect, useState } from "react";
import { getLevelInfo } from "@/lib/leveling";

type XPSummaryBarProps = {
  wallet: string | null;
};

type ProfileSummaryResponse = {
  total_xp?: number;
  quests_completed?: number;
  level?: number;
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

        const data: ProfileSummaryResponse = json.summary ?? json;

        const xp =
          data.total_xp ??
          (json.total_xp as number | undefined) ??
          0;

        const qc =
          data.quests_completed ??
          (json.quests_completed as number | undefined) ??
          0;

        setTotalXp(xp);
        setQuestsCompleted(qc);
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
      <div className="flex gap-4">
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
