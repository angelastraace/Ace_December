"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Calendar,
  Clock,
  Users,
  ImageIcon,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"
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

// Sample creator drops data
const creatorDrops = [
  {
    id: 1,
    title: "Cosmic Explorers Collection",
    creator: "Stellar Studios",
    description: "Limited edition NFT collection featuring cosmic explorers",
    status: "Live",
    type: "NFT Collection",
    items: 1000,
    claimed: 342,
    startDate: "2023-10-15",
    endDate: "2023-11-15",
    image: "/cosmic-explorer-nft.png",
  },
  {
    id: 2,
    title: "Quantum Realm Access Passes",
    creator: "Quantum Creations",
    description: "Exclusive passes to the Quantum Realm experience",
    status: "Upcoming",
    type: "Access Pass",
    items: 500,
    claimed: 0,
    startDate: "2023-11-01",
    endDate: "2023-12-01",
    image: "/quantum-access-pass.png",
  },
  {
    id: 3,
    title: "Neo Creator Series",
    creator: "Digital Frontiers",
    description: "Creator series featuring digital art from emerging artists",
    status: "Draft",
    type: "Art Collection",
    items: 250,
    claimed: 0,
    startDate: "2023-12-15",
    endDate: "2024-01-15",
    image: "/neo-creator-pass.png",
  },
]

export default function CreatorDrops() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDrops = creatorDrops.filter(
    (drop) =>
      drop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drop.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drop.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="border-purple-500/20 bg-black/40 backdrop-blur-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white">Creator Drops</CardTitle>
            <CardDescription className="text-gray-400">Manage creator NFT and token drops</CardDescription>
          </div>
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            New Drop
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search drops..."
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
          {filteredDrops.map((drop) => (
            <div key={drop.id} className="rounded-lg border border-gray-800 bg-black/20 p-4">
              <div className="flex gap-4">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-800">
                  <img src={drop.image || "/placeholder.svg"} alt={drop.title} className="h-full w-full object-cover" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-white">{drop.title}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm text-purple-300">{drop.creator}</span>
                        {drop.status === "Live" ? (
                          <Badge className="bg-green-500/20 text-green-300">Live</Badge>
                        ) : drop.status === "Upcoming" ? (
                          <Badge className="bg-blue-500/20 text-blue-300">Upcoming</Badge>
                        ) : (
                          <Badge className="bg-gray-500/20 text-gray-300">Draft</Badge>
                        )}
                        <Badge className="bg-purple-500/20 text-purple-300">{drop.type}</Badge>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:bg-black/30">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 bg-gray-900 text-gray-200">
                        <DropdownMenuLabel>Drop Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-800" />
                        <DropdownMenuItem className="hover:bg-gray-800">
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-800">
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit Drop</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-800" />
                        <DropdownMenuItem className="text-red-400 hover:bg-gray-800 hover:text-red-400">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete Drop</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="mt-2 text-sm text-gray-400">{drop.description}</p>

                  <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="h-4 w-4 text-blue-400" />
                      <span>Start: {new Date(drop.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="h-4 w-4 text-red-400" />
                      <span>End: {new Date(drop.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <ImageIcon className="h-4 w-4 text-green-400" />
                      <span>Items: {drop.items.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="h-4 w-4 text-purple-400" />
                      <span>Claimed: {drop.claimed.toLocaleString()}</span>
                    </div>
                  </div>

                  {drop.status === "Live" && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Claim Progress</span>
                        <span className="text-gray-400">{((drop.claimed / drop.items) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress
                        value={(drop.claimed / drop.items) * 100}
                        className="mt-1 h-2 bg-gray-800"
                        indicatorClassName="bg-purple-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
