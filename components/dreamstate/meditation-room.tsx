"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stars, OrbitControls } from "@react-three/drei"
import { type Mesh, type Group, AudioListener, Audio, AudioLoader } from "three"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useGlowMaterial } from "@/hooks/use-glow-material"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

// Meditation orb component
function MeditationOrb({ isActive }: { isActive: boolean }) {
  const meshRef = useRef<Mesh>(null)
  const groupRef = useRef<Group>(null)
  const glowMaterial = useGlowMaterial("#9c27b0", isActive ? 2.5 : 1.5)

  // Animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005

      // Pulse effect when active
      if (isActive) {
        meshRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
        meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
        meshRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      }
    }

    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#9c27b0" emissive="#9c27b0" emissiveIntensity={isActive ? 0.5 : 0.2} />
      </mesh>

      {/* Glow effect */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>
    </group>
  )
}

// Energy particles
function EnergyParticles({ count = 50, isActive }: { count?: number; isActive: boolean }) {
  const particles = useRef<Mesh[]>([])
  const group = useRef<Group>(null)

  // Initialize particles
  useEffect(() => {
    particles.current = Array(count).fill(null)
  }, [count])

  // Animation
  useFrame((state) => {
    particles.current.forEach((particle, i) => {
      if (particle) {
        // Circular movement
        const angle = (i / count) * Math.PI * 2 + state.clock.elapsedTime * 0.1
        const radius = 2 + Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.5

        particle.position.x = Math.cos(angle) * radius
        particle.position.z = Math.sin(angle) * radius
        particle.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.5

        // Scale pulse when active
        if (isActive) {
          const scale = 0.05 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.02
          particle.scale.set(scale, scale, scale)
        }
      }
    })

    // Rotate the entire group
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) particles.current[i] = el
          }}
          position={[(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4]}
          scale={[0.05, 0.05, 0.05]}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial
            color={isActive ? "#e91e63" : "#9c27b0"}
            emissive={isActive ? "#e91e63" : "#9c27b0"}
            emissiveIntensity={isActive ? 1 : 0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

// Audio controller
function AudioController({ isPlaying, volume }: { isPlaying: boolean; volume: number }) {
  const { camera } = useThree()
  const sound = useRef<Audio>()

  useEffect(() => {
    // Create audio listener
    const listener = new AudioListener()
    camera.add(listener)

    // Create audio object
    const audio = new Audio(listener)
    sound.current = audio

    // Load audio file
    const audioLoader = new AudioLoader()
    audioLoader.load("/ambient-cosmic-music.mp3", (buffer) => {
      audio.setBuffer(buffer)
      audio.setLoop(true)
      audio.setVolume(volume)

      if (isPlaying) {
        audio.play()
      }
    })

    return () => {
      if (sound.current) {
        sound.current.stop()
      }
      camera.remove(listener)
    }
  }, [camera])

  // Update volume
  useEffect(() => {
    if (sound.current) {
      sound.current.setVolume(volume)
    }
  }, [volume])

  // Play/pause
  useEffect(() => {
    if (sound.current) {
      if (isPlaying) {
        sound.current.play()
      } else {
        sound.current.pause()
      }
    }
  }, [isPlaying])

  return null
}

// Main scene component
function MeditationScene({
  isActive,
  isPlaying,
  volume,
}: {
  isActive: boolean
  isPlaying: boolean
  volume: number
}) {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.2} />

      {/* Directional light */}
      <directionalLight position={[10, 10, 5]} intensity={0.5} />

      {/* Background stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Meditation orb */}
      <MeditationOrb isActive={isActive} />

      {/* Energy particles */}
      <EnergyParticles count={100} isActive={isActive} />

      {/* Audio */}
      <AudioController isPlaying={isPlaying} volume={volume} />

      {/* Controls */}
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} minDistance={3} maxDistance={10} />
    </>
  )
}

// Main component
export function MeditationRoom() {
  const [isActive, setIsActive] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [sessionTime, setSessionTime] = useState(0)
  const [xpGained, setXpGained] = useState(0)
  const sessionInterval = useRef<NodeJS.Timeout | null>(null)

  // Start/stop meditation session
  const toggleSession = () => {
    if (isActive) {
      // Stop session
      setIsActive(false)
      if (sessionInterval.current) {
        clearInterval(sessionInterval.current)
        sessionInterval.current = null
      }
    } else {
      // Start session
      setIsActive(true)
      setIsPlaying(true)

      // Track session time and XP
      sessionInterval.current = setInterval(() => {
        setSessionTime((prev) => prev + 1)
        if (Math.random() > 0.7) {
          // 30% chance to gain XP each second
          setXpGained((prev) => prev + Math.floor(Math.random() * 3) + 1)
        }
      }, 1000)
    }
  }

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Toggle audio
  const toggleAudio = () => {
    setIsPlaying(!isPlaying)
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (sessionInterval.current) {
        clearInterval(sessionInterval.current)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <MeditationScene isActive={isActive} isPlaying={isPlaying} volume={volume} />
      </Canvas>

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`border-purple-500/50 ${isActive ? "bg-purple-500/20 text-purple-300" : "text-purple-400"} hover:bg-purple-950/30`}
              onClick={toggleSession}
            >
              {isActive ? "End Session" : "Begin Session"}
            </Button>

            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white" onClick={toggleAudio}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>

          <div className="flex items-center gap-2 w-full md:w-1/3">
            {isPlaying ? <Volume2 className="h-4 w-4 text-gray-400" /> : <VolumeX className="h-4 w-4 text-gray-400" />}
            <Slider
              value={[volume * 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0] / 100)}
              className="w-full"
            />
          </div>

          {isActive && (
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-xs text-gray-400">Session Time</p>
                <p className="text-sm font-medium text-white">{formatTime(sessionTime)}</p>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-400">XP Gained</p>
                <p className="text-sm font-medium text-purple-300">+{xpGained}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Session info */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 left-4 right-4 bg-black/70 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4"
        >
          <h3 className="text-lg font-medium text-purple-300 mb-2">Cosmic Awareness Meditation</h3>
          <p className="text-sm text-gray-300">
            Focus on your breath and observe the cosmic energies flowing through the meditation orb. As you deepen your
            awareness, you'll gain insights and XP that enhance your trading intuition.
          </p>
        </motion.div>
      )}
    </div>
  )
}
