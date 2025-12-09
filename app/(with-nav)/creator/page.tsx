import { Suspense } from "react"
import CreatorContent from "./creator-content"
import { Skeleton } from "@/components/ui/skeleton"

export default function CreatorPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto py-8 space-y-6">
          <Skeleton className="h-12 w-[250px]" />
          <Skeleton className="h-4 w-[300px]" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="border rounded-lg p-4 space-y-3">
                  <Skeleton className="h-[200px] w-full rounded-md" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
          </div>
        </div>
      }
    >
      <CreatorContent />
    </Suspense>
  )
}
