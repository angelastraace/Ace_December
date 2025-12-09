"use client"

import { useState, useEffect, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AceKatAvatar from "@/components/ace-kat/ace-kat-avatar"
import { KatVoiceManager } from "@/components/ace-kat/kat-voice-manager"
import { fetchUserXPData, type UserXPData } from "@/services/user-data"
import type { KatContext } from "@/components/ace-kat/kat-mood-engine"
import { ErrorBoundary } from "react-error-boundary"

// Define zones
const zones = [
  {
    id: "trade",
    name: "Trade",
    color: 0xff5500,
    position: [40, 0, 0] as [number, number, number],
    size: 5,
    description: "Exchange assets across the cosmic markets",
    xpValue: 50,
  },
  {
    id: "learn",
    name: "Learn",
    color: 0x00ccff,
    position: [-40, 0, 0] as [number, number, number],
    size: 5,
    description: "Expand your knowledge of the Dreamstate",
    xpValue: 40,
  },
  {
    id: "arena",
    name: "Arena",
    color: 0xff00aa,
    position: [0, 40, 0] as [number, number, number],
    size: 5,
    description: "Compete with other traders in cosmic challenges",
    xpValue: 60,
  },
  {
    id: "meditation",
    name: "Meditation",
    color: 0x00ff88,
    position: [0, -40, 0] as [number, number, number],
    size: 5,
    description: "Find clarity and focus in the cosmic void",
    xpValue: 30,
  },
  {
    id: "governance",
    name: "Governance",
    color: 0xffcc00,
    position: [30, 30, 0] as [number, number, number],
    size: 5,
    description: "Shape the future of the Dreamstate",
    xpValue: 70,
  },
]

// Fallback component for Three.js errors
function ThreeJSErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-black/40 rounded-xl border border-red-500/30">
      <h3 className="text-xl font-bold text-red-400 mb-2">3D Visualization Error</h3>
      <p className="text-gray-300 mb-4">We encountered an issue with the 3D visualization.</p>
      <p className="text-sm text-gray-400 mb-6 max-w-md">
        Error details: {error.message || "Unknown error in Three.js component"}
      </p>
      <Button onClick={resetErrorBoundary} className="bg-red-600 hover:bg-red-700">
        Try Again
      </Button>
    </div>
  )
}

