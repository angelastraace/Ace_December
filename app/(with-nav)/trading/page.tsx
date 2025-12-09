"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { isAuthenticated } from "@/lib/auth"
import TradingViewChart from "@/components/trading-view-chart"
import OrderBook from "@/components/order-book"
import TradeHistory from "@/components/trade-history"
import MarketSelector from "@/components/market-selector"
import WalletConnect from "@/components/wallet-connect"

export default function TradingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [orderType, setOrderType] = useState("limit")
  const [side, setSide] = useState("buy")
  const [price, setPrice] = useState("")
  const [amount, setAmount] = useState("")
  const [total, setTotal] = useState("0.00")
  const [selectedMarket, setSelectedMarket] = useState("BTC/USDT")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    setIsLoggedIn(isAuthenticated())
  }, [])

  useEffect(() => {
    // Calculate total when price or amount changes
    if (price && amount) {
      setTotal((Number.parseFloat(price) * Number.parseFloat(amount)).toFixed(2))
    } else {
      setTotal("0.00")
    }
  }, [price, amount])

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      router.push("/admin/login?redirect=/trading")
      return
    }

    setIsLoading(true)

    // Simulate API call to place order
    setTimeout(() => {
      console.log({
        type: orderType,
        side,
        price: orderType === "market" ? "market" : price,
        amount,
        market: selectedMarket,
      })
      setIsLoading(false)

      // Reset form after order is placed
      if (side === "buy") {
        setAmount("")
      } else {
        setPrice("")
        setAmount("")
      }
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#001219]">
      {/* Background with stars animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container absolute inset-0 z-0">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/20 px-4 py-4 backdrop-blur-md md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <MarketSelector selectedMarket={selectedMarket} onSelectMarket={setSelectedMarket} />
              <div>
                <div className="text-xl font-bold text-white">48,235.65</div>
                <div className="text-sm text-green-500">+2.34%</div>
              </div>
            </div>
            <div>
              <WalletConnect />
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="grid flex-1 grid-cols-1 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
          {/* Chart */}
          <div className="md:col-span-2 lg:col-span-3">
            <Card className="h-[500px] border-gray-800 bg-black/40 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-800 px-4 py-3">
                <CardTitle className="text-white">BTC/USDT</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <TradingViewChart symbol={selectedMarket} />
              </CardContent>
            </Card>
          </div>

          {/* Order form */}
          <div>
            <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-800 px-4 py-3">
                <CardTitle className="text-white">Place Order</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Tabs defaultValue="spot" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
                    <TabsTrigger value="spot">Spot</TabsTrigger>
                    <TabsTrigger value="margin" disabled>
                      Margin
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="spot" className="mt-4">
                    <div className="mb-4">
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          className={`w-full ${
                            side === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-gray-800 hover:bg-gray-700"
                          }`}
                          onClick={() => setSide("buy")}
                        >
                          Buy
                        </Button>
                        <Button
                          className={`w-full ${
                            side === "sell" ? "bg-red-600 hover:bg-red-700" : "bg-gray-800 hover:bg-gray-700"
                          }`}
                          onClick={() => setSide("sell")}
                        >
                          Sell
                        </Button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Select value={orderType} onValueChange={setOrderType}>
                        <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
                          <SelectValue placeholder="Order Type" />
                        </SelectTrigger>
                        <SelectContent className="border-gray-700 bg-gray-800 text-white">
                          <SelectItem value="limit">Limit</SelectItem>
                          <SelectItem value="market">Market</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {orderType === "limit" && (
                      <div className="mb-4">
                        <Label htmlFor="price" className="text-gray-400">
                          Price (USDT)
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="0.00"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="mt-1 border-gray-700 bg-gray-800 text-white"
                        />
                      </div>
                    )}

                    <div className="mb-4">
                      <Label htmlFor="amount" className="text-gray-400">
                        Amount (BTC)
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mt-1 border-gray-700 bg-gray-800 text-white"
                      />
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total</span>
                        <span className="text-white">{total} USDT</span>
                      </div>
                    </div>

                    <Button
                      className={`w-full ${
                        side === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                      }`}
                      onClick={handlePlaceOrder}
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : side === "buy" ? "Buy BTC" : "Sell BTC"}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Order book */}
          <div className="md:col-span-2">
            <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-800 px-4 py-3">
                <CardTitle className="text-white">Order Book</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <OrderBook market={selectedMarket} />
              </CardContent>
            </Card>
          </div>

          {/* Trade history */}
          <div className="lg:col-span-2">
            <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-800 px-4 py-3">
                <CardTitle className="text-white">Trade History</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <TradeHistory market={selectedMarket} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
