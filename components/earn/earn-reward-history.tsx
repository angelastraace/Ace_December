"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Wallet, Gift, TrendingUp, Clock, ChevronRight, Download, Filter, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EarnRewardHistory() {
  const [filter, setFilter] = useState("all")

  // Mock data for reward history
  const rewardHistory = [
    {
      id: 1,
      date: "2023-06-01T10:30:00Z",
      type: "staking",
      asset: "ACE",
      amount: 125.5,
      status: "claimed",
      txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    },
    {
      id: 2,
      date: "2023-05-25T14:15:00Z",
      type: "lending",
      asset: "USDT",
      amount: 50.25,
      status: "claimed",
      txHash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a",
    },
    {
      id: 3,
      date: "2023-05-20T09:45:00Z",
      type: "dual",
      asset: "BTC",
      amount: 0.0025,
      status: "claimed",
      txHash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b",
    },
    {
      id: 4,
      date: "2023-05-15T16:20:00Z",
      type: "referral",
      asset: "ACE",
      amount: 75,
      status: "claimed",
      txHash: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c",
    },
    {
      id: 5,
      date: "2023-05-10T11:30:00Z",
      type: "staking",
      asset: "ACE",
      amount: 120.75,
      status: "claimed",
      txHash: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d",
    },
    {
      id: 6,
      date: "2023-05-05T08:15:00Z",
      type: "lending",
      asset: "ETH",
      amount: 0.05,
      status: "claimed",
      txHash: "0x6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d5e",
    },
    {
      id: 7,
      date: "2023-05-01T13:45:00Z",
      type: "dual",
      asset: "USDT",
      amount: 125.5,
      status: "claimed",
      txHash: "0x7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d5e6f",
    },
  ]

  // Filter rewards based on selected filter
  const filteredRewards = filter === "all" ? rewardHistory : rewardHistory.filter((reward) => reward.type === filter)

  // Get reward type badge
  const getRewardTypeBadge = (type: string) => {
    switch (type) {
      case "staking":
        return (
          <Badge variant="outline" className="bg-teal-900/50 text-teal-400 border-teal-700">
            <Wallet className="h-3 w-3 mr-1" /> Staking
          </Badge>
        )
      case "lending":
        return (
          <Badge variant="outline" className="bg-purple-900/50 text-purple-400 border-purple-700">
            <TrendingUp className="h-3 w-3 mr-1" /> Lending
          </Badge>
        )
      case "dual":
        return (
          <Badge variant="outline" className="bg-blue-900/50 text-blue-400 border-blue-700">
            <Clock className="h-3 w-3 mr-1" /> Dual Investment
          </Badge>
        )
      case "referral":
        return (
          <Badge variant="outline" className="bg-amber-900/50 text-amber-400 border-amber-700">
            <Gift className="h-3 w-3 mr-1" /> Referral
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-900/50 text-gray-400 border-gray-700">
            Other
          </Badge>
        )
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Reward History</h2>
          <p className="text-gray-400 mt-1">Track all your earned rewards across products</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,245.78</div>
            <div className="text-xs text-teal-400 mt-1">+12.5% this month</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Staking Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$725.50</div>
            <div className="text-xs text-teal-400 mt-1">246.25 ACE</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Lending Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$320.28</div>
            <div className="text-xs text-teal-400 mt-1">Multiple assets</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Other Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$200.00</div>
            <div className="text-xs text-teal-400 mt-1">Referrals & Dual Investment</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search */}
      <Card className="bg-gray-900/50 border-gray-700 mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search by asset or transaction"
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="all">All Rewards</SelectItem>
                  <SelectItem value="staking">Staking</SelectItem>
                  <SelectItem value="lending">Lending</SelectItem>
                  <SelectItem value="dual">Dual Investment</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Select defaultValue="30">
                <SelectTrigger className="w-[150px] bg-gray-800 border-gray-700 text-white">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reward History Table */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle>Reward History</CardTitle>
          <CardDescription className="text-gray-400">Showing {filteredRewards.length} rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400">Date</TableHead>
                <TableHead className="text-gray-400">Type</TableHead>
                <TableHead className="text-gray-400">Asset</TableHead>
                <TableHead className="text-gray-400 text-right">Amount</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRewards.map((reward) => (
                <TableRow key={reward.id} className="border-gray-800">
                  <TableCell>
                    {new Date(reward.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    <div className="text-xs text-gray-500">
                      {new Date(reward.date).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </TableCell>
                  <TableCell>{getRewardTypeBadge(reward.type)}</TableCell>
                  <TableCell className="font-medium">{reward.asset}</TableCell>
                  <TableCell className="text-right font-medium">{reward.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-900/50 text-green-400 border-green-700">Claimed</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredRewards.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-gray-400">No rewards found for the selected filter.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
