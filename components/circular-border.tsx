import { cn } from "@/lib/utils"

interface CircularBorderProps {
  className?: string
  size?: number
  thickness?: number
  color?: string
  speed?: number
}

export function CircularBorder({
  className,
  size = 320,
  thickness = 2,
  color = "from-cyan-500 to-purple-600",
  speed = 20,
}: CircularBorderProps) {
  const outerSize = size + thickness * 2

  return (
    <div className={cn("relative", className)} style={{ width: outerSize, height: outerSize }}>
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} animate-spin-slow`}
        style={{
          animationDuration: `${speed}s`,
        }}
      ></div>
      <div
        className="absolute bg-[#020b13] rounded-full"
        style={{
          top: thickness,
          left: thickness,
          right: thickness,
          bottom: thickness,
        }}
      ></div>
    </div>
  )
}
