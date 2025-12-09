"use client"

import { useEffect, useState } from "react"

export default function LimitedSpotsCounter() {
  const [spotsLeft, setSpotsLeft] = useState(247)

  useEffect(() => {
    // Simulate spots decreasing randomly
    const interval = setInterval(() => {
      if (spotsLeft > 1) {
        setSpotsLeft((prev) => Math.max(prev - Math.floor(Math.random() * 2), 1))
      } else {
        clearInterval(interval)
      }
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [spotsLeft])

  return (
    <div className="flex items-center rounded-full bg-amber-900/30 px-4 py-2">
      <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-amber-500"></div>
      <p className="text-sm font-medium text-amber-400">
        Only <span className="font-bold">{spotsLeft}</span> spots left at this tier
      </p>
    </div>
  )
}
