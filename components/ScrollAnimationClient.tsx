"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface ScrollAnimationProps {
  children: React.ReactNode
  animation?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale"
  delay?: number
}

export default function ScrollAnimation({ children, animation = "fade", delay = 0 }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const getAnimationProps = () => {
    switch (animation) {
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: isVisible ? { opacity: 1 } : { opacity: 0 },
          transition: { duration: 0.6, delay },
        }
      case "slide-up":
        return {
          initial: { opacity: 0, y: 50 },
          animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
          transition: { duration: 0.6, delay },
        }
      case "slide-down":
        return {
          initial: { opacity: 0, y: -50 },
          animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 },
          transition: { duration: 0.6, delay },
        }
      case "slide-left":
        return {
          initial: { opacity: 0, x: 50 },
          animate: isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 },
          transition: { duration: 0.6, delay },
        }
      case "slide-right":
        return {
          initial: { opacity: 0, x: -50 },
          animate: isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 },
          transition: { duration: 0.6, delay },
        }
      case "scale":
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 },
          transition: { duration: 0.6, delay },
        }
      default:
        return {
          initial: { opacity: 0 },
          animate: isVisible ? { opacity: 1 } : { opacity: 0 },
          transition: { duration: 0.6, delay },
        }
    }
  }

  return (
    <motion.div ref={ref} {...getAnimationProps()}>
      {children}
    </motion.div>
  )
}
