"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface AnimatedCTAButtonProps {
  text: string
  className?: string
  onClick?: () => void
}

export default function AnimatedCTAButton({ text, className = "", onClick }: AnimatedCTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Button
      className={`relative overflow-hidden bg-gradient-to-r from-teal-500 to-cyan-500 text-white transition-all duration-300 hover:opacity-90 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span className="relative z-10">{text}</span>
      <span
        className={`absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 transition-transform duration-300 ${
          isHovered ? "translate-x-0" : "-translate-x-full"
        }`}
      ></span>
    </Button>
  )
}
