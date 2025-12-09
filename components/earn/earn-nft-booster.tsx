"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Zap, Lock, Star } from "lucide-react"

export function EarnNftBooster() {
  const [activeTab, setActiveTab] = useState("boost")

  // Mock data for NFT boosters
  const nftBoosters = [
    {
      id: 1,
      name: "Cosmic Explorer",
      description: "Tier 1 NFT booster that enhances your staking APY",
      boost: 2.5,
      rarity: "Rare",
      image: "/cosmic-explorer-nft.png",
      owned: true,
      active: true,
      products: ["Staking", "Lending"],
    },
    {
      id: 2,
      name: "Quantum Guardian",
      description: "Tier 2 NFT booster with enhanced rewards",
      boost: 5.0,
      rarity: "Epic",
      image: "/placeholder-atj1b.png",
      owned: false,
      active: false,
      products: ["Staking", "Lending", "Dual Investment"],
    },
    {
      id: 3,
      name: "Celestial Voyager",
      description: "Tier 3 NFT booster with premium rewards",
      boost: 7.5,
      rarity: "Legendary",
      image: "/placeholder-gj5kg.png",
      owned: false,
      active: false,
      products: ["All Products"],
    },
  ]

  return (
    <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-gray-700 overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-10 translate-y-1/2 -translate-x-1/2"></div>

      <CardContent className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center mb-2">
              <Sparkles className="h-5 w-5 text-purple-400 mr-2" />
              <h3 className="text-sm font-medium text-purple-400">EXCLUSIVE FEATURE</h3>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Boost Your Earnings with NFTs</h2>
            <p className="text-gray-300 mb-6">
              Unlock higher APYs across all earn products by holding special ACE NFTs. Collect, stake, and enhance your
              passive income with our unique NFT boosters.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center mr-3 mt-0.5">
                  <Zap className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium">APY Boost</h4>
                  <p className="text-sm text-gray-400">Increase your earning rates by up to 10% with premium NFTs</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center mr-3 mt-0.5">
                  <Star className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium">Exclusive Products</h4>
                  <p className="text-sm text-gray-400">Gain access to limited high-yield investment opportunities</p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-x-3">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Explore NFT Boosters</Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                Learn More
              </Button>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
            <Tabs defaultValue="boost" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-gray-800/50 border border-gray-700">
                <TabsTrigger value="boost">Your Boosters</TabsTrigger>
                <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              </TabsList>

              <TabsContent value="boost" className="mt-6">
                {nftBoosters.filter((nft) => nft.owned).length > 0 ? (
                  <div className="space-y-4">
                    {nftBoosters
                      .filter((nft) => nft.owned)
                      .map((nft) => (
                        <div key={nft.id} className="flex items-center space-x-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-700">
                            <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h4 className="font-medium">{nft.name}</h4>
                              <Badge
                                variant="outline"
                                className="ml-2 bg-purple-900/50 text-purple-400 border-purple-700"
                              >
                                {nft.rarity}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-400">{nft.boost}% APY Boost</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              nft.active
                                ? "bg-green-900/50 text-green-400 border-green-700"
                                : "bg-gray-800 text-gray-400 border-gray-700"
                            }
                          >
                            {nft.active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      ))}

                    <div className="pt-4">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Get More Boosters</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                      <Lock className="h-6 w-6 text-gray-500" />
                    </div>
                    <h4 className="font-medium mb-2">No NFT Boosters Yet</h4>
                    <p className="text-sm text-gray-400 mb-4">
                      You don't own any NFT boosters yet. Get your first one to start enhancing your earnings.
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Your First Booster</Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="marketplace" className="mt-6">
                <div className="space-y-4">
                  {nftBoosters.map((nft) => (
                    <div key={nft.id} className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-700">
                        <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h4 className="font-medium">{nft.name}</h4>
                          <Badge
                            variant="outline"
                            className={`ml-2 ${
                              nft.rarity === "Legendary"
                                ? "bg-amber-900/50 text-amber-400 border-amber-700"
                                : nft.rarity === "Epic"
                                  ? "bg-purple-900/50 text-purple-400 border-purple-700"
                                  : "bg-blue-900/50 text-blue-400 border-blue-700"
                            }`}
                          >
                            {nft.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">{nft.boost}% APY Boost</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300"
                        disabled={nft.owned}
                      >
                        {nft.owned ? "Owned" : "View"}
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
