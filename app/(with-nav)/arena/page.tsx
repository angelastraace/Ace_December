"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Zap, Swords, Star, Clock, Users, Award, Crown } from "lucide-react"
import ArenaMatchmaking from "@/components/arena/arena-matchmaking"
import ArenaBattleground from "@/components/arena/arena-battleground"
import ArenaLeaderboard from "@/components/arena/arena-leaderboard"
import ArenaTournaments from "@/components/arena/arena-tournaments"
import ArenaKatProfile from "@/components/arena/arena-kat-profile"
import ArenaSpectate from "@/components/arena/arena-spectate"
import ArenaRewards from "@/components/arena/arena-rewards"

export default function ArenaPage() {
  const [loading, setLoading] = useState(true)
  const [arenaData, setArenaData] = useState<any>(null)

  useEffect(() => {
    // Simulate loading arena data
    const fetchArenaData = async () => {
      // In a real implementation, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock arena data
      setArenaData({
        katInfo: {
          name: "Cosmic Ace",
          level: 15,
          evolutionStage: "Guardian",
          battleRank: "Silver II",
          wins: 28,
          losses: 12,
          winRate: 70,
          stamina: 80,
          maxStamina: 100,
          traits: [
            { id: 1, name: "Cosmic Visor", type: "accessory", rarity: "rare", battleBonus: "+5% Critical Hit" },
            { id: 2, name: "Stellar Aura", type: "effect", rarity: "epic", battleBonus: "+10% Defense" },
            { id: 3, name: "Quantum Paws", type: "body", rarity: "legendary", battleBonus: "+15% Attack Speed" },
          ],
          battlePass: {
            level: 12,
            maxLevel: 50,
            currentXP: 2500,
            nextLevelXP: 3000,
            rewards: [
              { level: 10, name: "Cosmic Crown", claimed: true },
              { level: 15, name: "Battle Armor", claimed: false },
              { level: 20, name: "Legendary Emote Pack", claimed: false },
            ],
          },
        },
        arenaStats: {
          dailyMatchesPlayed: 3,
          dailyMatchesLimit: 5,
          tournamentTokens: 2,
          currentSeason: "Cosmic Conquest",
          seasonEndDate: "2025-06-15T00:00:00Z",
          currentRank: "Silver II",
          rankPoints: 1250,
          nextRank: "Silver I",
          nextRankPoints: 1500,
        },
        activeMatches: [
          {
            id: "match-1",
            opponent: "Stellar Nova",
            opponentLevel: 16,
            opponentRank: "Silver I",
            status: "live",
            viewers: 12,
          },
          {
            id: "match-2",
            opponent: "Quantum Whisker",
            opponentLevel: 14,
            opponentRank: "Silver III",
            status: "starting",
            viewers: 3,
          },
        ],
        tournaments: [
          {
            id: "tournament-1",
            name: "Weekly Showdown",
            status: "registering",
            entryFee: "1 Token",
            participants: 24,
            maxParticipants: 32,
            startTime: "2025-05-13T18:00:00Z",
            prizes: ["500 XP", "Rare Trophy NFT", "100 ACE Tokens"],
          },
          {
            id: "tournament-2",
            name: "Cosmic Championship",
            status: "upcoming",
            entryFee: "2 Tokens",
            participants: 48,
            maxParticipants: 64,
            startTime: "2025-05-15T20:00:00Z",
            prizes: ["1000 XP", "Legendary Trophy NFT", "250 ACE Tokens"],
          },
        ],
      })
      setLoading(false)
    }

    fetchArenaData()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#001219]">
        <div className="flex flex-col items-center">
          <div className="h-32 w-32 animate-pulse rounded-full bg-teal-900/50"></div>
          <p className="mt-4 text-white">Loading the Arena...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001219] via-[#001a2c] to-[#001219]">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container absolute inset-0 z-0">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
      </div>

      <div className="relative z-10 px-4 py-8 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Arena Header */}
          <div className="mb-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div>
                <h1 className="text-3xl font-bold text-white md:text-4xl">ACE Kat Arena</h1>
                <p className="text-gray-400">Battle your Kat against others and climb the ranks</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-full bg-gray-800 px-3 py-1">
                  <Trophy className="mr-2 h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-white">{arenaData.katInfo.battleRank}</span>
                </div>
                <div className="flex items-center rounded-full bg-gray-800 px-3 py-1">
                  <Swords className="mr-2 h-4 w-4 text-teal-500" />
                  <span className="text-sm text-white">
                    {arenaData.katInfo.wins}W - {arenaData.katInfo.losses}L
                  </span>
                </div>
                <div className="flex items-center rounded-full bg-gray-800 px-3 py-1">
                  <Zap className="mr-2 h-4 w-4 text-purple-500" />
                  <span className="text-sm text-white">
                    {arenaData.katInfo.stamina}/{arenaData.katInfo.maxStamina} Energy
                  </span>
                </div>
                <div className="flex items-center rounded-full bg-gray-800 px-3 py-1">
                  <Clock className="mr-2 h-4 w-4 text-blue-500" />
                  <span className="text-sm text-white">
                    {arenaData.arenaStats.dailyMatchesPlayed}/{arenaData.arenaStats.dailyMatchesLimit} Matches
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Arena Content */}
          <Tabs defaultValue="battleground" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-7">
              <TabsTrigger value="battleground">
                <Swords className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Battle</span>
              </TabsTrigger>
              <TabsTrigger value="matchmaking">
                <Users className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Matchmaking</span>
              </TabsTrigger>
              <TabsTrigger value="tournaments">
                <Crown className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Tournaments</span>
              </TabsTrigger>
              <TabsTrigger value="leaderboard">
                <Trophy className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Leaderboard</span>
              </TabsTrigger>
              <TabsTrigger value="spectate">
                <Eye className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Spectate</span>
              </TabsTrigger>
              <TabsTrigger value="rewards">
                <Award className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Rewards</span>
              </TabsTrigger>
              <TabsTrigger value="profile">
                <Star className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Kat Profile</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="battleground" className="mt-6">
              <ArenaBattleground katInfo={arenaData.katInfo} arenaStats={arenaData.arenaStats} />
            </TabsContent>

            <TabsContent value="matchmaking" className="mt-6">
              <ArenaMatchmaking katInfo={arenaData.katInfo} arenaStats={arenaData.arenaStats} />
            </TabsContent>

            <TabsContent value="tournaments" className="mt-6">
              <ArenaTournaments
                tournaments={arenaData.tournaments}
                arenaStats={arenaData.arenaStats}
                katInfo={arenaData.katInfo}
              />
            </TabsContent>

            <TabsContent value="leaderboard" className="mt-6">
              <ArenaLeaderboard katInfo={arenaData.katInfo} arenaStats={arenaData.arenaStats} />
            </TabsContent>

            <TabsContent value="spectate" className="mt-6">
              <ArenaSpectate activeMatches={arenaData.activeMatches} />
            </TabsContent>

            <TabsContent value="rewards" className="mt-6">
              <ArenaRewards battlePass={arenaData.katInfo.battlePass} arenaStats={arenaData.arenaStats} />
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <ArenaKatProfile katInfo={arenaData.katInfo} arenaStats={arenaData.arenaStats} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function Eye(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
