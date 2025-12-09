"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { KatMood } from "./kat-mood-engine"

interface KatSpeechBubbleProps {
  text: string
  mood?: KatMood
  isVisible?: boolean
  duration?: number // How long the bubble stays visible in ms
  position?: "top" | "right" | "bottom" | "left"
  className?: string
}

export function KatSpeechBubble({
  text,
  mood = "neutral",
  isVisible = false,
  duration = 5000,
  position = "right",
  className = "",
}: KatSpeechBubbleProps) {
  const [visible, setVisible] = useState(isVisible)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  // Get color scheme based on mood
  const getMoodColors = (currentMood: KatMood) => {
    switch (currentMood) {
      case "happy":
        return { from: "#60a5fa", to: "#3b82f6", text: "white" } // Blue
      case "excited":
        return { from: "#f472b6", to: "#ec4899", text: "white" } // Pink
      case "curious":
        return { from: "#4ade80", to: "#22c55e", text: "white" } // Green
      case "thoughtful":
        return { from: "#a78bfa", to: "#8b5cf6", text: "white" } // Purple
      case "concerned":
        return { from: "#fb923c", to: "#f97316", text: "white" } // Orange
      case "sleepy":
        return { from: "#94a3b8", to: "#64748b", text: "white" } // Gray
      case "playful":
        return { from: "#f472b6", to: "#ec4899", text: "white" } // Pink
      case "proud":
        return { from: "#f59e0b", to: "#d97706", text: "white" } // Amber
      case "surprised":
        return { from: "#38bdf8", to: "#0ea5e9", text: "white" } // Light Blue
      default: // neutral
        return { from: "#a78bfa", to: "#8b5cf6", text: "white" } // Purple
    }
  }

  const colors = getMoodColors(mood)

  // Position styles
  const getPositionStyles = () => {
    switch (position) {
      case "top":
        return {
          bubble: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
          arrow: "top-full left-1/2 transform -translate-x-1/2 rotate-180",
        }
      case "right":
        return {
          bubble: "left-full ml-2 top-1/2 transform -translate-y-1/2",
          arrow: "right-full top-1/2 transform -translate-y-1/2 rotate-90",
        }
      case "bottom":
        return {
          bubble: "top-full mt-2 left-1/2 transform -translate-x-1/2",
          arrow: "bottom-full left-1/2 transform -translate-x-1/2",
        }
      case "left":
        return {
          bubble: "right-full mr-2 top-1/2 transform -translate-y-1/2",
          arrow: "left-full top-1/2 transform -translate-y-1/2 -rotate-90",
        }
      default:
        return {
          bubble: "left-full ml-2 top-1/2 transform -translate-y-1/2",
          arrow: "right-full top-1/2 transform -translate-y-1/2 rotate-90",
        }
    }
  }

  const positions = getPositionStyles()

  // Handle visibility changes
  useEffect(() => {
    setVisible(isVisible)

    if (isVisible && duration > 0) {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      // Set new timeout to hide the bubble
      const id = setTimeout(() => {
        setVisible(false)
      }, duration)
      setTimeoutId(id)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isVisible, duration, text])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className={`absolute ${positions.bubble} z-50 ${className}`}
        >
          <div
            className="max-w-xs p-3 rounded-lg shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${colors.from}40, ${colors.to}80)`,
              backdropFilter: "blur(8px)",
              border: `1px solid ${colors.from}80`,
              color: colors.text,
            }}
          >
            <div
              className={`absolute ${positions.arrow} w-3 h-3 transform rotate-45`}
              style={{
                background: `linear-gradient(135deg, ${colors.from}60, ${colors.to}80)`,
              }}
            />
            <p className="text-sm">{text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
