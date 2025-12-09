import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import ReferralDashboard from "@/components/referral-dashboard"
import Image from "next/image"

export default function ReferralPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#001219]">
      {/* Background with stars animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container absolute inset-0 z-0">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-gray-800 bg-black/20 px-4 py-4 backdrop-blur-md md:px-6">
        <div className="flex items-center">
          <Image src="/images/ace-logo.png" alt="ACE Exchange" width={40} height={40} className="mr-2" />
          <h1 className="text-xl font-bold text-white">ACE Exchange</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="hidden border-teal-500 text-teal-500 hover:bg-teal-950 hover:text-teal-400 sm:flex"
          >
            Login
          </Button>
          <Button className="bg-teal-500 text-black hover:bg-teal-400">Register</Button>
        </div>
      </header>

      <main className="relative z-10 flex-1 px-4 py-12 md:px-6 md:py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="mb-8 inline-flex items-center text-sm text-teal-400 hover:text-teal-300">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>

          <div className="mb-8 text-center">
            <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Thanks for Joining the Waitlist!
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              You're now part of the ACE Exchange revolution. Share your unique referral link to move up in the waitlist
              and earn exclusive rewards.
            </p>
          </div>

          <ReferralDashboard />
        </div>
      </main>

      <footer className="relative z-10 border-t border-gray-800 bg-black/60 py-6 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} ACE Exchange. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
