// src/app/admin/page.tsx
import AdminOnchainFundingPanel from "@/components/AdminOnchainFundingPanel";
import { cookies } from "next/headers";

async function requireAdminServerSide() {
  const cookie = cookies().get("ace_admin")?.value;
  return cookie && cookie === process.env.ADMIN_SECRET;
}

export default async function AdminIndexPage() {
  const isAdmin = await requireAdminServerSide();
  if (!isAdmin) {
    return (
      <div className="p-6 text-sm text-red-400">
        Unauthorized — admin access required.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Admin Console</h1>
      <AdminOnchainFundingPanel />
    </div>
  );
}
