"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Paperclip, Mic, ImageIcon } from "lucide-react"
import { GlassCard } from "@/components/glass-card"

interface Message {
  id: string
  text: string
  sender: "user" | "kat"
  timestamp: Date
}

interface AceKatSupportProps {
  onClose: () => void
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hi there! I'm ACE Kat, your cosmic support assistant. How can I help you today?",
    sender: "kat",
    timestamp: new Date(),
  },
]

const suggestedQuestions = [
  "How do I connect my wallet?",
  "Where can I find my XP balance?",
  "How do I stake my tokens?",
  "What are the trading fees?",
]

export default function AceKatSupport({ onClose }: AceKatSupportProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showSuggestions, setShowSuggestions] = useState(true)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (text: string = input) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setShowSuggestions(false)
    setIsTyping(true)

    // Simulate Kat typing
    setTimeout(() => {
      // Add Kat response
      const katResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getKatResponse(text),
        sender: "kat",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, katResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getKatResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("wallet") || lowerQuestion.includes("connect")) {
      return "To connect your wallet, click on the 'Connect Wallet' button in the top right corner of the page. We support MetaMask, Coinbase Wallet, WalletConnect, and several other popular wallets."
    }

    if (lowerQuestion.includes("xp") || lowerQuestion.includes("experience") || lowerQuestion.includes("points")) {
      return "Your XP balance can be found on your profile page. You earn XP by trading, completing quests, participating in governance, and interacting with various features of the platform."
    }

    if (lowerQuestion.includes("stake") || lowerQuestion.includes("staking")) {
      return "To stake your tokens, navigate to the Earn > Staking page. There you can select which tokens you want to stake and for how long. Different staking periods offer different APY rates."
    }

    if (lowerQuestion.includes("fee") || lowerQuestion.includes("fees") || lowerQuestion.includes("trading fee")) {
      return "Our trading fees start at 0.1% and decrease based on your trading volume and XP level. You can view the complete fee schedule on our Fees page."
    }

    return "I'm not sure I understand that question. Could you try rephrasing it, or select one of the suggested questions below?"
  }

  return (
    <GlassCard className="w-[380px] h-[500px] flex flex-col overflow-hidden">
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white">♠️</span>
          </div>
          <div>
            <h3 className="font-medium text-white">ACE Kat</h3>
            <p className="text-xs text-gray-300">Cosmic Support Assistant</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white"
                  : "bg-white/10 text-gray-200"
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-white/10 p-3 rounded-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <AnimatePresence>
        {showSuggestions && messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pb-3"
          >
            <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(question)}
                  className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-purple-300 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your question..."
            className="flex-1 bg-white/10 border border-white/10 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="flex justify-center mt-2 space-x-4">
          <button className="text-gray-400 hover:text-purple-400 transition-colors">
            <Paperclip size={16} />
          </button>
          <button className="text-gray-400 hover:text-purple-400 transition-colors">
            <Mic size={16} />
          </button>
          <button className="text-gray-400 hover:text-purple-400 transition-colors">
            <ImageIcon size={16} />
          </button>
        </div>
      </div>
    </GlassCard>
  )
}
