"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Bot, Loader2 } from "lucide-react"

export default function AICopilot() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversation, setConversation] = useState([
    {
      role: "assistant",
      content: "Hello Administrator! I'm your AI Copilot. How can I assist you with platform management today?",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Add user message to conversation
    setConversation([...conversation, { role: "user", content: query }])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response
      if (query.toLowerCase().includes("user")) {
        response =
          "I've analyzed user activity patterns. We've seen a 15% increase in new user registrations this week, with most coming from social media referrals. The most active demographic is 25-34 year olds. Would you like me to prepare a detailed report?"
      } else if (query.toLowerCase().includes("trading")) {
        response =
          "Trading volume is up 8% compared to last week. The BTC/USDT pair remains the most popular. I've detected an unusual spike in SOL trading - this might be related to recent protocol updates. Should I monitor this trend more closely?"
      } else if (query.toLowerCase().includes("system") || query.toLowerCase().includes("performance")) {
        response =
          "System performance metrics look good. Average API response time is 120ms, down 10ms from yesterday. Database load is at 42% capacity. No security incidents detected in the last 24 hours. All critical services are operating normally."
      } else {
        response =
          "I understand you're asking about " +
          query +
          ". I can help analyze this data, generate reports, or suggest optimization strategies. What specific information would be most helpful for your administrative tasks?"
      }

      setConversation([...conversation, { role: "user", content: query }, { role: "assistant", content: response }])
      setIsLoading(false)
      setQuery("")
    }, 1500)
  }

  return (
    <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-purple-900/30 p-1">
              <Sparkles className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-white">AI Copilot</CardTitle>
              <CardDescription>Your intelligent platform management assistant</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="border-purple-500/30 bg-purple-900/10 text-purple-400">
            Administrator Mode
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 h-[180px] overflow-y-auto rounded-md border border-gray-800 bg-gray-950 p-4">
          <div className="space-y-4">
            {conversation.map((message, index) => (
              <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "assistant" ? "bg-gray-800 text-gray-100" : "bg-purple-900/20 text-purple-100"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="mb-1 flex items-center">
                      <Bot className="mr-1 h-3 w-3 text-purple-400" />
                      <span className="text-xs font-medium text-purple-400">AI Copilot</span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg bg-gray-800 px-4 py-2 text-gray-100">
                  <div className="mb-1 flex items-center">
                    <Bot className="mr-1 h-3 w-3 text-purple-400" />
                    <span className="text-xs font-medium text-purple-400">AI Copilot</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                    <p className="text-sm text-gray-400">Analyzing data...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input placeholder="Ask AI Copilot..." />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>Send</>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
