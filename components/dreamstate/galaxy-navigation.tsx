"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Stars, Text } from "@react-three/drei"
import { Vector3, type Mesh, type Group } from "three"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useGlowMaterial } from "@/hooks/use-glow-material"
import { MultiplayerAvatars } from "@/components/dreamstate/multiplayer-avatars"

// Define the zones in the galaxy
const zones = [
  { id: "meditation", name: "Meditation", position: [5, 0, 0], color: "#9c27b0" },
  { id: "trade", name: "Trade", position: [-5, 0, 3], color: "#2196f3" },
  { id: "learn", name: "Learn", position: [0, 0, -5], color: "#e91e63" },
  { id: "constellation", name: "Constellation", position: [3, 0, 5], color: "#673ab7" },
]

// Planet component
function Planet({
  position,
  color,
  name,
  isSelected,
  onClick,
}: {
  position: [number, number, number]
  color: string
  name: string
  isSelected: boolean
  onClick: () => void
}) {
  const meshRef = useRef<Mesh>(null)
  const groupRef = useRef<Group>(null)
  const glowMaterial = useGlowMaterial(color, 1.8)

  // Hover state
  const [hovered, setHovered] = useState(false)

  // Animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }

    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  // Scale based on selection and hover
  const scale = isSelected ? 1.3 : hovered ? 1.1 : 1

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Glow effect */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>

      {/* Planet name */}
      <Text position={[0, 1.5, 0]} color="white" fontSize={0.5} anchorX="center" anchorY="middle">
        {name}
      </Text>
    </group>
  )
}

// User ship component
function UserShip({ targetPosition }: { targetPosition: Vector3 }) {
  const meshRef = useRef<Mesh>(null)
  const currentPosition = useRef(new Vector3(0, 0, 10))

  useFrame(() => {
    if (meshRef.current) {
      // Smoothly move towards target
      currentPosition.current.lerp(targetPosition, 0.02)
      meshRef.current.position.copy(currentPosition.current)

      // Rotate to face movement direction
      if (targetPosition.distanceTo(currentPosition.current) > 0.1) {
        meshRef.current.lookAt(targetPosition)
      }
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 10]}>
      <coneGeometry args={[0.3, 1, 4]} />
      <meshStandardMaterial color="#ffffff" emissive="#5d00ff" emissiveIntensity={0.5} />
    </mesh>
  )
}

// Main scene component
function GalaxyScene({
  selectedZone,
  onSelectZone,
}: {
  selectedZone: string | null
  onSelectZone: (id: string) => void
}) {
  const { camera } = useThree()
  const [targetPosition, setTargetPosition] = useState(new Vector3(0, 0, 10))

  // Handle zone selection
  const handleZoneClick = (id: string, position: [number, number, number]) => {
    onSelectZone(id)
    setTargetPosition(new Vector3(...position))

    // Move camera to look at the selected zone
    const cameraTarget = new Vector3(...position)
    camera.lookAt(cameraTarget)
  }

  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.2} />

      {/* Directional light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Background stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Central sun */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#ff9d00" emissive="#ff9d00" emissiveIntensity={1} />
      </mesh>

      {/* Planets for each zone */}
      {zones.map((zone) => (
        <Planet
          key={zone.id}
          position={zone.position}
          color={zone.color}
          name={zone.name}
          isSelected={selectedZone === zone.id}
          onClick={() => handleZoneClick(zone.id, zone.position)}
        />
      ))}

      {/* User ship */}
      <UserShip targetPosition={targetPosition} />

      {/* Multiplayer avatars */}
      <MultiplayerAvatars />

      {/* Controls */}
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} minDistance={5} maxDistance={30} />
    </>
  )
}

// Main component
export function GalaxyNavigation({ onZoneSelect }: { onZoneSelect: (zone: string) => void }) {
  const [selectedZone, setSelectedZone] = useState<string | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  const [zoneInfo, setZoneInfo] = useState({ name: "", description: "" })

  // Zone descriptions
  const zoneDescriptions: Record<string, string> = {
    meditation:
      "Enter a state of focused awareness with guided meditation sessions designed to enhance your trading intuition.",
    trade: "Experience trading in a new dimension with intuitive visualizations and cosmic patterns.",
    learn: "Access immersive educational experiences that combine traditional learning with cosmic insights.",
    constellation: "Explore your unique XP constellation that grows and evolves as you progress through Dreamstate.",
  }

  // Handle zone selection
  const handleSelectZone = (id: string) => {
    setSelectedZone(id)
    setZoneInfo({
      name: zones.find((z) => z.id === id)?.name || "",
      description: zoneDescriptions[id] || "",
    })
    setShowInfo(true)
    onZoneSelect(id)
  }

  return (
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
        <GalaxyScene selectedZone={selectedZone} onSelectZone={handleSelectZone} />
      </Canvas>

      {/* Zone information overlay */}
      {showInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80"
        >
          <Card className="bg-black/70 border border-purple-500/30 backdrop-blur-sm p-4">
            <h3 className="text-lg font-medium text-white mb-2">{zoneInfo.name} Zone</h3>
            <p className="text-sm text-gray-300 mb-4">{zoneInfo.description}</p>
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-950/30"
                onClick={() => setShowInfo(false)}
              >
                Close
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Navigation help */}
      <div className="absolute top-4 left-4 text-xs text-white/70 bg-black/50 p-2 rounded">
        <p>Drag to rotate • Scroll to zoom • Click on planets to navigate</p>
      </div>
    </div>
  )
}
