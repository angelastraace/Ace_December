"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import * as THREE from "three"
import { createGlowMesh } from "@/utils/create-glow-mesh"

interface UniverseViewProps {
  activeZone?: string
  onZoneClick?: (zoneId: string) => void
  userXP?: Record<string, number>
  className?: string
}

export default function UniverseView({
  activeZone = "universe",
  onZoneClick,
  userXP = { trade: 1200, learn: 900, earn: 600, launchpad: 300, arena: 450, life: 750 }, // Default mock data
  className = "",
}: UniverseViewProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const planetsRef = useRef<
    {
      name: string
      mesh: THREE.Mesh
      glowMesh: THREE.Mesh
      orbitRadius: number
      orbitSpeed: number
      angle: number
    }[]
  >([])
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null)

  // Handle mouse click on planets
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!mountRef.current || !cameraRef.current || !planetsRef.current.length) return

      const rect = mountRef.current.getBoundingClientRect()
      const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      )

      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, cameraRef.current)
      const intersects = raycaster.intersectObjects(planetsRef.current.map((p) => p.mesh))

      if (intersects.length > 0) {
        const clickedPlanet = planetsRef.current.find((p) => p.mesh === intersects[0].object)
        if (clickedPlanet && onZoneClick) {
          onZoneClick(clickedPlanet.name)
        }
      }
    },
    [onZoneClick],
  )

  // Handle mouse move for hover effects
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!mountRef.current || !cameraRef.current || !planetsRef.current.length) return

    const rect = mountRef.current.getBoundingClientRect()
    const mouse = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    )

    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, cameraRef.current)
    const intersects = raycaster.intersectObjects(planetsRef.current.map((p) => p.mesh))

    if (intersects.length > 0) {
      const hoveredPlanetObj = planetsRef.current.find((p) => p.mesh === intersects[0].object)
      setHoveredPlanet(hoveredPlanetObj?.name || null)
      document.body.style.cursor = "pointer"
    } else {
      setHoveredPlanet(null)
      document.body.style.cursor = "default"
    }
  }, [])

  // Setup and cleanup Three.js scene
  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 15
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 10, 7)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    scene.add(directionalLight)

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5) // soft light
    scene.add(ambientLight)

    // Sun - central glowing sphere
    const sunGeometry = new THREE.SphereGeometry(2, 32, 32)
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffcc00,
      emissive: 0xffcc00,
      emissiveIntensity: 0.5,
    })
    const sun = new THREE.Mesh(sunGeometry, sunMaterial)
    sun.name = "sun"
    sun.receiveShadow = true
    scene.add(sun)

    // Add a glow to the sun using our utility
    const sunGlowGeometry = new THREE.SphereGeometry(2.5, 32, 32)
    const sunGlow = createGlowMesh(sunGlowGeometry, {
      color: 0xffcc00,
      power: 2.0,
      size: 0.7,
      opacity: 0.7,
      side: THREE.BackSide,
    })
    scene.add(sunGlow)

    // Create orbit paths
    const createOrbitPath = (radius: number) => {
      const orbitGeometry = new THREE.RingGeometry(radius - 0.02, radius + 0.02, 64)
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0x444444,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3,
      })
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial)
      orbit.rotation.x = Math.PI / 2
      scene.add(orbit)
      return orbit
    }

    // Planets with glow halos
    const planetConfigs = [
      { name: "trade", color: 0x00aaff, orbitRadius: 6, orbitSpeed: 0.001, size: 1.2 },
      { name: "learn", color: 0xaa00ff, orbitRadius: 9, orbitSpeed: 0.0007, size: 1.1 },
      { name: "arena", color: 0xff5500, orbitRadius: 12, orbitSpeed: 0.0005, size: 1.3 },
      { name: "life", color: 0x00ff88, orbitRadius: 15, orbitSpeed: 0.0003, size: 1.0 },
      { name: "launchpad", color: 0xff0066, orbitRadius: 18, orbitSpeed: 0.0002, size: 1.4 },
      { name: "meditation", color: 0xffcc00, orbitRadius: 21, orbitSpeed: 0.00015, size: 0.9 },
    ]

    // Create orbit paths
    planetConfigs.forEach((config) => {
      createOrbitPath(config.orbitRadius)
    })

    // Create planets
    const planets = planetConfigs.map((config) => {
      // Random starting angle
      const angle = Math.random() * Math.PI * 2

      // Calculate position based on orbit radius and angle
      const x = Math.cos(angle) * config.orbitRadius
      const z = Math.sin(angle) * config.orbitRadius

      // Planet mesh
      const geometry = new THREE.SphereGeometry(config.size, 32, 32)
      const material = new THREE.MeshStandardMaterial({
        color: config.color,
        roughness: 0.7,
        metalness: 0.2,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(x, 0, z)
      mesh.name = config.name
      mesh.castShadow = true
      mesh.receiveShadow = true
      scene.add(mesh)

      // Glow halo mesh using our utility
      const glowGeometry = new THREE.SphereGeometry(config.size * 1.3, 32, 32)
      const glowMesh = createGlowMesh(glowGeometry, {
        color: config.color,
        power: 2.0,
        size: 0.7,
        opacity: 0.7,
      })
      glowMesh.position.copy(mesh.position)
      scene.add(glowMesh)

      return {
        name: config.name,
        mesh,
        glowMesh,
        orbitRadius: config.orbitRadius,
        orbitSpeed: config.orbitSpeed,
        angle,
      }
    })

    planetsRef.current = planets

    // Add event listeners
    window.addEventListener("click", handleClick)
    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      // Update planet positions based on orbit
      planets.forEach((planet) => {
        planet.angle += planet.orbitSpeed
        const x = Math.cos(planet.angle) * planet.orbitRadius
        const z = Math.sin(planet.angle) * planet.orbitRadius

        planet.mesh.position.x = x
        planet.mesh.position.z = z
        planet.glowMesh.position.x = x
        planet.glowMesh.position.z = z

        // Rotate planets
        planet.mesh.rotation.y += 0.005

        // Update glow intensity based on hover state
        if (planet.name === hoveredPlanet) {
          ;(planet.glowMesh.material as THREE.ShaderMaterial).uniforms.glowPower.value = 2.5
          ;(planet.glowMesh.material as THREE.ShaderMaterial).uniforms.glowOpacity.value = 1.0
        } else {
          ;(planet.glowMesh.material as THREE.ShaderMaterial).uniforms.glowPower.value = 2.0
          ;(planet.glowMesh.material as THREE.ShaderMaterial).uniforms.glowOpacity.value = 0.7
        }
      })

      // Rotate sun
      sun.rotation.y += 0.002
      sunGlow.rotation.y -= 0.001

      // Focus camera on active zone if set
      if (activeZone !== "universe") {
        const activePlanet = planets.find((p) => p.name === activeZone)
        if (activePlanet) {
          // Smoothly move camera to focus on the active planet
          const targetPosition = new THREE.Vector3()
          targetPosition.copy(activePlanet.mesh.position)
          targetPosition.z += 8 // Position camera at a distance from the planet
          targetPosition.y += 3 // Look slightly down at the planet

          camera.position.lerp(targetPosition, 0.02)
          camera.lookAt(activePlanet.mesh.position)
        }
      } else {
        // Reset camera to default position when viewing the universe
        camera.position.lerp(new THREE.Vector3(0, 0, 15), 0.02)
        camera.lookAt(new THREE.Vector3(0, 0, 0))
      }

      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return

      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup on unmount
    return () => {
      window.removeEventListener("click", handleClick)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      // Properly dispose of all meshes and materials
      planetsRef.current.forEach((planet) => {
        if (planet.mesh.geometry) planet.mesh.geometry.dispose()
        if (planet.mesh.material) {
          if (Array.isArray(planet.mesh.material)) {
            planet.mesh.material.forEach((material) => material.dispose())
          } else {
            planet.mesh.material.dispose()
          }
        }

        if (planet.glowMesh.geometry) planet.glowMesh.geometry.dispose()
        if (planet.glowMesh.material) {
          if (Array.isArray(planet.glowMesh.material)) {
            planet.glowMesh.material.forEach((material) => material.dispose())
          } else {
            planet.glowMesh.material.dispose()
          }
        }
      })

      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }
    }
  }, [handleClick, handleMouseMove, hoveredPlanet])

  // Update planets based on XP data
  useEffect(() => {
    if (!planetsRef.current.length) return

    planetsRef.current.forEach((planet) => {
      const xp = userXP[planet.name] || 0
      const scale = 1 + Math.min(xp / 2000, 1)

      // Only update non-active planets here (active ones are handled in the animation loop)
      if (planet.name !== activeZone) {
        planet.mesh.scale.set(scale, scale, scale)
        planet.glowMesh.scale.set(scale * 1.3, scale * 1.3, scale * 1.3)
      } else {
        // Make active planet slightly larger
        const activeScale = scale * 1.3
        planet.mesh.scale.set(activeScale, activeScale, activeScale)
        planet.glowMesh.scale.set(activeScale * 1.3, activeScale * 1.3, activeScale * 1.3)
      }
    })
  }, [userXP, activeZone])

  return <div ref={mountRef} className={`w-full h-full rounded-xl ${className}`} />
}
