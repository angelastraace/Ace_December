import Image from "next/image"
import { cn } from "@/lib/utils"

interface AceLogoProps {
  className?: string
  size?: number
  circular?: boolean
}

export function AceLogo({ className, size = 300, circular = true }: AceLogoProps) {
  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl animate-pulse",
          circular ? "rounded-full" : "",
        )}
      ></div>
      <div className={cn("relative z-10 overflow-hidden", circular ? "rounded-full" : "")}>
        <Image
          src="/ace-coin-official.jpeg"
          alt="ACE Exchange Logo"
          width={size}
          height={size}
          className="object-cover"
        />
      </div>
    </div>
  )
}



