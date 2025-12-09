"use client"

import { useEffect, useRef } from "react"

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create distant stars and cosmic dust
    const cosmicElements: {
      x: number
      y: number
      size: number
      opacity: number
      speed: number
      type: "star" | "dust"
    }[] = []
    for (let i = 0; i < 150; i++) {
      // Create a mix of distant stars and cosmic dust
      const type = Math.random() > 0.7 ? "dust" : "star"
      cosmicElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: type === "dust" ? Math.random() * 0.8 + 0.2 : Math.random() * 1.2 + 0.3,
        opacity: type === "dust" ? Math.random() * 0.3 + 0.1 : Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.03 + 0.005,
        type,
      })
    }

    // Animation
    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw cosmic elements
      cosmicElements.forEach((element) => {
        ctx.beginPath()
        ctx.arc(element.x, element.y, element.size, 0, Math.PI * 2)

        // Different colors for stars and dust
        if (element.type === "dust") {
          ctx.fillStyle = `rgba(100, 100, 255, ${element.opacity})`
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${element.opacity})`
        }
        ctx.fill()

        // Move elements
        element.y += element.speed
        if (element.y > canvas.height) {
          element.y = 0
          element.x = Math.random() * canvas.width
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
