"use client"

import { useState } from "react"
import { useKatVerse } from "@/contexts/katverse-context"
import { KatVerseRoom } from "@/components/katverse/katverse-room"
import { KatVerseRoomCard } from "@/components/katverse/katverse-room-card"
import { KatVerseCreateRoom } from "@/components/katverse/katverse-create-room"
import { KatVerseUserProfile } from "@/components/katverse/katverse-user-profile"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Plus, Search, Users } from "lucide-react"

export function KatVerseLobby() {
  const { currentUser, availableRooms, activeRoom, isLoading, joinRoom } = useKatVerse()
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const [roomPassword, setRoomPassword] = useState("")
  const [isJoining, setIsJoining] = useState(false)

  // If we're in a room, show the room component
  if (activeRoom) {
    return <KatVerseRoom />
  }

  // Filter rooms based on search query
  const filteredRooms = availableRooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle room selection and joining
  const handleRoomSelect = (roomId: string) => {
    const room = availableRooms.find((r) => r.id === roomId)
    if (room && room.requiresPass) {
      setSelectedRoomId(roomId)
    } else {
      handleJoinRoom(roomId)
    }
  }

  const handleJoinRoom = async (roomId: string, password?: string) => {
    setIsJoining(true)
    const success = await joinRoom(roomId, password)
    if (!success) {
      setIsJoining(false)
    }
    setSelectedRoomId(null)
    setRoomPassword("")
  }

  if (isLoading && !currentUser) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-teal-500" />
          <p className="mt-4 text-white">Connecting to KatVerse...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full bg-black">
      {/* Cosmic background with stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container absolute inset-0 z-0">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
      </div>

      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/40 p-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">KatVerse</h1>
              <p className="text-sm text-gray-400">Connect with other traders in virtual spaces</p>
            </div>

            {currentUser && <KatVerseUserProfile />}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-hidden p-4">
          <div className="mx-auto h-full max-w-7xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search rooms..."
                  className="border-gray-800 bg-gray-900/60 pl-10 text-white placeholder:text-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Button onClick={() => setIsCreateRoomOpen(true)} className="bg-teal-600 hover:bg-teal-700">
                <Plus className="mr-2 h-4 w-4" /> Create Room
              </Button>
            </div>

            <Tabs defaultValue="all" className="h-[calc(100%-3rem)]">
              <TabsList className="mb-4 bg-gray-900/60">
                <TabsTrigger value="all">All Rooms</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="h-full overflow-y-auto">
                {isLoading ? (
                  <div className="flex h-40 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
                  </div>
                ) : filteredRooms.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredRooms.map((room) => (
                      <KatVerseRoomCard key={room.id} room={room} onJoin={() => handleRoomSelect(room.id)} />
                    ))}
                  </div>
                ) : (
                  <div className="flex h-40 flex-col items-center justify-center">
                    <Users className="h-12 w-12 text-gray-600" />
                    <p className="mt-4 text-gray-400">No rooms found matching your search</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="popular" className="h-full overflow-y-auto">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredRooms
                    .sort((a, b) => b.currentUsers - a.currentUsers)
                    .map((room) => (
                      <KatVerseRoomCard key={room.id} room={room} onJoin={() => handleRoomSelect(room.id)} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="new" className="h-full overflow-y-auto">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredRooms
                    .sort((a, b) => 0.5 - Math.random()) // Just for demo, would be by creation date
                    .map((room) => (
                      <KatVerseRoomCard key={room.id} room={room} onJoin={() => handleRoomSelect(room.id)} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Create Room Dialog */}
      <KatVerseCreateRoom isOpen={isCreateRoomOpen} onClose={() => setIsCreateRoomOpen(false)} />

      {/* Password Dialog */}
      <Dialog open={!!selectedRoomId} onOpenChange={() => setSelectedRoomId(null)}>
        <DialogContent className="border-gray-800 bg-gray-900 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Room Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              type="password"
              placeholder="Password"
              className="border-gray-700 bg-gray-800 text-white"
              value={roomPassword}
              onChange={(e) => setRoomPassword(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSelectedRoomId(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => selectedRoomId && handleJoinRoom(selectedRoomId, roomPassword)}
                disabled={isJoining}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {isJoining && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Join Room
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
