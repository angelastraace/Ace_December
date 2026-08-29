// src/app/earn/page.tsx
'use client';

import React, { useEffect, useState } from 'react';

/**
 * Earn page - Vault (XP), Quests, Wallet profile
 * - Client component for simplicity/usability with interactive actions.
 * - Adjust API endpoints below to match your project if they differ.
 */

type VaultInfo = {
  xpBalance: number;
  stakedAmount?: number;
  pendingRewards?: number;
  lastClaimedAt?: string | null;
};

type Quest = {
  id: string;
  title: string;
  description?: string;
  xpReward: number;
  completed: boolean;
  progress?: number; // 0..100
};

type WalletProfile = {
  address: string;
  balance: number;
  tokens?: Array<{ symbol: string; amount: string }>;
};

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-b from-white/3 to-white/2 border border-white/5 rounded-2xl p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Spinner({ size = 6 }: { size?: number }) {
  return (
    <div className={`animate-spin rounded-full border-2 border-t-transparent w-${size} h-${size}`} />
  );
}

/* ---------- Vault Panel ---------- */
function VaultPanel({
  vault,
  loading,
  error,
  onClaim,
}: {
  vault: VaultInfo | null;
  loading: boolean;
  error: string | null;
  onClaim: () => Promise<void>;
}) {
  return (
    <SectionCard title="Vault XP">
      {loading ? (
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" />
          <span>Loading vault...</span>
        </div>
      ) : error ? (
        <div className="text-rose-400">{error}</div>
      ) : !vault ? (
        <div className="text-sm text-slate-400">No vault data. Earn XP by completing quests.</div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-baseline gap-4">
            <div>
              <div className="text-4xl font-extrabold">{vault.xpBalance}</div>
              <div className="text-sm text-slate-400">XP balance</div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-sm">Staked</div>
              <div className="font-medium">{vault.stakedAmount ?? 0}</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClaim}
              className="px-4 py-2 bg-ace-primary hover:bg-ace-primary/90 rounded-lg text-white font-medium"
            >
              Claim rewards
            </button>
            <button className="px-4 py-2 border border-white/5 rounded-lg text-sm text-slate-200/90">
              Stake XP
            </button>
          </div>

          {vault.lastClaimedAt && (
            <div className="text-xs text-slate-500">Last claimed: {new Date(vault.lastClaimedAt).toLocaleString()}</div>
          )}
        </div>
      )}
    </SectionCard>
  );
}

