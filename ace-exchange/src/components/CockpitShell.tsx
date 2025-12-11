// src/components/CockpitShell.tsx
import type { ReactNode } from "react";
import Link from "next/link";
import { fetchXpBalance } from "@/lib/fetchXp";

type CockpitShellProps = {
  title?: string;
  subtitle?: string;
  rightSlot?: ReactNode;
  children: ReactNode;
};

export async function CockpitShell({
  title,
  subtitle,
  rightSlot,
  children,
}: CockpitShellProps) {
  const profileId = process.env.NEXT_PUBLIC_DEMO_PROFILE_ID;
  const xp = profileId ? await fetchXpBalance(profileId) : null;

  const totalXp = xp?.total_xp ?? 0;
  const level = xp?.level ?? 1;
  const nextLevelXp = level * 10000;
  const percent = Math.min((totalXp / nextLevelXp) * 100, 100);

  return (
    <main className="min-h-screen px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Top nav / status bar with real XP HUD */}
        <header className="cockpit-panel flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl border border-cyan-400/40 bg-slate-900/80 flex items-center justify-center text-xs font-bold text-cyan-300">
              ACE
            </div>
            <div>
              <div className="cockpit-label">ACE EXCHANGE</div>
              <p className="text-xs text-slate-400">
                {subtitle ?? "Space-native trading cockpit for real degens."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* REAL XP HUD (from Supabase) */}
            {xp && (
              <div className="hidden md:flex items-center gap-3">
                <div className="text-[10px] font-mono text-slate-400">
                  LVL {level}
                </div>
                <div className="w-32 xp-bar">
                  <div
                    className="xp-bar-fill"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="text-[10px] font-mono text-cyan-300">
                  {totalXp.toLocaleString()} XP
                </div>
              </div>
            )}

            {/* Status */}
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse glow-cyan" />
              <span>COCKPIT STATUS</span>
              <span className="text-emerald-400">ONLINE</span>
            </div>

            {rightSlot ?? (
              <Link
                href="/vip"
                className="rounded-full border border-cyan-400/60 bg-cyan-500/15 px-3 py-1.5 text-xs font-medium text-cyan-100 hover:bg-cyan-500/25 hover:shadow-cockpit-strong transition"
              >
                Launch VIP Mode
              </Link>
            )}
          </div>
        </header>

        {/* Page content wrapper */}
        {title ? (
          <section className="space-y-6 anim-fade-up">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
              {title}
            </h1>
            {children}
          </section>
        ) : (
          children
        )}
      </div>
    </main>
  );
}
