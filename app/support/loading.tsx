import { Skeleton } from "@/components/ui/skeleton"
import { Starfield } from "@/components/starfield"

export default function SupportLoading() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Starfield starCount={300} />

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <Skeleton className="h-12 w-64 bg-white/10 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 bg-white/10 mx-auto mb-12" />

        <Skeleton className="h-14 w-full bg-white/10 mb-16" />

        <div className="grid md:grid-cols-2 gap-8">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-40 bg-white/10" />
            ))}
        </div>

        <Skeleton className="h-8 w-48 bg-white/10 mx-auto mt-16" />
      </main>
    </div>
  )
}
