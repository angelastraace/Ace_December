import { CockpitShell } from "@/components/CockpitShell";
import { EntityCard } from "@/components/EntityCard";
import { createServerSupabaseClient } from "@/lib/serverSupabase";

type LaunchStage = "Upcoming" | "Live" | "Ended";
type LaunchRisk = "Low" | "Medium" | "High";

type Launch = {
  id: string;
  name: string;
  ticker: string;
  stage: LaunchStage;
  target_raise_usd: number | null;
  filled_usd: number | null;
  vesting_summary: string | null;
  risk_band: LaunchRisk;
  starts_at: string | null;
  ends_at: string | null;
  tge_at: string | null;
};

function formatUsd(value: number | null | undefined): string {
  if (!value || value <= 0) return "$0";
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}k`;
  return `$${value.toFixed(0)}`;
}

function computeProgress(launch: Launch): number {
  const target = launch.target_raise_usd ?? 0;
  const filled = launch.filled_usd ?? 0;
  if (target <= 0) return 0;
  const pct = (filled / target) * 100;
  return Math.max(0, Math.min(100, Math.round(pct)));
}

export default async function LaunchpadPage() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("launches")
    .select("*")
    .order("created_at", { ascending: true });

  const launches: Launch[] = (data as Launch[]) ?? [];

  const liveCount = launches.filter((l) => l.stage === "Live").length;
  const upcomingCount = launches.filter((l) => l.stage === "Upcoming").length;
  const endedCount = launches.filter((l) => l.stage === "Ended").length;

  const hasError = !!error;

  return (
    <CockpitShell
      title="Launchpad"
      subtitle="Curated token launches with brutal transparency, not mystery cliffs."
    >
      {/* TOP ROW: OVERVIEW + DISCLOSURE */}
      <section className="grid gap-4 lg:grid-cols-[1.5fr,1.2fr] anim-fade-up">
        <div className="cockpit-panel p-5 md:p-6">
          <div className="cockpit-label mb-3">PIPELINE OVERVIEW</div>
          <div className="grid grid-cols-3 gap-3 text-xs font-mono text-slate-300">
            <div>
              <div className="text-slate-400 mb-1">Live sales</div>
              <div className="text-emerald-400">{liveCount}</div>
            </div>
            <div>
              <div className="text-slate-400 mb-1">Upcoming</div>
              <div className="text-cyan-300">{upcomingCount}</div>
            </div>
            <div>
              <div className="text-slate-400 mb-1">Completed</div>
              <div className="text-slate-100">{endedCount}</div>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-slate-500">
            Counts here come straight from Supabase (public.launches). When you
            add or update launches there, this panel updates automatically.
          </p>
          {hasError && (
            <p className="mt-2 text-[10px] text-rose-300">
              Supabase error: {error.message}
            </p>
          )}
        </div>

        <div className="cockpit-panel p-5 md:p-6 space-y-3">
          <div className="cockpit-label mb-2">DISCLOSURE PANEL</div>
          <p className="text-[11px] text-slate-300">
            Launchpad participation is ultra high risk. Tokens can go to zero,
            unlock schedules can get abused, and narratives can die faster than
            your attention span.
          </p>
          <p className="text-[11px] text-slate-300">
            ACE will show cliff dates, unlock amounts, and early whale movements
            instead of pretending that &quot;community round&quot; means anything
            without context.
          </p>
          <p className="text-[11px] text-slate-500">
            This page is still a UI mock for now, but the launch rows are now
            backed by Supabase data.
          </p>
        </div>
      </section>

      {/* MAIN GRID: LAUNCH CARDS + ALLOCATION TABLE */}
      <section className="mt-6 grid gap-4 lg:grid-cols-[1.6fr,1.2fr] anim-fade-up">
        {/* Launch cards */}
        <div className="cockpit-panel p-4 md:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="cockpit-label">ACTIVE & UPCOMING LAUNCHES</span>
            <span className="text-[11px] font-mono text-slate-400">
              SOURCE · public.launches
            </span>
          </div>

          <div className="space-y-3">
            {launches.map((launch) => {
              const progress = computeProgress(launch);
              return (
                <EntityCard
                  key={launch.id}
                  title={launch.name}
                  subtitle={`${launch.ticker} · Target raise ${formatUsd(
                    launch.target_raise_usd
                  )}`}
                  badge={
                    <span className="xp-chip">
                      {launch.stage.toUpperCase()} · RISK{" "}
                      {launch.risk_band}
                    </span>
                  }
                  footer={
                    <>
                      <span>
                        When wired to real contracts, this card becomes your
                        main &quot;do I even touch this&quot; panel.
                      </span>
                      <button
                        type="button"
                        className="cockpit-button rounded-full border border-cyan-400/60 bg-cyan-500/10 px-3 py-1.5 font-mono text-[11px] text-cyan-100 hover:bg-cyan-500/20 hover:shadow-cockpit-strong transition"
                      >
                        VIEW DETAILS (DEMO)
                      </button>
                    </>
                  }
                >
                  <div className="space-y-1 text-[11px] font-mono text-slate-300">
                    <div className="flex justify-between">
                      <span>Filled</span>
                      <span className="text-slate-100">
                        {formatUsd(launch.filled_usd)}
                      </span>
                    </div>
                    <div className="xp-bar">
                      <div
                        className="xp-bar-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Vesting</span>
                      <span className="text-right">
                        {launch.vesting_summary ?? "TBA"}
                      </span>
                    </div>
                  </div>
                </EntityCard>
              );
            })}

            {launches.length === 0 && !hasError && (
              <p className="text-[11px] text-slate-500">
                No launches found in public.launches yet. Seed some rows in
                Supabase and refresh this page.
              </p>
            )}
          </div>
        </div>

        {/* Allocation table (still mock, but ready) */}
        <div className="cockpit-panel p-4 md:p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="cockpit-label">YOUR ALLOCATIONS</span>
            <span className="text-[11px] font-mono text-slate-400">
              WALLET · DISCONNECTED
            </span>
          </div>

          <div className="rounded-2xl border border-slate-700/70 bg-slate-950/70 px-3 py-3 text-[11px] text-slate-300">
            <p className="text-slate-400">Connect a wallet later to see:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-slate-300">
              <li>Per-launch allocation and cost basis</li>
              <li>Claimed vs unclaimed token amounts</li>
              <li>XP earned from launch participation</li>
            </ul>
            <p className="mt-2 text-[10px] text-slate-500">
              For now, this panel is intentionally empty. The table below will
              eventually join public.launch_allocations with public.launches.
            </p>
          </div>

          <div className="mt-1">
            <div className="grid grid-cols-[1.3fr,0.9fr,0.9fr] text-[10px] font-mono text-slate-500 border-b border-slate-700/70 pb-1">
              <span>Launch</span>
              <span className="text-right">Alloc</span>
              <span className="text-right">XP</span>
            </div>

            <div className="py-4 text-[11px] font-mono text-slate-500 text-center">
              No wallet connected · allocations and XP history will show here.
            </div>
          </div>
        </div>
      </section>
    </CockpitShell>
  );
}
