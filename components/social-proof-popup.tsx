"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const notifications = [
  { name: "Alex from New York", action: "just signed up", time: "2 minutes ago" },
  { name: "Sarah from London", action: "moved up 5 spots", time: "5 minutes ago" },
  { name: "Michael from Tokyo", action: "invited 3 friends", time: "7 minutes ago" },
  { name: "Emma from Sydney", action: "reached Gold tier", time: "10 minutes ago" },
  { name: "David from Berlin", action: "just signed up", time: "12 minutes ago" },
]

export default function SocialProofPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentNotification, setCurrentNotification] = useState(0)

  useEffect(() => {
    // Show first notification after 5 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true)
    }, 5000)

    // Set up interval to show notifications
    const interval = setInterval(() => {
      setIsVisible(false)

      // Wait for exit animation to complete before changing notification
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % notifications.length)
        setIsVisible(true)
      }, 500)
    }, 8000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 20 }}
          exit={{ opacity: 0, y: 50, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-0 z-50 max-w-xs rounded-lg border border-gray-800 bg-black/80 p-4 backdrop-blur-md"
        >
          <button onClick={handleClose} className="absolute top-2 right-2 text-gray-400 hover:text-white">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-900">
              <span className="text-sm font-medium text-teal-400">
                {notifications[currentNotification].name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm text-white">
                <span className="font-medium">{notifications[currentNotification].name}</span>{" "}
                {notifications[currentNotification].action}
              </p>
              <p className="text-xs text-gray-400">{notifications[currentNotification].time}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
