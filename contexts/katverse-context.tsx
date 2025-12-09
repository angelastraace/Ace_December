"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

type KatVerseUser = {
  id: string
  username: string
  avatar: string
  level: number
  experience: number
  isOnline: boolean
}

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

type KatVerseContextType = {
  currentUser: KatVerseUser | null
  availableRooms: KatVerseRoom[]
  activeRoom: KatVerseRoom | null
  isLoading: boolean
  joinRoom: (roomId: string, password?: string) => Promise<boolean>
  leaveRoom: () => void
  createRoom: (roomData: Partial<KatVerseRoom>) => Promise<boolean>
  updateUsername: (username: string) => void
}

const KatVerseContext = createContext<KatVerseContextType | undefined>(undefined)

export function KatVerseProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<KatVerseUser | null>(null)
  const [availableRooms, setAvailableRooms] = useState<KatVerseRoom[]>([])
  const [activeRoom, setActiveRoom] = useState<KatVerseRoom | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Simulate fetching user data and available rooms
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock user data
        setCurrentUser({
          id: "user-" + Math.random().toString(36).substr(2, 9),
          username: "Cosmic_Explorer_" + Math.floor(Math.random() * 1000),
          avatar: `/placeholder.svg?height=200&width=200&query=cosmic%20cat%20avatar`,
          level: 5,
          experience: 2340,
          isOnline: true,
        })

        // Mock available rooms
        setAvailableRooms([
          {
            id: "room-1",
            name: "Cosmic Lounge",
            description: "A relaxed space to chat about the cosmos and trading",
            capacity: 20,
            currentUsers: 8,
            isLocked: false,
            requiresPass: false,
            thumbnail: `/placeholder.svg?height=400&width=400&query=cosmic%20lounge%20with%20stars`,
          },
          {
            id: "room-2",
            name: "Trading Arena",
            description: "Discuss strategies and compete in trading challenges",
            capacity: 15,
            currentUsers: 12,
            isLocked: false,
            requiresPass: false,
            thumbnail: `/placeholder.svg?height=400&width=400&query=trading%20arena%20with%20charts`,
          },
          {
            id: "room-3",
            name: "Kat's Den",
            description: "Private room for ACE Kat's closest friends",
            capacity: 10,
            currentUsers: 5,
            isLocked: true,
            requiresPass: true,
            thumbnail: `/placeholder.svg?height=400&width=400&query=cozy%20cat%20den%20in%20space`,
          },
          {
            id: "room-4",
            name: "Meditation Chamber",
            description: "A quiet space for mindful trading and reflection",
            capacity: 8,
            currentUsers: 3,
            isLocked: false,
            requiresPass: false,
            thumbnail: `/placeholder.svg?height=400&width=400&query=space%20meditation%20chamber`,
          },
          {
            id: "room-5",
            name: "Crypto Academy",
            description: "Learn and teach others about crypto and trading",
            capacity: 30,
            currentUsers: 22,
            isLocked: false,
            requiresPass: false,
            thumbnail: `/placeholder.svg?height=400&width=400&query=futuristic%20crypto%20classroom`,
          },
        ])

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching KatVerse data:", error)
        toast({
          title: "Connection Error",
          description: "Failed to connect to KatVerse. Please try again later.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchInitialData()
  }, [toast])

  const joinRoom = async (roomId: string, password?: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const room = availableRooms.find((r) => r.id === roomId)

      if (!room) {
        toast({
          title: "Room Not Found",
          description: "The room you're trying to join doesn't exist.",
          variant: "destructive",
        })
        setIsLoading(false)
        return false
      }

      if (room.requiresPass && (!password || password !== "acekat123")) {
        toast({
          title: "Access Denied",
          description: "Incorrect password for this room.",
          variant: "destructive",
        })
        setIsLoading(false)
        return false
      }

      if (room.currentUsers >= room.capacity) {
        toast({
          title: "Room Full",
          description: "This room has reached its capacity. Try again later.",
          variant: "destructive",
        })
        setIsLoading(false)
        return false
      }

      // Success - join the room
      setActiveRoom(room)
      toast({
        title: "Room Joined",
        description: `You've entered ${room.name}!`,
      })

      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Error joining room:", error)
      toast({
        title: "Connection Error",
        description: "Failed to join room. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
      return false
    }
  }

  const leaveRoom = () => {
    setActiveRoom(null)
    toast({
      title: "Room Left",
      description: "You've left the room.",
    })
  }

  const createRoom = async (roomData: Partial<KatVerseRoom>): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newRoom: KatVerseRoom = {
        id: "room-" + Math.random().toString(36).substr(2, 9),
        name: roomData.name || "New Room",
        description: roomData.description || "A new KatVerse room",
        capacity: roomData.capacity || 10,
        currentUsers: 1, // Just the creator
        isLocked: roomData.isLocked || false,
        requiresPass: roomData.requiresPass || false,
        thumbnail: roomData.thumbnail || `/placeholder.svg?height=400&width=400&query=space%20room%20with%20stars`,
      }

      setAvailableRooms((prev) => [...prev, newRoom])
      setActiveRoom(newRoom)

      toast({
        title: "Room Created",
        description: `Your room "${newRoom.name}" has been created!`,
      })

      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Error creating room:", error)
      toast({
        title: "Error",
        description: "Failed to create room. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
      return false
    }
  }

  const updateUsername = (username: string) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        username,
      })

      toast({
        title: "Username Updated",
        description: `Your username is now ${username}`,
      })
    }
  }

  const value = {
    currentUser,
    availableRooms,
    activeRoom,
    isLoading,
    joinRoom,
    leaveRoom,
    createRoom,
    updateUsername,
  }

  return <KatVerseContext.Provider value={value}>{children}</KatVerseContext.Provider>
}

export function useKatVerse() {
  const context = useContext(KatVerseContext)
  if (context === undefined) {
    throw new Error("useKatVerse must be used within a KatVerseProvider")
  }
  return context
}
