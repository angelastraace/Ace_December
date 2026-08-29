"use client";

import { emitAchievementsRefresh, emitXPRefresh } from "@/lib/events";
import { useEffect, useState } from "react";

type Quest = {
  id: string | number;
  code: string;
  title: string;
  description: string;
  xp_reward: number | null;
};

type QuestPanelProps = {
  wallet: string | null;
};

export default function QuestPanel({ wallet }: QuestPanelProps) {
  const demoWallet = "0xDEMO000000000000000000000000000000000000";
  const activeWallet = wallet || demoWallet;

  const [quests, setQuests] = useState<Quest[]>([]);
  const [completed, setCompleted] = useState<(string | number)[]>([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState<string | number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/quests/list?wallet=${activeWallet}`);
        const data = await res.json();

        if (cancelled) return;

        if (!res.ok) {
          throw new Error(data.error || `Failed to load quests (${res.status})`);
        }

        setQuests(data.quests || []);
        setCompleted(data.completed || []);
      } catch (e: any) {
        console.error("Quest load error:", e);
        if (!cancelled) {
          setError(e.message || "Failed to load quests");
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

  async function handleComplete(quest: Quest) {
    try {
      if (!activeWallet) {
        alert("Connect your wallet to run this mission.");
        return;
      }

      setClaiming(quest.id);
      setError(null);

      const res = await fetch("/api/quests/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet: activeWallet,
          quest_code: quest.code,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Quest claim failed");
      }

      // Our API returns: { status: "completed" | "already_completed", xp_reward }
      const status: string | undefined = data.status;
      const xpFromApi: number | undefined = data.xp_reward ?? data.xp;

      if (status !== "completed" && status !== "already_completed") {
        throw new Error("Unexpected quest completion status");
      }

      // Mark as completed locally
      setCompleted((prev) =>
        prev.some((c) => String(c) === String(quest.id))
          ? prev
          : [...prev, quest.id]
      );

      const gained =
        status === "completed"
          ? (typeof xpFromApi === "number"
              ? xpFromApi
              : quest.xp_reward ?? 0)
          : 0;

      if (gained > 0) {
        alert(`Quest completed! +${gained} XP`);
        emitXPRefresh();
        emitAchievementsRefresh();
      } else if (status === "already_completed") {
        // Optional: let user know it was already done
        console.log("Quest already completed, no extra XP granted.");
      }
    } catch (e: any) {
      console.error("Quest complete error:", e);
      setError(e.message || "Failed to complete quest");
    } finally {
      setClaiming(null);
    }
  }

  if (loading) {
    return <p className="text-sm text-white/60">Loading missions…</p>;
  }

  if (error) {
    return (
      <p className="text-sm text-red-400">Failed to load quests: {error}</p>
    );
  }

  if (!quests.length) {
    return (
      <p className="text-sm text-white/60">
        No active quests right now. Command will upload new missions soon.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {quests.map((quest) => {
        const done = completed.some((c) => String(c) === String(quest.id));
        const isClaiming = claiming === quest.id;
        const reward = quest.xp_reward ?? 0;

        return (
          <div
            key={quest.id}
            className={`cockpit-panel bg-glass border-subtle p-4 flex items-start justify-between gap-4 transition-all ${
              done
                ? "opacity-70 border-green-500/40 bg-green-950/20"
                : "hover:border-white/25"
            }`}
          >
            <div className="space-y-1">
              <div className="hud-label">Quest • {quest.code}</div>
              <h3 className="font-semibold text-sm">{quest.title}</h3>
              <p className="text-xs text-muted max-w-md">
                {quest.description}
              </p>
              <p className="text-xs mt-1">
                Reward:{" "}
                <span className="xp-glow font-semibold">
                  +{reward} XP
                </span>
              </p>
            </div>

            <button
              disabled={done || isClaiming}
              className={`px-3 py-1.5 text-xs rounded-md border transition
                ${
                  done
                    ? "border-green-500/60 text-green-300 bg-green-900/30 cursor-not-allowed"
                    : "border-white/30 bg-white/5 hover:bg-white/10"
                }`}
              onClick={() => handleComplete(quest)}
            >
              {done
                ? "✓ Completed"
                : isClaiming
                ? "Claiming..."
                : "Run mission"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
