"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Gift, Coins, Trophy, Star, Zap } from "lucide-react"

const rewardLevels = [
  {
    level: 1,
    name: "Starter",
    points: "0-999",
    icon: <Star className="h-5 w-5" />,
    benefits: ["Basic trading features", "Standard support"],
    color: "from-gray-700/30 to-gray-900/30",
    textColor: "text-gray-400",
  },
  {
    level: 2,
    name: "Explorer",
    points: "1,000-4,999",
    icon: <Zap className="h-5 w-5" />,
    benefits: ["Reduced trading fees (0.1%)", "Priority support"],
    color: "from-teal-700/30 to-teal-900/30",
    textColor: "text-teal-400",
  },
  {
    level: 3,
    name: "Pioneer",
    points: "5,000-19,999",
    icon: <Trophy className="h-5 w-5" />,
    benefits: ["Zero trading fees (first month)", "Exclusive NFT airdrop", "Early feature access"],
    color: "from-purple-700/30 to-purple-900/30",
    textColor: "text-purple-400",
  },
  {
    level: 4,
    name: "Cosmic",
    points: "20,000+",
    icon: <Gift className="h-5 w-5" />,
    benefits: ["Zero trading fees (permanent)", "VIP support", "Governance voting rights", "Exclusive events"],
    color: "from-amber-500/30 to-amber-700/30",
    textColor: "text-amber-400",
  },
]

export default function RewardsInfographic() {
  const [activeLevel, setActiveLevel] = useState(1)

  return (
    <div className="rounded-lg border border-gray-800 bg-black/40 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Coins className="mr-2 h-5 w-5 text-teal-500" />
          <h3 className="text-xl font-medium text-white">ACE Rewards Program</h3>
        </div>
        <p className="text-sm text-gray-400">Earn points with every trade</p>
      </div>

      <div className="mb-8">
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="h-0.5 w-full bg-gray-800"></div>
          </div>
          <div className="relative flex justify-between">
            {rewardLevels.map((level) => (
              <button
                key={level.level}
                onClick={() => setActiveLevel(level.level)}
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                  activeLevel === level.level ? "border-teal-500 bg-teal-900/50" : "border-gray-700 bg-gray-900"
                } text-xs font-medium ${activeLevel === level.level ? "text-teal-400" : "text-gray-400"}`}
              >
                {level.level}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>0 pts</span>
          <span>1,000 pts</span>
          <span>5,000 pts</span>
          <span>20,000 pts</span>
        </div>
      </div>

      <motion.div
        key={activeLevel}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`rounded-lg bg-gradient-to-br ${rewardLevels[activeLevel - 1].color} p-6`}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h4 className={`text-lg font-medium ${rewardLevels[activeLevel - 1].textColor}`}>
              {rewardLevels[activeLevel - 1].name} Level
            </h4>
            <p className="text-sm text-gray-400">{rewardLevels[activeLevel - 1].points} points</p>
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-black/30 ${rewardLevels[activeLevel - 1].textColor}`}
          >
            {rewardLevels[activeLevel - 1].icon}
          </div>
        </div>
        <div className="space-y-2">
          {rewardLevels[activeLevel - 1].benefits.map((benefit, index) => (
            <div key={index} className="flex items-center">
              <ChevronRight className="mr-2 h-4 w-4 text-teal-500" />
              <p className="text-sm text-gray-300">{benefit}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
