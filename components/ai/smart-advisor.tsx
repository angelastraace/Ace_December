"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sparkles, AlertTriangle, TrendingUp, Clock, Shield, Zap, Info, ChevronRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"

// Mock portfolio allocation data
const portfolioData = [
  { name: "Bitcoin (BTC)", value: 40, color: "#F7931A" },
  { name: "Ethereum (ETH)", value: 30, color: "#627EEA" },
  { name: "Solana (SOL)", value: 15, color: "#00FFA3" },
  { name: "ACE Token", value: 10, color: "#1E88E5" },
  { name: "Stablecoins", value: 5, color: "#16A34A" },
]

export default function SmartAdvisor() {
  const [riskLevel, setRiskLevel] = useState([5])
  const [timeHorizon, setTimeHorizon] = useState("medium")
  const [investmentGoal, setInvestmentGoal] = useState("growth")
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [portfolioScore, setPortfolioScore] = useState(78)

  const handleGeneratePortfolio = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setShowResults(true)
    }, 2000)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-blue-900/20 p-2">
                  <Sparkles className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-xl text-white">Smart Portfolio Advisor</CardTitle>
                  <CardDescription className="text-gray-400">
                    Get personalized investment recommendations based on your profile
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="border-blue-500 text-blue-400">
                Beta
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={showResults ? "results" : "profile"}>
              <TabsList className="mb-4 grid w-full grid-cols-2 bg-gray-900">
                <TabsTrigger value="profile" disabled={loading}>
                  Your Profile
                </TabsTrigger>
                <TabsTrigger value="results" disabled={!showResults && !loading}>
                  Recommendations
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <div className="rounded-md border border-gray-800 bg-gray-900/50 p-4">
                  <h3 className="mb-4 text-lg font-medium text-white">Risk Tolerance</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Conservative</span>
                        <span className="text-sm text-gray-400">Aggressive</span>
                      </div>
                      <Slider
                        value={riskLevel}
                        onValueChange={setRiskLevel}
                        min={1}
                        max={10}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Lower Risk, Lower Reward</span>
                        <span className="text-xs text-gray-500">Higher Risk, Higher Reward</span>
                      </div>
                    </div>

                    <div className="rounded-md border border-gray-700 bg-gray-800/50 p-3">
                      <div className="flex items-start space-x-3">
                        <Info className="mt-0.5 h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium text-white">Your Risk Level: {riskLevel[0]}/10</p>
                          <p className="text-xs text-gray-400">
                            {riskLevel[0] <= 3
                              ? "Conservative: Focus on capital preservation with stable returns."
                              : riskLevel[0] <= 7
                                ? "Moderate: Balanced approach with growth potential and reasonable risk."
                                : "Aggressive: Maximizing growth with higher volatility tolerance."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border border-gray-800 bg-gray-900/50 p-4">
                  <h3 className="mb-4 text-lg font-medium text-white">Investment Timeframe</h3>
                  <RadioGroup value={timeHorizon} onValueChange={setTimeHorizon} className="space-y-3">
                    <div className="flex items-center space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                      <RadioGroupItem value="short" id="timeframe-short" className="border-blue-600" />
                      <Label htmlFor="timeframe-short" className="flex-1 cursor-pointer">
                        <div className="font-medium text-white">Short-term (0-1 year)</div>
                        <div className="text-xs text-gray-400">
                          For quick access to funds and short-term trading opportunities
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                      <RadioGroupItem value="medium" id="timeframe-medium" className="border-blue-600" />
                      <Label htmlFor="timeframe-medium" className="flex-1 cursor-pointer">
                        <div className="font-medium text-white">Medium-term (1-3 years)</div>
                        <div className="text-xs text-gray-400">
                          Balanced approach for medium-term growth and moderate volatility
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                      <RadioGroupItem value="long" id="timeframe-long" className="border-blue-600" />
                      <Label htmlFor="timeframe-long" className="flex-1 cursor-pointer">
                        <div className="font-medium text-white">Long-term (3+ years)</div>
                        <div className="text-xs text-gray-400">
                          Strategic investment for long-term growth and wealth building
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="rounded-md border border-gray-800 bg-gray-900/50 p-4">
                  <h3 className="mb-4 text-lg font-medium text-white">Investment Goal</h3>
                  <RadioGroup value={investmentGoal} onValueChange={setInvestmentGoal} className="space-y-3">
                    <div className="flex items-center space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                      <RadioGroupItem value="preservation" id="goal-preservation" className="border-blue-600" />
                      <Label htmlFor="goal-preservation" className="flex-1 cursor-pointer">
                        <div className="font-medium text-white">Capital Preservation</div>
                        <div className="text-xs text-gray-400">
                          Focus on protecting your investment with minimal risk
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                      <RadioGroupItem value="income" id="goal-income" className="border-blue-600" />
                      <Label htmlFor="goal-income" className="flex-1 cursor-pointer">
                        <div className="font-medium text-white">Regular Income</div>
                        <div className="text-xs text-gray-400">
                          Generate consistent passive income through staking and yield
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                      <RadioGroupItem value="growth" id="goal-growth" className="border-blue-600" />
                      <Label htmlFor="goal-growth" className="flex-1 cursor-pointer">
                        <div className="font-medium text-white">Growth</div>
                        <div className="text-xs text-gray-400">
                          Maximize long-term growth potential with higher risk tolerance
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                      <RadioGroupItem value="speculation" id="goal-speculation" className="border-blue-600" />
                      <Label htmlFor="goal-speculation" className="flex-1 cursor-pointer">
                        <div className="font-medium text-white">Speculation</div>
                        <div className="text-xs text-gray-400">
                          High-risk, high-reward approach for potential outsized returns
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  onClick={handleGeneratePortfolio}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white hover:bg-blue-500"
                >
                  {loading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      Generating Recommendations...
                    </>
                  ) : (
                    "Generate Portfolio Recommendations"
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="results" className="space-y-6">
                <div className="rounded-md border border-gray-800 bg-gray-900/50 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Portfolio Health Score</h3>
                    <Badge
                      className={
                        portfolioScore >= 80
                          ? "bg-green-900/50 text-green-400"
                          : portfolioScore >= 60
                            ? "bg-yellow-900/50 text-yellow-400"
                            : "bg-red-900/50 text-red-400"
                      }
                    >
                      {portfolioScore}/100
                    </Badge>
                  </div>

                  <Progress
                    value={portfolioScore}
                    className="h-2 bg-gray-700"
                    indicatorClassName={
                      portfolioScore >= 80 ? "bg-green-500" : portfolioScore >= 60 ? "bg-yellow-500" : "bg-red-500"
                    }
                  />

                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div className="rounded-md border border-gray-700 bg-gray-800/50 p-3">
                      <div className="flex items-center">
                        <Shield className="mr-2 h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-white">Risk Score</span>
                      </div>
                      <div className="mt-2 flex items-end justify-between">
                        <span className="text-2xl font-bold text-white">
                          {riskLevel[0] <= 3 ? "Low" : riskLevel[0] <= 7 ? "Medium" : "High"}
                        </span>
                        <span className="text-sm text-gray-400">{riskLevel[0]}/10</span>
                      </div>
                    </div>

                    <div className="rounded-md border border-gray-700 bg-gray-800/50 p-3">
                      <div className="flex items-center">
                        <TrendingUp className="mr-2 h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-white">Growth Potential</span>
                      </div>
                      <div className="mt-2 flex items-end justify-between">
                        <span className="text-2xl font-bold text-white">
                          {riskLevel[0] <= 3 ? "Conservative" : riskLevel[0] <= 7 ? "Balanced" : "Aggressive"}
                        </span>
                        <span className="text-sm text-gray-400">
                          {riskLevel[0] <= 3 ? "5-10%" : riskLevel[0] <= 7 ? "10-20%" : "20%+"}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-md border border-gray-700 bg-gray-800/50 p-3">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-white">Time Horizon</span>
                      </div>
                      <div className="mt-2 flex items-end justify-between">
                        <span className="text-2xl font-bold text-white">
                          {timeHorizon === "short"
                            ? "Short-term"
                            : timeHorizon === "medium"
                              ? "Medium-term"
                              : "Long-term"}
                        </span>
                        <span className="text-sm text-gray-400">
                          {timeHorizon === "short" ? "0-1 yr" : timeHorizon === "medium" ? "1-3 yrs" : "3+ yrs"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-md border border-gray-800 bg-gray-900/50 p-4">
                    <h3 className="mb-4 text-lg font-medium text-white">Recommended Allocation</h3>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={portfolioData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {portfolioData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip
                            formatter={(value: number) => [`${value}%`, "Allocation"]}
                            labelFormatter={(name) => name}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="rounded-md border border-gray-800 bg-gray-900/50 p-4">
                    <h3 className="mb-4 text-lg font-medium text-white">Key Recommendations</h3>
                    <div className="space-y-3">
                      <div className="rounded-md border border-gray-700 bg-gray-800/50 p-3">
                        <div className="flex items-start space-x-3">
                          <Zap className="mt-0.5 h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium text-white">Diversify with Blue-Chip Assets</p>
                            <p className="text-xs text-gray-400">
                              Maintain a strong foundation with established cryptocurrencies like Bitcoin and Ethereum.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border border-gray-700 bg-gray-800/50 p-3">
                        <div className="flex items-start space-x-3">
                          <Zap className="mt-0.5 h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium text-white">Stake ACE Tokens</p>
                            <p className="text-xs text-gray-400">
                              Earn passive income by staking ACE tokens with current APY of 12%.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border border-gray-700 bg-gray-800/50 p-3">
                        <div className="flex items-start space-x-3">
                          <Zap className="mt-0.5 h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium text-white">Consider Layer-1 Alternatives</p>
                            <p className="text-xs text-gray-400">
                              Allocate a portion to promising Layer-1 blockchains like Solana for growth potential.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border border-gray-700 bg-gray-800/50 p-3">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-500" />
                          <div>
                            <p className="text-sm font-medium text-white">Risk Warning</p>
                            <p className="text-xs text-gray-400">
                              Maintain a small stablecoin reserve for market downturns and buying opportunities.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border border-gray-800 bg-gray-900/50 p-4">
                  <h3 className="mb-4 text-lg font-medium text-white">Detailed Asset Recommendations</h3>
                  <div className="space-y-3">
                    {portfolioData.map((asset, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md border border-gray-700 bg-gray-800/50 p-3"
                      >
                        <div className="flex items-center">
                          <div className="mr-3 h-3 w-3 rounded-full" style={{ backgroundColor: asset.color }}></div>
                          <span className="font-medium text-white">{asset.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-300">{asset.value}%</span>
                          <Button variant="ghost" size="sm" className="ml-2 text-blue-400 hover:text-blue-300">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    Adjust Parameters
                  </Button>
                  <Button className="bg-blue-600 text-white hover:bg-blue-500">Apply to Portfolio</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Smart Advisor Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border border-gray-800 bg-gray-900/50 p-3">
              <h3 className="mb-2 font-medium text-blue-400">Personalized Recommendations</h3>
              <p className="text-sm text-gray-300">
                Get tailored investment strategies based on your risk appetite, goals, and market conditions.
              </p>
            </div>

            <div className="rounded-md border border-gray-800 bg-gray-900/50 p-3">
              <h3 className="mb-2 font-medium text-blue-400">Portfolio Analysis</h3>
              <p className="text-sm text-gray-300">
                Analyze your current holdings and receive suggestions for optimization and diversification.
              </p>
            </div>

            <div className="rounded-md border border-gray-800 bg-gray-900/50 p-3">
              <h3 className="mb-2 font-medium text-blue-400">Risk Management</h3>
              <p className="text-sm text-gray-300">
                Identify potential risks in your portfolio and receive alerts for significant market changes.
              </p>
            </div>

            <div className="rounded-md border border-gray-800 bg-gray-900/50 p-3">
              <h3 className="mb-2 font-medium text-blue-400">Yield Optimization</h3>
              <p className="text-sm text-gray-300">
                Discover opportunities for staking, lending, and earning passive income with your crypto assets.
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400">
                <strong>Disclaimer:</strong> Smart Advisor provides recommendations based on your profile and market
                data. This is not financial advice. Always do your own research before making investment decisions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
