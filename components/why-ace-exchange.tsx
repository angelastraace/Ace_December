"use client"

import { Shield, Zap, Award, Users, BarChart, Coins } from "lucide-react"

const features = [
  {
    icon: <Shield className="h-8 w-8 text-teal-500" />,
    title: "Enterprise-Grade Security",
    description:
      "Multi-layer security architecture with cold storage, regular audits, and comprehensive insurance coverage.",
  },
  {
    icon: <Zap className="h-8 w-8 text-teal-500" />,
    title: "Lightning-Fast Execution",
    description:
      "Advanced matching engine capable of processing over 100,000 transactions per second with minimal latency.",
  },
  {
    icon: <Award className="h-8 w-8 text-teal-500" />,
    title: "Lowest Fees in the Industry",
    description:
      "Transparent fee structure with zero fees for early adopters and volume-based discounts for all users.",
  },
  {
    icon: <Users className="h-8 w-8 text-teal-500" />,
    title: "Community-Driven Development",
    description:
      "Governance system that allows users to vote on new features, token listings, and platform improvements.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-teal-500" />,
    title: "Advanced Trading Tools",
    description:
      "Professional-grade charting, technical indicators, and AI-powered market insights for traders of all levels.",
  },
  {
    icon: <Coins className="h-8 w-8 text-teal-500" />,
    title: "Comprehensive Token Support",
    description:
      "Support for all major cryptocurrencies and regular additions of promising new tokens after security review.",
  },
]

export default function WhyAceExchange() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <div
          key={index}
          className="group rounded-lg border border-gray-800 bg-black/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-teal-900 hover:bg-gradient-to-br hover:from-teal-900/20 hover:to-black/40"
        >
          <div className="mb-4 rounded-full bg-gray-900/50 p-3 transition-colors group-hover:bg-teal-900/30">
            {feature.icon}
          </div>
          <h3 className="mb-2 text-xl font-medium text-white">{feature.title}</h3>
          <p className="text-gray-400">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}
