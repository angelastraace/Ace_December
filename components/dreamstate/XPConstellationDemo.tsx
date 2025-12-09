"use client"

import { useState, useEffect, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { XPConstellation } from "@/components/dreamstate/xp-constellation"
import { fetchUserXPData, type UserXPData } from "@/services/user-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"

export default function XPConstellationDemo() {
  const [userData, setUserData] = useState<UserXPData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUserData() {
      try {
        const data = await fetchUserXPData()
        setUserData(data)
      } catch (error) {
        console.error("Failed to load user data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="bg-black/40 border border-purple-500/20 backdrop-blur-sm h-[400px] overflow-hidden">
          <CardContent className="p-0 h-full">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <Canvas camera={{ position: [0, 0, 100], fov: 60 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Suspense fallback={null}>
                  <XPConstellation userData={userData} />
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
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="bg-black/40 border border-purple-500/20 backdrop-blur-sm h-full">
          <CardHeader>
            <CardTitle className="text-purple-400">Your Cosmic Profile</CardTitle>
            <CardDescription>XP distribution and achievements</CardDescription>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full bg-white/10" />
                <Skeleton className="h-4 w-3/4 bg-white/10" />
                <Skeleton className="h-20 w-full bg-white/10" />
                <Skeleton className="h-4 w-1/2 bg-white/10" />
                <Skeleton className="h-4 w-full bg-white/10" />
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">Level {userData?.level}</span>
                    <span className="text-sm text-gray-400">Level {(userData?.level || 0) + 1}</span>
                  </div>
                  <Progress value={75} className="h-2 bg-white/10" />
                  <div className="mt-2 text-center text-sm text-gray-400">
                    {userData?.totalXP.toLocaleString()} XP Total
                  </div>
                </div>

                <Tabs defaultValue="distribution">
                  <TabsList className="grid grid-cols-2 bg-black/40 border border-purple-500/20">
                    <TabsTrigger value="distribution" className="data-[state=active]:bg-purple-900/30">
                      Distribution
                    </TabsTrigger>
                    <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-900/30">
                      Achievements
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="distribution" className="mt-4 space-y-4">
                    {userData?.distribution &&
                      Object.entries(userData.distribution).map(([category, percentage]) => (
                        <div key={category}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm capitalize">{category}</span>
                            <span className="text-sm text-gray-400">{percentage}%</span>
                          </div>
                          <Progress
                            value={percentage}
                            className="h-2"
                            style={
                              {
                                background: "rgba(255, 255, 255, 0.1)",
                                "--progress-background": getCategoryColor(category),
                              } as any
                            }
                          />
                        </div>
                      ))}
                  </TabsContent>

                  <TabsContent value="achievements" className="mt-4">
                    <div className="space-y-2">
                      {userData?.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center p-2 rounded-md bg-white/5 border border-white/10">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Helper function to get color for category
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    trading: "rgba(52, 152, 219, 0.7)",
    learning: "rgba(46, 204, 113, 0.7)",
    social: "rgba(231, 76, 60, 0.7)",
    quests: "rgba(243, 156, 18, 0.7)",
    governance: "rgba(155, 89, 182, 0.7)",
  }

  return colors[category] || "rgba(255, 255, 255, 0.5)"
}
