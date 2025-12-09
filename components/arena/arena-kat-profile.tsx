"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Zap, Shield, Swords } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ArenaKatProfileProps {
  katInfo: any
  arenaStats: any
}

export default function ArenaKatProfile({ katInfo, arenaStats }: ArenaKatProfileProps) {
  const [activeTab, setActiveTab] = useState("stats")

  // Mock battle history
  const battleHistory = [
    {
      id: "battle-1",
      opponent: "Stellar Nova",
      opponentLevel: 16,
      opponentRank: "Silver I",
      result: "win",
      date: "2 hours ago",
      rankChange: "+25",
      duration: "4:32",
    },
    {
      id: "battle-2",
      opponent: "Quantum Whisker",
      opponentLevel: 14,
      opponentRank: "Silver III",
      result: "win",
      date: "5 hours ago",
      rankChange: "+22",
      duration: "3:45",
    },
    {
      id: "battle-3",
      opponent: "Nebula Paws",
      opponentLevel: 15,
      opponentRank: "Silver II",
      result: "loss",
      date: "Yesterday",
      rankChange: "-18",
      duration: "5:10",
    },
  ]

  // Mock abilities
  const abilities = [
    {
      id: "ability-1",
      name: "Cosmic Slash",
      type: "attack",
      description: "A powerful slash that deals damage to the opponent",
      cooldown: "3 turns",
      damage: "35-45",
      element: "cosmic",
    },
    {
      id: "ability-2",
      name: "Stellar Shield",
      type: "defense",
      description: "Creates a shield that absorbs damage for 2 turns",
      cooldown: "4 turns",
      defense: "50% reduction",
      element: "stellar",
    },
    {
      id: "ability-3",
      name: "Quantum Leap",
      type: "utility",
      description: "Increases speed and evasion for 2 turns",
      cooldown: "5 turns",
      effect: "+30% Speed, +20% Evasion",
      element: "quantum",
    },
  ]

  // Mock achievements
  const achievements = [
    {
      id: "achievement-1",
      name: "First Victory",
      description: "Win your first Arena battle",
      completed: true,
      date: "April 28, 2025",
    },
    {
      id: "achievement-2",
      name: "Battle Novice",
      description: "Win 10 Arena battles",
      completed: true,
      date: "May 5, 2025",
    },
    {
      id: "achievement-3",
      name: "Battle Adept",
      description: "Win 50 Arena battles",
      completed: false,
      progress: katInfo.wins,
      total: 50,
    },
    {
      id: "achievement-4",
      name: "Tournament Participant",
      description: "Participate in a tournament",
      completed: true,
      date: "May 8, 2025",
    },
    {
      id: "achievement-5",
      name: "Tournament Victor",
      description: "Win a tournament",
      completed: false,
      progress: 0,
      total: 1,
    },
  ]

  const getElementColor = (element: string) => {
    switch (element.toLowerCase()) {
      case "cosmic":
        return "border-purple-700 text-purple-400"
      case "stellar":
        return "border-blue-700 text-blue-400"
      case "quantum":
        return "border-teal-700 text-teal-400"
      case "nebula":
        return "border-indigo-700 text-indigo-400"
      case "astral":
        return "border-amber-700 text-amber-400"
      default:
        return "border-gray-700 text-gray-400"
    }
  }

  const getAbilityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "attack":
        return <Swords className="h-5 w-5 text-red-500" />
      case "defense":
        return <Shield className="h-5 w-5 text-blue-500" />
      case "utility":
        return <Zap className="h-5 w-5 text-yellow-500" />
      default:
        return <Star className="h-5 w-5 text-purple-500" />
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="space-y-6">
        <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Kat Profile</CardTitle>
            <CardDescription className="text-gray-400">Your battle companion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="mb-4 h-32 w-32 rounded-full bg-gradient-to-br from-purple-900 to-blue-900 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-900">
                  <span className="text-5xl">🐱</span>
                </div>
              </div>

              <h3 className="mb-1 text-xl font-bold text-white">{katInfo.name}</h3>
              <div className="mb-2 flex items-center">
                <Badge className="mr-2 bg-purple-500/20 text-purple-400">Level {katInfo.level}</Badge>
                <Badge className="bg-blue-500/20 text-blue-400">{katInfo.evolutionStage}</Badge>
              </div>
              <p className="mb-4 text-sm text-gray-400">A cosmic feline with extraordinary abilities</p>

              <div className="mb-4 w-full">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Battle Rank</span>
                  <span className="text-xs text-white">{katInfo.battleRank}</span>
                </div>
                <Progress value={75} max={100} className="h-2 bg-gray-800" />
              </div>

              <div className="grid w-full grid-cols-2 gap-2">
                <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-2 text-center">
                  <p className="text-lg font-bold text-white">{katInfo.wins}</p>
                  <p className="text-xs text-gray-400">Wins</p>
                </div>
                <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-2 text-center">
                  <p className="text-lg font-bold text-white">{katInfo.losses}</p>
                  <p className="text-xs text-gray-400">Losses</p>
                </div>
                <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-2 text-center">
                  <p className="text-lg font-bold text-white">{katInfo.winRate}%</p>
                  <p className="text-xs text-gray-400">Win Rate</p>
                </div>
                <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-2 text-center">
                  <p className="text-lg font-bold text-white">{arenaStats.rankPoints}</p>
                  <p className="text-xs text-gray-400">Rank Points</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Kat Traits</CardTitle>
            <CardDescription className="text-gray-400">Special traits that enhance battle performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {katInfo.traits.map((trait: any) => (
                <div key={trait.id} className="rounded-lg border border-gray-800 bg-gray-900/50 p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-white">{trait.name}</h4>
                    <Badge
                      className={`bg-${trait.rarity === "legendary" ? "amber" : trait.rarity === "epic" ? "purple" : "blue"}-500/20 text-${trait.rarity === "legendary" ? "amber" : trait.rarity === "epic" ? "purple" : "blue"}-400`}
                    >
                      {trait.rarity}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">Type: {trait.type}</p>
                  <p className="mt-1 text-sm text-teal-400">{trait.battleBonus}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <Tabs defaultValue="stats" onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-900">
                <TabsTrigger value="stats">Stats</TabsTrigger>
                <TabsTrigger value="abilities">Abilities</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="stats" className={activeTab === "stats" ? "block" : "hidden"}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-3 text-center">
                    <p className="text-sm text-gray-400">Attack</p>
                    <p className="text-xl font-bold text-white">78</p>
                    <Progress value={78} max={100} className="mt-2 h-1 bg-gray-800" />
                  </div>
                  <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-3 text-center">
                    <p className="text-sm text-gray-400">Defense</p>
                    <p className="text-xl font-bold text-white">65</p>
                    <Progress value={65} max={100} className="mt-2 h-1 bg-gray-800" />
                  </div>
                  <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-3 text-center">
                    <p className="text-sm text-gray-400">Speed</p>
                    <p className="text-xl font-bold text-white">82</p>
                    <Progress value={82} max={100} className="mt-2 h-1 bg-gray-800" />
                  </div>
                  <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-3 text-center">
                    <p className="text-sm text-gray-400">Stamina</p>
                    <p className="text-xl font-bold text-white">
                      {katInfo.stamina}/{katInfo.maxStamina}
                    </p>
                    <Progress value={katInfo.stamina} max={katInfo.maxStamina} className="mt-2 h-1 bg-gray-800" />
                  </div>
                </div>

                <h3 className="font-medium text-white">Battle History</h3>
                <div className="space-y-2">
                  {battleHistory.map((battle) => (
                    <div
                      key={battle.id}
                      className={`rounded-lg border p-3 ${battle.result === "win" ? "border-green-800 bg-green-900/20" : "border-red-800 bg-red-900/20"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">vs {battle.opponent}</p>
                          <p className="text-sm text-gray-400">
                            Level {battle.opponentLevel} • {battle.opponentRank}
                          </p>
                        </div>
                        <Badge
                          className={battle.result === "win" ? "bg-green-500 text-black" : "bg-red-500 text-black"}
                        >
                          {battle.result === "win" ? "Victory" : "Defeat"}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-gray-400">{battle.date}</span>
                        <span className="text-gray-400">Duration: {battle.duration}</span>
                        <span className={battle.result === "win" ? "text-green-400" : "text-red-400"}>
                          {battle.rankChange} RP
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button variant="outline" className="border-gray-700 text-gray-300">
                    View All Battles
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="abilities" className={activeTab === "abilities" ? "block" : "hidden"}>
              <div className="space-y-4">
                {abilities.map((ability) => (
                  <div key={ability.id} className={`rounded-lg border p-4 ${getElementColor(ability.element)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="mr-3 rounded-full bg-gray-800 p-2">{getAbilityIcon(ability.type)}</div>
                        <div>
                          <h4 className="font-medium text-white">{ability.name}</h4>
                          <p className="text-sm text-gray-400">{ability.description}</p>
                        </div>
                      </div>
                      <Badge className="bg-gray-800 text-gray-300">{ability.type}</Badge>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                      <div className="rounded-md bg-gray-800/50 p-2">
                        <p className="text-gray-400">Cooldown</p>
                        <p className="font-medium text-white">{ability.cooldown}</p>
                      </div>
                      <div className="rounded-md bg-gray-800/50 p-2">
                        <p className="text-gray-400">
                          {ability.type === "attack" ? "Damage" : ability.type === "defense" ? "Defense" : "Effect"}
                        </p>
                        <p className="font-medium text-white">
                          {ability.type === "attack"
                            ? ability.damage
                            : ability.type === "defense"
                              ? ability.defense
                              : ability.effect}
                        </p>
                      </div>
                      <div className="rounded-md bg-gray-800/50 p-2">
                        <p className="text-gray-400">Element</p>
                        <p className="font-medium text-white capitalize">{ability.element}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="rounded-lg border border-dashed border-gray-700 p-4 text-center">
                  <p className="text-gray-400">Unlock new abilities by leveling up your Kat</p>
                  <Button className="mt-3 bg-purple-600 text-white hover:bg-purple-700">Train Kat</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className={activeTab === "achievements" ? "block" : "hidden"}>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-white">{achievement.name}</h4>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                      </div>
                      {achievement.completed ? (
                        <Badge className="bg-green-500 text-black">Completed</Badge>
                      ) : (
                        <Badge className="bg-amber-500 text-black">In Progress</Badge>
                      )}
                    </div>

                    {achievement.completed ? (
                      <p className="mt-2 text-sm text-gray-400">Completed on {achievement.date}</p>
                    ) : (
                      <div className="mt-2">
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">
                            {achievement.progress}/{achievement.total}
                          </span>
                        </div>
                        <Progress
                          value={(achievement.progress / achievement.total) * 100}
                          max={100}
                          className="h-2 bg-gray-800"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
