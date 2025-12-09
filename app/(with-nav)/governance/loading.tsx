import { Skeleton } from "@/components/ui/skeleton"

export default function GovernanceLoading() {
  return (
    <div className="min-h-screen bg-[#0b0c2a] text-white px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section Skeleton */}
        <div className="mb-12 text-center md:text-left">
          <Skeleton className="h-12 w-64 md:w-96 bg-gray-800/50 mb-4 mx-auto md:mx-0" />
          <Skeleton className="h-6 w-full max-w-3xl bg-gray-800/50 mx-auto md:mx-0" />
        </div>

        {/* Stats Section Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 bg-gray-800/50 rounded-lg" />
          ))}
        </div>

        {/* Tabs Section Skeleton */}
        <Skeleton className="h-12 w-full bg-gray-800/50 rounded-lg mb-6" />
        <Skeleton className="h-96 w-full bg-gray-800/50 rounded-lg mb-12" />

        {/* Features Section Skeleton */}
        <Skeleton className="h-8 w-64 bg-gray-800/50 mx-auto mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 bg-gray-800/50 rounded-lg" />
          ))}
        </div>

        {/* CTA Section Skeleton */}
        <div className="text-center">
          <Skeleton className="h-8 w-64 bg-gray-800/50 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl bg-gray-800/50 mx-auto mb-6" />
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Skeleton className="h-10 w-32 bg-gray-800/50 rounded-md mx-auto sm:mx-0" />
            <Skeleton className="h-10 w-32 bg-gray-800/50 rounded-md mx-auto sm:mx-0" />
          </div>
        </div>
      </div>
    </div>
  )
}
