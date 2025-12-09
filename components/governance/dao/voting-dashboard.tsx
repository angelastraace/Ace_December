import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThumbsUp, ThumbsDown, Clock, AlertCircle, CheckCircle2 } from "lucide-react"

interface VotingDashboardProps {
  currentUser: any
}

export default function VotingDashboard({ currentUser }: VotingDashboardProps) {
  // Mock data for active proposals
  const activeProposals = [
    {
      id: "AIP-45",
      title: "Enhance Staking Rewards",
      description:
        "This proposal aims to increase staking rewards by 2% for long-term holders to incentivize platform stability.",
      proposer: "0x1a2b...3c4d",
      created: "3 days ago",
      endsIn: "2 days 5 hours",
      votes: {
        for: 6500000,
        against: 3500000,
        abstain: 500000,
        total: 10500000,
        quorum: 10000000,
        forPercent: 65,
        againstPercent: 35,
      },
      userVoted: false,
    },
    {
      id: "AIP-44",
      title: "Treasury Diversification Strategy",
      description:
        "Diversify 10% of the DAO treasury into stablecoins to reduce volatility and ensure operational runway.",
      proposer: "0x4d5e...6f7g",
      created: "5 days ago",
      endsIn: "3 days 12 hours",
      votes: {
        for: 7200000,
        against: 2800000,
        abstain: 300000,
        total: 10300000,
        quorum: 10000000,
        forPercent: 72,
        againstPercent: 28,
      },
      userVoted: true,
      userVote: "for",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-white">Your Voting Power</CardTitle>
            <Badge variant="outline" className="border-teal-500 bg-teal-500/10 text-teal-400">
              Tier 3 Voter
            </Badge>
          </div>
          <CardDescription>Manage your voting power and delegation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-gray-800/50 p-4">
              <p className="text-sm text-gray-400">Available Voting Power</p>
              <p className="text-2xl font-bold text-white">{currentUser.votingPower.toLocaleString()} ACE</p>
              <div className="mt-2 flex items-center text-xs text-teal-400">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Ready to vote
              </div>
            </div>
            <div className="rounded-lg bg-gray-800/50 p-4">
              <p className="text-sm text-gray-400">Delegated To You</p>
              <p className="text-2xl font-bold text-white">{currentUser.delegatedPower.toLocaleString()} ACE</p>
              <div className="mt-2 flex items-center text-xs text-blue-400">
                <AlertCircle className="mr-1 h-3 w-3" />
                From 3 delegators
              </div>
            </div>
            <div className="rounded-lg bg-gray-800/50 p-4">
              <p className="text-sm text-gray-400">Total Influence</p>
              <p className="text-2xl font-bold text-white">
                {(currentUser.votingPower + currentUser.delegatedPower).toLocaleString()} ACE
              </p>
              <div className="mt-2 flex items-center text-xs text-purple-400">
                <Clock className="mr-1 h-3 w-3" />
                0.2% of total supply
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button className="bg-teal-600 text-white hover:bg-teal-700">Stake More ACE</Button>
            <Button
              variant="outline"
              className="border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Manage Delegation
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <Tabs defaultValue="active">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="active">Active Proposals (2)</TabsTrigger>
            <TabsTrigger value="voted">Voted (5)</TabsTrigger>
            <TabsTrigger value="closed">Closed (12)</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-4 space-y-4">
            {activeProposals.map((proposal) => (
              <Card key={proposal.id} className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg text-white">
                          {proposal.id}: {proposal.title}
                        </CardTitle>
                        {proposal.userVoted && (
                          <Badge variant="outline" className="border-blue-500 bg-blue-500/10 text-blue-400">
                            You voted {proposal.userVote}
                          </Badge>
                        )}
                      </div>
                      <CardDescription>
                        Proposed by {proposal.proposer} • {proposal.created} • Ends in {proposal.endsIn}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-green-500 bg-green-500/10 text-green-400">
                        Quorum Reached
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-300">{proposal.description}</p>

                  <div className="mb-4 space-y-3">
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="flex items-center text-green-400">
                          <ThumbsUp className="mr-1 h-4 w-4" /> For
                        </span>
                        <span className="text-white">
                          {proposal.votes.forPercent}% ({proposal.votes.for.toLocaleString()} ACE)
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-800">
                        <div className="h-full bg-green-500" style={{ width: `${proposal.votes.forPercent}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="flex items-center text-red-400">
                          <ThumbsDown className="mr-1 h-4 w-4" /> Against
                        </span>
                        <span className="text-white">
                          {proposal.votes.againstPercent}% ({proposal.votes.against.toLocaleString()} ACE)
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-800">
                        <div className="h-full bg-red-500" style={{ width: `${proposal.votes.againstPercent}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-sm text-gray-400">
                      <span className="text-white">{proposal.votes.total.toLocaleString()}</span> ACE voted of{" "}
                      <span className="text-white">{proposal.votes.quorum.toLocaleString()}</span> required
                    </div>

                    {!proposal.userVoted ? (
                      <div className="flex flex-wrap gap-2">
                        <Button className="bg-green-600 text-white hover:bg-green-700">
                          <ThumbsUp className="mr-1 h-4 w-4" /> Vote For
                        </Button>
                        <Button className="bg-red-600 text-white hover:bg-red-700">
                          <ThumbsDown className="mr-1 h-4 w-4" /> Vote Against
                        </Button>
                        <Button
                          variant="outline"
                          className="border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                          Abstain
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        Change Vote
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="voted" className="mt-4">
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <p className="text-center text-gray-400">Your voted proposals will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="closed" className="mt-4">
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <p className="text-center text-gray-400">Closed proposals will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
