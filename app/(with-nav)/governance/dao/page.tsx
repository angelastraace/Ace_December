"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { isAuthenticated, getCurrentUser } from "@/lib/auth"
import GovernanceHeader from "@/components/governance/dao/governance-header"
import ProposalOverview from "@/components/governance/dao/proposal-overview"
import ProposalCreation from "@/components/governance/dao/proposal-creation"
import VotingDashboard from "@/components/governance/dao/voting-dashboard"
import ProposalSimulation from "@/components/governance/dao/proposal-simulation"
import DaoVaultStatus from "@/components/governance/dao/dao-vault-status"
import GovernanceStats from "@/components/governance/dao/governance-stats"
import GovernanceHeatmap from "@/components/governance/dao/governance-heatmap"
import AiProposalAssistant from "@/components/governance/dao/ai-proposal-assistant"

export default function GovernanceDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/admin/login?redirect=/governance/dao")
      return
    }

    const user = getCurrentUser()
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
        <GovernanceHeader currentUser={currentUser} />

        <main className="container mx-auto px-4 py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Vault Governance Protocol</h1>
            <p className="text-gray-400">DAO-controlled treasury orchestration</p>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <DaoVaultStatus />
            <GovernanceStats />
          </div>

          <div className="mb-8">
            <ProposalOverview />
          </div>

          <Tabs defaultValue="voting" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-gray-900">
              <TabsTrigger value="voting">Active Voting</TabsTrigger>
              <TabsTrigger value="create">Create Proposal</TabsTrigger>
              <TabsTrigger value="simulation">Proposal Simulation</TabsTrigger>
              <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
              <TabsTrigger value="heatmap">Governance Heatmap</TabsTrigger>
            </TabsList>

            <TabsContent value="voting" className="mt-6">
              <VotingDashboard currentUser={currentUser} />
            </TabsContent>

            <TabsContent value="create" className="mt-6">
              <ProposalCreation currentUser={currentUser} />
            </TabsContent>

            <TabsContent value="simulation" className="mt-6">
              <ProposalSimulation />
            </TabsContent>

            <TabsContent value="assistant" className="mt-6">
              <AiProposalAssistant />
            </TabsContent>

            <TabsContent value="heatmap" className="mt-6">
              <GovernanceHeatmap />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
