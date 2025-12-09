"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  targetDate: string
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        clearInterval(interval)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className="flex justify-center space-x-4">
      <div className="flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-black/40 text-2xl font-bold text-white backdrop-blur-sm">
          {timeLeft.days}
        </div>
        <span className="mt-1 text-xs text-gray-400">Days</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-black/40 text-2xl font-bold text-white backdrop-blur-sm">
          {timeLeft.hours}
        </div>
        <span className="mt-1 text-xs text-gray-400">Hours</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-black/40 text-2xl font-bold text-white backdrop-blur-sm">
          {timeLeft.minutes}
        </div>
        <span className="mt-1 text-xs text-gray-400">Minutes</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-black/40 text-2xl font-bold text-white backdrop-blur-sm">
          {timeLeft.seconds}
        </div>
        <span className="mt-1 text-xs text-gray-400">Seconds</span>
      </div>
    </div>
  )
}
