"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Rocket, Zap, BarChart, Settings, Plus, ChevronRight } from "lucide-react"

export function LaunchpadManager() {
  const [activeTab, setActiveTab] = useState("upcoming")

  // Mock data for launches
  const upcomingLaunches = [
    {
      id: "launch-1",
      title: "Cosmic Kittens Collection",
      description: "A limited edition collection of 1,000 unique cosmic-themed digital kittens.",
      thumbnail: "/cosmic-kittens.png",
      date: "2023-12-15T14:00:00Z",
      status: "scheduled",
      participants: 342,
      totalSupply: 1000,
      price: 0.05,
      currency: "ETH",
    },
    {
      id: "launch-2",
      title: "Space Voyagers",
      description: "Join the intergalactic adventure with these 500 space explorer NFTs.",
      thumbnail: "/space-voyagers.png",
      date: "2023-12-28T18:00:00Z",
      status: "scheduled",
      participants: 189,
      totalSupply: 500,
      price: 0.08,
      currency: "ETH",
    },
  ]

  const pastLaunches = [
    {
      id: "launch-3",
      title: "Astro Pets",
      description: "The first collection of pets in space. All 750 NFTs sold out in 2 hours!",
      thumbnail: "/astro-pets.png",
      date: "2023-11-10T16:00:00Z",
      status: "completed",
      participants: 750,
      totalSupply: 750,
      price: 0.06,
      currency: "ETH",
      revenue: 45,
    },
    {
      id: "launch-4",
      title: "Galactic Guardians",
      description: "A collection of 300 guardian NFTs that protect the crypto universe.",
      thumbnail: "/galactic-guardians.png",
      date: "2023-10-22T15:00:00Z",
      status: "completed",
      participants: 300,
      totalSupply: 300,
      price: 0.1,
      currency: "ETH",
      revenue: 30,
    },
  ]

  const draftLaunches = [
    {
      id: "launch-5",
      title: "Nebula Nomads",
      description: "Wanderers of the cosmic nebulae, each with unique traits and abilities.",
      thumbnail: "/nebula-nomads.png",
      date: null,
      status: "draft",
      participants: 0,
      totalSupply: 800,
      price: 0.07,
      currency: "ETH",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Launchpad Manager</h2>
        <Button className="bg-teal-500 hover:bg-teal-600 text-black">
          <Plus className="mr-2 h-4 w-4" /> Create New Launch
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 bg-black/20 backdrop-blur-sm">
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            Past Launches
          </TabsTrigger>
          <TabsTrigger value="drafts" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            Drafts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingLaunches.map((launch) => (
              <Card key={launch.id} className="bg-black/40 border-gray-800 backdrop-blur-sm overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={launch.thumbnail || "/placeholder.svg"}
                    alt={launch.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-blue-900/50 text-blue-400">Scheduled</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{launch.title}</CardTitle>
                  <CardDescription className="text-gray-400">{launch.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{formatDate(launch.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{launch.participants} participants</span>
                    </div>
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-gray-400" />
                      <span>
                        {launch.price} {launch.currency}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Rocket className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{launch.totalSupply} items</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" /> Manage
                  </Button>
                  <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-black">
                    View Details <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastLaunches.map((launch) => (
              <Card key={launch.id} className="bg-black/40 border-gray-800 backdrop-blur-sm overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={launch.thumbnail || "/placeholder.svg"}
                    alt={launch.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-900/50 text-green-400">Completed</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{launch.title}</CardTitle>
                  <CardDescription className="text-gray-400">{launch.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{formatDate(launch.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{launch.participants} participants</span>
                    </div>
                    <div className="flex items-center">
                      <BarChart className="h-4 w-4 mr-2 text-gray-400" />
                      <span>
                        {launch.revenue} {launch.currency} revenue
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Rocket className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{launch.totalSupply} items</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <BarChart className="h-4 w-4 mr-2" /> Analytics
                  </Button>
                  <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-black">
                    View Details <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drafts" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {draftLaunches.map((launch) => (
              <Card key={launch.id} className="bg-black/40 border-gray-800 backdrop-blur-sm overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={launch.thumbnail || "/placeholder.svg"}
                    alt={launch.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-gray-800 text-gray-400">Draft</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{launch.title}</CardTitle>
                  <CardDescription className="text-gray-400">{launch.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>Not scheduled</span>
                    </div>
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-gray-400" />
                      <span>
                        {launch.price} {launch.currency}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Rocket className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{launch.totalSupply} items</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-black">
                    Schedule <Clock className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <Card className="bg-black/20 border-gray-800 border-dashed backdrop-blur-sm flex flex-col items-center justify-center p-6 h-full">
              <Plus className="h-12 w-12 text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">Create New Draft</h3>
              <p className="text-gray-500 text-center mb-4">Start planning your next NFT launch</p>
              <Button className="bg-teal-500 hover:bg-teal-600 text-black">
                <Plus className="mr-2 h-4 w-4" /> New Draft
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {activeTab === "drafts" && (
        <Card className="p-6 bg-black/60 border-gray-800 backdrop-blur-sm mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Launch Setup</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Collection Name</label>
                <Input placeholder="Enter collection name" className="border-gray-700 bg-gray-800 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  placeholder="Describe your collection"
                  className="border-gray-700 bg-gray-800 text-white"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Supply</label>
                <Input
                  type="number"
                  placeholder="Total number of items"
                  className="border-gray-700 bg-gray-800 text-white"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    className="border-gray-700 bg-gray-800 text-white"
                  />
                  <Select defaultValue="ETH">
                    <SelectTrigger className="w-[100px] border-gray-700 bg-gray-800 text-white">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-700 bg-gray-800 text-white">
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="MATIC">MATIC</SelectItem>
                      <SelectItem value="SOL">SOL</SelectItem>
                      <SelectItem value="ACE">ACE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Blockchain</label>
                <Select defaultValue="ethereum">
                  <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
                    <SelectValue placeholder="Select blockchain" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-700 bg-gray-800 text-white">
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="polygon">Polygon</SelectItem>
                    <SelectItem value="solana">Solana</SelectItem>
                    <SelectItem value="base">Base</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Royalty Percentage</label>
                <Input
                  type="number"
                  placeholder="e.g. 5"
                  max="15"
                  min="0"
                  className="border-gray-700 bg-gray-800 text-white"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-teal-500 hover:bg-teal-600 text-black">Save Draft</Button>
          </div>
        </Card>
      )}
    </div>
  )
}

export default LaunchpadManager
