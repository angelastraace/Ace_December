"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Loader2, Shield, Award, Zap, Share2, Eye, EyeOff, Download } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import IdBadgeCollection from "@/components/id/id-badge-collection"
import IdActivityTimeline from "@/components/id/id-activity-timeline"
import IdReputationChart from "@/components/id/id-reputation-chart"
import IdExportOptions from "@/components/id/id-export-options"
import IdNftDisplay from "@/components/id/id-nft-display"
import IdTierProgress from "@/components/id/id-tier-progress"
import IdResumeBuilder from "@/components/id/id-resume-builder"
import { createSupabaseClient } from "@/lib/supabase"

export default function AceIdPage() {
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [isPublic, setIsPublic] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [supabase] = useState(() => createSupabaseClient())

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // In a real implementation, this would fetch the user's ACE ID data from Supabase
        // For now, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock user data
        const mockUserData = {
          id: "ace-id-12345",
          username: "CosmicTrader",
          walletAddress: "0x1a2b3c...7z8y9x",
          joinedDate: "2023-09-15",
          tier: "Guardian", // Rookie, Veteran, Guardian, Legend
          tierProgress: 78, // Percentage to next tier
          xp: 7850,
          nextTierXp: 10000,
          reputation: {
            trade: 85, // 0-100 score
            learn: 92,
            stake: 76,
            vote: 88,
            arena: 70,
            social: 65,
          },
          badges: [
            {
              id: 1,
              name: "Early Explorer",
              description: "Joined during platform beta",
              category: "platform",
              rarity: "rare",
              dateEarned: "2023-09-20",
              icon: "rocket",
            },
            {
              id: 2,
              name: "Trading Initiate",
              description: "Completed first 10 trades",
              category: "trading",
              rarity: "common",
              dateEarned: "2023-10-05",
              icon: "trending-up",
            },
            {
              id: 3,
              name: "Knowledge Seeker",
              description: "Completed 5 Learn modules",
              category: "learn",
              rarity: "common",
              dateEarned: "2023-10-12",
              icon: "book-open",
            },
            {
              id: 4,
              name: "Governance Pioneer",
              description: "Participated in first DAO vote",
              category: "governance",
              rarity: "uncommon",
              dateEarned: "2023-11-03",
              icon: "landmark",
            },
            {
              id: 5,
              name: "Diamond Hands",
              description: "Held through 30% market volatility",
              category: "trading",
              rarity: "rare",
              dateEarned: "2023-11-20",
              icon: "gem",
            },
            {
              id: 6,
              name: "Arena Contender",
              description: "Won 5 Kat Arena battles",
              category: "arena",
              rarity: "uncommon",
              dateEarned: "2023-12-01",
              icon: "swords",
            },
            {
              id: 7,
              name: "Staking Veteran",
              description: "Staked tokens for 30 days",
              category: "staking",
              rarity: "common",
              dateEarned: "2023-12-15",
              icon: "landmark",
            },
            {
              id: 8,
              name: "Community Pillar",
              description: "Referred 10 active users",
              category: "social",
              rarity: "epic",
              dateEarned: "2024-01-10",
              icon: "users",
            },
          ],
          recentActivity: [
            {
              id: 1,
              type: "trade",
              description: "Completed BTC/USDT trade",
              timestamp: "2024-01-20T14:30:00Z",
              xpEarned: 25,
            },
            {
              id: 2,
              type: "learn",
              description: "Completed 'DeFi Fundamentals' module",
              timestamp: "2024-01-18T10:15:00Z",
              xpEarned: 100,
            },
            {
              id: 3,
              type: "arena",
              description: "Won Kat Arena battle against CryptoWhale",
              timestamp: "2024-01-15T16:45:00Z",
              xpEarned: 50,
            },
            {
              id: 4,
              type: "stake",
              description: "Staked 500 ACE tokens",
              timestamp: "2024-01-12T09:20:00Z",
              xpEarned: 75,
            },
            {
              id: 5,
              type: "vote",
              description: "Voted on 'Exchange Fee Reduction' proposal",
              timestamp: "2024-01-10T11:30:00Z",
              xpEarned: 40,
            },
            {
              id: 6,
              type: "badge",
              description: "Earned 'Community Pillar' badge",
              timestamp: "2024-01-10T11:35:00Z",
              xpEarned: 200,
            },
            {
              id: 7,
              type: "trade",
              description: "Completed ETH/USDT trade",
              timestamp: "2024-01-08T15:10:00Z",
              xpEarned: 25,
            },
            {
              id: 8,
              type: "learn",
              description: "Completed 'Technical Analysis Basics' module",
              timestamp: "2024-01-05T13:45:00Z",
              xpEarned: 100,
            },
          ],
          nftMetadata: {
            image: "/images/ace-id-nft.png",
            animation_url: "/animations/ace-id-guardian.mp4",
            attributes: [
              { trait_type: "Tier", value: "Guardian" },
              { trait_type: "XP", value: 7850 },
              { trait_type: "Badges", value: 8 },
              { trait_type: "Join Date", value: "September 2023" },
              { trait_type: "Trading Score", value: 85 },
              { trait_type: "Learning Score", value: 92 },
            ],
          },
          trustScore: 87, // 0-100 score
          inviteCode: "COSMIC-TRADER-23",
          inviteStats: {
            totalInvites: 12,
            activeUsers: 10,
            xpEarned: 500,
          },
        }

        setUserData(mockUserData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching user data:", error)
        setLoading(false)
      }
    }

    fetchUserData()
  }, [supabase])

  const toggleVisibility = () => {
    setIsPublic(!isPublic)
    // In a real implementation, this would update the user's privacy settings in the database
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#001219]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-teal-500" />
          <p className="mt-4 text-white">Loading your cosmic identity...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#001219]">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container absolute inset-0 z-0">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/20 px-4 py-6 backdrop-blur-md md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-white">ACE ID</h1>
                <p className="text-gray-400">Your on-chain reputation & identity passport</p>
              </div>
              <div className="flex items-center space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share your ACE ID profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="border-gray-700 bg-gray-900 text-white sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Export ACE ID</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Export your ACE ID to use on other platforms
                      </DialogDescription>
                    </DialogHeader>
                    <IdExportOptions userData={userData} />
                  </DialogContent>
                </Dialog>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="public-mode"
                    checked={isPublic}
                    onCheckedChange={toggleVisibility}
                    className="data-[state=checked]:bg-teal-500"
                  />
                  <Label htmlFor="public-mode" className="text-sm text-white">
                    {isPublic ? (
                      <span className="flex items-center">
                        <Eye className="mr-1 h-4 w-4" /> Public
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <EyeOff className="mr-1 h-4 w-4" /> Private
                      </span>
                    )}
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="px-4 py-6 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Left column - NFT Display and Tier Info */}
              <div className="space-y-6">
                <IdNftDisplay userData={userData} />
                <IdTierProgress userData={userData} />
              </div>

              {/* Right column - Tabs and content */}
              <div className="md:col-span-2">
                <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4 bg-gray-900">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="badges">Badges</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="resume">Resume</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6 space-y-6">
                    {/* Reputation Stats */}
                    <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white">Reputation Stats</CardTitle>
                        <CardDescription className="text-gray-400">
                          Your performance across different areas of ACE Exchange
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <IdReputationChart userData={userData} />
                      </CardContent>
                    </Card>

                    {/* Trust Score */}
                    <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-white">Trust Score</CardTitle>
                          <Badge
                            className={`${
                              userData.trustScore > 80
                                ? "bg-green-500"
                                : userData.trustScore > 60
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            } text-black`}
                          >
                            {userData.trustScore}/100
                          </Badge>
                        </div>
                        <CardDescription className="text-gray-400">
                          Your overall reputation in the ACE ecosystem
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Progress
                            value={userData.trustScore}
                            className="h-2 bg-gray-700"
                            indicatorClassName={`${
                              userData.trustScore > 80
                                ? "bg-green-500"
                                : userData.trustScore > 60
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">Trading Activity</span>
                                <span className="text-sm font-medium text-white">{userData.reputation.trade}%</span>
                              </div>
                              <Progress
                                value={userData.reputation.trade}
                                className="h-1.5 bg-gray-700"
                                indicatorClassName="bg-blue-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">Learning Progress</span>
                                <span className="text-sm font-medium text-white">{userData.reputation.learn}%</span>
                              </div>
                              <Progress
                                value={userData.reputation.learn}
                                className="h-1.5 bg-gray-700"
                                indicatorClassName="bg-purple-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">Staking Commitment</span>
                                <span className="text-sm font-medium text-white">{userData.reputation.stake}%</span>
                              </div>
                              <Progress
                                value={userData.reputation.stake}
                                className="h-1.5 bg-gray-700"
                                indicatorClassName="bg-green-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">Governance Participation</span>
                                <span className="text-sm font-medium text-white">{userData.reputation.vote}%</span>
                              </div>
                              <Progress
                                value={userData.reputation.vote}
                                className="h-1.5 bg-gray-700"
                                indicatorClassName="bg-amber-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">Arena Performance</span>
                                <span className="text-sm font-medium text-white">{userData.reputation.arena}%</span>
                              </div>
                              <Progress
                                value={userData.reputation.arena}
                                className="h-1.5 bg-gray-700"
                                indicatorClassName="bg-red-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">Social Engagement</span>
                                <span className="text-sm font-medium text-white">{userData.reputation.social}%</span>
                              </div>
                              <Progress
                                value={userData.reputation.social}
                                className="h-1.5 bg-gray-700"
                                indicatorClassName="bg-teal-500"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recent Badges */}
                    <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                          <CardTitle className="text-white">Recent Badges</CardTitle>
                          <CardDescription className="text-gray-400">
                            Your latest achievements on ACE Exchange
                          </CardDescription>
                        </div>
                        <Button variant="link" className="text-teal-400" onClick={() => setActiveTab("badges")}>
                          View All
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                          {userData.badges.slice(0, 4).map((badge: any) => (
                            <div
                              key={badge.id}
                              className="flex flex-col items-center rounded-lg border border-gray-800 bg-gray-900/50 p-3 text-center"
                            >
                              <div className="mb-2 rounded-full bg-teal-900/30 p-2 text-teal-400">
                                {badge.icon === "rocket" && <Award className="h-6 w-6" />}
                                {badge.icon === "trending-up" && <Zap className="h-6 w-6" />}
                                {badge.icon === "book-open" && <Shield className="h-6 w-6" />}
                                {badge.icon === "landmark" && <Award className="h-6 w-6" />}
                              </div>
                              <span className="text-sm font-medium text-white">{badge.name}</span>
                              <span className="mt-1 text-xs text-gray-400">
                                {new Date(badge.dateEarned).toLocaleDateString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Invite System */}
                    <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white">Invite & Earn</CardTitle>
                        <CardDescription className="text-gray-400">
                          Invite friends to ACE Exchange and earn XP based on their activity
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                            <p className="mb-2 text-sm text-gray-400">Your unique invite code:</p>
                            <div className="flex items-center justify-between rounded-md border border-gray-700 bg-gray-800 p-2">
                              <code className="text-teal-400">{userData.inviteCode}</code>
                              <Button variant="ghost" size="sm" className="h-8 text-gray-400 hover:text-white">
                                Copy
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-3 text-center">
                              <p className="text-2xl font-bold text-white">{userData.inviteStats.totalInvites}</p>
                              <p className="text-xs text-gray-400">Total Invites</p>
                            </div>
                            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-3 text-center">
                              <p className="text-2xl font-bold text-white">{userData.inviteStats.activeUsers}</p>
                              <p className="text-xs text-gray-400">Active Users</p>
                            </div>
                            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-3 text-center">
                              <p className="text-2xl font-bold text-white">{userData.inviteStats.xpEarned}</p>
                              <p className="text-xs text-gray-400">XP Earned</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="badges" className="mt-6">
                    <IdBadgeCollection userData={userData} />
                  </TabsContent>

                  <TabsContent value="activity" className="mt-6">
                    <IdActivityTimeline userData={userData} />
                  </TabsContent>

                  <TabsContent value="resume" className="mt-6">
                    <IdResumeBuilder userData={userData} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
