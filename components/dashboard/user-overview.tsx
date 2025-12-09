"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

interface UserStats {
  xpLevel: number
  totalTrades: number
  accountAge: number
  lastLogin: string
}

export function UserOverview() {
  const [userData, setUserData] = useState({
    username: "CosmicTrader",
    status: "Verified",
    xpLevel: 42,
    totalTrades: 387,
    accountAge: 156,
    lastLogin: "2 hours ago",
  })

  return (
    <Card className="bg-black/40 backdrop-blur-md border-purple-500/20 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/5 pointer-events-none" />
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-purple-500/50 ring-2 ring-blue-400/20">
            <AvatarImage src="/cosmic-user-avatar.png" alt="User avatar" />
            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-xl">
              CT
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2 flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                {userData.username}
              </h2>
              <Badge className="bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 w-fit">
                {userData.status}
              </Badge>
            </div>

            <div className="flex items-center gap-1 text-purple-300">
              <Sparkles className="h-4 w-4" />
              <span>Level {userData.xpLevel} Explorer</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-gray-400">Total Trades</p>
                <p className="text-xl font-semibold text-white">{userData.totalTrades}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-gray-400">Account Age</p>
                <p className="text-xl font-semibold text-white">{userData.accountAge} days</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-gray-400">Last Login</p>
                <p className="text-xl font-semibold text-white">{userData.lastLogin}</p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center bg-blue-500/10 rounded-full p-3 h-24 w-24">
            <div className="text-center">
              <p className="text-xs text-blue-300">XP Points</p>
              <p className="text-2xl font-bold text-blue-400">4,280</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
