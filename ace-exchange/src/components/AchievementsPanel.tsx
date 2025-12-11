"use client";

import { useEffect, useState } from "react";

type Achievement = {
  code: string;
  title: string;
  description: string;
  xp_reward?: number | null;
  category?: string | null;
  unlocked: boolean;
  unlocked_at: string | null;
};

type AchievementsPanelProps = {
  wallet: string | null;
};

export default function AchievementsPanel({ wallet }: AchievementsPanelProps) {
  const demoWallet = "0xDEMO000000000000000000000000000000000000";
  const activeWallet = wallet || demoWallet;

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // For popups
  const [initialized, setInitialized] = useState(false);
  const [prevUnlocked, setPrevUnlocked] = useState<Set<string> | null>(null);
  const [recentUnlocks, setRecentUnlocks] = useState<Achievement[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `/api/achievements/list?wallet=${activeWallet}`
        );

        const raw = await res.text();
        let json: any = {};

        // Be robust against HTML / non-JSON responses
        try {
  json = raw ? JSON.parse(raw) : {};
} catch (parseErr) {
  // In dev you can uncomment this to inspect the HTML response:
  // console.warn(
  //   "Achievements API returned non-JSON response. First 200 chars:",
  //   raw.slice(0, 200)
  // );

  // Soft-fallback: treat as "no achievements" instead of throwing
  if (!cancelled) {
    setAchievements([]);
    setLoading(false);
  }
  return;
}


        if (!res.ok) {
          throw new Error(json.error || `Failed (${res.status})`);
        }

        if (cancelled) return;

        const list: Achievement[] = json.achievements || [];

        // Detect newly unlocked achievements (for popups)
        const currentUnlocked = new Set(
          list.filter((a) => a.unlocked).map((a) => a.code)
        );

        if (initialized && prevUnlocked) {
          const newlyUnlocked = list.filter(
            (a) => a.unlocked && !prevUnlocked.has(a.code)
          );

          if (newlyUnlocked.length > 0) {
            setRecentUnlocks(newlyUnlocked);

            // Optional tiny sound (reuse same sound as level-up if you want)
            try {
              const audio = new Audio("/sounds/level-up.mp3");
              audio.volume = 0.35;
              audio.play().catch(() => {});
            } catch (e) {
              console.error("Achievement audio failed:", e);
            }
          }
        }

        setPrevUnlocked(currentUnlocked);
        setInitialized(true);
        setAchievements(list);
      } catch (e: any) {
        console.error("Achievements load error:", e);
        if (!cancelled) {
          setError(e.message || "Failed to load achievements");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [activeWallet, initialized, prevUnlocked]);

  // Auto-hide popups after a few seconds
  useEffect(() => {
    if (!recentUnlocks.length) return;
    const timer = setTimeout(() => setRecentUnlocks([]), 4000);
    return () => clearTimeout(timer);
  }, [recentUnlocks]);

  if (loading) {
    return (
      <div className="cockpit-panel bg-glass border-subtle p-4 text-sm text-white/70">
        Scanning flight log for achievements…
      </div>
    );
  }

  if (error) {
    return (
      <div className="cockpit-panel bg-glass border-subtle p-4 text-sm text-white/70">
        No achievements telemetry available right now. Command is recalibrating sensors.
      </div>
    );
  }

  if (!achievements.length) {
    return (
      <div className="cockpit-panel bg-glass border-subtle p-4 text-sm text-white/70">
        No achievements defined yet. Command will push new challenges soon.
      </div>
    );
  }

  const unlocked = achievements.filter((a) => a.unlocked);
  const locked = achievements.filter((a) => !a.unlocked);

  return (
    <>
      {/* Achievement popups */}
      {recentUnlocks.length > 0 && (
        <div className="fixed inset-x-0 top-24 z-40 flex flex-col items-center gap-2 pointer-events-none">
          {recentUnlocks.map((a) => (
            <div
              key={a.code}
              className="pointer-events-auto rounded-xl border border-emerald-500/60 bg-black/80 px-4 py-3 shadow-xl backdrop-blur-sm max-w-sm w-full mx-4 animate-[fadeInUp_0.3s_ease-out]"
            >
              <div className="text-[0.65rem] uppercase tracking-wide text-emerald-300/80">
                Achievement unlocked
              </div>
              <div className="mt-0.5 text-sm font-semibold text-white">
                {a.title}
              </div>
              <div className="mt-1 text-[0.75rem] text-white/70">
                {a.description}
              </div>
              {a.xp_reward && a.xp_reward > 0 && (
                <div className="mt-1 text-[0.7rem] text-emerald-300">
                  +{a.xp_reward} XP
                </div>
              )}
              <button
                onClick={() =>
                  setRecentUnlocks((prev) =>
                    prev.filter((x) => x.code !== a.code)
                  )
                }
                className="mt-2 text-[0.65rem] text-emerald-300/80 hover:text-emerald-200"
              >
                Dismiss
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main achievements list */}
      <div className="space-y-4">
        {/* Unlocked section */}
        <div className="cockpit-panel bg-glass border-subtle p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="hud-label">Unlocked achievements</div>
            <div className="text-xs text-muted">
              {unlocked.length} / {achievements.length} unlocked
            </div>
          </div>

          {unlocked.length === 0 ? (
            <p className="text-xs text-white/70">
              No badges yet. Complete quests and use ACE to unlock your first
              achievement.
            </p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {unlocked.map((a) => {
                const date = a.unlocked_at ? new Date(a.unlocked_at) : null;

                return (
                  <div
                    key={a.code}
                    className="rounded-lg border border-green-500/60 bg-green-900/20 px-3 py-2 text-xs flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-white/90">
                        {a.title}
                      </div>
                      <div className="xp-glow font-semibold text-[0.7rem]">
                        {a.xp_reward ? `+${a.xp_reward} XP` : ""}
                      </div>
                    </div>
                    <p className="text-[0.7rem] text-muted">
                      {a.description}
                    </p>
                    {date && (
                      <div className="text-[0.65rem] text-green-300/80 mt-1">
                        Unlocked {date.toLocaleDateString()}{" "}
                        {date.toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Locked section */}
        {locked.length > 0 && (
          <div className="cockpit-panel bg-glass border-subtle p-4 space-y-3">
            <div className="hud-label">Locked achievements</div>
            <div className="grid gap-3 md:grid-cols-2">
              {locked.map((a) => (
                <div
                  key={a.code}
                  className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs flex flex-col gap-1 opacity-60"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-white/70">
                      {a.title}
                    </div>
                    <div className="text-[0.7rem] text-white/50">
                      {a.xp_reward ? `+${a.xp_reward} XP` : ""}
                    </div>
                  </div>
                  <p className="text-[0.7rem] text-muted">
                    {a.description}
                  </p>
                  <div className="text-[0.65rem] text-white/40 mt-1">
                    Keep trading, staking, and completing quests to unlock.
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
