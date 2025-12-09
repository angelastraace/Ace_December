// /app/(with-nav)/wallet/page.tsx

import type React from "react"
import WalletKatGuardian from "@/components/wallet/wallet-kat-guardian"
import WalletWatchlist from "@/components/wallet/wallet-watchlist"

const WalletPage: React.FC = () => {
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Your Wallet Dashboard</h1>

      <section>
        <WalletKatGuardian guardianName="Guardian Kat" guardianStatus="active" />
      </section>

      <section>
        <WalletWatchlist
          items={[
            { id: "1", assetName: "ACE Token", currentPrice: 1.25, changePercent: 2.8 },
            { id: "2", assetName: "ETH", currentPrice: 4100, changePercent: -0.9 },
            { id: "3", assetName: "BTC", currentPrice: 50000, changePercent: 1.2 },
          ]}
        />
      </section>
    </main>
  )
}

export default WalletPage
