"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import AceKatAvatar from "./ace-kat-avatar"
import { EnhancedKatVoice } from "./enhanced-kat-voice"
import { KatSpeechBubble } from "./kat-speech-bubble"
import { useKatLore } from "@/hooks/use-kat-lore"
import type { KatContext } from "./kat-mood-engine"

interface KatAIProps {
  xp?: number
  currentZone?: string
  size?: "sm" | "md" | "lg"
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  showSpeechBubble?: boolean
  useElevenLabs?: boolean
  elevenLabsVoiceId?: string
  onInteraction?: () => void
  className?: string
}

export function KatAI({
  xp = 0,
  currentZone = "universe",
  size = "md",
  position = "bottom-right",
  showSpeechBubble = true,
  useElevenLabs = false, // Disabled by default until API is properly configured
  elevenLabsVoiceId,
  onInteraction,
  className = "",
}: KatAIProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [speechBubblePosition, setSpeechBubblePosition] = useState<"top" | "right" | "bottom" | "left">("right")

  // Use the Kat lore hook
  const { katLine, mood, context, priority, triggerType } = useKatLore({
    xp,
    currentZone,
    idleTimeout: 60000, // 1 minute
    onIdleTrigger: () => {
      // Make Kat visible if she was minimized during idle trigger
      if (isMinimized) {
        setIsMinimized(false)
      }
    },
  })

  // Determine speech bubble position based on Kat's position
  useEffect(() => {
    switch (position) {
      case "top-left":
        setSpeechBubblePosition("right")
        break
      case "top-right":
        setSpeechBubblePosition("left")
        break
      case "bottom-left":
        setSpeechBubblePosition("right")
        break
      case "bottom-right":
        setSpeechBubblePosition("left")
        break
      default:
        setSpeechBubblePosition("right")
    }
  }, [position])

  // Handle speech events
  const handleSpeechStart = () => {
    setIsSpeaking(true)
  }

  const handleSpeechEnd = () => {
    setIsSpeaking(false)
  }

  // Handle Kat interaction
  const handleKatClick = () => {
    if (isMinimized) {
      setIsMinimized(false)
    } else {
      // Toggle speech bubble visibility
      setIsSpeaking(!isSpeaking)
    }

    if (onInteraction) {
      onInteraction()
    }
  }

  // Get position classes
  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4"
      case "top-right":
        return "top-4 right-4"
      case "bottom-left":
        return "bottom-4 left-4"
      case "bottom-right":
        return "bottom-4 right-4"
      default:
        return "bottom-4 right-4"
    }
  }

  // Size classes
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  return (
    <>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`fixed ${getPositionClasses()} z-50 ${className}`}
        >
          <div className="relative">
            {/* Minimize/Maximize button */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs z-10 border border-gray-600 hover:bg-gray-700"
            >
              {isMinimized ? "+" : "-"}
            </button>

            {/* Kat Avatar */}
            <motion.div
              animate={{ scale: isMinimized ? 0.5 : 1, opacity: isMinimized ? 0.7 : 1 }}
              transition={{ duration: 0.2 }}
              className={`${isMinimized ? "cursor-pointer" : ""}`}
              onClick={isMinimized ? handleKatClick : undefined}
            >
              <AceKatAvatar
                context={context as KatContext}
                size={size}
                interactive={!isMinimized}
                className={sizeClasses[size]}
              />
            </motion.div>

            {/* Speech Bubble */}
            {showSpeechBubble && !isMinimized && (
              <KatSpeechBubble
                text={katLine}
                mood={mood}
                isVisible={isSpeaking}
                position={speechBubblePosition}
                duration={6000} // 6 seconds
              />
            )}
          </div>
        </motion.div>
      )}

      {/* Voice */}
      <EnhancedKatVoice
        text={katLine}
        mood={mood}
        autoPlay={!isMinimized}
        priority={priority}
        onStart={handleSpeechStart}
        onEnd={handleSpeechEnd}
        useElevenLabs={useElevenLabs}
        elevenLabsVoiceId={elevenLabsVoiceId}
      />
    </>
  )
}
