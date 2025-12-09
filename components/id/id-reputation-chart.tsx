"use client"

import { useEffect, useRef } from "react"

interface IdReputationChartProps {
  userData: any
}

export default function IdReputationChart({ userData }: IdReputationChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !userData) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const size = Math.min(canvas.parentElement?.offsetWidth || 300, 400)
    canvas.width = size
    canvas.height = size

    // Center point
    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.35

    // Data points
    const categories = [
      { key: "trade", label: "Trading", color: "#3b82f6" }, // blue
      { key: "learn", label: "Learning", color: "#8b5cf6" }, // purple
      { key: "stake", label: "Staking", color: "#10b981" }, // green
      { key: "vote", label: "Governance", color: "#f59e0b" }, // amber
      { key: "arena", label: "Arena", color: "#ef4444" }, // red
      { key: "social", label: "Social", color: "#14b8a6" }, // teal
    ]

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Draw background
    ctx.fillStyle = "rgba(17, 24, 39, 0.4)"
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius + 20, 0, Math.PI * 2)
    ctx.fill()

    // Draw radar grid
    const gridLevels = 5
    for (let i = 1; i <= gridLevels; i++) {
      const gridRadius = (radius * i) / gridLevels

      ctx.beginPath()
      ctx.arc(centerX, centerY, gridRadius, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(75, 85, 99, 0.3)"
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Draw radar axes
    const angleStep = (Math.PI * 2) / categories.length
    categories.forEach((category, index) => {
      const angle = index * angleStep - Math.PI / 2 // Start from top (- PI/2)

      // Draw axis line
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + Math.cos(angle) * (radius + 30), centerY + Math.sin(angle) * (radius + 30))
      ctx.strokeStyle = "rgba(75, 85, 99, 0.5)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw axis label
      ctx.fillStyle = "rgba(209, 213, 219, 0.8)"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      const labelX = centerX + Math.cos(angle) * (radius + 45)
      const labelY = centerY + Math.sin(angle) * (radius + 45)
      ctx.fillText(category.label, labelX, labelY)
    })

    // Draw data points and connect them
    ctx.beginPath()
    categories.forEach((category, index) => {
      const value = userData.reputation[category.key]
      const angle = index * angleStep - Math.PI / 2 // Start from top (- PI/2)
      const pointRadius = (radius * value) / 100

      const x = centerX + Math.cos(angle) * pointRadius
      const y = centerY + Math.sin(angle) * pointRadius

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.closePath()
    ctx.fillStyle = "rgba(20, 184, 166, 0.2)" // Teal with transparency
    ctx.fill()
    ctx.strokeStyle = "rgba(20, 184, 166, 0.8)" // Teal for outline
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw data points
    categories.forEach((category, index) => {
      const value = userData.reputation[category.key]
      const angle = index * angleStep - Math.PI / 2
      const pointRadius = (radius * value) / 100

      const x = centerX + Math.cos(angle) * pointRadius
      const y = centerY + Math.sin(angle) * pointRadius

      // Draw point
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = category.color
      ctx.fill()
      ctx.strokeStyle = "#111827"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw value
      ctx.fillStyle = "white"
      ctx.font = "bold 10px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      const valueX = centerX + Math.cos(angle) * (pointRadius + 15)
      const valueY = centerY + Math.sin(angle) * (pointRadius + 15)
      ctx.fillText(`${value}`, valueX, valueY)
    })
  }, [userData])

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} className="max-w-full"></canvas>
    </div>
  )
}
