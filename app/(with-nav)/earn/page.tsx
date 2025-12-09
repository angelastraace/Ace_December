"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Wallet, Clock, TrendingUp, Zap, Info, ChevronRight, Gift, BarChart3, Landmark } from "lucide-react"
import { EarnStakingPools } from "@/components/earn/earn-staking-pools"
import { EarnLendingMarket } from "@/components/earn/earn-lending-market"
import { EarnDualInvestment } from "@/components/earn/earn-dual-investment"
import { EarnRewardHistory } from "@/components/earn/earn-reward-history"
import { EarnNftBooster } from "@/components/earn/earn-nft-booster"

export default function EarnDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for the dashboard
  const earnStats = {
    totalEarnings: 1245.78,
    pendingRewards: 32.45,
    totalStaked: 5000,
    totalLent: 2500,
    totalBorrowed: 1000,
    averageApy: 12.5,
    streakDays: 28,
    nftBoost: 2.5,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cosmic-background.png')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              ACE <span className="text-teal-400">Earn</span>
            </h1>
            <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
              Grow your crypto portfolio with staking, lending, and passive rewards
            </p>
          </div>

          {/* Stats Cards */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Earnings"
              value={`$${earnStats.totalEarnings.toLocaleString()}`}
              description="Lifetime earnings"
              icon={<TrendingUp className="h-5 w-5 text-teal-400" />}
            />
            <StatsCard
              title="Pending Rewards"
              value={`$${earnStats.pendingRewards.toLocaleString()}`}
              description="Ready to claim"
              icon={<Gift className="h-5 w-5 text-purple-400" />}
              action={
                <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-black">
                  Claim
                </Button>
              }
            />
            <StatsCard
              title="Average APY"
              value={`${earnStats.averageApy}%`}
              description="Across all products"
              icon={<BarChart3 className="h-5 w-5 text-teal-400" />}
            />
            <StatsCard
              title="Streak Bonus"
              value={`${earnStats.streakDays} Days`}
              description={`+${earnStats.nftBoost}% APY Boost`}
              icon={<Zap className="h-5 w-5 text-yellow-400" />}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto bg-gray-800/50 border border-gray-700">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="staking">Staking</TabsTrigger>
            <TabsTrigger value="lending">Lending</TabsTrigger>
            <TabsTrigger value="dual">Dual Invest</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Portfolio Distribution */}
              <Card className="col-span-1 md:col-span-2 bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle>Your Earn Portfolio</CardTitle>
                  <CardDescription>Distribution of your assets across earn products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Staking</span>
                        <span className="font-medium">${earnStats.totalStaked.toLocaleString()} (58.8%)</span>
                      </div>
                      <Progress value={58.8} className="h-2 bg-gray-700" indicatorClassName="bg-teal-500" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Lending</span>
                        <span className="font-medium">${earnStats.totalLent.toLocaleString()} (29.4%)</span>
                      </div>
                      <Progress value={29.4} className="h-2 bg-gray-700" indicatorClassName="bg-purple-500" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Dual Investment</span>
                        <span className="font-medium">$1,000 (11.8%)</span>
                      </div>
                      <Progress value={11.8} className="h-2 bg-gray-700" indicatorClassName="bg-blue-500" />
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-teal-900/50 flex items-center justify-center mr-3">
                            <Wallet className="h-4 w-4 text-teal-400" />
                          </div>
                          <span>Total Value</span>
                        </div>
                        <Info className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="mt-2 text-2xl font-bold">$8,500</div>
                      <div className="text-xs text-teal-400 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +12.5% this month
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center mr-3">
                            <Zap className="h-4 w-4 text-purple-400" />
                          </div>
                          <span>Monthly Yield</span>
                        </div>
                        <Info className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="mt-2 text-2xl font-bold">$106.25</div>
                      <div className="text-xs text-purple-400 flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        ~$3.54 daily
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                            <Landmark className="h-4 w-4 text-blue-400" />
                          </div>
                          <span>Net APY</span>
                        </div>
                        <Info className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="mt-2 text-2xl font-bold">15.0%</div>
                      <div className="text-xs text-blue-400 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +2.5% with NFT boost
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your earn portfolio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-between bg-teal-900/50 hover:bg-teal-800/50 text-white border border-teal-700/50">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-teal-900 flex items-center justify-center mr-3">
                        <Wallet className="h-4 w-4 text-teal-400" />
                      </div>
                      <span>Stake ACE</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  <Button className="w-full justify-between bg-purple-900/50 hover:bg-purple-800/50 text-white border border-purple-700/50">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center mr-3">
                        <Landmark className="h-4 w-4 text-purple-400" />
                      </div>
                      <span>Lend Assets</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  <Button className="w-full justify-between bg-blue-900/50 hover:bg-blue-800/50 text-white border border-blue-700/50">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center mr-3">
                        <TrendingUp className="h-4 w-4 text-blue-400" />
                      </div>
                      <span>Dual Investment</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  <Button className="w-full justify-between bg-amber-900/50 hover:bg-amber-800/50 text-white border border-amber-700/50">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-amber-900 flex items-center justify-center mr-3">
                        <Gift className="h-4 w-4 text-amber-400" />
                      </div>
                      <span>Claim Rewards</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/earn/nft-booster"
                    className="text-sm text-teal-400 hover:text-teal-300 w-full text-center"
                  >
                    Boost your APY with NFTs →
                  </Link>
                </CardFooter>
              </Card>
            </div>

            {/* Featured Products */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Featured Earn Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeaturedProductCard
                  title="ACE Flexible Staking"
                  description="Stake ACE tokens with no lock-up period"
                  apy="8.5%"
                  icon={<Image src="/images/ace-coin.png" alt="ACE" width={40} height={40} />}
                  color="teal"
                  link="/earn/staking"
                />

                <FeaturedProductCard
                  title="BTC-USDT Dual Investment"
                  description="High yield if BTC stays above $60,000"
                  apy="32.5%"
                  icon={
                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                      <span className="font-bold text-black">₿</span>
                    </div>
                  }
                  color="amber"
                  link="/earn/dual-investment"
                  badge="High Yield"
                />

                <FeaturedProductCard
                  title="ETH Lending Pool"
                  description="Lend your ETH and earn interest"
                  apy="5.2%"
                  icon={
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="font-bold text-black">Ξ</span>
                    </div>
                  }
                  color="blue"
                  link="/earn/lending"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="staking" className="mt-8">
            <EarnStakingPools />
          </TabsContent>

          <TabsContent value="lending" className="mt-8">
            <EarnLendingMarket />
          </TabsContent>

          <TabsContent value="dual" className="mt-8">
            <EarnDualInvestment />
          </TabsContent>

          <TabsContent value="rewards" className="mt-8">
            <EarnRewardHistory />
          </TabsContent>
        </Tabs>

        {/* NFT Booster Banner */}
        <div className="mt-12">
          <EarnNftBooster />
        </div>
      </div>
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  action?: React.ReactNode
}

function StatsCard({ title, value, description, icon, action }: StatsCardProps) {
  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <div className="flex items-center justify-between mt-1">
          <CardDescription className="text-gray-400">{description}</CardDescription>
          {action}
        </div>
      </CardContent>
    </Card>
  )
}

