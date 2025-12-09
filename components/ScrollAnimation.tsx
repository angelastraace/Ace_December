"use client"

import dynamic from "next/dynamic"

// Import the client component with dynamic import to handle SSR properly
const ScrollAnimationClient = dynamic(() => import("./ScrollAnimationClient"), {
  ssr: false,
})

// Re-export the component with the same props interface
export default ScrollAnimationClient
