"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, TrendingUp, Sparkles, Lightbulb, Zap, BookOpen } from "lucide-react"
import TradeGPT from "@/components/ai/trade-gpt"
import KatGPT from "@/components/ai/kat-gpt"
import SmartAdvisor from "@/components/ai/smart-advisor"
import AIWizard from "@/components/ai/ai-wizard"
import AIContentGenerator from "@/components/ai/ai-content-generator"
import TradePatternRecognizer from "@/components/ai/trade-pattern-recognizer"

export default function AIHub() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-[#001219]">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container absolute inset-0 z-0">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">ACE AI Systems</h1>
          <p className="text-xl text-gray-400">
            Intelligent automation and AI-driven assistance across the ACE Exchange platform
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tradegpt">TradeGPT</TabsTrigger>
            <TabsTrigger value="katgpt">KatGPT</TabsTrigger>
            <TabsTrigger value="advisor">Smart Advisor</TabsTrigger>
            <TabsTrigger value="wizard">AI Wizard</TabsTrigger>
            <TabsTrigger value="tools">AI Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* TradeGPT Card */}
              <Card className="border-gray-800 bg-black/40 backdrop-blur-sm transition-all hover:border-teal-900 hover:shadow-lg hover:shadow-teal-900/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-full bg-teal-900/20 p-2">
                      <TrendingUp className="h-6 w-6 text-teal-500" />
                    </div>
                    <CardTitle className="text-xl text-white">TradeGPT</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">
                    AI-powered market analysis and trend prediction
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-300">
                    Get real-time insights on market trends, price movements, and trading opportunities with our
                    advanced AI model.
                  </p>
                  <button
                    onClick={() => setActiveTab("tradegpt")}
                    className="w-full rounded-md bg-teal-600 py-2 text-sm font-medium text-black transition-colors hover:bg-teal-500"
                  >
                    Explore TradeGPT
                  </button>
                </CardContent>
              </Card>

              {/* KatGPT Card */}
              <Card className="border-gray-800 bg-black/40 backdrop-blur-sm transition-all hover:border-purple-900 hover:shadow-lg hover:shadow-purple-900/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-full bg-purple-900/20 p-2">
                      <Bot className="h-6 w-6 text-purple-500" />
                    </div>
                    <CardTitle className="text-xl text-white">KatGPT</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">
                    Your friendly AI assistant with ACE Kat personality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-300">
                    Chat with KatGPT for platform support, daily tips, hidden features, and engage with the ACE Exchange
                    lore.
                  </p>
                  <button
                    onClick={() => setActiveTab("katgpt")}
                    className="w-full rounded-md bg-purple-600 py-2 text-sm font-medium text-black transition-colors hover:bg-purple-500"
                  >
                    Chat with KatGPT
                  </button>
                </CardContent>
              </Card>

              {/* Smart Advisor Card */}
              <Card className="border-gray-800 bg-black/40 backdrop-blur-sm transition-all hover:border-blue-900 hover:shadow-lg hover:shadow-blue-900/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-full bg-blue-900/20 p-2">
                      <Sparkles className="h-6 w-6 text-blue-500" />
                    </div>
                    <CardTitle className="text-xl text-white">Smart Advisor</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">
                    Personalized portfolio recommendations based on your profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-300">
                    Get tailored investment strategies based on your risk appetite, goals, and market conditions.
                  </p>
                  <button
                    onClick={() => setActiveTab("advisor")}
                    className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-black transition-colors hover:bg-blue-500"
                  >
                    Get Recommendations
                  </button>
                </CardContent>
              </Card>

              {/* AI Wizard Card */}
              <Card className="border-gray-800 bg-black/40 backdrop-blur-sm transition-all hover:border-amber-900 hover:shadow-lg hover:shadow-amber-900/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-full bg-amber-900/20 p-2">
                      <Lightbulb className="h-6 w-6 text-amber-500" />
                    </div>
                    <CardTitle className="text-xl text-white">AI Wizard</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">Guided onboarding for new users</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-300">
                    Let our AI Wizard guide you through the platform, set up your preferences, and help you get started.
                  </p>
                  <button
                    onClick={() => setActiveTab("wizard")}
                    className="w-full rounded-md bg-amber-600 py-2 text-sm font-medium text-black transition-colors hover:bg-amber-500"
                  >
                    Start Onboarding
                  </button>
                </CardContent>
              </Card>

              {/* AI Content Generator Card */}
              <Card className="border-gray-800 bg-black/40 backdrop-blur-sm transition-all hover:border-green-900 hover:shadow-lg hover:shadow-green-900/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-full bg-green-900/20 p-2">
                      <BookOpen className="h-6 w-6 text-green-500" />
                    </div>
                    <CardTitle className="text-xl text-white">AI Content Generator</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">
                    Generate educational content for ACE Learn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-300">
                    Create quizzes, articles, and educational summaries with our AI-powered content generator.
                  </p>
                  <button
                    onClick={() => setActiveTab("tools")}
                    className="w-full rounded-md bg-green-600 py-2 text-sm font-medium text-black transition-colors hover:bg-green-500"
                  >
                    Generate Content
                  </button>
                </CardContent>
              </Card>

              {/* Trade Pattern Recognizer Card */}
              <Card className="border-gray-800 bg-black/40 backdrop-blur-sm transition-all hover:border-red-900 hover:shadow-lg hover:shadow-red-900/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-full bg-red-900/20 p-2">
                      <Zap className="h-6 w-6 text-red-500" />
                    </div>
                    <CardTitle className="text-xl text-white">Pattern Recognizer</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">
                    Identify trading patterns and market signals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-300">
                    Detect candlestick patterns, volume shifts, and breakout signals with our AI pattern recognizer.
                  </p>
                  <button
                    onClick={() => setActiveTab("tools")}
                    className="w-full rounded-md bg-red-600 py-2 text-sm font-medium text-black transition-colors hover:bg-red-500"
                  >
                    Analyze Patterns
                  </button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tradegpt" className="mt-6">
            <TradeGPT />
          </TabsContent>

          <TabsContent value="katgpt" className="mt-6">
            <KatGPT />
          </TabsContent>

          <TabsContent value="advisor" className="mt-6">
            <SmartAdvisor />
          </TabsContent>

          <TabsContent value="wizard" className="mt-6">
            <AIWizard />
          </TabsContent>

          <TabsContent value="tools" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <AIContentGenerator />
              <TradePatternRecognizer />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
