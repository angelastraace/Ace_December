"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, OrbitControls } from "@react-three/drei"
import { type Mesh, type Group, BufferAttribute } from "three"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useGlowMaterial } from "@/hooks/use-glow-material"

// Core module component
function CoreModule({ isActive }: { isActive: boolean }) {
  const meshRef = useRef<Mesh>(null)
  const glowMaterial = useGlowMaterial("#e91e63", isActive ? 2.5 : 1.5)

  // Animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.z += 0.005

      // Pulse effect when active
      if (isActive) {
        const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05
        meshRef.current.scale.set(1 + pulse, 1 + pulse, 1 + pulse)
      }
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#e91e63"
          emissive="#e91e63"
          emissiveIntensity={isActive ? 0.5 : 0.2}
          wireframe={true}
        />
      </mesh>

      {/* Glow effect */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <dodecahedronGeometry args={[1, 0]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>
    </group>
  )
}

// Orbital nodes
function OrbitalNodes({ count = 4, isActive }: { count?: number; isActive: boolean }) {
  const nodes = useRef<Mesh[]>([])
  const group = useRef<Group>(null)
  const colors = ["#2196f3", "#9c27b0", "#4caf50", "#ff9800"]
  const glowMaterials = colors.map((color) => useGlowMaterial(color, isActive ? 1.8 : 1.2))

  // Initialize nodes
  useEffect(() => {
    nodes.current = Array(count).fill(null)
  }, [count])

  // Animation
  useFrame((state) => {
    // Rotate the entire group
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1
    }

    // Animate individual nodes
    nodes.current.forEach((node, i) => {
      if (node) {
        // Orbital movement
        const angle = (i / count) * Math.PI * 2 + state.clock.elapsedTime * (0.1 + i * 0.05)
        const radius = 2.5

        node.position.x = Math.cos(angle) * radius
        node.position.z = Math.sin(angle) * radius
        node.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.5

        // Rotation
        node.rotation.y += 0.01
        node.rotation.x += 0.005

        // Scale pulse when active
        if (isActive) {
          const scale = 0.4 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.05
          node.scale.set(scale, scale, scale)
        }
      }
    })
  })

  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, i) => (
        <group key={i}>
          <mesh
            ref={(el) => {
              if (el) nodes.current[i] = el
            }}
            position={[Math.cos((i / count) * Math.PI * 2) * 2.5, 0, Math.sin((i / count) * Math.PI * 2) * 2.5]}
            scale={[0.4, 0.4, 0.4]}
          >
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={colors[i]} emissive={colors[i]} emissiveIntensity={isActive ? 0.5 : 0.2} />
          </mesh>

          {/* Glow effect */}
          <mesh
            position={[Math.cos((i / count) * Math.PI * 2) * 2.5, 0, Math.sin((i / count) * Math.PI * 2) * 2.5]}
            scale={[0.5, 0.5, 0.5]}
          >
            <octahedronGeometry args={[1, 0]} />
            <primitive object={glowMaterials[i]} attach="material" />
          </mesh>

          {/* Connection line */}
          <line>
            <bufferGeometry
              attach="geometry"
              onUpdate={(self) => {
                const positions = new Float32Array([
                  0,
                  0,
                  0,
                  Math.cos((i / count) * Math.PI * 2) * 2.5,
                  0,
                  Math.sin((i / count) * Math.PI * 2) * 2.5,
                ])
                self.setAttribute("position", new BufferAttribute(positions, 3))
              }}
            />
            <lineBasicMaterial attach="material" color={colors[i]} opacity={isActive ? 0.7 : 0.3} transparent />
          </line>
        </group>
      ))}
    </group>
  )
}

