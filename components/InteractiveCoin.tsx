"use client"

import type React from "react"

import { useRef, useState } from "react"
import Image from "next/image"

export default function InteractiveCoin() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const coinRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!coinRef.current) return

    const rect = coinRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    setRotation({
      x: y / 10, // Inverse for natural tilt
      y: -x / 10,
    })
  }

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 })
  }

  return (
    <div
      ref={coinRef}
      className="relative h-40 w-40 cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Image src="/ace-coin-official.jpeg" alt="ACE Coin" width={160} height={160} className="rounded-full" />
      </div>
    </div>
  )
}
