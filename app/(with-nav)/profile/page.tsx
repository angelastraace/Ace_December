"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileHeader from "@/components/profile/profile-header"
import ProfileStats from "@/components/profile/profile-stats"
import ProfileAchievements from "@/components/profile/profile-achievements"
import ProfileWallets from "@/components/profile/profile-wallets"
import ProfileActivity from "@/components/profile/profile-activity"
import ProfileCollectibles from "@/components/profile/profile-collectibles"
import ProfileSettings from "@/components/profile/profile-settings"
import { Loader2 } from "lucide-react"

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState<any>(null)

  useEffect(() => {
    // Simulate loading profile data
    const fetchProfileData = async () => {
      // In a real implementation, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock profile data
      setProfileData({
        id: "user-123",
        username: "CryptoAce",
        bio: "Crypto enthusiast and early ACE Exchange adopter. To the moon! 🚀",
        avatarUrl: "/images/ace-kat-avatar.png",
        bannerUrl: "/images/profile-banner.png",
        xp: 3750,
        level: 12,
        joinedDate: "2023-09-15",
        privacyMode: false,
        socialLinks: {
          twitter: "cryptoace",
          discord: "cryptoace#1234",
          telegram: "cryptoace",
        },
        badges: [
          { id: 1, name: "Early Adopter", icon: "rocket" },
          { id: 2, name: "Trading Pro", icon: "trending-up" },
          { id: 3, name: "Diamond Hands", icon: "gem" },
        ],
        stats: {
          trades: 156,
          volume: 45280,
          rewards: 1250,
          referrals: 8,
        },
      })
      setLoading(false)
    }

    fetchProfileData()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#001219]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-teal-500" />
          <p className="mt-4 text-white">Loading your cosmic profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#001219]">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container absolute inset-0 z-0">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Profile Header */}
        <ProfileHeader profile={profileData} />

        {/* Profile Content */}
        <div className="mx-auto max-w-7xl px-4 py-8">
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-7">
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="wallets">Wallets</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="collectibles">Collectibles</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="kat">ACE Kat</TabsTrigger>
            </TabsList>
            <TabsContent value="stats" className="mt-6">
              <ProfileStats profile={profileData} />
            </TabsContent>
            <TabsContent value="achievements" className="mt-6">
              <ProfileAchievements />
            </TabsContent>
            <TabsContent value="wallets" className="mt-6">
              <ProfileWallets />
            </TabsContent>
            <TabsContent value="activity" className="mt-6">
              <ProfileActivity />
            </TabsContent>
            <TabsContent value="collectibles" className="mt-6">
              <ProfileCollectibles />
            </TabsContent>
            <TabsContent value="settings" className="mt-6">
              <ProfileSettings profile={profileData} />
            </TabsContent>
            <TabsContent value="kat" className="mt-6">
              <div className="rounded-lg border border-gray-800 bg-black/40 p-6 backdrop-blur-sm">
                <h2 className="mb-4 text-2xl font-bold text-white">Your ACE Kat</h2>
                <p className="text-gray-400">ACE Kat customization coming soon!</p>
                <div className="mt-8 flex justify-center">
                  <div className="relative h-64 w-64">
                    <div className="absolute inset-0 rounded-full bg-teal-900/20"></div>
                    <img src="/images/ace-kat-avatar.png" alt="ACE Kat" className="h-full w-full object-contain" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
