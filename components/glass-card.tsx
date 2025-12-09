import type React from "react"
import { forwardRef } from "react"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`bg-black/40 border border-white/10 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})
GlassCard.displayName = "GlassCard"
