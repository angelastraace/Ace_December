// app/ace-kat/page.tsx
"use client"

import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles } from "lucide-react"
import { useState } from "react"

export default function AceKatPage() {
  const [xp, setXp] = useState(3750)
  const xpMax = 5000
  const level = 12

  const percent = Math.round((xp / xpMax) * 100)

  return (
    <div className="relative z-10 min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Starfield or dynamic background */}
      <div className="absolute inset-0 -z-10">
        <canvas id="starfield" className="w-full h-full" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/ace-kat-profile.png"
            width={160}
            height={160}
            alt="ACE Kat Avatar"
            className="rounded-full border-4 border-purple-600 shadow-xl"
          />
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-purple-300 to-cyan-500 bg-clip-text text-transparent">
            Cosmic Ace
          </h1>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-yellow-400">
              🪐 Level {level}
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300">🧭 Explorer</Badge>
            <Badge className="bg-green-500/20 text-green-300">🏆 3 Achievements</Badge>
          </div>

          <div className="w-full max-w-md mt-4 text-sm text-gray-300">
            <div className="flex justify-between mb-1">
              <span>
                XP: {xp}/{xpMax}
              </span>
              <span>Next Level → {level + 1}</span>
            </div>
            <Progress value={percent} className="h-3 bg-gray-800" />
            <p className="mt-2 italic text-xs text-gray-400">
              Evolution path: <b>Explorer → Guardian</b> ({percent}%)
            </p>
          </div>
        </div>

        <Tabs defaultValue="lore" className="mt-10 w-full">
          <TabsList className="grid grid-cols-5 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
            <TabsTrigger value="lore">Lore</TabsTrigger>
            <TabsTrigger value="quests">Quests</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
            <TabsTrigger value="moods">Moods</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="lore" className="mt-6 text-left">
            <div className="rounded-xl border border-purple-800/50 bg-white/5 p-6 backdrop-blur-md shadow-lg">
              <h2 className="mb-2 text-lg font-semibold text-purple-200 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-300" />
                Kat Lore
              </h2>
              <p className="text-sm text-gray-300">
                Dive into the mysterious origin and evolution of the <strong>ACE Kat</strong> — a digital entity forged
                in the blockchain nebula. Each level unlocks more of the Kat’s story, secrets, and stardust-driven
                powers.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="quests">
            <div className="rounded-xl p-6 bg-white/5 text-white shadow-lg">
              <p className="text-sm text-gray-300">
                Complete XP-driven challenges to guide your Kat to ascension. Coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="customize">
            <div className="rounded-xl p-6 bg-white/5 text-white shadow-lg">
              <p className="text-sm text-gray-300">
                Equip skins, accessories, and custom traits. Style your Kat, your way. Coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="moods">
            <div className="rounded-xl p-6 bg-white/5 text-white shadow-lg">
              <p className="text-sm text-gray-300">
                Track your Kat’s evolving mood states as it traverses the XP cosmos. Coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="rewards">
            <div className="rounded-xl p-6 bg-white/5 text-white shadow-lg">
              <p className="text-sm text-gray-300">
                Claim XP-based rewards, rare NFT drops, and cosmic loot. Coming soon...
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
