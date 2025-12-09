import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ACE Life | Real-World Marketplace",
  description: "Transform your crypto rewards into real-world experiences with ACE Life marketplace.",
}

export default function LifeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
