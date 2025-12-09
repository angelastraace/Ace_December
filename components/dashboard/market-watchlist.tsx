"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Star, StarOff, TrendingUp, TrendingDown, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface MarketPair {
  pair: string
  name: string
  price: number
  change: number
  volume: number
  favorite: boolean
}

export function MarketWatchlist() {
  const [marketData, setMarketData] = useState<MarketPair[]>([
    {
      pair: "BTC/USDT",
      name: "Bitcoin",
      price: 39120.5,
      change: 2.4,
      volume: 1245000000,
      favorite: true,
    },
    {
      pair: "ETH/USDT",
      name: "Ethereum",
      price: 2018.75,
      change: -1.2,
      volume: 845000000,
      favorite: true,
    },
    {
      pair: "ACE/USDT",
      name: "ACE Token",
      price: 1.5,
      change: 5.7,
      volume: 24500000,
      favorite: true,
    },
    {
      pair: "SOL/USDT",
      name: "Solana",
      price: 102.35,
      change: 3.8,
      volume: 356000000,
      favorite: false,
    },
    {
      pair: "AVAX/USDT",
      name: "Avalanche",
      price: 28.75,
      change: -0.5,
      volume: 125000000,
      favorite: false,
    },
  ])

  const toggleFavorite = (index: number) => {
    const newData = [...marketData]
    newData[index].favorite = !newData[index].favorite
    setMarketData(newData)
  }

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prevData) =>
        prevData.map((item) => ({
          ...item,
          price: item.price * (1 + (Math.random() * 0.002 - 0.001)),
          change: item.change + (Math.random() * 0.2 - 0.1),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-black/40 backdrop-blur-md border-purple-500/20 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/5 pointer-events-none" />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-400" />
            Market Watchlist
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
            <Plus className="h-4 w-4 mr-1" /> Add Pair
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-xs border-b border-gray-800">
                <th className="pb-2 text-left font-medium">Pair</th>
                <th className="pb-2 text-right font-medium">Price</th>
                <th className="pb-2 text-right font-medium">24h Change</th>
                <th className="pb-2 text-right font-medium">24h Volume</th>
                <th className="pb-2 text-center font-medium w-10"></th>
              </tr>
            </thead>
            <tbody>
              {marketData.map((market, index) => (
                <tr key={index} className="border-b border-gray-800/50 hover:bg-white/5">
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="mr-2">
                        <Badge variant="outline" className="bg-white/5 hover:bg-white/10 border-0">
                          {market.pair.split("/")[0]}
                        </Badge>
                      </div>
                      <div>
                        <p className="font-medium text-white">{market.pair}</p>
                        <p className="text-xs text-gray-400">{market.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-right font-mono text-white">
                    ${market.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 text-right">
                    <div
                      className={`flex items-center justify-end ${market.change > 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {market.change > 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {market.change > 0 ? "+" : ""}
                      {market.change.toFixed(2)}%
                    </div>
                  </td>
                  <td className="py-3 text-right text-gray-300">${(market.volume / 1000000).toFixed(1)}M</td>
                  <td className="py-3 text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-7 w-7 ${market.favorite ? "text-yellow-400" : "text-gray-600"}`}
                      onClick={() => toggleFavorite(index)}
                    >
                      {market.favorite ? <Star className="h-4 w-4" /> : <StarOff className="h-4 w-4" />}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
