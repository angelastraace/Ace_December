"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Starfield } from "@/components/starfield"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Error:", error)
  }, [error])

  return (
    <div className="relative h-screen w-full">
      <Starfield />
      <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-center text-white">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
          <Button onClick={() => reset()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    </div>
  )
}
