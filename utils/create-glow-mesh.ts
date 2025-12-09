import * as THREE from "three"

interface GlowMeshOptions {
  color?: THREE.ColorRepresentation
  power?: number
  size?: number
  opacity?: number
  side?: THREE.Side
}

export function createGlowMesh(geometry: THREE.BufferGeometry, options: GlowMeshOptions = {}) {
  // Check if geometry is valid
  if (!geometry) {
    console.error("Invalid geometry provided to createGlowMesh")
    return new THREE.Mesh() // Return an empty mesh instead of crashing
  }

  const material = new THREE.ShaderMaterial({
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

  // Create a new mesh with the provided geometry
  return new THREE.Mesh(geometry, material)
}
