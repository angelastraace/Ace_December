"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface ArenaSpectateProps {
  activeMatches: any[]
}

export default function ArenaSpectate({ activeMatches }: ArenaSpectateProps) {
  const [activeTab, setActiveTab] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock featured matches
  const featuredMatches = [
    {
      id: "featured-1",
      player1: {
        name: "Cosmic Legend",
        level: 30,
        rank: "Diamond I",
        winRate: 92,
      },
      player2: {
        name: "Stellar Master",
        level: 29,
        rank: "Diamond I",
        winRate: 88,
      },
      viewers: 245,
      status: "live",
      duration: "12:45",
      tournament: "Championship Finals",
    },
    {
      id: "featured-2",
      player1: {
        name: "Quantum Warrior",
        level: 28,
        rank: "Diamond II",
        winRate: 85,
      },
      player2: {
        name: "Nebula Hunter",
        level: 27,
        rank: "Diamond II",
        winRate: 83,
      },
      viewers: 178,
      status: "live",
      duration: "08:22",
      tournament: "Championship Semi-Finals",
    },
  ]

  // Mock friends matches
  const friendsMatches = [
    {
      id: "friend-1",
      player1: {
        name: "Cosmic Friend",
        level: 18,
        rank: "Gold III",
        winRate: 65,
        isFriend: true,
      },
      player2: {
        name: "Stellar Opponent",
        level: 19,
        rank: "Gold II",
        winRate: 68,
        isFriend: false,
      },
      viewers: 12,
      status: "live",
      duration: "05:18",
    },
  ]

  // Mock recent matches
  const recentMatches = [
    {
      id: "recent-1",
      player1: {
        name: "Astral Pouncer",
        level: 25,
        rank: "Platinum I",
        winRate: 78,
      },
      player2: {
        name: "Cosmic Striker",
        level: 24,
        rank: "Platinum II",
        winRate: 75,
      },
      viewers: 45,
      status: "ended",
      result: "2-1",
      duration: "18:32",
    },
    {
      id: "recent-2",
      player1: {
        name: "Quantum Claw",
        level: 26,
        rank: "Platinum I",
        winRate: 80,
      },
      player2: {
        name: "Nebula Whisker",
        level: 25,
        rank: "Platinum I",
        winRate: 77,
      },
      viewers: 62,
      status: "ended",
      result: "2-0",
      duration: "14:05",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <CardTitle className="text-white">Spectate Matches</CardTitle>
              <CardDescription className="text-gray-400">
                Watch live battles and learn from other players
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search matches..."
                className="w-full border-gray-700 bg-gray-800 pl-8 text-white placeholder:text-gray-500 sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent></CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Your Active Matches</CardTitle>
            <CardDescription className="text-gray-400">Matches you're currently participating in</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>

        <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Spectator Benefits</CardTitle>
            <CardDescription className="text-gray-400">Rewards for watching matches</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  )
}
