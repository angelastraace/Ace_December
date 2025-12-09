"use client"

import { useEffect, useRef } from "react"

export default function TwinklingStarsEffect() {
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

    // Create twinkling stars
    const stars: {
      x: number
      y: number
      size: number
      opacity: number
      twinkleSpeed: number
      twinkleDirection: boolean
      color: string
    }[] = []

    // Create stars with different colors and twinkling speeds
    for (let i = 0; i < 300; i++) {
      // Generate star colors from white to blue/purple tints
      const hue = Math.random() > 0.7 ? 240 + Math.random() * 60 : 0 // 70% white stars, 30% blue/purple tinted
      const saturation = hue === 0 ? 0 : 30 + Math.random() * 70
      const lightness = 80 + Math.random() * 20

      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.01 + 0.003,
        twinkleDirection: Math.random() > 0.5,
        color: `hsla(${hue}, ${saturation}%, ${lightness}%, 1)`,
      })
    }

    // Animation
    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update twinkling stars
      stars.forEach((star) => {
        // Update opacity for twinkling effect
        if (star.twinkleDirection) {
          star.opacity += star.twinkleSpeed
          if (star.opacity >= 1) {
            star.twinkleDirection = false
          }
        } else {
          star.opacity -= star.twinkleSpeed
          if (star.opacity <= 0.3) {
            star.twinkleDirection = true
          }
        }

        // Draw star with current opacity
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)

        // Create a gradient for larger stars to give them a glow
        if (star.size > 1.5) {
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 2)
          gradient.addColorStop(0, star.color)
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
          ctx.fillStyle = gradient

          // Draw the glow
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
          ctx.fill()
        }

        // Draw the star itself
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = star.color.replace("1)", `${star.opacity})`)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-5 pointer-events-none" />
}
