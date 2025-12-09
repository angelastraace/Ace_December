import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Vote, BarChart3 } from "lucide-react"

export default function GovernanceStats() {
  // Mock data for governance statistics
  const stats = [
    {
      title: "Active Proposals",
      value: 24,
      change: "+3 this week",
      icon: <FileText className="h-5 w-5 text-teal-400" />,
      color: "text-teal-400",
    },
    {
      title: "Tokens Staked",
      value: "68.5M",
      change: "12.4% of supply",
      icon: <BarChart3 className="h-5 w-5 text-blue-400" />,
      color: "text-blue-400",
    },
    {
      title: "Active Voters",
      value: "12.4K",
      change: "+5.2% this month",
      icon: <Users className="h-5 w-5 text-purple-400" />,
      color: "text-purple-400",
    },
    {
      title: "Votes Cast",
      value: "156K",
      change: "Last 30 days",
      icon: <Vote className="h-5 w-5 text-amber-400" />,
      color: "text-amber-400",
    },
  ]

  return (
    <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-white">Governance Statistics</CardTitle>
        <CardDescription>Current participation metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-lg bg-gray-800/50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm text-gray-400">{stat.title}</h3>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className={`mt-1 text-xs ${stat.color}`}>{stat.change}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
