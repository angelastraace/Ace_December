"use client" // This is a client component

import Link from "next/link"

export function MainNavigation() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/trading", label: "Trading" },
    { href: "/wallet", label: "Wallet" },
    { href: "/creator", label: "Creator" },
    { href: "/about", label: "About" },
    { href: "/ai", label: "ai" },
    { href: "/dashboard", label: "client dashboard" },
    { href: "/admin", label: "admin dashboard" },
    { href: "/profile", label: "profile" },
    { href: "/governance", label: "governance" },
    { href: "/creator-hub", label: "Creator hub" },
    { href: "/ace-life", label: "Ace life" },
    { href: "/community", label: "Community" },
    { href: "/about", label: "About" },
    { href: "/kat", label: "ACE Kat" },
    { href: "/about", label: "About" },
  ]

  return (
    <nav className="bg-[#0A0F2F] border-b border-cyan-800 px-6 py-4 flex items-center justify-between text-white shadow-md">
      <Link href="/" className="text-2xl font-bold text-cyan-400 hover:opacity-80">
        ACE Exchange
      </Link>

      <ul className="flex space-x-6 text-sm md:text-base">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="hover:underline text-gray-300 hover:text-cyan-400">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
