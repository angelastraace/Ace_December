"use client";

import { useEffect, useState } from "react";
import { getLevelInfo } from "@/lib/leveling";

type XPSummaryBarProps = {
  wallet: string | null;
};

// Rank titles + color themes per level bracket
function getRankVisuals(level: number) {
  if (level >= 50) {
    return {
      rankTitle: "Legend",
      badgeClass:
        "bg-yellow-500/15 text-yellow-300 border border-yellow-500/50",
      barClass: "bg-yellow-400",
    };
  }

  if (level >= 25) {
    return {
      rankTitle: "Ace",
      badgeClass:
        "bg-purple-500/15 text-purple-300 border border-purple-500/50",
      barClass: "bg-purple-400",
    };
  }

  if (level >= 10) {
    return {
      rankTitle: "Pilot",
      badgeClass:
        "bg-blue-500/15 text-blue-300 border border-blue-500/50",
      barClass: "bg-blue-400",
    };
  }

  // Default: early levels
  return {
    rankTitle: "Cadet",
    badgeClass:
      "bg-emerald-500/15 text-emerald-300 border border-emerald-500/50",
    barClass: "bg-emerald-400",
  };
}

export default function XPSummaryBar({ wallet }: XPSummaryBarProps) {
  const demoWallet = "0xDEMO000000000000000000000000000000000000";
  const activeWallet = wallet || demoWallet;

  const [totalXp, setTotalXp] = useState(0);
  const [questsCompleted, setQuestsCompleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Level-up tracking
  const [initialized, setInitialized] = useState(false);
  const [lastLevel, setLastLevel] = useState<number | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpFrom, setLevelUpFrom] = useState<number | null>(null);
  const [levelUpTo, setLevelUpTo] = useState<number | null>(null);

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

    window.addEventListener("xp:refresh", handleRefresh);

    return () => {
      cancelled = true;
      window.removeEventListener("xp:refresh", handleRefresh);
    };
  }, [activeWallet]);

  const levelInfo = getLevelInfo(totalXp);
  const formattedXp = totalXp.toLocaleString();
  const level = levelInfo.level;
  const xpToNext = levelInfo.xpToNext;
  const progressPercent = levelInfo.progressPercent;

  const { rankTitle, badgeClass, barClass } = getRankVisuals(level);

  // Detect level ups + play sound
  useEffect(() => {
    if (loading || error) return;

    // First successful load: just sync state, no popup or sound
    if (!initialized) {
      setInitialized(true);
      setLastLevel(level);
      return;
    }

    // Later updates: trigger popup + sound if level increased
    if (lastLevel !== null && level > lastLevel) {
      const from = lastLevel;
      const to = level;

      setLastLevel(level);
      setLevelUpFrom(from);
      setLevelUpTo(to);
      setShowLevelUp(true);

      // Tiny audio ping
      try {
        const audio = new Audio("/sounds/level-up.mp3");
        audio.volume = 0.4;
        audio.play().catch(() => {
          // Ignore autoplay / user-gesture issues silently
        });
      } catch (e) {
        console.error("Level-up audio failed:", e);
      }

      const timer = setTimeout(() => setShowLevelUp(false), 3500);
      return () => clearTimeout(timer);
    }

    if (lastLevel === null) {
      setLastLevel(level);
    }
  }, [level, loading, error, initialized, lastLevel]);

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

  return (
    <>
      {/* Level-up popup */}
      {showLevelUp && levelUpFrom !== null && levelUpTo !== null && (
        <div className="fixed inset-x-0 top-16 z-40 flex justify-center pointer-events-none">
          <div className="pointer-events-auto rounded-xl border border-accent/60 bg-black/80 px-4 py-3 shadow-xl backdrop-blur">
            <div className="text-[0.65rem] uppercase tracking-wide text-accent/80">
              Level up
            </div>
            <div className="text-sm font-semibold text-white">
              Level {levelUpFrom} → {levelUpTo} · {rankTitle}
            </div>
            <div className="mt-1 text-[0.7rem] text-white/70">
              New rank reached. Systems upgraded, pilot.
            </div>
            <button
              onClick={() => setShowLevelUp(false)}
              className="mt-2 text-[0.65rem] text-accent/70 hover:text-accent"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* XP + Level bar */}
      <div className="flex flex-col gap-2 text-xs md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span>LVL {level}</span>
          <span>{formattedXp} XP</span>
          <span
            className={`rounded-full px-2 py-0.5 text-[0.65rem] ${badgeClass}`}
          >
            {rankTitle}
          </span>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="text-[0.7rem] text-muted">
            {questsCompleted} quests completed
          </div>
          <div className="text-[0.7rem] text-muted">
            PROGRESS TO NEXT LEVEL ({xpToNext} XP TO GO)
          </div>
          <div className="mt-0.5 h-1.5 w-48 rounded-full bg-white/10 overflow-hidden">
            <div
              className={
                "h-full transition-all duration-500 " +
                barClass +
                " " +
                (showLevelUp
                  ? "animate-pulse shadow-[0_0_16px_rgba(250,250,250,0.7)]"
                  : "")
              }
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
