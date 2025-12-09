"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Transaction {
  id: string
  type: "deposit" | "withdrawal" | "trade"
  asset: string
  amount: number
  status: "completed" | "pending" | "failed"
  date: string
  time: string
}

export function RecentTransactions() {
  const transactions: Transaction[] = [
    {
      id: "TX78945612",
      type: "deposit",
      asset: "BTC",
      amount: 0.05,
      status: "completed",
      date: "Today",
      time: "14:32",
    },
    {
      id: "TX78945613",
      type: "trade",
      asset: "ETH/BTC",
      amount: 1.2,
      status: "completed",
      date: "Today",
      time: "12:18",
    },
    {
      id: "TX78945614",
      type: "withdrawal",
      asset: "USDT",
      amount: 500,
      status: "pending",
      date: "Today",
      time: "10:45",
    },
    {
      id: "TX78945615",
      type: "deposit",
      asset: "ACE",
      amount: 250,
      status: "completed",
      date: "Yesterday",
      time: "18:22",
    },
    {
      id: "TX78945616",
      type: "trade",
      asset: "BTC/USDT",
      amount: 0.02,
      status: "completed",
      date: "Yesterday",
      time: "15:30",
    },
    {
      id: "TX78945617",
      type: "withdrawal",
      asset: "ETH",
      amount: 0.5,
      status: "failed",
      date: "Yesterday",
      time: "09:15",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-green-400" />
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-red-400" />
      case "trade":
        return <RefreshCw className="h-4 w-4 text-blue-400" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <Card className="bg-black/40 backdrop-blur-md border-purple-500/20 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/5 pointer-events-none" />
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="h-5 w-5 text-purple-400" />
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px] pr-4">
          <div className="space-y-3">
            {transactions.map((tx, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                      {getTypeIcon(tx.type)}
                    </div>
                    <div>
                      <p className="font-medium text-white capitalize">{tx.type}</p>
                      <p className="text-xs text-gray-400">
                        {tx.date} at {tx.time}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${getStatusColor(tx.status)} capitalize`}>
                    {tx.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <p className="text-gray-400">
                    <span className="text-xs">ID: </span>
                    {tx.id}
                  </p>
                  <p className="font-medium text-white">
                    {tx.type === "withdrawal" ? "-" : tx.type === "deposit" ? "+" : ""}
                    {tx.amount} {tx.asset}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
