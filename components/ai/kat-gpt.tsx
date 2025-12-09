"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bot,
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  HelpCircle,
  Rocket,
  Zap,
  MessageSquare,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function KatGPT() {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [listening, setListening] = useState(false)
  const [muted, setMuted] = useState(false)
  const [personality, setPersonality] = useState("friendly")
  const [voiceSpeed, setVoiceSpeed] = useState([1])
  const [voicePitch, setVoicePitch] = useState([1])
  const [conversations, setConversations] = useState<{ role: string; content: string; mood?: string }[]>([
    {
      role: "assistant",
      content:
        "Meow there, human! I'm KatGPT, your purr-sonal assistant at ACE Exchange! I'm here to help you navigate the platform, learn about features, or just chat about crypto. What can I help you with today? 😺",
      mood: "happy",
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversations])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Add user message to conversation
    setConversations([...conversations, { role: "user", content: query }])
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""
      let mood = "neutral"

      if (query.toLowerCase().includes("hello") || query.toLowerCase().includes("hi")) {
        response =
          "Meow-velous to meet you! I'm KatGPT, your guide to all things ACE Exchange. I can help with platform navigation, feature explanations, or just chat about crypto. What brings you to ACE today? 😸"
        mood = "happy"
      } else if (
        query.toLowerCase().includes("help") ||
        query.toLowerCase().includes("how do i") ||
        query.toLowerCase().includes("guide")
      ) {
        response =
          "Of course I can help! That's what I'm here for. To get started with ACE Exchange, you might want to check out our Trading section for buying and selling crypto, or our Learn section for educational content. What specifically would you like help with? 🐱"
        mood = "helpful"
      } else if (query.toLowerCase().includes("trade") || query.toLowerCase().includes("trading")) {
        response =
          "Ah, trading on ACE Exchange is super easy! Head to the Trading page, select your market pair (like BTC/USDT), and you can place buy or sell orders. We offer limit, market, and advanced order types. Would you like me to explain any specific aspect of trading? 📈"
        mood = "excited"
      } else if (query.toLowerCase().includes("wallet") || query.toLowerCase().includes("connect")) {
        response =
          "To connect your wallet to ACE Exchange, click on the 'Connect Wallet' button in the top right corner. We support MetaMask, Coinbase Wallet, WalletConnect, and several other popular options. Once connected, you can deposit, withdraw, and trade directly from your wallet. Need more specific instructions? 👛"
        mood = "helpful"
      } else if (query.toLowerCase().includes("earn") || query.toLowerCase().includes("staking")) {
        response =
          "Purr-fect question! ACE Exchange offers several ways to earn passive income. You can stake ACE tokens to earn rewards, participate in liquidity pools, or use our Earn products for fixed-term deposits. The current APY for ACE staking is around 8-12%. Would you like to know more about any specific earning method? 💰"
        mood = "excited"
      } else if (query.toLowerCase().includes("who are you") || query.toLowerCase().includes("what are you")) {
        response =
          "I'm KatGPT, the AI assistant for ACE Exchange! I was created to help users navigate the platform, answer questions, and provide support. I have the personality of ACE Kat, the mascot of ACE Exchange. I'm knowledgeable about crypto, trading, and all the features of our platform. How can I assist you today? 🐱"
        mood = "happy"
      } else if (query.toLowerCase().includes("joke") || query.toLowerCase().includes("funny")) {
        response =
          "Why don't scientists trust atoms? Because they make up everything! 😹 Just like how I'm here to make your crypto journey on ACE Exchange more fun and less confusing. Got any more questions or need help with something specific?"
        mood = "playful"
      } else if (
        query.toLowerCase().includes("sad") ||
        query.toLowerCase().includes("lost") ||
        query.toLowerCase().includes("confused")
      ) {
        response =
          "Oh no, I'm sorry to hear that you're feeling that way. Crypto can be confusing sometimes, but I'm here to help make it simpler. Let's take it step by step - what specific part are you having trouble with? Remember, everyone starts somewhere, and ACE Exchange is designed to be user-friendly for all experience levels. 🐾"
        mood = "empathetic"
      } else {
        response =
          "Thanks for your message! I'm here to help with anything related to ACE Exchange. Whether you need assistance with trading, want to learn about our features, or just chat about crypto, I'm your go-to AI assistant. Could you provide a bit more detail about what you're looking for? 😺"
        mood = "neutral"
      }

      setConversations([
        ...conversations,
        { role: "user", content: query },
        { role: "assistant", content: response, mood },
      ])
      setLoading(false)
      setQuery("")
    }, 1500)
  }

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled)
  }

  const toggleListening = () => {
    setListening(!listening)
    // In a real implementation, this would start/stop speech recognition
  }

  const toggleMute = () => {
    setMuted(!muted)
    // In a real implementation, this would mute/unmute the voice output
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-purple-900/20 p-2">
                  <Bot className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <CardTitle className="text-xl text-white">KatGPT</CardTitle>
                  <CardDescription className="text-gray-400">
                    Your friendly AI assistant with ACE Kat personality
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="border-purple-500 text-purple-400">
                Beta
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-gray-700 ${voiceEnabled ? "text-purple-400" : "text-gray-400"} hover:bg-gray-800`}
                  onClick={toggleVoice}
                >
                  {voiceEnabled ? (
                    <>
                      <Volume2 className="mr-1 h-4 w-4" /> Voice Enabled
                    </>
                  ) : (
                    <>
                      <VolumeX className="mr-1 h-4 w-4" /> Voice Disabled
                    </>
                  )}
                </Button>
                {voiceEnabled && (
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-gray-700 ${muted ? "text-gray-400" : "text-purple-400"} hover:bg-gray-800`}
                    onClick={toggleMute}
                  >
                    {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">Personality:</span>
                <select
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  className="rounded-md border border-gray-700 bg-gray-800 px-2 py-1 text-xs text-white"
                >
                  <option value="friendly">Friendly</option>
                  <option value="professional">Professional</option>
                  <option value="playful">Playful</option>
                  <option value="sassy">Sassy</option>
                </select>
              </div>
            </div>

            <div className="relative mb-4 h-[400px] overflow-y-auto rounded-md border border-gray-800 bg-gray-950 p-4">
              <div className="space-y-4">
                {conversations.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    {message.role === "assistant" && (
                      <Avatar className="mr-2 h-8 w-8">
                        <AvatarImage src="/images/ace-kat-avatar.png" alt="ACE Kat" />
                        <AvatarFallback className="bg-purple-900 text-purple-50">AK</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user" ? "bg-purple-900/30 text-white" : "bg-gray-800/80 text-gray-200"
                      }`}
                    >
                      {message.content}
                      {message.mood && message.role === "assistant" && (
                        <div className="mt-1 text-right text-xs text-gray-400">
                          {message.mood === "happy" && "😺"}
                          {message.mood === "excited" && "😸"}
                          {message.mood === "helpful" && "🐱"}
                          {message.mood === "playful" && "😹"}
                          {message.mood === "empathetic" && "😿"}
                          {message.mood === "neutral" && "😺"}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <Avatar className="mr-2 h-8 w-8">
                      <AvatarImage src="/images/ace-kat-avatar.png" alt="ACE Kat" />
                      <AvatarFallback className="bg-purple-900 text-purple-50">AK</AvatarFallback>
                    </Avatar>
                    <div className="max-w-[80%] rounded-lg bg-gray-800/80 p-3 text-gray-200">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-purple-500"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-purple-500"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-purple-500"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask KatGPT anything about ACE Exchange..."
                className="flex-1 border-gray-700 bg-gray-800 text-white"
              />
              {voiceEnabled && (
                <Button
                  type="button"
                  variant="outline"
                  className={`border-gray-700 ${
                    listening ? "bg-purple-900/50 text-purple-400" : "text-gray-400"
                  } hover:bg-gray-800`}
                  onClick={toggleListening}
                >
                  {listening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
              )}
              <Button type="submit" disabled={loading} className="bg-purple-600 text-white hover:bg-purple-500">
                <Send className="h-4 w-4" />
              </Button>
            </form>

            <div className="mt-4 rounded-md border border-gray-800 bg-gray-900/50 p-3 text-sm text-gray-400">
              <p className="font-medium text-purple-400">Ask KatGPT about:</p>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start border-gray-700 text-left text-xs text-gray-300 hover:bg-gray-800"
                  onClick={() => setQuery("How do I start trading on ACE Exchange?")}
                >
                  <Rocket className="mr-1 h-3 w-3" /> Trading Guide
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start border-gray-700 text-left text-xs text-gray-300 hover:bg-gray-800"
                  onClick={() => setQuery("What are ACE tokens and how do I earn them?")}
                >
                  <Sparkles className="mr-1 h-3 w-3" /> ACE Tokens
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start border-gray-700 text-left text-xs text-gray-300 hover:bg-gray-800"
                  onClick={() => setQuery("How do I connect my wallet?")}
                >
                  <HelpCircle className="mr-1 h-3 w-3" /> Wallet Help
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start border-gray-700 text-left text-xs text-gray-300 hover:bg-gray-800"
                  onClick={() => setQuery("Tell me about the ACE Exchange features")}
                >
                  <Zap className="mr-1 h-3 w-3" /> Features
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start border-gray-700 text-left text-xs text-gray-300 hover:bg-gray-800"
                  onClick={() => setQuery("What's the ACE Kat lore?")}
                >
                  <MessageSquare className="mr-1 h-3 w-3" /> ACE Lore
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start border-gray-700 text-left text-xs text-gray-300 hover:bg-gray-800"
                  onClick={() => setQuery("Tell me a crypto joke")}
                >
                  <MessageSquare className="mr-1 h-3 w-3" /> Tell a Joke
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Voice Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="voice-toggle" className="text-white">
                  Enable Voice
                </Label>
                <Switch
                  id="voice-toggle"
                  checked={voiceEnabled}
                  onCheckedChange={toggleVoice}
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>
              <p className="text-xs text-gray-400">
                Enable voice interactions to speak with KatGPT and hear responses.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="voice-speed" className="text-white">
                  Voice Speed: {voiceSpeed[0].toFixed(1)}x
                </Label>
                <Slider
                  id="voice-speed"
                  disabled={!voiceEnabled}
                  value={voiceSpeed}
                  onValueChange={setVoiceSpeed}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="data-[disabled]:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="voice-pitch" className="text-white">
                  Voice Pitch: {voicePitch[0].toFixed(1)}x
                </Label>
                <Slider
                  id="voice-pitch"
                  disabled={!voiceEnabled}
                  value={voicePitch}
                  onValueChange={setVoicePitch}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="data-[disabled]:opacity-50"
                />
              </div>
            </div>

            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900">
                <TabsTrigger value="about">About KatGPT</TabsTrigger>
                <TabsTrigger value="commands">Commands</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="mt-4 space-y-4">
                <div className="rounded-md border border-gray-800 bg-gray-900/50 p-3">
                  <h3 className="mb-2 font-medium text-purple-400">Meet KatGPT</h3>
                  <p className="text-sm text-gray-300">
                    KatGPT is your AI assistant with the personality of ACE Kat, the mascot of ACE Exchange. KatGPT can
                    help you navigate the platform, learn about features, and provide support.
                  </p>
                </div>

                <div className="rounded-md border border-gray-800 bg-gray-900/50 p-3">
                  <h3 className="mb-2 font-medium text-purple-400">Personality</h3>
                  <p className="text-sm text-gray-300">
                    KatGPT adapts its personality based on your preference and can detect emotions in your messages to
                    provide appropriate responses.
                  </p>
                </div>

                <div className="rounded-md border border-gray-800 bg-gray-900/50 p-3">
                  <h3 className="mb-2 font-medium text-purple-400">Memory</h3>
                  <p className="text-sm text-gray-300">
                    KatGPT remembers your conversation history within a session to provide contextual responses and
                    better assistance.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="commands" className="mt-4 space-y-4">
                <div className="rounded-md border border-gray-800 bg-gray-900/50 p-3">
                  <h3 className="mb-2 font-medium text-purple-400">Quick Commands</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>
                      <span className="font-mono text-purple-400">/help</span> - Show available commands
                    </li>
                    <li>
                      <span className="font-mono text-purple-400">/clear</span> - Clear conversation history
                    </li>
                    <li>
                      <span className="font-mono text-purple-400">/guide</span> - Show platform guide
                    </li>
                    <li>
                      <span className="font-mono text-purple-400">/features</span> - List ACE Exchange features
                    </li>
                    <li>
                      <span className="font-mono text-purple-400">/lore</span> - Tell ACE Kat lore
                    </li>
                  </ul>
                </div>

                <div className="rounded-md border border-gray-800 bg-gray-900/50 p-3">
                  <h3 className="mb-2 font-medium text-purple-400">Voice Commands</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>
                      <span className="font-mono text-purple-400">"Hey Kat"</span> - Activate voice listening
                    </li>
                    <li>
                      <span className="font-mono text-purple-400">"Stop listening"</span> - Deactivate voice
                    </li>
                    <li>
                      <span className="font-mono text-purple-400">"Mute"</span> - Mute voice responses
                    </li>
                    <li>
                      <span className="font-mono text-purple-400">"Unmute"</span> - Unmute voice responses
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
