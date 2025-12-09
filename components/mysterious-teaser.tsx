"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Lock } from "lucide-react"

export default function MysteriousTeaser() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [hoverCount, setHoverCount] = useState(0)

  const handleMouseEnter = () => {
    setHoverCount((prev) => prev + 1)
    if (hoverCount >= 2) {
      setIsRevealed(true)
    }
  }

  // Reset the teaser after some time
  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setIsRevealed(false)
        setHoverCount(0)
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [isRevealed])

  return (
    <Card
      className={`relative overflow-hidden border border-gray-800 transition-all duration-700 ${
        isRevealed ? "bg-gradient-to-br from-teal-900/40 to-purple-900/40" : "bg-black/40"
      }`}
      onMouseEnter={handleMouseEnter}
    >
      <div
        className={`absolute inset-0 bg-[url('/placeholder-ome9q.png')] bg-cover bg-center opacity-20 transition-opacity duration-700 ${
          isRevealed ? "opacity-40" : "opacity-10"
        }`}
      ></div>

      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        {!isRevealed ? (
          <>
            <Lock className="mb-4 h-12 w-12 text-teal-500 opacity-70" />
            <h3 className="mb-2 text-2xl font-bold text-white">Secret Feature Coming Soon</h3>
            <p className="text-gray-400">Hover to reveal a glimpse of what's coming...</p>
            <div className="mt-4 h-1 w-24 overflow-hidden rounded-full bg-gray-800">
              <div
                className="h-full bg-teal-500 transition-all duration-300"
                style={{ width: `${(hoverCount / 3) * 100}%` }}
              ></div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-900/50">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-white">AI-Powered Trading Assistant</h3>
            <p className="mb-4 text-gray-300">
              Our revolutionary AI assistant analyzes market trends, predicts movements, and helps you make informed
              trading decisions in real-time.
            </p>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="rounded-lg bg-black/30 p-3">
                <p className="text-sm font-medium text-teal-400">Personalized Insights</p>
              </div>
              <div className="rounded-lg bg-black/30 p-3">
                <p className="text-sm font-medium text-teal-400">Risk Assessment</p>
              </div>
              <div className="rounded-lg bg-black/30 p-3">
                <p className="text-sm font-medium text-teal-400">Market Predictions</p>
              </div>
              <div className="rounded-lg bg-black/30 p-3">
                <p className="text-sm font-medium text-teal-400">Strategy Builder</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
