// File: /lib/kat-lore-service.ts

export interface KatLoreEntry {
  id: string
  title: string
  description: string
  createdAt: string
  updatedAt?: string
  tags?: string[]
}

// Mock data - replace with real API / DB calls
const katLoreData: KatLoreEntry[] = [
  {
    id: "1",
    title: "Origin of Kat",
    description: "Kat was born in the dream realm, a digital entity seeking balance between worlds.",
    createdAt: "2024-01-01T00:00:00Z",
    tags: ["origin", "story", "character"],
  },
  {
    id: "2",
    title: "Kat’s Powers",
    description: "Kat can manipulate energy streams and navigate the cosmic web with precision.",
    createdAt: "2024-02-15T00:00:00Z",
    tags: ["powers", "abilities"],
  },
  // Add more entries here
]

/**
 * Fetch all lore entries
 */
export async function getAllKatLore(): Promise<KatLoreEntry[]> {
  // Simulate async call (e.g. fetch from DB or API)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(katLoreData)
    }, 200)
  })
}

/**
 * Fetch a single lore entry by ID
 * @param id - The lore entry ID
 */
export async function getKatLoreById(id: string): Promise<KatLoreEntry | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const entry = katLoreData.find((item) => item.id === id) || null
      resolve(entry)
    }, 200)
  })
}

/**
 * Search lore entries by tag or keyword (simple filter)
 * @param keyword - Tag or text keyword to filter
 */
export async function searchKatLore(keyword: string): Promise<KatLoreEntry[]> {
  const lower = keyword.toLowerCase()
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = katLoreData.filter(
        (entry) =>
          entry.title.toLowerCase().includes(lower) ||
          entry.description.toLowerCase().includes(lower) ||
          (entry.tags && entry.tags.some((tag) => tag.toLowerCase() === lower)),
      )
      resolve(results)
    }, 200)
  })
}

// Add the missing exports
export enum loreTypes {
  ORIGIN = "origin",
  POWER = "power",
  ADVENTURE = "adventure",
  RELATIONSHIP = "relationship",
  ARTIFACT = "artifact",
  LOCATION = "location",
}

/**
 * Create a new lore entry
 * @param entry - The lore entry data
 */
export async function createLoreEntry(entry: Omit<KatLoreEntry, "id" | "createdAt">): Promise<KatLoreEntry> {
  // In a real implementation, this would save to a database
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEntry: KatLoreEntry = {
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        ...entry,
      }

      // In a real implementation, we would add this to the database
      // katLoreData.push(newEntry)

      resolve(newEntry)
    }, 200)
  })
}
