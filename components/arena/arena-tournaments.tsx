"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Calendar, Users, Trophy, Clock, Ticket, AlertCircle } from "lucide-react"

interface ArenaTournamentsProps {
  tournaments: any[]
  arenaStats: any
  katInfo: any
}

export default function ArenaTournaments({ tournaments, arenaStats, katInfo }: ArenaTournamentsProps) {
  const [tournamentView, setTournamentView] = useState("upcoming")

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date)
  }

  // Calculate time remaining
  const getTimeRemaining = (dateString: string) => {
    const now = new Date()
    const tournamentDate = new Date(dateString)
    const diff = tournamentDate.getTime() - now.getTime()

    if (diff <= 0) return "Starting now"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h remaining`
    if (hours > 0) return `${hours}h ${minutes}m remaining`
    return `${minutes}m remaining`
  }

  // Past tournaments data
  const pastTournaments = [
    {
      id: "past-1",
      name: "Weekly Showdown",
      status: "completed",
      date: "2025-05-08T18:00:00Z",
      participants: 32,
      maxParticipants: 32,
      yourPlace: 5,
      rewards: ["250 XP", "Rare Trophy NFT", "50 ACE Tokens"],
    },
    {
      id: "past-2",
      name: "Cosmic Clash",
      status: "completed",
      date: "2025-05-01T20:00:00Z",
      participants: 64,
      maxParticipants: 64,
      yourPlace: 12,
      rewards: ["200 XP", "Uncommon Trophy NFT", "25 ACE Tokens"],
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card className="bg-gray-900/60 text-white backdrop-blur-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Crown className="mr-2 h-5 w-5 text-yellow-500" />
                Tournaments
              </CardTitle>
              <Tabs value={tournamentView} onValueChange={setTournamentView} className="w-[200px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription className="text-gray-400">
              Compete in tournaments to earn exclusive rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TabsContent value="upcoming" className="mt-0">
              <div className="space-y-6">
                {tournaments.map((tournament) => (
                  <div key={tournament.id} className="overflow-hidden rounded-lg bg-gray-800/50 shadow">
                    <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold">{tournament.name}</h3>
                        <Badge
                          className={`
                            ${
                              tournament.status === "registering"
                                ? "bg-green-900/30 text-green-400"
                                : "bg-blue-900/30 text-blue-400"
                            }
                          `}
                        >
                          {tournament.status === "registering" ? "Registration Open" : "Coming Soon"}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div className="flex flex-col items-center rounded-lg bg-gray-700/50 p-3">
                          <Calendar className="mb-1 h-5 w-5 text-blue-400" />
                          <div className="text-xs text-gray-400">Date</div>
                          <div className="mt-1 text-center text-sm">{formatDate(tournament.startTime)}</div>
                        </div>
                        <div className="flex flex-col items-center rounded-lg bg-gray-700/50 p-3">
                          <Users className="mb-1 h-5 w-5 text-green-400" />
                          <div className="text-xs text-gray-400">Participants</div>
                          <div className="mt-1 text-sm">
                            {tournament.participants}/{tournament.maxParticipants}
                          </div>
                        </div>
                        <div className="flex flex-col items-center rounded-lg bg-gray-700/50 p-3">
                          <Ticket className="mb-1 h-5 w-5 text-purple-400" />
                          <div className="text-xs text-gray-400">Entry Fee</div>
                          <div className="mt-1 text-sm">{tournament.entryFee}</div>
                        </div>
                        <div className="flex flex-col items-center rounded-lg bg-gray-700/50 p-3">
                          <Clock className="mb-1 h-5 w-5 text-yellow-400" />
                          <div className="text-xs text-gray-400">Starts In</div>
                          <div className="mt-1 text-center text-sm">{getTimeRemaining(tournament.startTime)}</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="mb-2 text-sm font-medium text-gray-400">Prizes</h4>
                        <div className="flex flex-wrap gap-2">
                          {tournament.prizes.map((prize, index) => (
                            <Badge key={index} variant="outline" className="bg-yellow-900/20 text-yellow-400">
                              {prize}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Trophy className="mr-1 h-4 w-4 text-yellow-500" />
                          <span className="text-sm text-gray-400">Top 3 players receive exclusive NFTs</span>
                        </div>
                        <Button
                          className={`
                            ${
                              tournament.status === "registering"
                                ? "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                                : "bg-gray-700 text-gray-300"
                            }
                          `}
                          disabled={tournament.status !== "registering"}
                        >
                          {tournament.status === "registering" ? "Register Now" : "Coming Soon"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past" className="mt-0">
              <div className="space-y-6">
                {pastTournaments.map((tournament) => (
                  <div key={tournament.id} className="overflow-hidden rounded-lg bg-gray-800/50 shadow">
                    <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold">{tournament.name}</h3>
                        <Badge className="bg-gray-700/50 text-gray-300">Completed</Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div className="flex flex-col items-center rounded-lg bg-gray-700/50 p-3">
                          <Calendar className="mb-1 h-5 w-5 text-blue-400" />
                          <div className="text-xs text-gray-400">Date</div>
                          <div className="mt-1 text-center text-sm">{formatDate(tournament.date)}</div>
                        </div>
                        <div className="flex flex-col items-center rounded-lg bg-gray-700/50 p-3">
                          <Users className="mb-1 h-5 w-5 text-green-400" />
                          <div className="text-xs text-gray-400">Participants</div>
                          <div className="mt-1 text-sm">
                            {tournament.participants}/{tournament.maxParticipants}
                          </div>
                        </div>
                        <div className="flex flex-col items-center rounded-lg bg-gray-700/50 p-3">
                          <Trophy className="mb-1 h-5 w-5 text-yellow-400" />
                          <div className="text-xs text-gray-400">Your Place</div>
                          <div className="mt-1 text-sm">#{tournament.yourPlace}</div>
                        </div>
                        <div className="flex flex-col items-center rounded-lg bg-gray-700/50 p-3">
                          <AlertCircle className="mb-1 h-5 w-5 text-purple-400" />
                          <div className="text-xs text-gray-400">Status</div>
                          <div className="mt-1 text-sm capitalize">{tournament.status}</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="mb-2 text-sm font-medium text-gray-400">Rewards Earned</h4>
                        <div className="flex flex-wrap gap-2">
                          {tournament.yourPlace <= 3 ? (
                            tournament.rewards.map((reward, index) => (
                              <Badge key={index} variant="outline" className="bg-yellow-900/20 text-yellow-400">
                                {reward}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-gray-400">
                              No rewards earned (placed #{tournament.yourPlace})
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Trophy className="mr-1 h-4 w-4 text-yellow-500" />
                          <span className="text-sm text-gray-400">
                            {tournament.yourPlace <= 3 ? "You earned tournament rewards!" : "Better luck next time!"}
                          </span>
                        </div>
                        <Button variant="outline" className="border-blue-500 text-blue-400">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="bg-gray-900/60 text-white backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Ticket className="mr-2 h-5 w-5 text-purple-500" />
              Tournament Tokens
            </CardTitle>
            <CardDescription className="text-gray-400">Used to enter special tournaments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center rounded-lg bg-gray-800/50 p-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-900/30">
                  <Ticket className="h-10 w-10 text-purple-400" />
                </div>
                <div className="mt-4 text-center">
                  <div className="text-3xl font-bold">{arenaStats.tournamentTokens}</div>
                  <div className="text-sm text-gray-400">Available Tokens</div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-800/50 p-4">
                <h3 className="mb-3 font-medium">How to Earn Tokens</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-green-900/50 text-center text-xs leading-4 text-green-400">
                      ✓
                    </div>
                    <span>Win 5 ranked matches (1 token)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-green-900/50 text-center text-xs leading-4 text-green-400">
                      ✓
                    </div>
                    <span>Complete daily quests (1 token)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-green-900/50 text-center text-xs leading-4 text-green-400">
                      ✓
                    </div>
                    <span>Reach a new rank tier (2 tokens)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-green-900/50 text-center text-xs leading-4 text-green-400">
                      ✓
                    </div>
                    <span>Purchase with ACE tokens</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-gray-800/50 p-4">
                <h3 className="mb-3 font-medium">Upcoming Token Rewards</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded bg-gray-700/50 p-2">
                    <div className="flex items-center">
                      <Trophy className="mr-2 h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Win Streak Bonus</span>
                    </div>
                    <Badge className="bg-purple-900/30 text-purple-400">2 Tokens</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded bg-gray-700/50 p-2">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                      <span className="text-sm">Weekly Login Reward</span>
                    </div>
                    <Badge className="bg-purple-900/30 text-purple-400">1 Token</Badge>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700">
                <Ticket className="mr-2 h-5 w-5" /> Purchase Tokens
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
