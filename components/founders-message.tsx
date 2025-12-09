"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export default function FoundersMessage() {
  return (
    <Card className="overflow-hidden border border-gray-800 bg-black/40 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative min-h-[300px] md:min-h-full">
            <Image src="/placeholder-srhtf.png" alt="ACE Exchange Founder" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/70 md:bg-gradient-to-t md:from-transparent md:to-black/70"></div>
            <div className="absolute bottom-4 left-4 md:bottom-4 md:left-4">
              <h3 className="text-xl font-bold text-white">Dr. Eliza Chen</h3>
              <p className="text-sm text-teal-400">Founder & CEO, ACE Exchange</p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8">
            <Quote className="mb-4 h-8 w-8 text-teal-500 opacity-50" />
            <p className="mb-6 text-gray-300">
              "When we started ACE Exchange, we had a simple vision: to create a financial platform that empowers
              everyone, not just the privileged few. Traditional banking has failed too many people for too long.
            </p>
            <p className="mb-6 text-gray-300">
              Our team has worked tirelessly to build a platform that combines cutting-edge technology with intuitive
              design. We're not just another crypto exchange - we're building the financial infrastructure of the
              future.
            </p>
            <p className="text-gray-300">
              Join us on this journey as we redefine what's possible in the world of finance. The banks may be dying,
              but ACE is just getting started."
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
