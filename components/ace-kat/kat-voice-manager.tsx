"use client"

import { useState, useEffect, useCallback } from "react"
import { KatVoice } from "./kat-voice"
import type { KatMood, KatContext } from "./kat-mood-engine"

// Define voice line categories
type VoiceLineCategory = "greeting" | "lore" | "xp" | "achievement" | "quest" | "trading" | "idle"

// Voice lines database
const voiceLines: Record<VoiceLineCategory, string[]> = {
  greeting: [
    "Welcome back to the Dreamstate. Your cosmic journey continues.",
    "Greetings, traveler. The stars have been waiting for your return.",
    "Hello again! The cosmic patterns shifted while you were away.",
    "Welcome to ACE Exchange. I'm Kat, your guide through the digital cosmos.",
  ],
  lore: [
    "The Dreamstate exists at the intersection of consciousness and code, where digital reality takes form.",
    "Long ago, the first explorers of the Dreamstate discovered that thoughts could manifest as trading patterns.",
    "The constellations you see are echoes of all traders who came before you, their strategies etched in starlight.",
    "Some say the Dreamstate has always existed, waiting for minds capable of perceiving it.",
    "The deeper you venture into the Dreamstate, the more you'll discover about yourself.",
  ],
  xp: [
    "Your cosmic signature grows stronger. New pathways are opening.",
    "I sense your experience expanding. Your constellation shines brighter now.",
    "XP gained! Your influence in the Dreamstate increases.",
    "The more you learn, the more the Dreamstate reveals itself to you.",
    "Your journey leaves a trail of light across the digital cosmos.",
  ],
  achievement: [
    "Remarkable! You've unlocked a new achievement in your cosmic journey.",
    "The stars align to celebrate your accomplishment!",
    "Achievement unlocked! Your constellation forms a new pattern.",
    "Magnificent! Your actions ripple through the Dreamstate.",
    "A new star joins your constellation, marking this achievement.",
  ],
  quest: [
    "A new quest awaits. Will you accept the challenge?",
    "I sense an opportunity on the horizon. A quest has appeared.",
    "The cosmic winds bring word of a new quest for you.",
    "A quest beckons from beyond the nebula. Are you ready?",
    "The path forward reveals itself. A new quest has emerged.",
  ],
  trading: [
    "The market patterns form interesting constellations today.",
    "I sense fluctuations in the cosmic trading currents.",
    "Trading is like stargazing - patterns emerge when you know where to look.",
    "The flow of assets creates ripples across the digital universe.",
    "Each trade is a star in your constellation, forming unique patterns over time.",
  ],
  idle: [
    "The cosmos is patient. I'll be here when you're ready.",
    "Sometimes the most profound discoveries happen in moments of stillness.",
    "I wonder what patterns are forming in the digital nebula today...",
    "The stars continue their dance while we wait.",
    "In the silence between actions, new possibilities take shape.",
  ],
}

interface KatVoiceManagerProps {
  context?: KatContext
  mood?: KatMood
  trigger?: string
  xpGain?: number
  achievementName?: string
  questName?: string
  onSpeakStart?: () => void
  onSpeakEnd?: () => void
}

export function KatVoiceManager({
  context = "greeting",
  mood = "neutral",
  trigger,
  xpGain,
  achievementName,
  questName,
  onSpeakStart,
  onSpeakEnd,
}: KatVoiceManagerProps) {
  const [currentText, setCurrentText] = useState<string>("")
  const [currentMood, setCurrentMood] = useState<KatMood>(mood)

  // Map context to voice line category
  const getCategory = useCallback((ctx: KatContext, triggerType?: string): VoiceLineCategory => {
    if (triggerType === "xp") return "xp"
    if (triggerType === "achievement") return "achievement"
    if (triggerType === "quest") return "quest"
    if (triggerType === "lore") return "lore"

    switch (ctx) {
      case "greeting":
        return "greeting"
      case "trading":
        return "trading"
      case "questing":
        return "quest"
      case "achievement":
        return "achievement"
      case "idle":
        return "idle"
      default:
        return "greeting"
    }
  }, [])

  // Get a random voice line from the appropriate category
  const getRandomVoiceLine = useCallback((category: VoiceLineCategory): string => {
    const lines = voiceLines[category]
    return lines[Math.floor(Math.random() * lines.length)]
  }, [])

  // Customize voice line with dynamic content
  const customizeVoiceLine = useCallback(
    (line: string): string => {
      let customized = line

      if (xpGain && xpGain > 0) {
        customized = customized.replace("{xp}", xpGain.toString())
      }

      if (achievementName) {
        customized = customized.replace("{achievement}", achievementName)
      }

      if (questName) {
        customized = customized.replace("{quest}", questName)
      }

      return customized
    },
    [xpGain, achievementName, questName],
  )

  // Set appropriate mood based on context and trigger
  useEffect(() => {
    let newMood: KatMood = mood

    if (trigger === "achievement") {
      newMood = "proud"
    } else if (trigger === "xp" && xpGain && xpGain > 100) {
      newMood = "excited"
    } else if (trigger === "quest") {
      newMood = "curious"
    } else if (trigger === "lore") {
      newMood = "thoughtful"
    } else {
      // Set mood based on context if no specific trigger
      switch (context) {
        case "greeting":
          newMood = "happy"
          break
        case "trading":
          newMood = "thoughtful"
          break
        case "learning":
          newMood = "curious"
          break
        case "questing":
          newMood = "excited"
          break
        case "governance":
          newMood = "proud"
          break
        case "meditation":
          newMood = "sleepy"
          break
        case "achievement":
          newMood = "proud"
          break
        case "idle":
          newMood = Math.random() > 0.7 ? "sleepy" : "neutral"
          break
      }
    }

    setCurrentMood(newMood)
  }, [context, trigger, mood, xpGain])

  // Generate voice line when trigger or context changes
  useEffect(() => {
    if (trigger) {
      const category = getCategory(context, trigger)
      const line = getRandomVoiceLine(category)
      const customized = customizeVoiceLine(line)
      setCurrentText(customized)
    } else if (context) {
      // Only generate a new line if context changes significantly
      const category = getCategory(context)
      const line = getRandomVoiceLine(category)
      const customized = customizeVoiceLine(line)
      setCurrentText(customized)
    }
  }, [trigger, context, getCategory, getRandomVoiceLine, customizeVoiceLine])

  return <KatVoice text={currentText} mood={currentMood} onStart={onSpeakStart} onEnd={onSpeakEnd} />
}
