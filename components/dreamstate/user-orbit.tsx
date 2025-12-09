"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import type { UserXPData } from "@/services/user-data"

interface UserOrbitProps {
  userData: UserXPData | null
  active?: boolean
  color?: THREE.ColorRepresentation
  trailColor?: THREE.ColorRepresentation
  orbitWidth?: number
  trailWidth?: number
  showTrail?: boolean
}

export function UserOrbit({
  userData,
  active = true,
  color = 0x3399ff,
  trailColor = 0x55ccff,
  orbitWidth = 0.2,
  trailWidth = 2,
  showTrail = true,
}: UserOrbitProps) {
  const groupRef = useRef<THREE.Group>(null)
  const orbitRef = useRef<THREE.Mesh | null>(null)
  const trailRef = useRef<THREE.Line | null>(null)
  const trailPointsRef = useRef<THREE.Vector3[]>([])
  const progressRef = useRef<number>(0)

  // Calculate orbit properties based on user data
  useEffect(() => {
    if (!userData || !groupRef.current) return

    // Clean up previous objects
    if (orbitRef.current) {
      orbitRef.current.removeFromParent()
      if (orbitRef.current.geometry) orbitRef.current.geometry.dispose()
      if (orbitRef.current.material) {
        if (Array.isArray(orbitRef.current.material)) {
          orbitRef.current.material.forEach((m) => m.dispose())
        } else {
          orbitRef.current.material.dispose()
        }
      }
      orbitRef.current = null
    }

    if (trailRef.current) {
      trailRef.current.removeFromParent()
      if (trailRef.current.geometry) trailRef.current.geometry.dispose()
      if (trailRef.current.material) {
        if (Array.isArray(trailRef.current.material)) {
          trailRef.current.material.forEach((m) => m.dispose())
        } else {
          trailRef.current.material.dispose()
        }
      }
      trailRef.current = null
    }

    try {
      const group = groupRef.current

      // Calculate orbit radius based on XP and level
      const baseRadius = 30
      const xpBonus = userData.totalXP * 0.01
      const levelBonus = userData.level * 2
      const orbitRadius = baseRadius + xpBonus + levelBonus

      // Create orbit ring
      const orbitGeometry = new THREE.RingGeometry(orbitRadius - orbitWidth, orbitRadius + orbitWidth, 64)
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3,
      })
      const orbitRing = new THREE.Mesh(orbitGeometry, orbitMaterial)
      orbitRing.rotation.x = Math.PI / 2
      group.add(orbitRing)
      orbitRef.current = orbitRing

      // Only create trail if showTrail is true
      if (showTrail) {
        // Generate trail points based on user journey
        // This creates a more complex path that represents the user's progress
        const trailPoints: THREE.Vector3[] = []
        const segments = 200
        const revolutions = 2 + userData.level * 0.2 // More revolutions for higher levels

        for (let i = 0; i <= segments; i++) {
          const progress = i / segments
          const angle = progress * Math.PI * 2 * revolutions

          // Base spiral
          const radius = orbitRadius * (0.8 + progress * 0.2) // Gradually increasing radius
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius

          // Add vertical movement based on XP distribution
          let y = 0
          Object.entries(userData.distribution).forEach(([category, percentage], index) => {
            const phaseShift = (index / Object.keys(userData.distribution).length) * Math.PI * 2
            y += Math.sin(angle * (index + 1) * 0.2 + phaseShift) * (percentage / 10)
          })

          // Add achievements as "bumps" in the trail
          userData.achievements.forEach((_, index) => {
            const achievementPosition = (index + 1) / (userData.achievements.length + 1)
            const bump = Math.exp(-Math.pow((progress - achievementPosition) * 10, 2)) * 5
            y += bump
          })

          trailPoints.push(new THREE.Vector3(x, y, z))
        }

        trailPointsRef.current = trailPoints

        // Create the trail line
        const trailGeometry = new THREE.BufferGeometry().setFromPoints(trailPoints)
        const trailMaterial = new THREE.LineBasicMaterial({
          color: trailColor,
          linewidth: trailWidth,
        })
        const trail = new THREE.Line(trailGeometry, trailMaterial)
        group.add(trail)
        trailRef.current = trail

        // Reset progress
        progressRef.current = 0
      }
    } catch (error) {
      console.error("Error creating orbit:", error)
    }

    // Cleanup function
    return () => {
      if (orbitRef.current) {
        if (orbitRef.current.geometry) orbitRef.current.geometry.dispose()
        if (orbitRef.current.material) {
          if (Array.isArray(orbitRef.current.material)) {
            orbitRef.current.material.forEach((m) => m.dispose())
          } else {
            orbitRef.current.material.dispose()
          }
        }
      }

      if (trailRef.current) {
        if (trailRef.current.geometry) trailRef.current.geometry.dispose()
        if (trailRef.current.material) {
          if (Array.isArray(trailRef.current.material)) {
            trailRef.current.material.forEach((m) => m.dispose())
          } else {
            trailRef.current.material.dispose()
          }
        }
      }
    }
  }, [userData, color, trailColor, orbitWidth, trailWidth, showTrail])

  // Animate the trail
  useFrame((_, delta) => {
    if (!active || !showTrail || !trailRef.current || trailPointsRef.current.length === 0) return

    try {
      // Gradually reveal the trail
      progressRef.current += delta * 0.2 // Adjust speed as needed
      progressRef.current = Math.min(progressRef.current, 1)

      // Update trail geometry to show only up to the current progress
      const visiblePoints = trailPointsRef.current.slice(
        0,
        Math.floor(trailPointsRef.current.length * progressRef.current),
      )

      if (visiblePoints.length > 0) {
        const trailGeometry = new THREE.BufferGeometry().setFromPoints(visiblePoints)
        if (trailRef.current.geometry) trailRef.current.geometry.dispose()
        trailRef.current.geometry = trailGeometry
      }

      // Rotate the entire orbit slightly
      if (groupRef.current) {
        groupRef.current.rotation.y += delta * 0.05
      }
    } catch (error) {
      console.error("Error animating trail:", error)
    }
  })

  return <group ref={groupRef} />
}
