"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, Filter, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import ProposalSubmissionForm from "@/components/governance/proposal-submission-form"
import ProposalDetails from "@/components/governance/proposal-details"
import GovernanceStats from "@/components/governance/governance-stats"
import VotingPowerCard from "@/components/governance/voting-power-card"
import { isAuthenticated } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function GovernancePage() {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    setIsLoggedIn(isAuthenticated())
  }, [])

  // Mock proposals data
  const proposals = [
    {
      id: "prop-001",
      title: "Add Limit Order Stop Loss Feature",
      description: "Implement a stop-loss feature for limit orders to enhance trading capabilities.",
      creator: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
      creatorName: "ACE_Trader",
      type: "feature",
      status: "active",
      votesFor: 1250000,
      votesAgainst: 450000,
      quorum: 2000000,
      startTime: "2023-12-01T00:00:00Z",
      endTime: "2023-12-15T00:00:00Z",
      tags: ["trading", "feature", "high-priority"],
    },
    {
      id: "prop-002",
      title: "Allocate 100,000 ACE for Developer Grants",
      description: "Allocate treasury funds to support developers building on the ACE ecosystem.",
      creator: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u",
      creatorName: "ACE_Builder",
      type: "treasury",
      status: "active",
      votesFor: 1800000,
      votesAgainst: 200000,
      quorum: 2000000,
      startTime: "2023-12-05T00:00:00Z",
      endTime: "2023-12-20T00:00:00Z",
      tags: ["treasury", "grants", "ecosystem"],
    },
    {
      id: "prop-003",
      title: "List PEPE Token on ACE Exchange",
      description: "Add PEPE token to the exchange with USDT and ETH trading pairs.",
      creator: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v",
      creatorName: "Pepe_Lover",
      type: "listing",
      status: "pending",
      votesFor: 0,
      votesAgainst: 0,
      quorum: 2000000,
      startTime: "2023-12-20T00:00:00Z",
      endTime: "2024-01-03T00:00:00Z",
      tags: ["listing", "meme", "token"],
    },
    {
      id: "prop-004",
      title: "Reduce Trading Fees for High-Volume Traders",
      description: "Implement a tiered fee structure that rewards high-volume traders with lower fees.",
      creator: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w",
      creatorName: "Whale_Trader",
      type: "feature",
      status: "closed",
      votesFor: 2200000,
      votesAgainst: 800000,
      quorum: 2000000,
      startTime: "2023-11-15T00:00:00Z",
      endTime: "2023-11-30T00:00:00Z",
      tags: ["fees", "trading", "incentives"],
      result: "passed",
    },
    {
      id: "prop-005",
      title: "Add Dark Mode to Mobile App",
      description: "Implement a dark mode option for the ACE Exchange mobile application.",
      creator: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x",
      creatorName: "Night_Owl",
      type: "feature",
      status: "closed",
      votesFor: 900000,
      votesAgainst: 1200000,
      quorum: 2000000,
      startTime: "2023-11-10T00:00:00Z",
      endTime: "2023-11-25T00:00:00Z",
      tags: ["mobile", "UI", "feature"],
      result: "rejected",
    },
    {
      id: "prop-006",
      title: "Integrate Chainlink Price Feeds",
      description: "Integrate Chainlink price feeds for more accurate and manipulation-resistant price data.",
      creator: "0x6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y",
      creatorName: "Oracle_Fan",
      type: "feature",
      status: "active",
      votesFor: 1500000,
      votesAgainst: 300000,
      quorum: 2000000,
      startTime: "2023-12-03T00:00:00Z",
      endTime: "2023-12-18T00:00:00Z",
      tags: ["oracles", "infrastructure", "security"],
    },
  ]

  // Filter proposals based on status and search query
  const filteredProposals = proposals.filter((proposal) => {
    const matchesFilter = filter === "all" || proposal.status === filter
    const matchesSearch =
      proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const getStatusBadge = (status: string, result?: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 text-black">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 text-black">Pending</Badge>
      case "closed":
        if (result === "passed") {
          return <Badge className="bg-teal-500 text-black">Passed</Badge>
        } else if (result === "rejected") {
          return <Badge className="bg-red-500 text-black">Rejected</Badge>
        } else {
          return <Badge className="bg-gray-500 text-black">Closed</Badge>
        }
      default:
        return <Badge className="bg-gray-500 text-black">Unknown</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feature":
        return <TrendingUp className="h-5 w-5 text-blue-400" />
      case "treasury":
        return <Clock className="h-5 w-5 text-amber-400" />
      case "listing":
        return <AlertCircle className="h-5 w-5 text-purple-400" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "feature":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-400">
            Feature
          </Badge>
        )
      case "treasury":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-400">
            Treasury
          </Badge>
        )
      case "listing":
        return (
          <Badge variant="outline" className="border-purple-500 text-purple-400">
            Listing
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const calculateTimeRemaining = (endTime: string) => {
    const end = new Date(endTime)
    const now = new Date()
    const diff = end.getTime() - now.getTime()

    if (diff <= 0) return "Voting ended"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    return `${days}d ${hours}h remaining`
  }

  const calculateProgress = (votesFor: number, votesAgainst: number, quorum: number) => {
    const totalVotes = votesFor + votesAgainst
    return Math.min(Math.round((totalVotes / quorum) * 100), 100)
  }

  const handleCreateProposal = () => {
    if (!isLoggedIn) {
      router.push("/admin/login?redirect=/governance")
      return
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
            <h1 className="text-2xl font-bold text-white">ACE Governance</h1>
            <p className="text-gray-400">Shape the future of ACE Exchange through community-driven proposals</p>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 px-4 py-6 md:px-6">
          <div className="mx-auto max-w-6xl">
            {selectedProposal ? (
              <div>
                <Button
                  variant="outline"
                  className="mb-6 border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={() => setSelectedProposal(null)}
                >
                  ← Back to Proposals
                </Button>
                <ProposalDetails
                  proposal={proposals.find((p) => p.id === selectedProposal)!}
                  onBack={() => setSelectedProposal(null)}
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <GovernanceStats />
                  <VotingPowerCard />
                </div>

                <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                  <h2 className="text-xl font-bold text-white">Governance Proposals</h2>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-teal-500 text-black hover:bg-teal-400" onClick={handleCreateProposal}>
                          <PlusCircle className="mr-2 h-4 w-4" /> Create Proposal
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="border-gray-700 bg-gray-900 text-white sm:max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Create New Proposal</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Submit a new proposal for the ACE community to vote on.
                          </DialogDescription>
                        </DialogHeader>
                        <ProposalSubmissionForm />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="border-gray-700 bg-gray-900 pl-10 text-white">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent className="border-gray-700 bg-gray-900 text-white">
                          <SelectItem value="all">All Proposals</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="relative w-full max-w-xs">
                    <Input
                      type="search"
                      placeholder="Search proposals..."
                      className="border-gray-700 bg-gray-900 text-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <Tabs defaultValue="grid" className="w-full">
                  <TabsList className="grid w-40 grid-cols-2 bg-gray-900">
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                  </TabsList>

                  <TabsContent value="grid" className="mt-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredProposals.map((proposal) => (
                        <Card
                          key={proposal.id}
                          className="border-gray-800 bg-black/40 backdrop-blur-sm transition-transform hover:scale-105"
                          onClick={() => setSelectedProposal(proposal.id)}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              {getTypeBadge(proposal.type)}
                              {getStatusBadge(proposal.status, proposal.result)}
                            </div>
                            <CardTitle className="mt-2 line-clamp-2 text-lg text-white">{proposal.title}</CardTitle>
                            <div className="flex items-center space-x-1 text-xs text-gray-400">
                              <span>by</span>
                              <span className="font-medium text-teal-400">{proposal.creatorName}</span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="line-clamp-3 text-gray-400">
                              {proposal.description}
                            </CardDescription>

                            <div className="mt-4 space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-green-400">Yes: {(proposal.votesFor / 1000000).toFixed(2)}M</span>
                                <span className="text-red-400">
                                  No: {(proposal.votesAgainst / 1000000).toFixed(2)}M
                                </span>
                              </div>
                              <Progress
                                value={calculateProgress(proposal.votesFor, proposal.votesAgainst, proposal.quorum)}
                                className="h-2 bg-gray-700"
                              />
                              <div className="flex items-center justify-between text-xs text-gray-400">
                                <span>
                                  {((proposal.votesFor + proposal.votesAgainst) / 1000000).toFixed(2)}M /{" "}
                                  {(proposal.quorum / 1000000).toFixed(2)}M votes
                                </span>
                                <span>{calculateTimeRemaining(proposal.endTime)}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex flex-wrap gap-2 pt-0">
                            {proposal.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="border-gray-700 text-xs text-gray-400">
                                {tag}
                              </Badge>
                            ))}
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="list" className="mt-6">
                    <div className="space-y-4">
                      {filteredProposals.map((proposal) => (
                        <Card
                          key={proposal.id}
                          className="border-gray-800 bg-black/40 backdrop-blur-sm hover:bg-gray-900/40"
                          onClick={() => setSelectedProposal(proposal.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  {getTypeIcon(proposal.type)}
                                  <h3 className="font-bold text-white">{proposal.title}</h3>
                                  {getStatusBadge(proposal.status, proposal.result)}
                                </div>
                                <p className="mt-1 line-clamp-2 text-sm text-gray-400">{proposal.description}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {proposal.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="outline"
                                      className="border-gray-700 text-xs text-gray-400"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex flex-col items-end space-y-2">
                                <div className="flex items-center space-x-4">
                                  <div className="text-right">
                                    <div className="flex items-center space-x-2">
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                      <span className="text-sm text-green-400">
                                        {(proposal.votesFor / 1000000).toFixed(2)}M
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="flex items-center space-x-2">
                                      <XCircle className="h-4 w-4 text-red-500" />
                                      <span className="text-sm text-red-400">
                                        {(proposal.votesAgainst / 1000000).toFixed(2)}M
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <Progress
                                  value={calculateProgress(proposal.votesFor, proposal.votesAgainst, proposal.quorum)}
                                  className="h-2 w-40 bg-gray-700"
                                />
                                <span className="text-xs text-gray-400">
                                  {calculateTimeRemaining(proposal.endTime)}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
