"use client"

import { useState } from "react"
import { Server, Database, Globe, Shield, AlertTriangle, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SystemStatus() {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshStatus = () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setLastUpdated(new Date())
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">System Status</h2>
        <Button onClick={refreshStatus} disabled={isRefreshing} className="flex items-center gap-2">
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh Status
        </Button>
      </div>

      <p className="text-muted-foreground">Last updated: {lastUpdated.toLocaleString()}</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatusCard
          title="API Services"
          status="operational"
          icon={<Server className="h-5 w-5" />}
          metric="99.98%"
          description="All API endpoints responding normally"
        />
        <StatusCard
          title="Database Cluster"
          status="operational"
          icon={<Database className="h-5 w-5" />}
          metric="99.99%"
          description="Database read/write operations normal"
        />
        <StatusCard
          title="Frontend Services"
          status="operational"
          icon={<Globe className="h-5 w-5" />}
          metric="100%"
          description="All user interfaces loading correctly"
        />
        <StatusCard
          title="Security Systems"
          status="operational"
          icon={<Shield className="h-5 w-5" />}
          metric="100%"
          description="All security protocols active"
        />
      </div>

      <Tabs defaultValue="services">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="incidents">Recent Incidents</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4 pt-4">
          <ServiceStatus name="Trading Engine" status="operational" latency="24ms" load={42} />
          <ServiceStatus name="User Authentication" status="operational" latency="18ms" load={35} />
          <ServiceStatus name="Wallet Services" status="operational" latency="31ms" load={28} />
          <ServiceStatus
            name="KatVerse"
            status="degraded"
            latency="87ms"
            load={76}
            message="Experiencing higher than normal latency"
          />
          <ServiceStatus name="Notification System" status="operational" latency="22ms" load={31} />
          <ServiceStatus name="Analytics Pipeline" status="operational" latency="45ms" load={58} />
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-4 pt-4">
          <ServiceStatus name="Primary Data Center" status="operational" latency="--" load={62} />
          <ServiceStatus name="Backup Data Center" status="operational" latency="--" load={18} />
          <ServiceStatus name="CDN Network" status="operational" latency="12ms" load={44} />
          <ServiceStatus name="Load Balancers" status="operational" latency="8ms" load={51} />
          <ServiceStatus name="Blockchain Nodes" status="operational" latency="42ms" load={67} />
        </TabsContent>

        <TabsContent value="incidents" className="space-y-4 pt-4">
          <IncidentReport
            date="2025-05-12"
            title="KatVerse Latency Issues"
            status="resolved"
            description="KatVerse experienced higher than normal latency due to increased user activity. The issue was resolved by scaling up server resources."
            duration="47 minutes"
          />
          <IncidentReport
            date="2025-05-08"
            title="Database Read Timeout"
            status="resolved"
            description="Some users experienced slow response times when accessing historical trading data. The issue was resolved by optimizing database queries."
            duration="23 minutes"
          />
          <IncidentReport
            date="2025-04-29"
            title="API Rate Limiting"
            status="resolved"
            description="Trading API experienced rate limiting due to abnormal traffic patterns. Security measures were adjusted to allow legitimate traffic."
            duration="18 minutes"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatusCard({ title, status, icon, metric, description }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <StatusIndicator status={status} />
          <span className="text-2xl font-bold">{metric}</span>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function StatusIndicator({ status }) {
  if (status === "operational") {
    return <CheckCircle className="h-5 w-5 text-green-500" />
  } else if (status === "degraded") {
    return <AlertTriangle className="h-5 w-5 text-amber-500" />
  } else {
    return <XCircle className="h-5 w-5 text-red-500" />
  }
}

function ServiceStatus({ name, status, latency, load, message }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <StatusIndicator status={status} />
          <div>
            <h4 className="font-medium">{name}</h4>
            {message && <p className="text-sm text-amber-500">{message}</p>}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Latency</p>
            <p className="font-medium">{latency}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Load</p>
            <p className="font-medium">{load}%</p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <Progress value={load} className="h-2" />
      </div>
    </div>
  )
}

function IncidentReport({ date, title, status, description, duration }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h4 className="font-medium">{title}</h4>
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                status === "resolved" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
              }`}
            >
              {status}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{date}</p>
        </div>
        <p className="text-sm font-medium">Duration: {duration}</p>
      </div>
      <p className="mt-2 text-sm">{description}</p>
    </div>
  )
}
