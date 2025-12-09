export type MissionChain = {
  id: string
  name: string
  description: string
  missionIds: string[]
  rewards: any[]
}

export type MissionRarity = "common" | "uncommon" | "rare" | "epic" | "legendary"

export type MissionCategory = "trade" | "stake" | "learn" | "governance" | "social" | "arena" | "special"

export type Mission = {
  id: string
  title: string
  description: string
  category: MissionCategory
  rarity: MissionRarity
  frequency: string
  steps: {
    id: string
    description: string
    type: string
    target: number
    progress: number
    completed: boolean
  }[]
  rewards: any[]
  requiresLevel?: number
  katReaction?: any
  isStoryMission?: boolean
  storyChain?: string
  storyOrder?: number
}

export type UserMission = {
  userId: string
  missionId: string
  status: "active" | "completed" | "failed"
  progress: number
  steps: {
    id: string
    description: string
    type: string
    target: number
    progress: number
    completed: boolean
  }[]
  startedAt: string
  completedAt?: string
  rewardsClaimed: boolean
}
