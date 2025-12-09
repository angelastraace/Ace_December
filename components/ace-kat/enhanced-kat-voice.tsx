"use client"

import { useEffect, useRef, useState } from "react"
import type { KatMood } from "./kat-mood-engine"

interface EnhancedKatVoiceProps {
  text?: string
  mood?: KatMood
  autoPlay?: boolean
  priority?: number // Higher priority will interrupt lower priority speech
  onStart?: () => void
  onEnd?: () => void
  useElevenLabs?: boolean // Flag to use ElevenLabs API instead of browser speech synthesis
  elevenLabsVoiceId?: string
  className?: string
}

export function EnhancedKatVoice({
  text,
  mood = "neutral",
  autoPlay = true,
  priority = 1,
  onStart,
  onEnd,
  useElevenLabs = false,
  elevenLabsVoiceId,
}: EnhancedKatVoiceProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const voiceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const currentPriorityRef = useRef<number>(0)

  // Voice properties based on mood
  const getVoiceProperties = (currentMood: KatMood) => {
    const properties = {
      pitch: 1.2, // Base pitch
      rate: 1.0, // Base rate
    }

    switch (currentMood) {
      case "excited":
        properties.pitch = 1.3
        properties.rate = 1.2
        break
      case "happy":
        properties.pitch = 1.25
        properties.rate = 1.1
        break
      case "curious":
        properties.pitch = 1.15
        properties.rate = 0.95
        break
      case "thoughtful":
        properties.pitch = 1.1
        properties.rate = 0.9
        break
      case "concerned":
        properties.pitch = 1.05
        properties.rate = 0.95
        break
      case "sleepy":
        properties.pitch = 1.0
        properties.rate = 0.8
        break
      case "playful":
        properties.pitch = 1.3
        properties.rate = 1.15
        break
      case "proud":
        properties.pitch = 1.2
        properties.rate = 1.05
        break
      case "surprised":
        properties.pitch = 1.35
        properties.rate = 1.1
        break
      default: // neutral
        properties.pitch = 1.2
        properties.rate = 1.0
    }

    return properties
  }

  // ElevenLabs TTS API call
  const speakWithElevenLabs = async (textToSpeak: string) => {
    if (!textToSpeak) return

    try {
      // This is a placeholder for the actual API call
      // In a real implementation, you would call the ElevenLabs API here
      console.log("Using ElevenLabs TTS API with voice ID:", elevenLabsVoiceId)
      console.log("Text to speak:", textToSpeak)

      // Simulate API call delay
      setIsSpeaking(true)
      if (onStart) onStart()

      // In a real implementation, you would:
      // 1. Call the ElevenLabs API
      // 2. Get the audio URL or blob
      // 3. Create an audio element and play it

      // For now, we'll simulate the audio playback
      const audio = new Audio()
      // Use an existing sound file instead of a placeholder
      audio.src = "/sounds/kat-happy.mp3" // Use existing sound as fallback
      audioRef.current = audio

      audio.onended = () => {
        setIsSpeaking(false)
        if (onEnd) onEnd()
        audioRef.current = null
        currentPriorityRef.current = 0
      }

      audio.play()
    } catch (error) {
      console.error("Error with ElevenLabs TTS:", error)
      setIsSpeaking(false)
      if (onEnd) onEnd()
      currentPriorityRef.current = 0
    }
  }

  // Browser Speech Synthesis
  const speakWithSpeechSynthesis = (textToSpeak: string) => {
    if (!textToSpeak || !window.speechSynthesis) return

    // Cancel any ongoing speech
    if (utteranceRef.current) {
      window.speechSynthesis.cancel()
    }

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utteranceRef.current = utterance

    // Set voice properties based on mood
    const voiceProps = getVoiceProperties(mood)
    utterance.lang = "en-US"
    utterance.pitch = voiceProps.pitch
    utterance.rate = voiceProps.rate
    utterance.volume = 1.0

    // Find a female voice if available
    const voices = window.speechSynthesis.getVoices()
    const femaleVoice = voices.find(
      (voice) =>
        voice.name.includes("Female") ||
        voice.name.includes("female") ||
        voice.name.includes("Samantha") ||
        voice.name.includes("Google UK English Female"),
    )
    if (femaleVoice) {
      utterance.voice = femaleVoice
    }

    // Set event handlers
    utterance.onstart = () => {
      setIsSpeaking(true)
      if (onStart) onStart()
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      utteranceRef.current = null
      if (onEnd) onEnd()
      currentPriorityRef.current = 0
    }

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event)
      setIsSpeaking(false)
      utteranceRef.current = null
      if (onEnd) onEnd()
      currentPriorityRef.current = 0
    }

    // Speak
    window.speechSynthesis.speak(utterance)
  }

  // Main speak function that decides which TTS method to use
  const speak = (textToSpeak: string) => {
    if (!textToSpeak) return

    // Only interrupt if the new speech has higher priority
    if (isSpeaking && priority <= currentPriorityRef.current) {
      return
    }

    currentPriorityRef.current = priority

    if (useElevenLabs) {
      speakWithElevenLabs(textToSpeak)
    } else {
      speakWithSpeechSynthesis(textToSpeak)
    }
  }

  // Handle text changes
  useEffect(() => {
    if (text && autoPlay) {
      // Add a small delay to ensure voices are loaded
      if (voiceTimeoutRef.current) {
        clearTimeout(voiceTimeoutRef.current)
      }

      voiceTimeoutRef.current = setTimeout(() => {
        speak(text)
      }, 100)
    }

    return () => {
      if (voiceTimeoutRef.current) {
        clearTimeout(voiceTimeoutRef.current)
      }
    }
  }, [text, mood, autoPlay, useElevenLabs, elevenLabsVoiceId, priority])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis && utteranceRef.current) {
        window.speechSynthesis.cancel()
      }
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Ensure voices are loaded
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis && !useElevenLabs) {
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          // Voices loaded, ready to speak
          if (text && autoPlay && !isSpeaking) {
            speak(text)
          }
        }
      }
    }
  }, [])

  return null // This component doesn't render anything visually
}
