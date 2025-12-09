import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <Skeleton className="h-10 w-48 bg-white/5" />

      <Skeleton className="h-40 w-full bg-white/5" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-96 w-full bg-white/5" />
        <Skeleton className="h-96 w-full bg-white/5" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-96 w-full bg-white/5" />
        <Skeleton className="h-96 w-full bg-white/5" />
      </div>

      <Skeleton className="h-60 w-full bg-white/5" />
    </div>
  )
}
