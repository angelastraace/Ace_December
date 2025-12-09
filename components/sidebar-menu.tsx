"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  ChevronRight,
  Home,
  LayoutDashboard,
  TrendingUp,
  User,
  Vote,
  Palette,
  Bot,
  Heart,
  Wallet,
  DollarSign,
  Rocket,
  Landmark,
  Gift,
  Cat,
  Swords,
  Fingerprint,
  Star,
  GraduationCap,
  Smartphone,
  HelpCircle,
  Menu,
  X,
  Settings,
  Bell,
  Users,
  Award,
  FlaskRoundIcon as Flask,
  Info,
  FileText,
  HelpingHand,
  MessageSquare,
  Shield,
  Lock,
  LogIn,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Define sidebar items with all pages organized into categories
const sidebarItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Main",
    href: "#",
    icon: LayoutDashboard,
    subItems: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      {
        name: "Trading",
        href: "/trading",
        icon: TrendingUp,
        subItems: [
          { name: "Spot", href: "/trading?tab=spot" },
          { name: "Futures", href: "/trading?tab=futures" },
          { name: "Margin", href: "/trading?tab=margin" },
          { name: "Options", href: "/trading?tab=options" },
        ],
      },
      { name: "Profile", href: "/profile", icon: User },
      { name: "Settings", href: "/settings", icon: Settings },
      { name: "Notifications", href: "/notifications", icon: Bell },
    ],
  },
  {
    name: "Community",
    href: "#",
    icon: Users,
    subItems: [
      {
        name: "Governance",
        href: "/governance",
        icon: Vote,
        subItems: [
          { name: "Proposals", href: "/governance?tab=proposals" },
          { name: "Voting", href: "/governance?tab=voting" },
        ],
      },
      { name: "Creator Hub", href: "/creator", icon: Palette },
      { name: "AI Hub", href: "/ai", icon: Bot },
      { name: "ACE Life", href: "/life", icon: Heart },
      {
        name: "Guilds",
        href: "/guilds",
        icon: Users,
        subItems: [
          { name: "Formation", href: "/guilds?tab=formation" },
          { name: "Leaderboard", href: "/guilds?tab=leaderboard" },
          { name: "Challenges", href: "/guilds?tab=challenges" },
        ],
      },
      { name: "Community", href: "/community", icon: Users },
    ],
  },
  {
    name: "Finance",
    href: "#",
    icon: Wallet,
    subItems: [
      {
        name: "Wallet",
        href: "/wallet",
        icon: Wallet,
        subItems: [
          { name: "Assets", href: "/wallet?tab=assets" },
          { name: "Send", href: "/wallet?tab=send" },
          { name: "Receive", href: "/wallet?tab=receive" },
          { name: "History", href: "/wallet?tab=history" },
        ],
      },
      {
        name: "Earn",
        href: "/earn",
        icon: DollarSign,
        subItems: [
          { name: "Staking", href: "/earn?tab=staking" },
          { name: "Lending", href: "/earn?tab=lending" },
          { name: "Farming", href: "/earn?tab=farming" },
          { name: "Savings", href: "/earn?tab=savings" },
        ],
      },
      { name: "Launchpad", href: "/launchpad", icon: Rocket },
      { name: "Treasury", href: "/treasury", icon: Landmark },
      { name: "Claim", href: "/claim", icon: Gift },
    ],
  },
  {
    name: "Experience",
    href: "#",
    icon: Star,
    subItems: [
      { name: "ACE Kat", href: "/kat", icon: Cat },
      { name: "KAT Editor", href: "/kat/editor", icon: Cat },
      { name: "Lab", href: "/lab", icon: Flask },
      { name: "Arena", href: "/arena", icon: Swords },
      { name: "Arena Circuit", href: "/arena/circuit", icon: Swords },
      { name: "ACE ID", href: "/id", icon: Fingerprint },
      { name: "Dreamstate", href: "/dreamstate", icon: Star },
      { name: "Learn", href: "/learn", icon: GraduationCap },
      { name: "Mobile", href: "/mobile", icon: Smartphone },
      {
        name: "Quests",
        href: "/quests",
        icon: Award,
        subItems: [
          { name: "Active Quests", href: "/quests?tab=active" },
          { name: "Rewards", href: "/quests?tab=rewards" },
          { name: "Lore", href: "/quests?tab=lore" },
          { name: "History", href: "/quests?tab=history" },
        ],
      },
    ],
  },
  {
    name: "Information",
    href: "#",
    icon: Info,
    subItems: [
      { name: "About", href: "/about", icon: Info },
      { name: "Features", href: "/features", icon: FileText },
      { name: "How It Works", href: "/how-it-works", icon: HelpingHand },
      { name: "Testimonials", href: "/testimonials", icon: MessageSquare },
      { name: "Experience", href: "/experience", icon: Star },
      { name: "FAQ", href: "/faq", icon: HelpCircle },
      { name: "Contact", href: "/contact", icon: MessageSquare },
      { name: "Terms", href: "/terms", icon: Shield },
      { name: "Privacy", href: "/privacy", icon: Lock },
      { name: "Support", href: "/support", icon: HelpCircle },
    ],
  },
  {
    name: "Admin",
    href: "#",
    icon: Shield,
    subItems: [
      { name: "Admin Dashboard", href: "/admin", icon: LayoutDashboard },
      { name: "Admin Wallet", href: "/admin/wallet", icon: Wallet },
    ],
  },
]

