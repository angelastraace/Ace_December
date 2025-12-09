"use client"

import { useState, useEffect } from "react"
import { LineChart, BarChart, PieChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function LiveMetricsDashboard() {
  const [activeUsers, setActiveUsers] = useState(1243)
  const [transactions, setTransactions] = useState(8765)
  const [systemLoad, setSystemLoad] = useState(42)

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers((prev) => Math.max(1000, prev + Math.floor(Math.random() * 21) - 10))
      setTransactions((prev) => prev + Math.floor(Math.random() * 5))
      setSystemLoad((prev) => Math.min(95, Math.max(5, prev + Math.floor(Math.random() * 7) - 3)))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-purple-500/20 bg-black/40 backdrop-blur-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white">Live Metrics Dashboard</CardTitle>
            <CardDescription className="text-gray-400">Real-time platform analytics</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
          >
            Export Data
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="users">
          <TabsList className="grid w-full grid-cols-3 bg-black/30">
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              <LineChart className="mr-2 h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              <BarChart className="mr-2 h-4 w-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              <PieChart className="mr-2 h-4 w-4" />
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-4 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-black/30 p-3">
                <div className="text-sm text-gray-400">Active Users</div>
                <div className="text-2xl font-bold text-white">{activeUsers.toLocaleString()}</div>
                <div className="text-xs text-green-400">+2.4% from last hour</div>
              </div>
              <div className="rounded-lg bg-black/30 p-3">
                <div className="text-sm text-gray-400">New Signups</div>
                <div className="text-2xl font-bold text-white">87</div>
                <div className="text-xs text-green-400">+12% from yesterday</div>
              </div>
              <div className="rounded-lg bg-black/30 p-3">
                <div className="text-sm text-gray-400">Retention Rate</div>
                <div className="text-2xl font-bold text-white">94.2%</div>
                <div className="text-xs text-green-400">+0.8% from last week</div>
              </div>
            </div>

            <div className="h-[200px] rounded-lg bg-black/30 p-3">
              <div className="mb-2 text-sm text-gray-400">User Activity (24h)</div>
              <div className="flex h-[150px] items-end space-x-2">
                {Array.from({ length: 24 }).map((_, i) => {
                  const height = 30 + Math.random() * 70
                  return <div key={i} className="flex-1 rounded-t bg-purple-500/60" style={{ height: `${height}%` }} />
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="mt-4 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-black/30 p-3">
                <div className="text-sm text-gray-400">Total Transactions</div>
                <div className="text-2xl font-bold text-white">{transactions.toLocaleString()}</div>
                <div className="text-xs text-green-400">+5.7% from yesterday</div>
              </div>
              <div className="rounded-lg bg-black/30 p-3">
                <div className="text-sm text-gray-400">Average Value</div>
                <div className="text-2xl font-bold text-white">$1,243</div>
                <div className="text-xs text-red-400">-2.1% from last week</div>
              </div>
              <div className="rounded-lg bg-black/30 p-3">
                <div className="text-sm text-gray-400">Success Rate</div>
                <div className="text-2xl font-bold text-white">99.8%</div>
                <div className="text-xs text-green-400">+0.1% from last month</div>
              </div>
            </div>

            <div className="h-[200px] rounded-lg bg-black/30 p-3">
              <div className="mb-2 text-sm text-gray-400">Transaction Volume (24h)</div>
              <div className="flex h-[150px] items-end space-x-2">
                {Array.from({ length: 24 }).map((_, i) => {
                  const height = 20 + Math.random() * 80
                  return <div key={i} className="flex-1 rounded-t bg-blue-500/60" style={{ height: `${height}%` }} />
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="system" className="mt-4 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-black/30 p-3">
                <div className="text-sm text-gray-400">System Load</div>
                <div className="text-2xl font-bold text-white">{systemLoad}%</div>
                <div className="text-xs text-green-400">Healthy</div>
              </div>
              <div className="rounded-lg bg-black/30 p-3">
                <div className="text-sm text-gray-400">Response Time</div>
                <div className="text-2xl font-bold text-white">124ms</div>
                <div className="text-xs text-green-400">-5ms from average</div>
              </div>
              <div className="rounded-lg bg-black/30 p-3">
                <div className="text-sm text-gray-400">Error Rate</div>
                <div className="text-2xl font-bold text-white">0.03%</div>
                <div className="text-xs text-green-400">Below threshold</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-black/30 p-3">
                <div className="mb-2 text-sm text-gray-400">CPU Usage</div>
                <div className="h-4 overflow-hidden rounded-full bg-black/50">
                  <div className="h-full rounded-full bg-green-500" style={{ width: `${systemLoad}%` }} />
                </div>
                <div className="mt-1 text-xs text-gray-400 text-right">{systemLoad}%</div>
              </div>
              <div className="rounded-lg bg-black/30 p-3">
                <div className="mb-2 text-sm text-gray-400">Memory Usage</div>
                <div className="h-4 overflow-hidden rounded-full bg-black/50">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${systemLoad + 15}%` }} />
                </div>
                <div className="mt-1 text-xs text-gray-400 text-right">{systemLoad + 15}%</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
