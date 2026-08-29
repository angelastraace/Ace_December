import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  const { wallet, code } = req.body;
  if (!wallet || !code) return res.status(400).json({ error: "Missing params" });

  const { data: ach } = await supabase
    .from("achievements")
    .select("*")
    .eq("code", code)
    .single();

  if (!ach) return res.status(404).json({ error: "Achievement not found" });

  // Prevent duplicates
  const { data: existing } = await supabase
    .from("user_achievements")
    .select("id")
    .eq("wallet_address", wallet)
    .eq("achievement_id", ach.id)
    .maybeSingle();

  if (existing) return res.json({ ok: true, already: true });

  await supabase.from("user_achievements").insert({
    wallet_address: wallet,
    achievement_id: ach.id
  });

  res.json({ ok: true });
}
