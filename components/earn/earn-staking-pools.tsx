"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Lock, ChevronDown, ChevronUp } from "lucide-react"

export function EarnStakingPools() {
  const [expandedPool, setExpandedPool] = useState<number | null>(null)

  // Mock data for staking pools
  const stakingPools = [
    {
      id: 1,
      name: "ACE Flexible Staking",
      description: "Stake ACE tokens with no lock-up period",
      apy: 8.5,
      totalStaked: 2500000,
      minStake: 100,
      lockupPeriod: 0,
      userStaked: 2500,
      rewards: 212.5,
      tokenSymbol: "ACE",
      tokenLogo: "/ace-coin.png",
    },
    {
      id: 2,
      name: "ACE 30-Day Staking",
      description: "Stake ACE tokens for 30 days",
      apy: 12.5,
      totalStaked: 5000000,
      minStake: 500,
      lockupPeriod: 30,
      userStaked: 1500,
      rewards: 187.5,
      tokenSymbol: "ACE",
      tokenLogo: "/ace-coin.png",
    },
    {
      id: 3,
      name: "ACE 90-Day Staking",
      description: "Stake ACE tokens for 90 days",
      apy: 18.0,
      totalStaked: 10000000,
      minStake: 1000,
      lockupPeriod: 90,
      userStaked: 1000,
      rewards: 180.0,
      tokenSymbol: "ACE",
      tokenLogo: "/ace-coin.png",
    },
    {
      id: 4,
      name: "ETH Staking",
      description: "Stake ETH and earn rewards",
      apy: 5.0,
      totalStaked: 15000,
      minStake: 0.1,
      lockupPeriod: 0,
      userStaked: 0,
      rewards: 0,
      tokenSymbol: "ETH",
      tokenLogo: "/eth-logo.png",
    },
  ]

  const togglePoolExpand = (poolId: number) => {
    if (expandedPool === poolId) {
      setExpandedPool(null)
    } else {
      setExpandedPool(poolId)
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Staking Pools</h2>
          <p className="text-gray-400 mt-1">Stake your assets and earn passive rewards</p>
        </div>
        <Tabs defaultValue="all" className="w-full md:w-auto mt-4 md:mt-0">
          <TabsList className="bg-gray-800/50 border border-gray-700">
            <TabsTrigger value="all">All Pools</TabsTrigger>
            <TabsTrigger value="my">My Stakes</TabsTrigger>
            <TabsTrigger value="ace">ACE Pools</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        {stakingPools.map((pool) => (
          <Card key={pool.id} className="bg-gray-900/50 border-gray-700">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                    {pool.tokenLogo ? (
                      <img src={pool.tokenLogo || "/placeholder.svg"} alt={pool.tokenSymbol} className="w-6 h-6" />
                    ) : (
                      <Wallet className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-medium">{pool.name}</CardTitle>
                    <CardDescription className="text-gray-400">{pool.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {pool.lockupPeriod > 0 ? (
                    <Badge variant="outline" className="bg-amber-900/50 text-amber-400 border-amber-700">
                      <Lock className="h-3 w-3 mr-1" /> {pool.lockupPeriod} Days
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-900/50 text-green-400 border-green-700">
                      Flexible
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" className="text-gray-400" onClick={() => togglePoolExpand(pool.id)}>
                    {expandedPool === pool.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-400">APY</div>
                  <div className="text-2xl font-bold text-white">{pool.apy}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Total Staked</div>
                  <div className="text-lg font-medium text-white">
                    {pool.totalStaked.toLocaleString()} {pool.tokenSymbol}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Min Stake</div>
                  <div className="text-lg font-medium text-white">
                    {pool.minStake} {pool.tokenSymbol}
                  </div>
                </div>
                <div className="flex items-end">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">Stake Now</Button>
                </div>
              </div>

              {expandedPool === pool.id && (
                <div className="mt-6 border-t border-gray-800 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium mb-4">Your Stake</h4>
                      {pool.userStaked > 0 ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-400">Staked Amount</div>
                            <div className="font-medium">
                              {pool.userStaked.toLocaleString()} {pool.tokenSymbol}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-400">Earned Rewards</div>
                            <div className="font-medium text-teal-400">
                              {pool.rewards.toLocaleString()} {pool.tokenSymbol}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-400">Daily Earnings</div>
                            <div className="font-medium">
                              ~{((pool.userStaked * pool.apy) / 365).toFixed(2)} {pool.tokenSymbol}
                            </div>
                          </div>

                          <div className="flex space-x-2 mt-4">
                            <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">Claim Rewards</Button>
                            <Button variant="outline" className="flex-1 border-gray-700 text-gray-300">
                              Unstake
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                          <p className="text-gray-400 mb-2">You haven't staked in this pool yet</p>
                          <Button className="bg-teal-600 hover:bg-teal-700 text-white">Stake Now</Button>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-4">Stake More</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <label className="text-sm text-gray-400">Amount to Stake</label>
                            <span className="text-sm text-gray-400">Balance: 5,000 {pool.tokenSymbol}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Input
                              type="number"
                              placeholder="0.00"
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                            <Button variant="outline" className="border-gray-700 text-gray-300">
                              Max
                            </Button>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-400">Estimated APY</span>
                            <span className="text-sm font-medium">{pool.apy}%</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-400">Lock Period</span>
                            <span className="text-sm font-medium">
                              {pool.lockupPeriod > 0 ? `${pool.lockupPeriod} Days` : "No Lock"}
                            </span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-400">Early Unstake Fee</span>
                            <span className="text-sm font-medium">{pool.lockupPeriod > 0 ? "5%" : "None"}</span>
                          </div>
                        </div>

                        <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">Stake</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
