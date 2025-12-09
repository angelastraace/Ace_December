"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

interface IdTierProgressProps {
  userData: any
}

export default function IdTierProgress({ userData }: IdTierProgressProps) {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Rookie":
        return "from-blue-500 to-blue-600"
      case "Veteran":
        return "from-purple-500 to-purple-600"
      case "Guardian":
        return "from-teal-500 to-blue-600"
      case "Legend":
        return "from-amber-500 to-red-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getNextTier = (tier: string) => {
    switch (tier) {
      case "Rookie":
        return "Veteran"
      case "Veteran":
        return "Guardian"
      case "Guardian":
        return "Legend"
      case "Legend":
        return "Legend+"
      default:
        return "Next Tier"
    }
  }

  return (
    <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Experience</CardTitle>
          <Badge className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
            <Sparkles className="mr-1 h-3 w-3" />
            {userData.xp.toLocaleString()} XP
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-white">{userData.tier}</span>
            <span className="text-gray-400">{getNextTier(userData.tier)}</span>
          </div>

          <div className="relative pt-1">
            <Progress
              value={userData.tierProgress}
              className="h-2 bg-gray-700"
              indicatorClassName={`bg-gradient-to-r ${getTierColor(userData.tier)}`}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{userData.xp.toLocaleString()} XP</span>
            <span>{userData.nextTierXp.toLocaleString()} XP</span>
          </div>

          <div className="space-y-2 rounded-lg border border-gray-800 bg-gray-900/50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Next tier benefits:</span>
            </div>
            <ul className="space-y-1 pl-5 text-xs text-gray-400">
              <li className="list-disc">Reduced trading fees</li>
              <li className="list-disc">Priority customer support</li>
              <li className="list-disc">Exclusive NFT airdrops</li>
              <li className="list-disc">Higher staking rewards</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
