"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  Calendar,
  Clock,
  CheckCircle,
  Zap,
  Award,
  BookOpen,
  Users,
  ChevronRight,
  LineChart,
  Vote,
  Coins,
  Swords,
  Sparkles,
} from "lucide-react"
import { isAuthenticated } from "@/lib/auth"
import type { Mission, UserMission, MissionChain, MissionRarity, MissionCategory } from "@/lib/missions/types"

export default function MissionsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("active")
  const [missions, setMissions] = useState<UserMission[]>([])
  const [availableMissions, setAvailableMissions] = useState<Mission[]>([])
  const [missionDetails, setMissionDetails] = useState<Record<string, Mission>>({})
  const [chains, setChains] = useState<{ chain: MissionChain; progress: number }[]>([])
  const [stats, setStats] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [showKatMessage, setShowKatMessage] = useState(false)
  const [katMessage, setKatMessage] = useState("")
  const [katMood, setKatMood] = useState("neutral")

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }

    // Fetch missions, chains, and stats
    fetchMissions()
    fetchAvailableMissions()
    fetchChains()
    fetchStats()

    // Show welcome message from Kat
    setKatMessage("Welcome to ACE Missions! Complete quests to earn XP and unlock special rewards.")
    setKatMood("excited")
    setShowKatMessage(true)

    // Hide Kat message after 5 seconds
    const timer = setTimeout(() => {
      setShowKatMessage(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  const fetchMissions = async () => {
    setIsLoading(true)
    // This would be an API call in a real implementation
    // For now, we'll use mock data
    const mockMissions: UserMission[] = [
      {
        userId: "user-1",
        missionId: "mission-1",
        status: "active",
        progress: 0,
        steps: [
          {
            id: "step-1",
            description: "Make a trade of any size",
            type: "trade",
            target: 1,
            progress: 0,
            completed: false,
          },
        ],
        startedAt: "2025-05-10T00:00:00Z",
        rewardsClaimed: false,
      },
      {
        userId: "user-1",
        missionId: "mission-2",
        status: "active",
        progress: 50,
        steps: [
          {
            id: "step-1",
            description: "Cast a vote on any active proposal",
            type: "vote",
            target: 1,
            progress: 0,
            completed: false,
          },
        ],
        startedAt: "2025-05-11T00:00:00Z",
        rewardsClaimed: false,
      },
      {
        userId: "user-1",
        missionId: "mission-3",
        status: "completed",
        progress: 100,
        steps: [
          {
            id: "step-1",
            description: "Visit the trading page",
            type: "visit",
            target: 1,
            progress: 1,
            completed: true,
          },
        ],
        startedAt: "2025-05-09T00:00:00Z",
        completedAt: "2025-05-09T01:00:00Z",
        rewardsClaimed: true,
      },
    ]

    // Fetch mission details for each mission
    const details: Record<string, Mission> = {}

    details["mission-1"] = {
      id: "mission-1",
      title: "First Trade",
      description: "Complete your first trade on ACE Exchange",
      category: "trade",
      rarity: "common",
      frequency: "once",
      steps: [
        {
          id: "step-1",
          description: "Make a trade of any size",
          type: "trade",
          target: 1,
          progress: 0,
          completed: false,
        },
      ],
      rewards: [
        { type: "xp", amount: 100 },
        { type: "badge", itemId: "first-trade-badge" },
      ],
      katReaction: {
        startQuote: "Ready to make your first trade? I'll guide you through it!",
        progressQuote: "You're getting closer to your first trade!",
        completeQuote: "Congratulations on your first trade! The first of many to come!",
      },
    }

    details["mission-2"] = {
      id: "mission-2",
      title: "Governance Initiate",
      description: "Cast your first vote in a governance proposal",
      category: "governance",
      rarity: "uncommon",
      frequency: "once",
      steps: [
        {
          id: "step-1",
          description: "Cast a vote on any active proposal",
          type: "vote",
          target: 1,
          progress: 0,
          completed: false,
        },
      ],
      rewards: [
        { type: "xp", amount: 200 },
        { type: "badge", itemId: "governance-initiate-badge" },
        { type: "lore", itemId: "governance-lore-1" },
      ],
      requiresLevel: 2,
      katReaction: {
        startQuote: "Your voice matters in the ACE community!",
        completeQuote: "You've taken your first step in shaping the future of ACE!",
      },
      isStoryMission: true,
      storyChain: "governance-path",
      storyOrder: 1,
    }

    details["mission-3"] = {
      id: "mission-3",
      title: "Explorer",
      description: "Visit the trading page to explore the platform",
      category: "special",
      rarity: "common",
      frequency: "once",
      steps: [
        {
          id: "step-1",
          description: "Visit the trading page",
          type: "visit",
          target: 1,
          progress: 0,
          completed: false,
        },
      ],
      rewards: [{ type: "xp", amount: 50 }],
    }

    setMissionDetails(details)
    setMissions(mockMissions)
    setIsLoading(false)
  }

  const fetchAvailableMissions = async () => {
    // This would be an API call in a real implementation
    // For now, we'll use mock data
    const mockAvailableMissions: Mission[] = [
      {
        id: "mission-4",
        title: "Staking Initiate",
        description: "Stake your first ACE tokens",
        category: "stake",
        rarity: "common",
        frequency: "once",
        steps: [
          {
            id: "step-1",
            description: "Stake any amount of ACE tokens",
            type: "stake",
            target: 1,
            progress: 0,
            completed: false,
          },
        ],
        rewards: [
          { type: "xp", amount: 150 },
          { type: "badge", itemId: "staking-initiate-badge" },
        ],
      },
      {
        id: "mission-5",
        title: "Social Butterfly",
        description: "Refer a friend to ACE Exchange",
        category: "social",
        rarity: "uncommon",
        frequency: "once",
        steps: [
          {
            id: "step-1",
            description: "Refer a friend who signs up",
            type: "refer",
            target: 1,
            progress: 0,
            completed: false,
          },
        ],
        rewards: [
          { type: "xp", amount: 250 },
          { type: "badge", itemId: "social-butterfly-badge" },
        ],
      },
    ]

    setAvailableMissions(mockAvailableMissions)
  }

  const fetchChains = async () => {
    // This would be an API call in a real implementation
    // For now, we'll use mock data
    const mockChains = [
      {
        chain: {
          id: "chain-1",
          name: "The Governance Path",
          description: "Learn about and participate in ACE governance",
          missionIds: ["mission-2", "mission-6", "mission-7"],
          rewards: [
            { type: "badge", itemId: "governance-master-badge" },
            { type: "xp", amount: 1000 },
          ],
        },
        progress: 33,
      },
      {
        chain: {
          id: "chain-2",
          name: "Trading Mastery",
          description: "Become a skilled trader on ACE Exchange",
          missionIds: ["mission-1", "mission-8", "mission-9"],
          rewards: [
            { type: "badge", itemId: "trading-master-badge" },
            { type: "xp", amount: 1000 },
          ],
        },
        progress: 33,
      },
    ]

    setChains(mockChains)
  }

  const fetchStats = async () => {
    // This would be an API call in a real implementation
    // For now, we'll use mock data
    const mockStats = {
      totalCompleted: 1,
      totalActive: 2,
      currentStreak: 2,
      longestStreak: 3,
      xpEarned: 50,
      badgesEarned: 0,
      loreUnlocked: 0,
    }

    setStats(mockStats)
  }

  const handleStartMission = async (missionId: string) => {
    // This would be an API call in a real implementation
    console.log("Starting mission:", missionId)

    // Find the mission
    const mission = availableMissions.find((m) => m.id === missionId)
    if (!mission) return

    // Create a new user mission
    const userMission: UserMission = {
      userId: "user-1",
      missionId,
      status: "active",
      progress: 0,
      steps: mission.steps.map((step) => ({ ...step, progress: 0, completed: false })),
      startedAt: new Date().toISOString(),
      rewardsClaimed: false,
    }

    // Update local state
    setMissions([...missions, userMission])
    setMissionDetails({
      ...missionDetails,
      [missionId]: mission,
    })
    setAvailableMissions(availableMissions.filter((m) => m.id !== missionId))

    // Show Kat message if available
    if (mission.katReaction?.startQuote) {
      setKatMessage(mission.katReaction.startQuote)
      setKatMood("excited")
      setShowKatMessage(true)

      // Hide Kat message after 5 seconds
      setTimeout(() => {
        setShowKatMessage(false)
      }, 5000)
    }
  }

  const handleAbandonMission = async (missionId: string) => {
    if (!confirm("Are you sure you want to abandon this mission? Your progress will be lost.")) {
      return
    }

    // This would be an API call in a real implementation
    console.log("Abandoning mission:", missionId)

    // Find the mission
    const mission = missions.find((m) => m.missionId === missionId)
    if (!mission) return

    // Update local state
    setMissions(missions.filter((m) => m.missionId !== missionId))

    // Add back to available missions
    if (missionDetails[missionId]) {
      setAvailableMissions([...availableMissions, missionDetails[missionId]])
    }
  }

  const handleClaimRewards = async (missionId: string) => {
    // This would be an API call in a real implementation
    console.log("Claiming rewards for mission:", missionId)

    // Find the mission
    const mission = missions.find((m) => m.missionId === missionId)
    if (!mission || mission.status !== "completed" || mission.rewardsClaimed) return

    // Update local state
    setMissions(missions.map((m) => (m.missionId === missionId ? { ...m, rewardsClaimed: true } : m)))

    // Show Kat message
    const missionDetail = missionDetails[missionId]
    if (missionDetail?.katReaction?.completeQuote) {
      setKatMessage(missionDetail.katReaction.completeQuote)
      setKatMood("happy")
      setShowKatMessage(true)

      // Hide Kat message after 5 seconds
      setTimeout(() => {
        setShowKatMessage(false)
      }, 5000)
    }
  }

  const getRarityColor = (rarity: MissionRarity) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500 text-white"
      case "uncommon":
        return "bg-green-500 text-white"
      case "rare":
        return "bg-blue-500 text-white"
      case "epic":
        return "bg-purple-500 text-white"
      case "legendary":
        return "bg-yellow-500 text-black"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getCategoryIcon = (category: MissionCategory) => {
    switch (category) {
      case "trade":
        return <LineChart className="h-4 w-4" />
      case "stake":
        return <Coins className="h-4 w-4" />
      case "learn":
        return <BookOpen className="h-4 w-4" />
      case "governance":
        return <Vote className="h-4 w-4" />
      case "social":
        return <Users className="h-4 w-4" />
      case "arena":
        return <Swords className="h-4 w-4" />
      case "special":
        return <Sparkles className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  const getActiveMissions = () => {
    return missions.filter((m) => m.status === "active")
  }

  const getCompletedMissions = () => {
    return missions.filter((m) => m.status === "completed")
  }

  return (
    <div className="min-h-screen bg-[#001219]">
      {/* Kat Message Popup */}
      {showKatMessage && (
        <div className="fixed bottom-4 right-4 z-50 max-w-md">
          <div className="bg-gray-900/90 border border-teal-700 rounded-lg p-4 shadow-lg backdrop-blur-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-teal-900/50 flex items-center justify-center text-teal-400">
                  <span className="text-xl">🐱</span>
                </div>
              </div>
              <div>
                <p className="text-white">{katMessage}</p>
                <p className="text-xs text-teal-400 mt-1">ACE Kat is {katMood}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">ACE Missions</h1>
          <p className="text-gray-400">Complete missions to earn XP, badges, and unlock lore</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-8">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Missions</p>
                  <p className="text-2xl font-bold text-white">{stats.totalActive || 0}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Completed</p>
                  <p className="text-2xl font-bold text-white">{stats.totalCompleted || 0}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center text-green-400">
                  <CheckCircle className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Current Streak</p>
                  <p className="text-2xl font-bold text-white">{stats.currentStreak || 0} days</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-yellow-900/30 flex items-center justify-center text-yellow-400">
                  <Zap className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">XP Earned</p>
                  <p className="text-2xl font-bold text-white">{stats.xpEarned || 0}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400">
                  <Star className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mission Chains */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Mission Chains</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {chains.map(({ chain, progress }) => (
              <Card key={chain.id} className="bg-gray-900/50 border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">{chain.name}</CardTitle>
                  <CardDescription className="text-gray-400">{chain.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-teal-400">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2 bg-gray-800" />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {chain.rewards.map((reward: any, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {reward.type === "xp" ? (
                            <>
                              <Zap className="mr-1 h-3 w-3" /> {reward.amount} XP
                            </>
                          ) : reward.type === "badge" ? (
                            <>
                              <Award className="mr-1 h-3 w-3" /> Badge
                            </>
                          ) : (
                            <>{reward.type}</>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                    View Chain <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Missions Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-gray-900/50 border border-gray-800">
            <TabsTrigger value="active">Active Missions</TabsTrigger>
            <TabsTrigger value="available">Available Missions</TabsTrigger>
            <TabsTrigger value="completed">Completed Missions</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
              </div>
            ) : getActiveMissions().length === 0 ? (
              <div className="text-center py-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-900/50 mb-4">
                  <Clock className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-white">No Active Missions</h3>
                <p className="text-gray-400 mt-2">Start a new mission from the Available tab</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {getActiveMissions().map((mission) => {
                  const missionDetail = missionDetails[mission.missionId]
                  if (!missionDetail) return null

                  return (
                    <Card key={mission.missionId} className="bg-gray-900/50 border-gray-800">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge className={getRarityColor(missionDetail.rarity)}>
                            {missionDetail.rarity.charAt(0).toUpperCase() + missionDetail.rarity.slice(1)}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-400">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>{new Date(mission.startedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <CardTitle className="text-white">{missionDetail.title}</CardTitle>
                        <div className="flex items-center text-sm text-gray-400">
                          {getCategoryIcon(missionDetail.category)}
                          <span className="ml-1">{missionDetail.category}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300 mb-4">{missionDetail.description}</p>

                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Progress</span>
                              <span className="text-teal-400">{mission.progress}%</span>
                            </div>
                            <Progress value={mission.progress} className="h-2 bg-gray-800" />
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-xs font-medium text-gray-400">Steps:</h4>
                            {mission.steps.map((step) => (
                              <div key={step.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div
                                    className={`h-4 w-4 rounded-full mr-2 ${step.completed ? "bg-green-500" : "bg-gray-700"}`}
                                  ></div>
                                  <span className="text-xs text-gray-300">{step.description}</span>
                                </div>
                                <span className="text-xs text-gray-400">
                                  {step.progress}/{step.target}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-xs font-medium text-gray-400">Rewards:</h4>
                            <div className="flex flex-wrap gap-2">
                              {missionDetail.rewards.map((reward, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {reward.type === "xp" ? (
                                    <>
                                      <Zap className="mr-1 h-3 w-3" /> {reward.amount} XP
                                    </>
                                  ) : reward.type === "badge" ? (
                                    <>
                                      <Award className="mr-1 h-3 w-3" /> Badge
                                    </>
                                  ) : reward.type === "lore" ? (
                                    <>
                                      <BookOpen className="mr-1 h-3 w-3" /> Lore
                                    </>
                                  ) : (
                                    <>{reward.type}</>
                                  )}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          className="w-full border-red-700 text-red-400 hover:bg-red-900/20 hover:text-red-300"
                          onClick={() => handleAbandonMission(mission.missionId)}
                        >
                          Abandon Mission
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="available" className="mt-6">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
              </div>
            ) : availableMissions.length === 0 ? (
              <div className="text-center py-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-900/50 mb-4">
                  <CheckCircle className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-white">No Available Missions</h3>
                <p className="text-gray-400 mt-2">You've started all available missions</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {availableMissions.map((mission) => (
                  <Card key={mission.id} className="bg-gray-900/50 border-gray-800">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge className={getRarityColor(mission.rarity)}>
                          {mission.rarity.charAt(0).toUpperCase() + mission.rarity.slice(1)}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-400">
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>{mission.frequency}</span>
                        </div>
                      </div>
                      <CardTitle className="text-white">{mission.title}</CardTitle>
                      <div className="flex items-center text-sm text-gray-400">
                        {getCategoryIcon(mission.category)}
                        <span className="ml-1">{mission.category}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-300 mb-4">{mission.description}</p>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-xs font-medium text-gray-400">Steps:</h4>
                          <ul className="space-y-1">
                            {mission.steps.map((step) => (
                              <li key={step.id} className="text-xs text-gray-300">
                                • {step.description} ({step.target} {step.type})
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-xs font-medium text-gray-400">Rewards:</h4>
                          <div className="flex flex-wrap gap-2">
                            {mission.rewards.map((reward, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {reward.type === "xp" ? (
                                  <>
                                    <Zap className="mr-1 h-3 w-3" /> {reward.amount} XP
                                  </>
                                ) : reward.type === "badge" ? (
                                  <>
                                    <Award className="mr-1 h-3 w-3" /> Badge
                                  </>
                                ) : reward.type === "lore" ? (
                                  <>
                                    <BookOpen className="mr-1 h-3 w-3" /> Lore
                                  </>
                                ) : (
                                  <>{reward.type}</>
                                )}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {mission.requiresLevel && (
                          <div className="rounded-lg border border-yellow-900/30 bg-yellow-900/10 p-2">
                            <div className="flex items-center text-xs text-yellow-400">
                              <Star className="mr-1 h-3 w-3" />
                              <span>Requires Level {mission.requiresLevel}</span>
                            </div>
                          </div>
                        )}

                        {mission.isStoryMission && (
                          <div className="rounded-lg border border-blue-900/30 bg-blue-900/10 p-2">
                            <div className="flex items-center text-xs text-blue-400">
                              <BookOpen className="mr-1 h-3 w-3" />
                              <span>Story Mission</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                        onClick={() => handleStartMission(mission.id)}
                      >
                        Start Mission
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
              </div>
            ) : getCompletedMissions().length === 0 ? (
              <div className="text-center py-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-900/50 mb-4">
                  <Star className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-white">No Completed Missions</h3>
                <p className="text-gray-400 mt-2">Complete missions to see them here</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {getCompletedMissions().map((mission) => {
                  const missionDetail = missionDetails[mission.missionId]
                  if (!missionDetail) return null

                  return (
                    <Card key={mission.missionId} className="bg-gray-900/50 border-gray-800">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge className={getRarityColor(missionDetail.rarity)}>
                            {missionDetail.rarity.charAt(0).toUpperCase() + missionDetail.rarity.slice(1)}
                          </Badge>
                          <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-700">
                            Completed
                          </Badge>
                        </div>
                        <CardTitle className="text-white">{missionDetail.title}</CardTitle>
                        <div className="flex items-center text-sm text-gray-400">
                          {getCategoryIcon(missionDetail.category)}
                          <span className="ml-1">{missionDetail.category}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300 mb-4">{missionDetail.description}</p>

                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Completed on</span>
                              <span className="text-green-400">
                                {mission.completedAt ? new Date(mission.completedAt).toLocaleDateString() : "Unknown"}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-xs font-medium text-gray-400">Rewards:</h4>
                            <div className="flex flex-wrap gap-2">
                              {missionDetail.rewards.map((reward, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {reward.type === "xp" ? (
                                    <>
                                      <Zap className="mr-1 h-3 w-3" /> {reward.amount} XP
                                    </>
                                  ) : reward.type === "badge" ? (
                                    <>
                                      <Award className="mr-1 h-3 w-3" /> Badge
                                    </>
                                  ) : reward.type === "lore" ? (
                                    <>
                                      <BookOpen className="mr-1 h-3 w-3" /> Lore
                                    </>
                                  ) : (
                                    <>{reward.type}</>
                                  )}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        {mission.rewardsClaimed ? (
                          <Badge variant="secondary" className="w-full">
                            Rewards Claimed
                          </Badge>
                        ) : (
                          <Button
                            variant="outline"
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleClaimRewards(mission.missionId)}
                          >
                            Claim Rewards
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
