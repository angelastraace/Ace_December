"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"
import GlowDemo from "@/components/dreamstate/GlowDemo"
import XPConstellationDemo from "@/components/dreamstate/XPConstellationDemo"
import Starfield from "@/components/dreamstate/Starfield"

export default function DreamstatePage() {
  const [tab, setTab] = useState("trade")

  const handleBeginTrading = () => {
    // Handle trading action
    console.log("Begin trading clicked")
  }

  const handleContinueLearning = () => {
    // Handle learning continuation
    console.log("Continue learning clicked")
  }

  return (
    <div className="relative z-10">
      <Starfield />
      <div className="relative z-20 px-4 md:px-12 max-w-7xl mx-auto py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Dreamstate</h1>
          <p className="text-lg md:text-xl text-blue-300">
            Explore your multi-dimensional journey through trading, learning, and XP constellations.
          </p>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="mb-6 bg-black/50 border border-blue-500/30">
            <TabsTrigger value="trade" className="text-blue-400">
              Trade
            </TabsTrigger>
            <TabsTrigger value="learn" className="text-pink-400">
              Learn
            </TabsTrigger>
            <TabsTrigger value="constellation" className="text-purple-400">
              Constellation
            </TabsTrigger>
          </TabsList>

          <motion.div layout>
            <TabsContent value="trade" className="mt-0">
              <Card className="bg-black/40 border border-blue-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-blue-400">Cosmic Trading</CardTitle>
                  <CardDescription>Trade across dimensions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-6">
                    Experience trading in a new dimension with intuitive visualizations and cosmic patterns that reveal
                    market movements in ways never before possible.
                  </p>

                  <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 rounded-lg border border-blue-500/30 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-blue-400">Cosmic Market View</h3>
                      <div className="flex space-x-2">
                        {["1D", "1W", "1M"].map((label) => (
                          <Button
                            key={label}
                            variant="outline"
                            size="sm"
                            className="h-8 border-blue-500/50 text-blue-400 hover:bg-blue-950/30"
                          >
                            {label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="h-48 flex items-end space-x-1">
                      {Array.from({ length: 24 }).map((_, i) => {
                        const height = 30 + Math.sin(i * 0.5) * 20 + Math.random() * 30
                        return (
                          <div
                            key={i}
                            className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-sm w-full"
                            style={{ height: `${height}%` }}
                          ></div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                      <h3 className="font-medium text-blue-400 mb-2">Active Trades</h3>
                      <div className="space-y-2 text-sm text-gray-300">
                        <div className="flex justify-between">
                          <span>ETH/DREAM</span>
                          <span className="text-green-400">+12.4%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>BTC/DREAM</span>
                          <span className="text-red-400">-3.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>COSMOS/DREAM</span>
                          <span className="text-green-400">+8.7%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                      <h3 className="font-medium text-purple-400 mb-2">Cosmic Insights</h3>
                      <p className="text-sm text-gray-300">
                        Market patterns indicate a convergence of cosmic energies around decentralized finance projects.
                        Consider increasing exposure to DeFi assets.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4 border-purple-500/50 text-purple-400 hover:bg-purple-950/30"
                        onClick={handleBeginTrading}
                      >
                        Begin Trading
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="learn" className="mt-0">
              <Card className="bg-black/40 border border-pink-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-pink-400">Cosmic Learning</CardTitle>
                  <CardDescription>Expand your knowledge across dimensions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-6">
                    Access immersive educational experiences that combine traditional learning with cosmic insights,
                    helping you understand markets on a deeper level.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { title: "Cosmic Market Cycles", duration: "23 min • Beginner" },
                      { title: "Dimensional Analysis", duration: "45 min • Intermediate" },
                      { title: "Quantum Trading", duration: "60 min • Advanced" },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-pink-900/20 p-4 rounded-lg border border-pink-500/30">
                        <div className="aspect-video bg-black/30 rounded mb-3 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-pink-500/80 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-white"
                            >
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                          </div>
                        </div>
                        <h3 className="font-medium text-pink-400 mb-1">{item.title}</h3>
                        <p className="text-xs text-gray-400">{item.duration}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-gradient-to-r from-pink-900/20 to-purple-900/20 p-6 rounded-lg border border-pink-500/30">
                    <h3 className="font-medium text-pink-400 mb-3">Learning Path: Cosmic Trader</h3>
                    <div className="relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
                        <div
                          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                      <div className="pt-6 flex justify-between">
                        {["Beginner", "Intermediate", "Advanced", "Master"].map((label, idx) => (
                          <div key={idx} className="text-center">
                            <div className="w-4 h-4 rounded-full mx-auto bg-pink-900 border border-pink-500" />
                            <p className="text-xs text-gray-400 mt-1">{label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mt-4">
                      You've completed 35% of the Cosmic Trader learning path. Continue your journey to unlock advanced
                      trading techniques.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 border-pink-500/50 text-pink-400 hover:bg-pink-950/30"
                      onClick={handleContinueLearning}
                    >
                      Continue Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="constellation" className="mt-0">
              <Card className="bg-black/40 border border-purple-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-400">Your XP Constellation</CardTitle>
                  <CardDescription>Your cosmic footprint in the Dreamstate</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-6">
                    In Dreamstate, your experience points (XP) form a unique constellation that grows and evolves as you
                    progress. Each star represents achievements, trades, and knowledge gained on your journey.
                  </p>

                  <XPConstellationDemo />

                  <div className="mt-8 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                    <h3 className="font-medium text-purple-400 mb-2">About Your Constellation</h3>
                    <p className="text-sm text-gray-300">
                      Your constellation is unique to you, reflecting your journey through the Dreamstate. As you earn
                      XP through trading, learning, and participating in governance, your constellation grows more
                      complex and brilliant.
                    </p>
                    <p className="text-sm text-gray-300 mt-2">
                      Special patterns emerge when you complete achievements or reach significant milestones. These
                      patterns are visible to other travelers in the Dreamstate, serving as a cosmic signature of your
                      accomplishments.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </Tabs>

        <div className="mt-12">
          <Card className="bg-black/40 border border-blue-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-blue-400">Glow Material Technology</CardTitle>
              <CardDescription>Powering the visual aesthetics of Dreamstate</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">
                The Dreamstate experience is enhanced by our custom glow shader technology, creating the ethereal visual
                effects that bring the cosmic universe to life.
              </p>

              <GlowDemo className="h-64 w-full bg-black/20 rounded-lg mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                  <h3 className="font-medium text-blue-400 mb-2">Adaptive Glow</h3>
                  <p className="text-sm text-gray-300">
                    Objects in Dreamstate adapt their glow based on your interactions and achievements.
                  </p>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h3 className="font-medium text-green-400 mb-2">Energy Visualization</h3>
                  <p className="text-sm text-gray-300">
                    Market energy and trading opportunities are visualized through dynamic glow patterns.
                  </p>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h3 className="font-medium text-purple-400 mb-2">Mood Reflection</h3>
                  <p className="text-sm text-gray-300">
                    The ambient glow of your environment subtly shifts to reflect your trading patterns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
