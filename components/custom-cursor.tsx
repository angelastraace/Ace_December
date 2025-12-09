"use client"

import { useState, useEffect } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isOverButton, setIsOverButton] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      // Check if hovering over a button or interactive element
      const target = e.target as HTMLElement
      setIsOverButton(
        target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") !== null ||
          target.closest("a") !== null,
      )
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  if (typeof window === "undefined") return null

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`pointer-events-none fixed z-50 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500 transition-transform duration-100 ${
          isClicking ? "scale-50" : "scale-100"
        } ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {/* Cursor ring */}
      <div
        className={`pointer-events-none fixed z-50 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-500 transition-all duration-200 ${
          isClicking ? "scale-150 opacity-30" : isOverButton ? "scale-150" : "scale-100"
        } ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transitionTimingFunction: "cubic-bezier(0.17, 0.67, 0.83, 0.67)",
        }}
      />
    </>
  )
}
