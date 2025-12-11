export function emitAchievementsRefresh() {
  window.dispatchEvent(new Event("achievements:refresh"));
}

export function emitXPRefresh() {
  window.dispatchEvent(new Event("xp:refresh"));
}
