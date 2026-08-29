import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  const wallet = req.query.wallet as string;

  if (!wallet) return res.status(400).json({ error: "Missing wallet" });

  // Profile row
  const { data: profile } = await supabase
    .from("wallet_profiles")
    .select("*")
    .eq("wallet_address", wallet)
    .maybeSingle();

  // XP
  const { data: xpRow } = await supabase
    .from("xp_balances")
    .select("xp_balance")
    .eq("wallet_address", wallet)
    .maybeSingle();

  const xp = xpRow?.xp_balance || 0;
  const level = Math.floor(xp / 100) + 1;

  res.json({
    wallet,
    profile,
    xp,
    level
  });
}
