"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, BookOpen, Award, Landmark, Swords, Clock, ChevronDown, ChevronUp, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface IdActivityTimelineProps {
  userData: any
}

export default function IdActivityTimeline({ userData }: IdActivityTimelineProps) {
  const [showAll, setShowAll] = useState(false)
  const [filters, setFilters] = useState<string[]>([])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "trade":
        return <TrendingUp className="h-5 w-5 text-blue-400" />
      case "learn":
        return <BookOpen className="h-5 w-5 text-purple-400" />
      case "badge":
        return <Award className="h-5 w-5 text-amber-400" />
      case "vote":
        return <Landmark className="h-5 w-5 text-green-400" />
      case "arena":
        return <Swords className="h-5 w-5 text-red-400" />
      case "stake":
        return <Landmark className="h-5 w-5 text-teal-400" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  }

  const filteredActivities = userData.recentActivity.filter((activity: any) => {
    if (filters.length === 0) return true
    return filters.includes(activity.type)
  })

  const displayedActivities = showAll ? filteredActivities : filteredActivities.slice(0, 5)

  return (
    <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-white">Activity Timeline</CardTitle>
          <CardDescription className="text-gray-400">Your recent actions and achievements</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-gray-700 bg-gray-900 text-white">
            <DropdownMenuCheckboxItem
              checked={filters.includes("trade")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilters([...filters, "trade"])
                } else {
                  setFilters(filters.filter((f) => f !== "trade"))
                }
              }}
            >
              Trading
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.includes("learn")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilters([...filters, "learn"])
                } else {
                  setFilters(filters.filter((f) => f !== "learn"))
                }
              }}
            >
              Learning
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.includes("badge")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilters([...filters, "badge"])
                } else {
                  setFilters(filters.filter((f) => f !== "badge"))
                }
              }}
            >
              Badges
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.includes("vote")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilters([...filters, "vote"])
                } else {
                  setFilters(filters.filter((f) => f !== "vote"))
                }
              }}
            >
              Governance
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.includes("arena")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilters([...filters, "arena"])
                } else {
                  setFilters(filters.filter((f) => f !== "arena"))
                }
              }}
            >
              Arena
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.includes("stake")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilters([...filters, "stake"])
                } else {
                  setFilters(filters.filter((f) => f !== "stake"))
                }
              }}
            >
              Staking
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {displayedActivities.map((activity: any) => (
            <div key={activity.id} className="relative flex gap-4">
              <div className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gray-800">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-auto rounded-md border border-gray-800 bg-gray-900/50 p-3">
                <div className="flex justify-between gap-2">
                  <div>
                    <div className="text-sm font-medium text-white">{activity.description}</div>
                    <div className="mt-0.5 text-xs text-gray-400">
                      {formatDate(activity.timestamp)} at {formatTime(activity.timestamp)}
                    </div>
                  </div>
                  <Badge className="bg-teal-500/20 text-teal-400">+{activity.xpEarned} XP</Badge>
                </div>
              </div>
            </div>
          ))}

          {filteredActivities.length > 5 && (
            <Button
              variant="ghost"
              className="w-full text-gray-400 hover:bg-gray-800 hover:text-white"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" /> Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" /> Show More ({filteredActivities.length - 5} more)
                </>
              )}
            </Button>
          )}

          {filteredActivities.length === 0 && (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-800 bg-gray-900/30 p-4 text-center">
              <p className="text-gray-400">No activities match your filter</p>
              <p className="mt-1 text-sm text-gray-500">Try selecting different activity types</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
