"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ImageIcon,
  FileText,
  Film,
  Music,
  MoreVertical,
  Edit,
  Trash2,
  BarChart2,
  Eye,
  Heart,
  Download,
  Plus,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data
const contentItems = [
  {
    id: 1,
    title: "Cosmic Nebula Collection",
    type: "image",
    thumbnail: "/placeholder-rgbo3.png",
    created: "2023-04-15",
    views: 1240,
    likes: 89,
    downloads: 32,
    status: "published",
  },
  {
    id: 2,
    title: "Interstellar Journey",
    type: "video",
    thumbnail: "/placeholder-5jsg7.png",
    created: "2023-05-22",
    views: 567,
    likes: 45,
    downloads: 12,
    status: "published",
  },
  {
    id: 3,
    title: "Quantum Mechanics Explained",
    type: "document",
    thumbnail: "/placeholder-ysg3e.png",
    created: "2023-06-10",
    views: 890,
    likes: 67,
    downloads: 43,
    status: "published",
  },
  {
    id: 4,
    title: "Cosmic Ambient Sounds",
    type: "audio",
    thumbnail: "/placeholder.svg?height=200&width=200&query=cosmic%20ambient%20music",
    created: "2023-07-05",
    views: 432,
    likes: 28,
    downloads: 15,
    status: "published",
  },
  {
    id: 5,
    title: "Deep Space Exploration",
    type: "document",
    thumbnail: "/placeholder.svg?height=200&width=200&query=space%20exploration%20document",
    created: "2023-08-18",
    views: 321,
    likes: 19,
    downloads: 8,
    status: "draft",
  },
]

export function ContentList() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredContent =
    activeTab === "all"
      ? contentItems
      : activeTab === "drafts"
        ? contentItems.filter((item) => item.status === "draft")
        : contentItems.filter((item) => item.type === activeTab)

  return (
    <Card className="backdrop-blur-md bg-black/30 border-purple-500/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Content Management</CardTitle>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Plus className="h-4 w-4 mr-2" /> Create New
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 mb-4 bg-black/20">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="image">Images</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="document">Docs</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-4">
              {filteredContent.length === 0 ? (
                <div className="text-center py-8 text-gray-400">No content found in this category</div>
              ) : (
                filteredContent.map((item) => <ContentItem key={item.id} item={item} />)
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function ContentItem({ item }: { item: any }) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-400" />
      case "video":
        return <Film className="h-5 w-5 text-red-400" />
      case "audio":
        return <Music className="h-5 w-5 text-green-400" />
      case "document":
        return <FileText className="h-5 w-5 text-yellow-400" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <div className="flex items-center p-3 rounded-lg bg-black/20 border border-purple-500/10 hover:bg-black/30 transition-all">
      <div className="h-16 w-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
        <img src={item.thumbnail || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-white truncate">{item.title}</h3>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span className="flex items-center mr-3">
                {getTypeIcon(item.type)}
                <span className="ml-1 capitalize">{item.type}</span>
              </span>
              <span className="mr-3">Created: {item.created}</span>
              {item.status === "draft" && (
                <Badge variant="outline" className="bg-yellow-900/30 text-yellow-300 border-yellow-500/30">
                  Draft
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center mt-2 text-xs text-gray-400">
          <span className="flex items-center mr-3">
            <Eye className="h-3 w-3 mr-1" /> {item.views}
          </span>
          <span className="flex items-center mr-3">
            <Heart className="h-3 w-3 mr-1 text-red-400" /> {item.likes}
          </span>
          <span className="flex items-center">
            <Download className="h-3 w-3 mr-1 text-blue-400" /> {item.downloads}
          </span>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-black/90 border-purple-500/20">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center cursor-pointer">
            <Edit className="h-4 w-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center cursor-pointer">
            <BarChart2 className="h-4 w-4 mr-2" /> Analytics
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center text-red-400 cursor-pointer">
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
