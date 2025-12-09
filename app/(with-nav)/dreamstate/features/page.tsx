"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Starfield } from "@/components/starfield" // only once
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import dynamic from "next/dynamic"

// Dynamically imported components
const MultiplayerAvatars = dynamic(
  () => import("@/components/dreamstate/multiplayer-avatars").then((mod) => ({ default: mod.MultiplayerAvatars })),
  { loading: () => <LoadingSpinner />, ssr: false },
)

const MeditationRoom = dynamic(
  () => import("@/components/dreamstate/meditation-room").then((mod) => ({ default: mod.MeditationRoom })),
  { loading: () => <LoadingSpinner />, ssr: false },
)

const DreamstateModule = dynamic(
  () => import("@/components/dreamstate/dreamstate-module").then((mod) => ({ default: mod.DreamstateModule })),
  { loading: () => <LoadingSpinner />, ssr: false },
)

export default function DreamstateFeatures() {
  const [activeTab, setActiveTab] = useState("multiplayer")
  const searchParams = useSearchParams()

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["multiplayer", "meditation", "learn"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Starfield starCount={1500} speedFactor={0.03} backgroundColor="rgba(0,0,0,0.95)" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* ...rest of your page content (tabs, cards, etc.) */}
      </div>
    </div>
  )
}