interface FeaturedProductCardProps {
  title: string
  description: string
  apy: string
  icon: React.ReactNode
  color: "teal" | "amber" | "blue" | "purple"
  link: string
  badge?: string
}

function FeaturedProductCard({ title, description, apy, icon, color, link, badge }: FeaturedProductCardProps) {
  const colorClasses = {
    teal: "bg-teal-900/30 border-teal-700/50 hover:bg-teal-900/50",
    amber: "bg-amber-900/30 border-amber-700/50 hover:bg-amber-900/50",
    blue: "bg-blue-900/30 border-blue-700/50 hover:bg-blue-900/50",
    purple: "bg-purple-900/30 border-purple-700/50 hover:bg-purple-900/50",
  }

  const badgeColors = {
    teal: "bg-teal-900/50 text-teal-400 border-teal-700",
    amber: "bg-amber-900/50 text-amber-400 border-amber-700",
    blue: "bg-blue-900/50 text-blue-400 border-blue-700",
    purple: "bg-purple-900/50 text-purple-400 border-purple-700",
  }

  return (
    <Link href={link}>
      <Card className={`border ${colorClasses[color]} transition-colors duration-200`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              {icon}
              <CardTitle className="ml-3 text-lg font-medium">{title}</CardTitle>
            </div>
            {badge && (
              <Badge variant="outline" className={badgeColors[color]}>
                {badge}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-400 mb-2">{description}</CardDescription>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">APY</div>
              <div className="text-2xl font-bold">{apy}</div>
            </div>
            <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-800">
              Get Started
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
