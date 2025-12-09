"use client"

import { useEffect, useRef } from "react"

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const stars: { x: number; y: number; size: number; speed: number }[] = []

    const createStars = () => {
      const starCount = 200
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5,
          speed: 0.1 + Math.random() * 0.5,
        })
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      stars.length = 0 // clear old stars
      createStars()
    }

    const draw = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "white"
      stars.forEach((star) => {
        star.x -= star.speed
        if (star.x < 0) star.x = canvas.width

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    draw()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        backgroundColor: "black",
      }}
    />
  )
}
