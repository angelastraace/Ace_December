"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Star, Users, DollarSign, Award } from "lucide-react"

export function CreatorProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [bio, setBio] = useState(
    "Cosmic creator exploring the digital universe. Specializing in NFT art and immersive experiences that bridge the gap between technology and creativity.",
  )

  return (
    <Card className="w-full overflow-hidden backdrop-blur-md bg-black/30 border-purple-500/20 mb-6">
      <CardContent className="p-0">
        <div className="relative h-40 bg-gradient-to-r from-purple-900 to-blue-900">
          <div className="absolute w-full h-full bg-[url('/placeholder-px7zt.png')] bg-cover bg-center opacity-60 mix-blend-overlay"></div>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 text-white bg-black/30 hover:bg-black/50"
            onClick={() => {}}
          >
            <Edit className="h-4 w-4 mr-1" /> Edit Cover
          </Button>
        </div>

        <div className="px-6 pb-6 pt-0 -mt-12">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
            <Avatar className="h-24 w-24 border-4 border-black/50 shadow-xl">
              <AvatarImage src="/placeholder-2pgvy.png" alt="Creator Avatar" />
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600">CC</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                    CosmicCreator
                  </h2>
                  <p className="text-gray-400">@cosmic_creator • Joined April 2023</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-500/30 px-3 py-1">
                    <Star className="h-3 w-3 mr-1 text-yellow-400" /> Featured Creator
                  </Badge>
                  <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-500/30 px-3 py-1">
                    <Award className="h-3 w-3 mr-1 text-yellow-400" /> Level 42
                  </Badge>
                </div>
              </div>

              {isEditing ? (
                <div className="mt-3">
                  <textarea
                    className="w-full p-2 bg-black/30 border border-purple-500/30 rounded-md text-white"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                  />
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      onClick={() => setIsEditing(false)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-3 relative">
                  <p className="text-gray-200">{bio}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute -top-1 right-0 text-gray-400 hover:text-white"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <StatCard icon={<Star className="h-5 w-5 text-yellow-400" />} value="127" label="Creations" />
            <StatCard icon={<Users className="h-5 w-5 text-blue-400" />} value="3.4K" label="Followers" />
            <StatCard icon={<DollarSign className="h-5 w-5 text-green-400" />} value="12,450" label="ACE Earned" />
            <StatCard icon={<Award className="h-5 w-5 text-purple-400" />} value="42" label="XP Level" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-black/20 border border-purple-500/10 hover:bg-black/30 transition-all">
      {icon}
      <span className="text-xl font-bold mt-1">{value}</span>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  )
}
