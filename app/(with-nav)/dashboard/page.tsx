import { UserOverview } from "@/components/dashboard/user-overview"
import { WalletSummary } from "@/components/dashboard/wallet-summary"
import { TradingStats } from "@/components/dashboard/trading-stats"
import { MarketWatchlist } from "@/components/dashboard/market-watchlist"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { Notifications } from "@/components/dashboard/notifications"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
        Dashboard
      </h1>

      <UserOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WalletSummary />
        <TradingStats />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarketWatchlist />
        <RecentTransactions />
      </div>

      <Notifications />
    </div>
  )
}
