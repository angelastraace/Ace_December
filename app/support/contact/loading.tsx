"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Starfield } from "@/components/starfield"

export default function ContactLoading() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Starfield starCount={300} />

      <main className="relative z-10 max-w-3xl mx-auto px-6 py-24">
        <Skeleton className="h-6 w-32 bg-white/10 mb-8" />

        <Skeleton className="h-12 w-64 bg-white/10 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 bg-white/10 mx-auto mb-12" />

        <Skeleton className="h-[500px] w-full bg-white/10 rounded-xl" />
      </main>
    </div>
  )
}
