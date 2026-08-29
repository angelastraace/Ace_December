// src/components/RealXPHud.tsx
import { fetchXpBalance } from "@/lib/fetchXp";

export async function RealXPHud() {
  const profileId = process.env.NEXT_PUBLIC_DEMO_PROFILE_ID;
  const xp = profileId ? await fetchXpBalance(profileId) : null;

  if (!xp) return null;

  const nextLevelXp = xp.level * 10000;
  const remaining = Math.max(nextLevelXp - xp.total_xp, 0);
  const percent = Math.min((xp.total_xp / nextLevelXp) * 100, 100);

  return (
    <div className="cockpit-panel p-4 space-y-2">
      <div className="flex justify-between text-xs font-mono text-slate-400">
        <span>LEVEL {xp.level}</span>
        <span>{xp.total_xp.toLocaleString()} XP</span>
      </div>

      <div className="w-full xp-bar">
        <div
          className="xp-bar-fill"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="text-[10px] text-slate-500">
        {remaining.toLocaleString()} XP to next level
      </div>
    </div>
  );
}
