export default function MarketSelector() {
  return (
    <div className="p-2 bg-gray-700 rounded-lg shadow inline-block">
      <label htmlFor="market" className="sr-only">
        Select Market
      </label>
      <select id="market" className="bg-gray-600 text-white rounded px-3 py-1">
        <option>ACE/USDT</option>
        <option>BTC/USDT</option>
        <option>ETH/USDT</option>
      </select>
    </div>
  )
}
