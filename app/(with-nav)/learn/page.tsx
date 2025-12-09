"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Search, Award, Clock, Star, Zap, Lock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { isAuthenticated } from "@/lib/auth"
import { useRouter } from "next/navigation"
import GovernanceProgressTracker from "@/components/learn/governance-progress-tracker"
import KatTutorialOverlay from "@/components/learn/kat-tutorial-overlay"

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [showKatTutorial, setShowKatTutorial] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoggedIn(isAuthenticated())

    // Show Kat tutorial for first-time visitors
    const hasSeenTutorial = localStorage.getItem("hasSeenLearnTutorial")
    if (!hasSeenTutorial) {
      setShowKatTutorial(true)
      localStorage.setItem("hasSeenLearnTutorial", "true")
    }
  }, [])

  // Mock courses data
  const courses = [
    {
      id: "gov-101",
      title: "Governance 101: Foundations of DAO Voting",
      description: "Learn the basics of blockchain governance and how DAOs make decisions through voting mechanisms.",
      category: "governance",
      difficulty: "beginner",
      duration: "45 min",
      instructor: "Elena Blockchain",
      completionRate: 0,
      image: "/blockchain-governance.png",
      tags: ["governance", "dao", "voting"],
      xpReward: 500,
      badge: {
        name: "Governance Initiate",
        description: "Completed the Governance 101 course",
        tier: "common",
      },
      unlocks: ["Basic Voting Rights", "Proposal Viewing"],
    },
    {
      id: "gov-201",
      title: "Advanced DAO Structures & Voting Mechanisms",
      description:
        "Explore different DAO structures and advanced voting mechanisms like quadratic voting and conviction voting.",
      category: "governance",
      difficulty: "intermediate",
      duration: "1.5 hours",
      instructor: "Marcus Decentralized",
      completionRate: 0,
      image: "/advanced-dao-voting.png",
      tags: ["governance", "advanced", "quadratic voting"],
      xpReward: 1200,
      badge: {
        name: "Governance Specialist",
        description: "Mastered advanced DAO structures and voting mechanisms",
        tier: "rare",
      },
      unlocks: ["Intermediate Voting Weight", "Comment on Proposals"],
    },
    {
      id: "gov-301",
      title: "Treasury Management & Proposal Creation",
      description: "Learn how to create effective governance proposals and manage DAO treasury assets responsibly.",
      category: "governance",
      difficulty: "advanced",
      duration: "2 hours",
      instructor: "Sophia Consensus",
      completionRate: 0,
      image: "/dao-treasury-management.png",
      tags: ["governance", "treasury", "proposals"],
      xpReward: 2000,
      badge: {
        name: "Governance Architect",
        description: "Mastered treasury management and proposal creation",
        tier: "epic",
      },
      unlocks: ["Proposal Creation Rights", "Advanced Voting Weight"],
    },
    {
      id: "gov-401",
      title: "Governance Risk Management & Security",
      description: "Advanced course on identifying and mitigating risks in DAO governance systems.",
      category: "governance",
      difficulty: "expert",
      duration: "3 hours",
      instructor: "Dr. Blockchain Security",
      completionRate: 0,
      image: "/placeholder.svg?key=03739",
      tags: ["governance", "security", "risk management"],
      xpReward: 3000,
      badge: {
        name: "Governance Guardian",
        description: "Expert in governance risk management and security",
        tier: "legendary",
      },
      unlocks: ["Mentor Status", "Maximum Voting Weight", "Emergency Proposal Rights"],
    },
    {
      id: "trading-101",
      title: "Crypto Trading Fundamentals",
      description: "Learn the basics of cryptocurrency trading, market analysis, and risk management.",
      category: "trading",
      difficulty: "beginner",
      duration: "1 hour",
      instructor: "Alex Trader",
      completionRate: 0,
      image: "/crypto-trading-basics.png",
      tags: ["trading", "basics", "risk management"],
      xpReward: 500,
      badge: {
        name: "Trading Initiate",
        description: "Completed the Trading Fundamentals course",
        tier: "common",
      },
    },
    {
      id: "defi-101",
      title: "DeFi Fundamentals",
      description: "Introduction to decentralized finance protocols, yield farming, and liquidity provision.",
      category: "defi",
      difficulty: "beginner",
      duration: "1.5 hours",
      instructor: "DeFi Dave",
      completionRate: 0,
      image: "/defi-fundamentals.png",
      tags: ["defi", "yield farming", "liquidity"],
      xpReward: 600,
      badge: {
        name: "DeFi Explorer",
        description: "Completed the DeFi Fundamentals course",
        tier: "common",
      },
    },
    {
      id: "nft-101",
      title: "NFT Creation & Trading",
      description: "Learn how to create, value, and trade non-fungible tokens in the digital art world.",
      category: "nft",
      difficulty: "beginner",
      duration: "1 hour",
      instructor: "Nina NFT",
      completionRate: 0,
      image: "/nft-creation-trading.png",
      tags: ["nft", "digital art", "trading"],
      xpReward: 500,
      badge: {
        name: "NFT Creator",
        description: "Completed the NFT Creation & Trading course",
        tier: "common",
      },
    },
    {
      id: "security-101",
      title: "Crypto Security Essentials",
      description: "Essential security practices for protecting your cryptocurrency assets and accounts.",
      category: "security",
      difficulty: "beginner",
      duration: "45 min",
      instructor: "Security Sam",
      completionRate: 0,
      image: "/crypto-security-abstract.png",
      tags: ["security", "wallet", "protection"],
      xpReward: 500,
      badge: {
        name: "Security Sentinel",
        description: "Completed the Crypto Security Essentials course",
        tier: "common",
      },
    },
  ]

  // Filter courses based on search query and filters
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter
    const matchesDifficulty = difficultyFilter === "all" || course.difficulty === difficultyFilter

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  // Get governance courses
  const governanceCourses = courses.filter((course) => course.category === "governance")

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500 text-black"
      case "intermediate":
        return "bg-blue-500 text-black"
      case "advanced":
        return "bg-purple-500 text-black"
      case "expert":
        return "bg-red-500 text-black"
      default:
        return "bg-gray-500 text-black"
    }
  }

  const getBadgeTierColor = (tier: string) => {
    switch (tier) {
      case "common":
        return "border-blue-500/30 bg-blue-900/10 text-blue-400"
      case "uncommon":
        return "border-green-500/30 bg-green-900/10 text-green-400"
      case "rare":
        return "border-purple-500/30 bg-purple-900/10 text-purple-400"
      case "epic":
        return "border-amber-500/30 bg-amber-900/10 text-amber-400"
      case "legendary":
        return "border-red-500/30 bg-red-900/10 text-red-400"
      default:
        return "border-gray-500/30 bg-gray-900/10 text-gray-400"
    }
  }

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

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/20 px-4 py-4 backdrop-blur-md md:px-6">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-2xl font-bold text-white">ACE Learn</h1>
            <p className="text-gray-400">Master crypto, trading, and governance with our interactive courses</p>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 px-4 py-6 md:px-6">
          <div className="mx-auto max-w-6xl space-y-8">
            {/* Governance Progress Tracker */}
            {isLoggedIn && <GovernanceProgressTracker />}

            {/* Search and Filters */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="border-gray-700 bg-gray-900 pl-10 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[130px] border-gray-700 bg-gray-900 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-700 bg-gray-900 text-white">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="governance">Governance</SelectItem>
                    <SelectItem value="trading">Trading</SelectItem>
                    <SelectItem value="defi">DeFi</SelectItem>
                    <SelectItem value="nft">NFT</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="w-[130px] border-gray-700 bg-gray-900 text-white">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-700 bg-gray-900 text-white">
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Governance Learning Path */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Governance Learning Path</h2>
                <Badge className="bg-teal-500 text-black">Unlocks Voting Power</Badge>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {governanceCourses.map((course, index) => (
                  <Card
                    key={course.id}
                    className="border-gray-800 bg-black/40 backdrop-blur-sm transition-transform hover:scale-105"
                  >
                    <CardHeader className="pb-2">
                      <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                        <Badge className={`absolute right-2 top-2 ${getDifficultyColor(course.difficulty)}`}>
                          {course.difficulty}
                        </Badge>
                        {index > 0 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                            <div className="text-center">
                              <Lock className="mx-auto h-8 w-8 text-gray-400" />
                              <p className="mt-2 text-sm text-gray-400">Complete previous course to unlock</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="outline" className="border-teal-500 text-teal-400">
                          {course.category}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-400">
                          <Clock className="mr-1 h-4 w-4" />
                          {course.duration}
                        </div>
                      </div>
                      <CardTitle className="mt-2 line-clamp-2 text-lg text-white">{course.title}</CardTitle>
                      <div className="flex items-center space-x-1 text-xs text-gray-400">
                        <span>by</span>
                        <span className="font-medium text-teal-400">{course.instructor}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3 text-gray-400">{course.description}</CardDescription>

                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Completion</span>
                          <span className="text-teal-400">{course.completionRate}%</span>
                        </div>
                        <Progress value={course.completionRate} className="h-2 bg-gray-700" />

                        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-2">
                          <div className="flex items-center space-x-2">
                            <Award className="h-4 w-4 text-amber-400" />
                            <div>
                              <p className="text-xs font-medium text-white">Earn Badge</p>
                              <p className="text-xs text-gray-400">{course.badge.name}</p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-2">
                          <div className="flex items-center space-x-2">
                            <Zap className="h-4 w-4 text-blue-400" />
                            <div>
                              <p className="text-xs font-medium text-white">Unlocks</p>
                              <p className="text-xs text-gray-400">{course.unlocks.join(", ")}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full bg-teal-500 text-black hover:bg-teal-400"
                        disabled={index > 0}
                        onClick={() => router.push(`/learn/${course.id}`)}
                      >
                        {index === 0 ? "Start Learning" : "Locked"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* All Courses */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">All Courses</h2>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="border-gray-800 bg-black/40 backdrop-blur-sm transition-transform hover:scale-105"
                  >
                    <CardHeader className="pb-2">
                      <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                        <Badge className={`absolute right-2 top-2 ${getDifficultyColor(course.difficulty)}`}>
                          {course.difficulty}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="outline" className="border-teal-500 text-teal-400">
                          {course.category}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-400">
                          <Clock className="mr-1 h-4 w-4" />
                          {course.duration}
                        </div>
                      </div>
                      <CardTitle className="mt-2 line-clamp-2 text-lg text-white">{course.title}</CardTitle>
                      <div className="flex items-center space-x-1 text-xs text-gray-400">
                        <span>by</span>
                        <span className="font-medium text-teal-400">{course.instructor}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3 text-gray-400">{course.description}</CardDescription>

                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Completion</span>
                          <span className="text-teal-400">{course.completionRate}%</span>
                        </div>
                        <Progress value={course.completionRate} className="h-2 bg-gray-700" />

                        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-2">
                          <div className="flex items-center space-x-2">
                            <Award className="h-4 w-4 text-amber-400" />
                            <div>
                              <p className="text-xs font-medium text-white">Earn Badge</p>
                              <p className="text-xs text-gray-400">{course.badge.name}</p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-2">
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <div>
                              <p className="text-xs font-medium text-white">XP Reward</p>
                              <p className="text-xs text-gray-400">{course.xpReward} XP</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full bg-teal-500 text-black hover:bg-teal-400"
                        onClick={() => router.push(`/learn/${course.id}`)}
                      >
                        Start Learning
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Kat Tutorial Overlay */}
      {showKatTutorial && <KatTutorialOverlay onClose={() => setShowKatTutorial(false)} />}
    </div>
  )
}
