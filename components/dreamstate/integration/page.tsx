"use client"

import { motion } from "framer-motion"
import { Starfield } from "@/components/starfield"
import DreamstateIntegrationDemo from "@/components/dreamstate/dreamstate-integration-demo"

export default function DreamstateIntegrationPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Starfield starCount={1500} speedFactor={0.03} backgroundColor="rgba(0,0,0,0.95)" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Dreamstate Integration
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the seamless integration of voice, orbits, and dynamic zones in the cosmic consciousness.
          </p>
        </motion.div>

        <DreamstateIntegrationDemo />
      </div>
    </div>
  )
}
