"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  AlertTriangle,
  ShieldAlert,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function EmergencyControls() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [tradingPaused, setTradingPaused] = useState(false)
  const [withdrawalsPaused, setWithdrawalsPaused] = useState(false)
  const [depositsPaused, setDepositsPaused] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [currentAction, setCurrentAction] = useState<string | null>(null)

  const handleEmergencyAction = (action: string) => {
    setCurrentAction(action)
    setShowConfirmation(true)
  }

  const confirmAction = () => {
    if (confirmationCode !== "CONFIRM") {
      alert("Invalid confirmation code")
      return
    }

    switch (currentAction) {
      case "maintenance":
        setMaintenanceMode(true)
        break
      case "pause-trading":
        setTradingPaused(true)
        break
      case "pause-withdrawals":
        setWithdrawalsPaused(true)
        break
      case "pause-deposits":
        setDepositsPaused(true)
        break
      case "resume-all":
        setMaintenanceMode(false)
        setTradingPaused(false)
        setWithdrawalsPaused(false)
        setDepositsPaused(false)
        break
    }

    setShowConfirmation(false)
    setConfirmationCode("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0">
        <h2 className="text-2xl font-bold text-white">Emergency Controls</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Status
          </Button>
          <Button variant="destructive" size="sm" onClick={() => handleEmergencyAction("resume-all")}>
            <Unlock className="mr-2 h-4 w-4" />
            Resume All Systems
          </Button>
        </div>
      </div>

      <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <ShieldAlert className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-white">System Status</CardTitle>
          </div>
          <CardDescription>Current status of critical platform systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                <div className="flex items-center space-x-3">
                  <div className={`rounded-full p-1 ${maintenanceMode ? "bg-amber-900/30" : "bg-green-900/30"}`}>
                    {maintenanceMode ? (
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">Maintenance Mode</p>
                    <p className="text-sm text-gray-400">
                      {maintenanceMode ? "Platform is in maintenance mode" : "Platform is operating normally"}
                    </p>
                  </div>
                </div>
                <Badge className={maintenanceMode ? "bg-amber-500 text-black" : "bg-green-500 text-black"}>
                  {maintenanceMode ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                <div className="flex items-center space-x-3">
                  <div className={`rounded-full p-1 ${tradingPaused ? "bg-red-900/30" : "bg-green-900/30"}`}>
                    {tradingPaused ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">Trading</p>
                    <p className="text-sm text-gray-400">
                      {tradingPaused ? "Trading is currently paused" : "Trading is active"}
                    </p>
                  </div>
                </div>
                <Badge className={tradingPaused ? "bg-red-500 text-black" : "bg-green-500 text-black"}>
                  {tradingPaused ? "Paused" : "Active"}
                </Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                <div className="flex items-center space-x-3">
                  <div className={`rounded-full p-1 ${withdrawalsPaused ? "bg-red-900/30" : "bg-green-900/30"}`}>
                    {withdrawalsPaused ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">Withdrawals</p>
                    <p className="text-sm text-gray-400">
                      {withdrawalsPaused ? "Withdrawals are currently paused" : "Withdrawals are active"}
                    </p>
                  </div>
                </div>
                <Badge className={withdrawalsPaused ? "bg-red-500 text-black" : "bg-green-500 text-black"}>
                  {withdrawalsPaused ? "Paused" : "Active"}
                </Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                <div className="flex items-center space-x-3">
                  <div className={`rounded-full p-1 ${depositsPaused ? "bg-red-900/30" : "bg-green-900/30"}`}>
                    {depositsPaused ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">Deposits</p>
                    <p className="text-sm text-gray-400">
                      {depositsPaused ? "Deposits are currently paused" : "Deposits are active"}
                    </p>
                  </div>
                </div>
                <Badge className={depositsPaused ? "bg-red-500 text-black" : "bg-green-500 text-black"}>
                  {depositsPaused ? "Paused" : "Active"}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="border-gray-800 bg-gray-900/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <CardTitle className="text-lg text-white">Emergency Actions</CardTitle>
                  </div>
                  <CardDescription>Use these controls only in emergency situations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => handleEmergencyAction("maintenance")}
                    disabled={maintenanceMode}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Enable Maintenance Mode
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => handleEmergencyAction("pause-trading")}
                    disabled={tradingPaused}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Pause All Trading
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => handleEmergencyAction("pause-withdrawals")}
                    disabled={withdrawalsPaused}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Pause Withdrawals
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => handleEmergencyAction("pause-deposits")}
                    disabled={depositsPaused}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Pause Deposits
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-gray-800 bg-gray-900/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-lg text-white">Scheduled Maintenance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-date">Maintenance Date</Label>
                    <Input id="maintenance-date" type="datetime-local" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-duration">Duration (hours)</Label>
                    <Input id="maintenance-duration" type="number" min="1" max="24" defaultValue="2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-message">Maintenance Message</Label>
                    <Textarea
                      id="maintenance-message"
                      placeholder="Enter message to display to users"
                      defaultValue="Scheduled maintenance for system upgrades. Services will be temporarily unavailable."
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-users" />
                    <Label htmlFor="notify-users">Notify users via email</Label>
                  </div>
                  <Button className="w-full">Schedule Maintenance</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-500 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Confirm Emergency Action
            </DialogTitle>
            <DialogDescription>
              This action will affect all users on the platform. Please confirm that you want to proceed.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="confirmation-code" className="text-red-500">
                Type CONFIRM to proceed
              </Label>
              <Input
                id="confirmation-code"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                className="border-red-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmAction}>
              Confirm Action
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
