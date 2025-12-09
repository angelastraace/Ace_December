"use client"

import { createContext, type ReactNode, useContext, useState } from "react"

interface LiveEventsContextValue {
  isLive: boolean
  setIsLive: (value: boolean) => void
}

const LiveEventsContext = createContext<LiveEventsContextValue | undefined>(undefined)

export function LiveEventsProvider({ children }: { children: ReactNode }) {
  const [isLive, setIsLive] = useState(false)

  return <LiveEventsContext.Provider value={{ isLive, setIsLive }}>{children}</LiveEventsContext.Provider>
}

export function useLiveEvents() {
  const context = useContext(LiveEventsContext)
  if (!context) {
    throw new Error("useLiveEvents must be used within a LiveEventsProvider")
  }
  return context
}
