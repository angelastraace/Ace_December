// Simple non-linear level curve for ACE

// Total XP required to reach a given level.
// Level 1 = 0 XP, then ramps up.
export function xpRequiredForLevel(level: number): number {
  if (level <= 1) return 0;
  // tweak these numbers to change pacing
  return Math.round(50 * (level - 1) * (level - 1) + 50 * (level - 1));
}

// Given total XP, compute level + progress info
export function getLevelInfo(totalXp: number) {
  if (totalXp < 0) totalXp = 0;

  let level = 1;

  // Find highest level where required XP <= totalXp
  while (xpRequiredForLevel(level + 1) <= totalXp) {
    level++;
  }

  const currentLevelXp = xpRequiredForLevel(level);
  const nextLevelXp = xpRequiredForLevel(level + 1);

  const xpIntoLevel = totalXp - currentLevelXp;
  const xpToNext = Math.max(nextLevelXp - totalXp, 0);

  const levelSpan = nextLevelXp - currentLevelXp || 1;
  const progress = xpIntoLevel / levelSpan;        // 0–1
  const progressPercent = Math.round(progress * 100);

  return {
    level,
    totalXp,
    currentLevelXp,
    nextLevelXp,
    xpIntoLevel,
    xpToNext,
    progress,         // 0–1
    progressPercent,  // 0–100
  };
}
