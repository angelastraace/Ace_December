"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Zap, Lock, Info, ExternalLink, CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function AccessPassesPage() {
  const [activeTab, setActiveTab] = useState("my-passes")

  const myPasses = [
    {
      id: "ace-pioneer",
      name: "ACE Pioneer",
      description: "Early access to all launchpad projects with guaranteed allocation",
      image: "/ace-pioneer-pass.png",
      tier: "Legendary",
      benefits: [
        "Guaranteed allocation in all projects",
        "3x allocation multiplier",
        "24-hour early access",
        "Exclusive AMAs with founders",
        "Zero participation fees",
      ],
      projects: 12,
      expires: "Never",
      status: "active",
    },
    {
      id: "cosmic-explorer",
      name: "Cosmic Explorer",
      description: "Special access pass for the Cosmic Explorers project",
      image: "/cosmic-explorer-pass.png",
      tier: "Rare",
      benefits: [
        "Guaranteed allocation in Cosmic Explorers",
        "2x allocation multiplier",
        "12-hour early access",
        "Exclusive NFT airdrop",
      ],
      projects: 1,
      expires: "2025-06-15",
      status: "active",
    },
  ]

  const availablePasses = [
    {
      id: "ace-voyager",
      name: "ACE Voyager",
      description: "Premium access to selected launchpad projects",
      image: "/ace-voyager-pass.png",
      tier: "Epic",
      benefits: [
        "Guaranteed allocation in selected projects",
        "2x allocation multiplier",
        "12-hour early access",
        "Reduced participation fees",
      ],
      price: 500,
      currency: "ACE",
      supply: 1000,
      remaining: 342,
      requirements: "Stake 5,000 ACE tokens for 30 days",
    },
    {
      id: "quantum-access",
      name: "Quantum Access",
      description: "Special access pass for the Quantum Finance project",
      image: "/quantum-access-pass.png",
      tier: "Rare",
      benefits: ["Guaranteed allocation in Quantum Finance", "1.5x allocation multiplier", "6-hour early access"],
      price: 200,
      currency: "ACE",
      supply: 2000,
      remaining: 1205,
      requirements: "Stake 2,000 ACE tokens for 14 days",
    },
    {
      id: "neo-creator",
      name: "Neo Creator",
      description: "Special access pass for the Neo Creators project",
      image: "/neo-creator-pass.png",
      tier: "Rare",
      benefits: ["Guaranteed allocation in Neo Creators", "1.5x allocation multiplier", "6-hour early access"],
      price: 150,
      currency: "ACE",
      supply: 3000,
      remaining: 2100,
      requirements: "Stake 1,500 ACE tokens for 14 days",
    },
  ]

  const [selectedPass, setSelectedPass] = useState(null)
  const [showPassDetails, setShowPassDetails] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Link href="/launchpad" className="flex items-center text-muted-foreground hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Launchpad
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Access Passes</h1>
          <p className="text-muted-foreground mt-2">NFT passes that grant special access to launchpad projects</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="my-passes">My Passes</TabsTrigger>
          <TabsTrigger value="available">Available Passes</TabsTrigger>
        </TabsList>

        <TabsContent value="my-passes" className="space-y-6 mt-6">
          {myPasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myPasses.map((pass) => (
                <Card key={pass.id} className="overflow-hidden">
                  <div className="relative h-48 w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                    <Image src={pass.image || "/placeholder.svg"} alt={pass.name} fill className="object-cover" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white">ACTIVE</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="outline" className="bg-black/50 backdrop-blur-sm border-white/20 text-white">
                        {pass.tier} Tier
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                        <CardTitle>{pass.name}</CardTitle>
                      </div>
                    </div>
                    <CardDescription>{pass.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Projects</p>
                          <p className="font-medium">{pass.projects === 1 ? "Single Project" : "All Projects"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Expires</p>
                          <p className="font-medium">{pass.expires}</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium">Key Benefits</p>
                        <ul className="text-sm space-y-1">
                          {pass.benefits.slice(0, 2).map((benefit, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle2 className="h-3 w-3 mr-2 text-green-500" />
                              {benefit}
                            </li>
                          ))}
                          {pass.benefits.length > 2 && (
                            <li className="text-xs text-muted-foreground">
                              + {pass.benefits.length - 2} more benefits
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSelectedPass(pass)
                        setShowPassDetails(true)
                      }}
                    >
                      View Pass Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Passes Yet</CardTitle>
                <CardDescription>You don't have any access passes yet</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Lock className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground mb-6">
                  Access passes grant you special privileges for launchpad projects, including guaranteed allocations
                  and early access.
                </p>
                <Button onClick={() => setActiveTab("available")}>Browse Available Passes</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="available" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availablePasses.map((pass) => (
              <Card key={pass.id} className="overflow-hidden">
                <div className="relative h-48 w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                  <Image src={pass.image || "/placeholder.svg"} alt={pass.name} fill className="object-cover" />
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="outline" className="bg-black/50 backdrop-blur-sm border-white/20 text-white">
                      {pass.tier} Tier
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                      <CardTitle>{pass.name}</CardTitle>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{pass.requirements}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <CardDescription>{pass.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-medium">
                          {pass.price} {pass.currency}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Supply</p>
                        <p className="font-medium">
                          {pass.remaining} / {pass.supply}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Remaining</span>
                        <span>{Math.round((pass.remaining / pass.supply) * 100)}%</span>
                      </div>
                      <Progress value={(pass.remaining / pass.supply) * 100} className="h-1.5" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium">Key Benefits</p>
                      <ul className="text-sm space-y-1">
                        {pass.benefits.slice(0, 2).map((benefit, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle2 className="h-3 w-3 mr-2 text-green-500" />
                            {benefit}
                          </li>
                        ))}
                        {pass.benefits.length > 2 && (
                          <li className="text-xs text-muted-foreground">+ {pass.benefits.length - 2} more benefits</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button className="w-full">Acquire Pass</Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedPass(pass)
                      setShowPassDetails(true)
                    }}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Pass Details Dialog */}
      <Dialog open={showPassDetails} onOpenChange={setShowPassDetails}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedPass && (
            <>
              <DialogHeader>
                <div className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  <DialogTitle>{selectedPass.name}</DialogTitle>
                </div>
                <DialogDescription>{selectedPass.description}</DialogDescription>
              </DialogHeader>
              <div className="relative h-48 w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-md overflow-hidden">
                <Image
                  src={selectedPass.image || "/placeholder.svg"}
                  alt={selectedPass.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <Badge variant="outline" className="bg-black/50 backdrop-blur-sm border-white/20 text-white">
                    {selectedPass.tier} Tier
                  </Badge>
                </div>
              </div>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  {"price" in selectedPass ? (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-medium">
                          {selectedPass.price} {selectedPass.currency}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Supply</p>
                        <p className="font-medium">
                          {selectedPass.remaining} / {selectedPass.supply}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Projects</p>
                        <p className="font-medium">{selectedPass.projects === 1 ? "Single Project" : "All Projects"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Expires</p>
                        <p className="font-medium">{selectedPass.expires}</p>
                      </div>
                    </>
                  )}
                </div>

                {"requirements" in selectedPass && (
                  <div>
                    <p className="text-sm font-medium mb-1">Requirements</p>
                    <p className="text-sm">{selectedPass.requirements}</p>
                  </div>
                )}

                <Separator />

                <div>
                  <p className="text-sm font-medium mb-2">Benefits</p>
                  <ul className="text-sm space-y-2">
                    {selectedPass.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <DialogFooter>
                {"price" in selectedPass ? (
                  <Button className="w-full">Acquire Pass</Button>
                ) : (
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/launchpad">
                      Browse Projects
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
