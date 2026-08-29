import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { wallet, display_name, bio, avatar_url } = req.body;

  if (!wallet) return res.status(400).json({ error: "Missing wallet" });

  const { data, error } = await supabase
    .from("wallet_profiles")
    .upsert(
      {
        wallet_address: wallet,
        display_name,
        bio,
        avatar_url,
      },
      { onConflict: "wallet_address" }
    )
    .select("*")
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.json({ success: true, profile: data });
}
