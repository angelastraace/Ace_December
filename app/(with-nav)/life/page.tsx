"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plane, Hotel, Gift, CarTaxiFrontIcon as Taxi, Wifi, Star, Clock } from "lucide-react"
import LifeMarketplace from "@/components/life/life-marketplace"
import LifeOrders from "@/components/life/life-orders"
import LifeWishlist from "@/components/life/life-wishlist"
import LifeRewards from "@/components/life/life-rewards"
import LifeHeader from "@/components/life/life-header"

export default function LifePage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-[#001219]">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container absolute inset-0 z-0">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <LifeHeader />

        <div className="mt-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search for flights, hotels, gift cards..."
                className="pl-10 bg-black/40 border-gray-700 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-500/10">
                <Clock size={16} className="mr-2" /> Limited Offers
              </Button>
              <Button variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-500/10">
                <Star size={16} className="mr-2" /> Top Rated
              </Button>
            </div>
          </div>

          <Tabs defaultValue="marketplace" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-black/40 mb-8">
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              <TabsTrigger value="orders">My Orders</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="rewards">Loyalty Rewards</TabsTrigger>
            </TabsList>

            <TabsContent value="marketplace">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                <Card className="bg-black/40 border-gray-800 hover:border-teal-500 transition-all cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Plane className="h-8 w-8 text-teal-500 mb-2" />
                    <span className="text-white">Flights</span>
                  </CardContent>
                </Card>
                <Card className="bg-black/40 border-gray-800 hover:border-teal-500 transition-all cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Hotel className="h-8 w-8 text-teal-500 mb-2" />
                    <span className="text-white">Hotels</span>
                  </CardContent>
                </Card>
                <Card className="bg-black/40 border-gray-800 hover:border-teal-500 transition-all cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Gift className="h-8 w-8 text-teal-500 mb-2" />
                    <span className="text-white">Gift Cards</span>
                  </CardContent>
                </Card>
                <Card className="bg-black/40 border-gray-800 hover:border-teal-500 transition-all cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Taxi className="h-8 w-8 text-teal-500 mb-2" />
                    <span className="text-white">Taxis</span>
                  </CardContent>
                </Card>
                <Card className="bg-black/40 border-gray-800 hover:border-teal-500 transition-all cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Wifi className="h-8 w-8 text-teal-500 mb-2" />
                    <span className="text-white">eSIMs</span>
                  </CardContent>
                </Card>
              </div>

              <LifeMarketplace searchQuery={searchQuery} />
            </TabsContent>

            <TabsContent value="orders">
              <LifeOrders />
            </TabsContent>

            <TabsContent value="wishlist">
              <LifeWishlist />
            </TabsContent>

            <TabsContent value="rewards">
              <LifeRewards />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
