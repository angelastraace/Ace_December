"use client"

import { useParams, notFound } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronLeft, ThumbsUp, ThumbsDown, Copy, Volume2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Starfield } from "@/components/starfield"
import { GlassCard } from "@/components/glass-card"

// Mock data - in a real app, this would come from a CMS or API
const articleData = {
  "getting-started": {
    "create-account": {
      title: "How to Create an ACE Exchange Account",
      lastUpdated: "May 10, 2025",
      content: `
        <h2>Creating Your ACE Exchange Account</h2>
        <p>Welcome to ACE Exchange! This guide will walk you through the process of creating your account and getting started with our platform.</p>
        
        <h3>Step 1: Visit the ACE Exchange Website</h3>
        <p>Navigate to aceexchange.io and click on the "Sign Up" button in the top right corner of the homepage.</p>
        
        <h3>Step 2: Enter Your Information</h3>
        <p>Fill out the registration form with your email address and create a strong password. We recommend using a combination of letters, numbers, and special characters.</p>
        
        <h3>Step 3: Verify Your Email</h3>
        <p>Check your inbox for a verification email from ACE Exchange. Click the verification link to confirm your email address. If you don't see the email, check your spam folder.</p>
        
        <h3>Step 4: Complete Your Profile</h3>
        <p>Once your email is verified, you'll be prompted to complete your profile. Add your name and select your country of residence.</p>
        
        <h3>Step 5: Set Up Two-Factor Authentication</h3>
        <p>For enhanced security, we strongly recommend setting up two-factor authentication (2FA). You can use an authenticator app like Google Authenticator or Authy.</p>
        
        <h3>Step 6: Connect Your Wallet</h3>
        <p>To start trading, you'll need to connect a cryptocurrency wallet. Click on "Connect Wallet" and choose from our supported wallet options.</p>
        
        <h3>Step 7: Meet ACE Kat</h3>
        <p>Your personal AI assistant, ACE Kat, will guide you through the platform and help you get the most out of your experience. Don't hesitate to ask Kat any questions you might have!</p>
        
        <h2>Troubleshooting</h2>
        <p>If you encounter any issues during the registration process, try the following:</p>
        <ul>
          <li>Clear your browser cache and cookies</li>
          <li>Try using a different browser</li>
          <li>Disable any ad-blockers or VPNs temporarily</li>
          <li>Contact our support team if problems persist</li>
        </ul>
      `,
      relatedArticles: [
        { id: "connect-wallet", title: "Connecting Your Crypto Wallet" },
        { id: "platform-overview", title: "ACE Exchange Platform Overview" },
        { id: "first-trade", title: "Making Your First Trade" },
      ],
    },
    // Other articles would be defined here
  },
  // Other categories would be defined here
}

export default function ArticlePage() {
  const params = useParams()
  const categoryId = params?.category as string
  const articleId = params?.article as string

  const article = articleData[categoryId as keyof typeof articleData]?.[articleId as any]

  const [isHelpful, setIsHelpful] = useState<boolean | null>(null)
  const [isCopied, setIsCopied] = useState(false)
  const [isReading, setIsReading] = useState(false)

  if (!article) {
    notFound()
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const toggleReading = () => {
    if (isReading) {
      window.speechSynthesis.cancel()
      setIsReading(false)
    } else {
      const text = document.getElementById("article-content")?.textContent || ""
      const utterance = new SpeechSynthesis.utterance(text)
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
      setIsReading(true)
    }
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Starfield starCount={300} />

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        <Link
          href={`/support/${categoryId}`}
          className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors mb-8"
        >
          <ChevronLeft size={16} />
          <span>
            Back to{" "}
            {categoryId
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </span>
        </Link>

        <GlassCard className="overflow-hidden">
          <div className="p-8">
            <motion.h1
              className="text-3xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {article.title}
            </motion.h1>

            <motion.div
              className="flex justify-between items-center text-sm text-gray-400 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span>Last updated: {article.lastUpdated}</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={copyLink}
                  className="flex items-center gap-1 hover:text-purple-400 transition-colors"
                  aria-label="Copy article link"
                >
                  <Copy size={14} />
                  <span>{isCopied ? "Copied!" : "Copy link"}</span>
                </button>
                <button
                  onClick={toggleReading}
                  className={`flex items-center gap-1 ${isReading ? "text-purple-400" : "hover:text-purple-400"} transition-colors`}
                  aria-label={isReading ? "Stop reading" : "Read article aloud"}
                >
                  <Volume2 size={14} />
                  <span>{isReading ? "Stop reading" : "Read aloud"}</span>
                </button>
              </div>
            </motion.div>

            <motion.div
              id="article-content"
              className="prose prose-invert prose-purple max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <motion.div
              className="mt-12 pt-6 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-gray-300 mb-4">Was this article helpful?</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsHelpful(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    isHelpful === true
                      ? "bg-green-500/20 border-green-500 text-green-400"
                      : "border-white/10 hover:border-white/30 text-gray-300"
                  } transition-colors`}
                >
                  <ThumbsUp size={16} />
                  <span>Yes</span>
                </button>
                <button
                  onClick={() => setIsHelpful(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    isHelpful === false
                      ? "bg-red-500/20 border-red-500 text-red-400"
                      : "border-white/10 hover:border-white/30 text-gray-300"
                  } transition-colors`}
                >
                  <ThumbsDown size={16} />
                  <span>No</span>
                </button>
              </div>

              {isHelpful === false && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <p className="text-gray-300 mb-2">We're sorry this wasn't helpful. Would you like to:</p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/support/contact"
                      className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-purple-300 transition-colors"
                    >
                      Contact Support
                    </Link>
                    <button className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-purple-300 transition-colors">
                      Ask Kat
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {article.relatedArticles && article.relatedArticles.length > 0 && (
              <motion.div
                className="mt-12 pt-6 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Related Articles</h3>
                <ul className="space-y-2">
                  {article.relatedArticles.map((related) => (
                    <li key={related.id}>
                      <Link
                        href={`/support/${categoryId}/${related.id}`}
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        {related.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </GlassCard>
      </main>
    </div>
  )
}
