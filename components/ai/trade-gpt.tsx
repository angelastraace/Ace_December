"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, TrendingUp, TrendingDown, BarChart2, Clock, Send, RefreshCw } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for the price chart
const priceData = [
  { time: "00:00", price: 48250, volume: 120 },
  { time: "04:00", price: 48400, volume: 145 },
  { time: "08:00", price: 48150, volume: 132 },
  { time: "12:00", price: 48600, volume: 167 },
  { time: "16:00", price: 48900, volume: 198 },
  { time: "20:00", price: 48700, volume: 175 },
  { time: "24:00", price: 49100, volume: 210 },
]

// Mock market insights
const marketInsights = [
  {
    id: 1,
    title: "BTC/USDT Analysis",
    prediction: "Bullish",
    confidence: 78,
    reasoning:
      "Bitcoin is showing strong bullish momentum with increasing volume. The recent breakout above the 48,500 resistance level suggests further upside potential. Watch for continuation above 49,200.",
    timestamp: "10 minutes ago",
  },
  {
    id: 2,
    title: "ETH/USDT Analysis",
    prediction: "Neutral",
    confidence: 65,
    reasoning:
      "Ethereum is consolidating in a range between 3,200 and 3,350. Volume has been decreasing, suggesting a period of accumulation. Wait for a breakout from this range before taking a position.",
    timestamp: "25 minutes ago",
  },
  {
    id: 3,
    title: "SOL/USDT Analysis",
    prediction: "Bearish",
    confidence: 72,
    reasoning:
      "Solana is showing signs of weakness with decreasing buying pressure. The recent rejection at the 110 resistance level and formation of a double top pattern suggests a potential reversal. Consider caution if it breaks below 102.",
    timestamp: "40 minutes ago",
  },
]

// Mock patterns detected
const patternsDetected = [
  {
    id: 1,
    symbol: "BTC/USDT",
    pattern: "Bull Flag",
    timeframe: "4H",
    confidence: 82,
    description: "Continuation pattern suggesting further upside after consolidation",
  },
  {
    id: 2,
    symbol: "ETH/USDT",
    pattern: "Ascending Triangle",
    timeframe: "1D",
    confidence: 76,
    description: "Bullish pattern with horizontal resistance and rising support",
  },
  {
    id: 3,
    symbol: "SOL/USDT",
    pattern: "Head and Shoulders",
    timeframe: "4H",
    confidence: 68,
    description: "Bearish reversal pattern suggesting potential downside",
  },
]

