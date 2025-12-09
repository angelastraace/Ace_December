"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Crypto Trader",
    avatar: "/diverse-group.png",
    content:
      "ACE Exchange has completely transformed my trading experience. The interface is intuitive and the AI-powered insights have helped me make better trading decisions.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "DeFi Enthusiast",
    avatar: "/diverse-woman-portrait.png",
    content:
      "The referral program is amazing! I've already moved up the waitlist by inviting friends, and the rewards are actually worth it. Can't wait for the full launch!",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Blockchain Developer",
    avatar: "/developer-working.png",
    content:
      "As a developer, I appreciate the technical excellence behind ACE Exchange. The platform's performance and security features are top-notch.",
    rating: 4,
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Investment Advisor",
    avatar: "/professional-teamwork.png",
    content:
      "I've been recommending ACE Exchange to all my clients. The combination of advanced features and user-friendly design makes it perfect for both beginners and experts.",
    rating: 5,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(testimonials[0])

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
    setCurrentIndex(newIndex)
    setActiveTestimonial(testimonials[newIndex])
  }

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % testimonials.length
    setCurrentIndex(newIndex)
    setActiveTestimonial(testimonials[newIndex])
  }

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-teal-500/20 blur-xl"></div>
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-purple-500/20 blur-xl"></div>

      <Card className="border border-gray-800 bg-black/40 backdrop-blur-sm">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col items-center space-y-6 md:flex-row md:space-y-0 md:space-x-8">
            <div className="flex-shrink-0">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-teal-500/50">
                <Image
                  src={activeTestimonial.avatar || "/placeholder.svg"}
                  alt={activeTestimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="mb-2 flex justify-center md:justify-start">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
                {[...Array(5 - activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-gray-500" />
                ))}
              </div>
              <p className="mb-4 text-gray-300">"{activeTestimonial.content}"</p>
              <div>
                <h4 className="font-medium text-white">{activeTestimonial.name}</h4>
                <p className="text-sm text-teal-400">{activeTestimonial.role}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          className="h-8 w-8 rounded-full border-gray-700 bg-black/40 text-gray-400 backdrop-blur-sm hover:bg-gray-900 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="icon"
            onClick={() => {
              setCurrentIndex(index)
              setActiveTestimonial(testimonials[index])
            }}
            className={`h-2 w-2 rounded-full p-0 ${
              index === currentIndex ? "bg-teal-500 border-teal-500" : "bg-gray-800 border-gray-700 hover:bg-gray-700"
            }`}
          >
            <span className="sr-only">Go to testimonial {index + 1}</span>
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="h-8 w-8 rounded-full border-gray-700 bg-black/40 text-gray-400 backdrop-blur-sm hover:bg-gray-900 hover:text-white"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>
    </div>
  )
}
