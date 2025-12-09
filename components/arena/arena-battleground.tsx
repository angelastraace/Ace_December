import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Swords, Shield, Zap, Target } from "lucide-react"

interface ArenaBattlegroundProps {
  katInfo: any
  arenaStats: any
}

export default function ArenaBattleground({ katInfo, arenaStats }: ArenaBattlegroundProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Battle Arena</CardTitle>
            <CardDescription className="text-gray-400">Prepare your Kat for battle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="mb-4 h-48 w-48 rounded-full bg-gradient-to-br from-purple-900 to-blue-900 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-900">
                  <span className="text-6xl">🐱</span>
                </div>
              </div>
              <h3 className="mb-1 text-xl font-bold text-white">{katInfo.name}</h3>
              <p className="mb-4 text-sm text-gray-400">
                Level {katInfo.level} {katInfo.evolutionStage}
              </p>

              <div className="mb-6 grid w-full grid-cols-2 gap-3">
                <div className="flex items-center rounded-md bg-gray-800 p-2">
                  <Swords className="mr-2 h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-xs text-gray-400">Attack</p>
                    <p className="text-sm font-medium text-white">78</p>
                  </div>
                </div>
                <div className="flex items-center rounded-md bg-gray-800 p-2">
                  <Shield className="mr-2 h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-400">Defense</p>
                    <p className="text-sm font-medium text-white">65</p>
                  </div>
                </div>
                <div className="flex items-center rounded-md bg-gray-800 p-2">
                  <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-xs text-gray-400">Speed</p>
                    <p className="text-sm font-medium text-white">82</p>
                  </div>
                </div>
                <div className="flex items-center rounded-md bg-gray-800 p-2">
                  <Target className="mr-2 h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-xs text-gray-400">Accuracy</p>
                    <p className="text-sm font-medium text-white">70</p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white">Enter Battle</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Equipped Traits</CardTitle>
            <CardDescription className="text-gray-400">Special abilities and bonuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {katInfo.traits.map((trait: any) => (
                <div key={trait.id} className="rounded-lg bg-gray-800 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">{trait.name}</h4>
                      <p className="text-xs text-gray-400">
                        {trait.type} • {trait.rarity}
                      </p>
                    </div>
                    <div className="rounded-md bg-gray-700 px-2 py-1 text-xs text-teal-400">{trait.battleBonus}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Battle Modes</CardTitle>
            <CardDescription className="text-gray-400">Choose your combat style</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4 transition-colors hover:border-purple-700 hover:bg-gray-800">
                <h3 className="mb-1 text-lg font-medium text-white">Ranked Match</h3>
                <p className="mb-3 text-sm text-gray-400">
                  Battle against opponents of similar rank to climb the leaderboard
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">
                    {arenaStats.dailyMatchesPlayed}/{arenaStats.dailyMatchesLimit} daily matches
                  </div>
                  <Button size="sm" variant="outline" className="border-purple-700 text-purple-400">
                    Queue Up
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4 transition-colors hover:border-blue-700 hover:bg-gray-800">
                <h3 className="mb-1 text-lg font-medium text-white">Practice Match</h3>
                <p className="mb-3 text-sm text-gray-400">Train your skills without affecting your rank</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">Unlimited matches</div>
                  <Button size="sm" variant="outline" className="border-blue-700 text-blue-400">
                    Start Practice
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4 transition-colors hover:border-amber-700 hover:bg-gray-800">
                <h3 className="mb-1 text-lg font-medium text-white">Tournament</h3>
                <p className="mb-3 text-sm text-gray-400">Compete in structured events for exclusive rewards</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">{arenaStats.tournamentTokens} tokens available</div>
                  <Button size="sm" variant="outline" className="border-amber-700 text-amber-400">
                    View Tournaments
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4 transition-colors hover:border-green-700 hover:bg-gray-800">
                <h3 className="mb-1 text-lg font-medium text-white">Friend Battle</h3>
                <p className="mb-3 text-sm text-gray-400">Challenge your friends to a friendly match</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">No energy cost</div>
                  <Button size="sm" variant="outline" className="border-green-700 text-green-400">
                    Create Invite
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Season Progress</CardTitle>
            <CardDescription className="text-gray-400">
              {arenaStats.currentSeason} • Ends in {new Date(arenaStats.seasonEndDate).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">{arenaStats.currentRank}</span>
                <span className="text-sm text-gray-400">{arenaStats.nextRank}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-700">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                  style={{
                    width: `${(arenaStats.rankPoints / arenaStats.nextRankPoints) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="mt-1 text-center text-xs text-gray-400">
                {arenaStats.rankPoints} / {arenaStats.nextRankPoints} Rank Points
              </div>
            </div>

            <div className="rounded-lg bg-gray-800 p-3">
              <h4 className="mb-2 font-medium text-white">Rank Rewards</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded bg-gray-700 p-2 text-center">
                  <div className="mb-1 text-xs text-gray-400">Current</div>
                  <div className="text-sm font-medium text-white">100 XP</div>
                </div>
                <div className="rounded bg-gray-700 p-2 text-center">
                  <div className="mb-1 text-xs text-gray-400">Next Rank</div>
                  <div className="text-sm font-medium text-white">250 XP</div>
                </div>
                <div className="rounded bg-gray-700 p-2 text-center">
                  <div className="mb-1 text-xs text-gray-400">Season End</div>
                  <div className="text-sm font-medium text-white">1000 XP</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
