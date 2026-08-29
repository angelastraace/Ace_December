"use client";

import { useEffect, useState } from "react";
import { getLevelInfo } from "@/lib/leveling";

type WalletProfile = {
  wallet_address: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  country: string | null;
  timezone: string | null;
};

type WalletProfilePanelProps = {
  wallet: string | null;
};

export default function WalletProfilePanel({ wallet }: WalletProfilePanelProps) {
  const demoWallet = "0xDEMO000000000000000000000000000000000000";
  const activeWallet = wallet || demoWallet;

  const [profile, setProfile] = useState<WalletProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `/api/wallet/profile?wallet=${activeWallet}`
        );
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error || `Failed (${res.status})`);
        }

        if (!cancelled) {
          const p: WalletProfile = json.profile;
          setProfile(p);
          setDisplayName(p.display_name ?? "");
          setBio(p.bio ?? "");
        }
      } catch (e: any) {
        console.error("Wallet profile load error:", e);
        if (!cancelled) {
          setError(e.message || "Failed to load profile");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [activeWallet]);

  async function handleSave() {
    try {
      setSaving(true);
      setError(null);

      const res = await fetch("/api/wallet/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet_address: activeWallet,
          display_name: displayName || null,
          bio: bio || null,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || `Failed (${res.status})`);
      }

      setProfile(json.profile);
    } catch (e: any) {
      console.error("Wallet profile save error:", e);
      setError(e.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="cockpit-panel bg-glass border-subtle p-4 text-sm text-white/70">
        Loading pilot profile…
      </div>
    );
  }

  if (error) {
    return (
      <div className="cockpit-panel bg-glass border-subtle p-4 text-sm text-red-400">
        Failed to load wallet profile: {error}
      </div>
    );
  }

  return (
    <div className="cockpit-panel bg-glass border-subtle p-4 space-y-3 text-sm">
      <div className="flex items-center justify-between">
        <div className="hud-label">Pilot profile</div>
        <div className="text-[0.7rem] text-muted truncate max-w-xs">
          {activeWallet}
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <label className="block text-[0.7rem] text-muted mb-1">
            Display name
          </label>
          <input
            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1 text-xs outline-none focus:border-accent focus:ring-0"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Call sign (optional)"
          />
        </div>

        <div>
          <label className="block text-[0.7rem] text-muted mb-1">
            Bio
          </label>
          <textarea
            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1 text-xs outline-none focus:border-accent focus:ring-0 min-h-[60px]"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Short mission summary…"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-2 inline-flex items-center justify-center rounded-md border border-accent/60 bg-accent/10 px-3 py-1 text-xs font-medium text-accent hover:bg-accent/20 disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save profile"}
      </button>
    </div>
  );
}
