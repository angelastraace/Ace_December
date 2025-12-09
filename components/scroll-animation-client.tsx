"use client" // Ensure this is a client-side component

import dynamic from "next/dynamic"

// Dynamically import the ScrollAnimation component with ssr: false
const ScrollAnimation = dynamic(() => import("@/components/ScrollAnimation"), { ssr: false })

export default function ScrollAnimationClient() {
  return <ScrollAnimation animation="fade" />
}
