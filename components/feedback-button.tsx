"use client"

import type React from "react"

import { useState } from "react"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle feedback submission
    console.log("Feedback submitted:", feedback)
    setSubmitted(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFeedback("")
      setIsOpen(false)
    }, 3000)
  }

  return (
    <>
      {/* Feedback button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 p-0 shadow-lg hover:bg-teal-700"
      >
        <MessageSquare className="h-5 w-5" />
        <span className="sr-only">Feedback</span>
      </Button>

      {/* Feedback modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <Card className="z-50 w-full max-w-md border border-gray-800 bg-black/90">
            <CardHeader className="relative pb-2">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 text-gray-400 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
              <CardTitle className="text-white">Send Feedback</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                {!submitted ? (
                  <Textarea
                    placeholder="Share your thoughts, suggestions, or report issues..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[120px] border-gray-800 bg-gray-900/50 text-white placeholder:text-gray-500"
                    required
                  />
                ) : (
                  <div className="flex flex-col items-center py-4 text-center">
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-teal-900/50">
                      <Check className="h-6 w-6 text-teal-400" />
                    </div>
                    <p className="text-white">Thank you for your feedback!</p>
                    <p className="text-sm text-gray-400">We appreciate your input.</p>
                  </div>
                )}
              </CardContent>
              {!submitted && (
                <CardFooter className="flex justify-end border-t border-gray-800 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="mr-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-teal-600 text-white hover:bg-teal-700">
                    Submit
                  </Button>
                </CardFooter>
              )}
            </form>
          </Card>
        </div>
      )}
    </>
  )
}

import { Check } from "lucide-react"
