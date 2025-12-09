"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Grid3X3, List, Plus, Search, Lock, FileText, Video, ImageIcon, Music, BookOpen } from "lucide-react"

interface ContentItem {
  id: string
  title: string
  description: string
  thumbnail: string
  type: "article" | "video" | "image" | "audio" | "course"
  status: "published" | "draft" | "scheduled" | "members-only"
  createdAt: string
  views: number
  likes: number
  comments: number
}

export function ContentManager() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("newest")
  const [searchQuery, setSearchQuery] = useState("")
  const [showContentForm, setShowContentForm] = useState(false)

  // Mock content data
  const contentItems: ContentItem[] = [
    {
      id: "content-1",
      title: "The Future of Digital Art and NFTs",
      description:
        "An in-depth exploration of how NFTs are transforming the digital art landscape and what creators should know.",
      thumbnail: "/digital-art-article.png",
      type: "article",
      status: "published",
      createdAt: "2023-11-15",
      views: 2450,
      likes: 189,
      comments: 42,
    },
    {
      id: "content-2",
      title: "Creating Dynamic NFTs: A Tutorial",
      description: "Learn how to create NFTs that evolve and change based on on-chain events and user interactions.",
      thumbnail: "/coding-tutorial.png",
      type: "video",
      status: "published",
      createdAt: "2023-11-10",
      views: 1850,
      likes: 156,
      comments: 28,
    },
    {
      id: "content-3",
      title: "Exclusive: Behind the Scenes of Cosmic Collection",
      description: "A behind-the-scenes look at the creative process for my latest NFT collection.",
      thumbnail: "/vibrant-art-studio.png",
      type: "image",
      status: "members-only",
      createdAt: "2023-11-05",
      views: 780,
      likes: 92,
      comments: 15,
    },
    {
      id: "content-4",
      title: "Ambient Sounds for Creative Flow",
      description: "A curated playlist of ambient sounds to enhance your creative workflow and focus.",
      thumbnail: "/ambient-music-landscape.png",
      type: "audio",
      status: "published",
      createdAt: "2023-10-28",
      views: 1250,
      likes: 104,
      comments: 18,
    },
    {
      id: "content-5",
      title: "Advanced Digital Art Techniques",
      description:
        "A comprehensive course covering advanced techniques for digital artists looking to elevate their work.",
      thumbnail: "/digital-art-course.png",
      type: "course",
      status: "published",
      createdAt: "2023-10-20",
      views: 3200,
      likes: 275,
      comments: 64,
    },
    {
      id: "content-6",
      title: "Upcoming NFT Trends for 2024",
      description: "An analysis of emerging trends in the NFT space and predictions for the coming year.",
      thumbnail: "/future-trends.png",
      type: "article",
      status: "draft",
      createdAt: "2023-10-15",
      views: 0,
      likes: 0,
      comments: 0,
    },
  ]

  // Filter content based on current filter and search query
  const filteredContent = contentItems.filter((item) => {
    if (filter !== "all" && item.status !== filter) return false
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  // Sort content based on current sort option
  const sortedContent = [...filteredContent].sort((a, b) => {
    switch (sort) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case "popular":
        return b.views - a.views
      case "engagement":
        return b.likes + b.comments - (a.likes + a.comments)
      default:
        return 0
    }
  })

  const getStatusColor = (status: ContentItem["status"]) => {
    switch (status) {
      case "published":
        return "bg-green-900/50 text-green-400"
      case "draft":
        return "bg-gray-800 text-gray-400"
      case "scheduled":
        return "bg-blue-900/50 text-blue-400"
      case "members-only":
        return "bg-purple-900/50 text-purple-400"
      default:
        return "bg-gray-800 text-gray-400"
    }
  }

  const getTypeIcon = (type: ContentItem["type"]) => {
    switch (type) {
      case "article":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "audio":
        return <Music className="h-4 w-4" />
      case "course":
        return <BookOpen className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search content..."
              className="pl-8 border-gray-700 bg-gray-800 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[150px] border-gray-700 bg-gray-800 text-white">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="border-gray-700 bg-gray-800 text-white">
              <SelectItem value="all">All Content</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="members-only">Members Only</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[150px] border-gray-700 bg-gray-800 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="border-gray-700 bg-gray-800 text-white">
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="popular">Most Views</SelectItem>
              <SelectItem value="engagement">Most Engagement</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <div className="border border-gray-700 rounded-md overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none ${view === "grid" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"}`}
              onClick={() => setView("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none ${view === "list" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"}`}
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button className="bg-teal-500 hover:bg-teal-600 text-black" onClick={() => setShowContentForm(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create Content
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-5 bg-black/20 backdrop-blur-sm">
          <TabsTrigger value="all" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            All Content
          </TabsTrigger>
          <TabsTrigger
            value="articles"
            className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400"
          >
            Articles
          </TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            Videos
          </TabsTrigger>
          <TabsTrigger value="courses" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            Courses
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sortedContent.map((item) => (
                <Card key={item.id} className="bg-black/40 border-gray-800 backdrop-blur-sm overflow-hidden">
                  <div className="relative aspect-video">
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status === "published"
                          ? "Published"
                          : item.status === "draft"
                            ? "Draft"
                            : item.status === "scheduled"
                              ? "Scheduled"
                              : "Members Only"}
                      </Badge>
                      <Badge variant="outline" className="border-gray-700 bg-black/50 text-white">
                        {getTypeIcon(item.type)}
                        <span className="ml-1 capitalize">{item.type}</span>
                      </Badge>
                    </div>
                    {item.status === "members-only" && (
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-black/70 text-white">
                          <Lock className="h-3 w-3 mr-1" /> Members Only
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      <div className="flex gap-3">
                        <span>{item.views} views</span>
                        <span>{item.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedContent.map((item) => (
                <Card key={item.id} className="bg-black/40 border-gray-800 backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-48 aspect-video md:aspect-square">
                      <img
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex justify-between mb-2">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status === "published"
                              ? "Published"
                              : item.status === "draft"
                                ? "Draft"
                                : item.status === "scheduled"
                                  ? "Scheduled"
                                  : "Members Only"}
                          </Badge>
                          <Badge variant="outline" className="border-gray-700 bg-black/50 text-white">
                            {getTypeIcon(item.type)}
                            <span className="ml-1 capitalize">{item.type}</span>
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        <div className="flex gap-4">
                          <span>{item.views} views</span>
                          <span>{item.likes} likes</span>
                          <span>{item.comments} comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="articles">
          <div className="p-8 text-center text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">Articles</h3>
            <p>Manage your written content here.</p>
          </div>
        </TabsContent>

        <TabsContent value="videos">
          <div className="p-8 text-center text-gray-500">
            <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">Videos</h3>
            <p>Manage your video content here.</p>
          </div>
        </TabsContent>

        <TabsContent value="courses">
          <div className="p-8 text-center text-gray-500">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">Courses</h3>
            <p>Manage your educational content here.</p>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="p-8 text-center text-gray-500">
            <div className="h-12 w-12 mx-auto mb-4 opacity-50">📊</div>
            <h3 className="text-xl font-medium mb-2">Content Analytics</h3>
            <p>View performance metrics for your content.</p>
          </div>
        </TabsContent>
      </Tabs>

      {showContentForm && (
        <Card className="p-6 bg-black/60 border-gray-800 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4">Create New Content</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input placeholder="Enter content title" className="border-gray-700 bg-gray-800 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <Select defaultValue="article">
                <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent className="border-gray-700 bg-gray-800 text-white">
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="image">Image Gallery</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="course">Course</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Input placeholder="Enter content description" className="border-gray-700 bg-gray-800 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Select defaultValue="draft">
                <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
                  <SelectValue placeholder="Select content status" />
                </SelectTrigger>
                <SelectContent className="border-gray-700 bg-gray-800 text-white">
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="members-only">Members Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowContentForm(false)}>
                Cancel
              </Button>
              <Button className="bg-teal-500 hover:bg-teal-600 text-black">Create Content</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default ContentManager
