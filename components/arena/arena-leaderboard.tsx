"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Crown, Star, ChevronUp, ChevronDown, Minus } from "lucide-react"

interface ArenaLeaderboardProps {
  katInfo: any
  arenaStats: any
}

export default function ArenaLeaderboard({ katInfo, arenaStats }: ArenaLeaderboardProps) {
  const [leaderboardType, setLeaderboardType] = useState("global")

  // Mock leaderboard data
  const leaderboardData = {
    global: [
      {
        rank: 1,
        name: "Cosmic Legend",
        points: 3250,
        tier: "Diamond I",
        winRate: 92,
        change: "up",
        avatar: "/placeholder.svg?key=l9u1k",
      },
      {
        rank: 2,
        name: "Stellar Master",
        points: 3120,
        tier: "Diamond I",
        winRate: 89,
        change: "up",
        avatar: "/placeholder-ye5s9.png",
      },
      {
        rank: 3,
        name: "Galaxy Dominator",
        points: 3050,
        tier: "Diamond II",
        winRate: 87,
        change: "down",
        avatar: "/placeholder-h2e9z.png",
      },
      {
        rank: 4,
        name: "Nebula Crusher",
        points: 2980,
        tier: "Diamond II",
        winRate: 85,
        change: "same",
        avatar: "/placeholder-banmw.png",
      },
      {
        rank: 5,
        name: "Astral Champion",
        points: 2920,
        tier: "Diamond II",
        winRate: 84,
        change: "up",
        avatar: "/placeholder-idooj.png",
      },
      {
        rank: 6,
        name: "Quantum Warrior",
        points: 2850,
        tier: "Diamond III",
        winRate: 82,
        change: "down",
        avatar: "/placeholder-sjemu.png",
      },
      {
        rank: 7,
        name: "Void Slayer",
        points: 2780,
        tier: "Diamond III",
        winRate: 80,
        change: "up",
        avatar: "/placeholder.svg?height=40&width=40&query=void%20cat%20slayer",
      },
      {
        rank: 8,
        name: "Star Conqueror",
        points: 2720,
        tier: "Diamond III",
        winRate: 79,
        change: "same",
        avatar: "/placeholder.svg?height=40&width=40&query=star%20cat%20conqueror",
      },
    ],
    friends: [
      {
        rank: 1,
        name: "Cosmic Buddy",
        points: 1850,
        tier: "Platinum II",
        winRate: 75,
        change: "up",
        avatar: "/placeholder.svg?height=40&width=40&query=cosmic%20cat%20buddy",
      },
      {
        rank: 2,
        name: "Stellar Friend",
        points: 1720,
        tier: "Platinum III",
        winRate: 72,
        change: "down",
        avatar: "/placeholder.svg?height=40&width=40&query=stellar%20cat%20friend",
      },
      {
        rank: 3,
        name: "Cosmic Ace",
        points: 1250,
        tier: "Silver II",
        winRate: 70,
        change: "up",
        isYou: true,
        avatar: "/placeholder.svg?height=40&width=40&query=cosmic%20ace%20cat",
      },
      {
        rank: 4,
        name: "Galaxy Pal",
        points: 1150,
        tier: "Silver III",
        winRate: 65,
        change: "same",
        avatar: "/placeholder.svg?height=40&width=40&query=galaxy%20cat%20pal",
      },
    ],
  }

  // Find your rank in the global leaderboard
  const yourGlobalRank = 156

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card className="bg-gray-900/60 text-white backdrop-blur-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                Leaderboard
              </CardTitle>
              <Tabs value={leaderboardType} onValueChange={setLeaderboardType} className="w-[200px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="global">Global</TabsTrigger>
                  <TabsTrigger value="friends">Friends</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription className="text-gray-400">Top ranked ACE Kats in the arena</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-800/50 p-3">
                <div className="grid grid-cols-12 gap-2 text-xs font-medium uppercase text-gray-400">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-5">Player</div>
                  <div className="col-span-2 text-center">Points</div>
                  <div className="col-span-2 text-center">Tier</div>
                  <div className="col-span-1 text-center">Win %</div>
                  <div className="col-span-1 text-center">Trend</div>
                </div>
              </div>

              <div className="space-y-2">
                {leaderboardData[leaderboardType === "global" ? "global" : "friends"].map((player, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-12 gap-2 rounded-lg p-3 ${
                      player.isYou ? "bg-blue-900/30 outline outline-1 outline-blue-500" : "bg-gray-800/50"
                    }`}
                  >
                    <div className="col-span-1 flex items-center">
                      {player.rank === 1 ? (
                        <Crown className="h-5 w-5 text-yellow-500" />
                      ) : player.rank === 2 ? (
                        <Medal className="h-5 w-5 text-gray-300" />
                      ) : player.rank === 3 ? (
                        <Medal className="h-5 w-5 text-amber-600" />
                      ) : (
                        <span className="text-gray-400">{player.rank}</span>
                      )}
                    </div>
                    <div className="col-span-5 flex items-center space-x-3">
                      <div className="h-8 w-8 overflow-hidden rounded-full">
                        <img
                          src={player.avatar || "/placeholder.svg"}
                          alt={player.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">
                          {player.name} {player.isYou && "(You)"}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      <Badge variant="outline" className="bg-yellow-900/30 text-yellow-400">
                        {player.points}
                      </Badge>
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      <Badge
                        className={`
                            ${
                              player.tier.includes("Diamond")
                                ? "bg-blue-900/30 text-blue-400"
                                : player.tier.includes("Platinum")
                                  ? "bg-purple-900/30 text-purple-400"
                                  : player.tier.includes("Gold")
                                    ? "bg-yellow-900/30 text-yellow-400"
                                    : player.tier.includes("Silver")
                                      ? "bg-gray-500/30 text-gray-300"
                                      : "bg-green-900/30 text-green-400"
                            }
                          `}
                      >
                        {player.tier}
                      </Badge>
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <span
                        className={`
                            ${player.winRate >= 80 ? "text-green-400" : ""}
                            ${player.winRate < 80 && player.winRate >= 60 ? "text-blue-400" : ""}
                            ${player.winRate < 60 ? "text-gray-400" : ""}
                          `}
                      >
                        {player.winRate}%
                      </span>
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      {player.change === "up" ? (
                        <ChevronUp className="h-5 w-5 text-green-500" />
                      ) : player.change === "down" ? (
                        <ChevronDown className="h-5 w-5 text-red-500" />
                      ) : (
                        <Minus className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {leaderboardType === "global" && (
                <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900/50 text-sm font-medium text-blue-400">
                      {yourGlobalRank}
                    </div>
                    <div>
                      <div className="font-medium">Your Rank</div>
                      <div className="text-xs text-gray-400">Keep battling to climb higher!</div>
                    </div>
                  </div>
                  <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-950">
                    View Details
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="bg-gray-900/60 text-white backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-5 w-5 text-purple-500" />
              Your Stats
            </CardTitle>
            <CardDescription className="text-gray-400">Current season performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center rounded-lg bg-gray-800/50 p-6">
                <div className="text-sm text-gray-400">Current Rank</div>
                <div className="mt-1 text-2xl font-bold">{katInfo.battleRank}</div>
                <div className="mt-4 w-full">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span>{arenaStats.rankPoints} RP</span>
                    <span>{arenaStats.nextRankPoints} RP</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-700">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{
                        width: `${
                          (arenaStats.rankPoints /
                            (arenaStats.nextRankPoints - (arenaStats.nextRankPoints - arenaStats.rankPoints))) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="mt-1 text-center text-xs text-gray-400">
                    {arenaStats.nextRankPoints - arenaStats.rankPoints} RP until {arenaStats.nextRank}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-800/50 p-4 text-center">
                  <div className="text-sm text-gray-400">Wins</div>
                  <div className="mt-1 text-xl font-bold text-green-400">{katInfo.wins}</div>
                </div>
                <div className="rounded-lg bg-gray-800/50 p-4 text-center">
                  <div className="text-sm text-gray-400">Losses</div>
                  <div className="mt-1 text-xl font-bold text-red-400">{katInfo.losses}</div>
                </div>
                <div className="rounded-lg bg-gray-800/50 p-4 text-center">
                  <div className="text-sm text-gray-400">Win Rate</div>
                  <div className="mt-1 text-xl font-bold text-blue-400">{katInfo.winRate}%</div>
                </div>
                <div className="rounded-lg bg-gray-800/50 p-4 text-center">
                  <div className="text-sm text-gray-400">Season</div>
                  <div className="mt-1 text-xl font-bold text-purple-400">{arenaStats.currentSeason}</div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-800/50 p-4">
                <h3 className="mb-2 text-center font-medium">Season Ends In</h3>
                <div className="grid grid-cols-4 gap-2">
                  <div className="rounded bg-gray-700/50 p-2 text-center">
                    <div className="text-lg font-bold">31</div>
                    <div className="text-xs text-gray-400">Days</div>
                  </div>
                  <div className="rounded bg-gray-700/50 p-2 text-center">
                    <div className="text-lg font-bold">12</div>
                    <div className="text-xs text-gray-400">Hours</div>
                  </div>
                  <div className="rounded bg-gray-700/50 p-2 text-center">
                    <div className="text-lg font-bold">45</div>
                    <div className="text-xs text-gray-400">Mins</div>
                  </div>
                  <div className="rounded bg-gray-700/50 p-2 text-center">
                    <div className="text-lg font-bold">20</div>
                    <div className="text-xs text-gray-400">Secs</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
