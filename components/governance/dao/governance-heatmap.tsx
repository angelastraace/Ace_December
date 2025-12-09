import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GovernanceHeatmap() {
  // Mock data for the heatmap
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // Generate random activity data
  const generateActivityData = () => {
    return Array.from({ length: 12 }, () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)))
  }

  const activityData = generateActivityData()

  return (
    <div className="space-y-6">
      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-white">Governance Activity Heatmap</CardTitle>
          <CardDescription>Visualize governance participation patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="year" className="mb-1 block text-sm text-gray-400">
                  Year
                </label>
                <Select defaultValue="2023">
                  <SelectTrigger id="year" className="w-24 border-gray-700 bg-gray-800 text-white">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-700 bg-gray-800 text-white">
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="activity" className="mb-1 block text-sm text-gray-400">
                  Activity Type
                </label>
                <Select defaultValue="votes">
                  <SelectTrigger id="activity" className="w-36 border-gray-700 bg-gray-800 text-white">
                    <SelectValue placeholder="Activity" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-700 bg-gray-800 text-white">
                    <SelectItem value="votes">Votes Cast</SelectItem>
                    <SelectItem value="proposals">Proposals</SelectItem>
                    <SelectItem value="comments">Comments</SelectItem>
                    <SelectItem value="delegates">Delegations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-sm bg-teal-900"></div>
              <span className="text-xs text-gray-400">Low</span>
              <div className="h-3 w-3 rounded-sm bg-teal-700"></div>
              <span className="text-xs text-gray-400">Medium</span>
              <div className="h-3 w-3 rounded-sm bg-teal-500"></div>
              <span className="text-xs text-gray-400">High</span>
              <div className="h-3 w-3 rounded-sm bg-teal-300"></div>
              <span className="text-xs text-gray-400">Very High</span>
            </div>
          </div>

          <Tabs defaultValue="heatmap" className="w-full">
            <TabsList className="w-full bg-gray-800">
              <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="heatmap" className="mt-4">
              <div className="overflow-x-auto">
                <div className="min-w-max">
                  <div className="mb-1 flex">
                    <div className="w-12"></div>
                    {days.map((day, i) => (
                      <div key={i} className="w-12 text-center text-xs text-gray-500">
                        {day}
                      </div>
                    ))}
                  </div>

                  {months.map((month, i) => (
                    <div key={i} className="mb-1 flex">
                      <div className="w-12 text-xs text-gray-500">{month}</div>
                      {activityData[i].map((value, j) => {
                        let bgColor = "bg-gray-800"
                        if (value >= 8) bgColor = "bg-teal-300"
                        else if (value >= 6) bgColor = "bg-teal-500"
                        else if (value >= 3) bgColor = "bg-teal-700"
                        else if (value > 0) bgColor = "bg-teal-900"

                        return (
                          <div
                            key={j}
                            className={`m-0.5 h-10 w-10 rounded ${bgColor} hover:opacity-80`}
                            title={`${month} ${j + 1}: ${value} activities`}
                          ></div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="mt-4">
              <div className="h-64 rounded-lg bg-gray-800 p-4">
                <div className="flex h-full items-center justify-center">
                  <p className="text-gray-400">Trend visualization will appear here</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4 rounded-lg bg-gray-800/50 p-4">
            <h3 className="mb-2 text-sm font-medium text-white">Key Insights</h3>
            <ul className="list-inside list-disc space-y-1 text-xs text-gray-400">
              <li>Highest governance activity occurs mid-week (Tuesday-Thursday)</li>
              <li>Activity spikes at the beginning of each quarter</li>
              <li>Weekend participation has increased by 15% compared to last year</li>
              <li>Most active time for voting is between 2-6pm UTC</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
