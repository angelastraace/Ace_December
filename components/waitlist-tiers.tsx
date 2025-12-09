"use client"

import { Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tiers = [
  {
    name: "Bronze",
    referrals: "0-2",
    color: "from-amber-700/20 to-amber-900/20",
    borderColor: "border-amber-800/30",
    textColor: "text-amber-500",
    features: [
      "Early access to platform",
      "Basic trading features",
      "Standard customer support",
      "Regular account limits",
    ],
  },
  {
    name: "Silver",
    referrals: "3-9",
    color: "from-gray-400/20 to-gray-600/20",
    borderColor: "border-gray-500/30",
    textColor: "text-gray-400",
    features: [
      "All Bronze features",
      "Priority access (48 hours earlier)",
      "Reduced trading fees (0.1%)",
      "Higher withdrawal limits",
      "Priority customer support",
    ],
  },
  {
    name: "Gold",
    referrals: "10+",
    color: "from-yellow-500/20 to-amber-600/20",
    borderColor: "border-yellow-600/30",
    textColor: "text-yellow-500",
    features: [
      "All Silver features",
      "VIP access (1 week earlier)",
      "Zero trading fees (first month)",
      "Exclusive NFT airdrop",
      "VIP customer support",
      "Invitation to launch event",
      "Special profile badge",
    ],
    popular: true,
  },
]

export default function WaitlistTiers() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {tiers.map((tier) => (
        <Card
          key={tier.name}
          className={`relative overflow-hidden border ${tier.borderColor} bg-gradient-to-br ${tier.color} backdrop-blur-sm transition-transform hover:scale-105`}
        >
          {tier.popular && (
            <div className="absolute -right-12 top-6 rotate-45 bg-teal-500 px-12 py-1 text-xs font-medium text-black">
              MOST POPULAR
            </div>
          )}
          <CardHeader className="pb-4">
            <CardTitle className={`text-center text-2xl font-bold ${tier.textColor}`}>{tier.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-400">Required Referrals</p>
              <p className="text-3xl font-bold text-white">{tier.referrals}</p>
            </div>
            <ul className="space-y-2">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-teal-500" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
