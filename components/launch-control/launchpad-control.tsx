"use client"

import { useState } from "react"
import { Rocket, Calendar, Clock, Users, BarChart3, Edit, Eye, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Sample project data
const projects = [
  {
    id: 1,
    name: "Cosmic Explorer NFT Collection",
    status: "Live",
    startDate: "2023-10-15T10:00:00Z",
    endDate: "2023-11-15T10:00:00Z",
    raised: 1250000,
    target: 2000000,
    participants: 1243,
    image: "/cosmic-explorer-nft.png",
  },
  {
    id: 2,
    name: "Quantum Finance Protocol",
    status: "Upcoming",
    startDate: "2023-11-01T14:00:00Z",
    endDate: "2023-12-01T14:00:00Z",
    raised: 0,
    target: 5000000,
    participants: 0,
    image: "/placeholder-atj1b.png",
  },
  {
    id: 3,
    name: "Nebula Gaming Platform",
    status: "Preparation",
    startDate: "2023-12-15T09:00:00Z",
    endDate: "2024-01-15T09:00:00Z",
    raised: 0,
    target: 3500000,
    participants: 0,
    image: "/placeholder-gj5kg.png",
  },
]

export default function LaunchpadControl() {
  const [activeTab, setActiveTab] = useState("live")

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "live") return project.status === "Live"
    if (activeTab === "upcoming") return project.status === "Upcoming"
    if (activeTab === "preparation") return project.status === "Preparation"
    return true
  })

  return (
    <Card className="border-purple-500/20 bg-black/40 backdrop-blur-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white">Launchpad Control</CardTitle>
            <CardDescription className="text-gray-400">Manage and monitor launchpad projects</CardDescription>
          </div>
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            <Rocket className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="live" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-black/30">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              All Projects
            </TabsTrigger>
            <TabsTrigger
              value="live"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              Live
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="preparation"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              In Preparation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="space-y-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="live" className="mt-4">
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-4">
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preparation" className="mt-4">
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function ProjectCard({ project }) {
  const progress = (project.raised / project.target) * 100

  return (
    <div className="rounded-lg border border-gray-800 bg-black/20 p-4">
      <div className="flex gap-4">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-800">
          <img src={project.image || "/placeholder.svg"} alt={project.name} className="h-full w-full object-cover" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-white">{project.name}</h3>
              <div className="mt-1 flex items-center gap-2">
                {project.status === "Live" ? (
                  <Badge className="bg-green-500/20 text-green-300">Live</Badge>
                ) : project.status === "Upcoming" ? (
                  <Badge className="bg-blue-500/20 text-blue-300">Upcoming</Badge>
                ) : (
                  <Badge className="bg-yellow-500/20 text-yellow-300">In Preparation</Badge>
                )}
                <span className="text-sm text-gray-400">ID: {project.id.toString().padStart(4, "0")}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-gray-800 bg-black/30 text-gray-400 hover:bg-black/50"
              >
                <Eye className="mr-1 h-3 w-3" />
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-gray-800 bg-black/30 text-gray-400 hover:bg-black/50"
              >
                <Edit className="mr-1 h-3 w-3" />
                Edit
              </Button>
              {project.status === "Live" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-gray-800 bg-black/30 text-gray-400 hover:bg-black/50"
                >
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  Go to Page
                </Button>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="h-4 w-4 text-blue-400" />
              <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="h-4 w-4 text-red-400" />
              <span>End: {new Date(project.endDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Users className="h-4 w-4 text-green-400" />
              <span>Participants: {project.participants.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <BarChart3 className="h-4 w-4 text-purple-400" />
              <span>Target: ${(project.target / 1000000).toFixed(1)}M</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Raised: ${(project.raised / 1000000).toFixed(2)}M</span>
              <span className="text-gray-400">{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} className="mt-1 h-2 bg-gray-800" indicatorClassName="bg-purple-500" />
          </div>
        </div>
      </div>
    </div>
  )
}
