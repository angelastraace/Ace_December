"use client"

import { useState } from "react"
import { Copy, Check, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ReferralPreview() {
  const [copied, setCopied] = useState(false)
  const referralLink = "https://aceexchange.io/r/COSMIC123"

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join ACE Exchange",
          text: "I just joined the ACE Exchange waitlist! Use my referral link to get priority access:",
          url: referralLink,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      handleCopy()
    }
  }

  return (
    <Card className="overflow-hidden border border-gray-800 bg-black/40 backdrop-blur-sm">
      <div className="bg-gradient-to-r from-teal-900/30 to-purple-900/30 px-4 py-3">
        <h3 className="text-lg font-medium text-white">Your Referral Link</h3>
      </div>
      <CardContent className="p-4">
        <div className="mb-4 rounded-lg bg-gray-900/50 p-3">
          <div className="flex items-center justify-between">
            <code className="text-sm text-gray-300">{referralLink}</code>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 w-8 rounded-full p-0 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              <span className="sr-only">Copy link</span>
            </Button>
          </div>
        </div>

        <div className="mb-4 space-y-3">
          <div className="flex items-center space-x-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-900/50 text-xs font-medium text-teal-400">
              1
            </div>
            <p className="text-sm text-gray-300">Share your unique referral link with friends</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-900/50 text-xs font-medium text-teal-400">
              2
            </div>
            <p className="text-sm text-gray-300">They sign up using your link</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-900/50 text-xs font-medium text-teal-400">
              3
            </div>
            <p className="text-sm text-gray-300">You both move up the waitlist and earn rewards</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="flex-1 border-gray-700 bg-gray-900/30 text-white hover:bg-gray-800"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
          <Button onClick={handleShare} className="flex-1 bg-teal-600 text-white hover:bg-teal-700">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
