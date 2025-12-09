"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"

export default function WaitlistEstimator() {
  const [referrals, setReferrals] = useState(5)
  const [position, setPosition] = useState(0)
  const [accessDate, setAccessDate] = useState("")

  // Calculate estimated position and access date based on referrals
  useEffect(() => {
    // Base position calculation
    const basePosition = 2500 - referrals * 100
    const estimatedPosition = Math.max(1, basePosition)
    setPosition(estimatedPosition)

    // Calculate estimated access date
    const today = new Date()
    const daysToAdd = Math.floor(estimatedPosition / 100)
    const accessDateObj = new Date(today)
    accessDateObj.setDate(today.getDate() + daysToAdd)

    // Format date
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }
    setAccessDate(accessDateObj.toLocaleDateString("en-US", options))
  }, [referrals])

  return (
    <Card className="border border-gray-800 bg-black/40 backdrop-blur-sm">
      <CardContent className="p-4">
        <h3 className="mb-4 text-center text-lg font-medium text-white">Estimate Your Access</h3>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-gray-400">Number of Referrals</span>
            <span className="font-medium text-teal-400">{referrals}</span>
          </div>
          <Slider
            value={[referrals]}
            min={0}
            max={20}
            step={1}
            onValueChange={(value) => setReferrals(value[0])}
            className="py-2"
          />
        </div>

        <div className="space-y-3 rounded-lg bg-gray-900/30 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Estimated Position</span>
            <span className="font-medium text-white">#{position.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Estimated Access Date</span>
            <span className="font-medium text-white">{accessDate}</span>
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-gray-500">Invite more friends to move up the waitlist!</p>
      </CardContent>
    </Card>
  )
}
