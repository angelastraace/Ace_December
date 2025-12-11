import Link from "next/link";
import { CockpitShell } from "@/components/CockpitShell";
import { RealXPHud } from "@/components/RealXPHud";

export default function Home() {
  return (
    <CockpitShell
      title="Trade like you're sitting in a space cockpit."
      subtitle="A blunt, data-first exchange that pays you in XP for every legit action you take on-chain."
    >
      <div className="space-y-8">
        {/* Hero + XP HUD row */}
        <section className="grid gap-6 md:grid-cols-[1.6fr,1fr] anim-fade-up">
          {/* Left: mission brief + stats */}
          <div className="cockpit-panel p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <p className="cockpit-label">MISSION BRIEFING</p>
              <p className="text-sm text-slate-300 max-w-xl">
                No more fake marketing, mystery rewards or casino UIs. ACE is a
                blunt, data-first exchange that pays you in XP for every legit
                action you take on-chain.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-cyan-400/25 bg-slate-900/60 px-4 py-3 shadow-cockpit-soft">
                <div className="text-[10px] text-slate-400 mb-1">
                  LIVE XP POOL
                </div>
                <div className="text-lg font-mono text-cyan-300">
                  1,248,900
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Distributed to traders in the last 24h.
                </div>
              </div>

              <div className="rounded-xl border border-slate-700/70 bg-slate-900/60 px-4 py-3">
                <div className="text-[10px] text-slate-400 mb-1">
                  ACTIVE QUESTS
                </div>
                <div className="text-lg font-mono text-emerald-400">37</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Bridge, swap, stake &amp; launchpad missions.
                </div>
              </div>

              <div className="rounded-xl border border-slate-700/70 bg-slate-900/60 px-4 py-3">
                <div className="text-[10px] text-slate-400 mb-1">
                  VERIFIED DEGENS
                </div>
                <div className="text-lg font-mono text-slate-100">
                  4,209
                  <span className="ml-1 text-[11px] text-emerald-400 align-middle">
                    +128 online
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Real humans, no botted volume.
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <Link
                href="/trading"
                className="inline-flex items-center justify-center rounded-xl border border-cyan-400/70 bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-50 hover:bg-cyan-500/30 hover:shadow-cockpit-strong transition"
              >
                Enter Trading Cockpit
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center justify-center rounded-xl border border-slate-600/80 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 hover:border-slate-400 transition"
              >
                Watch mission walkthrough
              </Link>
              <p className="text-[11px] text-slate-500 md:ml-2">
                No KYC to explore. Connect wallet when you&apos;re ready to earn
                XP.
              </p>
            </div>
          </div>

          {/* Right: REAL XP HUD panel (Supabase-backed) */}
          <RealXPHud />
        </section>

        {/* Live telemetry row */}
        <section className="grid gap-6 md:grid-cols-[1.6fr,1fr] anim-fade-up">
          {/* Left: descriptive copy */}
          <div className="cockpit-panel p-5 md:p-6 space-y-4">
            <div className="cockpit-label">LIVE TELEMETRY</div>
            <p className="text-sm text-slate-300 max-w-xl">
              Market feeds, orderflow and funding rates are designed to be read
              at a glance, not buried behind five modals and a dark pattern.
            </p>
            <p className="text-[11px] text-slate-500">
              This section is still running on simulated data, but the layout is
              already wired like a real trading HUD: compact, legible, and ready
              for WebSocket feeds.
            </p>

            <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
              <div className="rounded-xl border border-slate-700/70 bg-slate-950/70 px-3 py-2">
                <div className="text-slate-400 mb-1">VOL 24H</div>
                <div className="text-slate-100">$128.4M</div>
              </div>
              <div className="rounded-xl border border-slate-700/70 bg-slate-950/70 px-3 py-2">
                <div className="text-slate-400 mb-1">FEE REBATE</div>
                <div className="text-emerald-400">up to 65%</div>
              </div>
              <div className="rounded-xl border border-slate-700/70 bg-slate-950/70 px-3 py-2">
                <div className="text-slate-400 mb-1">XP MULTIPLIER</div>
                <div className="text-cyan-300">x3.0 in beta</div>
              </div>
              <div className="rounded-xl border border-slate-700/70 bg-slate-950/70 px-3 py-2">
                <div className="text-slate-400 mb-1">LATENCY</div>
                <div className="text-emerald-400">&lt; 25 ms</div>
              </div>
            </div>
          </div>

          {/* Right: radar / heatmap */}
          <aside className="cockpit-panel p-5 md:p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="cockpit-label">RADAR VIEW</p>
              <span className="text-[10px] font-mono text-slate-400">
                FEED · SIMULATED
              </span>
            </div>

            <div className="relative h-40 rounded-2xl border border-cyan-400/25 bg-slate-950/70 overflow-hidden">
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute inset-0 border border-cyan-500/20 rounded-2xl" />
                <div className="absolute inset-4 border border-cyan-500/15 rounded-2xl" />
                <div className="absolute inset-8 border border-cyan-500/10 rounded-2xl" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-500/20" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-500/20" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full border border-emerald-400/50 radar-ping" />
                <div className="absolute text-[10px] font-mono text-cyan-200">
                  ORDERFLOW LOCKED
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* Lower row: shortcuts to key modules */}
        <section className="grid gap-4 md:grid-cols-4 anim-fade-up">
          {[
            {
              label: "Trading",
              href: "/trading",
              desc: "Spot, perp & degen tools.",
            },
            {
              label: "Earn",
              href: "/earn",
              desc: "Stake, LP and XP farming.",
            },
            {
              label: "Launchpad",
              href: "/launchpad",
              desc: "Curated token launches.",
            },
            {
              label: "ACE Kat",
              href: "/vip",
              desc: "Your sarcastic navigator.",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="cockpit-panel p-4 hover:border-cyan-400/60 hover:shadow-cockpit-strong transition flex flex-col justify-between"
            >
              <div>
                <div className="cockpit-label mb-2">{item.label}</div>
                <p className="text-xs text-slate-300">{item.desc}</p>
              </div>
              <div className="mt-3 text-[10px] font-mono text-cyan-300">
                ENTER MODULE →
              </div>
            </Link>
          ))}
        </section>
      </div>
    </CockpitShell>
  );
}
