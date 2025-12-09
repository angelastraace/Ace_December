"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useGlowMaterial } from "@/hooks/use-glow-material"
import * as THREE from "three"

interface GlowMeshProps {
  color?: THREE.ColorRepresentation
  power?: number
  size?: number
  opacity?: number
  geometry?: "sphere" | "box" | "torus" | "tetrahedron"
  scale?: number
  position?: [number, number, number]
  rotation?: boolean
}

function GlowObject({
  color = 0x88ccff,
  power = 2.0,
  size = 0.7,
  opacity = 1.0,
  geometry = "sphere",
  scale = 1,
  position = [0, 0, 0],
  rotation = true,
}: GlowMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowMaterial = useGlowMaterial({ color, power, size, opacity })

  // Create geometry based on type
  let objectGeometry: THREE.BufferGeometry

  switch (geometry) {
    case "box":
      objectGeometry = new THREE.BoxGeometry(1, 1, 1)
      break
    case "torus":
      objectGeometry = new THREE.TorusGeometry(0.7, 0.3, 16, 32)
      break
    case "tetrahedron":
      objectGeometry = new THREE.TetrahedronGeometry(1, 0)
      break
    case "sphere":
    default:
      objectGeometry = new THREE.SphereGeometry(1, 32, 32)
      break
  }

  // Base material for the object
  const baseMaterial = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.2,
    metalness: 0.8,
  })

  // Animation
  useFrame((_, delta) => {
    if (rotation && meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <group position={new THREE.Vector3(...position)}>
      {/* Base object */}
      <mesh ref={meshRef} geometry={objectGeometry} material={baseMaterial} scale={scale} />

      {/* Glow layer */}
      <mesh geometry={objectGeometry} material={glowMaterial} scale={scale * 1.2} />
    </group>
  )
}

interface GlowDemoProps {
  className?: string
}

export default function GlowDemo({ className = "" }: GlowDemoProps) {
  return (
    <div className={`w-full h-64 ${className}`}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <GlowObject color={0x3498db} position={[-2, 0, 0]} geometry="sphere" />

        <GlowObject color={0xe74c3c} position={[0, 0, 0]} geometry="box" power={1.8} />

        <GlowObject color={0x2ecc71} position={[2, 0, 0]} geometry="torus" power={2.2} size={0.8} />

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}
