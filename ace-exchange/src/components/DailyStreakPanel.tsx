"use client";

import { useEffect, useState } from "react";

type DailyStreakPanelProps = {
  wallet: string | null;
};

type StreakResponse = {
  current_streak: number;
  best_streak: number;
  last_completed_date: string | null;
};

export default function DailyStreakPanel({ wallet }: DailyStreakPanelProps) {
  const demoWallet = "0xDEMO000000000000000000000000000000000000";
  const activeWallet = wallet || demoWallet;

  const [streak, setStreak] = useState<StreakResponse>({
    current_streak: 0,
    best_streak: 0,
    last_completed_date: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `/api/daily/streak?wallet=${activeWallet}`
        );
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error || `Failed (${res.status})`);
        }

        if (cancelled) return;

        setStreak({
          current_streak: json.current_streak ?? 0,
          best_streak: json.best_streak ?? 0,
          last_completed_date: json.last_completed_date ?? null,
        });
      } catch (e: any) {
        console.error("Daily streak load error:", e);
        if (!cancelled) {
          setError(e.message || "Failed to load streak");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    function handleRefresh() {
      if (!cancelled) load();
    }

    // Refresh streak whenever XP refreshes (quests completed)
    window.addEventListener("xp:refresh", handleRefresh);

    return () => {
      cancelled = true;
      window.removeEventListener("xp:refresh", handleRefresh);
    };
  }, [activeWallet]);

  if (loading) {
    return (
      <div className="text-xs text-white/60">
        Syncing daily streak…
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-xs text-white/70">
        Daily streak data unavailable right now.
      </div>
    );
  }

  const { current_streak, best_streak } = streak;
  const isActive = current_streak > 0;

  return (
    <div className="cockpit-panel bg-glass border-subtle p-3 text-xs flex items-center justify-between">
      <div className="flex flex-col">
        <span className="hud-label">Daily streak</span>
        <span className="mt-1">
          {isActive
            ? `You are on a ${current_streak}-day streak.`
            : "Start a quest today to begin your streak."}
        </span>
      </div>
      <div className="text-right">
        <div className="text-[0.7rem] text-muted">
          Best streak: {best_streak} days
        </div>
      </div>
    </div>
  );
}
