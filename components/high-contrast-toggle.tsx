"use client"

import { useState, useEffect } from "react"
import { Sun, Moon, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HighContrastToggle() {
  const [mode, setMode] = useState<"default" | "high-contrast" | "reduced-motion">("default")

  useEffect(() => {
    // Check for saved preference
    const savedMode = localStorage.getItem("display-mode")
    if (savedMode) {
      setMode(savedMode as "default" | "high-contrast" | "reduced-motion")
      applyMode(savedMode as "default" | "high-contrast" | "reduced-motion")
    }
  }, [])

  const applyMode = (newMode: "default" | "high-contrast" | "reduced-motion") => {
    // Remove all mode classes
    document.documentElement.classList.remove("high-contrast", "reduced-motion")

    // Apply the selected mode
    if (newMode === "high-contrast") {
      document.documentElement.classList.add("high-contrast")
    } else if (newMode === "reduced-motion") {
      document.documentElement.classList.add("reduced-motion")
    }

    // Save preference
    localStorage.setItem("display-mode", newMode)
  }

  const toggleMode = () => {
    const modes: Array<"default" | "high-contrast" | "reduced-motion"> = ["default", "high-contrast", "reduced-motion"]
    const currentIndex = modes.indexOf(mode)
    const nextMode = modes[(currentIndex + 1) % modes.length]

    setMode(nextMode)
    applyMode(nextMode)
  }

  return (
    <div className="fixed top-4 right-4 z-40">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMode}
        className="h-8 w-8 rounded-full border-gray-700 bg-black/40 backdrop-blur-sm"
        title={`Current mode: ${mode}. Click to change.`}
      >
        {mode === "default" && <Sun className="h-4 w-4 text-yellow-400" />}
        {mode === "high-contrast" && <Eye className="h-4 w-4 text-white" />}
        {mode === "reduced-motion" && <Moon className="h-4 w-4 text-blue-400" />}
      </Button>
    </div>
  )
}
