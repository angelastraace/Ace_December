"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, TrendingUp, TrendingDown, Loader2 } from "lucide-react"

// Mock pattern detection results
const detectedPatterns = [
  {
    id: 1,
    pattern: "Bull Flag",
    symbol: "BTC/USDT",
    timeframe: "4H",
    confidence: 82,
    direction: "bullish",
    description: "A continuation pattern suggesting further upside after consolidation",
    action: "Consider long positions if price breaks above the flag with increased volume",
  },
  {
    id: 2,
    pattern: "Double Bottom",
    symbol: "ETH/USDT",
    timeframe: "1D",
    confidence: 76,
    direction: "bullish",
    description: "A reversal pattern indicating a potential change from bearish to bullish trend",
    action: "Look for entry points after confirmation of the pattern completion",
  },
  {
    id: 3,
    pattern: "Head and Shoulders",
    symbol: "SOL/USDT",
    timeframe: "4H",
    confidence: 68,
    direction: "bearish",
    description: "A reversal pattern suggesting a potential downside after an uptrend",
    action: "Consider short positions if price breaks below the neckline with increased volume",
  },
  {
    id: 4,
    pattern: "Ascending Triangle",
    symbol: "BNB/USDT",
    timeframe: "1D",
    confidence: 74,
    direction: "bullish",
    description: "A continuation pattern with horizontal resistance and rising support",
    action: "Watch for breakout above resistance with increased volume",
  },
]

