"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Info, Clock, ArrowRight, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function EarnDualInvestment() {
  const [activeTab, setActiveTab] = useState("available")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  // Mock data for dual investment products
  const dualInvestmentProducts = [
    {
      id: 1,
      name: "BTC-USDT Up-and-Earn",
      baseToken: "BTC",
      quoteToken: "USDT",
      direction: "up",
      apy: 32.5,
      strikePrice: 60000,
      currentPrice: 58500,
      maturityDate: "2023-06-15T00:00:00Z",
      minInvestment: 100,
      maxInvestment: 50000,
      totalSubscribed: 250000,
      maxSize: 500000,
      subscriptionEndDate: "2023-06-08T00:00:00Z",
      baseTokenLogo: "/btc-logo.png",
      quoteTokenLogo: "/usdt-logo.png",
    },
    {
      id: 2,
      name: "ETH-USDT Down-and-Earn",
      baseToken: "ETH",
      quoteToken: "USDT",
      direction: "down",
      apy: 28.5,
      strikePrice: 3000,
      currentPrice: 3200,
      maturityDate: "2023-06-15T00:00:00Z",
      minInvestment: 100,
      maxInvestment: 50000,
      totalSubscribed: 150000,
      maxSize: 300000,
      subscriptionEndDate: "2023-06-08T00:00:00Z",
      baseTokenLogo: "/eth-logo.png",
      quoteTokenLogo: "/usdt-logo.png",
    },
    {
      id: 3,
      name: "ACE-USDT Up-and-Earn",
      baseToken: "ACE",
      quoteToken: "USDT",
      direction: "up",
      apy: 45.0,
      strikePrice: 2.5,
      currentPrice: 2.2,
      maturityDate: "2023-06-22T00:00:00Z",
      minInvestment: 100,
      maxInvestment: 10000,
      totalSubscribed: 50000,
      maxSize: 100000,
      subscriptionEndDate: "2023-06-15T00:00:00Z",
      baseTokenLogo: "/ace-coin.png",
      quoteTokenLogo: "/usdt-logo.png",
    },
    {
      id: 4,
      name: "BTC-USDT Down-and-Earn",
      baseToken: "BTC",
      quoteToken: "USDT",
      direction: "down",
      apy: 35.0,
      strikePrice: 55000,
      currentPrice: 58500,
      maturityDate: "2023-06-22T00:00:00Z",
      minInvestment: 100,
      maxInvestment: 50000,
      totalSubscribed: 200000,
      maxSize: 400000,
      subscriptionEndDate: "2023-06-15T00:00:00Z",
      baseTokenLogo: "/btc-logo.png",
      quoteTokenLogo: "/usdt-logo.png",
    },
  ]

  // Mock data for user's active investments
  const activeInvestments = [
    {
      id: 1,
      name: "ETH-USDT Up-and-Earn",
      baseToken: "ETH",
      quoteToken: "USDT",
      direction: "up",
      apy: 25.0,
      strikePrice: 3500,
      currentPrice: 3200,
      investedAmount: 1000,
      investedToken: "USDT",
      expectedReturn: 1019.18,
      returnToken: "USDT",
      maturityDate: "2023-06-08T00:00:00Z",
      status: "active",
      baseTokenLogo: "/eth-logo.png",
      quoteTokenLogo: "/usdt-logo.png",
    },
    {
      id: 2,
      name: "ACE-USDT Up-and-Earn",
      baseToken: "ACE",
      quoteToken: "USDT",
      direction: "up",
      apy: 40.0,
      strikePrice: 2.0,
      currentPrice: 2.2,
      investedAmount: 500,
      investedToken: "USDT",
      expectedReturn: 515.07,
      returnToken: "USDT",
      maturityDate: "2023-06-10T00:00:00Z",
      status: "active",
      baseTokenLogo: "/ace-coin.png",
      quoteTokenLogo: "/usdt-logo.png",
    },
  ]

  // Mock data for user's investment history
  const investmentHistory = [
    {
      id: 1,
      name: "BTC-USDT Up-and-Earn",
      baseToken: "BTC",
      quoteToken: "USDT",
      direction: "up",
      apy: 30.0,
      strikePrice: 58000,
      finalPrice: 62000,
      investedAmount: 1000,
      investedToken: "USDT",
      returnAmount: 1025.21,
      returnToken: "USDT",
      maturityDate: "2023-05-25T00:00:00Z",
      status: "completed",
      result: "success",
      baseTokenLogo: "/btc-logo.png",
      quoteTokenLogo: "/usdt-logo.png",
    },
    {
      id: 2,
      name: "ETH-USDT Down-and-Earn",
      baseToken: "ETH",
      quoteToken: "USDT",
      direction: "down",
      apy: 28.0,
      strikePrice: 3200,
      finalPrice: 3300,
      investedAmount: 500,
      investedToken: "USDT",
      returnAmount: 0.1515,
      returnToken: "ETH",
      maturityDate: "2023-05-20T00:00:00Z",
      status: "completed",
      result: "converted",
      baseTokenLogo: "/eth-logo.png",
      quoteTokenLogo: "/usdt-logo.png",
    },
  ]

  const handleSubscribe = (product: any) => {
    setSelectedProduct(product)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Dual Investment</h2>
          <p className="text-gray-400 mt-1">High-yield, principal-protected investment products</p>
        </div>
        <Tabs
          defaultValue="available"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full md:w-auto mt-4 md:mt-0"
        >
          <TabsList className="bg-gray-800/50 border border-gray-700">
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Info Card */}
      {activeTab === "available" && (
        <Card className="bg-gray-900/50 border-gray-700 mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="bg-blue-900/30 p-3 rounded-full">
                <Info className="h-6 w-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">How Dual Investment Works</h3>
                <p className="text-gray-400 text-sm">
                  Dual Investment is a non-principal protected product that allows you to earn enhanced yields. At
                  maturity, you'll receive your returns in either the base or quote currency, depending on the
                  settlement price relative to the strike price.
                </p>
              </div>
              <Button variant="outline" className="border-gray-700 text-gray-300">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "available" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dualInvestmentProducts.map((product) => (
            <Card key={product.id} className="bg-gray-900/50 border-gray-700">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="relative mr-3">
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                        <img
                          src={product.baseTokenLogo || "/placeholder.svg"}
                          alt={product.baseToken}
                          className="w-6 h-6"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-900">
                        <img
                          src={product.quoteTokenLogo || "/placeholder.svg"}
                          alt={product.quoteToken}
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-lg font-medium">{product.name}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {product.baseToken}/{product.quoteToken}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      product.direction === "up"
                        ? "bg-green-900/50 text-green-400 border-green-700"
                        : "bg-red-900/50 text-red-400 border-red-700"
                    }
                  >
                    {product.direction === "up" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {product.direction === "up" ? "Up-and-Earn" : "Down-and-Earn"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-400">APY</div>
                    <div className="text-2xl font-bold text-white">{product.apy}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Strike Price</div>
                    <div className="text-lg font-medium text-white">${product.strikePrice.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Current: ${product.currentPrice.toLocaleString()}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-400">Subscription</div>
                    <div className="text-sm">
                      <Progress
                        value={(product.totalSubscribed / product.maxSize) * 100}
                        max={100}
                        className="h-2 mt-2 bg-gray-700"
                      />
                      <div className="flex justify-between mt-1 text-xs text-gray-400">
                        <span>{Math.round((product.totalSubscribed / product.maxSize) * 100)}%</span>
                        <span>
                          ${product.totalSubscribed.toLocaleString()} / ${product.maxSize.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Settlement Date</div>
                    <div className="text-sm font-medium">
                      {new Date(product.maturityDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.ceil(
                        (new Date(product.maturityDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                      )}{" "}
                      days
                    </div>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => handleSubscribe(product)}
                    >
                      Subscribe
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-700 text-white">
                    <DialogHeader>
                      <DialogTitle>Subscribe to {product.name}</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Enter the amount you want to invest
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <label className="text-sm text-gray-400">Investment Amount ({product.quoteToken})</label>
                            <span className="text-sm text-gray-400">Balance: 5,000 {product.quoteToken}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Input
                              type="number"
                              placeholder="0.00"
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                            <Button variant="outline" className="border-gray-700 text-gray-300">
                              Max
                            </Button>
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-gray-500">
                            <span>
                              Min: {product.minInvestment} {product.quoteToken}
                            </span>
                            <span>
                              Max: {product.maxInvestment} {product.quoteToken}
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">APY</span>
                            <span className="text-sm font-medium">{product.apy}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">Strike Price</span>
                            <span className="text-sm font-medium">${product.strikePrice.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">Current Price</span>
                            <span className="text-sm font-medium">${product.currentPrice.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">Settlement Date</span>
                            <span className="text-sm font-medium">
                              {new Date(product.maturityDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">Subscription Ends</span>
                            <span className="text-sm font-medium">
                              {new Date(product.subscriptionEndDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4">
                          <div className="flex items-start">
                            <Info className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-gray-300">
                              <p className="mb-2">
                                {product.direction === "up" ? (
                                  <>
                                    If the settlement price is{" "}
                                    <span className="text-white font-medium">at or above</span> the strike price of{" "}
                                    <span className="text-white font-medium">
                                      ${product.strikePrice.toLocaleString()}
                                    </span>
                                    , you'll receive your principal plus yield in {product.quoteToken}.
                                  </>
                                ) : (
                                  <>
                                    If the settlement price is{" "}
                                    <span className="text-white font-medium">at or below</span> the strike price of{" "}
                                    <span className="text-white font-medium">
                                      ${product.strikePrice.toLocaleString()}
                                    </span>
                                    , you'll receive your principal plus yield in {product.quoteToken}.
                                  </>
                                )}
                              </p>
                              <p>
                                {product.direction === "up" ? (
                                  <>
                                    If the settlement price is <span className="text-white font-medium">below</span> the
                                    strike price, you'll receive the equivalent value in {product.baseToken}.
                                  </>
                                ) : (
                                  <>
                                    If the settlement price is <span className="text-white font-medium">above</span> the
                                    strike price, you'll receive the equivalent value in {product.baseToken}.
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" className="border-gray-700 text-gray-300">
                        Cancel
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">Confirm Subscription</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "active" && (
        <div className="space-y-6">
          {activeInvestments.length > 0 ? (
            activeInvestments.map((investment) => (
              <Card key={investment.id} className="bg-gray-900/50 border-gray-700">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="relative mr-3">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                          <img
                            src={investment.baseTokenLogo || "/placeholder.svg"}
                            alt={investment.baseToken}
                            className="w-6 h-6"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-900">
                          <img
                            src={investment.quoteTokenLogo || "/placeholder.svg"}
                            alt={investment.quoteToken}
                            className="w-4 h-4"
                          />
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-lg font-medium">{investment.name}</CardTitle>
                        <CardDescription className="text-gray-400">
                          {investment.baseToken}/{investment.quoteToken}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-900/50 text-blue-400 border-blue-700">
                      <Clock className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-400">Invested Amount</div>
                      <div className="text-lg font-medium text-white">
                        {investment.investedAmount.toLocaleString()} {investment.investedToken}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Expected Return</div>
                      <div className="text-lg font-medium text-white">
                        {investment.expectedReturn.toLocaleString()} {investment.returnToken}
                      </div>
                      <div className="text-xs text-teal-400">APY: {investment.apy}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Strike Price</div>
                      <div className="text-lg font-medium text-white">${investment.strikePrice.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Current: ${investment.currentPrice.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Settlement Date</div>
                      <div className="text-sm font-medium text-white">
                        {new Date(investment.maturityDate).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {Math.ceil(
                          (new Date(investment.maturityDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                        )}{" "}
                        days remaining
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-gray-300">
                        <p>
                          {investment.direction === "up" ? (
                            <>
                              If the settlement price is <span className="text-white font-medium">at or above</span> the
                              strike price of{" "}
                              <span className="text-white font-medium">${investment.strikePrice.toLocaleString()}</span>
                              , you'll receive{" "}
                              <span className="text-white font-medium">
                                {investment.expectedReturn.toLocaleString()} {investment.returnToken}
                              </span>
                              .
                            </>
                          ) : (
                            <>
                              If the settlement price is <span className="text-white font-medium">at or below</span> the
                              strike price of{" "}
                              <span className="text-white font-medium">${investment.strikePrice.toLocaleString()}</span>
                              , you'll receive{" "}
                              <span className="text-white font-medium">
                                {investment.expectedReturn.toLocaleString()} {investment.returnToken}
                              </span>
                              .
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-gray-900/50 border-gray-700">
              <CardContent className="pt-6 pb-6 text-center">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-gray-800/80 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium">No Active Investments</h3>
                  <p className="text-gray-400 max-w-md">
                    You don't have any active dual investments. Explore available products to start earning high yields.
                  </p>
                  <Button
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => setActiveTab("available")}
                  >
                    Explore Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === "history" && (
        <div className="space-y-6">
          {investmentHistory.length > 0 ? (
            investmentHistory.map((investment) => (
              <Card key={investment.id} className="bg-gray-900/50 border-gray-700">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="relative mr-3">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                          <img
                            src={investment.baseTokenLogo || "/placeholder.svg"}
                            alt={investment.baseToken}
                            className="w-6 h-6"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-900">
                          <img
                            src={investment.quoteTokenLogo || "/placeholder.svg"}
                            alt={investment.quoteToken}
                            className="w-4 h-4"
                          />
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-lg font-medium">{investment.name}</CardTitle>
                        <CardDescription className="text-gray-400">
                          {investment.baseToken}/{investment.quoteToken}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        investment.result === "success"
                          ? "bg-green-900/50 text-green-400 border-green-700"
                          : "bg-amber-900/50 text-amber-400 border-amber-700"
                      }
                    >
                      {investment.result === "success" ? (
                        <Check className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowRight className="h-3 w-3 mr-1" />
                      )}
                      {investment.result === "success" ? "Yield Earned" : "Converted"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-400">Invested</div>
                      <div className="text-lg font-medium text-white">
                        {investment.investedAmount.toLocaleString()} {investment.investedToken}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Received</div>
                      <div className="text-lg font-medium text-white">
                        {investment.returnAmount.toLocaleString()} {investment.returnToken}
                      </div>
                      <div className="text-xs text-teal-400">APY: {investment.apy}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Strike / Final Price</div>
                      <div className="text-sm font-medium text-white">
                        ${investment.strikePrice.toLocaleString()} / ${investment.finalPrice.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {investment.direction === "up"
                          ? investment.finalPrice >= investment.strikePrice
                            ? "Above Strike"
                            : "Below Strike"
                          : investment.finalPrice <= investment.strikePrice
                            ? "Below Strike"
                            : "Above Strike"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Settlement Date</div>
                      <div className="text-sm font-medium text-white">
                        {new Date(investment.maturityDate).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-gray-900/50 border-gray-700">
              <CardContent className="pt-6 pb-6 text-center">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-gray-800/80 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium">No Investment History</h3>
                  <p className="text-gray-400 max-w-md">
                    You haven't completed any dual investments yet. Start investing to build your history.
                  </p>
                  <Button
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => setActiveTab("available")}
                  >
                    Start Investing
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
