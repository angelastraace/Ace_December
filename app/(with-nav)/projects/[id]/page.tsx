"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Star, FileText, Globe, Twitter, Share2, Heart, Bell, ChevronRight, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

// Mock data - in a real app, this would come from an API
const projectsData = {
  "cosmic-explorers": {
    id: "cosmic-explorers",
    name: "Cosmic Explorers",
    description:
      "The first decentralized space exploration metaverse with real astronomical data and NFT-based governance.",
    longDescription:
      "Cosmic Explorers is building the first fully decentralized space exploration metaverse that combines real astronomical data with blockchain technology. Users can explore virtual representations of real cosmic objects, claim territories, build space stations, and participate in a player-driven economy.\n\nThe platform uses NFTs to represent ownership of virtual space assets and implements a DAO governance system where token holders can vote on the direction of the metaverse development. Our team consists of astronomers, game developers, and blockchain experts committed to creating an immersive and scientifically accurate space exploration experience.",
    image: "/cosmic-explorers-banner.png",
    logo: "/cosmic-explorers-logo.png",
    raised: 850000,
    goal: 1000000,
    participants: 3240,
    status: "live",
    timeLeft: "2d 14h 35m",
    tags: ["Metaverse", "Gaming", "NFT"],
    credibilityScore: 92,
    tokenName: "Cosmic",
    tokenSymbol: "CSMC",
    tokenPrice: 0.05,
    tokenSupply: 100000000,
    tokenAllocation: [
      { name: "Public Sale", percentage: 40 },
      { name: "Team", percentage: 20 },
      { name: "Marketing", percentage: 15 },
      { name: "Development", percentage: 15 },
      { name: "Ecosystem", percentage: 10 },
    ],
    vestingSchedule: "25% at TGE, then 25% every 3 months",
    minContribution: 100,
    maxContribution: 10000,
    startDate: "2025-05-01",
    endDate: "2025-05-15",
    website: "https://cosmicexplorers.io",
    twitter: "https://twitter.com/cosmicexplorers",
    discord: "https://discord.gg/cosmicexplorers",
    telegram: "https://t.me/cosmicexplorers",
    github: "https://github.com/cosmicexplorers",
    whitepaper: "/cosmic-explorers-whitepaper.pdf",
    team: [
      {
        name: "Dr. Elena Starling",
        role: "CEO & Founder",
        bio: "Former NASA astrophysicist with 15 years of experience in space research and technology.",
        avatar: "/team-elena.png",
      },
      {
        name: "Marcus Chen",
        role: "CTO",
        bio: "Blockchain developer with experience at Ethereum Foundation and multiple successful DeFi projects.",
        avatar: "/team-marcus.png",
      },
      {
        name: "Sophia Rodriguez",
        role: "Game Director",
        bio: "Former lead designer at Epic Games with expertise in creating immersive virtual worlds.",
        avatar: "/team-sophia.png",
      },
    ],
    roadmap: [
      {
        title: "Q2 2025",
        milestones: [
          "Token launch on ACE Launchpad",
          "Alpha version of the metaverse explorer",
          "First NFT collection release",
        ],
        completed: true,
      },
      {
        title: "Q3 2025",
        milestones: [
          "Beta version with multiplayer functionality",
          "Integration with major wallets",
          "Launch of the marketplace for space assets",
        ],
        completed: false,
      },
      {
        title: "Q4 2025",
        milestones: [
          "Full release of the metaverse",
          "Implementation of the DAO governance system",
          "Partnership announcements with space agencies",
        ],
        completed: false,
      },
      {
        title: "Q1 2026",
        milestones: ["Mobile app release", "VR/AR integration", "Expansion to new blockchain networks"],
        completed: false,
      },
    ],
    updates: [
      {
        date: "2025-05-10",
        title: "Partnership with SpaceX Announced",
        content:
          "We're excited to announce our partnership with SpaceX to bring real-time space mission data into our metaverse!",
        author: "Dr. Elena Starling",
      },
      {
        date: "2025-05-05",
        title: "Alpha Testing Results",
        content:
          "Our alpha testing phase has concluded with over 1,000 participants. The feedback has been overwhelmingly positive!",
        author: "Marcus Chen",
      },
    ],
    faqs: [
      {
        question: "What blockchain will Cosmic Explorers be built on?",
        answer:
          "Cosmic Explorers will initially launch on Ethereum with a Layer 2 solution for scalability. We plan to expand to other chains in the future.",
      },
      {
        question: "How can I participate in the token sale?",
        answer:
          "You need to have at least 1,000 ACE tokens staked or be an NFT pass holder to participate in the token sale. The minimum contribution is $100 and the maximum is $10,000.",
      },
      {
        question: "Will there be a vesting period for tokens?",
        answer:
          "Yes, tokens will be distributed with a vesting schedule of 25% at TGE (Token Generation Event), and then 25% every 3 months thereafter.",
      },
    ],
  },
}

