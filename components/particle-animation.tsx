"use client"

import { useEffect, useRef } from "react"

export default function ParticleAnimation() {
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

    // Create particles
    const particles: {
      x: number
      y: number
      size: number
      color: string
      speedX: number
      speedY: number
      life: number
      maxLife: number
    }[] = []

    // Mouse position
    let mouseX = 0
    let mouseY = 0
    const mouseRadius = 100

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation
    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create new particles occasionally
      if (Math.random() < 0.1) {
        const colors = ["rgba(0, 229, 255, 0.3)", "rgba(180, 0, 255, 0.3)", "rgba(0, 255, 229, 0.3)"]
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          life: 0,
          maxLife: 100 + Math.random() * 100,
        })
      }

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        // Calculate distance to mouse
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Move away from mouse if close
        if (distance < mouseRadius) {
          const angle = Math.atan2(dy, dx)
          const force = (mouseRadius - distance) / mouseRadius
          p.speedX += Math.cos(angle) * force * 0.5
          p.speedY += Math.sin(angle) * force * 0.5
        }

        // Apply some drag
        p.speedX *= 0.98
        p.speedY *= 0.98

        // Move particle
        p.x += p.speedX
        p.y += p.speedY

        // Increase life
        p.life++

        // Remove if too old
        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
          i--
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none" />
}
