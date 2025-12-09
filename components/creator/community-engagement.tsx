"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Heart, Share2, Bell, Mail } from "lucide-react"

// Sample data
const comments = [
  {
    id: 1,
    user: {
      name: "AstralExplorer",
      avatar: "/placeholder.svg?height=100&width=100&query=user%20avatar%201",
    },
    content: "Your Cosmic Nebula Collection is absolutely breathtaking! The colors and details are out of this world.",
    time: "2 hours ago",
    likes: 12,
    item: "Cosmic Nebula Collection",
  },
  {
    id: 2,
    user: {
      name: "QuantumDreamer",
      avatar: "/placeholder.svg?height=100&width=100&query=user%20avatar%202",
    },
    content:
      "I've been using your Quantum Mechanics guide for my studies. It's incredibly well-explained and easy to follow!",
    time: "5 hours ago",
    likes: 8,
    item: "Quantum Mechanics Explained",
  },
  {
    id: 3,
    user: {
      name: "GalacticNomad",
      avatar: "/placeholder.svg?height=100&width=100&query=user%20avatar%203",
    },
    content: "The ambient sounds are perfect for my meditation sessions. So calming and immersive.",
    time: "Yesterday",
    likes: 15,
    item: "Cosmic Ambient Sounds",
  },
]

const messages = [
  {
    id: 1,
    user: {
      name: "AstralExplorer",
      avatar: "/placeholder.svg?height=100&width=100&query=user%20avatar%201",
    },
    preview: "Hey! I'm interested in commissioning a custom piece similar to your Cosmic Nebula Collection...",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 2,
    user: {
      name: "QuantumDreamer",
      avatar: "/placeholder.svg?height=100&width=100&query=user%20avatar%202",
    },
    preview: "Thanks for the quick response! That timeline works perfectly for me...",
    time: "3 hours ago",
    unread: false,
  },
  {
    id: 3,
    user: {
      name: "GalacticNomad",
      avatar: "/placeholder.svg?height=100&width=100&query=user%20avatar%203",
    },
    preview: "I've sent the payment for the commission. Looking forward to seeing the final result!",
    time: "Yesterday",
    unread: false,
  },
]

const notifications = [
  {
    id: 1,
    type: "like",
    content: "AstralExplorer and 15 others liked your Cosmic Nebula Collection",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    type: "comment",
    content: "QuantumDreamer commented on your Quantum Mechanics Explained",
    time: "5 hours ago",
    unread: true,
  },
  {
    id: 3,
    type: "share",
    content: "GalacticNomad shared your Cosmic Ambient Sounds",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    type: "system",
    content: "Your Interstellar Journey video has been approved and published",
    time: "2 days ago",
    unread: false,
  },
]

export function CommunityEngagement() {
  return (
    <Card className="backdrop-blur-md bg-black/30 border-purple-500/20 mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Community Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="comments" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4 bg-black/20">
            <TabsTrigger value="comments" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" /> Comments
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center">
              <Mail className="h-4 w-4 mr-2" /> Messages
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" /> Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="comments" className="mt-0">
            <div className="space-y-4">
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
              <Button variant="outline" className="w-full mt-2 border-purple-500/20 hover:bg-purple-900/20">
                View All Comments
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="messages" className="mt-0">
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageItem key={message.id} message={message} />
              ))}
              <Button variant="outline" className="w-full mt-2 border-purple-500/20 hover:bg-purple-900/20">
                View All Messages
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-0">
            <div className="space-y-4">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
              <Button variant="outline" className="w-full mt-2 border-purple-500/20 hover:bg-purple-900/20">
                View All Notifications
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function CommentItem({ comment }: { comment: any }) {
  return (
    <div className="p-3 rounded-lg bg-black/20 border border-purple-500/10">
      <div className="flex items-start">
        <Avatar className="h-8 w-8 mr-3">
          <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
          <AvatarFallback>{comment.user.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-medium">{comment.user.name}</p>
            <p className="text-xs text-gray-400">{comment.time}</p>
          </div>
          <p className="text-sm text-gray-300 mt-1">{comment.content}</p>
          <p className="text-xs text-gray-400 mt-1">On: {comment.item}</p>
          <div className="flex items-center mt-2">
            <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-400 hover:text-white">
              <Heart className="h-4 w-4 mr-1" /> {comment.likes}
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-400 hover:text-white">
              <MessageSquare className="h-4 w-4 mr-1" /> Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function MessageItem({ message }: { message: any }) {
  return (
    <div
      className={`p-3 rounded-lg ${message.unread ? "bg-purple-900/20 border-purple-500/30" : "bg-black/20 border-purple-500/10"} border`}
    >
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={message.user.avatar || "/placeholder.svg"} alt={message.user.name} />
          <AvatarFallback>{message.user.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-medium">{message.user.name}</p>
            <div className="flex items-center">
              {message.unread && <Badge className="mr-2 bg-purple-600">New</Badge>}
              <p className="text-xs text-gray-400">{message.time}</p>
            </div>
          </div>
          <p className="text-sm text-gray-300 mt-1 truncate">{message.preview}</p>
        </div>
      </div>
    </div>
  )
}

function NotificationItem({ notification }: { notification: any }) {
  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-400" />
      case "comment":
        return <MessageSquare className="h-4 w-4 text-blue-400" />
      case "share":
        return <Share2 className="h-4 w-4 text-green-400" />
      case "system":
        return <Bell className="h-4 w-4 text-yellow-400" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div
      className={`p-3 rounded-lg ${notification.unread ? "bg-purple-900/20 border-purple-500/30" : "bg-black/20 border-purple-500/10"} border`}
    >
      <div className="flex">
        <div className="h-8 w-8 rounded-full bg-black/30 flex items-center justify-center mr-3">
          {getIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm">{notification.content}</p>
            {notification.unread && <div className="h-2 w-2 rounded-full bg-purple-500 ml-2"></div>}
          </div>
          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
        </div>
      </div>
    </div>
  )
}
