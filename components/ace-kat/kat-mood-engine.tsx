"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

// Define mood types and their properties
export type KatMood =
  | "neutral"
  | "happy"
  | "excited"
  | "curious"
  | "thoughtful"
  | "concerned"
  | "sleepy"
  | "playful"
  | "proud"
  | "surprised"

interface MoodProperties {
  primaryColor: string
  secondaryColor: string
  animationSpeed: number
  floatPattern: "gentle" | "bouncy" | "wave" | "zigzag" | "still"
  voicePitch: number
  voiceRate: number
  expressionAsset: string
  soundEffect?: string
}

const moodProperties: Record<KatMood, MoodProperties> = {
  neutral: {
    primaryColor: "#a78bfa",
    secondaryColor: "#8b5cf6",
    animationSpeed: 1,
    floatPattern: "gentle",
    voicePitch: 1,
    voiceRate: 1,
    expressionAsset: "/assets/kat/expressions/neutral.png",
  },
  happy: {
    primaryColor: "#60a5fa",
    secondaryColor: "#3b82f6",
    animationSpeed: 1.2,
    floatPattern: "gentle",
    voicePitch: 1.1,
    voiceRate: 1.05,
    expressionAsset: "/assets/kat/expressions/happy.png",
    soundEffect: "/sounds/kat-happy.mp3",
  },
  excited: {
    primaryColor: "#f472b6",
    secondaryColor: "#ec4899",
    animationSpeed: 1.5,
    floatPattern: "bouncy",
    voicePitch: 1.2,
    voiceRate: 1.2,
    expressionAsset: "/assets/kat/expressions/excited.png",
    soundEffect: "/sounds/kat-excited.mp3",
  },
  curious: {
    primaryColor: "#4ade80",
    secondaryColor: "#22c55e",
    animationSpeed: 1.1,
    floatPattern: "wave",
    voicePitch: 1.05,
    voiceRate: 0.95,
    expressionAsset: "/assets/kat/expressions/curious.png",
    soundEffect: "/sounds/kat-curious.mp3",
  },
  thoughtful: {
    primaryColor: "#a78bfa",
    secondaryColor: "#8b5cf6",
    animationSpeed: 0.8,
    floatPattern: "gentle",
    voicePitch: 0.95,
    voiceRate: 0.9,
    expressionAsset: "/assets/kat/expressions/thoughtful.png",
  },
  concerned: {
    primaryColor: "#fb923c",
    secondaryColor: "#f97316",
    animationSpeed: 0.9,
    floatPattern: "gentle",
    voicePitch: 0.9,
    voiceRate: 0.95,
    expressionAsset: "/assets/kat/expressions/concerned.png",
    soundEffect: "/sounds/kat-concerned.mp3",
  },
  sleepy: {
    primaryColor: "#94a3b8",
    secondaryColor: "#64748b",
    animationSpeed: 0.6,
    floatPattern: "gentle",
    voicePitch: 0.85,
    voiceRate: 0.8,
    expressionAsset: "/assets/kat/expressions/sleepy.png",
    soundEffect: "/sounds/kat-yawn.mp3",
  },
  playful: {
    primaryColor: "#f472b6",
    secondaryColor: "#ec4899",
    animationSpeed: 1.4,
    floatPattern: "zigzag",
    voicePitch: 1.15,
    voiceRate: 1.1,
    expressionAsset: "/assets/kat/expressions/playful.png",
    soundEffect: "/sounds/kat-playful.mp3",
  },
  proud: {
    primaryColor: "#f59e0b",
    secondaryColor: "#d97706",
    animationSpeed: 1.1,
    floatPattern: "gentle",
    voicePitch: 1.05,
    voiceRate: 1,
    expressionAsset: "/assets/kat/expressions/proud.png",
    soundEffect: "/sounds/kat-proud.mp3",
  },
  surprised: {
    primaryColor: "#38bdf8",
    secondaryColor: "#0ea5e9",
    animationSpeed: 1.3,
    floatPattern: "bouncy",
    voicePitch: 1.2,
    voiceRate: 1.1,
    expressionAsset: "/assets/kat/expressions/surprised.png",
    soundEffect: "/sounds/kat-surprised.mp3",
  },
}

// Define context types
export type KatContext =
  | "greeting"
  | "trading"
  | "learning"
  | "questing"
  | "governance"
  | "meditation"
  | "achievement"
  | "idle"

interface KatMoodEngineProps {
  initialMood?: KatMood
  context?: KatContext
  message?: string
  onMoodChange?: (mood: KatMood) => void
  onSpeakStart?: () => void
  onSpeakEnd?: () => void
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  className?: string
}

