"use client"

import { useState } from "react"
import { Check, Lock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const milestones = [
  {
    target: 1000,
    title: "Community AMA with Founders",
    description: "Live Q&A session with the founding team",
    unlocked: true,
    progress: 100,
  },
  {
    target: 5000,
    title: "Exclusive NFT Drop",
    description: "Limited edition NFTs for all waitlist members",
    unlocked: true,
    progress: 100,
  },
  {
    target: 10000,
    title: "Trading Fee Discount",
    description: "50% off trading fees for 3 months for all waitlist members",
    unlocked: false,
    progress: 65,
  },
  {
    target: 25000,
    title: "Token Airdrop",
    description: "Free ACE tokens for all waitlist members",
    unlocked: false,
    progress: 32,
  },
  {
    target: 50000,
    title: "Mystery Feature Unlock",
    description: "A revolutionary feature will be added to the platform",
    unlocked: false,
    progress: 15,
  },
  {
    target: 100000,
    title: "Grand Prize Drawing",
    description: "10 lucky waitlist members will win 1 BTC each",
    unlocked: false,
    progress: 8,
  },
]

export default function MilestoneUnlocks() {
  const [currentSignups] = useState(8500)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white">Current Waitlist: {currentSignups.toLocaleString()} Members</h3>
        <p className="text-gray-400">Help us reach our next milestone!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {milestones.map((milestone) => (
          <div
            key={milestone.target}
            className={`relative overflow-hidden rounded-lg border ${
              milestone.unlocked
                ? "border-teal-800/50 bg-gradient-to-br from-teal-900/20 to-teal-950/40"
                : "border-gray-800 bg-black/40"
            } p-6 backdrop-blur-sm`}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-gray-300">
                {milestone.target.toLocaleString()} Members
              </div>
              {milestone.unlocked ? (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-900">
                  <Check className="h-3 w-3 text-teal-400" />
                </div>
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-800">
                  <Lock className="h-3 w-3 text-gray-400" />
                </div>
              )}
            </div>
            <h3 className="mb-1 text-lg font-medium text-white">{milestone.title}</h3>
            <p className="mb-4 text-sm text-gray-400">{milestone.description}</p>
            <Progress value={milestone.progress} className="h-1.5 bg-gray-800" indicatorColor="bg-teal-500" />
            <p className="mt-2 text-right text-xs text-gray-500">{milestone.progress}% Complete</p>
          </div>
        ))}
      </div>
    </div>
  )
}
