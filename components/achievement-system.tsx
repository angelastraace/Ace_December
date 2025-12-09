"use client"

import { useState, useEffect } from "react"
import { Trophy } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Mock achievements that could be triggered
const achievements = [
  {
    id: "first_visit",
    title: "First Contact",
    description: "Visited ACE Exchange for the first time",
    icon: "🚀",
    xp: 10,
  },
  {
    id: "scroll_halfway",
    title: "Curious Explorer",
    description: "Scrolled through half of the landing page",
    icon: "🔍",
    xp: 15,
  },
  {
    id: "visit_faq",
    title: "Knowledge Seeker",
    description: "Checked out the FAQ section",
    icon: "📚",
    xp: 20,
  },
]

export default function AchievementSystem() {
  const [currentAchievement, setCurrentAchievement] = useState<null | (typeof achievements)[0]>(null)
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    // Trigger the first achievement after 3 seconds
    const firstAchievementTimer = setTimeout(() => {
      unlockAchievement("first_visit")
    }, 3000)

    // Set up scroll listener for the scroll_halfway achievement
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const pageHeight = document.body.scrollHeight
      const viewportHeight = window.innerHeight

      // If scrolled halfway through the page
      if (scrollPosition > (pageHeight - viewportHeight) / 2) {
        unlockAchievement("scroll_halfway")
        // Remove scroll listener after triggering
        window.removeEventListener("scroll", handleScroll)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Set up click listener for FAQ section
    const handleFaqClick = () => {
      const faqSection = document.getElementById("faq")
      if (faqSection) {
        faqSection.addEventListener(
          "click",
          () => {
            unlockAchievement("visit_faq")
          },
          { once: true },
        )
      }
    }

    // Check if FAQ section exists and add listener
    if (document.readyState === "complete") {
      handleFaqClick()
    } else {
      window.addEventListener("load", handleFaqClick)
    }

    return () => {
      clearTimeout(firstAchievementTimer)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("load", handleFaqClick)
    }
  }, [])

  const unlockAchievement = (achievementId: string) => {
    // Check if achievement exists and hasn't been unlocked yet
    const achievement = achievements.find((a) => a.id === achievementId)

    if (achievement) {
      // In a real app, you'd check if the user already has this achievement
      // For demo purposes, we'll just show the notification
      setCurrentAchievement(achievement)
      setShowNotification(true)

      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowNotification(false)
      }, 5000)
    }
  }

  return (
    <AnimatePresence>
      {showNotification && currentAchievement && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20 }}
          animate={{ opacity: 1, y: 0, x: -20 }}
          exit={{ opacity: 0, y: 50, x: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 z-40 max-w-xs rounded-lg border border-teal-800 bg-gradient-to-br from-gray-900 to-black p-4 shadow-lg backdrop-blur-md"
        >
          <div className="flex items-start space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-900/50 text-2xl">
              {currentAchievement.icon}
            </div>
            <div>
              <div className="mb-1 flex items-center">
                <Trophy className="mr-1 h-4 w-4 text-yellow-500" />
                <h3 className="font-medium text-white">Achievement Unlocked!</h3>
              </div>
              <p className="mb-1 text-sm font-medium text-teal-400">{currentAchievement.title}</p>
              <p className="text-xs text-gray-400">{currentAchievement.description}</p>
              <p className="mt-1 text-xs font-medium text-yellow-500">+{currentAchievement.xp} XP</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