export default function ProjectDetailPage() {
  const params = useParams()
  const { id } = params
  const project = projectsData[id]
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isNotified, setIsNotified] = useState(false)
  const [contributionAmount, setContributionAmount] = useState(project.minContribution)
  const [showParticipateDialog, setShowParticipateDialog] = useState(false)

  if (!project) {
    return <div>Project not found</div>
  }

  const tokenAmount = contributionAmount / project.tokenPrice

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Link href="/launchpad" className="flex items-center text-muted-foreground hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Launchpad
      </Link>

      {/* Project Header */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-0.5">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative h-[300px] w-full">
          <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-16 w-16 rounded-full bg-black/50 p-1 backdrop-blur-sm">
              <Image
                src={project.logo || "/placeholder.svg"}
                alt={project.name + " logo"}
                width={64}
                height={64}
                className="rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-white">{project.name}</h1>
                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500">
                  LIVE
                </Badge>
              </div>
              <div className="flex gap-2 mt-1">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-white/10">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>Token sale is live now</CardDescription>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-1">{project.credibilityScore}</span>
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Raised</p>
                <p className="text-xl font-bold">${project.raised.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">of ${project.goal.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Participants</p>
                <p className="text-xl font-bold">{project.participants.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time Left</p>
                <p className="text-xl font-bold">{project.timeLeft}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Token Price</p>
                <p className="text-xl font-bold">${project.tokenPrice}</p>
              </div>
            </div>

            <div>
              <Progress value={(project.raised / project.goal) * 100} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                {Math.round((project.raised / project.goal) * 100)}% of goal reached
              </p>
            </div>

            <p className="text-sm">{project.longDescription}</p>

            <div className="flex flex-wrap gap-4">
              {project.website && (
                <Link
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-muted-foreground hover:text-primary"
                >
                  <Globe className="mr-1 h-4 w-4" />
                  Website
                </Link>
              )}
              {project.twitter && (
                <Link
                  href={project.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-muted-foreground hover:text-primary"
                >
                  <Twitter className="mr-1 h-4 w-4" />
                  Twitter
                </Link>
              )}
              {project.whitepaper && (
                <Link
                  href={project.whitepaper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-muted-foreground hover:text-primary"
                >
                  <FileText className="mr-1 h-4 w-4" />
                  Whitepaper
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Participate</CardTitle>
            <CardDescription>Join the {project.name} token sale</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Min. Contribution</span>
                <span className="font-medium">${project.minContribution}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Max. Contribution</span>
                <span className="font-medium">${project.maxContribution}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span>Token Price</span>
                <span className="font-medium">${project.tokenPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Token Symbol</span>
                <span className="font-medium">{project.tokenSymbol}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span>Sale Ends In</span>
                <span className="font-medium">{project.timeLeft}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Dialog open={showParticipateDialog} onOpenChange={setShowParticipateDialog}>
              <DialogTrigger asChild>
                <Button className="w-full">Participate Now</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Participate in {project.name}</DialogTitle>
                  <DialogDescription>Enter the amount you want to contribute to this project.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contribution Amount (USD)</label>
                    <Input
                      type="number"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(Number(e.target.value))}
                      min={project.minContribution}
                      max={project.maxContribution}
                    />
                    <Slider
                      value={[contributionAmount]}
                      min={project.minContribution}
                      max={project.maxContribution}
                      step={10}
                      onValueChange={(value) => setContributionAmount(value[0])}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${project.minContribution}</span>
                      <span>${project.maxContribution}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">You will receive</label>
                    <div className="text-2xl font-bold">
                      {tokenAmount.toLocaleString()} {project.tokenSymbol}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Payment Method</label>
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <Image src="/images/ace-coin.png" alt="ACE Token" width={24} height={24} />
                      <span>ACE Token</span>
                      <Badge className="ml-auto">10% Discount</Badge>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => setShowParticipateDialog(false)}>
                    Confirm Participation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1" onClick={() => setIsWishlisted(!isWishlisted)}>
                {isWishlisted ? (
                  <Heart className="mr-2 h-4 w-4 fill-red-500 text-red-500" />
                ) : (
                  <Heart className="mr-2 h-4 w-4" />
                )}
                {isWishlisted ? "Wishlisted" : "Wishlist"}
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setIsNotified(!isNotified)}>
                {isNotified ? (
                  <Bell className="mr-2 h-4 w-4 fill-yellow-500 text-yellow-500" />
                ) : (
                  <Bell className="mr-2 h-4 w-4" />
                )}
                {isNotified ? "Notified" : "Notify Me"}
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Project Details Tabs */}
      <Tabs defaultValue="tokenomics" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="updates">Updates & FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="tokenomics" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Token Details</CardTitle>
              <CardDescription>Information about the {project.tokenSymbol} token</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Token Name</p>
                  <p className="font-medium">{project.tokenName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Token Symbol</p>
                  <p className="font-medium">{project.tokenSymbol}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Token Price</p>
                  <p className="font-medium">${project.tokenPrice}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Supply</p>
                  <p className="font-medium">{project.tokenSupply.toLocaleString()}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Token Allocation</h3>
                <div className="space-y-4">
                  {project.tokenAllocation.map((allocation, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{allocation.name}</span>
                        <span>{allocation.percentage}%</span>
                      </div>
                      <Progress value={allocation.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Vesting Schedule</h3>
                <p className="text-sm">{project.vestingSchedule}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Meet the people behind {project.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.team.map((member, index) => (
                  <div key={index} className="flex flex-col items-center text-center p-4 border rounded-lg">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                    <p className="text-sm">{member.bio}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Roadmap</CardTitle>
              <CardDescription>The development plan for {project.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l border-muted pl-6 ml-6 space-y-10">
                {project.roadmap.map((phase, index) => (
                  <div key={index} className="relative">
                    <div
                      className={`absolute w-4 h-4 rounded-full -left-8 top-0 ${phase.completed ? "bg-green-500" : "bg-muted-foreground"}`}
                    >
                      {phase.completed && <Check className="h-3 w-3 text-white absolute top-0.5 left-0.5" />}
                    </div>
                    <h3 className="text-lg font-medium">{phase.title}</h3>
                    <ul className="mt-2 space-y-2">
                      {phase.milestones.map((milestone, idx) => (
                        <li key={idx} className="flex items-start">
                          <ChevronRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{milestone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="updates" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Updates</CardTitle>
                <CardDescription>Latest news from the team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {project.updates.map((update, index) => (
                    <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{update.title}</h3>
                        <span className="text-xs text-muted-foreground">{update.date}</span>
                      </div>
                      <p className="text-sm mb-2">{update.content}</p>
                      <p className="text-xs text-muted-foreground">Posted by {update.author}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions about {project.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {project.faqs.map((faq, index) => (
                    <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                      <h3 className="font-medium mb-2">{faq.question}</h3>
                      <p className="text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
