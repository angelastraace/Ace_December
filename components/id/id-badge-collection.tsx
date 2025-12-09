"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Award, Zap, Shield, Landmark, Gem, Swords, Users } from "lucide-react"

interface IdBadgeCollectionProps {
  userData: any
}

export default function IdBadgeCollection({ userData }: IdBadgeCollectionProps) {
  const [filter, setFilter] = useState("all")

  const getBadgeIcon = (icon: string) => {
    switch (icon) {
      case "rocket":
        return <Award className="h-6 w-6" />
      case "trending-up":
        return <Zap className="h-6 w-6" />
      case "book-open":
        return <Shield className="h-6 w-6" />
      case "landmark":
        return <Landmark className="h-6 w-6" />
      case "gem":
        return <Gem className="h-6 w-6" />
      case "swords":
        return <Swords className="h-6 w-6" />
      case "users":
        return <Users className="h-6 w-6" />
      default:
        return <Award className="h-6 w-6" />
    }
  }

  const getBadgeRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "uncommon":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      case "rare":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20"
      case "epic":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20"
      case "legendary":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const filteredBadges = userData.badges.filter((badge: any) => {
    if (filter === "all") return true
    return badge.category === filter
  })

  return (
    <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Achievement Badges</CardTitle>
        <CardDescription className="text-gray-400">
          Your collection of earned badges across the ACE Exchange ecosystem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <TabsList className="mb-6 grid w-full grid-cols-4 bg-gray-900 sm:grid-cols-7">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="platform">Platform</TabsTrigger>
            <TabsTrigger value="trading">Trading</TabsTrigger>
            <TabsTrigger value="learn">Learning</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="arena">Arena</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filteredBadges.map((badge: any) => (
              <div
                key={badge.id}
                className="flex items-start space-x-4 rounded-lg border border-gray-800 bg-gray-900/50 p-4"
              >
                <div className={`rounded-full p-3 ${getBadgeRarityColor(badge.rarity)}`}>
                  {getBadgeIcon(badge.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white">{badge.name}</h3>
                    <Badge
                      variant="outline"
                      className={`${
                        badge.rarity === "legendary"
                          ? "border-red-500/50 bg-red-500/10 text-red-400"
                          : badge.rarity === "epic"
                            ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                            : badge.rarity === "rare"
                              ? "border-purple-500/50 bg-purple-500/10 text-purple-400"
                              : badge.rarity === "uncommon"
                                ? "border-green-500/50 bg-green-500/10 text-green-400"
                                : "border-blue-500/50 bg-blue-500/10 text-blue-400"
                      }`}
                    >
                      {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">{badge.description}</p>
                  <p className="mt-2 text-xs text-gray-500">
                    Earned on {new Date(badge.dateEarned).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredBadges.length === 0 && (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-800 bg-gray-900/30 p-4 text-center">
              <p className="text-gray-400">No badges in this category yet</p>
              <p className="mt-1 text-sm text-gray-500">Complete activities to earn badges</p>
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
