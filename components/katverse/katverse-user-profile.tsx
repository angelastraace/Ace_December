"use client"

import { useState } from "react"
import { useKatVerse } from "@/contexts/katverse-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Edit, LogOut, Settings, User } from "lucide-react"

export function KatVerseUserProfile() {
  const { currentUser, updateUsername } = useKatVerse()
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [newUsername, setNewUsername] = useState("")

  if (!currentUser) return null

  const handleUpdateUsername = () => {
    if (newUsername.trim()) {
      updateUsername(newUsername)
      setIsEditingUsername(false)
      setNewUsername("")
    }
  }

  const openUsernameDialog = () => {
    setNewUsername(currentUser.username)
    setIsEditingUsername(true)
  }

  // Calculate XP progress percentage
  const xpProgress = Math.min(100, Math.round((currentUser.experience / 5000) * 100))

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2 px-2 hover:bg-gray-800">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.username} />
              <AvatarFallback>{currentUser.username.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-left">
              <span className="text-sm font-medium text-white">{currentUser.username}</span>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-teal-400">Lvl {currentUser.level}</span>
                <span className="text-xs text-gray-500">• Online</span>
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border-gray-800 bg-gray-900 text-white">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-800" />
          <DropdownMenuItem className="flex cursor-pointer items-center focus:bg-gray-800" onClick={openUsernameDialog}>
            <Edit className="mr-2 h-4 w-4" />
            <span>Change Username</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex cursor-pointer items-center focus:bg-gray-800">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex cursor-pointer items-center focus:bg-gray-800">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-800" />
          <DropdownMenuItem className="flex cursor-pointer items-center text-red-400 focus:bg-gray-800 focus:text-red-400">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Username Dialog */}
      <Dialog open={isEditingUsername} onOpenChange={setIsEditingUsername}>
        <DialogContent className="border-gray-800 bg-gray-900 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Username</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter a new username for your KatVerse profile
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="New username"
              className="border-gray-700 bg-gray-800 text-white"
            />
            <div className="mt-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Level {currentUser.level}</span>
                <span className="text-xs text-gray-400">{currentUser.experience} XP</span>
              </div>
              <Progress value={xpProgress} className="h-2 bg-gray-700" indicatorClassName="bg-teal-500" />
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">
                  Next level: {5000 - (currentUser.experience % 5000)} XP needed
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditingUsername(false)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateUsername}
              className="bg-teal-600 hover:bg-teal-700"
              disabled={!newUsername.trim() || newUsername === currentUser.username}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
