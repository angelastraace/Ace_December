import { CockpitShell } from "@/components/CockpitShell";
import { EntityCard } from "@/components/EntityCard";
import { createServerSupabaseClient } from "@/lib/serverSupabase";

type QuestStatus = "READY" | "IN PROGRESS" | "LOCKED" | "CLAIMABLE";

type Quest = {
  id: string;
  title: string;
  description: string;
  type: "Daily" | "Weekly" | "One-shot";
  reward: string;
  progressLabel: string;
  progressPercent: number;
  status: QuestStatus;
};

function statusChip(status: QuestStatus) {
  const base = "xp-chip";
  switch (status) {
    case "READY":
      return `${base} status-ready`;
    case "IN PROGRESS":
      return base;
    case "LOCKED":
      return `${base} status-danger`;
    case "CLAIMABLE":
      return `${base} status-ready glow-cyan`;
    default:
      return base;
  }
}

// Map DB rows (from public.quests) into the UI Quest type
function mapDbQuestToUi(row: any): Quest {
  const questType =
    row.quest_type === "Daily" || row.quest_type === "Weekly"
      ? row.quest_type
      : "One-shot";

  // For now we just mark everything as READY with 0% progress.
  // Later you’ll join with quest_progress to compute real progress.
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    type: questType,
    reward: `+${row.reward_xp} XP`,
    progressLabel: "READY TO START",
    progressPercent: 0,
    status: "READY",
  };
}

export default async function LearnPage() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("quests")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: true });

  // Fallback: if Supabase fails for some reason, keep the page alive
  const quests: Quest[] =
    !error && data
      ? data.map(mapDbQuestToUi)
      : [
          {
            id: "fallback-1",
            title: "Demo quest (fallback)",
            description:
              "Supabase query failed or returned no data. This is a hardcoded fallback quest.",
            type: "Daily",
            reward: "+1,000 XP",
            progressLabel: "READY TO START",
            progressPercent: 0,
            status: "READY",
          },
        ];

  return (
    <CockpitShell
      title="Quest Log"
      subtitle="XP missions that reward real activity, not fake engagement."
    >
      {/* Top summary row */}
      <section className="grid gap-4 md:grid-cols-[1.5fr,1.1fr] anim-fade-up">
        <div className="cockpit-panel p-5 md:p-6">
          <div className="cockpit-label mb-3">MISSION CONTROL</div>
          <p className="text-xs text-slate-300 mb-3">
            Every quest here is tied to verifiable on-chain actions. No social
            spam, no pointless clicks. Complete missions, level up, and unlock
            higher XP multipliers.
          </p>
          <p className="text-[11px] text-slate-500">
            This page is now backed by Supabase. Later we&apos;ll connect it to
            your wallet and quest_progress for live states.
          </p>
        </div>

        <div className="cockpit-panel p-5 md:p-6">
          <div className="cockpit-label mb-3">QUEST OVERVIEW</div>
          <div className="space-y-3 text-xs font-mono text-slate-300">
            <div className="flex justify-between">
              <span>Total quests</span>
              <span>{quests.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Daily missions</span>
              <span>
                {quests.filter((q) => q.type === "Daily").length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Weekly missions</span>
              <span>
                {quests.filter((q) => q.type === "Weekly").length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>One-shot missions</span>
              <span>
                {quests.filter((q) => q.type === "One-shot").length}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quest list */}
      <section className="mt-6 cockpit-panel p-4 md:p-6 anim-fade-up">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div>
            <div className="cockpit-label mb-1">ACTIVE QUESTS</div>
            <p className="text-xs text-slate-400">
              These rows are coming straight from Supabase (public.quests).
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="xp-chip">Filter: All</span>
            <span className="xp-chip">Daily</span>
            <span className="xp-chip">Weekly</span>
            <span className="xp-chip">One-shot</span>
          </div>
        </div>

        <div className="space-y-3">
          {quests.map((quest) => (
            <EntityCard
              key={quest.id}
              title={quest.title}
              subtitle={`${quest.type} · ${quest.reward}`}
              badge={
                <span className={statusChip(quest.status)}>
                  {quest.status}
                </span>
              }
              footer={
                <>
                  <span className="text-[10px] font-mono text-slate-500">
                    {quest.progressLabel}
                  </span>
                  <button
                    className="cockpit-button rounded-full border border-cyan-400/50 bg-cyan-500/10 px-3 py-1.5 text-[11px] font-mono text-cyan-100 hover:bg-cyan-500/20 hover:shadow-cockpit-strong transition"
                  >
                    VIEW DETAILS
                  </button>
                </>
              }
            >
              <div className="space-y-2">
                <div className="text-[11px] text-slate-400">
                  {quest.description}
                </div>
                <div>
                  <div className="xp-bar">
                    <div
                      className="xp-bar-fill"
                      style={{ width: `${quest.progressPercent}%` }}
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>{quest.progressLabel}</span>
                    <span>{quest.progressPercent}%</span>
                  </div>
                </div>
              </div>
            </EntityCard>
          ))}
        </div>
      </section>
    </CockpitShell>
  );
}