/* ---------- Quests Panel ---------- */
function QuestsPanel({
  quests,
  loading,
  error,
  onComplete,
}: {
  quests: Quest[] | null;
  loading: boolean;
  error: string | null;
  onComplete: (questId: string) => Promise<void>;
}) {
  return (
    <SectionCard title="Quests">
      {loading ? (
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" />
          <span>Loading quests...</span>
        </div>
      ) : error ? (
        <div className="text-rose-400">{error}</div>
      ) : !quests || quests.length === 0 ? (
        <div className="text-sm text-slate-400">No quests defined yet. New challenges incoming.</div>
      ) : (
        <div className="space-y-3">
          {quests.map((q) => (
            <div
              key={q.id}
              className="flex items-center gap-4 p-3 bg-white/2 rounded-md border border-white/3"
            >
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <div className={`font-semibold ${q.completed ? 'line-through text-slate-300' : ''}`}>
                    {q.title}
                  </div>
                  <div className="text-xs text-slate-400">• {q.xpReward} XP</div>
                </div>
                <div className="text-xs text-slate-400">{q.description}</div>
                {typeof q.progress === 'number' && (
                  <div className="mt-2 w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <div
                      style={{ width: `${Math.max(0, Math.min(100, q.progress))}%` }}
                      className="h-2 bg-white/20"
                    />
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => onComplete(q.id)}
                  disabled={q.completed}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    q.completed ? 'bg-green-600/40 text-slate-200 cursor-default' : 'bg-white/5 hover:bg-white/8'
                  }`}
                >
                  {q.completed ? 'Completed' : 'Complete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}

/* ---------- Wallet Profile Panel ---------- */
function WalletPanel({
  profile,
  loading,
  error,
}: {
  profile: WalletProfile | null;
  loading: boolean;
  error: string | null;
}) {
  return (
    <SectionCard title="Wallet">
      {loading ? (
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" />
          <span>Loading wallet...</span>
        </div>
      ) : error ? (
        <div className="text-rose-400">{error}</div>
      ) : !profile ? (
        <div className="text-sm text-slate-400">No wallet connected</div>
      ) : (
        <div className="space-y-3">
          <div className="text-sm text-slate-400">Address</div>
          <div className="font-mono text-sm break-all">{profile.address}</div>

          <div className="mt-3">
            <div className="text-sm text-slate-400">Balance</div>
            <div className="font-semibold">{profile.balance} ETH</div>
          </div>

          <div>
            <div className="text-sm text-slate-400">Tokens</div>
            <div className="flex gap-2 flex-wrap">
              {profile.tokens?.length ? (
                profile.tokens.map((t, i) => (
                  <div key={i} className="px-2 py-1 bg-white/5 rounded text-xs">
                    {t.symbol}: {t.amount}
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400">No tokens detected</div>
              )}
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  );
}

/* ---------- Page Component ---------- */
export default function EarnPage() {
  // vault
  const [vault, setVault] = useState<VaultInfo | null>(null);
  const [vaultLoading, setVaultLoading] = useState(false);
  const [vaultError, setVaultError] = useState<string | null>(null);

  // quests
  const [quests, setQuests] = useState<Quest[] | null>(null);
  const [questsLoading, setQuestsLoading] = useState(false);
  const [questsError, setQuestsError] = useState<string | null>(null);

  // wallet
  const [wallet, setWallet] = useState<WalletProfile | null>(null);
  const [walletLoading, setWalletLoading] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);

  useEffect(() => {
    fetchVault();
    fetchQuests();
    fetchWallet();
  }, []);

  async function fetchVault() {
    setVaultLoading(true);
    setVaultError(null);
    try {
      const res = await fetch('/api/earn/vault');
      if (!res.ok) throw new Error(`Vault fetch failed (${res.status})`);
      const data = await res.json();
      setVault(data as VaultInfo);
    } catch (err: any) {
      setVaultError(err?.message ?? 'Failed to fetch vault');
      setVault(null);
    } finally {
      setVaultLoading(false);
    }
  }

  async function fetchQuests() {
    setQuestsLoading(true);
    setQuestsError(null);
    try {
      const res = await fetch('/api/quests');
      if (!res.ok) throw new Error(`Quests fetch failed (${res.status})`);
      const data = await res.json();
      setQuests(data as Quest[]);
    } catch (err: any) {
      setQuestsError(err?.message ?? 'Failed to fetch quests');
      setQuests(null);
    } finally {
      setQuestsLoading(false);
    }
  }

  async function fetchWallet() {
    setWalletLoading(true);
    setWalletError(null);
    try {
      const res = await fetch('/api/wallet/profile');
      if (!res.ok) throw new Error(`Wallet fetch failed (${res.status})`);
      const data = await res.json();
      setWallet(data as WalletProfile);
    } catch (err: any) {
      setWalletError(err?.message ?? 'Failed to fetch wallet');
      setWallet(null);
    } finally {
      setWalletLoading(false);
    }
  }

  async function handleClaimRewards() {
    try {
      // Call claim endpoint
      const res = await fetch('/api/earn/claim', { method: 'POST' });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Claim failed');
      }
      // refresh vault & wallet
      await Promise.all([fetchVault(), fetchWallet()]);
      alert('Claim successful');
    } catch (err: any) {
      alert('Claim failed: ' + (err?.message ?? 'unknown error'));
    }
  }

  async function handleCompleteQuest(questId: string) {
    try {
      const res = await fetch(`/api/quests/${questId}/complete`, { method: 'POST' });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Complete failed');
      }
      // refresh quests and vault
      await Promise.all([fetchQuests(), fetchVault()]);
    } catch (err: any) {
      alert('Could not complete quest: ' + (err?.message ?? 'unknown'));
    }
  }

  return (
    <main className="min-h-screen py-12 px-6 md:px-12 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold">Earn</h1>
          <p className="text-slate-400 mt-2">Collect XP, finish quests, and grow your wallet.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <VaultPanel
              vault={vault}
              loading={vaultLoading}
              error={vaultError}
              onClaim={handleClaimRewards}
            />

            <QuestsPanel
              quests={quests}
              loading={questsLoading}
              error={questsError}
              onComplete={handleCompleteQuest}
            />
          </div>

          <div className="space-y-6">
            <WalletPanel profile={wallet} loading={walletLoading} error={walletError} />

            <SectionCard title="Shortcuts">
              <div className="flex flex-col gap-3">
                <a href="/earn/history" className="text-sm hover:underline">Claim history</a>
                <a href="/wallet" className="text-sm hover:underline">Open wallet</a>
                <a href="/quests" className="text-sm hover:underline">All quests</a>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </main>
  );
}
