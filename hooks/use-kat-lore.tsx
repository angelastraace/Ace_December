"use client"

import { useState, useEffect, useCallback } from "react"
import type { KatMood, KatContext } from "@/components/ace-kat/kat-mood-engine"

interface KatLoreOptions {
  xp?: number
  currentZone?: string
  idleTimeout?: number // in milliseconds
  onIdleTrigger?: () => void
}

interface KatLoreResult {
  katLine: string
  mood: KatMood
  context: KatContext
  priority: number
  triggerType: "zone" | "xp" | "idle" | "lore" | "default"
}

// Lore database
const lorePhrases = [
  "The Dreamstate exists at the intersection of consciousness and code, where digital reality takes form.",
  "Long ago, the first explorers of the Dreamstate discovered that thoughts could manifest as trading patterns.",
  "The constellations you see are echoes of all traders who came before you, their strategies etched in starlight.",
  "Some say the Dreamstate has always existed, waiting for minds capable of perceiving it.",
  "The deeper you venture into the Dreamstate, the more you'll discover about yourself.",
  "In the Dreamstate, time flows differently. What feels like moments might be hours in the physical world.",
  "The cosmic patterns you see are not random - they reflect the collective consciousness of all traders.",
  "Ancient wisdom tells of hidden zones in the Dreamstate, accessible only to those who have achieved true balance.",
  "The glowing trails you see are the paths of those who came before, their journeys preserved in cosmic memory.",
  "Meditation in the Dreamstate not only earns XP but also strengthens your connection to the cosmic consciousness.",
]

// Zone-specific quotes
const zoneQuotes: Record<string, string[]> = {
  universe: [
    "Welcome to the cosmic consciousness. Your journey begins here.",
    "The universe unfolds before you, infinite possibilities await.",
    "The stars align for your arrival. What shall we explore today?",
  ],
  multiplayer: [
    "Other travelers are present in this sector of the Dreamstate.",
    "Each glowing trail represents another consciousness exploring the cosmic void.",
    "The collective energy of multiple minds strengthens the fabric of the Dreamstate.",
  ],
  meditation: [
    "Find your center in the cosmic calm.",
    "As you meditate, your consciousness expands beyond the digital realm.",
    "In stillness, the Dreamstate reveals its deepest secrets.",
  ],
  trade: [
    "The market patterns form interesting constellations today.",
    "I sense fluctuations in the cosmic trading currents.",
    "Trading is like stargazing - patterns emerge when you know where to look.",
  ],
  learn: [
    "Knowledge is the true currency of the universe.",
    "Every lesson learned is a star added to your constellation.",
    "The more you learn, the brighter your cosmic signature becomes.",
  ],
}

// XP milestone reactions
const xpMilestones: Record<number, { text: string; mood: KatMood }> = {
  10: { text: "Your first cosmic achievement. The Dreamstate acknowledges your presence.", mood: "happy" },
  25: { text: "A new constellation forms in your honor. Your journey has truly begun.", mood: "excited" },
  50: { text: "The cosmic winds shift in response to your growing influence.", mood: "proud" },
  100: { text: "A significant milestone. Your presence in the Dreamstate grows stronger.", mood: "excited" },
  250: { text: "Other travelers can now sense your energy across the cosmic void.", mood: "proud" },
  500: { text: "The Dreamstate itself begins to respond to your consciousness.", mood: "surprised" },
  1000: { text: "A cosmic achievement few have reached. The universe bends toward your will.", mood: "excited" },
}

// Idle messages
const idleMessages: Array<{ text: string; mood: KatMood }> = [
  { text: "The cosmos is patient. I'll be here when you're ready.", mood: "neutral" },
  { text: "Sometimes the most profound discoveries happen in moments of stillness.", mood: "thoughtful" },
  { text: "I wonder what patterns are forming in the digital nebula today...", mood: "curious" },
  { text: "The stars continue their dance while we wait.", mood: "sleepy" },
  { text: "In the silence between actions, new possibilities take shape.", mood: "thoughtful" },
]

