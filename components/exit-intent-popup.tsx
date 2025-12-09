"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    if (hasTriggered) return

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse moves to the top of the page
      if (e.clientY <= 5 && !hasTriggered) {
        setIsVisible(true)
        setHasTriggered(true)
      }
    }

    // Add a delay before enabling the exit intent detection
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave)
    }, 3000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [hasTriggered])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Submitted email:", email)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <Card className="mx-4 w-full max-w-md border border-gray-800 bg-black/90">
        <CardHeader className="relative pb-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 text-gray-400 hover:text-white"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          <CardTitle className="text-center text-xl text-white">Wait! Don't Miss Out</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 text-center">
            <p className="text-gray-300">
              Join our exclusive waitlist and get early access to ACE Exchange with special benefits!
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-800 bg-gray-900/50 text-white placeholder:text-gray-500"
                />
              </div>
              <Button type="submit" className="w-full bg-teal-600 text-white hover:bg-teal-700">
                Join the Waitlist
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
          <p className="text-xs text-gray-500">By joining, you agree to our Terms of Service and Privacy Policy</p>
        </CardFooter>
      </Card>
    </div>
  )
}
