import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, TrendingUp, ArrowRight } from "lucide-react"

export default function DaoVaultStatus() {
  // Mock data for the vault status
  const vaultData = {
    totalValue: 42568921,
    changePercent: 3.2,
    allocation: [
      { name: "Treasury", percent: 45, color: "bg-teal-500" },
      { name: "Development", percent: 25, color: "bg-blue-500" },
      { name: "Marketing", percent: 15, color: "bg-purple-500" },
      { name: "Community", percent: 10, color: "bg-amber-500" },
      { name: "Reserves", percent: 5, color: "bg-red-500" },
    ],
    recentTransactions: [
      { id: 1, type: "Deposit", amount: 250000, token: "ACE", date: "2 days ago" },
      { id: 2, type: "Withdrawal", amount: 50000, token: "USDC", date: "5 days ago" },
      { id: 3, type: "Swap", amount: 100000, token: "ETH → ACE", date: "1 week ago" },
    ],
  }

  return (
    <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-white">DAO Treasury Vault</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">The DAO Treasury Vault holds all assets controlled by governance.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>Current allocation and recent activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-400">Total Value</p>
            <p className="text-3xl font-bold text-white">${vaultData.totalValue.toLocaleString()}</p>
          </div>
          <div className="flex items-center text-teal-400">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span className="text-sm font-medium">+{vaultData.changePercent}%</span>
          </div>
        </div>

        <div className="mb-6 space-y-3">
          {vaultData.allocation.map((item) => (
            <div key={item.name}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-gray-400">{item.name}</span>
                <span className="text-white">{item.percent}%</span>
              </div>
              <Progress value={item.percent} className="h-2 bg-gray-800" indicatorClassName={item.color} />
            </div>
          ))}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-400">Recent Transactions</h4>
            <button className="flex items-center text-xs text-teal-400 hover:text-teal-300">
              View All <ArrowRight className="ml-1 h-3 w-3" />
            </button>
          </div>
          <div className="space-y-2">
            {vaultData.recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between rounded-md bg-gray-800/50 p-2 text-sm">
                <div className="flex items-center">
                  <div
                    className={`mr-2 h-2 w-2 rounded-full ${tx.type === "Deposit" ? "bg-green-500" : tx.type === "Withdrawal" ? "bg-red-500" : "bg-blue-500"}`}
                  ></div>
                  <span className="text-gray-300">{tx.type}</span>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">
                    {tx.amount.toLocaleString()} {tx.token}
                  </p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
