import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#001219]">
      {/* Background with stars animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container absolute inset-0 z-0">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="mb-4 text-9xl font-bold text-teal-400">404</div>
        <h1 className="mb-8 text-2xl font-bold text-white">Page Not Found</h1>
        <p className="mb-8 max-w-md text-gray-400">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex gap-4">
          <Button asChild variant="default" className="bg-teal-600 hover:bg-teal-700">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-teal-700 text-teal-400 hover:bg-teal-900/30">
            <Link href="/admin">Go to Admin</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