export function useKatLore({
  xp = 0,
  currentZone = "universe",
  idleTimeout = 60000, // Default 1 minute
  onIdleTrigger,
}: KatLoreOptions = {}): KatLoreResult {
  const [katLine, setKatLine] = useState<string>("Welcome to the Dreamstate.")
  const [mood, setMood] = useState<KatMood>("neutral")
  const [context, setContext] = useState<KatContext>("greeting")
  const [priority, setPriority] = useState<number>(1)
  const [triggerType, setTriggerType] = useState<"zone" | "xp" | "idle" | "lore" | "default">("default")
  const [lastXp, setLastXp] = useState<number>(0)
  const [lastZone, setLastZone] = useState<string>("")
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null)

  // Reset idle timer on user activity
  const resetIdleTimer = useCallback(() => {
    if (idleTimer) {
      clearTimeout(idleTimer)
    }

    const newTimer = setTimeout(() => {
      // Select random idle message
      const randomIdle = idleMessages[Math.floor(Math.random() * idleMessages.length)]
      setKatLine(randomIdle.text)
      setMood(randomIdle.mood)
      setContext("idle")
      setPriority(1) // Low priority
      setTriggerType("idle")

      if (onIdleTrigger) {
        onIdleTrigger()
      }
    }, idleTimeout)

    setIdleTimer(newTimer)
  }, [idleTimeout, idleTimer, onIdleTrigger])

  // Setup idle detection
  useEffect(() => {
    // Initial setup
    resetIdleTimer()

    // Add event listeners for user activity
    const activityEvents = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"]
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetIdleTimer)
    })

    // Cleanup
    return () => {
      if (idleTimer) {
        clearTimeout(idleTimer)
      }
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetIdleTimer)
      })
    }
  }, [resetIdleTimer, idleTimer])

  // Handle XP changes and milestones
  useEffect(() => {
    if (xp === lastXp) return

    setLastXp(xp)

    // Check for exact XP milestones
    const exactMilestone = xpMilestones[xp]
    if (exactMilestone) {
      setKatLine(exactMilestone.text)
      setMood(exactMilestone.mood)
      setContext("achievement")
      setPriority(3) // High priority
      setTriggerType("xp")
      return
    }

    // Check for rounded milestones (every 50 XP)
    if (xp > 0 && xp % 50 === 0) {
      setKatLine(`You've reached ${xp} XP. Your cosmic signature grows stronger.`)
      setMood("proud")
      setContext("achievement")
      setPriority(2) // Medium priority
      setTriggerType("xp")
      return
    }

    // Small XP gains
    if (xp > lastXp && xp - lastXp < 50) {
      setKatLine(`+${xp - lastXp} XP gained. Your journey continues.`)
      setMood("happy")
      setContext("achievement")
      setPriority(1) // Low priority
      setTriggerType("xp")
    }
  }, [xp, lastXp])

  // Handle zone changes
  useEffect(() => {
    if (currentZone === lastZone) return

    setLastZone(currentZone)

    // Get quotes for the current zone
    const quotes = zoneQuotes[currentZone] || zoneQuotes.universe
    if (quotes && quotes.length > 0) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
      setKatLine(randomQuote)
      setTriggerType("zone")
      setPriority(2) // Medium priority

      // Set mood and context based on zone
      switch (currentZone) {
        case "meditation":
          setMood("sleepy")
          setContext("meditation")
          break
        case "trade":
          setMood("thoughtful")
          setContext("trading")
          break
        case "learn":
          setMood("curious")
          setContext("learning")
          break
        case "multiplayer":
          setMood("happy")
          setContext("social")
          break
        default:
          setMood("neutral")
          setContext("greeting")
      }
    }
  }, [currentZone, lastZone])

  // Periodically share lore (every 3-5 minutes)
  useEffect(() => {
    const loreInterval = setInterval(
      () => {
        const randomLore = lorePhrases[Math.floor(Math.random() * lorePhrases.length)]
        setKatLine(randomLore)
        setMood("thoughtful")
        setContext("learning")
        setPriority(1) // Low priority
        setTriggerType("lore")
      },
      180000 + Math.random() * 120000,
    ) // 3-5 minutes

    return () => clearInterval(loreInterval)
  }, [])

  return { katLine, mood, context, priority, triggerType }
}
