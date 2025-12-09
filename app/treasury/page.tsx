"use client"

import TreasuryHeader from "./treasury-header"
import VaultOverview from "./vault-overview"
import VaultManagement from "./vault-management"
import TreasuryAlerts from "./treasury-alerts"
import TreasuryHistory from "./treasury-history"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { isAuthenticated, getCurrentUser } from "@/lib/auth"
import PartnerAllocation from "@/app/treasury/partner-allocation"
import TreasurySimulation from "@/app/treasury/treasury-simulation"
import FundAllocation from "@/app/treasury/fund-allocation"
import DaoVault from "@/app/treasury/dao-vault"
import NftBoosts from "@/app/treasury/nft-boosts"

export default function TreasuryPage() {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated and has admin access
    if (!isAuthenticated()) {
      router.push("/admin/login?redirect=/treasury")
      return
    }

    const user = getCurrentUser()
    if (!user || user.role !== "Administrator") {
      router.push("/admin/dashboard")
      return
    }

    setCurrentUser(user)
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#001219]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#001219]">
      {/* Background with stars animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container absolute inset-0 z-0">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
      </div>

      <div className="relative z-10">
        <TreasuryHeader currentUser={currentUser} />

        <main className="container mx-auto px-4 py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">ACE Treasury Vault</h1>
            <p className="text-gray-400">Secure, transparent, and programmable funding engine</p>
          </div>

          <div className="mb-8">
            <TreasuryAlerts />
          </div>

          <div className="mb-8">
            <VaultOverview />
          </div>

          <Tabs defaultValue="management" className="w-full">
            <TabsList className="grid w-full grid-cols-7 bg-gray-900">
              <TabsTrigger value="management">Vault Management</TabsTrigger>
              <TabsTrigger value="allocation">Fund Allocation</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
              <TabsTrigger value="partners">Partner Allocation</TabsTrigger>
              <TabsTrigger value="simulation">Simulation</TabsTrigger>
              <TabsTrigger value="dao">DAO Vault</TabsTrigger>
              <TabsTrigger value="nft">NFT Boosts</TabsTrigger>
            </TabsList>

            <TabsContent value="management" className="mt-6">
              <VaultManagement />
            </TabsContent>

            <TabsContent value="allocation" className="mt-6">
              <FundAllocation />
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <TreasuryHistory />
            </TabsContent>

            <TabsContent value="partners" className="mt-6">
              <PartnerAllocation />
            </TabsContent>

            <TabsContent value="simulation" className="mt-6">
              <TreasurySimulation />
            </TabsContent>

            <TabsContent value="dao" className="mt-6">
              <DaoVault />
            </TabsContent>

            <TabsContent value="nft" className="mt-6">
              <NftBoosts />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
