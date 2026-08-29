// src/app/page.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';

/**
 * ACE Exchange - Homepage (client page)
 * - Single file, ready to drop into src/app/page.tsx
 * - Uses Tailwind for styling. Replace CSS vars/classes to match your theme.
 * - All data calls use `fetch` to /api/* endpoints — replace with your endpoints if different.
 *
 * Avoids duplicate keys by using stable unique ids for mapped lists.
 */

/* -------------------- Types -------------------- */
type MarketTicker = {
  id: string; // unique id (symbol or pair)
  pair: string;
  price: number;
  change24h: number; // percent
  volume24h?: number;
};

type PortfolioItem = {
  id: string;
  symbol: string;
  amount: number;
  valueUSD: number;
};

type ActivityItem = {
  id: string;
  type: 'trade' | 'deposit' | 'withdraw' | 'reward';
  message: string;
  ts: string; // ISO
};

type AchievementPreview = {
  id: string;
  title: string;
  xpReward: number;
  progress: number; // 0..100
};

/* -------------------- Utilities -------------------- */
const formatUsd = (v: number) =>
  v >= 1 ? `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `$${v.toFixed(6)}`;

const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return `${secs}s`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
};

/* -------------------- Small UI bits -------------------- */
function StarfieldBg() {
  // purely decorative starfield done with CSS + divs; tweak as needed in Tailwind
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ mixBlendMode: 'screen', opacity: 0.6 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-transparent" />
      <div className="w-[200%] h-[200%] absolute -left-1/2 -top-1/2 animate-[spin_120s_linear_infinite] opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice">
          {/* dots approximating stars */}
          <g fill="white" fillOpacity="0.6">
            <circle cx="20" cy="30" r="0.8" />
            <circle cx="120" cy="130" r="0.9" />
            <circle cx="220" cy="210" r="0.6" />
            <circle cx="420" cy="110" r="1.1" />
            <circle cx="520" cy="310" r="0.7" />
            <circle cx="720" cy="610" r="0.8" />
            {/* More small stars can be added or randomized in the future */}
          </g>
        </svg>
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs bg-white/5">{children}</span>;
}

/* -------------------- Main Component -------------------- */
export default function HomePage() {
  // Markets
  const [tickers, setTickers] = useState<MarketTicker[] | null>(null);
  const [tickersLoading, setTickersLoading] = useState(false);

  // Portfolio
  const [portfolio, setPortfolio] = useState<PortfolioItem[] | null>(null);
  const [portfolioLoading, setPortfolioLoading] = useState(false);

  // Activity
  const [activity, setActivity] = useState<ActivityItem[] | null>(null);
  const [activityLoading, setActivityLoading] = useState(false);

  // Achievements preview
  const [achievements, setAchievements] = useState<AchievementPreview[] | null>(null);
  const [achLoading, setAchLoading] = useState(false);

  // Small UI states
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setError(null);
    fetchTickers();
    fetchPortfolio();
    fetchActivity();
    fetchAchievements();
  }

  async function fetchTickers() {
    setTickersLoading(true);
    try {
      // replace with your real API
      const res = await fetch('/api/market/tickers');
      if (!res.ok) throw new Error('Tickers fetch failed');
      const data = (await res.json()) as MarketTicker[];
      // ensure stable unique ids (in case backend returns duplicates)
      const dedup = data.map((d) => ({ ...d, id: d.id ?? d.pair }));
      setTickers(dedup);
    } catch (e: any) {
      // Fallback demo data if endpoint missing
      setTickers([
        { id: 'ETH-USDC', pair: 'ETH / USDC', price: 3550.12, change24h: 2.3, volume24h: 1_200_000 },
        { id: 'BTC-USDC', pair: 'BTC / USDC', price: 58500.5, change24h: -1.7, volume24h: 8_500_000 },
        { id: 'ACE-ETH', pair: 'ACE / ETH', price: 0.01234, change24h: 8.1, volume24h: 120_000 },
      ]);
      setError(null); // keep subtle about errors
    } finally {
      setTickersLoading(false);
    }
  }

  async function fetchPortfolio() {
    setPortfolioLoading(true);
    try {
      const res = await fetch('/api/wallet/portfolio');
      if (!res.ok) throw new Error('Portfolio fetch failed');
      const data = (await res.json()) as PortfolioItem[];
      setPortfolio(data);
    } catch {
      // demo fallback
      setPortfolio([
        { id: 'p-1', symbol: 'ETH', amount: 1.2345, valueUSD: 4387.23 },
        { id: 'p-2', symbol: 'BTC', amount: 0.0123, valueUSD: 720.45 },
        { id: 'p-3', symbol: 'ACE', amount: 5120, valueUSD: 63.22 },
      ]);
    } finally {
      setPortfolioLoading(false);
    }
  }

  async function fetchActivity() {
    setActivityLoading(true);
    try {
      const res = await fetch('/api/activity/recent');
      if (!res.ok) throw new Error('Activity fetch failed');
      const data = (await res.json()) as ActivityItem[];
      setActivity(data);
    } catch {
      setActivity([
        { id: 'a-1', type: 'reward', message: 'Quest completed +50 XP', ts: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
        { id: 'a-2', type: 'trade', message: 'Sold 0.1 ETH for USDC', ts: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString() },
        { id: 'a-3', type: 'deposit', message: 'Deposited 500 USDC', ts: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
      ]);
    } finally {
      setActivityLoading(false);
    }
  }

  async function fetchAchievements() {
    setAchLoading(true);
    try {
      const res = await fetch('/api/achievements/preview');
      if (!res.ok) throw new Error('Achievements fetch failed');
      const data = (await res.json()) as AchievementPreview[];
      setAchievements(data);
    } catch {
      setAchievements([
        { id: 'ach-1', title: 'First Trade', xpReward: 50, progress: 100 },
        { id: 'ach-2', title: 'Welcome Aboard', xpReward: 20, progress: 100 },
        { id: 'ach-3', title: 'Liquidity Rookie', xpReward: 150, progress: 40 },
      ]);
    } finally {
      setAchLoading(false);
    }
  }

  // Derived totals
  const totalPortfolioValue = useMemo(() => (portfolio?.reduce((s, p) => s + (p.valueUSD ?? 0), 0) ?? 0), [portfolio]);

  /* -------------------- Render -------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white relative">
      <StarfieldBg />

      <header className="max-w-6xl mx-auto px-6 md:px-12 py-10 flex items-start gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">ACE Exchange</h1>
          <p className="text-slate-400 mt-2 max-w-xl">
            Cut the fluff. Fast trades, real rewards, and honest UX — earn XP, level up, and own your on-chain story.
          </p>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => fetchAll()}
            className="px-4 py-2 rounded-lg border border-white/6 bg-white/2 hover:bg-white/4 text-sm"
            title="Refresh data"
          >
            Refresh
          </button>
          <a href="/connect" className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-semibold">
            Connect Wallet
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
        {/* Top Row: Portfolio + Tickers */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 bg-white/2 border border-white/5 rounded-2xl p-6">
            <div className="flex items-start gap-6">
              <div>
                <div className="text-xs text-slate-400">Portfolio value</div>
                <div className="text-3xl font-extrabold">{formatUsd(totalPortfolioValue)}</div>
                <div className="text-sm text-slate-400 mt-1">Unrealized P&L: <span className="text-emerald-400">+2.1%</span></div>
              </div>

              <div className="ml-auto text-right">
                <Badge>Real yields</Badge>
                <div className="text-xs text-slate-400 mt-2">Total assets</div>
                <div className="font-medium">{portfolio?.length ?? 0}</div>
              </div>
            </div>

            {/* Holdings list */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {portfolioLoading ? (
                <div>Loading portfolio…</div>
              ) : (
                portfolio?.map((p) => (
                  <div key={p.id} className="bg-black/25 p-4 rounded-lg border border-white/4">
                    <div className="flex items-baseline justify-between">
                      <div className="font-semibold">{p.symbol}</div>
                      <div className="text-sm text-slate-400">{p.amount}</div>
                    </div>
                    <div className="mt-2 text-sm text-slate-200">{formatUsd(p.valueUSD)}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <aside className="bg-white/2 border border-white/5 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-slate-400">Markets</div>
              <a href="/market" className="text-xs hover:underline">See all</a>
            </div>

            {tickersLoading ? (
              <div>Loading markets…</div>
            ) : (
              <div className="space-y-2">
                {tickers?.map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-2 rounded-md hover:bg-white/3">
                    <div>
                      <div className="font-medium">{t.pair}</div>
                      <div className="text-xs text-slate-400">{formatUsd(t.price)}</div>
                    </div>
                    <div className={`text-sm font-medium ${t.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {t.change24h >= 0 ? `+${t.change24h.toFixed(2)}%` : `${t.change24h.toFixed(2)}%`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </section>

        {/* Middle Row: Activity, Achievements, Quick Actions */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/2 border border-white/5 p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent activity</h2>
              <a className="text-sm text-slate-400 hover:underline" href="/activity">Full history</a>
            </div>

            <div className="mt-4 space-y-3">
              {activityLoading ? (
                <div>Loading…</div>
              ) : (
                activity?.map((act) => (
                  <div key={act.id} className="flex items-start gap-4 p-3 rounded-md hover:bg-white/3">
                    <div className="w-10 h-10 rounded-lg bg-black/20 flex items-center justify-center text-sm font-medium">
                      {act.type[0].toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <div className="text-sm">{act.message}</div>
                        <div className="text-xs text-slate-400">{timeAgo(act.ts)}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <aside className="bg-white/2 border border-white/5 p-6 rounded-2xl space-y-4">
            <div>
              <h3 className="text-sm font-medium">XP & Achievements</h3>
              <p className="text-xs text-slate-400 mt-1">Progress toward next rewards.</p>
            </div>

            <div className="space-y-3">
              {achLoading ? (
                <div>Loading achievements…</div>
              ) : (
                achievements?.map((a) => (
                  <div key={a.id} className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <div className="text-sm font-medium">{a.title}</div>
                      <div className="text-xs text-slate-400">{a.xpReward} XP</div>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                      <div
                        className="h-2 bg-white/20 rounded-full"
                        style={{ width: `${Math.max(0, Math.min(100, a.progress))}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 border-t border-white/6">
              <a href="/earn" className="block w-full text-center px-3 py-2 rounded-md bg-ace-primary text-black font-semibold">Earn XP</a>
            </div>
          </aside>
        </section>

        {/* Bottom Row: Quick Actions / Promo */}
        <section className="mt-8">
          <div className="bg-gradient-to-r from-slate-900/60 to-slate-800/40 border border-white/4 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Launch into ACE Kat — limited beta</h3>
              <p className="text-slate-400 mt-2">Special rewards for early creators. Create, mint, and launch with a friendly onboarding flow.</p>
            </div>

            <div className="flex gap-3">
              <a href="/launchpad" className="px-4 py-2 rounded-lg bg-white/5 border border-white/6">Explore launchpad</a>
              <a href="/ace-kat" className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 font-semibold">Open ACE Kat</a>
            </div>
          </div>
        </section>

        {/* Footer / small print */}
        <footer className="mt-12 text-sm text-slate-500">
          <div className="max-w-6xl mx-auto px-6 md:px-12 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>© {new Date().getFullYear()} ACE Exchange — Built honestly.</div>
              <div className="flex gap-4">
                <a href="/about" className="hover:underline">About</a>
                <a href="/terms" className="hover:underline">Terms</a>
                <a href="/privacy" className="hover:underline">Privacy</a>
                <a href="/support" className="hover:underline">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Global error toast (simple) */}
      {error && (
        <div className="fixed bottom-6 right-6 bg-rose-600 text-white px-4 py-2 rounded-md shadow-lg">
          {error}
          <button className="ml-4 underline" onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
    </div>
  );
}
