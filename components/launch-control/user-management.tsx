"use client"

import { useState } from "react"
import { Search, Filter, UserPlus, MoreHorizontal, Shield, Star, Ban } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample user data
const users = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Admin",
    status: "Active",
    avatar: "/placeholder-px7zt.png",
    joined: "2023-05-12",
  },
  {
    id: 2,
    name: "Samantha Lee",
    email: "sam@example.com",
    role: "Moderator",
    status: "Active",
    avatar: "/placeholder-2pgvy.png",
    joined: "2023-06-24",
  },
  {
    id: 3,
    name: "Marcus Chen",
    email: "marcus@example.com",
    role: "User",
    status: "Active",
    avatar: "/placeholder-rgbo3.png",
    joined: "2023-07-15",
  },
  {
    id: 4,
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "User",
    status: "Suspended",
    avatar: "/placeholder-5jsg7.png",
    joined: "2023-08-03",
  },
  {
    id: 5,
    name: "Jordan Taylor",
    email: "jordan@example.com",
    role: "User",
    status: "Active",
    avatar: "/placeholder-ysg3e.png",
    joined: "2023-09-18",
  },
]

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="border-purple-500/20 bg-black/40 backdrop-blur-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white">User Management</CardTitle>
            <CardDescription className="text-gray-400">Manage platform users and permissions</CardDescription>
          </div>
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search users..."
              className="border-gray-800 bg-black/30 pl-9 text-white placeholder:text-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="border-gray-800 bg-black/30 text-gray-400 hover:bg-black/50">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-md border border-gray-800">
          <div className="grid grid-cols-12 gap-4 border-b border-gray-800 bg-black/30 p-3 text-sm font-medium text-gray-400">
            <div className="col-span-4">User</div>
            <div className="col-span-3">Role</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Joined</div>
            <div className="col-span-1"></div>
          </div>

          {filteredUsers.map((user) => (
            <div key={user.id} className="grid grid-cols-12 gap-4 border-b border-gray-800 p-3 text-sm last:border-0">
              <div className="col-span-4 flex items-center gap-3">
                <Avatar className="h-8 w-8 border border-purple-500/30">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-purple-900 text-purple-200">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-white">{user.name}</div>
                  <div className="text-xs text-gray-400">{user.email}</div>
                </div>
              </div>

              <div className="col-span-3 flex items-center">
                {user.role === "Admin" ? (
                  <Badge className="bg-purple-500/20 text-purple-300">
                    <Shield className="mr-1 h-3 w-3" />
                    Admin
                  </Badge>
                ) : user.role === "Moderator" ? (
                  <Badge className="bg-blue-500/20 text-blue-300">
                    <Star className="mr-1 h-3 w-3" />
                    Moderator
                  </Badge>
                ) : (
                  <Badge className="bg-gray-500/20 text-gray-300">User</Badge>
                )}
              </div>

              <div className="col-span-2 flex items-center">
                {user.status === "Active" ? (
                  <Badge className="bg-green-500/20 text-green-300">Active</Badge>
                ) : (
                  <Badge className="bg-red-500/20 text-red-300">Suspended</Badge>
                )}
              </div>

              <div className="col-span-2 flex items-center text-gray-400">
                {new Date(user.joined).toLocaleDateString()}
              </div>

              <div className="col-span-1 flex items-center justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:bg-black/30">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-gray-900 text-gray-200">
                    <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuItem className="hover:bg-gray-800">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Change Role</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-800">
                      <Ban className="mr-2 h-4 w-4" />
                      <span>{user.status === "Active" ? "Suspend User" : "Activate User"}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuItem className="text-red-400 hover:bg-gray-800 hover:text-red-400">
                      Delete Account
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
          <div>
            Showing {filteredUsers.length} of {users.length} users
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-gray-800 bg-black/30 text-gray-400 hover:bg-black/50"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-gray-800 bg-black/30 text-gray-400 hover:bg-black/50"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
