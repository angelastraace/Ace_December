import type React from "react"
import { MainNav } from "@/components/navigation/main-nav"

export default function WithNavLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen pt-16">
      <MainNav />
      <main>{children}</main>
    </div>
  )
}
