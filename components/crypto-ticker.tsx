"use client"

import { useEffect, useState } from "react"

type CryptoData = {
  symbol: string
  price: string
  change: string
  color: string
}

const initialData: CryptoData[] = [
  { symbol: "ADA", price: "$0.9", change: "+0.89%", color: "bg-blue-400" },
  { symbol: "DOT", price: "$10", change: "-0.45%", color: "bg-pink-400" },
  { symbol: "LINK", price: "$15.75", change: "+3.21%", color: "bg-green-400" },
  { symbol: "AVAX", price: "$28.40", change: "-2.15%", color: "bg-red-400" },
  { symbol: "MATIC", price: "$0.65", change: "+1.87%", color: "bg-yellow-400" },
  { symbol: "XRP", price: "$0.52", change: "-0.73%", color: "bg-purple-400" },
  { symbol: "DOGE", price: "$0.08", change: "+4.20%", color: "bg-orange-400" },
  { symbol: "ATOM", price: "$8.15", change: "+2.75%", color: "bg-cyan-400" },
  { symbol: "LTC", price: "$65.30", change: "-1.05%", color: "bg-gray-400" },
  { symbol: "ALGO", price: "$0.12", change: "+1.67%", color: "bg-blue-500" },
  { symbol: "ACE", price: "$3.45", change: "+12.75%", color: "bg-purple-500" },
]

export function CryptoTicker() {
  const [cryptos, setCryptos] = useState<CryptoData[]>(initialData)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % cryptos.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [cryptos.length])

  return (
    <div className="w-full overflow-hidden bg-black/40 backdrop-blur-sm border-y border-cyan-500/20">
      <div className="flex items-center py-2 animate-marquee">
        {cryptos.concat(cryptos).map((crypto, index) => (
          <div key={index} className="flex items-center mx-4 whitespace-nowrap">
            <div className={`w-3 h-3 rounded-full ${crypto.color} mr-2`}></div>
            <span className="font-medium text-white">{crypto.symbol}</span>
            <span className="ml-2 text-gray-300">{crypto.price}</span>
            <span className={`ml-2 ${crypto.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
              {crypto.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