export function SidebarMenu() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [expandedNestedItem, setExpandedNestedItem] = useState<string | null>(null)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleExpand = (name: string) => {
    setExpandedItem(expandedItem === name ? null : name)
    setExpandedNestedItem(null)
  }

  const toggleNestedExpand = (name: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedNestedItem(expandedNestedItem === name ? null : name)
  }

  return (
    <div className="relative h-screen">
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="absolute top-4 left-4 z-20 bg-black/50 text-white hover:bg-black/70"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-full w-64 bg-black/80 backdrop-blur-md border-r border-purple-500/20 z-10 overflow-y-auto"
      >
        <div className="p-6 pt-16 pb-20">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 text-transparent bg-clip-text mb-6">
            ACE Exchange
          </h2>

          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <div key={item.name} className="space-y-1">
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleExpand(item.name)}
                      className={`w-full flex items-center justify-between p-2 rounded-md ${
                        pathname.startsWith(item.href) && pathname !== "/"
                          ? "text-white bg-purple-900/30"
                          : "text-gray-300 hover:text-white hover:bg-purple-900/20"
                      } transition-colors`}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${expandedItem === item.name ? "rotate-90" : ""}`}
                      />
                    </button>
                    {expandedItem === item.name && (
                      <div className="pl-10 space-y-1 max-h-60 overflow-y-auto">
                        {item.subItems.map((subItem) => (
                          <div key={subItem.name} className="space-y-1">
                            {subItem.subItems ? (
                              <>
                                <button
                                  onClick={(e) => toggleNestedExpand(subItem.name, e)}
                                  className={`flex items-center justify-between w-full p-2 rounded-md ${
                                    pathname === subItem.href
                                      ? "text-white bg-purple-900/30"
                                      : "text-gray-400 hover:text-white hover:bg-purple-900/20"
                                  } transition-colors`}
                                >
                                  <div className="flex items-center">
                                    {subItem.icon && <subItem.icon className="h-4 w-4 mr-2" />}
                                    <span>{subItem.name}</span>
                                  </div>
                                  <ChevronRight
                                    className={`h-3 w-3 transition-transform ${
                                      expandedNestedItem === subItem.name ? "rotate-90" : ""
                                    }`}
                                  />
                                </button>
                                {expandedNestedItem === subItem.name && (
                                  <div className="pl-6 space-y-1">
                                    {subItem.subItems.map((nestedItem) => (
                                      <Link
                                        key={nestedItem.name}
                                        href={nestedItem.href}
                                        className={`flex items-center p-2 rounded-md ${
                                          pathname === nestedItem.href
                                            ? "text-white bg-purple-900/30"
                                            : "text-gray-500 hover:text-white hover:bg-purple-900/20"
                                        } transition-colors text-xs`}
                                      >
                                        <span>{nestedItem.name}</span>
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </>
                            ) : (
                              <Link
                                href={subItem.href}
                                className={`flex items-center p-2 rounded-md ${
                                  pathname === subItem.href
                                    ? "text-white bg-purple-900/30"
                                    : "text-gray-400 hover:text-white hover:bg-purple-900/20"
                                } transition-colors`}
                              >
                                {subItem.icon && <subItem.icon className="h-4 w-4 mr-2" />}
                                <span>{subItem.name}</span>
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
                    className={`flex items-center p-2 rounded-md ${
                      pathname === item.href
                        ? "text-white bg-purple-900/30"
                        : "text-gray-300 hover:text-white hover:bg-purple-900/20"
                    } transition-colors`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="absolute bottom-6 left-0 right-0 px-6 space-y-2">
            <Link href="/login">
              <Button
                variant="ghost"
                className="w-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-purple-900/20"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center border-purple-500 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