// Data particles
function DataParticles({ count = 100, isActive }: { count?: number; isActive: boolean }) {
  const particles = useRef<Mesh[]>([])

  // Initialize particles
  useEffect(() => {
    particles.current = Array(count).fill(null)
  }, [count])

  // Animation
  useFrame((state) => {
    particles.current.forEach((particle, i) => {
      if (particle) {
        // Random movement
        particle.position.x += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.01
        particle.position.y += Math.cos(state.clock.elapsedTime * 0.5 + i) * 0.01
        particle.position.z += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.5) * 0.01

        // Keep particles within bounds
        if (particle.position.length() > 4) {
          particle.position.normalize().multiplyScalar(4 * Math.random())
        }

        // Scale pulse when active
        if (isActive) {
          const scale = 0.03 + Math.random() * 0.02
          particle.scale.set(scale, scale, scale)
        }
      }
    })
  })

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) particles.current[i] = el
          }}
          position={[(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8]}
          scale={[0.03, 0.03, 0.03]}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial
            color={isActive ? "#ffffff" : "#aaaaaa"}
            emissive={isActive ? "#ffffff" : "#aaaaaa"}
            emissiveIntensity={isActive ? 1 : 0.5}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

// Main scene component
function ModuleScene({ isActive }: { isActive: boolean }) {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.2} />

      {/* Directional light */}
      <directionalLight position={[10, 10, 5]} intensity={0.5} />

      {/* Background stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Core module */}
      <CoreModule isActive={isActive} />

      {/* Orbital nodes */}
      <OrbitalNodes count={4} isActive={isActive} />

      {/* Data particles */}
      <DataParticles count={200} isActive={isActive} />

      {/* Controls */}
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} minDistance={3} maxDistance={10} />
    </>
  )
}

// Main component
export function DreamstateModule() {
  const [isActive, setIsActive] = useState(false)
  const [activeZones, setActiveZones] = useState<string[]>([])

  // Toggle module activation
  const toggleModule = () => {
    setIsActive(!isActive)
  }

  // Toggle zone activation
  const toggleZone = (zone: string) => {
    setActiveZones((prev) => (prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]))
  }

  return (
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ModuleScene isActive={isActive} />
      </Canvas>

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm border border-pink-500/30 rounded-lg p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Button
            variant="outline"
            className={`border-pink-500/50 ${isActive ? "bg-pink-500/20 text-pink-300" : "text-pink-400"} hover:bg-pink-950/30`}
            onClick={toggleModule}
          >
            {isActive ? "Deactivate Module" : "Activate Module"}
          </Button>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`border-blue-500/50 ${activeZones.includes("trade") ? "bg-blue-500/20 text-blue-300" : "text-blue-400"} hover:bg-blue-950/30`}
              onClick={() => toggleZone("trade")}
            >
              Trade Zone
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={`border-purple-500/50 ${activeZones.includes("meditation") ? "bg-purple-500/20 text-purple-300" : "text-purple-400"} hover:bg-purple-950/30`}
              onClick={() => toggleZone("meditation")}
            >
              Meditation Zone
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={`border-green-500/50 ${activeZones.includes("learn") ? "bg-green-500/20 text-green-300" : "text-green-400"} hover:bg-green-950/30`}
              onClick={() => toggleZone("learn")}
            >
              Learn Zone
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={`border-orange-500/50 ${activeZones.includes("constellation") ? "bg-orange-500/20 text-orange-300" : "text-orange-400"} hover:bg-orange-950/30`}
              onClick={() => toggleZone("constellation")}
            >
              Constellation Zone
            </Button>
          </div>
        </div>
      </div>

      {/* Module info */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 left-4 right-4 bg-black/70 backdrop-blur-sm border border-pink-500/30 rounded-lg p-4"
        >
          <h3 className="text-lg font-medium text-pink-300 mb-2">Dreamstate Module Active</h3>
          <p className="text-sm text-gray-300">
            The Dreamstate Module is now processing cosmic data and enhancing your experience across all zones. Active
            zones: {activeZones.length > 0 ? activeZones.join(", ") : "None"}
          </p>

          {activeZones.length > 0 && (
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
              {activeZones.includes("trade") && (
                <div className="text-xs text-blue-300">Trade Zone: Market pattern recognition enhanced by 35%</div>
              )}

              {activeZones.includes("meditation") && (
                <div className="text-xs text-purple-300">Meditation Zone: Focus amplification increased by 42%</div>
              )}

              {activeZones.includes("learn") && (
                <div className="text-xs text-green-300">Learn Zone: Knowledge retention boosted by 28%</div>
              )}

              {activeZones.includes("constellation") && (
                <div className="text-xs text-orange-300">Constellation Zone: XP accumulation accelerated by 50%</div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
