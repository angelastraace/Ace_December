import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Filter } from "lucide-react"

export default function ProposalOverview() {
  // Mock data for proposals
  const proposals = [
    {
      id: "AIP-45",
      title: "Enhance Staking Rewards",
      status: "Active",
      statusColor: "bg-green-500/20 text-green-400 border-green-700/30",
      proposer: "0x1a2b...3c4d",
      timeLeft: "2 days 5 hours",
      votes: { for: 65, against: 35 },
      description:
        "This proposal aims to increase staking rewards by 2% for long-term holders to incentivize platform stability.",
    },
    {
      id: "AIP-44",
      title: "Treasury Diversification Strategy",
      status: "Active",
      statusColor: "bg-green-500/20 text-green-400 border-green-700/30",
      proposer: "0x4d5e...6f7g",
      timeLeft: "3 days 12 hours",
      votes: { for: 72, against: 28 },
      description:
        "Diversify 10% of the DAO treasury into stablecoins to reduce volatility and ensure operational runway.",
    },
    {
      id: "AIP-43",
      title: "Governance Process Improvement",
      status: "Passed",
      statusColor: "bg-blue-500/20 text-blue-400 border-blue-700/30",
      proposer: "0x7h8i...9j0k",
      timeLeft: "Ended 2 days ago",
      votes: { for: 89, against: 11 },
      description:
        "Implement a two-phase voting process with a discussion period to improve proposal quality and community engagement.",
    },
  ]

  return (
    <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl text-white">Recent Proposals</CardTitle>
          <CardDescription>Latest governance activity</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-gray-700 bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <Filter className="mr-1 h-3 w-3" />
            Filter
          </Button>
          <Button size="sm" className="h-8 bg-teal-600 text-white hover:bg-teal-700">
            Create Proposal
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="rounded-lg border border-gray-800 bg-gray-800/30 p-4">
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-white">
                      {proposal.id}: {proposal.title}
                    </h3>
                    <Badge variant="outline" className={proposal.statusColor}>
                      {proposal.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400">
                    Proposed by: {proposal.proposer} • {proposal.timeLeft}
                  </p>
                </div>
              </div>
              <p className="mb-3 text-sm text-gray-300">{proposal.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-700">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-blue-500"
                      style={{ width: `${proposal.votes.for}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400">{proposal.votes.for}% in favor</span>
                </div>
                <Button variant="ghost" size="sm" className="text-teal-400 hover:text-teal-300">
                  View Details <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="link" className="text-teal-400 hover:text-teal-300">
            View All Proposals
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
