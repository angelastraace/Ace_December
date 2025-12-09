"use client"

import { useState } from "react"
import { Search, Filter, Plus, MoreHorizontal, Trophy, Clock, Calendar, Edit, Trash2, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample quest data
const quests = [
  {
    id: 1,
    title: "Cosmic Explorer",
    description: "Complete your first trade on ACE Exchange",
    reward: "50 XP + 10 ACE",
    difficulty: "Easy",
    status: "Active",
    completions: 1243,
    startDate: "2023-10-01",
    endDate: "2024-12-31",
    progress: 65,
  },
  {
    id: 2,
    title: "Social Butterfly",
    description: "Connect your social media accounts",
    reward: "100 XP + 25 ACE",
    difficulty: "Easy",
    status: "Active",
    completions: 876,
    startDate: "2023-10-01",
    endDate: "2024-12-31",
    progress: 42,
  },
  {
    id: 3,
    title: "Diamond Hands",
    description: "Hold ACE tokens for 30 days without selling",
    reward: "200 XP + 50 ACE",
    difficulty: "Medium",
    status: "Active",
    completions: 543,
    startDate: "2023-10-15",
    endDate: "2024-12-31",
    progress: 28,
  },
  {
    id: 4,
    title: "Trading Master",
    description: "Complete 100 trades with positive outcomes",
    reward: "500 XP + 100 ACE",
    difficulty: "Hard",
    status: "Draft",
    completions: 0,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    progress: 0,
  },
  {
    id: 5,
    title: "Halloween Special",
    description: "Trade during the Halloween event",
    reward: "150 XP + 30 ACE + Halloween NFT",
    difficulty: "Medium",
    status: "Scheduled",
    completions: 0,
    startDate: "2023-10-31",
    endDate: "2023-11-01",
    progress: 0,
  },
]

export default function QuestManagement() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredQuests = quests.filter(
    (quest) =>
      quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quest.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="border-purple-500/20 bg-black/40 backdrop-blur-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white">Quest Management</CardTitle>
            <CardDescription className="text-gray-400">Create and manage platform quests and rewards</CardDescription>
          </div>
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Quest
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search quests..."
              className="border-gray-800 bg-black/30 pl-9 text-white placeholder:text-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="border-gray-800 bg-black/30 text-gray-400 hover:bg-black/50">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {filteredQuests.map((quest) => (
            <div key={quest.id} className="rounded-lg border border-gray-800 bg-black/20 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-white">{quest.title}</h3>
                    {quest.status === "Active" ? (
                      <Badge className="bg-green-500/20 text-green-300">Active</Badge>
                    ) : quest.status === "Draft" ? (
                      <Badge className="bg-gray-500/20 text-gray-300">Draft</Badge>
                    ) : (
                      <Badge className="bg-blue-500/20 text-blue-300">Scheduled</Badge>
                    )}
                    {quest.difficulty === "Easy" ? (
                      <Badge className="bg-green-500/20 text-green-300">Easy</Badge>
                    ) : quest.difficulty === "Medium" ? (
                      <Badge className="bg-yellow-500/20 text-yellow-300">Medium</Badge>
                    ) : (
                      <Badge className="bg-red-500/20 text-red-300">Hard</Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-400">{quest.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:bg-black/30">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-gray-900 text-gray-200">
                    <DropdownMenuLabel>Quest Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuItem className="hover:bg-gray-800">
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-800">
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit Quest</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuItem className="text-red-400 hover:bg-gray-800 hover:text-red-400">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete Quest</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Trophy className="h-4 w-4 text-purple-400" />
                  <span>
                    Reward: <span className="text-white">{quest.reward}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  <span>
                    {new Date(quest.startDate).toLocaleDateString()} - {new Date(quest.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="h-4 w-4 text-green-400" />
                  <span>
                    Completions: <span className="text-white">{quest.completions}</span>
                  </span>
                </div>
              </div>

              {quest.status === "Active" && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Completion Rate</span>
                    <span>{quest.progress}%</span>
                  </div>
                  <Progress
                    value={quest.progress}
                    className="mt-1 h-2 bg-gray-800"
                    indicatorClassName="bg-purple-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
