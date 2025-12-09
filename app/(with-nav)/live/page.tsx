"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AceLiveTicker } from "@/app/treasury/live-events/ace-live-ticker"
import { AceLiveNotifications } from "@/app/treasury/live-events/ace-live-notifications"
import { AceLiveStream } from "@/app/treasury/live-events/ace-live-stream"
import { AceLiveTrivia } from "@/app/treasury/live-events/ace-live-trivia"

export default function LivePage() {
  const [activeTab, setActiveTab] = useState("stream")

  return (
    <div className="container mx-auto py-6 space-y-6">
      <AceLiveTicker />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="stream">Live Stream</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="trivia">Trivia</TabsTrigger>
            </TabsList>
            <TabsContent value="stream" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>ACE Live Stream</CardTitle>
                  <CardDescription>Watch the latest ACE Exchange broadcasts</CardDescription>
                </CardHeader>
                <CardContent>
                  <AceLiveStream />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="events" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Don't miss these important ACE Exchange events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-800 rounded-lg bg-gray-900/50">
                      <h3 className="text-lg font-medium text-white">ACE Token Launch</h3>
                      <p className="text-gray-400">May 20, 2025 - 18:00 UTC</p>
                      <p className="mt-2">
                        Join us for the official ACE Token launch event with special guests and exclusive rewards for
                        participants.
                      </p>
                    </div>
                    <div className="p-4 border border-gray-800 rounded-lg bg-gray-900/50">
                      <h3 className="text-lg font-medium text-white">Trading Competition</h3>
                      <p className="text-gray-400">May 25, 2025 - 14:00 UTC</p>
                      <p className="mt-2">
                        Compete with traders from around the world for a prize pool of 50,000 ACE tokens.
                      </p>
                    </div>
                    <div className="p-4 border border-gray-800 rounded-lg bg-gray-900/50">
                      <h3 className="text-lg font-medium text-white">Community AMA</h3>
                      <p className="text-gray-400">June 1, 2025 - 16:00 UTC</p>
                      <p className="mt-2">
                        Ask the ACE Exchange team anything about the platform, upcoming features, and roadmap.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="trivia" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>ACE Trivia Challenge</CardTitle>
                  <CardDescription>Test your knowledge and earn ACE tokens</CardDescription>
                </CardHeader>
                <CardContent>
                  <AceLiveTrivia />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Live Notifications</CardTitle>
              <CardDescription>Stay updated with the latest announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <AceLiveNotifications />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
