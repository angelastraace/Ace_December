"use client"

import { useEffect } from "react"
import { Starfield } from "@/components/starfield"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dreamstate Integration Error:", error)
  }, [error])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Starfield starCount={1500} speedFactor={0.03} backgroundColor="rgba(0,0,0,0.95)" />

      <div className="container mx-auto px-4 py-12 relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
            Cosmic Anomaly Detected
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            We've encountered a disturbance in the Dreamstate. Our cosmic engineers have been notified and are working
            to restore balance.
          </p>
          <div className="bg-black/40 border border-red-500/30 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-medium text-red-400 mb-2">Error Details</h2>
            <p className="text-sm text-gray-400 break-words">
              {error.message || "Unknown error in the Dreamstate integration"}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={reset}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Try Again
            </Button>
            <Link href="/dreamstate">
              <Button variant="outline" className="border-white/20 hover:border-purple-500/50 transition-colors">
                Return to Dreamstate
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
