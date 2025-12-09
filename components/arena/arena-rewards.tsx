"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, Gift, Star, Trophy, Zap, Lock, Check } from "lucide-react"
import { useState } from "react"

interface ArenaRewardsProps {
  battlePass: any
  arenaStats: any
  katInfo: any // Added katInfo to props
}

export default function ArenaRewards({ battlePass, arenaStats, katInfo }: ArenaRewardsProps) {
  const [selectedReward, setSelectedReward] = useState<number | null>(null)

  const calculateProgress = (current: number, max: number) => {
    return (current / max) * 100
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Mock battle pass rewards
  const battlePassRewards = [
    { level: 5, name: "Cosmic Emote Pack", type: "cosmetic", rarity: "rare", claimed: true },
    { level: 10, name: "Cosmic Crown", type: "accessory", rarity: "rare", claimed: true },
    { level: 15, name: "Battle Armor", type: "equipment", rarity: "epic", claimed: false },
    { level: 20, name: "Legendary Emote Pack", type: "cosmetic", rarity: "legendary", claimed: false },
    { level: 25, name: "Stellar Wings", type: "accessory", rarity: "epic", claimed: false },
    { level: 30, name: "Quantum Aura", type: "effect", rarity: "legendary", claimed: false },
    { level: 35, name: "Nebula Trail", type: "effect", rarity: "epic", claimed: false },
    { level: 40, name: "Astral Companion", type: "pet", rarity: "legendary", claimed: false },
    { level: 45, name: "Galaxy Backdrop", type: "background", rarity: "epic", claimed: false },
    { level: 50, name: "Champion's Trophy", type: "title", rarity: "legendary", claimed: false },
  ]

  // Mock daily rewards
  const dailyRewards = [
    { day: 1, reward: "25 XP", claimed: true },
    { day: 2, reward: "50 ACE Tokens", claimed: true },
    { day: 3, reward: "Rare Trait Fragment", claimed: true },
    { day: 4, reward: "75 XP", claimed: false },
    { day: 5, reward: "100 ACE Tokens", claimed: false },
    { day: 6, reward: "Epic Trait Fragment", claimed: false },
    { day: 7, reward: "Tournament Token", claimed: false },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "common":
        return "border-gray-500 text-gray-400"
      case "uncommon":
        return "border-green-500 text-green-400"
      case "rare":
        return "border-blue-500 text-blue-400"
      case "epic":
        return "border-purple-500 text-purple-400"
      case "legendary":
        return "border-amber-500 text-amber-400"
      default:
        return "border-gray-500 text-gray-400"
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-6">
        <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <CardTitle className="text-white">Battle Pass</CardTitle>
                <CardDescription className="text-gray-400">
                  {arenaStats.currentSeason} • Ends {formatDate(arenaStats.seasonEndDate)}
                </CardDescription>
              </div>
              <Badge variant="outline" className="border-purple-700 text-purple-400">
                Premium Pass Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-purple-500" />
                  <span className="text-sm font-medium text-white">Level {battlePass.level}</span>
                </div>
                <span className="text-sm text-gray-400">
                  {battlePass.currentXP}/{battlePass.nextLevelXP} XP
                </span>
              </div>
              <Progress
                value={calculateProgress(battlePass.currentXP, battlePass.nextLevelXP)}
                className="h-2 bg-gray-700"
              />
            </div>

            <div className="mb-6 rounded-lg bg-gray-800 p-4">
              <h3 className="mb-4 text-lg font-medium text-white">Rewards Track</h3>

              <div className="relative mb-6">
                <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-gray-700"></div>
                <div
                  className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600"
                  style={{ width: `${(battlePass.level / battlePass.maxLevel) * 100}%` }}
                ></div>

                <div className="relative flex justify-between">
                  {[0, 10, 20, 30, 40, 50].map((level) => (
                    <div
                      key={level}
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        battlePass.level >= level ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-700"
                      }`}
                    >
                      <span className="text-xs font-medium text-white">{level}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {battlePassRewards.map((reward, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                      selectedReward === index
                        ? "border-purple-700 bg-purple-900/20"
                        : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                    }`}
                    onClick={() => setSelectedReward(index)}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="outline" className="border-gray-600 text-gray-400">
                        Level {reward.level}
                      </Badge>
                      <Badge variant="outline" className={getRarityColor(reward.rarity)}>
                        {reward.rarity}
                      </Badge>
                    </div>

                    <div className="mb-2 flex items-center">
                      <div className="mr-3 rounded-full bg-gray-700 p-2">
                        {reward.type === "cosmetic" && <Gift className="h-5 w-5 text-blue-400" />}
                        {reward.type === "accessory" && <Star className="h-5 w-5 text-amber-400" />}
                        {reward.type === "equipment" && <Shield className="h-5 w-5 text-purple-400" />}
                        {reward.type === "effect" && <Zap className="h-5 w-5 text-teal-400" />}
                        {reward.type === "pet" && <Cat className="h-5 w-5 text-green-400" />}
                        {reward.type === "background" && <Image className="h-5 w-5 text-indigo-400" />}
                        {reward.type === "title" && <Award className="h-5 w-5 text-red-400" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{reward.name}</h4>
                        <p className="text-xs text-gray-400">{reward.type}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      {battlePass.level >= reward.level ? (
                        reward.claimed ? (
                          <Badge className="bg-green-500/20 text-green-400">Claimed</Badge>
                        ) : (
                          <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700">
                            Claim
                          </Button>
                        )
                      ) : (
                        <div className="flex items-center text-xs text-gray-400">
                          <Lock className="mr-1 h-3 w-3" />
                          {reward.level - battlePass.level} levels away
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedReward !== null && (
              <div className="rounded-lg border border-purple-700 bg-purple-900/10 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">{battlePassRewards[selectedReward].name}</h3>
                  <Badge variant="outline" className={getRarityColor(battlePassRewards[selectedReward].rarity)}>
                    {battlePassRewards[selectedReward].rarity}
                  </Badge>
                </div>

                <div className="mb-4 flex items-center justify-center">
                  <div className="h-24 w-24 rounded-lg bg-gradient-to-br from-purple-900 to-blue-900 p-1">
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-900">
                      {battlePassRewards[selectedReward].type === "cosmetic" && (
                        <Gift className="h-10 w-10 text-blue-400" />
                      )}
                      {battlePassRewards[selectedReward].type === "accessory" && (
                        <Star className="h-10 w-10 text-amber-400" />
                      )}
                      {battlePassRewards[selectedReward].type === "equipment" && (
                        <Shield className="h-10 w-10 text-purple-400" />
                      )}
                      {battlePassRewards[selectedReward].type === "effect" && (
                        <Zap className="h-10 w-10 text-teal-400" />
                      )}
                      {battlePassRewards[selectedReward].type === "pet" && <Cat className="h-10 w-10 text-green-400" />}
                      {battlePassRewards[selectedReward].type === "background" && (
                        <Image className="h-10 w-10 text-indigo-400" />
                      )}
                      {battlePassRewards[selectedReward].type === "title" && (
                        <Award className="h-10 w-10 text-red-400" />
                      )}
                    </div>
                  </div>
                </div>

                <p className="mb-4 text-center text-sm text-gray-400">
                  A {battlePassRewards[selectedReward].rarity.toLowerCase()} {battlePassRewards[selectedReward].type}
                  that enhances your Kat's appearance and status in the Arena.
                </p>

                <div className="flex justify-center">
                  {battlePass.level >= battlePassRewards[selectedReward].level ? (
                    battlePassRewards[selectedReward].claimed ? (
                      <Button disabled className="bg-gray-700 text-gray-400">
                        <Check className="mr-2 h-4 w-4" />
                        Already Claimed
                      </Button>
                    ) : (
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">Claim Reward</Button>
                    )
                  ) : (
                    <Button disabled className="bg-gray-700 text-gray-400">
                      <Lock className="mr-2 h-4 w-4" />
                      Locked (Level {battlePassRewards[selectedReward].level})
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Daily Rewards</CardTitle>
            <CardDescription className="text-gray-400">Log in daily to earn rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-7 gap-2">
              {dailyRewards.map((reward, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center rounded-md p-2 ${
                    reward.claimed
                      ? "bg-green-900/20 border border-green-700"
                      : index === dailyRewards.filter((r) => r.claimed).length
                        ? "bg-purple-900/20 border border-purple-700"
                        : "bg-gray-800 border border-gray-700"
                  }`}
                >
                  <span className="mb-1 text-xs font-medium text-white">Day {reward.day}</span>
                  {reward.claimed ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : index === dailyRewards.filter((r) => r.claimed).length ? (
                    <Gift className="h-5 w-5 text-purple-500" />
                  ) : (
                    <Lock className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              ))}
            </div>

            <div className="mb-4 rounded-lg bg-gray-800 p-3">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-medium text-white">Today's Reward</h4>
                <Badge className="bg-purple-500/20 text-purple-400">Day 4</Badge>
              </div>
              <div className="mb-3 flex items-center">
                <div className="mr-3 rounded-full bg-purple-900/20 p-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-white">75 XP</p>
                  <p className="text-xs text-gray-400">Battle Pass Experience</p>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                Claim Daily Reward
              </Button>
            </div>

            <div className="rounded-lg bg-gray-800 p-3">
              <h4 className="mb-2 font-medium text-white">Streak Bonus</h4>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-gray-400">Current Streak</span>
                <span className="text-xs font-medium text-white">3 days</span>
              </div>
              <div className="mb-1 h-2 overflow-hidden rounded-full bg-gray-700">
                <div className="h-full bg-gradient-to-r from-green-600 to-teal-600" style={{ width: "42.8%" }}></div>
              </div>
              <p className="mt-2 text-center text-xs text-gray-400">7-day streak reward: Tournament Token</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Arena Achievements</CardTitle>
            <CardDescription className="text-gray-400">Special rewards for accomplishments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="rounded-lg bg-gray-800 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-medium text-white">Battle Novice</h4>
                  <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
                </div>
                <p className="mb-2 text-xs text-gray-400">Win 10 arena battles</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-400">
                    <Trophy className="mr-1 h-3 w-3 text-green-500" />
                    10/10
                  </div>
                  <Badge variant="outline" className="border-green-700 text-green-400">
                    +100 XP
                  </Badge>
                </div>
              </div>

              <div className="rounded-lg bg-gray-800 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-medium text-white">Battle Adept</h4>
                  <Badge className="bg-amber-500/20 text-amber-400">In Progress</Badge>
                </div>
                <p className="mb-2 text-xs text-gray-400">Win 50 arena battles</p>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-400">
                    <Trophy className="mr-1 h-3 w-3 text-amber-500" />
                    {katInfo.wins}/50
                  </div>
                  <Badge variant="outline" className="border-amber-700 text-amber-400">
                    +250 XP
                  </Badge>
                </div>
                <Progress value={(katInfo.wins / 50) * 100} className="h-1 bg-gray-700" />
              </div>

              <div className="rounded-lg bg-gray-800 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-medium text-white">Tournament Victor</h4>
                  <Badge className="bg-gray-500/20 text-gray-400">Locked</Badge>
                </div>
                <p className="mb-2 text-xs text-gray-400">Win a tournament</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-400">
                    <Trophy className="mr-1 h-3 w-3 text-gray-500" />
                    0/1
                  </div>
                  <Badge variant="outline" className="border-gray-700 text-gray-400">
                    +500 XP
                  </Badge>
                </div>
              </div>
            </div>

            <Button variant="link" className="mt-4 w-full text-gray-400">
              View All Achievements
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Shield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  )
}

function Cat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
      <path d="M8 14v.5" />
      <path d="M16 14v.5" />
      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
    </svg>
  )
}

function Image(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}
