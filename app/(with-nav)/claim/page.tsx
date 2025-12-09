"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  AlertCircle,
  ArrowRight,
  Award,
  Check,
  ChevronRight,
  Clock,
  Gift,
  HelpCircle,
  Info,
  Lock,
  RefreshCw,
  Sparkles,
  Wallet,
} from "lucide-react"
import { isAuthenticated } from "@/lib/auth"

export default function ClaimPage() {
  const [loading, setLoading] = useState(true)
  const [walletConnected, setWalletConnected] = useState(false)
  const [selectedReward, setSelectedReward] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/login?redirect=/claim")
      return
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [router])

  // Mock data for rewards
  const rewards = [
    {
      id: 1,
      type: "staking",
      name: "Staking Rewards",
      amount: 125.5,
      status: "claimable",
      expiresAt: "2023-06-15T00:00:00Z",
      source: "Weekly Staking Distribution",
      description: "Rewards earned from staking ACE tokens",
    },
    {
      id: 2,
      type: "learn",
      name: "Learn & Earn",
      amount: 50,
      status: "claimable",
      expiresAt: "2023-06-10T00:00:00Z",
      source: "Trading Basics Course",
      description: "Rewards for completing educational content",
    },
    {
      id: 3,
      type: "referral",
      name: "Referral Bonus",
      amount: 75,
      status: "pending",
      unlocksAt: "2023-05-20T00:00:00Z",
      source: "User Referral Program",
      description: "Bonus for referring new users to the platform",
    },
    {
      id: 4,
      type: "airdrop",
      name: "Community Airdrop",
      amount: 200,
      status: "claimed",
      claimedAt: "2023-05-05T00:00:00Z",
      source: "Early Adopter Program",
      description: "Special airdrop for early community members",
    },
    {
      id: 5,
      type: "quest",
      name: "Kat Quest Reward",
      amount: 35,
      status: "claimable",
      expiresAt: "2023-06-20T00:00:00Z",
      source: "Cosmic Explorer Quest",
      description: "Reward for completing Kat's special quest",
    },
  ]

  // Mock data for claim history
  const claimHistory = [
    {
      id: 1,
      type: "staking",
      name: "Staking Rewards",
      amount: 100,
      claimedAt: "2023-05-01T14:30:00Z",
      txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    },
    {
      id: 2,
      type: "airdrop",
      name: "Community Airdrop",
      amount: 200,
      claimedAt: "2023-05-05T10:15:00Z",
      txHash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a",
    },
    {
      id: 3,
      type: "learn",
      name: "Learn & Earn",
      amount: 25,
      claimedAt: "2023-04-28T09:45:00Z",
      txHash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b",
    },
    {
      id: 4,
      type: "referral",
      name: "Referral Bonus",
      amount: 50,
      claimedAt: "2023-04-15T16:20:00Z",
      txHash: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c",
    },
  ]

  // Mock data for upcoming rewards
  const upcomingRewards = [
    {
      id: 1,
      type: "staking",
      name: "Staking Rewards",
      estimatedAmount: 130,
      unlocksAt: "2023-05-22T00:00:00Z",
      progress: 75,
      source: "Weekly Staking Distribution",
    },
    {
      id: 2,
      type: "quest",
      name: "Kat Quest Reward",
      estimatedAmount: 100,
      unlocksAt: "2023-05-25T00:00:00Z",
      progress: 40,
      source: "Dreamstate Explorer Quest",
    },
    {
      id: 3,
      type: "learn",
      name: "Learn & Earn",
      estimatedAmount: 75,
      unlocksAt: "2023-05-30T00:00:00Z",
      progress: 60,
      source: "Advanced Trading Course",
    },
  ]

  // Handle claim reward
  const handleClaimReward = (reward: any) => {
    // In a real implementation, this would trigger an API call to claim the reward
    console.log(`Claiming reward: ${reward.name}`)
    setSelectedReward(null)
  }

  // Connect wallet
  const handleConnectWallet = () => {
    setWalletConnected(true)
  }

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
        <header className="border-b border-gray-800 bg-black/80 backdrop-blur-sm">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <Image src="/images/ace-coin.png" alt="ACE" width={32} height={32} className="mr-2" />
              <h1 className="text-xl font-bold text-white">ACE Rewards</h1>
            </div>
            <div className="flex items-center space-x-4">
              {walletConnected ? (
                <Badge className="bg-green-500 text-black">Wallet Connected</Badge>
              ) : (
                <Button onClick={handleConnectWallet} className="bg-teal-600 text-white hover:bg-teal-700">
                  <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
                </Button>
              )}
              <Button variant="ghost" className="text-gray-300">
                <HelpCircle className="mr-2 h-4 w-4" /> Help
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Claimable Rewards</CardTitle>
                <CardDescription className="text-gray-400">Rewards ready to be claimed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">
                      {rewards.filter((r) => r.status === "claimable").reduce((sum, r) => sum + r.amount, 0)} ACE
                    </p>
                    <p className="text-sm text-gray-400">
                      {rewards.filter((r) => r.status === "claimable").length} rewards available
                    </p>
                  </div>
                  <div className="rounded-full bg-teal-900/30 p-3">
                    <Gift className="h-6 w-6 text-teal-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Pending Rewards</CardTitle>
                <CardDescription className="text-gray-400">Rewards that will unlock soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">
                      {rewards.filter((r) => r.status === "pending").reduce((sum, r) => sum + r.amount, 0)} ACE
                    </p>
                    <p className="text-sm text-gray-400">
                      {rewards.filter((r) => r.status === "pending").length} rewards pending
                    </p>
                  </div>
                  <div className="rounded-full bg-amber-900/30 p-3">
                    <Clock className="h-6 w-6 text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Total Claimed</CardTitle>
                <CardDescription className="text-gray-400">Total rewards claimed to date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">
                      {claimHistory.reduce((sum, r) => sum + r.amount, 0)} ACE
                    </p>
                    <p className="text-sm text-gray-400">{claimHistory.length} rewards claimed</p>
                  </div>
                  <div className="rounded-full bg-green-900/30 p-3">
                    <Check className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {!walletConnected && (
            <Alert className="mb-8 border-amber-800 bg-amber-900/20">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <AlertTitle className="text-amber-500">Wallet Connection Required</AlertTitle>
              <AlertDescription className="text-amber-300">
                Please connect your wallet to claim rewards. Your rewards are safe and will be available once connected.
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="available" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900">
              <TabsTrigger value="available">Available Rewards</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Rewards</TabsTrigger>
              <TabsTrigger value="history">Claim History</TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="mt-6">
              <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Available Rewards</CardTitle>
                      <CardDescription className="text-gray-400">
                        Rewards you can claim now or that will be available soon
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                      <RefreshCw className="mr-2 h-4 w-4" /> Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rewards
                      .filter((r) => r.status !== "claimed")
                      .map((reward) => (
                        <div
                          key={reward.id}
                          className={`rounded-lg border p-4 ${
                            reward.status === "claimable"
                              ? "border-teal-800 bg-teal-900/20"
                              : "border-gray-800 bg-gray-900/50"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start">
                              <div
                                className={`mr-3 rounded-full p-2 ${
                                  reward.type === "staking"
                                    ? "bg-blue-900/30"
                                    : reward.type === "learn"
                                      ? "bg-purple-900/30"
                                      : reward.type === "referral"
                                        ? "bg-green-900/30"
                                        : reward.type === "airdrop"
                                          ? "bg-pink-900/30"
                                          : "bg-amber-900/30"
                                }`}
                              >
                                {reward.type === "staking" ? (
                                  <Wallet className="h-5 w-5 text-blue-400" />
                                ) : reward.type === "learn" ? (
                                  <Award className="h-5 w-5 text-purple-400" />
                                ) : reward.type === "referral" ? (
                                  <ArrowRight className="h-5 w-5 text-green-400" />
                                ) : reward.type === "airdrop" ? (
                                  <Gift className="h-5 w-5 text-pink-400" />
                                ) : (
                                  <Sparkles className="h-5 w-5 text-amber-400" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium text-white">{reward.name}</h3>
                                <p className="text-sm text-gray-400">{reward.description}</p>
                                <p className="mt-1 text-xs text-gray-500">Source: {reward.source}</p>
                              </div>
                            </div>
                            <Badge
                              className={
                                reward.status === "claimable" ? "bg-teal-500 text-black" : "bg-amber-500 text-black"
                              }
                            >
                              {reward.status === "claimable" ? "Claimable" : "Pending"}
                            </Badge>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div>
                              <p className="text-lg font-bold text-white">{reward.amount} ACE</p>
                              {reward.status === "claimable" ? (
                                <p className="text-xs text-gray-400">
                                  Expires:{" "}
                                  {new Date(reward.expiresAt).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                              ) : (
                                <p className="text-xs text-gray-400">
                                  Unlocks:{" "}
                                  {new Date(reward.unlocksAt).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                              )}
                            </div>
                            {reward.status === "claimable" ? (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    className="bg-teal-600 text-white hover:bg-teal-700"
                                    disabled={!walletConnected}
                                    onClick={() => setSelectedReward(reward)}
                                  >
                                    Claim Now
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="border-gray-800 bg-gray-900 text-white sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>Claim Reward</DialogTitle>
                                    <DialogDescription className="text-gray-400">
                                      You are about to claim {selectedReward?.name}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <div className="mb-4 rounded-lg border border-gray-800 bg-gray-800/50 p-4">
                                      <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-400">Reward Type</p>
                                        <p className="text-sm text-white">{selectedReward?.name}</p>
                                      </div>
                                      <div className="mt-2 flex items-center justify-between">
                                        <p className="text-sm text-gray-400">Amount</p>
                                        <p className="text-sm text-white">{selectedReward?.amount} ACE</p>
                                      </div>
                                      <div className="mt-2 flex items-center justify-between">
                                        <p className="text-sm text-gray-400">Source</p>
                                        <p className="text-sm text-white">{selectedReward?.source}</p>
                                      </div>
                                      <div className="mt-2 flex items-center justify-between">
                                        <p className="text-sm text-gray-400">Expires</p>
                                        <p className="text-sm text-white">
                                          {selectedReward?.expiresAt
                                            ? new Date(selectedReward.expiresAt).toLocaleDateString()
                                            : "N/A"}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-start">
                                      <Info className="mr-2 mt-0.5 h-4 w-4 text-teal-400" />
                                      <p className="text-sm text-gray-400">
                                        Claiming this reward will transfer {selectedReward?.amount} ACE tokens to your
                                        connected wallet. This action cannot be undone.
                                      </p>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" className="border-gray-700 text-gray-300">
                                      Cancel
                                    </Button>
                                    <Button
                                      className="bg-teal-600 text-white hover:bg-teal-700"
                                      onClick={() => handleClaimReward(selectedReward)}
                                    >
                                      Confirm Claim
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            ) : (
                              <Button variant="outline" className="border-gray-700 text-gray-300" disabled>
                                <Lock className="mr-2 h-4 w-4" /> Locked
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}

                    {rewards.filter((r) => r.status !== "claimed").length === 0 && (
                      <div className="flex h-32 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50">
                        <p className="text-gray-400">No available rewards</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-6">
              <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">Upcoming Rewards</CardTitle>
                  <CardDescription className="text-gray-400">
                    Rewards that are being earned and will be available soon
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingRewards.map((reward) => (
                      <div key={reward.id} className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            <div
                              className={`mr-3 rounded-full p-2 ${
                                reward.type === "staking"
                                  ? "bg-blue-900/30"
                                  : reward.type === "learn"
                                    ? "bg-purple-900/30"
                                    : "bg-amber-900/30"
                              }`}
                            >
                              {reward.type === "staking" ? (
                                <Wallet className="h-5 w-5 text-blue-400" />
                              ) : reward.type === "learn" ? (
                                <Award className="h-5 w-5 text-purple-400" />
                              ) : (
                                <Sparkles className="h-5 w-5 text-amber-400" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium text-white">{reward.name}</h3>
                              <p className="text-sm text-gray-400">Source: {reward.source}</p>
                            </div>
                          </div>
                          <Badge className="bg-blue-500 text-white">In Progress</Badge>
                        </div>
                        <div className="mt-4">
                          <div className="mb-1 flex items-center justify-between">
                            <p className="text-sm text-gray-400">Progress</p>
                            <p className="text-sm text-white">{reward.progress}%</p>
                          </div>
                          <Progress value={reward.progress} max={100} className="h-2 bg-gray-800" />
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div>
                            <p className="text-lg font-bold text-white">~{reward.estimatedAmount} ACE</p>
                            <p className="text-xs text-gray-400">
                              Estimated unlock:{" "}
                              {new Date(reward.unlocksAt).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          <Button variant="outline" className="border-gray-700 text-gray-300" disabled>
                            <Clock className="mr-2 h-4 w-4" /> In Progress
                          </Button>
                        </div>
                      </div>
                    ))}

                    {upcomingRewards.length === 0 && (
                      <div className="flex h-32 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50">
                        <p className="text-gray-400">No upcoming rewards</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">Claim History</CardTitle>
                  <CardDescription className="text-gray-400">History of all your claimed rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  {claimHistory.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-gray-800 hover:bg-transparent">
                            <TableHead className="text-gray-400">Reward</TableHead>
                            <TableHead className="text-gray-400">Amount</TableHead>
                            <TableHead className="text-gray-400">Claimed Date</TableHead>
                            <TableHead className="text-gray-400">Transaction</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {claimHistory.map((claim) => (
                            <TableRow key={claim.id} className="border-gray-800">
                              <TableCell className="font-medium text-white">{claim.name}</TableCell>
                              <TableCell>{claim.amount} ACE</TableCell>
                              <TableCell>
                                {new Date(claim.claimedAt).toLocaleDateString(undefined, {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="flex h-32 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50">
                      <p className="text-gray-400">No claim history</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Boost Your Rewards</CardTitle>
                <CardDescription className="text-gray-400">Ways to increase your reward earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                    <div className="mb-3 rounded-full bg-blue-900/30 p-3 w-fit">
                      <Wallet className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="mb-2 font-medium text-white">Stake ACE Tokens</h3>
                    <p className="text-sm text-gray-400">
                      Earn weekly rewards based on your staked amount. Higher tiers unlock bonus multipliers.
                    </p>
                    <Button className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700">Stake Now</Button>
                  </div>

                  <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                    <div className="mb-3 rounded-full bg-purple-900/30 p-3 w-fit">
                      <Award className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="mb-2 font-medium text-white">Complete Learn Courses</h3>
                    <p className="text-sm text-gray-400">
                      Earn ACE tokens by completing educational content. New courses added regularly.
                    </p>
                    <Button className="mt-4 w-full bg-purple-600 text-white hover:bg-purple-700">Start Learning</Button>
                  </div>

                  <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                    <div className="mb-3 rounded-full bg-amber-900/30 p-3 w-fit">
                      <Sparkles className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="mb-2 font-medium text-white">Complete Kat Quests</h3>
                    <p className="text-sm text-gray-400">
                      Join your Kat companion on special quests to earn unique rewards and bonuses.
                    </p>
                    <Button className="mt-4 w-full bg-amber-600 text-white hover:bg-amber-700">View Quests</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
