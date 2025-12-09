"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Wallet, ArrowUpRight, ArrowDownRight, ChevronDown, ChevronUp, AlertCircle } from "lucide-react"

export function EarnLendingMarket() {
  const [activeTab, setActiveTab] = useState("lend")
  const [expandedMarket, setExpandedMarket] = useState<number | null>(null)

  // Mock data for lending markets
  const lendingMarkets = [
    {
      id: 1,
      tokenSymbol: "USDT",
      tokenName: "Tether",
      tokenLogo: "/usdt-logo.png",
      supplyApy: 5.2,
      borrowApy: 7.8,
      totalSupplied: 15000000,
      totalBorrowed: 12000000,
      userSupplied: 5000,
      userBorrowed: 0,
      walletBalance: 10000,
      utilizationRate: 80,
      collateralFactor: 0.8,
    },
    {
      id: 2,
      tokenSymbol: "ETH",
      tokenName: "Ethereum",
      tokenLogo: "/eth-logo.png",
      supplyApy: 3.5,
      borrowApy: 5.2,
      totalSupplied: 50000,
      totalBorrowed: 35000,
      userSupplied: 2.5,
      userBorrowed: 0,
      walletBalance: 5,
      utilizationRate: 70,
      collateralFactor: 0.75,
    },
    {
      id: 3,
      tokenSymbol: "BTC",
      tokenName: "Bitcoin",
      tokenLogo: "/btc-logo.png",
      supplyApy: 2.8,
      borrowApy: 4.5,
      totalSupplied: 2000,
      totalBorrowed: 1200,
      userSupplied: 0,
      userBorrowed: 0.1,
      walletBalance: 0.5,
      utilizationRate: 60,
      collateralFactor: 0.7,
    },
    {
      id: 4,
      tokenSymbol: "ACE",
      tokenName: "ACE Token",
      tokenLogo: "/ace-coin.png",
      supplyApy: 8.5,
      borrowApy: 12.5,
      totalSupplied: 5000000,
      totalBorrowed: 3000000,
      userSupplied: 10000,
      userBorrowed: 0,
      walletBalance: 25000,
      utilizationRate: 60,
      collateralFactor: 0.6,
    },
  ]

  const toggleMarketExpand = (marketId: number) => {
    if (expandedMarket === marketId) {
      setExpandedMarket(null)
    } else {
      setExpandedMarket(marketId)
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Lending Market</h2>
          <p className="text-gray-400 mt-1">Supply assets to earn interest or borrow against your collateral</p>
        </div>
        <Tabs
          defaultValue="lend"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full md:w-auto mt-4 md:mt-0"
        >
          <TabsList className="bg-gray-800/50 border border-gray-700">
            <TabsTrigger value="lend">Lend</TabsTrigger>
            <TabsTrigger value="borrow">Borrow</TabsTrigger>
            <TabsTrigger value="my">My Positions</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* User Summary Card */}
      <Card className="bg-gray-900/50 border-gray-700 mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-400">Supply Balance</div>
              <div className="text-2xl font-bold text-white">$5,025.00</div>
              <div className="text-xs text-teal-400 mt-1">Earning ~$0.68 daily</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Borrow Balance</div>
              <div className="text-2xl font-bold text-white">$2,000.00</div>
              <div className="text-xs text-amber-400 mt-1">Paying ~$0.25 daily</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Borrow Limit</div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-white">50% used</span>
                <span className="text-sm text-gray-400">$2,000 / $4,000</span>
              </div>
              <Progress value={50} max={100} className="h-2 mt-2 bg-gray-700" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {lendingMarkets.map((market) => (
          <Card key={market.id} className="bg-gray-900/50 border-gray-700">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                    {market.tokenLogo ? (
                      <img src={market.tokenLogo || "/placeholder.svg"} alt={market.tokenSymbol} className="w-6 h-6" />
                    ) : (
                      <Wallet className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-medium">{market.tokenName}</CardTitle>
                    <CardDescription className="text-gray-400">{market.tokenSymbol}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {activeTab === "lend" && (
                    <Badge variant="outline" className="bg-teal-900/50 text-teal-400 border-teal-700">
                      {market.supplyApy}% APY
                    </Badge>
                  )}
                  {activeTab === "borrow" && (
                    <Badge variant="outline" className="bg-amber-900/50 text-amber-400 border-amber-700">
                      {market.borrowApy}% APY
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400"
                    onClick={() => toggleMarketExpand(market.id)}
                  >
                    {expandedMarket === market.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {activeTab === "lend" && (
                  <>
                    <div>
                      <div className="text-sm text-gray-400">Supply APY</div>
                      <div className="text-xl font-bold text-teal-400">{market.supplyApy}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Total Supplied</div>
                      <div className="text-lg font-medium text-white">
                        {market.totalSupplied.toLocaleString()} {market.tokenSymbol}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Wallet Balance</div>
                      <div className="text-lg font-medium text-white">
                        {market.walletBalance.toLocaleString()} {market.tokenSymbol}
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                        <ArrowUpRight className="mr-2 h-4 w-4" /> Supply
                      </Button>
                    </div>
                  </>
                )}

                {activeTab === "borrow" && (
                  <>
                    <div>
                      <div className="text-sm text-gray-400">Borrow APY</div>
                      <div className="text-xl font-bold text-amber-400">{market.borrowApy}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Available to Borrow</div>
                      <div className="text-lg font-medium text-white">
                        {(market.totalSupplied - market.totalBorrowed).toLocaleString()} {market.tokenSymbol}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Collateral Factor</div>
                      <div className="text-lg font-medium text-white">{market.collateralFactor * 100}%</div>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                        <ArrowDownRight className="mr-2 h-4 w-4" /> Borrow
                      </Button>
                    </div>
                  </>
                )}

                {activeTab === "my" && (
                  <>
                    <div>
                      <div className="text-sm text-gray-400">Your Supply</div>
                      <div className="text-lg font-medium text-white">
                        {market.userSupplied > 0
                          ? `${market.userSupplied.toLocaleString()} ${market.tokenSymbol}`
                          : "-"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Your Borrow</div>
                      <div className="text-lg font-medium text-white">
                        {market.userBorrowed > 0
                          ? `${market.userBorrowed.toLocaleString()} ${market.tokenSymbol}`
                          : "-"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Net APY</div>
                      <div className="text-lg font-medium text-white">
                        {market.userSupplied > 0
                          ? `${market.supplyApy}%`
                          : market.userBorrowed > 0
                            ? `${market.borrowApy}%`
                            : "-"}
                      </div>
                    </div>
                    <div className="flex items-end space-x-2">
                      {market.userSupplied > 0 && (
                        <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">Withdraw</Button>
                      )}
                      {market.userBorrowed > 0 && (
                        <Button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">Repay</Button>
                      )}
                      {market.userSupplied === 0 && market.userBorrowed === 0 && (
                        <Button className="flex-1" disabled>
                          No Position
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>

              {expandedMarket === market.id && (
                <div className="mt-6 border-t border-gray-800 pt-4">
                  {activeTab === "lend" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-medium mb-4">Supply {market.tokenSymbol}</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <label className="text-sm text-gray-400">Amount to Supply</label>
                              <span className="text-sm text-gray-400">
                                Balance: {market.walletBalance.toLocaleString()} {market.tokenSymbol}
                              </span>
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
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-400">Supply APY</span>
                              <span className="text-sm font-medium text-teal-400">{market.supplyApy}%</span>
                            </div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-400">Collateral Factor</span>
                              <span className="text-sm font-medium">{market.collateralFactor * 100}%</span>
                            </div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-400">Utilization Rate</span>
                              <span className="text-sm font-medium">{market.utilizationRate}%</span>
                            </div>
                          </div>

                          <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">Supply</Button>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium mb-4">Market Details</h4>
                        <div className="space-y-4">
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-gray-400">Total Supplied</span>
                              <span className="text-sm font-medium">
                                {market.totalSupplied.toLocaleString()} {market.tokenSymbol}
                              </span>
                            </div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-gray-400">Total Borrowed</span>
                              <span className="text-sm font-medium">
                                {market.totalBorrowed.toLocaleString()} {market.tokenSymbol}
                              </span>
                            </div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-gray-400">Available Liquidity</span>
                              <span className="text-sm font-medium">
                                {(market.totalSupplied - market.totalBorrowed).toLocaleString()} {market.tokenSymbol}
                              </span>
                            </div>
                          </div>

                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <div className="flex items-start">
                              <AlertCircle className="h-5 w-5 text-amber-400 mr-2 mt-0.5" />
                              <div className="text-sm text-gray-400">
                                <p className="mb-1">Supplying {market.tokenSymbol} will:</p>
                                <ul className="list-disc list-inside space-y-1">
                                  <li>Earn {market.supplyApy}% APY on your deposit</li>
                                  <li>Allow you to use {market.tokenSymbol} as collateral for borrowing</li>
                                  <li>Enable you to withdraw anytime (subject to available liquidity)</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "borrow" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-medium mb-4">Borrow {market.tokenSymbol}</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <label className="text-sm text-gray-400">Amount to Borrow</label>
                              <span className="text-sm text-gray-400">
                                Available: {(market.totalSupplied - market.totalBorrowed).toLocaleString()}{" "}
                                {market.tokenSymbol}
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <Input
                                type="number"
                                placeholder="0.00"
                                className="bg-gray-800 border-gray-700 text-white"
                              />
                              <Button variant="outline" className="border-gray-700 text-gray-300">
                                Max Safe
                              </Button>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-400">Borrow APY</span>
                              <span className="text-sm font-medium text-amber-400">{market.borrowApy}%</span>
                            </div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-400">Borrow Limit Used</span>
                              <span className="text-sm font-medium">50% → 65%</span>
                            </div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-400">Liquidation Threshold</span>
                              <span className="text-sm font-medium">80%</span>
                            </div>
                          </div>

                          <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">Borrow</Button>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium mb-4">Your Collateral</h4>
                        <div className="space-y-4">
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-gray-400">Your Collateral Value</span>
                              <span className="text-sm font-medium">$4,000.00</span>
                            </div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-gray-400">Your Borrowed Value</span>
                              <span className="text-sm font-medium">$2,000.00</span>
                            </div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-gray-400">Available to Borrow</span>
                              <span className="text-sm font-medium">$1,200.00</span>
                            </div>
                          </div>

                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <div className="flex items-start">
                              <AlertCircle className="h-5 w-5 text-amber-400 mr-2 mt-0.5" />
                              <div className="text-sm text-gray-400">
                                <p className="mb-1">Borrowing {market.tokenSymbol} will:</p>
                                <ul className="list-disc list-inside space-y-1">
                                  <li>Require you to pay {market.borrowApy}% APY on your loan</li>
                                  <li>Increase your borrow limit usage</li>
                                  <li>Risk liquidation if your borrow limit exceeds 80%</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "my" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {market.userSupplied > 0 && (
                        <div>
                          <h4 className="text-lg font-medium mb-4">Your Supply Position</h4>
                          <div className="space-y-4">
                            <div className="bg-gray-800/50 rounded-lg p-4">
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-400">Supplied Amount</span>
                                <span className="text-sm font-medium">
                                  {market.userSupplied.toLocaleString()} {market.tokenSymbol}
                                </span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-400">Supply APY</span>
                                <span className="text-sm font-medium text-teal-400">{market.supplyApy}%</span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-400">Daily Earnings</span>
                                <span className="text-sm font-medium">
                                  ~{((market.userSupplied * market.supplyApy) / 365).toFixed(4)} {market.tokenSymbol}
                                </span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-400">Used as Collateral</span>
                                <span className="text-sm font-medium">Yes</span>
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">Withdraw</Button>
                              <Button variant="outline" className="flex-1 border-gray-700 text-gray-300">
                                Disable as Collateral
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {market.userBorrowed > 0 && (
                        <div>
                          <h4 className="text-lg font-medium mb-4">Your Borrow Position</h4>
                          <div className="space-y-4">
                            <div className="bg-gray-800/50 rounded-lg p-4">
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-400">Borrowed Amount</span>
                                <span className="text-sm font-medium">
                                  {market.userBorrowed.toLocaleString()} {market.tokenSymbol}
                                </span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-400">Borrow APY</span>
                                <span className="text-sm font-medium text-amber-400">{market.borrowApy}%</span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-400">Daily Interest</span>
                                <span className="text-sm font-medium">
                                  ~{((market.userBorrowed * market.borrowApy) / 365).toFixed(6)} {market.tokenSymbol}
                                </span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-400">Health Factor</span>
                                <span className="text-sm font-medium text-green-400">1.6</span>
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">Repay</Button>
                              <Button variant="outline" className="flex-1 border-gray-700 text-gray-300">
                                Borrow More
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {market.userSupplied === 0 && market.userBorrowed === 0 && (
                        <div className="col-span-2">
                          <div className="bg-gray-800/50 rounded-lg p-6 text-center">
                            <p className="text-gray-400 mb-4">You don't have any positions in this market yet</p>
                            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                                <ArrowUpRight className="mr-2 h-4 w-4" /> Supply {market.tokenSymbol}
                              </Button>
                              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                                <ArrowDownRight className="mr-2 h-4 w-4" /> Borrow {market.tokenSymbol}
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
