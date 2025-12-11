// src/app/admin/page.tsx
import AdminOnchainFundingPanel from "@/components/AdminOnchainFundingPanel";
import React from "react";

// NOTE: This file is a Server Component by default (Next.js app router).
// Protect this route server-side (Supabase session or other auth).
// Example: use server-side check here and redirect if not admin.

async function requireAdminServerSide(): Promise<boolean> {
  // TODO: replace with real server-side admin auth
  // e.g. check cookies, Supabase session, or JWT from request headers.
  return true; // temporary — DO NOT leave this in production
}

export default async function AdminIndexPage() {
  const isAdmin = await requireAdminServerSide();
  if (!isAdmin) {
    // server redirect or show unauthorized
    return (
      <div className="p-6 text-sm text-red-400">
        Unauthorized — admin access required.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admin Console</h1>
          <p className="text-sm text-muted">ACE Command Bridge · On-chain ops</p>
        </div>
        <div className="text-xs text-muted">Admin Mode</div>
      </header>

      <section>
        <h2 className="text-lg font-semibold mb-2">On-chain funding</h2>
        <AdminOnchainFundingPanel />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Quick links</h2>
        <div className="flex gap-2 flex-wrap">
          <a href="/admin/liquidity" className="px-3 py-1 rounded border text-xs">
            Liquidity Dashboard
          </a>
          <a href="/admin/wallet/send" className="px-3 py-1 rounded border text-xs">
            Wallet · Send
          </a>
          <a href="/admin/logs" className="px-3 py-1 rounded border text-xs">
            Audit logs
          </a>
        </div>
      </section>
    </div>
  );
}
