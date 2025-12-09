"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { isAuthenticated, getCurrentUser } from "@/lib/auth"
import LaunchControlHeader from "@/components/launch-control/launch-control-header"
import LiveMetricsDashboard from "@/components/launch-control/live-metrics-dashboard"
import UserManagement from "@/components/launch-control/user-management"
import QuestManagement from "@/components/launch-control/quest-management"
import KatScriptEditor from "@/components/launch-control/kat-script-editor"
import LaunchpadControl from "@/components/launch-control/launchpad-control"
import CreatorDrops from "@/components/launch-control/creator-drops"
import TreasuryDashboard from "@/components/launch-control/treasury-dashboard"
import EmergencyControls from "@/components/launch-control/emergency-controls"
import EventScriptEditor from "@/components/launch-control/event-script-editor"
import AICopilot from "@/components/launch-control/ai-copilot"
import SystemStatus from "@/components/launch-control/system-status"

export default function LaunchControlPage() {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated and has admin access
    if (!isAuthenticated()) {
      router.push("/admin/login?redirect=/launch-control")
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
        <LaunchControlHeader currentUser={currentUser} />

        <main className="container mx-auto px-4 py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">ACE Launch Control</h1>
            <p className="text-gray-400">Mission control for ACE operations and ecosystem management</p>
          </div>

          <div className="mb-8">
            <SystemStatus />
          </div>

          <div className="mb-8">
            <AICopilot />
          </div>

          <Tabs defaultValue="metrics" className="w-full">
            <TabsList className="grid w-full grid-cols-8 bg-gray-900">
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="quests">Quests</TabsTrigger>
              <TabsTrigger value="kat">Kat Scripts</TabsTrigger>
              <TabsTrigger value="launchpad">Launchpad</TabsTrigger>
              <TabsTrigger value="creators">Creator Drops</TabsTrigger>
              <TabsTrigger value="treasury">Treasury</TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
            </TabsList>

            <TabsContent value="metrics" className="mt-6">
              <LiveMetricsDashboard />
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <UserManagement />
            </TabsContent>

            <TabsContent value="quests" className="mt-6">
              <QuestManagement />
            </TabsContent>

            <TabsContent value="kat" className="mt-6">
              <KatScriptEditor />
            </TabsContent>

            <TabsContent value="launchpad" className="mt-6">
              <LaunchpadControl />
            </TabsContent>

            <TabsContent value="creators" className="mt-6">
              <CreatorDrops />
            </TabsContent>

            <TabsContent value="treasury" className="mt-6">
              <TreasuryDashboard />
            </TabsContent>

            <TabsContent value="emergency" className="mt-6">
              <EmergencyControls />
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <EventScriptEditor />
          </div>
        </main>
      </div>
    </div>
  )
}
