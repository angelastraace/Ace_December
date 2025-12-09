"use client"
import { KatVerseProvider } from "@/contexts/katverse-context"
import { KatVerseLobby } from "@/components/katverse/katverse-lobby"
import { Toaster } from "@/components/ui/toaster"

export default function KatVersePage() {
  return (
    <KatVerseProvider>
      <div className="h-screen w-full overflow-hidden">
        <KatVerseLobby />
      </div>
      <Toaster />
    </KatVerseProvider>
  )
}
