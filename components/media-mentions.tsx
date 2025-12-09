"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const mediaLogos = [
  {
    name: "TechCrunch",
    logo: "/techcrunch-logo.png",
  },
  {
    name: "Forbes",
    logo: "/forbes-logo-generic.png",
  },
  {
    name: "Bloomberg",
    logo: "/bloomberg-logo.png",
  },
  {
    name: "CoinDesk",
    logo: "/placeholder-w0uvc.png",
  },
  {
    name: "Cointelegraph",
    logo: "/placeholder-a672p.png",
  },
  {
    name: "The Block",
    logo: "/placeholder-0y1k5.png",
  },
]

export default function MediaMentions() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scrollWidth = container.scrollWidth
    const clientWidth = container.clientWidth

    if (scrollWidth <= clientWidth) return

    const scrollAnimation = () => {
      setScrollPosition((prev) => {
        const newPosition = prev + 0.5
        return newPosition >= scrollWidth / 2 ? 0 : newPosition
      })
    }

    const animationId = setInterval(scrollAnimation, 30)

    return () => {
      clearInterval(animationId)
    }
  }, [])

  return (
    <div className="overflow-hidden rounded-lg border border-gray-800 bg-black/40 py-6 backdrop-blur-sm">
      <h3 className="mb-6 text-center text-lg font-medium text-white">As Featured In</h3>

      <div className="relative overflow-hidden">
        <div
          ref={containerRef}
          className="flex items-center space-x-12 whitespace-nowrap px-6"
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          {/* First set of logos */}
          {mediaLogos.map((media, index) => (
            <div
              key={index}
              className="flex items-center justify-center opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={media.logo || "/placeholder.svg"}
                alt={media.name}
                width={160}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
          ))}

          {/* Duplicate set for continuous scrolling */}
          {mediaLogos.map((media, index) => (
            <div
              key={`dup-${index}`}
              className="flex items-center justify-center opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={media.logo || "/placeholder.svg"}
                alt={media.name}
                width={160}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/40 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/40 to-transparent"></div>
      </div>
    </div>
  )
}
