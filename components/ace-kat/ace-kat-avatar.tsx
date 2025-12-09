"use client"

import { useState, useEffect } from "react"
import { KatMoodEngine, type KatMood, type KatContext } from "@/components/ace-kat/kat-mood-engine"

interface AceKatAvatarProps {
  context?: KatContext
  onQuoteChange?: (quote: string) => void
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  className?: string
}

export default function AceKatAvatar({
  context = "greeting",
  onQuoteChange,
  size = "md",
  interactive = true,
  className = "",
}: AceKatAvatarProps) {
  const [mood, setMood] = useState<KatMood>("neutral")
  const [message, setMessage] = useState<string | undefined>(undefined)

  // Generate contextual quotes based on context and mood
  useEffect(() => {
    const quotes: Record<KatContext, string[]> = {
      greeting: [
        "Welcome to the Dreamstate. Your journey begins here.",
        "The stars align for your arrival. What shall we explore today?",
        "Cosmic greetings! The universe awaits your next move.",
      ],
      trading: [
        "I sense market patterns forming. Let's analyze them together.",
        "Trading is like stargazing - patterns emerge when you know where to look.",
        "The flow of assets creates ripples across the cosmic markets.",
      ],
      learning: [
        "Knowledge is the true currency of the universe.",
        "Every lesson learned is a star added to your constellation.",
        "The more you learn, the brighter your cosmic signature becomes.",
      ],
      questing: [
        "Adventure awaits! Which quest shall we embark on today?",
        "Quests are the pathways to new dimensions of experience.",
        "Each quest completed strengthens your connection to the Dreamstate.",
      ],
      governance: [
        "Your voice shapes the future of our cosmic community.",
        "Governance is the gravitational force that binds our universe together.",
        "Your vote is a powerful force in the cosmic balance.",
      ],
      meditation: [
        "Let your mind drift among the stars...",
        "In the silence between thoughts, cosmic wisdom emerges.",
        "Breathe in stardust, exhale clarity.",
      ],
      achievement: [
        "Congratulations! Your constellation grows brighter with each achievement.",
        "Another milestone reached on your cosmic journey!",
        "Your accomplishments ripple through the Dreamstate, inspiring others.",
      ],
      idle: [
        "The cosmos is patient. I'll be here when you're ready.",
        "Sometimes the most profound discoveries happen in moments of stillness.",
        "I wonder what patterns are forming in the digital nebula today...",
      ],
    }

    // Select a random quote based on context
    const contextQuotes = quotes[context] || quotes.greeting
    const randomQuote = contextQuotes[Math.floor(Math.random() * contextQuotes.length)]

    setMessage(randomQuote)
    if (onQuoteChange) onQuoteChange(randomQuote)

    // Set a timer to change quotes periodically if in idle mode
    if (context === "idle") {
      const timer = setTimeout(() => {
        const newQuote = contextQuotes[Math.floor(Math.random() * contextQuotes.length)]
        setMessage(newQuote)
        if (onQuoteChange) onQuoteChange(newQuote)
      }, 30000) // Change quote every 30 seconds in idle mode

      return () => clearTimeout(timer)
    }
  }, [context, onQuoteChange])

  // Handle mood changes
  const handleMoodChange = (newMood: KatMood) => {
    setMood(newMood)
  }

  return (
    <div className={`${className}`}>
      <KatMoodEngine
        initialMood={mood}
        context={context}
        message={message}
        onMoodChange={handleMoodChange}
        size={size}
        interactive={interactive}
      />
    </div>
  )
}
