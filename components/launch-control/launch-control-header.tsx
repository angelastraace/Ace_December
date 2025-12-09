"use client"

import { useState } from "react"
import { Bell, Settings, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function LaunchControlHeader() {
  const [notifications, setNotifications] = useState(3)

  return (
    <header className="border-b bg-black/40 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white">Launch Control</h1>
          <Badge variant="outline" className="bg-purple-500/20 text-purple-300">
            Admin
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {notifications}
              </span>
            )}
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <HelpCircle className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Settings className="h-5 w-5" />
          </Button>

          <Avatar className="h-8 w-8 border border-purple-500/50">
            <AvatarImage src="/cosmic-user-avatar.png" alt="Admin" />
            <AvatarFallback className="bg-purple-900 text-purple-200">AC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
