"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Lock, Users } from "lucide-react"

type KatVerseRoom = {
  id: string
  name: string
  description: string
  capacity: number
  currentUsers: number
  isLocked: boolean
  requiresPass: boolean
  thumbnail: string
}

interface KatVerseRoomCardProps {
  room: KatVerseRoom
  onJoin: () => void
}

export function KatVerseRoomCard({ room, onJoin }: KatVerseRoomCardProps) {
  const isFull = room.currentUsers >= room.capacity

  return (
    <Card className="overflow-hidden border-gray-800 bg-gray-900/60 transition-all hover:border-gray-700 hover:shadow-lg hover:shadow-teal-900/20">
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={room.thumbnail || "/placeholder.svg"}
          alt={room.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {room.requiresPass && (
          <div className="absolute right-2 top-2 rounded-full bg-gray-900/80 p-1.5">
            <Lock className="h-4 w-4 text-yellow-400" />
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{room.name}</h3>
          <Badge
            variant="outline"
            className={`flex items-center gap-1 ${
              isFull ? "border-red-500 text-red-400" : "border-green-500 text-green-400"
            }`}
          >
            <Users className="h-3 w-3" />
            {room.currentUsers}/{room.capacity}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-400">{room.description}</p>
      </CardContent>

      <CardFooter>
        <Button
          onClick={onJoin}
          disabled={isFull}
          className="w-full bg-teal-600 hover:bg-teal-700"
          variant={isFull ? "outline" : "default"}
        >
          {isFull ? "Room Full" : room.requiresPass ? "Enter Password" : "Join Room"}
        </Button>
      </CardFooter>
    </Card>
  )
}
