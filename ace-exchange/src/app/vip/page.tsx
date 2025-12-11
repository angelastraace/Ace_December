import { CockpitShell } from "@/components/CockpitShell";
import Link from "next/link";

const mockConversations = [
  {
    id: 1,
    title: "Risk check before degen long",
    summary: "Asked ACE Kat to sanity-check a 25x long on ACE/USDC.",
    time: "3 min ago",
  },
  {
    id: 2,
    title: "Tax friendly PnL export",
    summary: "Generated a PnL CSV for my accountant that doesn’t suck.",
    time: "2 hours ago",
  },
  {
    id: 3,
    title: "Launchpad scouting",
    summary: "Compared 3 upcoming launches based on vesting, backing and risk.",
    time: "Yesterday",
  },
];

export default function VipPage() {
  return (
    <CockpitShell
      title="ACE Kat · VIP Cockpit"
      subtitle="Your sarcastic navigator for risky ideas and honest answers."
    >
      <section className="grid gap-6 md:grid-cols-[1.4fr,1.2fr] anim-fade-up">
        {/* Left: Chat console placeholder */}
        <div className="cockpit-panel p-5 md:p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="cockpit-label">KAT CONSOLE</span>
            <span className="xp-chip">
              MODE: <span className="status-ready">BETA</span>
            </span>
          </div>

          <div className="rounded-2xl border border-slate-700/70 bg-slate-950/70 px-3 py-2 text-[11px] font-mono text-slate-400">
            <div className="text-cyan-300 mb-1">ace-kat&gt;</div>
            <p>
              I&apos;m ACE Kat. I can sanity-check your trades, explain why your
              idea is terrible, or confirm that yes, this is pure degen energy.
            </p>
          </div>

          {/* Fake chat log area */}
          <div className="flex-1 rounded-2xl border border-slate-700/70 bg-slate-950/60 p-3 md:p-4 flex flex-col gap-3 overflow-hidden">
            <div className="flex-1 overflow-y-auto space-y-3 text-xs">
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-slate-500">
                  YOU · 02:14
                </div>
                <div className="inline-block max-w-[80%] rounded-2xl bg-slate-800/80 px-3 py-2 text-slate-100">
                  Is it a bad idea to 25x long ACE right before CPI?
                </div>
              </div>

              <div className="space-y-1 text-right">
                <div className="text-[10px] font-mono text-slate-500">
                  ACE KAT · 02:14
                </div>
                <div className="inline-block max-w-[80%] rounded-2xl bg-cyan-500/15 border border-cyan-400/40 px-3 py-2 text-slate-100">
                  From a pure survival standpoint? Yes. From a degen lore
                  standpoint? Also yes. Size like it can go to zero and you&apos;ll
                  still sleep tonight.
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] font-mono text-slate-500">
                  YOU · 02:15
                </div>
                <div className="inline-block max-w-[80%] rounded-2xl bg-slate-800/80 px-3 py-2 text-slate-100">
                  What&apos;s a safer play?
                </div>
              </div>

              <div className="space-y-1 text-right">
                <div className="text-[10px] font-mono text-slate-500">
                  ACE KAT · 02:15
                </div>
                <div className="inline-block max-w-[80%] rounded-2xl bg-cyan-500/15 border border-cyan-400/40 px-3 py-2 text-slate-100">
                  Split size across spot ACE, core LP, and a tiny perp flyer.
                  You keep upside, reduce &quot;my account is gone&quot; risk.
                </div>
              </div>
            </div>

            {/* Input row */}
            <div className="mt-3 flex items-center gap-2">
              <input
                className="flex-1 rounded-full border border-slate-600/80 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/70"
                placeholder="Type your next bad idea here…"
                disabled
              />
              <button
                type="button"
                disabled
                className="cockpit-button rounded-full border border-slate-600/60 bg-slate-800/70 px-3 py-2 text-[11px] font-mono text-slate-400 cursor-not-allowed"
              >
                COMING SOON
              </button>
            </div>
          </div>

          <p className="text-[11px] text-slate-500">
            This is a UI mock. Later we can wire this to a real agent backend
            and optionally sync decisions with your XP / quest engine.
          </p>
        </div>

        {/* Right: VIP perks + recent sessions */}
        <div className="space-y-4">
          <div className="cockpit-panel p-5 md:p-6">
            <div className="cockpit-label mb-3">VIP PERKS</div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>• Explain complex trades in plain, non-cringe language.</li>
              <li>• Flag obviously terrible leverage ideas before you click.</li>
              <li>• Convert your PnL into something your accountant understands.</li>
              <li>• Translate on-chain chaos into a simple bias &amp; plan.</li>
            </ul>
            <p className="mt-3 text-[11px] text-slate-500">
              ACE Kat doesn&apos;t give financial advice. It just makes your
              decision-making less random and more self-aware.
            </p>
          </div>

          <div className="cockpit-panel p-5 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="cockpit-label">RECENT SESSIONS</span>
              <Link
                href="/learn"
                className="text-[11px] font-mono text-cyan-300 hover:text-cyan-200"
              >
                VIEW QUEST LOG →
              </Link>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              {mockConversations.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-700/70 bg-slate-950/60 px-3 py-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-slate-400">
                      {item.time}
                    </span>
                    <span className="xp-chip">VIP</span>
                  </div>
                  <div className="mt-1 text-slate-100">{item.title}</div>
                  <div className="text-[11px] text-slate-500">
                    {item.summary}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </CockpitShell>
  );
}
