"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, HelpCircle, Shield, Wallet, Award, MessageSquare } from "lucide-react"

import { Starfield } from "@/components/starfield"
import { GlassCard } from "@/components/glass-card"
import AceKatSupport from "@/components/support/ace-kat-support"
import type { SupportCategory, FaqItem } from "./types"
import Link from "next/link"

const supportCategories: SupportCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Learn how to create an account, connect your wallet, and explore the platform.",
    icon: <HelpCircle className="w-6 h-6 text-purple-400" />,
    color: "from-purple-500 to-blue-500",
  },
  {
    id: "wallet-help",
    title: "Wallet Help",
    description: "Troubleshooting wallet connections, supported chains, and balance issues.",
    icon: <Wallet className="w-6 h-6 text-blue-400" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "xp-quests",
    title: "XP & Quests",
    description: "How XP works, quest progress, level-ups, and rewards explained.",
    icon: <Award className="w-6 h-6 text-green-400" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "security",
    title: "Security & Safety",
    description: "Your safety is our galaxy's core. Learn about security best practices.",
    icon: <Shield className="w-6 h-6 text-red-400" />,
    color: "from-red-500 to-pink-500",
  },
  {
    id: "contact",
    title: "Contact ACE",
    description: "Can't find what you need? Reach out to our support crew or speak with Kat.",
    icon: <MessageSquare className="w-6 h-6 text-pink-400" />,
    color: "from-pink-500 to-purple-500",
  },
]

const popularQuestions: FaqItem[] = [
  {
    question: "How do I earn XP on ACE Exchange?",
    answer:
      "You can earn XP by trading, completing quests, participating in governance, and engaging with the ACE Kat. Each action awards different XP amounts based on complexity and value.",
    category: "xp-quests",
  },
  {
    question: "What wallets are supported?",
    answer:
      "ACE Exchange supports MetaMask, Coinbase Wallet, WalletConnect, Ledger, Phantom, and Trust Wallet. We're constantly adding support for more wallets.",
    category: "wallet-help",
  },
  {
    question: "How do I secure my account?",
    answer:
      "Enable 2FA, use a hardware wallet when possible, create a strong password, and never share your private keys or seed phrases with anyone, including ACE support.",
    category: "security",
  },
  {
    question: "What is the ACE Kat?",
    answer:
      "ACE Kat is your personal AI companion that helps you navigate the platform, provides trading insights, and makes your experience more engaging through personalized interactions.",
    category: "getting-started",
  },
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showKat, setShowKat] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredQuestions = searchQuery
    ? popularQuestions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : popularQuestions

  const filteredCategories = activeCategory
    ? supportCategories.filter((c) => c.id === activeCategory)
    : supportCategories

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Starfield starCount={300} />

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <motion.h1
          className="text-5xl font-bold text-center text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ACE Support
        </motion.h1>

        <motion.p
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your cosmic guide to navigating the ACE Exchange universe. Search for help or ask Kat directly.
        </motion.p>

        <motion.div
          className="mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Try "How do I earn XP?" or "Connect wallet issues"'
              className="w-full px-6 py-4 pl-12 text-lg text-white bg-white/10 backdrop-blur placeholder-gray-400 rounded-xl border border-white/10 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {searchQuery && filteredQuestions.length > 0 && (
            <div className="absolute z-20 w-full mt-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl shadow-xl overflow-hidden">
              {filteredQuestions.map((item, i) => (
                <div
                  key={i}
                  className="p-4 border-b border-white/10 hover:bg-white/5 cursor-pointer transition-colors"
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory(item.category)
                  }}
                >
                  <h3 className="font-medium text-purple-300">{item.question}</h3>
                  <p className="text-sm text-gray-400 truncate">{item.answer}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredCategories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <GlassCard
                className="h-full cursor-pointer group"
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              >
                <div className="flex items-start gap-4 p-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color} opacity-80`}>{category.icon}</div>
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {category.title}
                    </h2>
                    <p className="text-gray-300">{category.description}</p>

                    {activeCategory === category.id && (
                      <motion.div
                        className="mt-4 space-y-3"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        {popularQuestions
                          .filter((q) => q.category === category.id)
                          .map((faq, j) => (
                            <div key={j} className="border-t border-white/10 pt-3">
                              <h3 className="font-medium text-purple-300">{faq.question}</h3>
                              <p className="text-sm text-gray-400 mt-1">{faq.answer}</p>
                            </div>
                          ))}
                        <Link
                          href={`/support/${category.id}`}
                          className="inline-block mt-2 text-sm text-pink-400 hover:text-pink-300 transition-colors"
                        >
                          View all {category.title} articles →
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <button
            onClick={() => setShowKat(!showKat)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <span>Ask Kat Directly</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-xs">♠️</span>
            </div>
          </button>
        </motion.div>

        {showKat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <AceKatSupport onClose={() => setShowKat(false)} />
          </motion.div>
        )}

        <motion.div
          className="mt-20 text-center text-pink-400 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          "Confusion is just curiosity in disguise." – Kat ♠️
        </motion.div>
      </main>
    </div>
  )
}
