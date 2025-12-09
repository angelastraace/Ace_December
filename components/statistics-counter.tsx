"use client"

import { useState, useEffect } from "react"
import { Users, ArrowUpRight, Shield, Clock } from "lucide-react"

const stats = [
  {
    icon: <Users className="h-5 w-5 text-teal-500" />,
    label: "Active Users",
    value: 25000,
    suffix: "+",
    increment: 250,
  },
  {
    icon: <ArrowUpRight className="h-5 w-5 text-teal-500" />,
    label: "Daily Transactions",
    value: 1500000,
    suffix: "+",
    increment: 15000,
  },
  {
    icon: <Shield className="h-5 w-5 text-teal-500" />,
    label: "Security Rating",
    value: 99.9,
    suffix: "%",
    increment: 0.1,
    max: 99.9,
  },
  {
    icon: <Clock className="h-5 w-5 text-teal-500" />,
    label: "Uptime",
    value: 99.99,
    suffix: "%",
    increment: 0.01,
    max: 99.99,
  },
]

export default function StatisticsCounter() {
  const [counts, setCounts] = useState(stats.map((stat) => 0))
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

    const element = document.getElementById("statistics-counter")
    if (element) {
      observer.observe(element)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!isInView) return

    const intervals = stats.map((stat, index) => {
      return setInterval(() => {
        setCounts((prevCounts) => {
          const newCounts = [...prevCounts]
          if (stat.max && newCounts[index] >= stat.max) {
            clearInterval(intervals[index])
            newCounts[index] = stat.max
          } else if (newCounts[index] < stat.value) {
            newCounts[index] = Math.min(newCounts[index] + stat.increment, stat.value)
          } else {
            clearInterval(intervals[index])
          }
          return newCounts
        })
      }, 50)
    })

    return () => {
      intervals.forEach((interval) => clearInterval(interval))
    }
  }, [isInView])

  return (
    <div id="statistics-counter" className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center rounded-lg border border-gray-800 bg-black/40 p-4 backdrop-blur-sm"
        >
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-teal-900/30">{stat.icon}</div>
          <div className="text-center">
            <p className="mb-1 text-2xl font-bold text-white">
              {stat.label.includes("Rating") || stat.label.includes("Uptime")
                ? counts[index].toFixed(2)
                : counts[index].toLocaleString()}
              {stat.suffix}
            </p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
