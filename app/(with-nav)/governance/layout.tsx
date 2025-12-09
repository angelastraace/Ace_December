import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ACE Governance - Shape the Future of ACE Exchange",
  description: "Participate in the decentralized governance of ACE Exchange through proposals and voting.",
}

export default function GovernanceLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
