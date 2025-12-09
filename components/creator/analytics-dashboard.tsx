"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data
const viewsData = [
  { name: "Jan", views: 400 },
  { name: "Feb", views: 300 },
  { name: "Mar", views: 600 },
  { name: "Apr", views: 800 },
  { name: "May", views: 500 },
  { name: "Jun", views: 900 },
  { name: "Jul", views: 1100 },
]

const engagementData = [
  { name: "Jan", likes: 200, comments: 150, shares: 100 },
  { name: "Feb", likes: 150, comments: 120, shares: 80 },
  { name: "Mar", likes: 300, comments: 200, shares: 150 },
  { name: "Apr", likes: 400, comments: 300, shares: 200 },
  { name: "May", likes: 250, comments: 180, shares: 120 },
  { name: "Jun", likes: 450, comments: 320, shares: 220 },
  { name: "Jul", likes: 550, comments: 400, shares: 280 },
]

const revenueData = [
  { name: "Jan", revenue: 1200 },
  { name: "Feb", revenue: 900 },
  { name: "Mar", revenue: 1800 },
  { name: "Apr", revenue: 2400 },
  { name: "May", revenue: 1500 },
  { name: "Jun", revenue: 2700 },
  { name: "Jul", revenue: 3300 },
]

const contentTypeData = [
  { name: "Images", value: 45 },
  { name: "Videos", value: 25 },
  { name: "Audio", value: 15 },
  { name: "Documents", value: 15 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]

export function AnalyticsDashboard() {
  return (
    <Card className="backdrop-blur-md bg-black/30 border-purple-500/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Analytics Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="views" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4 bg-black/20">
            <TabsTrigger value="views">Views</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="views" className="mt-0">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", borderColor: "#444" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <StatBox title="Total Views" value="4,600" change="+12%" positive={true} />
              <StatBox title="Avg. View Time" value="3:42" change="+5%" positive={true} />
              <StatBox title="Bounce Rate" value="32%" change="-3%" positive={true} />
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="mt-0">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", borderColor: "#444" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="likes" fill="#8884d8" />
                  <Bar dataKey="comments" fill="#82ca9d" />
                  <Bar dataKey="shares" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <StatBox title="Total Likes" value="2,250" change="+18%" positive={true} />
              <StatBox title="Comments" value="1,670" change="+22%" positive={true} />
              <StatBox title="Shares" value="1,150" change="+15%" positive={true} />
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="mt-0">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", borderColor: "#444" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <StatBox title="Total Revenue" value="13,800 ACE" change="+25%" positive={true} />
              <StatBox title="Avg. Per Item" value="108.7 ACE" change="+8%" positive={true} />
              <StatBox title="Conversion Rate" value="3.2%" change="-0.5%" positive={false} />
            </div>
          </TabsContent>

          <TabsContent value="content" className="mt-0">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contentTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {contentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", borderColor: "#444" }}
                      itemStyle={{ color: "#fff" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <StatBox title="Total Content" value="127" change="+15" positive={true} />
                <StatBox title="Published" value="112" change="+12" positive={true} />
                <StatBox title="Drafts" value="15" change="+3" positive={true} />
                <StatBox title="Most Popular" value="Images" change="" positive={true} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function StatBox({
  title,
  value,
  change,
  positive,
}: { title: string; value: string; change: string; positive: boolean }) {
  return (
    <div className="p-3 rounded-lg bg-black/20 border border-purple-500/10">
      <p className="text-sm text-gray-400">{title}</p>
      <div className="flex items-end justify-between">
        <p className="text-xl font-bold">{value}</p>
        {change && <p className={`text-xs ${positive ? "text-green-400" : "text-red-400"}`}>{change}</p>}
      </div>
    </div>
  )
}
