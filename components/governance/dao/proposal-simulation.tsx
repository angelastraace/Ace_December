"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Play, AlertTriangle, CheckCircle2, XCircle, BarChart3 } from "lucide-react"

export default function ProposalSimulation() {
  const [simulationStatus, setSimulationStatus] = useState<"idle" | "running" | "success" | "error">("idle")

  const runSimulation = () => {
    setSimulationStatus("running")
    setTimeout(() => {
      setSimulationStatus("success")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-white">Proposal Simulation</CardTitle>
              <CardDescription>Test your proposal before submission</CardDescription>
            </div>
            <Badge variant="outline" className="border-purple-500 bg-purple-500/10 text-purple-400">
              Advanced Feature
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 rounded-lg bg-amber-900/20 p-4 text-sm text-amber-300">
            <div className="flex items-start">
              <AlertTriangle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
              <div>
                <p className="font-medium">Simulation Information</p>
                <p className="mt-1">
                  This tool allows you to simulate the execution of your proposal on a fork of the blockchain. Results
                  are for testing purposes only and may not perfectly reflect on-chain behavior.
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="setup" className="w-full">
            <TabsList className="w-full bg-gray-800">
              <TabsTrigger value="setup">Setup</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="setup" className="mt-4 space-y-4">
              <div>
                <label htmlFor="proposal-type" className="mb-2 block text-sm font-medium text-gray-400">
                  Simulation Type
                </label>
                <Select defaultValue="contract">
                  <SelectTrigger id="proposal-type" className="border-gray-700 bg-gray-800 text-white">
                    <SelectValue placeholder="Select simulation type" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-700 bg-gray-800 text-white">
                    <SelectItem value="contract">Contract Interaction</SelectItem>
                    <SelectItem value="treasury">Treasury Transaction</SelectItem>
                    <SelectItem value="parameter">Parameter Change</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="contract-address" className="mb-2 block text-sm font-medium text-gray-400">
                  Contract Address
                </label>
                <Input
                  id="contract-address"
                  placeholder="0x..."
                  className="border-gray-700 bg-gray-800 text-white"
                  defaultValue="0x1234567890abcdef1234567890abcdef12345678"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="network" className="mb-2 block text-sm font-medium text-gray-400">
                    Network
                  </label>
                  <Select defaultValue="mainnet">
                    <SelectTrigger id="network" className="border-gray-700 bg-gray-800 text-white">
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-700 bg-gray-800 text-white">
                      <SelectItem value="mainnet">Ethereum Mainnet</SelectItem>
                      <SelectItem value="arbitrum">Arbitrum</SelectItem>
                      <SelectItem value="optimism">Optimism</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="block" className="mb-2 block text-sm font-medium text-gray-400">
                    Block Number
                  </label>
                  <Input
                    id="block"
                    placeholder="latest"
                    className="border-gray-700 bg-gray-800 text-white"
                    defaultValue="latest"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="code" className="mt-4 space-y-4">
              <div>
                <label htmlFor="function-signature" className="mb-2 block text-sm font-medium text-gray-400">
                  Function Signature
                </label>
                <Input
                  id="function-signature"
                  placeholder="function(param1, param2, ...)"
                  className="border-gray-700 bg-gray-800 text-white"
                  defaultValue="updateRewardRate(uint256)"
                />
              </div>

              <div>
                <label htmlFor="function-params" className="mb-2 block text-sm font-medium text-gray-400">
                  Function Parameters
                </label>
                <Textarea
                  id="function-params"
                  placeholder="[param1, param2, ...]"
                  className="font-mono border-gray-700 bg-gray-800 text-white"
                  rows={3}
                  defaultValue="[500]"
                />
              </div>

              <div>
                <label htmlFor="caller" className="mb-2 block text-sm font-medium text-gray-400">
                  Caller Address
                </label>
                <Input
                  id="caller"
                  placeholder="0x..."
                  className="border-gray-700 bg-gray-800 text-white"
                  defaultValue="0xDAOTreasuryAddress"
                />
              </div>
            </TabsContent>

            <TabsContent value="results" className="mt-4">
              <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-6">
                {simulationStatus === "idle" && (
                  <div className="text-center">
                    <p className="text-gray-400">Run the simulation to see results</p>
                    <Button className="mt-4 bg-purple-600 text-white hover:bg-purple-700" onClick={runSimulation}>
                      <Play className="mr-1 h-4 w-4" /> Run Simulation
                    </Button>
                  </div>
                )}

                {simulationStatus === "running" && (
                  <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
                    <p className="mt-2 text-gray-400">Running simulation...</p>
                  </div>
                )}

                {simulationStatus === "success" && (
                  <div className="space-y-4">
                    <div className="flex items-center rounded-lg bg-green-900/20 p-3 text-green-400">
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      <span>Simulation completed successfully</span>
                    </div>

                    <div className="rounded-lg bg-gray-800 p-4">
                      <h3 className="mb-2 font-medium text-white">Execution Results</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Gas Used:</span>
                          <span className="text-white">54,231</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Execution Time:</span>
                          <span className="text-white">245ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Return Value:</span>
                          <span className="text-green-400">true</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-gray-800 p-4">
                      <h3 className="mb-2 font-medium text-white">State Changes</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">rewardRate:</span>
                          <div>
                            <span className="text-red-400">300</span>
                            <span className="mx-2 text-gray-500">→</span>
                            <span className="text-green-400">500</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">lastUpdateTime:</span>
                          <div>
                            <span className="text-red-400">1683721584</span>
                            <span className="mx-2 text-gray-500">→</span>
                            <span className="text-green-400">1683721600</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {simulationStatus === "error" && (
                  <div className="space-y-4">
                    <div className="flex items-center rounded-lg bg-red-900/20 p-3 text-red-400">
                      <XCircle className="mr-2 h-5 w-5" />
                      <span>Simulation failed</span>
                    </div>

                    <div className="rounded-lg bg-gray-800 p-4">
                      <h3 className="mb-2 font-medium text-white">Error Details</h3>
                      <p className="text-sm text-red-400">Error: Revert with message "Caller is not authorized"</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="mt-4">
              <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-6">
                {simulationStatus !== "success" ? (
                  <div className="text-center text-gray-400">Run a successful simulation to see analysis</div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">Impact Analysis</h3>
                      <Badge variant="outline" className="border-green-500 bg-green-500/10 text-green-400">
                        Low Risk
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm text-gray-400">Gas Efficiency</span>
                          <span className="text-sm text-green-400">Excellent</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-700">
                          <div className="h-full bg-green-500" style={{ width: "90%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm text-gray-400">Security Risk</span>
                          <span className="text-sm text-green-400">Low</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-700">
                          <div className="h-full bg-green-500" style={{ width: "15%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm text-gray-400">Economic Impact</span>
                          <span className="text-sm text-amber-400">Medium</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-700">
                          <div className="h-full bg-amber-500" style={{ width: "50%" }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-gray-800 p-4">
                      <div className="flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5 text-purple-400" />
                        <h3 className="font-medium text-white">Projected Outcomes</h3>
                      </div>
                      <div className="mt-3 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">APR Increase:</span>
                          <span className="text-green-400">+2.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Monthly Rewards:</span>
                          <span className="text-white">+125,000 ACE</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Treasury Impact:</span>
                          <span className="text-amber-400">-1.5M ACE/year</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 font-medium text-white">Recommendations</h3>
                      <ul className="list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Proposal is technically sound and can be safely executed</li>
                        <li>Consider the medium-term treasury impact of increased reward rate</li>
                        <li>Recommended to include a review period after 3 months</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end space-x-3">
            <Button
              className="bg-purple-600 text-white hover:bg-purple-700"
              onClick={runSimulation}
              disabled={simulationStatus === "running"}
            >
              <Play className="mr-1 h-4 w-4" />
              {simulationStatus === "running" ? "Simulating..." : "Run Simulation"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
