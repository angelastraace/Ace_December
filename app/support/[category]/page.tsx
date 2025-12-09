"use client"

import { Starfield } from "@/components/starfield"
import { useState } from "react"
import { useParams, notFound } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronLeft, Search } from "lucide-react"
import Link from "next/link"
import { GlassCard } from "@/components/glass-card"

// Mock data - in a real app, this would come from a CMS or API
const categoryData = {
  "getting-started": {
    title: "Getting Started",
    description: "Learn how to create an account, connect your wallet, and explore the platform.",
    color: "from-purple-500 to-blue-500",
    articles: [
      {
        id: "create-account",
        title: "How to Create an ACE Exchange Account",
        excerpt: "Step-by-step guide to creating and securing your ACE Exchange account.",
      },
      {
        id: "connect-wallet",
        title: "Connecting Your Crypto Wallet",
        excerpt: "Learn how to connect MetaMask, Coinbase Wallet, or other supported wallets.",
      },
      {
        id: "platform-overview",
        title: "ACE Exchange Platform Overview",
        excerpt: "A tour of the main features and sections of the ACE Exchange platform.",
      },
      {
        id: "first-trade",
        title: "Making Your First Trade",
        excerpt: "A beginner's guide to executing your first trade on ACE Exchange.",
      },
      {
        id: "ace-kat-intro",
        title: "Meet ACE Kat: Your AI Assistant",
        excerpt: "Introduction to ACE Kat and how it can enhance your trading experience.",
      },
    ],
  },
  "wallet-help": {
    title: "Wallet Help",
    description: "Troubleshooting wallet connections, supported chains, and balance issues.",
    color: "from-blue-500 to-cyan-500",
    articles: [
      {
        id: "supported-wallets",
        title: "Supported Wallets and Chains",
        excerpt: "List of all supported wallets and blockchain networks on ACE Exchange.",
      },
      {
        id: "connection-issues",
        title: "Troubleshooting Wallet Connection Issues",
        excerpt: "Common wallet connection problems and how to resolve them.",
      },
      {
        id: "balance-not-showing",
        title: "Why Isn't My Balance Showing?",
        excerpt: "Reasons why your balance might not be displaying correctly and how to fix it.",
      },
      {
        id: "gas-fees",
        title: "Understanding Gas Fees",
        excerpt: "Explanation of gas fees, how they work, and strategies to minimize them.",
      },
      {
        id: "wallet-security",
        title: "Wallet Security Best Practices",
        excerpt: "Essential security tips to keep your crypto wallet safe.",
      },
    ],
  },
  "xp-quests": {
    title: "XP & Quests",
    description: "How XP works, quest progress, level-ups, and rewards explained.",
    color: "from-green-500 to-emerald-500",
    articles: [
      {
        id: "xp-system",
        title: "The ACE XP System Explained",
        excerpt: "Comprehensive guide to how experience points work on ACE Exchange.",
      },
      {
        id: "quest-types",
        title: "Types of Quests and Rewards",
        excerpt: "Overview of different quest categories and their associated rewards.",
      },
      {
        id: "level-benefits",
        title: "Level-Up Benefits and Perks",
        excerpt: "What you unlock at each level and how it enhances your trading experience.",
      },
      {
        id: "xp-leaderboard",
        title: "XP Leaderboard and Competitions",
        excerpt: "How the leaderboard works and special XP competitions you can participate in.",
      },
      {
        id: "xp-boost",
        title: "XP Boost Strategies",
        excerpt: "Tips and strategies to maximize your XP earning potential.",
      },
    ],
  },
  security: {
    title: "Security & Safety",
    description: "Your safety is our galaxy's core. Learn about security best practices.",
    color: "from-red-500 to-pink-500",
    articles: [
      {
        id: "account-security",
        title: "Securing Your ACE Exchange Account",
        excerpt: "Essential steps to protect your account from unauthorized access.",
      },
      {
        id: "2fa-setup",
        title: "Setting Up Two-Factor Authentication",
        excerpt: "Step-by-step guide to enabling and using 2FA for enhanced security.",
      },
      {
        id: "phishing-prevention",
        title: "Recognizing and Avoiding Phishing Attempts",
        excerpt: "How to identify phishing scams targeting crypto users and stay safe.",
      },
      {
        id: "api-key-safety",
        title: "API Key Security Best Practices",
        excerpt: "Guidelines for creating, using, and protecting your API keys.",
      },
      {
        id: "security-audit",
        title: "Performing a Security Audit",
        excerpt: "How to conduct a personal security audit of your crypto accounts.",
      },
    ],
  },
  contact: {
    title: "Contact ACE",
    description: "Can't find what you need? Reach out to our support crew or speak with Kat.",
    color: "from-pink-500 to-purple-500",
    articles: [
      {
        id: "support-ticket",
        title: "Creating a Support Ticket",
        excerpt: "How to submit a support ticket and what information to include.",
      },
      {
        id: "response-times",
        title: "Support Response Times",
        excerpt: "Expected response times for different types of support inquiries.",
      },
      {
        id: "live-chat",
        title: "Using Live Chat Support",
        excerpt: "How to access and use the live chat feature for immediate assistance.",
      },
      {
        id: "bug-reporting",
        title: "Reporting Bugs and Issues",
        excerpt: "The proper way to report bugs and technical issues you encounter.",
      },
      {
        id: "feedback",
        title: "Providing Feedback and Suggestions",
        excerpt: "How to share your ideas and feedback to help improve ACE Exchange.",
      },
    ],
  },
}

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params?.category as string
  const category = categoryData[categoryId as keyof typeof categoryData]

  const [searchQuery, setSearchQuery] = useState("")

  if (!category) {
    notFound()
  }

  const filteredArticles = searchQuery
    ? category.articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : category.articles

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Starfield starCount={300} />

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <Link
          href="/support"
          className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors mb-8"
        >
          <ChevronLeft size={16} />
          <span>Back to Support Hub</span>
        </Link>

        <motion.h1
          className={`text-5xl font-bold text-center text-transparent bg-gradient-to-r ${category.color} bg-clip-text mb-4`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {category.title}
        </motion.h1>

        <motion.p
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {category.description}
        </motion.p>

        <motion.div
          className="mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${category.title} articles...`}
              className="w-full px-6 py-4 pl-12 text-lg text-white bg-white/10 backdrop-blur placeholder-gray-400 rounded-xl border border-white/10 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>

        <div className="space-y-6">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <GlassCard className="cursor-pointer hover:shadow-lg hover:shadow-purple-500/10 transition-all">
                  <Link href={`/support/${categoryId}/${article.id}`} className="block p-6">
                    <h2 className="text-xl font-semibold text-white hover:text-purple-300 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-300 mt-2">{article.excerpt}</p>
                    <p className="text-sm text-purple-400 mt-4">Read article →</p>
                  </Link>
                </GlassCard>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">No articles found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
