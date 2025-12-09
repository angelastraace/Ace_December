import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Settings } from "lucide-react"

interface GovernanceHeaderProps {
  currentUser: any
}

export default function GovernanceHeader({ currentUser }: GovernanceHeaderProps) {
  return (
    <header className="border-b border-gray-800 bg-[#001219]/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-white">
            ACE<span className="text-teal-500">DAO</span>
          </div>
          <Badge variant="outline" className="border-teal-500 text-teal-400">
            Governance v1.2
          </Badge>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden items-center space-x-2 md:flex">
            <div className="text-right">
              <p className="text-sm text-gray-400">Voting Power</p>
              <p className="font-medium text-white">{currentUser.votingPower.toLocaleString()} ACE</p>
            </div>
            <div className="h-8 w-px bg-gray-700"></div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Proposals</p>
              <p className="font-medium text-white">{currentUser.proposals}</p>
            </div>
            <div className="h-8 w-px bg-gray-700"></div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Votes Cast</p>
              <p className="font-medium text-white">{currentUser.votes}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/cosmic-user-avatar.png" alt={currentUser.username} />
              <AvatarFallback className="bg-teal-900 text-teal-200">
                {currentUser.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
