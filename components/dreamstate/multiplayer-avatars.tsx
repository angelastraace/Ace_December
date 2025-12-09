"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import type { Mesh } from "three"
import { useGlowMaterial } from "@/hooks/use-glow-material"

// Mock user data - in a real app, this would come from a database or API
const mockUsers = [
  { id: "user1", name: "CosmicTrader", position: [3, 0, -4], color: "#4caf50", xp: 1250 },
  { id: "user2", name: "StarGazer", position: [-4, 0, -2], color: "#2196f3", xp: 890 },
  { id: "user3", name: "MoonWalker", position: [4, 0, 2], color: "#e91e63", xp: 1560 },
  { id: "user4", name: "NebulaSeeker", position: [-2, 0, 5], color: "#ff9800", xp: 720 },
]

// Avatar component for a single user
function UserAvatar({
  name,
  position,
  color,
  xp,
}: {
  name: string
  position: [number, number, number]
  color: string
  xp: number
}) {
  const meshRef = useRef<Mesh>(null)
  const trailRef = useRef<Mesh>(null)
  const glowMaterial = useGlowMaterial(color, 1.5)
  const [hovered, setHovered] = useState(false)

  // Random movement parameters
  const movementSpeed = useRef(0.01 + Math.random() * 0.01)
  const movementRadius = useRef(1 + Math.random() * 0.5)
  const startAngle = useRef(Math.random() * Math.PI * 2)

  // Calculate avatar size based on XP
  const size = 0.2 + (xp / 5000) * 0.3 // Scale between 0.2 and 0.5 based on XP

  // Animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.1

      // Circular movement around base position
      const angle = startAngle.current + clock.elapsedTime * movementSpeed.current
      meshRef.current.position.x = position[0] + Math.cos(angle) * movementRadius.current
      meshRef.current.position.z = position[2] + Math.sin(angle) * movementRadius.current

      // Rotation
      meshRef.current.rotation.y += 0.01
    }

    // Update trail position to follow avatar
    if (trailRef.current && meshRef.current) {
      trailRef.current.position.copy(meshRef.current.position)
      trailRef.current.position.y -= 0.1 // Position trail slightly below avatar
    }
  })

  return (
    <group>
      {/* Avatar */}
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? [size * 1.2, size * 1.2, size * 1.2] : [size, size, size]}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Glow effect */}
      <mesh position={position} scale={[size * 1.4, size * 1.4, size * 1.4]}>
        <sphereGeometry args={[1, 16, 16]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>

      {/* XP trail */}
      <mesh ref={trailRef} position={[position[0], position[1] - 0.1, position[2]]}>
        <cylinderGeometry args={[0.05, 0.2, 0.5, 8]} />
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </mesh>

      {/* Username */}
      {hovered && (
        <Text
          position={[position[0], position[1] + 0.5, position[2]]}
          color="white"
          fontSize={0.2}
          anchorX="center"
          anchorY="middle"
          backgroundColor="#00000080"
          padding={0.05}
        >
          {name} • {xp} XP
        </Text>
      )}
    </group>
  )
}

// Main component
export function MultiplayerAvatars() {
  // In a real app, you would fetch real-time user data here
  // For now, we'll use the mock data

  return (
    <>
      {mockUsers.map((user) => (
        <UserAvatar key={user.id} name={user.name} position={user.position} color={user.color} xp={user.xp} />
      ))}
    </>
  )
}
