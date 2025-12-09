"use client"

import { useEffect, useState } from "react"

export default function LiveSignupCounter() {
  const [signups, setSignups] = useState(5243)

  useEffect(() => {
    // Simulate signups increasing randomly
    const interval = setInterval(() => {
      setSignups((prev) => prev + Math.floor(Math.random() * 3))
    }, 8000) // Every 8 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center rounded-full bg-teal-900/30 px-4 py-2">
      <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-teal-500"></div>
      <p className="text-sm font-medium text-teal-400">
        <span className="font-bold">{signups.toLocaleString()}</span> people have already joined
      </p>
    </div>
  )
}
