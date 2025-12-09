"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Copy, QrCode, Share2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface IdExportOptionsProps {
  userData: any
}

export default function IdExportOptions({ userData }: IdExportOptionsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyJson = () => {
    const jsonData = {
      id: userData.id,
      username: userData.username,
      tier: userData.tier,
      xp: userData.xp,
      trustScore: userData.trustScore,
      badges: userData.badges.length,
      reputation: userData.reputation,
    }

    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadPdf = () => {
    // In a real implementation, this would generate and download a PDF
    alert("PDF download functionality would be implemented here")
  }

  const handleDownloadImage = () => {
    // In a real implementation, this would generate and download an image
    alert("Image download functionality would be implemented here")
  }

  return (
    <Tabs defaultValue="json" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-gray-800">
        <TabsTrigger value="json">JSON</TabsTrigger>
        <TabsTrigger value="image">Image</TabsTrigger>
        <TabsTrigger value="pdf">PDF</TabsTrigger>
      </TabsList>

      <TabsContent value="json" className="mt-4 space-y-4">
        <Card className="border-gray-700 bg-gray-800">
          <CardContent className="p-4">
            <pre className="max-h-60 overflow-auto rounded bg-gray-900 p-4 text-xs text-gray-300">
              {JSON.stringify(
                {
                  id: userData.id,
                  username: userData.username,
                  tier: userData.tier,
                  xp: userData.xp,
                  trustScore: userData.trustScore,
                  badges: userData.badges.length,
                  reputation: userData.reputation,
                },
                null,
                2,
              )}
            </pre>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={handleCopyJson}
          >
            {copied ? "Copied!" : <Copy className="mr-2 h-4 w-4" />}
            {copied ? "" : "Copy JSON"}
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="image" className="mt-4 space-y-4">
        <div className="flex h-60 items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-800 p-4">
          <div className="text-center">
            <QrCode className="mx-auto h-16 w-16 text-gray-500" />
            <p className="mt-2 text-sm text-gray-400">Preview of your ACE ID card</p>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={handleDownloadImage}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Image
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            <Share2 className="mr-2 h-4 w-4" />
            Share Image
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="pdf" className="mt-4 space-y-4">
        <div className="flex h-60 items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-800 p-4">
          <div className="text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-400">Preview of your ACE ID resume</p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={handleDownloadPdf}
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}
