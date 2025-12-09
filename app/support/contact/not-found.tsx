"use client"

import Link from "next/link"
import { Starfield } from "@/components/starfield"

export default function ContactNotFound() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Starfield starCount={300} />

      <main className="relative z-10 max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text mb-6">
          404 - Contact Page Not Found
        </h1>

        <p className="text-xl text-gray-300 mb-8">This contact page has drifted into deep space.</p>

        <Link
          href="/support"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:scale-105 inline-flex items-center gap-2"
        >
          Return to Support Hub
        </Link>
      </main>
    </div>
  )
}
