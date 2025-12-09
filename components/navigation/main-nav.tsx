"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Define navigation items with ABSOLUTELY ALL pages organized into categories
const navigationItems = [
  {
    name: "Main",
    href: "#",
    subItems: [
      { name: "Home", href: "/" },
      { name: "Dashboard", href: "/dashboard" },
      {
        name: "Trading",
        href: "/trading",
        subItems: [
          { name: "Spot", href: "/trading" },
          { name: "Futures", href: "/trading" },
          { name: "Margin", href: "/trading" },
          { name: "Options", href: "/trading" },
        ],
      },
      { name: "Profile", href: "/profile" },
      { name: "Settings", href: "/settings" },
      { name: "Notifications", href: "/notifications" },
    ],
  },
  {
    name: "Community",
    href: "#",
    subItems: [
      {
        name: "Governance",
        href: "/governance",
        subItems: [
          { name: "Proposals", href: "/governance" },
          { name: "Voting", href: "/governance" },
        ],
      },
      { name: "Creator Hub", href: "/creator" },
      { name: "AI Hub", href: "/ai" },
      { name: "ACE Life", href: "/life" },
      {
        name: "Guilds",
        href: "/guilds",
        subItems: [
          { name: "Formation", href: "/guilds" },
          { name: "Leaderboard", href: "/guilds" },
          { name: "Challenges", href: "/guilds" },
        ],
      },
      { name: "Community", href: "/community" },
    ],
  },
  {
    name: "Finance",
    href: "#",
    subItems: [
      {
        name: "Wallet",
        href: "/wallet",
        subItems: [
          { name: "Assets", href: "/wallet" },
          { name: "Send", href: "/wallet" },
          { name: "Receive", href: "/wallet" },
          { name: "History", href: "/wallet" },
        ],
      },
      {
        name: "Earn",
        href: "/earn",
        subItems: [
          { name: "Staking", href: "/earn" },
          { name: "Lending", href: "/earn" },
          { name: "Farming", href: "/earn" },
          { name: "Savings", href: "/earn" },
        ],
      },
      { name: "Launchpad", href: "/launchpad" },
      { name: "Treasury", href: "/treasury" },
      { name: "Claim", href: "/claim" },
    ],
  },
  {
    name: "Experience",
    href: "#",
    subItems: [
      { name: "ACE Kat", href: "/kat" },
      { name: "KAT Editor", href: "/kat/editor" },
      { name: "Lab", href: "/lab" },
      { name: "Arena", href: "/arena" },
      { name: "Arena Circuit", href: "/arena/circuit" },
      { name: "ACE ID", href: "/id" },
      {
        name: "Dreamstate",
        href: "/dreamstate",
        subItems: [
          { name: "Overview", href: "/dreamstate" },
          { name: "Features", href: "/dreamstate/features" },
          { name: "Integration", href: "/dreamstate/integration" },
        ],
      },
      { name: "Learn", href: "/learn" },
      { name: "Mobile", href: "/mobile" },
      { name: "Navigation", href: "/navigation" },
      {
        name: "Quests",
        href: "/quests",
        subItems: [
          { name: "Active Quests", href: "/quests" },
          { name: "Rewards", href: "/quests" },
          { name: "Lore", href: "/quests" },
          { name: "History", href: "/quests" },
        ],
      },
    ],
  },
  {
    name: "Information",
    href: "#",
    subItems: [
      {
        name: "About",
        href: "/about",
        subItems: [
          { name: "Overview", href: "/about" },
          { name: "Team", href: "/about/team" },
          { name: "Roadmap", href: "/about/roadmap" },
          { name: "Whitepaper", href: "/about/whitepaper" },
          { name: "Partners", href: "/about/partners" },
        ],
      },
      { name: "Features", href: "/features" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "Testimonials", href: "/testimonials" },
      { name: "Experience", href: "/experience" },
      { name: "FAQ", href: "/faq" },
      { name: "Contact", href: "/contact" },
      { name: "Terms", href: "/terms" },
      { name: "Privacy", href: "/privacy" },
    ],
  },
  {
    name: "Support",
    href: "#",
    subItems: [
      { name: "Support Hub", href: "/support" },
      { name: "Getting Started", href: "/support/getting-started" },
      { name: "Wallet Help", href: "/support/wallet-help" },
      { name: "XP & Quests", href: "/support/xp-quests" },
      { name: "Security", href: "/support/security" },
      {
        name: "Support Categories",
        href: "#",
        subItems: [
          { name: "Trading", href: "/support/trading" },
          { name: "Staking", href: "/support/staking" },
          { name: "NFTs", href: "/support/nfts" },
          { name: "Governance", href: "/support/governance" },
        ],
      },
      {
        name: "Support Articles",
        href: "#",
        subItems: [
          { name: "Trading Basics", href: "/support/trading/basics" },
          { name: "Staking Guide", href: "/support/staking/guide" },
          { name: "NFT Marketplace", href: "/support/nfts/marketplace" },
          { name: "Governance Voting", href: "/support/governance/voting" },
        ],
      },
      { name: "Contact Support", href: "/support/contact" },
      { name: "FAQ", href: "/support/faq" },
    ],
  },
  {
    name: "Admin",
    href: "#",
    subItems: [
      { name: "Admin Dashboard", href: "/admin" },
      { name: "Admin Wallet", href: "/admin/wallet" },
    ],
  },
]