export default function TradeGPT() {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedMarket, setSelectedMarket] = useState("BTC/USDT")
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D")
  const [conversations, setConversations] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm TradeGPT, your AI market analyst. I can help you understand market trends, analyze patterns, and provide insights on various cryptocurrencies. What would you like to know today?",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Add user message to conversation
    setConversations([...conversations, { role: "user", content: query }])
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""
      if (query.toLowerCase().includes("bitcoin") || query.toLowerCase().includes("btc")) {
        response =
          "Bitcoin is currently in a bullish trend on the daily timeframe. The price has broken above the key resistance level at $48,500 with increasing volume, which is a positive sign. RSI is at 62, indicating strong momentum but not yet overbought. The next resistance levels to watch are $49,200 and $50,000. Support has formed at $47,800. Based on the current pattern, there's a 78% probability of continued upward movement in the next 24-48 hours."
      } else if (query.toLowerCase().includes("ethereum") || query.toLowerCase().includes("eth")) {
        response =
          "Ethereum is consolidating in a range between $3,200 and $3,350 on the 4-hour chart. Volume has been decreasing during this consolidation, suggesting a period of accumulation. MACD is showing a potential bullish crossover, but it hasn't confirmed yet. Wait for a breakout from this range with increased volume before taking a position. The key levels to watch are $3,350 resistance and $3,200 support."
      } else if (query.toLowerCase().includes("pattern") || query.toLowerCase().includes("flag")) {
        response =
          "I've detected a bull flag pattern forming on BTC/USDT 4-hour chart. This is a continuation pattern that typically forms after a strong upward movement (the pole) followed by a period of consolidation (the flag). The pattern suggests that the prior bullish trend is likely to continue once the price breaks out of the flag formation. The measured move target would be approximately $51,200 if the breakout occurs. Volume is decreasing during the flag formation, which is characteristic of this pattern."
      } else {
        response =
          "Based on my analysis of the current market conditions, we're seeing mixed signals across different cryptocurrencies. Bitcoin shows strength with increasing buy volume and positive momentum indicators, while some altcoins are experiencing consolidation phases. Market sentiment indicators suggest cautious optimism, with the Fear & Greed Index at 65 (Greed). For the specific market you're interested in, I'd need more details to provide a targeted analysis."
      }

      setConversations([...conversations, { role: "user", content: query }, { role: "assistant", content: response }])
      setLoading(false)
      setQuery("")
    }, 2000)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-teal-900/20 p-2">
                  <TrendingUp className="h-6 w-6 text-teal-500" />
                </div>
                <div>
                  <CardTitle className="text-xl text-white">TradeGPT</CardTitle>
                  <CardDescription className="text-gray-400">
                    AI-powered market analysis and trend prediction
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="border-teal-500 text-teal-400">
                Beta
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chat">
              <TabsList className="mb-4 grid w-full grid-cols-3 bg-gray-900">
                <TabsTrigger value="chat">AI Chat</TabsTrigger>
                <TabsTrigger value="insights">Market Insights</TabsTrigger>
                <TabsTrigger value="patterns">Pattern Detection</TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="space-y-4">
                <div className="h-[400px] overflow-y-auto rounded-md border border-gray-800 bg-gray-950 p-4">
                  {conversations.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user" ? "bg-teal-900/30 text-white" : "bg-gray-800/80 text-gray-200"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg bg-gray-800/80 p-3 text-gray-200">
                        <div className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin text-teal-500" />
                          <span>Analyzing market data...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <div className="flex w-full items-center space-x-2">
                    <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                      <SelectTrigger className="w-[140px] border-gray-700 bg-gray-800 text-white">
                        <SelectValue placeholder="Select market" />
                      </SelectTrigger>
                      <SelectContent className="border-gray-700 bg-gray-800 text-white">
                        <SelectItem value="BTC/USDT">BTC/USDT</SelectItem>
                        <SelectItem value="ETH/USDT">ETH/USDT</SelectItem>
                        <SelectItem value="SOL/USDT">SOL/USDT</SelectItem>
                        <SelectItem value="XRP/USDT">XRP/USDT</SelectItem>
                        <SelectItem value="ADA/USDT">ADA/USDT</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                      <SelectTrigger className="w-[100px] border-gray-700 bg-gray-800 text-white">
                        <SelectValue placeholder="Timeframe" />
                      </SelectTrigger>
                      <SelectContent className="border-gray-700 bg-gray-800 text-white">
                        <SelectItem value="15m">15m</SelectItem>
                        <SelectItem value="1H">1H</SelectItem>
                        <SelectItem value="4H">4H</SelectItem>
                        <SelectItem value="1D">1D</SelectItem>
                        <SelectItem value="1W">1W</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Ask about market trends, patterns, or specific assets..."
                      className="flex-1 border-gray-700 bg-gray-800 text-white"
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="bg-teal-600 text-black hover:bg-teal-500">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>

                <div className="rounded-md border border-gray-800 bg-gray-900/50 p-3 text-sm text-gray-400">
                  <p className="font-medium text-teal-400">Example queries:</p>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    <li>What's the current trend for Bitcoin?</li>
                    <li>Analyze the ETH/USDT 4-hour chart</li>
                    <li>Are there any bullish patterns forming on SOL?</li>
                    <li>What's your prediction for BTC in the next 24 hours?</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="insights">
                <div className="space-y-4">
                  <div className="rounded-md border border-gray-800 bg-gray-900/50 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">Market Overview</h3>
                      <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
                      </Button>
                    </div>

                    <div className="h-[250px] w-full">
                      <ChartContainer
                        config={{
                          price: {
                            label: "Price",
                            color: "hsl(var(--chart-1))",
                          },
                          volume: {
                            label: "Volume",
                            color: "hsl(var(--chart-2))",
                          },
                        }}
                        className="h-full"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={priceData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
                            <YAxis stroke="rgba(255,255,255,0.5)" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                              type="monotone"
                              dataKey="price"
                              stroke="var(--color-price)"
                              strokeWidth={2}
                              dot={false}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {marketInsights.map((insight) => (
                      <Card key={insight.id} className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg text-white">{insight.title}</CardTitle>
                            <Badge
                              className={
                                insight.prediction === "Bullish"
                                  ? "bg-green-900/50 text-green-400"
                                  : insight.prediction === "Bearish"
                                    ? "bg-red-900/50 text-red-400"
                                    : "bg-yellow-900/50 text-yellow-400"
                              }
                            >
                              {insight.prediction === "Bullish" ? (
                                <TrendingUp className="mr-1 h-3 w-3" />
                              ) : insight.prediction === "Bearish" ? (
                                <TrendingDown className="mr-1 h-3 w-3" />
                              ) : (
                                <BarChart2 className="mr-1 h-3 w-3" />
                              )}
                              {insight.prediction} ({insight.confidence}%)
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <p className="text-sm text-gray-300">{insight.reasoning}</p>
                          <div className="mt-2 flex items-center text-xs text-gray-500">
                            <Clock className="mr-1 h-3 w-3" />
                            {insight.timestamp}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="patterns">
                <div className="space-y-4">
                  <div className="rounded-md border border-gray-800 bg-gray-900/50 p-4">
                    <h3 className="mb-4 text-lg font-medium text-white">Pattern Detection</h3>
                    <p className="text-sm text-gray-400">
                      TradeGPT continuously scans the market to identify chart patterns, candlestick formations, and
                      technical indicators that may signal potential trading opportunities.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {patternsDetected.map((pattern) => (
                      <Card key={pattern.id} className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div
                                className={`mr-3 rounded-full p-2 ${
                                  pattern.pattern.includes("Bull") || pattern.pattern.includes("Ascending")
                                    ? "bg-green-900/20"
                                    : pattern.pattern.includes("Bear") ||
                                        pattern.pattern.includes("Head") ||
                                        pattern.pattern.includes("Descending")
                                      ? "bg-red-900/20"
                                      : "bg-blue-900/20"
                                }`}
                              >
                                <BarChart2
                                  className={`h-5 w-5 ${
                                    pattern.pattern.includes("Bull") || pattern.pattern.includes("Ascending")
                                      ? "text-green-500"
                                      : pattern.pattern.includes("Bear") ||
                                          pattern.pattern.includes("Head") ||
                                          pattern.pattern.includes("Descending")
                                        ? "text-red-500"
                                        : "text-blue-500"
                                  }`}
                                />
                              </div>
                              <div>
                                <h4 className="font-medium text-white">{pattern.pattern}</h4>
                                <div className="flex items-center text-sm text-gray-400">
                                  <span>{pattern.symbol}</span>
                                  <span className="mx-2">•</span>
                                  <span>{pattern.timeframe}</span>
                                  <span className="mx-2">•</span>
                                  <span>Confidence: {pattern.confidence}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="mt-3 text-sm text-gray-300">{pattern.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">TradeGPT Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border border-gray-800 bg-gray-900/50 p-3">
              <h3 className="mb-2 font-medium text-teal-400">Market Analysis</h3>
              <p className="text-sm text-gray-300">
                Get real-time insights on market trends, price movements, and trading opportunities with our advanced AI
                model.
              </p>
            </div>

            <div className="rounded-md border border-gray-800 bg-gray-900/50 p-3">
              <h3 className="mb-2 font-medium text-teal-400">Pattern Recognition</h3>
              <p className="text-sm text-gray-300">
                Identify chart patterns, candlestick formations, and technical indicators that may signal potential
                trading opportunities.
              </p>
            </div>

            <div className="rounded-md border border-gray-800 bg-gray-900/50 p-3">
              <h3 className="mb-2 font-medium text-teal-400">Sentiment Analysis</h3>
              <p className="text-sm text-gray-300">
                Understand market sentiment through analysis of social media, news, and on-chain metrics to gauge market
                direction.
              </p>
            </div>

            <div className="rounded-md border border-gray-800 bg-gray-900/50 p-3">
              <h3 className="mb-2 font-medium text-teal-400">Risk Assessment</h3>
              <p className="text-sm text-gray-300">
                Evaluate potential risks in the market and receive alerts for significant volatility or trend changes.
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400">
                <strong>Disclaimer:</strong> TradeGPT provides analysis and insights based on historical data and
                technical indicators. This is not financial advice. Always do your own research before making investment
                decisions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
