import { Loader2 } from "lucide-react"

export default function IdLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#001219]">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-teal-500" />
        <p className="mt-4 text-white">Loading your cosmic identity...</p>
      </div>
    </div>
  )
}
