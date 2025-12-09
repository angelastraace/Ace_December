"use client"

import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import creator components
import { CreatorProfile } from "@/components/creator/creator-profile"
import { CreatorStats } from "@/components/creator/creator-stats"
import { CreatorAnalytics } from "@/components/creator/creator-analytics"
import { CreatorNFTGallery } from "@/components/creator/creator-nft-gallery"
import { CommunityEngagement } from "@/components/creator/community-engagement"
import { ContentManager } from "@/components/creator/content-manager"
import { LaunchpadManager } from "@/components/creator/launchpad-manager"
import { SettingsPanel } from "@/components/creator/settings-panel"

export default function CreatorContent() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "profile"

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
      <p className="text-muted-foreground mb-6">Manage your content, community, and analytics</p>

      <Tabs defaultValue={tab} className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="nft">NFT Gallery</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="launchpad">Launchpad</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <CreatorProfile />
        </TabsContent>

        <TabsContent value="stats">
          <CreatorStats />
        </TabsContent>

        <TabsContent value="analytics">
          <CreatorAnalytics />
        </TabsContent>

        <TabsContent value="nft">
          <CreatorNFTGallery />
        </TabsContent>

        <TabsContent value="community">
          <CommunityEngagement />
        </TabsContent>

        <TabsContent value="content">
          <ContentManager />
        </TabsContent>

        <TabsContent value="launchpad">
          <LaunchpadManager />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
