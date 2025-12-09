import type React from "react"

interface WatchlistItem {
  id: string
  assetName: string
  currentPrice: number
  changePercent: number
}

interface WalletWatchlistProps {
  items?: WatchlistItem[]
}

const WalletWatchlist: React.FC<WalletWatchlistProps> = ({
  items = [
    { id: "1", assetName: "ACE Token", currentPrice: 1.23, changePercent: 2.5 },
    { id: "2", assetName: "ETH", currentPrice: 4000, changePercent: -1.2 },
  ],
}) => {
  return (
    <div className="wallet-watchlist p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Watchlist</h2>
      {items.length === 0 ? (
        <p>No assets in your watchlist yet.</p>
      ) : (
        <ul>
          {items.map(({ id, assetName, currentPrice, changePercent }) => (
            <li key={id} className="flex justify-between py-2 border-b last:border-b-0">
              <span>{assetName}</span>
              <span>
                ${currentPrice.toFixed(2)}{" "}
                <span className={`font-semibold ${changePercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ({changePercent >= 0 ? "+" : ""}
                  {changePercent.toFixed(1)}%)
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default WalletWatchlist
