"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Calendar, Save, Play, Code, FileText, Settings, Download, Upload, RefreshCw } from "lucide-react"

export default function EventScriptEditor() {
  const [activeTab, setActiveTab] = useState("editor")
  const [scriptName, setScriptName] = useState("Trading_Competition_Event")
  const [scriptContent, setScriptContent] = useState(`// ACE Exchange Event Script
// Purpose: Trading Competition Event

function tradingCompetition(config) {
  const {
    startDate,
    endDate,
    tradingPairs,
    minVolume,
    prizes
  } = config;
  
  return {
    name: "Trading Competition",
    description: "Compete for the highest trading volume and win prizes!",
    rules: [
      "Trade on specified pairs during the event period",
      "Minimum trading volume: " + minVolume + " USDT",
      "Winners determined by total trading volume"
    ],
    rewards: prizes,
    eligibility: {
      minAccountAge: 7, // days
      kycRequired: true,
      minBalance: 100 // USDT
    },
    notifications: {
      start: true,
      end: true,
      leaderboardUpdates: true
    },
    leaderboard: {
      enabled: true,
      updateFrequency: "hourly",
      displayCount: 100
    }
  };
}

// Export the main function
export default tradingCompetition;`)

  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationResult, setSimulationResult] = useState<any>(null)

  const handleSimulate = () => {
    setIsSimulating(true)
    // Simulate script execution
    setTimeout(() => {
      setIsSimulating(false)
      setSimulationResult({
        name: "Trading Competition",
        description: "Compete for the highest trading volume and win prizes!",
        rules: [
          "Trade on specified pairs during the event period",
          "Minimum trading volume: 1000 USDT",
          "Winners determined by total trading volume",
        ],
        rewards: ["1st Place: 10,000 ACE", "2nd Place: 5,000 ACE", "3rd Place: 2,500 ACE", "4th-10th Place: 1,000 ACE"],
        eligibility: {
          minAccountAge: 7,
          kycRequired: true,
          minBalance: 100,
        },
        notifications: {
          start: true,
          end: true,
          leaderboardUpdates: true,
        },
        leaderboard: {
          enabled: true,
          updateFrequency: "hourly",
          displayCount: 100,
        },
      })
    }, 1500)
  }

  return (
    <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-white">Event Script Editor</CardTitle>
            <CardDescription>Create and manage platform events</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Save className="mr-2 h-4 w-4" />
              Save Script
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Input
                  value={scriptName}
                  onChange={(e) => setScriptName(e.target.value)}
                  className="h-7 w-[260px] text-lg font-semibold"
                />
                <Badge variant="outline" className="border-blue-500/30 bg-blue-900/10 text-blue-400">
                  Draft
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Select defaultValue="javascript">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="editor">
                  <Code className="mr-2 h-4 w-4" />
                  Editor
                </TabsTrigger>
                <TabsTrigger value="docs">
                  <FileText className="mr-2 h-4 w-4" />
                  Documentation
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="mt-4">
                <div className="relative">
                  <Textarea
                    value={scriptContent}
                    onChange={(e) => setScriptContent(e.target.value)}
                    className="font-mono h-[300px] resize-none bg-gray-950 text-sm"
                  />
                </div>
              </TabsContent>

              <TabsContent value="docs" className="mt-4">
                <div className="rounded-md border border-gray-800 bg-gray-950 p-4">
                  <h3 className="text-lg font-medium text-white mb-4">Event Script Documentation</h3>
                  <div className="space-y-4 text-sm text-gray-400">
                    <p>
                      Event scripts allow you to create and manage platform events such as trading competitions,
                      airdrops, and promotional activities.
                    </p>
                    <div>
                      <h4 className="text-white font-medium mb-2">Available Methods</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <code className="text-blue-400">getUserEligibility(userId, criteria)</code> - Check if a user
                          is eligible
                        </li>
                        <li>
                          <code className="text-blue-400">calculateRewards(userId, performance)</code> - Calculate
                          rewards
                        </li>
                        <li>
                          <code className="text-blue-400">sendEventNotification(userId, message)</code> - Send
                          notification
                        </li>
                        <li>
                          <code className="text-blue-400">updateLeaderboard(eventId, rankings)</code> - Update
                          leaderboard
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Event Configuration</h4>
                      <p>Events should return an object with the following properties:</p>
                      <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>
                          <code className="text-blue-400">name</code> - Event name
                        </li>
                        <li>
                          <code className="text-blue-400">description</code> - Event description
                        </li>
                        <li>
                          <code className="text-blue-400">rules</code> - Array of rules
                        </li>
                        <li>
                          <code className="text-blue-400">rewards</code> - Prize structure
                        </li>
                        <li>
                          <code className="text-blue-400">eligibility</code> - Participation requirements
                        </li>
                        <li>
                          <code className="text-blue-400">notifications</code> - Notification settings
                        </li>
                        <li>
                          <code className="text-blue-400">leaderboard</code> - Leaderboard configuration
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-type">Event Type</Label>
                      <Select defaultValue="trading-competition">
                        <SelectTrigger id="event-type">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trading-competition">Trading Competition</SelectItem>
                          <SelectItem value="airdrop">Airdrop</SelectItem>
                          <SelectItem value="staking-rewards">Staking Rewards</SelectItem>
                          <SelectItem value="referral-program">Referral Program</SelectItem>
                          <SelectItem value="custom">Custom Event</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-status">Status</Label>
                      <Select defaultValue="draft">
                        <SelectTrigger id="event-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input id="start-date" type="datetime-local" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input id="end-date" type="datetime-local" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-description">Event Description</Label>
                    <Textarea
                      id="event-description"
                      placeholder="Describe the event"
                      defaultValue="Trading competition with prizes for the highest trading volume."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="auto-publish" />
                    <Label htmlFor="auto-publish">Auto-publish at start date</Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between">
              <div className="text-sm text-gray-500">Last saved: 30 minutes ago</div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button size="sm" onClick={handleSimulate} disabled={isSimulating}>
                  <Play className="mr-2 h-4 w-4" />
                  {isSimulating ? "Simulating..." : "Simulate"}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Simulation Result</CardTitle>
              </CardHeader>
              <CardContent>
                {simulationResult ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-white">{simulationResult.name}</h3>
                      <p className="text-sm text-gray-300">{simulationResult.description}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-white">Rules</h4>
                      <ul className="text-sm space-y-1">
                        {simulationResult.rules.map((rule: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span className="text-gray-300">{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-white">Rewards</h4>
                      <ul className="text-sm space-y-1">
                        {simulationResult.rewards.map((reward: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span className="text-gray-300">{reward}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-white">Eligibility</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span className="text-gray-300">
                            Minimum account age: {simulationResult.eligibility.minAccountAge} days
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span className="text-gray-300">
                            KYC required: {simulationResult.eligibility.kycRequired ? "Yes" : "No"}
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span className="text-gray-300">
                            Minimum balance: {simulationResult.eligibility.minBalance} USDT
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed border-gray-800 bg-gray-900/30 p-4">
                    <div className="text-center">
                      <Play className="mx-auto h-8 w-8 text-gray-500" />
                      <p className="mt-2 text-sm text-gray-500">Click "Simulate" to test your script</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-md border border-gray-800 bg-gray-900/50 p-3 hover:bg-gray-800/50 cursor-pointer">
                    <div>
                      <p className="font-medium text-white">Trading Competition</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>Starts in 2 days</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-blue-500/30 bg-blue-900/10 text-blue-400">
                      Scheduled
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-gray-800 bg-gray-900/50 p-3 hover:bg-gray-800/50 cursor-pointer">
                    <div>
                      <p className="font-medium text-white">ACE Token Airdrop</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>Starts in 5 days</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-blue-500/30 bg-blue-900/10 text-blue-400">
                      Scheduled
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-gray-800 bg-gray-900/50 p-3 hover:bg-gray-800/50 cursor-pointer">
                    <div>
                      <p className="font-medium text-white">Referral Program</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>Ongoing</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-500/30 bg-green-900/10 text-green-400">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
