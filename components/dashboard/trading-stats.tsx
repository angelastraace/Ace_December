"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart3 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tradingData = [
  { name: "Mon", volume: 4000, orders: 12 },
  { name: "Tue", volume: 3000, orders: 8 },
  { name: "Wed", volume: 2000, orders: 5 },
  { name: "Thu", volume: 2780, orders: 7 },
  { name: "Fri", volume: 1890, orders: 4 },
  { name: "Sat", volume: 2390, orders: 6 },
  { name: "Sun", volume: 3490, orders: 9 },
]

const profitData = [
  { name: "Mon", profit: 400 },
  { name: "Tue", profit: -200 },
  { name: "Wed", profit: 300 },
  { name: "Thu", profit: 278 },
  { name: "Fri", profit: -189 },
  { name: "Sat", profit: 239 },
  { name: "Sun", profit: 349 },
]

export function TradingStats() {
  return (
    <Card className="bg-black/40 backdrop-blur-md border-purple-500/20 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/5 pointer-events-none" />
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-400" />
          Trading Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="volume" className="w-full">
          <TabsList className="grid grid-cols-3 bg-black/20">
            <TabsTrigger value="volume">Volume</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="profit">P&L</TabsTrigger>
          </TabsList>

          <TabsContent value="volume" className="mt-4">
            <div className="h-[240px] w-full">
              <ChartContainer
                config={{
                  volume: {
                    label: "Trading Volume",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tradingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="volume" fill="url(#colorVolume)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="flex justify-between items-center mt-4 text-sm">
              <div className="bg-white/5 rounded-lg p-3 flex-1 mr-2">
                <p className="text-gray-400">24h Volume</p>
                <p className="text-xl font-semibold text-white">$24,890</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 flex-1 ml-2">
                <p className="text-gray-400">7d Change</p>
                <p className="text-xl font-semibold text-green-400">+12.4%</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-4">
            <div className="h-[240px] w-full">
              <ChartContainer
                config={{
                  orders: {
                    label: "Orders",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tradingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="orders" fill="url(#colorOrders)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#4ade80" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="flex justify-between items-center mt-4 text-sm">
              <div className="bg-white/5 rounded-lg p-3 flex-1 mr-2">
                <p className="text-gray-400">Open Orders</p>
                <p className="text-xl font-semibold text-white">8</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 flex-1 ml-2">
                <p className="text-gray-400">Completed</p>
                <p className="text-xl font-semibold text-white">51</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profit" className="mt-4">
            <div className="h-[240px] w-full">
              <ChartContainer
                config={{
                  profit: {
                    label: "Profit/Loss",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={profitData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#f43f5e"
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="flex justify-between items-center mt-4 text-sm">
              <div className="bg-white/5 rounded-lg p-3 flex-1 mr-2">
                <p className="text-gray-400">Total P&L</p>
                <p className="text-xl font-semibold text-green-400">+$1,178</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 flex-1 ml-2">
                <p className="text-gray-400">Win Rate</p>
                <p className="text-xl font-semibold text-white">68%</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
