"use client"

import { useState, useRef, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stars, Html } from "@react-three/drei"
import { Vector3, type Mesh, Color, MeshStandardMaterial } from "three"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useKatLore } from "@/hooks/use-kat-lore"

// Define the zones with their properties
const zones = [
  {
    name: "Trade",
    route: "/trading",
    position: [5, 0, 0],
    color: "#1fa2ff",
    description: "Trade assets across the cosmos",
  },
  {
    name: "Learn",
    route: "/dreamstate/features",
    position: [-5, 1, 2],
    color: "#fc466b",
    description: "Expand your cosmic knowledge",
  },
  {
    name: "Earn",
    route: "/staking",
    position: [0, -3, -5],
    color: "#43e97b",
    description: "Accumulate rewards and XP",
  },
  {
    name: "Launchpad",
    route: "/marketplace",
    position: [2, 5, -3],
    color: "#f9d423",
    description: "Discover new cosmic ventures",
  },
  {
    name: "Dreamstate",
    route: "/dreamstate",
    position: [-6, -2, 4],
    color: "#a18cd1",
    description: "Enter the cosmic consciousness",
  },
  {
    name: "Governance",
    route: "/governance",
    position: [4, -4, 2],
    color: "#7b4397",
    description: "Shape the future of the cosmos",
  },
  {
    name: "Analytics",
    route: "/analytics",
    position: [-3, 4, -2],
    color: "#00c6ff",
    description: "Analyze cosmic patterns",
  },
]

// Planet component with hover and click effects
function Planet({ name, color, position, description, onClick, onHover, onLeave, active }) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const baseScale = 1
  const hoverScale = 1.2

  // Create a glow effect for the planet
  const glowMaterial = new MeshStandardMaterial({
    color: new Color(color),
    emissive: new Color(color),
    emissiveIntensity: 0.6,
    roughness: 0.2,
    metalness: 0.8,
  })

  // Animate the planet on hover and rotation
  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Rotate the planet
    meshRef.current.rotation.y += delta * 0.2

    // Scale on hover
    if (hovered && meshRef.current.scale.x < hoverScale) {
      meshRef.current.scale.set(
        meshRef.current.scale.x + delta * 2,
        meshRef.current.scale.y + delta * 2,
        meshRef.current.scale.z + delta * 2,
      )
    } else if (!hovered && meshRef.current.scale.x > baseScale) {
      meshRef.current.scale.set(
        Math.max(baseScale, meshRef.current.scale.x - delta * 2),
        Math.max(baseScale, meshRef.current.scale.y - delta * 2),
        Math.max(baseScale, meshRef.current.scale.z - delta * 2),
      )
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => {
          setHovered(true)
          onHover(name, description)
        }}
        onPointerOut={() => {
          setHovered(false)
          onLeave()
        }}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <primitive object={glowMaterial} attach="material" />

        {/* Orbit ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[1.5, 1.6, 64]} />
          <meshBasicMaterial color={color} opacity={0.4} transparent />
        </mesh>

        {/* Planet label */}
        <Html center position={[0, -1.8, 0]} className="pointer-events-none">
          <div
            className={`text-white text-sm font-bold transition-all duration-300 ${hovered ? "scale-125" : "scale-100"}`}
          >
            {name}
          </div>
        </Html>
      </mesh>
    </group>
  )
}

// Camera controller for smooth transitions
function CameraController({ target, isTransitioning }) {
  const { camera } = useThree()
  const currentPosition = useRef(new Vector3(0, 0, 15))

  useFrame((state, delta) => {
    if (isTransitioning && target) {
      // Calculate direction to target
      const direction = new Vector3().subVectors(
        new Vector3(target[0], target[1], target[2] + 5), // Position camera 5 units away from planet
        currentPosition.current,
      )

      // Move camera a fraction of the way to the target
      if (direction.length() > 0.1) {
        direction.multiplyScalar(delta * 2) // Adjust speed here
        currentPosition.current.add(direction)
        camera.position.copy(currentPosition.current)
        camera.lookAt(target[0], target[1], target[2])
      }
    } else {
      // Reset camera position when not transitioning
      const defaultPos = new Vector3(0, 0, 15)
      const direction = new Vector3().subVectors(defaultPos, currentPosition.current)

      if (direction.length() > 0.1) {
        direction.multiplyScalar(delta * 2)
        currentPosition.current.add(direction)
        camera.position.copy(currentPosition.current)
        camera.lookAt(0, 0, 0)
      }
    }
  })

  return null
}

// Main ZoneGalaxy component
export function ZoneGalaxy() {
  const router = useRouter()
  const [hoveredZone, setHoveredZone] = useState<string | null>(null)
  const [zoneDescription, setZoneDescription] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [targetPosition, setTargetPosition] = useState<number[] | null>(null)
  const [selectedZone, setSelectedZone] = useState<string | null>(null)
  const { triggerKatLine } = useKatLore()

  const handleZoneHover = useCallback((name: string, description: string) => {
    setHoveredZone(name)
    setZoneDescription(description)
  }, [])

  const handleZoneLeave = useCallback(() => {
    setHoveredZone(null)
    setZoneDescription(null)
  }, [])

  const handleZoneClick = useCallback(
    (zone) => {
      setSelectedZone(zone.name)
      setTargetPosition(zone.position)
      setIsTransitioning(true)

      // Trigger Kat voice line
      triggerKatLine("zone_change", { zone: zone.name })

      // Navigate after a delay for the camera transition
      setTimeout(() => {
        router.push(zone.route)
      }, 1500)
    },
    [router, triggerKatLine],
  )

  return (
    <div className="relative w-full h-full">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />

        {zones.map((zone, i) => (
          <Planet
            key={i}
            name={zone.name}
            color={zone.color}
            position={zone.position}
            description={zone.description}
            onClick={() => handleZoneClick(zone)}
            onHover={handleZoneHover}
            onLeave={handleZoneLeave}
            active={selectedZone === zone.name}
          />
        ))}

        <CameraController target={targetPosition} isTransitioning={isTransitioning} />
      </Canvas>

      {/* Zone info overlay */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: hoveredZone ? 1 : 0,
          y: hoveredZone ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
      >
        {hoveredZone && (
          <div className="bg-black/50 backdrop-blur-md rounded-lg p-4 border border-white/10">
            <h3 className="text-xl font-bold text-white">{hoveredZone}</h3>
            <p className="text-gray-300">{zoneDescription}</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
