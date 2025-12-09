"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ArenaMatchmakingProps {
  katInfo: any
  arenaStats: any
}

export default function ArenaMatchmaking({ katInfo, arenaStats }: ArenaMatchmakingProps) {
  const [isSearching, setIsSearching] = useState(false)

  const handleFindMatch = () => {
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      alert("Match found! Entering battle...")
    }, 3000)
  }

  return (
    <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Matchmaking</CardTitle>
        <CardDescription className="text-gray-400">Find an opponent and start battling</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-medium text-white">Ready to Battle?</h3>
          <p className="text-gray-300">Click the button below to find an opponent.</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-4 h-32 w-32 rounded-full bg-gradient-to-br from-purple-900 to-blue-900 p-1">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-900">
              <span className="text-6xl">⚔️</span>
            </div>
          </div>
          <Button
            onClick={handleFindMatch}
            disabled={isSearching}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
          >
            {isSearching ? "Searching for Opponent..." : "Find Match"}
          </Button>
        </div>

        <div className="rounded-lg bg-gray-800 p-4">
          <h4 className="mb-2 text-sm font-medium text-white">Matchmaking Rules</h4>
          <ul className="list-inside list-disc space-y-1 text-xs text-gray-300">
            <li>Opponents are selected based on your Kat's level and rank</li>
            <li>Matches are turn-based and require strategic ability usage</li>
            <li>Earn XP and climb the leaderboard with each victory</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
