"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

// Mock data for the chart
const data = [
  { name: "Jan", revenue: 1200, followers: 120 },
  { name: "Feb", revenue: 1900, followers: 150 },
  { name: "Mar", revenue: 1500, followers: 180 },
  { name: "Apr", revenue: 2400, followers: 220 },
  { name: "May", revenue: 2800, followers: 280 },
  { name: "Jun", revenue: 3200, followers: 350 },
  { name: "Jul", revenue: 4000, followers: 450 },
]

export function CreatorStats() {
  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#6B7280" />
          <YAxis yAxisId="left" stroke="#6B7280" />
          <YAxis yAxisId="right" orientation="right" stroke="#6B7280" />
          <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F9FAFB" }} />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="revenue"
            name="Revenue (ACE)"
            stroke="#00C9A7"
            activeDot={{ r: 8 }}
          />
          <Line yAxisId="right" type="monotone" dataKey="followers" name="Followers" stroke="#4D7CFE" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CreatorStats
