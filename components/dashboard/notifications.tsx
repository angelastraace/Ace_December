"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CheckCircle, AlertTriangle, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: number
  type: "info" | "success" | "warning"
  title: string
  message: string
  time: string
  read: boolean
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "success",
      title: "Deposit Confirmed",
      message: "Your deposit of 0.05 BTC has been confirmed and credited to your account.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "info",
      title: "New Feature Available",
      message: "ACE Exchange has launched a new staking feature. Earn up to 12% APY on your crypto assets.",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Market Volatility Alert",
      message: "Unusual market volatility detected for BTC/USDT. Consider adjusting your trading strategy.",
      time: "1 day ago",
      read: true,
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "info":
        return <Info className="h-5 w-5 text-blue-400" />
      default:
        return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/20 border-l-4 border-green-500"
      case "warning":
        return "bg-yellow-500/20 border-l-4 border-yellow-500"
      case "info":
        return "bg-blue-500/20 border-l-4 border-blue-500"
      default:
        return "bg-gray-500/20 border-l-4 border-gray-500"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Card className="bg-black/40 backdrop-blur-md border-purple-500/20 overflow-hidden relative mt-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/5 pointer-events-none" />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-400" />
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </CardTitle>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
              Mark all as read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>No new notifications</p>
          </div>
        ) : (
          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-lg p-3 ${getTypeColor(notification.type)} ${notification.read ? "opacity-70" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      {getTypeIcon(notification.type)}
                      <div>
                        <p className="font-medium text-white">{notification.title}</p>
                        <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-400 hover:text-white hover:bg-white/10"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-white hover:bg-white/10"
                        onClick={() => dismissNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
