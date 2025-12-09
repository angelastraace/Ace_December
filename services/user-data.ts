// services/user-data.ts
export interface UserXPData {
  totalXP: number
  level: number
  distribution: {
    trading: number
    learning: number
    social: number
    quests: number
    governance: number
  }
  achievements: string[]
}

// Mock data for development
const mockUserXPData: UserXPData = {
  totalXP: 3750,
  level: 12,
  distribution: {
    trading: 35,
    learning: 25,
    social: 15,
    quests: 20,
    governance: 5,
  },
  achievements: ["First Trade", "Knowledge Seeker", "Social Butterfly", "Quest Master", "Governance Participant"],
}

/**
 * Fetch user XP data from the server
 * @param userId - The user ID to fetch data for
 * @returns Promise with the user's XP data
 */
export async function fetchUserXPData(userId?: string): Promise<UserXPData> {
  // In a real implementation, this would fetch from an API or database
  // For now, we'll return mock data with a simulated delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // If we had a real API, we would use the userId parameter
      resolve(mockUserXPData)
    }, 500)
  })
}

/**
 * Calculate the XP needed for the next level
 * @param currentLevel - The user's current level
 * @returns The XP required for the next level
 */
export function calculateXPForNextLevel(currentLevel: number): number {
  // Simple formula: 1000 XP for level 1, then increases by 500 per level
  return 1000 + (currentLevel - 1) * 500
}

/**
 * Calculate the user's progress to the next level
 * @param totalXP - The user's total XP
 * @param currentLevel - The user's current level
 * @returns Progress percentage (0-100)
 */
export function calculateLevelProgress(totalXP: number, currentLevel: number): number {
  const xpForCurrentLevel = calculateXPForNextLevel(currentLevel - 1) || 0
  const xpForNextLevel = calculateXPForNextLevel(currentLevel)
  const xpInCurrentLevel = totalXP - xpForCurrentLevel
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel

  return Math.min(Math.floor((xpInCurrentLevel / xpNeededForNextLevel) * 100), 100)
}