export default function TradePatternRecognizer() {
  const [selectedMarket, setSelectedMarket] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("all")
  const [loading, setLoading] = useState(false)
  const [patterns, setPatterns] = useState(detectedPatterns)

  const handleScan = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      // Filter patterns based on selection
      let filteredPatterns = [...detectedPatterns]
      if (selectedMarket !== "all") {
        filteredPatterns = filteredPatterns.filter((p) => p.symbol === selectedMarket)
      }
      if (selectedTimeframe !== "all") {
        filteredPatterns = filteredPatterns.filter((p) => p.timeframe === selectedTimeframe)
      }
      setPatterns(filteredPatterns)
      setLoading(false)
    }, 2000)
  }

  return (
    <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center">
          <div className="mr-3 rounded-full bg-red-900/20 p-2">
            <Zap className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <CardTitle className="text-white">Pattern Recognizer</CardTitle>
            <CardDescription className="text-gray-400">Identify trading patterns and market signals</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="patterns" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900">
            <TabsTrigger value="patterns">Detected Patterns</TabsTrigger>
            <TabsTrigger value="scanner">Pattern Scanner</TabsTrigger>
          </TabsList>

          <TabsContent value="patterns" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                  <SelectTrigger className="w-[120px] border-gray-700 bg-gray-800 text-white">
                    <SelectValue placeholder="Market" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-700 bg-gray-800 text-white">
                    <SelectItem value="all">All Markets</SelectItem>
                    <SelectItem value="BTC/USDT">BTC/USDT</SelectItem>
                    <SelectItem value="ETH/USDT">ETH/USDT</SelectItem>
                    <SelectItem value="SOL/USDT">SOL/USDT</SelectItem>
                    <SelectItem value="BNB/USDT">BNB/USDT</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-[120px] border-gray-700 bg-gray-800 text-white">
                    <SelectValue placeholder="Timeframe" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-700 bg-gray-800 text-white">
                    <SelectItem value="all">All Timeframes</SelectItem>
                    <SelectItem value="15m">15m</SelectItem>
                    <SelectItem value="1H">1H</SelectItem>
                    <SelectItem value="4H">4H</SelectItem>
                    <SelectItem value="1D">1D</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleScan}
                disabled={loading}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
              </Button>
            </div>

            <div className="space-y-3">
              {patterns.length > 0 ? (
                patterns.map((pattern) => (
                  <div key={pattern.id} className="rounded-md border border-gray-800 bg-gray-900/50 p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`mr-3 rounded-full p-2 ${
                            pattern.direction === "bullish" ? "bg-green-900/20" : "bg-red-900/20"
                          }`}
                        >
                          {pattern.direction === "bullish" ? (
                            <TrendingUp
                              className={`h-4 w-4 ${
                                pattern.direction === "bullish" ? "text-green-500" : "text-red-500"
                              }`}
                            />
                          ) : (
                            <TrendingDown
                              className={`h-4 w-4 ${
                                pattern.direction === "bullish" ? "text-green-500" : "text-red-500"
                              }`}
                            />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium text-white">{pattern.pattern}</h4>
                            <Badge
                              className={`ml-2 ${
                                pattern.confidence >= 80
                                  ? "bg-green-900/50 text-green-400"
                                  : pattern.confidence >= 60
                                    ? "bg-yellow-900/50 text-yellow-400"
                                    : "bg-red-900/50 text-red-400"
                              }`}
                            >
                              {pattern.confidence}% confidence
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">
                            {pattern.symbol} • {pattern.timeframe}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        Details
                      </Button>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-300">{pattern.description}</p>
                      <p className="mt-1 text-sm font-medium text-gray-300">
                        <span className="text-red-400">Action:</span> {pattern.action}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed border-gray-700 p-4 text-center">
                  <p className="text-gray-400">No patterns detected with current filters</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedMarket("all")
                      setSelectedTimeframe("all")
                      setPatterns(detectedPatterns)
                    }}
                    className="mt-2 border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="scanner" className="mt-4">
            <div className="space-y-4">
              <div className="rounded-md border border-gray-800 bg-gray-900/50 p-4">
                <h3 className="mb-2 font-medium text-white">Custom Pattern Scanner</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm text-gray-400">Select Market</label>
                    <Select defaultValue="BTC/USDT">
                      <SelectTrigger className="w-full border-gray-700 bg-gray-800 text-white">
                        <SelectValue placeholder="Select Market" />
                      </SelectTrigger>
                      <SelectContent className="border-gray-700 bg-gray-800 text-white">
                        <SelectItem value="BTC/USDT">BTC/USDT</SelectItem>
                        <SelectItem value="ETH/USDT">ETH/USDT</SelectItem>
                        <SelectItem value="SOL/USDT">SOL/USDT</SelectItem>
                        <SelectItem value="BNB/USDT">BNB/USDT</SelectItem>
                        <SelectItem value="XRP/USDT">XRP/USDT</SelectItem>
                        <SelectItem value="ADA/USDT">ADA/USDT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-400">Timeframe</label>
                    <Select defaultValue="1H">
                      <SelectTrigger className="w-full border-gray-700 bg-gray-800 text-white">
                        <SelectValue placeholder="Select Timeframe" />
                      </SelectTrigger>
                      <SelectContent className="border-gray-700 bg-gray-800 text-white">
                        <SelectItem value="5m">5m</SelectItem>
                        <SelectItem value="15m">15m</SelectItem>
                        <SelectItem value="30m">30m</SelectItem>
                        <SelectItem value="1H">1H</SelectItem>
                        <SelectItem value="4H">4H</SelectItem>
                        <SelectItem value="1D">1D</SelectItem>
                        <SelectItem value="1W">1W</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-1 block text-sm text-gray-400">Pattern Types</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-gray-800 text-white hover:bg-gray-700">Reversal Patterns</Badge>
                    <Badge className="bg-gray-800 text-white hover:bg-gray-700">Continuation Patterns</Badge>
                    <Badge className="bg-gray-800 text-white hover:bg-gray-700">Candlestick Patterns</Badge>
                    <Badge className="bg-gray-800 text-white hover:bg-gray-700">Chart Patterns</Badge>
                    <Badge className="bg-gray-800 text-white hover:bg-gray-700">Harmonic Patterns</Badge>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-1 block text-sm text-gray-400">Minimum Confidence</label>
                  <Select defaultValue="60">
                    <SelectTrigger className="w-full border-gray-700 bg-gray-800 text-white">
                      <SelectValue placeholder="Select Confidence" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-700 bg-gray-800 text-white">
                      <SelectItem value="50">50%</SelectItem>
                      <SelectItem value="60">60%</SelectItem>
                      <SelectItem value="70">70%</SelectItem>
                      <SelectItem value="80">80%</SelectItem>
                      <SelectItem value="90">90%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="mt-4 w-full bg-red-600 text-white hover:bg-red-700">Scan for Patterns</Button>
              </div>

              <div className="rounded-md border border-gray-800 bg-gray-900/50 p-4">
                <h3 className="mb-2 font-medium text-white">AI Pattern Recognition</h3>
                <p className="text-sm text-gray-400">
                  Our AI system analyzes historical price data to identify patterns that may not be visible through
                  traditional technical analysis.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-gray-400">AI Model: Active</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></div>
                      <span className="text-xs text-gray-400">Last Update: 5 minutes ago</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    Configure AI
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