export function MainNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [openNestedSubmenu, setOpenNestedSubmenu] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name)
    setOpenNestedSubmenu(null)
  }

  const toggleNestedSubmenu = (name: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenNestedSubmenu(openNestedSubmenu === name ? null : name)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 text-transparent bg-clip-text">
              ACE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 justify-center">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.subItems ? (
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      pathname === item.href || pathname.startsWith(`${item.href}/`)
                        ? "text-white bg-purple-900/30"
                        : "text-gray-300 hover:text-white hover:bg-purple-900/20"
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform ${openSubmenu === item.name ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      pathname === item.href
                        ? "text-white bg-purple-900/30"
                        : "text-gray-300 hover:text-white hover:bg-purple-900/20"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Submenu */}
                {item.subItems && (
                  <div
                    className={`absolute left-0 mt-2 w-56 max-h-[80vh] overflow-y-auto rounded-md shadow-lg bg-black/90 border border-purple-500/30 transition-all duration-200 ${
                      openSubmenu === item.name
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="py-1">
                      {item.subItems.map((subItem) => (
                        <div key={subItem.name} className="relative">
                          {subItem.subItems ? (
                            <>
                              <button
                                onClick={(e) => toggleNestedSubmenu(subItem.name, e)}
                                className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                                  pathname === subItem.href
                                    ? "text-white bg-purple-900/30"
                                    : "text-gray-300 hover:text-white hover:bg-purple-900/20"
                                }`}
                              >
                                {subItem.name}
                                <ChevronDown
                                  className={`ml-1 h-3 w-3 transition-transform ${
                                    openNestedSubmenu === subItem.name ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                              {/* Nested Submenu */}
                              {openNestedSubmenu === subItem.name && (
                                <div className="pl-4 py-1 bg-black/50">
                                  {subItem.subItems.map((nestedItem) => (
                                    <Link
                                      key={nestedItem.name}
                                      href={nestedItem.href}
                                      className={`block px-4 py-2 text-xs transition-colors ${
                                        pathname === nestedItem.href
                                          ? "text-white bg-purple-900/30"
                                          : "text-gray-400 hover:text-white hover:bg-purple-900/20"
                                      }`}
                                    >
                                      {nestedItem.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <Link
                              href={subItem.href}
                              className={`block px-4 py-2 text-sm transition-colors ${
                                pathname === subItem.href
                                  ? "text-white bg-purple-900/30"
                                  : "text-gray-300 hover:text-white hover:bg-purple-900/20"
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search and Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 h-8 bg-black/40 border-purple-500/30 text-sm placeholder:text-gray-500 focus:border-purple-500"
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            <Link href="/login">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-purple-900/20">
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300"
              >
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-black/95 border-t border-purple-500/20 max-h-[80vh] overflow-y-auto"
        >
          <div className="p-4">
            <div className="relative mb-4">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border-purple-500/30 placeholder:text-gray-500 focus:border-purple-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <div key={item.name} className="space-y-1">
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-base font-medium rounded-md ${
                          pathname.startsWith(item.href)
                            ? "text-white bg-purple-900/30"
                            : "text-gray-300 hover:text-white hover:bg-purple-900/20"
                        }`}
                      >
                        {item.name}
                        <ChevronDown
                          className={`ml-1 h-4 w-4 transition-transform ${
                            openSubmenu === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openSubmenu === item.name && (
                        <div className="pl-4 space-y-1">
                          {item.subItems.map((subItem) => (
                            <div key={subItem.name} className="space-y-1">
                              {subItem.subItems ? (
                                <>
                                  <button
                                    onClick={(e) => toggleNestedSubmenu(subItem.name, e)}
                                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md ${
                                      pathname === subItem.href
                                        ? "text-white bg-purple-900/30"
                                        : "text-gray-300 hover:text-white hover:bg-purple-900/20"
                                    }`}
                                  >
                                    {subItem.name}
                                    <ChevronDown
                                      className={`ml-1 h-3 w-3 transition-transform ${
                                        openNestedSubmenu === subItem.name ? "rotate-180" : ""
                                      }`}
                                    />
                                  </button>
                                  {openNestedSubmenu === subItem.name && (
                                    <div className="pl-4 space-y-1">
                                      {subItem.subItems.map((nestedItem) => (
                                        <Link
                                          key={nestedItem.name}
                                          href={nestedItem.href}
                                          className={`block px-3 py-2 text-xs rounded-md ${
                                            pathname === nestedItem.href
                                              ? "text-white bg-purple-900/30"
                                              : "text-gray-400 hover:text-white hover:bg-purple-900/20"
                                          }`}
                                          onClick={() => setIsOpen(false)}
                                        >
                                          {nestedItem.name}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <Link
                                  href={subItem.href}
                                  className={`block px-3 py-2 text-sm rounded-md ${
                                    pathname === subItem.href
                                      ? "text-white bg-purple-900/30"
                                      : "text-gray-300 hover:text-white hover:bg-purple-900/20"
                                  }`}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 text-base font-medium rounded-md ${
                        pathname === item.href
                          ? "text-white bg-purple-900/30"
                          : "text-gray-300 hover:text-white hover:bg-purple-900/20"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 pb-2 flex flex-col space-y-2">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full text-gray-300 hover:text-white hover:bg-purple-900/20">
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
