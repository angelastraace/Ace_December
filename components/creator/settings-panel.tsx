"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { User, Shield, Bell, Palette, DollarSign, CreditCard, Eye, EyeOff } from "lucide-react"

export function SettingsPanel() {
  const [showApiKey, setShowApiKey] = useState(false)

  return (
    <Card className="backdrop-blur-md bg-black/30 border-purple-500/20 mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Settings & Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4 bg-black/20">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="h-4 w-4 mr-2" /> Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" /> Privacy
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center">
              <Palette className="h-4 w-4 mr-2" /> Appearance
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2" /> Payments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input id="displayName" defaultValue="CosmicCreator" className="bg-black/30 border-purple-500/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="cosmic_creator" className="bg-black/30 border-purple-500/20" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  defaultValue="Cosmic creator exploring the digital universe. Specializing in NFT art and immersive experiences that bridge the gap between technology and creativity."
                  className="bg-black/30 border-purple-500/20"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="creator@cosmic.universe"
                  className="bg-black/30 border-purple-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  defaultValue="https://cosmic-creator.universe"
                  className="bg-black/30 border-purple-500/20"
                />
              </div>

              <div className="pt-2">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Comments</p>
                  <p className="text-sm text-gray-400">Receive notifications when someone comments on your content</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Likes</p>
                  <p className="text-sm text-gray-400">Receive notifications when someone likes your content</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Shares</p>
                  <p className="text-sm text-gray-400">Receive notifications when someone shares your content</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Messages</p>
                  <p className="text-sm text-gray-400">Receive notifications for new messages</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing</p>
                  <p className="text-sm text-gray-400">Receive updates about new features and promotions</p>
                </div>
                <Switch />
              </div>

              <div className="pt-2">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Save Preferences
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="mt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Profile Visibility</p>
                  <p className="text-sm text-gray-400">Make your profile visible to everyone</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Earnings</p>
                  <p className="text-sm text-gray-400">Display your earnings on your public profile</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Content Downloads</p>
                  <p className="text-sm text-gray-400">Allow users to download your content</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2 pt-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex">
                  <Input
                    id="apiKey"
                    type={showApiKey ? "text" : "password"}
                    value="sk_live_51NcGVpKjn8QSZNhY7tD9mKrPl"
                    className="bg-black/30 border-purple-500/20 rounded-r-none"
                    readOnly
                  />
                  <Button
                    variant="outline"
                    className="rounded-l-none border-l-0 border-purple-500/20"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="pt-2">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Save Privacy Settings
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="mt-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <ThemeOption name="Cosmic Dark" color="#0b0c2a" selected={true} />
                  <ThemeOption name="Nebula Purple" color="#2d1b4e" selected={false} />
                  <ThemeOption name="Deep Space" color="#0a0a1a" selected={false} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="grid grid-cols-5 gap-4">
                  <ColorOption color="#8b5cf6" selected={true} />
                  <ColorOption color="#3b82f6" selected={false} />
                  <ColorOption color="#10b981" selected={false} />
                  <ColorOption color="#f59e0b" selected={false} />
                  <ColorOption color="#ef4444" selected={false} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Animations</p>
                  <p className="text-sm text-gray-400">Enable animations throughout the interface</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Compact Mode</p>
                  <p className="text-sm text-gray-400">Use a more compact layout to fit more content</p>
                </div>
                <Switch />
              </div>

              <div className="pt-2">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Save Appearance
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="mt-0">
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-black/20 border border-purple-500/10 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-3">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">ACE Wallet</p>
                    <p className="text-sm text-gray-400">Connected • 0x7f5a...e3d9</p>
                  </div>
                </div>
                <Badge className="bg-green-600">Primary</Badge>
              </div>

              <div className="p-3 rounded-lg bg-black/20 border border-purple-500/10 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-md bg-gray-700 flex items-center justify-center mr-3">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">MetaMask</p>
                    <p className="text-sm text-gray-400">Connected • 0x3a2b...f7c1</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-purple-500/20">
                  Make Primary
                </Button>
              </div>

              <div className="space-y-2 pt-2">
                <Label>Payment Threshold</Label>
                <div className="grid grid-cols-4 gap-4">
                  <ThresholdOption value="10 ACE" selected={false} />
                  <ThresholdOption value="50 ACE" selected={true} />
                  <ThresholdOption value="100 ACE" selected={false} />
                  <ThresholdOption value="500 ACE" selected={false} />
                </div>
                <p className="text-xs text-gray-400">Minimum amount required before automatic payout</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Automatic Payouts</p>
                  <p className="text-sm text-gray-400">Automatically receive payments when threshold is reached</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="pt-2">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Save Payment Settings
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function ThemeOption({ name, color, selected }: { name: string; color: string; selected: boolean }) {
  return (
    <div
      className={`p-3 rounded-lg ${selected ? "ring-2 ring-purple-500" : "border border-purple-500/10"} cursor-pointer`}
    >
      <div className="h-12 rounded-md mb-2" style={{ backgroundColor: color }}></div>
      <p className="text-sm font-medium text-center">{name}</p>
    </div>
  )
}

function ColorOption({ color, selected }: { color: string; selected: boolean }) {
  return (
    <div
      className={`h-10 rounded-full ${selected ? "ring-2 ring-white" : ""} cursor-pointer`}
      style={{ backgroundColor: color }}
    ></div>
  )
}

function ThresholdOption({ value, selected }: { value: string; selected: boolean }) {
  return (
    <div
      className={`p-2 rounded-lg text-center ${selected ? "bg-purple-900/30 border-purple-500/30" : "bg-black/20 border-purple-500/10"} border cursor-pointer`}
    >
      <p className="text-sm font-medium">{value}</p>
    </div>
  )
}
