"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useKatVerse } from "@/contexts/katverse-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowLeft, Send, Users, Mic, MicOff, Video, VideoOff, Share2, Settings } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type Message = {
  id: string
  userId: string
  username: string
  avatar: string
  content: string
  timestamp: Date
}

type RoomUser = {
  id: string
  username: string
  avatar: string
  isSpeaking: boolean
  hasVideo: boolean
  hasMic: boolean
}

export function KatVerseRoom() {
  const { activeRoom, currentUser, leaveRoom } = useKatVerse()
  const { toast } = useToast()
  const [messages, setMessages] = useState<Message[]>([])
  const [messageInput, setMessageInput] = useState("")
  const [roomUsers, setRoomUsers] = useState<RoomUser[]>([])
  const [micEnabled, setMicEnabled] = useState(false)
  const [videoEnabled, setVideoEnabled] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simulate fetching room data
  useEffect(() => {
    if (!activeRoom || !currentUser) return

    // Simulate initial messages
    const initialMessages: Message[] = [
      {
        id: "msg-1",
        userId: "system",
        username: "System",
        avatar: "/interconnected-system.png",
        content: `Welcome to ${activeRoom.name}!`,
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      },
      {
        id: "msg-2",
        userId: "user-ace",
        username: "ACE_Trader",
        avatar: "/diverse-group-traders.png",
        content: "Hey everyone! How's the market looking today?",
        timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
      },
      {
        id: "msg-3",
        userId: "user-kat",
        username: "KatMaster",
        avatar: "/tabby-cat-sunbeam.png",
        content: "BTC looking bullish, might break resistance soon!",
        timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
      },
      {
        id: "msg-4",
        userId: "system",
        username: "System",
        avatar: "/interconnected-system.png",
        content: `${currentUser.username} has joined the room.`,
        timestamp: new Date(),
      },
    ]

    setMessages(initialMessages)

    // Simulate room users
    const mockUsers: RoomUser[] = [
      {
        id: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        isSpeaking: false,
        hasVideo: false,
        hasMic: false,
      },
      {
        id: "user-ace",
        username: "ACE_Trader",
        avatar: "/diverse-group-traders.png",
        isSpeaking: false,
        hasVideo: true,
        hasMic: true,
      },
      {
        id: "user-kat",
        username: "KatMaster",
        avatar: "/tabby-cat-sunbeam.png",
        isSpeaking: true,
        hasVideo: false,
        hasMic: true,
      },
      {
        id: "user-crypto",
        username: "CryptoQueen",
        avatar: "/placeholder-npmkj.png",
        isSpeaking: false,
        hasVideo: false,
        hasMic: false,
      },
    ]

    setRoomUsers(mockUsers)

    // Simulate occasional messages
    const messageInterval = setInterval(() => {
      const randomUser = mockUsers[Math.floor(Math.random() * (mockUsers.length - 1)) + 1]
      const randomMessages = [
        "Anyone watching the ETH chart?",
        "This room is awesome!",
        "I'm thinking of buying some ACE tokens, thoughts?",
        "The market is so volatile today",
        "Who's joining the trading competition next week?",
        "Just made 20% on that last trade!",
        "Has anyone tried the new feature?",
        "I love the cosmic theme of this platform",
        "ACE Kat is the best trading assistant ever",
        "What's your trading strategy?",
      ]

      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        userId: randomUser.id,
        username: randomUser.username,
        avatar: randomUser.avatar,
        content: randomMessages[Math.floor(Math.random() * randomMessages.length)],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newMessage])

      // Simulate speaking status
      setRoomUsers((prev) =>
        prev.map((user) => ({
          ...user,
          isSpeaking: user.id === randomUser.id && user.hasMic,
        })),
      )

      // Reset speaking status after 2 seconds
      setTimeout(() => {
        setRoomUsers((prev) =>
          prev.map((user) => ({
            ...user,
            isSpeaking: false,
          })),
        )
      }, 2000)
    }, 15000) // New message every 15 seconds

    return () => clearInterval(messageInterval)
  }, [activeRoom, currentUser])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!messageInput.trim() || !currentUser) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      avatar: currentUser.avatar,
      content: messageInput,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setMessageInput("")
  }

  const toggleMic = () => {
    setMicEnabled(!micEnabled)

    // Update user in room
    setRoomUsers((prev) => prev.map((user) => (user.id === currentUser?.id ? { ...user, hasMic: !micEnabled } : user)))

    toast({
      title: micEnabled ? "Microphone Disabled" : "Microphone Enabled",
      description: micEnabled ? "Your mic is now muted" : "Others can now hear you",
    })
  }

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled)

    // Update user in room
    setRoomUsers((prev) =>
      prev.map((user) => (user.id === currentUser?.id ? { ...user, hasVideo: !videoEnabled } : user)),
    )

    toast({
      title: videoEnabled ? "Video Disabled" : "Video Enabled",
      description: videoEnabled ? "Your camera is now off" : "Others can now see you",
    })
  }

  if (!activeRoom || !currentUser) {
    return null
  }

  return (
    <div className="flex h-full flex-col bg-black">
      {/* Room header */}
      <header className="border-b border-gray-800 bg-black/40 p-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={leaveRoom} className="mr-2 text-gray-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-xl font-bold text-white">{activeRoom.name}</h2>
              <p className="text-sm text-gray-400">{activeRoom.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share room</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Settings className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Room settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center rounded-full bg-gray-800 px-3 py-1">
              <Users className="mr-2 h-4 w-4 text-teal-400" />
              <span className="text-sm text-white">{roomUsers.length}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Room content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main chat area */}
        <div className="flex flex-1 flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.userId === "system"
                      ? "justify-center"
                      : message.userId === currentUser.id
                        ? "justify-end"
                        : "justify-start"
                  }`}
                >
                  {message.userId === "system" ? (
                    <div className="rounded-md bg-gray-800/50 px-3 py-1.5 text-sm text-gray-400">{message.content}</div>
                  ) : message.userId === currentUser.id ? (
                    <div className="max-w-[70%]">
                      <div className="rounded-2xl rounded-tr-sm bg-teal-600 px-4 py-2 text-white">
                        {message.content}
                      </div>
                      <div className="mt-1 text-right text-xs text-gray-500">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex max-w-[70%]">
                      <Avatar className="mr-2 h-8 w-8">
                        <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.username} />
                        <AvatarFallback>{message.username.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-baseline">
                          <span className="mr-2 text-sm font-medium text-teal-400">{message.username}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <div className="rounded-2xl rounded-tl-sm bg-gray-800 px-4 py-2 text-white">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message input */}
          <div className="border-t border-gray-800 bg-gray-900 p-4">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <Button type="submit" size="icon" className="bg-teal-600 hover:bg-teal-700">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Participants sidebar */}
        <div className="hidden w-64 border-l border-gray-800 bg-gray-900/60 md:block">
          <div className="p-4">
            <h3 className="mb-4 font-medium text-white">Participants</h3>
            <div className="space-y-3">
              {roomUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                        <AvatarFallback>{user.username.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      {user.isSpeaking && (
                        <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 ring-2 ring-black" />
                      )}
                    </div>
                    <span className="ml-2 text-sm text-white">{user.username}</span>
                  </div>
                  <div className="flex space-x-1">
                    {user.hasMic && (
                      <div className="text-green-400">
                        <Mic className="h-3.5 w-3.5" />
                      </div>
                    )}
                    {user.hasVideo && (
                      <div className="text-green-400">
                        <Video className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Control bar */}
      <div className="flex justify-center border-t border-gray-800 bg-gray-900 p-3">
        <div className="flex space-x-2">
          <Button
            variant={micEnabled ? "default" : "outline"}
            size="icon"
            onClick={toggleMic}
            className={micEnabled ? "bg-teal-600 hover:bg-teal-700" : "border-gray-700 text-gray-400 hover:text-white"}
          >
            {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>

          <Button
            variant={videoEnabled ? "default" : "outline"}
            size="icon"
            onClick={toggleVideo}
            className={
              videoEnabled ? "bg-teal-600 hover:bg-teal-700" : "border-gray-700 text-gray-400 hover:text-white"
            }
          >
            {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>

          <Button
            variant="outline"
            onClick={leaveRoom}
            className="border-red-800 text-red-500 hover:bg-red-900/20 hover:text-red-400"
          >
            Leave Room
          </Button>
        </div>
      </div>
    </div>
  )
}
