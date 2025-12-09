"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Eye,
  Grid3X3,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Edit,
  Copy,
  ExternalLink,
  BarChart3,
} from "lucide-react"
import NFTCreationForm from "./nft-creation-form"

interface NFT {
  id: string
  name: string
  description: string
  image: string
  price: number
  currency: string
  collection: string
  status: "listed" | "unlisted" | "sold"
  createdAt: string
  views: number
  likes: number
}

export default function NFTGallery() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("newest")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreationForm, setShowCreationForm] = useState(false)

  // Mock NFT data
  const nfts: NFT[] = [
    {
      id: "nft-1",
      name: "Cosmic Voyager #1",
      description: "The first in the Cosmic Voyager collection, representing the journey through digital space.",
      image: "/placeholder.svg?key=6ec7m",
      price: 250,
      currency: "ACE",
      collection: "Cosmic Voyagers",
      status: "listed",
      createdAt: "2023-11-15",
      views: 1240,
      likes: 89,
    },
    {
      id: "nft-2",
      name: "Digital Dreamscape #5",
      description: "A surreal landscape from the Digital Dreamscape series.",
      image: "/surreal-digital-landscape.png",
      price: 180,
      currency: "ACE",
      collection: "Digital Dreamscapes",
      status: "listed",
      createdAt: "2023-11-10",
      views: 950,
      likes: 72,
    },
    {
      id: "nft-3",
      name: "Neon Horizon",
      description: "A vibrant cityscape with neon lights illuminating the horizon.",
      image: "/neon-cyberpunk-city.png",
      price: 320,
      currency: "ACE",
      collection: "Cybernetic Visions",
      status: "listed",
      createdAt: "2023-11-05",
      views: 1560,
      likes: 124,
    },
    {
      id: "nft-4",
      name: "Quantum Particle #8",
      description: "Abstract representation of quantum particles in motion.",
      image: "/abstract-quantum-particles.png",
      price: 150,
      currency: "ACE",
      collection: "Quantum Series",
      status: "sold",
      createdAt: "2023-10-28",
      views: 2100,
      likes: 156,
    },
    {
      id: "nft-5",
      name: "Ethereal Garden",
      description: "A mystical garden with bioluminescent plants and creatures.",
      image: "/placeholder.svg?height=400&width=400&query=mystical bioluminescent garden",
      price: 275,
      currency: "ACE",
      collection: "Natural Wonders",
      status: "unlisted",
      createdAt: "2023-10-20",
      views: 780,
      likes: 63,
    },
    {
      id: "nft-6",
      name: "Cosmic Voyager #2",
      description: "The second in the Cosmic Voyager collection, continuing the journey.",
      image: "/placeholder.svg?height=400&width=400&query=cosmic digital art 2",
      price: 280,
      currency: "ACE",
      collection: "Cosmic Voyagers",
      status: "listed",
      createdAt: "2023-10-15",
      views: 1050,
      likes: 81,
    },
  ]

  // Filter NFTs based on current filter and search query
  const filteredNFTs = nfts.filter((nft) => {
    if (filter !== "all" && nft.status !== filter) return false
    if (searchQuery && !nft.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  // Sort NFTs based on current sort option
  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    switch (sort) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case "price-high":
        return b.price - a.price
      case "price-low":
        return a.price - b.price
      case "popular":
        return b.views - a.views
      default:
        return 0
    }
  })

  const getStatusColor = (status: NFT["status"]) => {
    switch (status) {
      case "listed":
        return "bg-green-900/50 text-green-400"
      case "unlisted":
        return "bg-gray-800 text-gray-400"
      case "sold":
        return "bg-purple-900/50 text-purple-400"
      default:
        return "bg-gray-800 text-gray-400"
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
              placeholder="Search NFTs..."
              className="pl-8 border-gray-700 bg-gray-800 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[130px] border-gray-700 bg-gray-800 text-white">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="border-gray-700 bg-gray-800 text-white">
              <SelectItem value="all">All NFTs</SelectItem>
              <SelectItem value="listed">Listed</SelectItem>
              <SelectItem value="unlisted">Unlisted</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[130px] border-gray-700 bg-gray-800 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="border-gray-700 bg-gray-800 text-white">
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
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

          <Button className="bg-teal-500 hover:bg-teal-600 text-black" onClick={() => setShowCreationForm(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create NFT
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 bg-black/20 backdrop-blur-sm">
          <TabsTrigger value="all" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            All NFTs
          </TabsTrigger>
          <TabsTrigger
            value="collections"
            className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400"
          >
            Collections
          </TabsTrigger>
          <TabsTrigger value="drafts" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            Drafts
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedNFTs.map((nft) => (
                <Card key={nft.id} className="bg-black/40 border-gray-800 backdrop-blur-sm overflow-hidden">
                  <div className="relative aspect-square">
                    <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-full h-full object-cover" />
                    <Badge className={`absolute top-2 right-2 ${getStatusColor(nft.status)}`}>
                      {nft.status === "listed" ? "Listed" : nft.status === "unlisted" ? "Unlisted" : "Sold"}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-white text-lg">{nft.name}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 border-gray-700 bg-gray-800 text-white">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem className="hover:bg-gray-700">
                            <Edit className="mr-2 h-4 w-4" /> Edit NFT
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-gray-700">
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-gray-700">
                            <BarChart3 className="mr-2 h-4 w-4" /> View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-gray-700">
                            <Copy className="mr-2 h-4 w-4" /> Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-gray-700">
                            <ExternalLink className="mr-2 h-4 w-4" /> View on Marketplace
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem className="text-red-400 hover:bg-red-900/20 hover:text-red-400">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-teal-400 font-bold">
                        {nft.price} {nft.currency}
                      </div>
                      <div className="text-sm text-gray-400">{nft.collection}</div>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2">{nft.description}</p>
                  </CardContent>
                  <CardFooter className="pt-2 text-xs text-gray-500 flex justify-between">
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {nft.views}
                    </div>
                    <div>Created {new Date(nft.createdAt).toLocaleDateString()}</div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedNFTs.map((nft) => (
                <Card key={nft.id} className="bg-black/40 border-gray-800 backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-48 h-48 shrink-0">
                      <img
                        src={nft.image || "/placeholder.svg"}
                        alt={nft.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{nft.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getStatusColor(nft.status)}>
                              {nft.status === "listed" ? "Listed" : nft.status === "unlisted" ? "Unlisted" : "Sold"}
                            </Badge>
                            <span className="text-sm text-gray-400">{nft.collection}</span>
                          </div>
                          <p className="text-gray-300 mb-4">{nft.description}</p>
                          <div className="text-teal-400 font-bold text-lg">
                            {nft.price} {nft.currency}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56 border-gray-700 bg-gray-800 text-white">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <DropdownMenuItem className="hover:bg-gray-700">
                              <Edit className="mr-2 h-4 w-4" /> Edit NFT
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-700">
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-700">
                              <BarChart3 className="mr-2 h-4 w-4" /> View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-700">
                              <Copy className="mr-2 h-4 w-4" /> Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-700">
                              <ExternalLink className="mr-2 h-4 w-4" /> View on Marketplace
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <DropdownMenuItem className="text-red-400 hover:bg-red-900/20 hover:text-red-400">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="p-6 border-t md:border-t-0 md:border-l border-gray-800 flex flex-col justify-between md:w-48 shrink-0">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Views:</span>
                          <span className="text-white">{nft.views}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Likes:</span>
                          <span className="text-white">{nft.likes}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Created:</span>
                          <span className="text-white">{new Date(nft.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-teal-800 bg-teal-900/20 text-teal-400 hover:bg-teal-900/40"
                        >
                          <Eye className="mr-2 h-4 w-4" /> View
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="collections" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Cosmic Voyagers",
                count: 12,
                image: "/placeholder.svg?height=400&width=400&query=cosmic collection",
              },
              {
                name: "Digital Dreamscapes",
                count: 8,
                image: "/placeholder.svg?height=400&width=400&query=digital dreamscape collection",
              },
              {
                name: "Cybernetic Visions",
                count: 5,
                image: "/placeholder.svg?height=400&width=400&query=cyberpunk collection",
              },
              {
                name: "Quantum Series",
                count: 10,
                image: "/placeholder.svg?height=400&width=400&query=quantum abstract collection",
              },
              {
                name: "Natural Wonders",
                count: 6,
                image: "/placeholder.svg?height=400&width=400&query=nature digital collection",
              },
            ].map((collection, i) => (
              <Card key={i} className="bg-black/40 border-gray-800 backdrop-blur-sm overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold text-white">{collection.name}</h3>
                    <p className="text-gray-300">{collection.count} NFTs</p>
                  </div>
                </div>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    <Eye className="mr-2 h-4 w-4" /> View
                  </Button>
                  <Button
                    variant="outline"
                    className="border-teal-800 bg-teal-900/20 text-teal-400 hover:bg-teal-900/40"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add NFT
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <Card className="bg-black/40 border-gray-800 backdrop-blur-sm overflow-hidden flex flex-col items-center justify-center h-[232px]">
              <Plus className="h-12 w-12 text-gray-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Create Collection</h3>
              <p className="text-gray-400 text-center mb-4 px-6">Group your NFTs into a themed collection</p>
              <Button className="bg-teal-500 hover:bg-teal-600 text-black">
                <Plus className="mr-2 h-4 w-4" /> New Collection
              </Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="drafts" className="mt-6">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
              <Edit className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Drafts Found</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              You don't have any draft NFTs. Create a new NFT and save it as a draft to continue working on it later.
            </p>
            <Button className="bg-teal-500 hover:bg-teal-600 text-black" onClick={() => setShowCreationForm(true)}>
              <Plus className="mr-2 h-4 w-4" /> Create NFT
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
              <BarChart3 className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">NFT Analytics</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              Track the performance of your NFTs, including views, likes, and sales metrics.
            </p>
            <Button className="bg-teal-500 hover:bg-teal-600 text-black">View Detailed Analytics</Button>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showCreationForm} onOpenChange={setShowCreationForm}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New NFT</DialogTitle>
            <DialogDescription className="text-gray-400">Fill in the details to mint your new NFT</DialogDescription>
          </DialogHeader>

          <NFTCreationForm />

          <DialogFooter>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => setShowCreationForm(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
