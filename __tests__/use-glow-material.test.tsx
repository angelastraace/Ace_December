import { renderHook } from "@testing-library/react-hooks"
import { useGlowMaterial } from "@/hooks/use-glow-material"
import * as THREE from "three"

describe("useGlowMaterial", () => {
  it("should return a ShaderMaterial", () => {
    const { result } = renderHook(() => useGlowMaterial())
    expect(result.current).toBeInstanceOf(THREE.ShaderMaterial)
  })

  it("should apply the correct color", () => {
    const testColor = 0xff0000
    const { result } = renderHook(() => useGlowMaterial({ color: testColor }))
    expect(result.current.uniforms.glowColor.value).toEqual(new THREE.Color(testColor))
  })

  it("should apply the correct power", () => {
    const testPower = 3.5
    const { result } = renderHook(() => useGlowMaterial({ power: testPower }))
    expect(result.current.uniforms.glowPower.value).toEqual(testPower)
  })

  it("should apply the correct size", () => {
    const testSize = 1.2
    const { result } = renderHook(() => useGlowMaterial({ size: testSize }))
    expect(result.current.uniforms.glowSize.value).toEqual(testSize)
  })

  it("should apply the correct opacity", () => {
    const testOpacity = 0.7
    const { result } = renderHook(() => useGlowMaterial({ opacity: testOpacity }))
    expect(result.current.uniforms.glowOpacity.value).toEqual(testOpacity)
  })

  it("should apply the correct side", () => {
    const testSide = THREE.BackSide
    const { result } = renderHook(() => useGlowMaterial({ side: testSide }))
    expect(result.current.side).toEqual(testSide)
  })

  it("should use default values when not provided", () => {
    const { result } = renderHook(() => useGlowMaterial())
    expect(result.current.uniforms.glowColor.value).toEqual(new THREE.Color(0x88ccff))
    expect(result.current.uniforms.glowPower.value).toEqual(2.0)
    expect(result.current.uniforms.glowSize.value).toEqual(0.7)
    expect(result.current.uniforms.glowOpacity.value).toEqual(1.0)
    expect(result.current.side).toEqual(THREE.FrontSide)
  })
})
