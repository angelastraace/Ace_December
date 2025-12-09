"use client"

import { useState } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const leaderboardData = [
  { rank: 1, name: "CryptoKing", referrals: 42, change: "up" },
  { rank: 2, name: "BlockchainQueen", referrals: 38, change: "same" },
  { rank: 3, name: "SatoshiDreamer", referrals: 35, change: "up" },
  { rank: 4, name: "TokenMaster", referrals: 31, change: "down" },
  { rank: 5, name: "CoinCollector", referrals: 29, change: "up" },
  { rank: 6, name: "DeFiWhale", referrals: 27, change: "down" },
  { rank: 7, name: "MoonShooter", referrals: 24, change: "up" },
  { rank: 8, name: "DiamondHands", referrals: 22, change: "same" },
  { rank: 9, name: "CryptoNinja", referrals: 19, change: "down" },
  { rank: 10, name: "BlockExplorer", referrals: 17, change: "up" },
]

export default function Leaderboard() {
  const [timeFrame, setTimeFrame] = useState("weekly")

  return (
    <Card className="border border-gray-800 bg-black/40 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white">Referral Leaderboard</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTimeFrame("weekly")}
              className={`text-xs ${
                timeFrame === "weekly" ? "bg-teal-900/50 text-teal-400" : "bg-transparent text-gray-400"
              }`}
            >
              Weekly
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTimeFrame("monthly")}
              className={`text-xs ${
                timeFrame === "monthly" ? "bg-teal-900/50 text-teal-400" : "bg-transparent text-gray-400"
              }`}
            >
              Monthly
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTimeFrame("alltime")}
              className={`text-xs ${
                timeFrame === "alltime" ? "bg-teal-900/50 text-teal-400" : "bg-transparent text-gray-400"
              }`}
            >
              All Time
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="pb-2 text-left text-xs font-medium text-gray-400">Rank</th>
                <th className="pb-2 text-left text-xs font-medium text-gray-400">User</th>
                <th className="pb-2 text-right text-xs font-medium text-gray-400">Referrals</th>
                <th className="pb-2 text-right text-xs font-medium text-gray-400">Change</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user) => (
                <tr key={user.rank} className="border-b border-gray-800/50 last:border-0">
                  <td className="py-3 text-sm">
                    {user.rank <= 3 ? (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 text-xs font-bold text-black">
                        {user.rank}
                      </div>
                    ) : (
                      <span className="text-gray-400">{user.rank}</span>
                    )}
                  </td>
                  <td className="py-3 text-sm font-medium text-white">{user.name}</td>
                  <td className="py-3 text-right text-sm text-white">{user.referrals}</td>
                  <td className="py-3 text-right text-sm">
                    {user.change === "up" && (
                      <span className="inline-flex items-center text-green-500">
                        <ArrowUp className="mr-1 h-3 w-3" />
                      </span>
                    )}
                    {user.change === "down" && (
                      <span className="inline-flex items-center text-red-500">
                        <ArrowDown className="mr-1 h-3 w-3" />
                      </span>
                    )}
                    {user.change === "same" && <span className="text-gray-400">-</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            Updated {timeFrame === "weekly" ? "weekly" : timeFrame === "monthly" ? "monthly" : "in real-time"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
