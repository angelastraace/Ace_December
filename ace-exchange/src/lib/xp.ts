// src/lib/xp.ts
import { supabase } from "./supabaseClient";

export async function awardXP(
  wallet: string,
  amount: number,
  reason: string
) {
  if (!wallet || amount <= 0) return;

  // Store event
  await supabase.from("xp_events").insert({
    wallet_address: wallet,
    source: "quest",
    amount,
    metadata: { reason },
  });

  // Read current balance
  const { data: existing } = await supabase
    .from("xp_balances")
    .select("total_xp, level")
    .eq("wallet_address", wallet)
    .maybeSingle();

  if (existing) {
    const newXP = existing.total_xp + amount;
    const newLevel = Math.floor(newXP / 100) + 1;

    await supabase
      .from("xp_balances")
      .update({
        total_xp: newXP,
        level: newLevel,
        last_event_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("wallet_address", wallet);
  } else {
    await supabase.from("xp_balances").insert({
      wallet_address: wallet,
      total_xp: amount,
      level: Math.floor(amount / 100) + 1,
      last_event_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
}
