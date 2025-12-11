"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

function calculateLevel(xp: number) {
  const xpPerLevel = 10000;
  const level = Math.max(1, Math.floor(xp / xpPerLevel) + 1);
  const currentLevelStart = (level - 1) * xpPerLevel;
  const nextLevelXp = level * xpPerLevel;
  const xpIntoLevel = xp - currentLevelStart;
  const xpNeededThisLevel = nextLevelXp - currentLevelStart;
  const percent =
    xpNeededThisLevel === 0
      ? 0
      : Math.min(100, Math.round((xpIntoLevel / xpNeededThisLevel) * 100));

  return {
    level,
    currentLevelStart,
    nextLevelXp,
    xpIntoLevel,
    xpNeededThisLevel,
    percent,
  };
}

export function XPHud() {
  // Base demo XP + quest progress (static, local-only)
  const [baseXp, setBaseXp] = useState(123_450);

  const [tradesDone, setTradesDone] = useState(2);
  const tradesGoal = 3;

  const [lpDone, setLpDone] = useState(false);
  const [launchpadDone, setLaunchpadDone] = useState(false);

  const totalXp = useMemo(() => {
    let extra = 0;
    extra += tradesDone * 500; // 500 XP per trade for demo
    if (lpDone) extra += 2000;
    if (launchpadDone) extra += 3500;
    return baseXp + extra;
  }, [baseXp, tradesDone, lpDone, launchpadDone]);

  const levelInfo = useMemo(() => calculateLevel(totalXp), [totalXp]);

  const handleLogTrade = () => {
    if (tradesDone >= tradesGoal) return;
    setTradesDone((prev) => Math.min(tradesGoal, prev + 1));
  };

  const handleCompleteLP = () => {
    if (!lpDone) setLpDone(true);
  };

  const handleCompleteLaunchpad = () => {
    if (!launchpadDone) setLaunchpadDone(true);
  };

  const handleResetDemo = () => {
    setBaseXp(123_450);
    setTradesDone(2);
    setLpDone(false);
    setLaunchpadDone(false);
  };

  const tradesPercent = Math.round((tradesDone / tradesGoal) * 100);
  const lpStatus = lpDone ? "COMPLETED" : "READY";
  const launchStatus = launchpadDone ? "COMPLETED" : "READY";

  return (
    <section className="grid gap-4 md:grid-cols-[1.4fr,1.2fr] anim-fade-up">
      {/* Left: XP summary */}
      <div className="cockpit-panel p-5 md:p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="cockpit-label">XP STATUS</span>
          <span className="xp-chip">
            <span>LEVEL {levelInfo.level}</span>
            <span>•</span>
            <span>{formatNumber(totalXp)} XP</span>
          </span>
        </div>

        <div className="space-y-3 text-xs text-slate-300">
          <div className="flex justify-between font-mono">
            <span>XP this level</span>
            <span>
              {formatNumber(levelInfo.xpIntoLevel)} /{" "}
              {formatNumber(levelInfo.xpNeededThisLevel)}
            </span>
          </div>
          <div className="xp-bar mt-1">
            <div
              className="xp-bar-fill"
              style={{ width: `${levelInfo.percent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>To next level</span>
            <span>
              {formatNumber(Math.max(0, levelInfo.nextLevelXp - totalXp))} XP
            </span>
          </div>

          <p className="text-[11px] text-slate-500">
            This HUD is running on demo logic: actions you trigger below add XP
            locally so you can see how the system will feel before wiring it to
            a backend or on-chain data.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
          <button
            type="button"
            onClick={handleResetDemo}
            className="cockpit-button rounded-full border border-slate-600/80 bg-slate-900/70 px-3 py-1.5 font-mono text-slate-200 hover:border-slate-400 transition"
          >
            RESET DEMO STATE
          </button>
          <Link
            href="/learn"
            className="text-[11px] font-mono text-cyan-300 hover:text-cyan-200"
          >
            OPEN FULL QUEST LOG →
          </Link>
        </div>
      </div>

      {/* Right: interactive mini quests */}
      <div className="cockpit-panel p-5 md:p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="cockpit-label">TODAY&apos;S MINI QUESTS</span>
          <span className="text-[10px] font-mono text-slate-400">
            LOCAL DEMO ONLY
          </span>
        </div>

        <ul className="space-y-3 text-xs text-slate-300">
          {/* Quest 1: Trades */}
          <li className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div>Log 3 trades on any pair</div>
                <div className="text-[11px] text-slate-500">
                  +500 XP per trade (demo)
                </div>
              </div>
              <span className="xp-chip">
                {tradesDone} / {tradesGoal}
              </span>
            </div>
            <div className="xp-bar">
              <div
                className="xp-bar-fill"
                style={{ width: `${tradesPercent}%` }}
              />
            </div>
            <button
              type="button"
              onClick={handleLogTrade}
              disabled={tradesDone >= tradesGoal}
              className="cockpit-button self-start rounded-full border border-cyan-400/60 bg-cyan-500/10 px-3 py-1.5 text-[11px] font-mono text-cyan-100 hover:bg-cyan-500/20 hover:shadow-cockpit-strong transition"
            >
              {tradesDone >= tradesGoal ? "QUEST COMPLETE" : "LOG TRADE"}
            </button>
          </li>

          {/* Quest 2: LP */}
          <li className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div>Provide LP &gt; $500 notional</div>
                <div className="text-[11px] text-slate-500">
                  +2,000 XP (demo)
                </div>
              </div>
              <span className={`xp-chip ${lpDone ? "status-ready" : ""}`}>
                {lpDone ? "COMPLETED" : "READY"}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCompleteLP}
              disabled={lpDone}
              className="cockpit-button self-start rounded-full border border-cyan-400/60 bg-cyan-500/10 px-3 py-1.5 text-[11px] font-mono text-cyan-100 hover:bg-cyan-500/20 hover:shadow-cockpit-strong transition"
            >
              {lpDone ? "LP QUEST COMPLETE" : "MARK LP AS DONE"}
            </button>
          </li>

          {/* Quest 3: Launchpad */}
          <li className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div>Join one launchpad allocation</div>
                <div className="text-[11px] text-slate-500">
                  +3,500 XP (demo)
                </div>
              </div>
              <span
                className={`xp-chip ${launchpadDone ? "status-ready" : ""}`}
              >
                {launchStatus}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCompleteLaunchpad}
              disabled={launchpadDone}
              className="cockpit-button self-start rounded-full border border-cyan-400/60 bg-cyan-500/10 px-3 py-1.5 text-[11px] font-mono text-cyan-100 hover:bg-cyan-500/20 hover:shadow-cockpit-strong transition"
            >
              {launchpadDone
                ? "LAUNCHPAD QUEST COMPLETE"
                : "MARK LAUNCHPAD AS DONE"}
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}
