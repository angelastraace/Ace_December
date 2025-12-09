"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, RefreshCw, Plus, Wallet } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface WalletBalance {
  currency: string
  symbol: string
  balance: number
  value: number
  change: number
  color: string
}

export function WalletSummary() {
  const [walletData, setWalletData] = useState<WalletBalance[]>([
    {
      currency: "Bitcoin",
      symbol: "BTC",
      balance: 0.42,
      value: 16420,
      change: 2.4,
      color: "from-orange-500 to-yellow-500",
    },
    {
      currency: "Ethereum",
      symbol: "ETH",
      balance: 3.8,
      value: 7650,
      change: -1.2,
      color: "from-blue-400 to-indigo-600",
    },
    {
      currency: "ACE Token",
      symbol: "ACE",
      balance: 2450,
      value: 3675,
      change: 5.7,
      color: "from-purple-500 to-blue-600",
    },
    {
      currency: "USD Coin",
      symbol: "USDC",
      balance: 1250,
      value: 1250,
      change: 0,
      color: "from-blue-500 to-cyan-400",
    },
  ])

  const totalValue = walletData.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="bg-black/40 backdrop-blur-md border-purple-500/20 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/5 pointer-events-none" />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Wallet className="h-5 w-5 text-purple-400" />
            Wallet Summary
          </CardTitle>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-400">Total Balance</p>
            <p className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
            >
              <ArrowDownLeft className="h-4 w-4 mr-1" /> Deposit
            </Button>
            <Button size="sm" variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20">
              <ArrowUpRight className="h-4 w-4 mr-1" /> Withdraw
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {walletData.map((wallet, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-3">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-8 w-8 rounded-full bg-gradient-to-r ${wallet.color} flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {wallet.symbol}
                  </div>
                  <div>
                    <p className="font-medium text-white">{wallet.currency}</p>
                    <p className="text-sm text-gray-400">
                      {wallet.balance} {wallet.symbol}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">${wallet.value.toLocaleString()}</p>
                  <p
                    className={`text-sm ${wallet.change > 0 ? "text-green-400" : wallet.change < 0 ? "text-red-400" : "text-gray-400"}`}
                  >
                    {wallet.change > 0 ? "+" : ""}
                    {wallet.change}%
                  </p>
                </div>
              </div>
              <Progress value={(wallet.value / totalValue) * 100} className="h-1.5 bg-white/10" />
            </div>
          ))}

          <Button
            variant="ghost"
            className="w-full border border-dashed border-gray-700 text-gray-400 hover:text-white hover:bg-white/5 mt-2"
          >
            <Plus className="h-4 w-4 mr-2" /> Add New Asset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
