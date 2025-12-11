import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  const wallet = req.query.wallet as string;
  if (!wallet) return res.status(400).json({ error: "Missing wallet" });

  const { data: all } = await supabase.from("achievements").select("*");

  const { data: earned } = await supabase
    .from("user_achievements")
    .select("achievement_id")
    .eq("wallet_address", wallet);

  res.json({
    achievements: all || [],
    earned: (earned || []).map(e => e.achievement_id),
  });
}
