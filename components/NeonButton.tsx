"use client"

// components/NeonButton.tsx
import type React from "react"

export function NeonButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="
        px-6 py-3 rounded-lg text-white font-semibold bg-cyan-600
        hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-400
        shadow-[0_0_10px_cyan] hover:shadow-[0_0_20px_cyan] transition
      "
    >
      {children}
    </button>
  )
}
