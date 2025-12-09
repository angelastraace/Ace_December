"use client"

import React from "react"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"

interface ZonePlanet {
  id: string
  name: string
  color: THREE.ColorRepresentation
  position: [number, number, number]
  size: number
  description: string
  xpValue: number
}

interface ZonePlanetsProps {
  zones: ZonePlanet[]
  activeZone?: string
  onZoneSelect?: (zoneId: string) => void
}

// Inline implementation of createGlowMaterial to avoid dependency issues
function createGlowMaterial(
  options: {
    color?: THREE.ColorRepresentation
    power?: number
    size?: number
    opacity?: number
    side?: THREE.Side
  } = {},
) {
  return new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(options.color || 0x88ccff) },
      glowPower: { value: options.power || 2.0 },
      glowSize: { value: options.size || 0.7 },
      glowOpacity: { value: options.opacity || 1.0 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform float glowPower;
      uniform float glowSize;
      uniform float glowOpacity;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        float intensity = pow(glowSize - dot(vNormal, normalize(vPosition)), glowPower);
        gl_FragColor = vec4(glowColor, intensity * glowOpacity);
      }
    `,
    side: options.side || THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  })
}

export function ZonePlanets({ zones, activeZone, onZoneSelect }: ZonePlanetsProps) {
  const groupRef = useRef<THREE.Group>(null)
  const planetsRef = useRef<
    {
      id: string
      mesh: THREE.Mesh
      glowMesh: THREE.Mesh
      textRef: React.RefObject<any>
      originalPosition: THREE.Vector3
      targetPosition: THREE.Vector3
    }[]
  >([])
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null)

  // Create planets
  useEffect(() => {
    if (!groupRef.current) return

    // Clean up previous planets
    planetsRef.current.forEach((planet) => {
      if (planet.mesh) planet.mesh.removeFromParent()
      if (planet.glowMesh) planet.glowMesh.removeFromParent()
    })
    planetsRef.current = []

    const group = groupRef.current

    // Create planets
    zones.forEach((zone) => {
      try {
        // Create planet geometry and material
        const geometry = new THREE.SphereGeometry(zone.size, 32, 32)
        const material = new THREE.MeshStandardMaterial({
          color: zone.color,
          roughness: 0.4,
          metalness: 0.6,
        })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(...zone.position)
        mesh.userData = { id: zone.id }
        group.add(mesh)

        // Create glow effect
        const glowGeometry = new THREE.SphereGeometry(zone.size * 1.3, 32, 32)
        const glowMaterial = createGlowMaterial({
          color: zone.color,
          power: 1.5,
          size: 0.8,
          opacity: 0.7,
        })
        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial)
        glowMesh.position.copy(mesh.position)
        group.add(glowMesh)

        // Store references
        const textRef = React.createRef<any>()
        planetsRef.current.push({
          id: zone.id,
          mesh,
          glowMesh,
          textRef,
          originalPosition: mesh.position.clone(),
          targetPosition: mesh.position.clone(),
        })
      } catch (error) {
        console.error(`Error creating planet ${zone.id}:`, error)
      }
    })

    // Cleanup function
    return () => {
      planetsRef.current.forEach((planet) => {
        if (planet.mesh) {
          if (planet.mesh.geometry) planet.mesh.geometry.dispose()
          if (planet.mesh.material) {
            if (Array.isArray(planet.mesh.material)) {
              planet.mesh.material.forEach((material) => material.dispose())
            } else {
              planet.mesh.material.dispose()
            }
          }
        }

        if (planet.glowMesh) {
          if (planet.glowMesh.geometry) planet.glowMesh.geometry.dispose()
          if (planet.glowMesh.material) {
            if (Array.isArray(planet.glowMesh.material)) {
              planet.glowMesh.material.forEach((material) => material.dispose())
            } else {
              planet.glowMesh.material.dispose()
            }
          }
        }
      })
    }
  }, [zones])

  // Handle active zone changes
  useEffect(() => {
    if (!activeZone) return

    planetsRef.current.forEach((planet) => {
      if (planet.id === activeZone) {
        // Move active planet to center
        planet.targetPosition = new THREE.Vector3(0, 0, 0)
      } else {
        // Move other planets back to original positions
        planet.targetPosition = planet.originalPosition.clone()
      }
    })
  }, [activeZone])

  // Animation loop
  useFrame((state, delta) => {
    // Rotate planets
    planetsRef.current.forEach((planet, index) => {
      if (!planet.mesh || !planet.glowMesh) return

      planet.mesh.rotation.y += 0.01 * (index + 1) * delta

      // Smoothly move planets to target positions
      planet.mesh.position.lerp(planet.targetPosition, 0.05)
      planet.glowMesh.position.copy(planet.mesh.position)

      // Update glow intensity based on hover/active state
      const isHovered = planet.id === hoveredPlanet
      const isActive = planet.id === activeZone
      const material = planet.glowMesh.material as THREE.ShaderMaterial

      if (material && material.uniforms) {
        if (isActive) {
          material.uniforms.glowPower.value = 2.0
          material.uniforms.glowSize.value = 1.0
          material.uniforms.glowOpacity.value = 1.0
        } else if (isHovered) {
          material.uniforms.glowPower.value = 1.8
          material.uniforms.glowSize.value = 0.9
          material.uniforms.glowOpacity.value = 0.9
        } else {
          material.uniforms.glowPower.value = 1.5
          material.uniforms.glowSize.value = 0.8
          material.uniforms.glowOpacity.value = 0.7
        }
      }

      // Update text position and scale
      if (planet.textRef.current) {
        const textPosition = planet.mesh.position.clone()
        textPosition.y += planet.mesh.geometry.parameters.radius * 1.5
        planet.textRef.current.position.copy(textPosition)

        // Scale text based on camera distance
        const distance = state.camera.position.distanceTo(planet.mesh.position)
        const scale = Math.max(1, distance * 0.05)
        planet.textRef.current.scale.setScalar(scale)
      }
    })
  })

  // Handle interaction
  const handlePointerOver = (event: THREE.Event) => {
    const planetId = event.object.userData?.id
    if (planetId) {
      setHoveredPlanet(planetId)
      document.body.style.cursor = "pointer"
    }
  }

  const handlePointerOut = () => {
    setHoveredPlanet(null)
    document.body.style.cursor = "auto"
  }

  const handleClick = (event: THREE.Event) => {
    const planetId = event.object.userData?.id
    if (planetId && onZoneSelect) {
      onZoneSelect(planetId)
    }
  }

  return (
    <group ref={groupRef} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
      {zones.map((zone) => (
        <Text
          key={zone.id}
          ref={planetsRef.current.find((p) => p.id === zone.id)?.textRef}
          position={[zone.position[0], zone.position[1] + zone.size * 1.5, zone.position[2]]}
          color="white"
          fontSize={1.5}
          anchorX="center"
          anchorY="bottom"
        >
          {zone.name}
        </Text>
      ))}
    </group>
  )
}
