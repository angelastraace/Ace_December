"use client";

import { useEffect, useState } from "react";

type XPEvent = {
  amount: number;
  source: string;
  metadata: any;
  created_at: string;
};

type XPEventFeedProps = {
  wallet: string | null;
};

export default function XPEventFeed({ wallet }: XPEventFeedProps) {
  const demoWallet = "0xDEMO000000000000000000000000000000000000";
  const activeWallet = wallet || demoWallet;

  const [events, setEvents] = useState<XPEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `/api/profile/activity?wallet=${activeWallet}`
        );
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error || `Failed (${res.status})`);
        }

        if (!cancelled) {
          setEvents(json.events || []);
        }
      } catch (e: any) {
        console.error("XP events error:", e);
        if (!cancelled) {
          setError(e.message || "Failed to load XP history");
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
  }, [activeWallet]);

  if (loading) {
    return (
      <div className="cockpit-panel bg-glass border-subtle p-4 text-sm text-white/70">
        Loading XP history…
      </div>
    );
  }

  if (error) {
    return (
      <div className="cockpit-panel bg-glass border-subtle p-4 text-sm text-red-400">
        Failed to load XP history: {error}
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="cockpit-panel bg-glass border-subtle p-4 text-sm text-white/70">
        No XP events yet. Run a quest or use ACE to start building your track record.
      </div>
    );
  }

  return (
    <div className="cockpit-panel bg-glass border-subtle p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="hud-label">XP event log</div>
        <div className="text-xs text-muted">
          Showing last {events.length} events
        </div>
      </div>

      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {events.map((event, idx) => {
          const date = new Date(event.created_at);
          const reason =
            event.metadata?.reason ||
            (event.source === "quest" ? "Quest reward" : event.source);

          return (
            <div
              key={`${event.created_at}-${idx}`}
              className="flex items-center justify-between text-xs border-b border-white/5 pb-1 last:border-b-0 last:pb-0"
            >
              <div className="space-y-0.5">
                <div className="font-medium text-white/90">
                  {reason}
                </div>
                <div className="text-[0.65rem] text-muted">
                  {date.toLocaleString()}
                </div>
              </div>
              <div className="xp-glow font-semibold">
                {event.amount > 0 ? `+${event.amount}` : event.amount} XP
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
