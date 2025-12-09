"use client"

import { useState } from "react"
import { Wallet, ArrowUpRight, Download, RefreshCw, PieChart, BarChart3, TrendingUp, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TreasuryDashboard() {
  const [timeframe, setTimeframe] = useState("30d")

  return (
    <Card className="border-purple-500/20 bg-black/40 backdrop-blur-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white">Treasury Dashboard</CardTitle>
            <CardDescription className="text-gray-400">Monitor and manage platform treasury assets</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-gray-800 bg-black/30 text-gray-400 hover:bg-black/50">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" className="border-gray-800 bg-black/30 text-gray-400 hover:bg-black/50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-gray-800 bg-black/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-blue-500/20 p-2">
                  <Wallet className="h-5 w-5 text-blue-400" />
                </div>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="h-7 w-[70px] border-gray-800 bg-black/30 text-xs text-gray-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 text-gray-200">
                    <SelectItem value="7d">7d</SelectItem>
                    <SelectItem value="30d">30d</SelectItem>
                    <SelectItem value="90d">90d</SelectItem>
                    <SelectItem value="1y">1y</SelectItem>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-400">Total Treasury Value</p>
                <h3 className="text-2xl font-bold text-white">$24,856,432</h3>
                <div className="mt-1 flex items-center text-xs text-green-400">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>+5.2% from last month</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-black/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-green-500/20 p-2">
                  <PieChart className="h-5 w-5 text-green-400" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-400">ACE Token Reserve</p>
                <h3 className="text-2xl font-bold text-white">12.4M ACE</h3>
                <div className="mt-1 flex items-center text-xs text-green-400">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>+2.8% from last month</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-black/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-purple-500/20 p-2">
                  <BarChart3 className="h-5 w-5 text-purple-400" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-400">Monthly Revenue</p>
                <h3 className="text-2xl font-bold text-white">$1,245,632</h3>
                <div className="mt-1 flex items-center text-xs text-red-400">
                  <ArrowUpRight className="mr-1 h-3 w-3 rotate-180 transform" />
                  <span>-1.3% from last month</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-black/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-orange-500/20 p-2">
                  <Shield className="h-5 w-5 text-orange-400" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-400">Insurance Fund</p>
                <h3 className="text-2xl font-bold text-white">$5,432,100</h3>
                <div className="mt-1 flex items-center text-xs text-green-400">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>+3.7% from last month</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="assets" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/30">
            <TabsTrigger value="assets" className="data-[state=active]:bg-purple-900/20">
              Asset Allocation
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-purple-900/20">
              Recent Transactions
            </TabsTrigger>
            <TabsTrigger value="projections" className="data-[state=active]:bg-purple-900/20">
              Financial Projections
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="mt-4">
            <Card className="border-gray-800 bg-black/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">Asset Distribution</CardTitle>
                <CardDescription className="text-gray-400">Current allocation of treasury assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full rounded-md border border-gray-800 bg-black/50 p-4">
                  <div className="flex h-full items-center justify-center">
                    <p className="text-gray-400">Asset allocation chart would render here</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { name: "ACE Token", value: "45%", color: "bg-purple-500" },
                    { name: "Stablecoins", value: "30%", color: "bg-blue-500" },
                    { name: "BTC/ETH", value: "15%", color: "bg-green-500" },
                    { name: "Other Assets", value: "10%", color: "bg-orange-500" },
                  ].map((asset) => (
                    <div key={asset.name} className="flex items-center space-x-2">
                      <div className={`h-3 w-3 rounded-full ${asset.color}`} />
                      <div>
                        <p className="text-sm font-medium text-white">{asset.name}</p>
                        <p className="text-xs text-gray-400">{asset.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="mt-4">
            <Card className="border-gray-800 bg-black/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">Recent Treasury Transactions</CardTitle>
                <CardDescription className="text-gray-400">Last 10 significant treasury movements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-800 bg-black/50">
                  <div className="p-4">
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between border-b border-gray-800 pb-2 last:border-0"
                        >
                          <div>
                            <p className="text-sm font-medium text-white">Treasury Rebalance</p>
                            <p className="text-xs text-gray-400">
                              May {10 + i}, 2025 • TX: 0x3f5e...{i}a2b
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-medium ${i % 2 === 0 ? "text-green-400" : "text-red-400"}`}>
                              {i % 2 === 0 ? "+" : "-"}${(Math.random() * 100000).toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-400">{i % 2 === 0 ? "Deposit" : "Withdrawal"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projections" className="mt-4">
            <Card className="border-gray-800 bg-black/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">Financial Projections</CardTitle>
                <CardDescription className="text-gray-400">6-month treasury growth forecast</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full rounded-md border border-gray-800 bg-black/50 p-4">
                  <div className="flex h-full items-center justify-center">
                    <p className="text-gray-400">Projection chart would render here</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Card className="border-gray-800 bg-black/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">Conservative</p>
                        <TrendingUp className="h-4 w-4 text-blue-400" />
                      </div>
                      <p className="mt-2 text-xl font-bold text-white">$28.2M</p>
                      <p className="text-xs text-gray-400">+13.5% growth</p>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-800 bg-black/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">Moderate</p>
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      </div>
                      <p className="mt-2 text-xl font-bold text-white">$32.7M</p>
                      <p className="text-xs text-gray-400">+31.6% growth</p>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-800 bg-black/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">Aggressive</p>
                        <TrendingUp className="h-4 w-4 text-purple-400" />
                      </div>
                      <p className="mt-2 text-xl font-bold text-white">$38.1M</p>
                      <p className="text-xs text-gray-400">+53.3% growth</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
