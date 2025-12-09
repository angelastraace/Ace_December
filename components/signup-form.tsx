"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function SignupForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="rounded-lg border border-teal-500/30 bg-teal-900/20 p-4 text-center">
        <p className="text-teal-400">Thanks for signing up! Check your email for confirmation.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-300">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="rounded-md border border-gray-700 bg-black/40 px-4 py-2 text-white placeholder-gray-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:opacity-90"
      >
        {isSubmitting ? "Signing Up..." : "Sign Up for Early Access"}
      </Button>
    </form>
  )
}
