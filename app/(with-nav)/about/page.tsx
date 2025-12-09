"use client"

import { Starfield } from "@/components/starfield"

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <Starfield starCount={1500} speedFactor={0.03} backgroundColor="rgba(0,0,0,0.95)" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 text-transparent bg-clip-text">
          About ACE Exchange
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 border border-purple-500/20 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">Our Vision</h2>
            <p className="text-gray-300 mb-4">
              ACE Exchange is pioneering the next evolution of digital asset trading, learning, and community building
              in the cosmic consciousness of Web3.
            </p>
            <p className="text-gray-300">
              We believe in a future where financial systems are transparent, accessible, and empowering for all cosmic
              travelers across the universe.
            </p>
          </div>

          <div className="bg-black/40 border border-purple-500/20 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              To create an immersive, educational, and rewarding platform that transcends traditional trading
              experiences.
            </p>
            <p className="text-gray-300">
              Through our innovative Dreamstate technology, we're building bridges between financial education,
              community engagement, and cosmic exploration.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
