"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink } from "lucide-react"

interface IdNftDisplayProps {
  userData: any
}

export default function IdNftDisplay({ userData }: IdNftDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(userData.walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="overflow-hidden border-gray-800 bg-black/40 backdrop-blur-sm">
      <div className="relative">
        {/* NFT Image */}
        <div className="aspect-square w-full overflow-hidden bg-gradient-to-b from-gray-900 to-black">
          <div className="flex h-full items-center justify-center">
            <div className="relative h-4/5 w-4/5">
              {/* Placeholder for NFT image */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 opacity-20 blur-xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-white">{userData.username.charAt(0)}</div>
                  <div className="mt-2 text-xs text-gray-400">ACE ID NFT</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tier Badge */}
        <Badge
          className="absolute right-3 top-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white"
          variant="secondary"
        >
          {userData.tier} Tier
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white">{userData.username}</h3>
            <div className="mt-1 flex items-center text-sm text-gray-400">
              <span className="truncate">{userData.walletAddress}</span>
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-6 w-6 p-0 text-gray-400 hover:text-white"
                onClick={handleCopyAddress}
              >
                {copied ? <Badge className="h-4 w-4 bg-green-500 p-0" /> : <Copy className="h-3 w-3" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">Member since</div>
            <div className="text-sm font-medium text-white">
              {new Date(userData.joinedDate).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
            <ExternalLink className="mr-2 h-4 w-4" />
            View on Explorer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