export function KatMoodEngine({
  initialMood = "neutral",
  context = "greeting",
  message,
  onMoodChange,
  onSpeakStart,
  onSpeakEnd,
  size = "md",
  interactive = true,
  className = "",
}: KatMoodEngineProps) {
  const [mood, setMood] = useState<KatMood>(initialMood)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { theme } = useTheme()

  // Size mapping
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  // Update mood based on context
  useEffect(() => {
    let newMood: KatMood = "neutral"

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

    setMood(newMood)
    if (onMoodChange) onMoodChange(newMood)

    // Play mood sound effect if available
    if (moodProperties[newMood].soundEffect) {
      const audio = new Audio(moodProperties[newMood].soundEffect)
      audio.volume = 0.5
      audio.play()
    }
  }, [context, onMoodChange])

  // Speak the message using Web Speech API
  useEffect(() => {
    if (!message) return

    const speak = () => {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(message)

        // Apply voice properties based on mood
        utterance.pitch = moodProperties[mood].voicePitch
        utterance.rate = moodProperties[mood].voiceRate

        // Use a female voice if available
        const voices = window.speechSynthesis.getVoices()
        const femaleVoice = voices.find((voice) => voice.name.includes("Female") || voice.name.includes("female"))
        if (femaleVoice) utterance.voice = femaleVoice

        // Set event handlers
        utterance.onstart = () => {
          setIsSpeaking(true)
          if (onSpeakStart) onSpeakStart()
        }

        utterance.onend = () => {
          setIsSpeaking(false)
          if (onSpeakEnd) onSpeakEnd()
        }

        window.speechSynthesis.speak(utterance)
      }
    }

    // Wait for voices to load if needed
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = speak
    } else {
      speak()
    }

    return () => {
      window.speechSynthesis.cancel()
    }
  }, [message, mood, onSpeakStart, onSpeakEnd])

  // Get current mood properties
  const currentMood = moodProperties[mood]

  // Animation variants based on float pattern
  const floatAnimations = {
    gentle: {
      y: [0, -10, 0],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 3 / currentMood.animationSpeed,
        ease: "easeInOut",
      },
    },
    bouncy: {
      y: [0, -15, 0],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 2 / currentMood.animationSpeed,
        ease: "easeOut",
      },
    },
    wave: {
      y: [0, -5, 0, -8, 0],
      x: [0, 5, 0, -5, 0],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 4 / currentMood.animationSpeed,
        ease: "easeInOut",
      },
    },
    zigzag: {
      y: [0, -8, -4, -12, 0],
      x: [0, 8, -8, 4, 0],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 3 / currentMood.animationSpeed,
        ease: "easeInOut",
      },
    },
    still: {
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Handle interaction
  const handleClick = () => {
    if (!interactive) return

    // Cycle through moods on click
    const moodKeys = Object.keys(moodProperties) as KatMood[]
    const currentIndex = moodKeys.indexOf(mood)
    const nextIndex = (currentIndex + 1) % moodKeys.length
    const nextMood = moodKeys[nextIndex]

    setMood(nextMood)
    if (onMoodChange) onMoodChange(nextMood)

    // Play animation
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 1000)

    // Play sound effect if available
    if (moodProperties[nextMood].soundEffect) {
      if (audioRef.current) {
        audioRef.current.src = moodProperties[nextMood].soundEffect || ""
        audioRef.current.volume = 0.5
        audioRef.current.play()
      }
    }
  }

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`relative ${sizeClasses[size]} cursor-pointer`}
        animate={floatAnimations[currentMood.floatPattern]}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full blur-md z-0"
          style={{
            background: `radial-gradient(circle, ${currentMood.primaryColor}40 0%, transparent 70%)`,
            transform: "scale(1.2)",
            opacity: isHovered || isSpeaking ? 0.8 : 0.4,
          }}
        />

        {/* Kat avatar */}
        <div className="relative z-10 w-full h-full">
          <img
            src={currentMood.expressionAsset || "/placeholder.svg"}
            alt={`Kat ${mood} expression`}
            className="w-full h-full object-contain"
          />

          {/* Speaking animation */}
          {isSpeaking && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-white rounded-full"
                  animate={{
                    height: [1, 6, 1],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mood indicator */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium px-2 py-1 rounded-full"
              style={{
                background: `linear-gradient(to right, ${currentMood.primaryColor}, ${currentMood.secondaryColor})`,
                color: theme === "dark" ? "white" : "black",
              }}
            >
              {mood}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Message bubble */}
      <AnimatePresence>
        {message && isSpeaking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute top-0 left-full ml-4 p-3 rounded-lg max-w-xs"
            style={{
              background: `linear-gradient(135deg, ${currentMood.primaryColor}20, ${currentMood.secondaryColor}40)`,
              borderLeft: `2px solid ${currentMood.primaryColor}`,
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="absolute left-0 top-4 transform -translate-x-2 rotate-45 w-4 h-4"
              style={{
                background: `linear-gradient(135deg, ${currentMood.primaryColor}, ${currentMood.secondaryColor}40)`,
              }}
            />
            <p className="text-sm">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden audio element for sound effects */}
      <audio ref={audioRef} className="hidden" />
    </div>
  )
}
