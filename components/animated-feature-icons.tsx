"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Zap, Shield, TrendingUp, Users, Smartphone, Award, Clock, Cpu } from "lucide-react"

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Lightning Fast",
    description: "Execute trades in milliseconds",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Bank-Grade Security",
    description: "Your assets are always protected",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Advanced Analytics",
    description: "Make data-driven decisions",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community Driven",
    description: "Governance by token holders",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile First",
    description: "Trade anywhere, anytime",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Rewards Program",
    description: "Earn while you trade",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "24/7 Support",
    description: "Help whenever you need it",
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "AI Powered",
    description: "Smart trading recommendations",
  },
]

export default function AnimatedFeatureIcons() {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("animated-features")
    if (element) {
      observer.observe(element)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <motion.div
      id="animated-features"
      className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center rounded-lg border border-gray-800 bg-black/40 p-4 text-center backdrop-blur-sm transition-colors hover:border-teal-900 hover:bg-teal-900/10"
          variants={itemVariants}
        >
          <div className="mb-3 rounded-full bg-teal-900/30 p-3 text-teal-400">{feature.icon}</div>
          <h3 className="mb-1 font-medium text-white">{feature.title}</h3>
          <p className="text-xs text-gray-400">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
