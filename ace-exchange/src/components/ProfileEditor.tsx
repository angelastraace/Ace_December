"use client";

import { useState } from "react";

export default function ProfileEditor({
  wallet,
  initial
}: {
  wallet: string | null;
  initial: any;
}) {
  const [displayName, setDisplayName] = useState(initial?.display_name || "");
  const [bio, setBio] = useState(initial?.bio || "");
  const [avatar, setAvatar] = useState(initial?.avatar_url || "");
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (!wallet) return null;

  const save = async () => {
    setSaving(true);
    setStatus(null);

    const res = await fetch("/api/profile/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wallet,
        display_name: displayName,
        bio,
        avatar_url: avatar,
      }),
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setStatus(data.error || "Save failed");
    } else {
      setStatus("Saved");
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/50 p-5 space-y-4">
      <h3 className="font-semibold">Edit profile</h3>

      <input
        value={displayName}
        onChange={e => setDisplayName(e.target.value)}
        placeholder="Display name"
        className="w-full rounded bg-black/60 border border-white/10 p-2 text-white"
      />

      <textarea
        value={bio}
        onChange={e => setBio(e.target.value)}
        placeholder="Short bio"
        rows={3}
        className="w-full rounded bg-black/60 border border-white/10 p-2 text-white"
      />

      <input
        value={avatar}
        onChange={e => setAvatar(e.target.value)}
        placeholder="Avatar URL"
        className="w-full rounded bg-black/60 border border-white/10 p-2 text-white"
      />

      <div className="flex justify-between items-center">
        <button
          onClick={save}
          disabled={saving}
          className="bg-purple-600 hover:bg-purple-500 transition rounded px-4 py-2"
        >
          {saving ? "Saving…" : "Save"}
        </button>

        {status && (
          <p
            className={`text-sm ${
              status === "Saved" ? "text-green-400" : "text-red-400"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
