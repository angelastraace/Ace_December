// src/lib/fetchXp.ts
import { createServerSupabaseClient } from "@/lib/serverSupabase";

export async function fetchXpBalance(profileId: string) {
  const supabase = createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("xp_balances")
    .select("total_xp, level")
    .eq("profile_id", profileId)
    .single();

  if (error) {
    console.error("XP fetch error:", error.message);
    return null;
  }

  return data as { total_xp: number; level: number };
}
