"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Download, Eye, Sparkles, Award, TrendingUp, BookOpen, Landmark, Swords } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface IdResumeBuilderProps {
  userData: any
}

export default function IdResumeBuilder({ userData }: IdResumeBuilderProps) {
  const [includeTrading, setIncludeTrading] = useState(true)
  const [includeLearning, setIncludeLearning] = useState(true)
  const [includeGovernance, setIncludeGovernance] = useState(true)
  const [includeArena, setIncludeArena] = useState(true)
  const [includeBadges, setIncludeBadges] = useState(true)
  const [includeActivity, setIncludeActivity] = useState(true)

  return (
    <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Crypto Resume Builder</CardTitle>
        <CardDescription className="text-gray-400">
          Create a professional resume showcasing your on-chain achievements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="customize" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900">
            <TabsTrigger value="customize">Customize</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="customize" className="mt-6 space-y-6">
            <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
              <h3 className="font-medium text-white">Select Resume Sections</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    <Label htmlFor="include-trading" className="text-sm text-gray-300">
                      Trading Experience
                    </Label>
                  </div>
                  <Switch
                    id="include-trading"
                    checked={includeTrading}
                    onCheckedChange={setIncludeTrading}
                    className="data-[state=checked]:bg-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-purple-400" />
                    <Label htmlFor="include-learning" className="text-sm text-gray-300">
                      Learning & Certifications
                    </Label>
                  </div>
                  <Switch
                    id="include-learning"
                    checked={includeLearning}
                    onCheckedChange={setIncludeLearning}
                    className="data-[state=checked]:bg-purple-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Landmark className="h-4 w-4 text-green-400" />
                    <Label htmlFor="include-governance" className="text-sm text-gray-300">
                      Governance Participation
                    </Label>
                  </div>
                  <Switch
                    id="include-governance"
                    checked={includeGovernance}
                    onCheckedChange={setIncludeGovernance}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Swords className="h-4 w-4 text-red-400" />
                    <Label htmlFor="include-arena" className="text-sm text-gray-300">
                      Arena Performance
                    </Label>
                  </div>
                  <Switch
                    id="include-arena"
                    checked={includeArena}
                    onCheckedChange={setIncludeArena}
                    className="data-[state=checked]:bg-red-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-amber-400" />
                    <Label htmlFor="include-badges" className="text-sm text-gray-300">
                      Badges & Achievements
                    </Label>
                  </div>
                  <Switch
                    id="include-badges"
                    checked={includeBadges}
                    onCheckedChange={setIncludeBadges}
                    className="data-[state=checked]:bg-amber-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-teal-400" />
                    <Label htmlFor="include-activity" className="text-sm text-gray-300">
                      Recent Activity
                    </Label>
                  </div>
                  <Switch
                    id="include-activity"
                    checked={includeActivity}
                    onCheckedChange={setIncludeActivity}
                    className="data-[state=checked]:bg-teal-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="default" className="bg-teal-500 text-white hover:bg-teal-600">
                Save Settings
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <div className="rounded-lg border border-gray-800 bg-white p-6 text-black">
              <div className="mb-6 border-b border-gray-200 pb-4">
                <h1 className="text-2xl font-bold">{userData.username}</h1>
                <p className="text-gray-600">Crypto Trader & DeFi Enthusiast</p>
                <div className="mt-2 flex items-center">
                  <Badge className="mr-2 bg-teal-100 text-teal-800">
                    {userData.tier} Tier • {userData.xp.toLocaleString()} XP
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">Trust Score: {userData.trustScore}/100</Badge>
                </div>
              </div>

              {includeTrading && (
                <div className="mb-4">
                  <h2 className="flex items-center text-lg font-semibold">
                    <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
                    Trading Experience
                  </h2>
                  <div className="mt-2">
                    <p className="text-gray-700">
                      <strong>Trading Score:</strong> {userData.reputation.trade}/100
                    </p>
                    <p className="mt-1 text-gray-600">
                      Experienced in spot and futures trading with a focus on technical analysis and risk management.
                    </p>
                  </div>
                </div>
              )}

              {includeLearning && (
                <div className="mb-4">
                  <h2 className="flex items-center text-lg font-semibold">
                    <BookOpen className="mr-2 h-5 w-5 text-purple-500" />
                    Learning & Certifications
                  </h2>
                  <div className="mt-2">
                    <p className="text-gray-700">
                      <strong>Learning Score:</strong> {userData.reputation.learn}/100
                    </p>
                    <p className="mt-1 text-gray-600">
                      Completed multiple educational modules on blockchain technology, DeFi fundamentals, and technical
                      analysis.
                    </p>
                  </div>
                </div>
              )}

              {includeGovernance && (
                <div className="mb-4">
                  <h2 className="flex items-center text-lg font-semibold">
                    <Landmark className="mr-2 h-5 w-5 text-green-500" />
                    Governance Participation
                  </h2>
                  <div className="mt-2">
                    <p className="text-gray-700">
                      <strong>Governance Score:</strong> {userData.reputation.vote}/100
                    </p>
                    <p className="mt-1 text-gray-600">
                      Active participant in DAO governance with a history of voting on key protocol decisions.
                    </p>
                  </div>
                </div>
              )}

              {includeArena && (
                <div className="mb-4">
                  <h2 className="flex items-center text-lg font-semibold">
                    <Swords className="mr-2 h-5 w-5 text-red-500" />
                    Arena Performance
                  </h2>
                  <div className="mt-2">
                    <p className="text-gray-700">
                      <strong>Arena Score:</strong> {userData.reputation.arena}/100
                    </p>
                    <p className="mt-1 text-gray-600">
                      Competitive trader with multiple victories in trading competitions and prediction markets.
                    </p>
                  </div>
                </div>
              )}

              {includeBadges && (
                <div className="mb-4">
                  <h2 className="flex items-center text-lg font-semibold">
                    <Award className="mr-2 h-5 w-5 text-amber-500" />
                    Badges & Achievements
                  </h2>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {userData.badges.slice(0, 4).map((badge: any) => (
                      <div key={badge.id} className="rounded-md border border-gray-200 p-2">
                        <p className="font-medium text-gray-800">{badge.name}</p>
                        <p className="text-sm text-gray-600">{badge.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {includeActivity && (
                <div className="mb-4">
                  <h2 className="flex items-center text-lg font-semibold">
                    <Sparkles className="mr-2 h-5 w-5 text-teal-500" />
                    Recent Activity
                  </h2>
                  <div className="mt-2">
                    <ul className="space-y-1 text-gray-600">
                      {userData.recentActivity.slice(0, 3).map((activity: any) => (
                        <li key={activity.id} className="flex items-center">
                          <span className="mr-2 text-xs">•</span>
                          {activity.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-6 text-center text-xs text-gray-500">
                <p>Verified on-chain credentials via ACE Exchange • Generated on {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Eye className="mr-2 h-4 w-4" />
                Full Preview
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="export" className="mt-6">
            <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
              <h3 className="font-medium text-white">Export Options</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Download className="mr-2 h-4 w-4" />
                  Download as PDF
                </Button>

                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Download className="mr-2 h-4 w-4" />
                  Download as Image
                </Button>

                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Download className="mr-2 h-4 w-4" />
                  Download as JSON
                </Button>

                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Download className="mr-2 h-4 w-4" />
                  Download for LinkedIn
                </Button>
              </div>

              <div className="mt-4 rounded-md bg-gray-800 p-3 text-sm text-gray-400">
                <p>
                  Your resume includes verifiable credentials that can be independently verified on-chain. Recipients
                  can scan the QR code or use the verification link to confirm the authenticity of your achievements.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
