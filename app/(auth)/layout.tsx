import type React from "react"
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/vast-starfield.png')] bg-repeat opacity-30"></div>
      </div>
      <main className="relative z-10">{children}</main>
    </div>
  )
}