// Simplified 3D scene component
function SimplifiedScene() {
  return (
    <Canvas camera={{ position: [0, 30, 100], fov: 60 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.6}
        panSpeed={0.5}
        rotateSpeed={0.5}
      />
    </Canvas>
  )
}

// Dynamic imports for heavy components
const UserOrbit = dynamic(() => import("./user-orbit").then((mod) => ({ default: mod.UserOrbit })), {
  ssr: false,
  loading: () => <div className="h-20 w-full flex items-center justify-center">Loading orbit visualization...</div>,
})

const ZonePlanets = dynamic(() => import("./zone-planets").then((mod) => ({ default: mod.ZonePlanets })), {
  ssr: false,
  loading: () => <div className="h-20 w-full flex items-center justify-center">Loading zone planets...</div>,
})

const XPConstellation = dynamic(() => import("./xp-constellation").then((mod) => ({ default: mod.XPConstellation })), {
  ssr: false,
  loading: () => <div className="h-20 w-full flex items-center justify-center">Loading constellation...</div>,
})

import dynamic from "next/dynamic"

export default function DreamstateIntegrationDemo() {
  const [userData, setUserData] = useState<UserXPData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeZone, setActiveZone] = useState<string | undefined>(undefined)
  const [katContext, setKatContext] = useState<KatContext>("greeting")
  const [voiceTrigger, setVoiceTrigger] = useState<string | undefined>(undefined)
  const [xpGain, setXpGain] = useState<number | undefined>(undefined)
  const [achievementName, setAchievementName] = useState<string | undefined>(undefined)
  const [hasError, setHasError] = useState(false)

  // Load user data
  useEffect(() => {
    async function loadUserData() {
      try {
        const data = await fetchUserXPData()
        setUserData(data)
      } catch (error) {
        console.error("Failed to load user data:", error)
        setHasError(true)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [])

  // Handle zone selection
  const handleZoneSelect = (zoneId: string) => {
    setActiveZone(zoneId)

    // Set Kat context based on zone
    switch (zoneId) {
      case "trade":
        setKatContext("trading")
        break
      case "learn":
        setKatContext("learning")
        break
      case "arena":
        setKatContext("questing")
        break
      case "meditation":
        setKatContext("meditation")
        break
      case "governance":
        setKatContext("governance")
        break
      default:
        setKatContext("greeting")
    }

    // Trigger voice line for zone selection
    setVoiceTrigger("zone")
    setTimeout(() => setVoiceTrigger(undefined), 100) // Reset trigger
  }

  // Simulate XP gain
  const simulateXpGain = () => {
    const selectedZone = zones.find((z) => z.id === activeZone)
    if (!selectedZone) return

    const gain = selectedZone.xpValue + Math.floor(Math.random() * 30)
    setXpGain(gain)
    setVoiceTrigger("xp")

    // Update user data with new XP
    if (userData) {
      setUserData({
        ...userData,
        totalXP: userData.totalXP + gain,
      })
    }

    // Reset triggers after a delay
    setTimeout(() => {
      setXpGain(undefined)
      setVoiceTrigger(undefined)
    }, 100)
  }

  // Simulate achievement unlock
  const simulateAchievement = () => {
    const achievements = [
      "Cosmic Explorer",
      "Market Master",
      "Knowledge Seeker",
      "Dreamstate Pioneer",
      "Stellar Trader",
    ]
    const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)]

    setAchievementName(randomAchievement)
    setVoiceTrigger("achievement")

    // Update user data with new achievement
    if (userData) {
      setUserData({
        ...userData,
        achievements: [...userData.achievements, randomAchievement],
      })
    }

    // Reset triggers after a delay
    setTimeout(() => {
      setAchievementName(undefined)
      setVoiceTrigger(undefined)
    }, 100)
  }

  // Trigger lore discovery
  const triggerLore = () => {
    setVoiceTrigger("lore")
    setTimeout(() => setVoiceTrigger(undefined), 100) // Reset trigger
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="bg-black/40 border border-purple-500/20 backdrop-blur-sm h-[500px] overflow-hidden">
          <CardContent className="p-0 h-full">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <ErrorBoundary FallbackComponent={ThreeJSErrorFallback} onReset={() => setHasError(false)}>
                {hasError ? (
                  <SimplifiedScene />
                ) : (
                  <Canvas camera={{ position: [0, 30, 100], fov: 60 }}>
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    <Suspense fallback={null}>
                      <XPConstellation userData={userData} scale={0.5} />
                    </Suspense>

                    <Suspense fallback={null}>
                      <UserOrbit userData={userData} showTrail={true} />
                    </Suspense>

                    <Suspense fallback={null}>
                      <ZonePlanets zones={zones} activeZone={activeZone} onZoneSelect={handleZoneSelect} />
                    </Suspense>

                    <OrbitControls
                      enableZoom={true}
                      enablePan={true}
                      enableRotate={true}
                      zoomSpeed={0.6}
                      panSpeed={0.5}
                      rotateSpeed={0.5}
                    />
                  </Canvas>
                )}
              </ErrorBoundary>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            onClick={simulateXpGain}
            disabled={!activeZone}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Gain XP
          </Button>
          <Button
            onClick={simulateAchievement}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Unlock Achievement
          </Button>
          <Button
            onClick={triggerLore}
            className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700"
          >
            Discover Lore
          </Button>
          <Button
            onClick={() => setActiveZone(undefined)}
            className="bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700"
          >
            Reset View
          </Button>
        </div>
      </div>

      <div>
        <Card className="bg-black/40 border border-purple-500/20 backdrop-blur-sm h-full">
          <CardHeader>
            <CardTitle className="text-purple-400">Dreamstate Navigator</CardTitle>
            <CardDescription>Explore the cosmic consciousness</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mb-6 flex justify-center">
              <AceKatAvatar context={katContext} size="lg" />
              <KatVoiceManager
                context={katContext}
                trigger={voiceTrigger}
                xpGain={xpGain}
                achievementName={achievementName}
              />
            </div>

            <Tabs defaultValue="zones" className="w-full">
              <TabsList className="grid grid-cols-2 bg-black/40 border border-purple-500/20">
                <TabsTrigger value="zones" className="data-[state=active]:bg-purple-900/30">
                  Zones
                </TabsTrigger>
                <TabsTrigger value="status" className="data-[state=active]:bg-purple-900/30">
                  Status
                </TabsTrigger>
              </TabsList>

              <TabsContent value="zones" className="mt-4 space-y-4">
                {zones.map((zone) => (
                  <motion.div
                    key={zone.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      activeZone === zone.id
                        ? "bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/50"
                        : "bg-black/20 border border-white/10 hover:border-purple-500/30"
                    }`}
                    onClick={() => handleZoneSelect(zone.id)}
                  >
                    <h3 className={`font-medium mb-1 ${activeZone === zone.id ? "text-white" : "text-purple-400"}`}>
                      {zone.name}
                    </h3>
                    <p className="text-sm text-gray-400">{zone.description}</p>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="status" className="mt-4">
                {userData ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-purple-400 mb-2">Cosmic Profile</h3>
                      <div className="bg-black/20 p-3 rounded-lg border border-white/10">
                        <div className="flex justify-between mb-1">
                          <span>Total XP</span>
                          <span>{userData.totalXP.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Level</span>
                          <span>{userData.level}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Achievements</span>
                          <span>{userData.achievements.length}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-purple-400 mb-2">Recent Achievements</h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {userData.achievements.slice(-3).map((achievement, index) => (
                          <div
                            key={index}
                            className="bg-black/20 p-2 rounded-lg border border-white/10 flex items-center"
                          >
                            <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                            <span className="text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {activeZone && (
                      <div>
                        <h3 className="font-medium text-purple-400 mb-2">Current Zone</h3>
                        <div className="bg-black/20 p-3 rounded-lg border border-white/10">
                          <div className="font-medium">{zones.find((z) => z.id === activeZone)?.name || "Unknown"}</div>
                          <div className="text-sm text-gray-400 mt-1">
                            {zones.find((z) => z.id === activeZone)?.description || ""}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">Loading user data...</div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
