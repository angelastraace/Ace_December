"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import GlowDemo from "@/components/three-d/glow-mesh"

export default function GlowExample() {
  const [power, setPower] = useState(2.0)
  const [size, setSize] = useState(0.7)
  const [opacity, setOpacity] = useState(1.0)

  return (
    <div className="p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20">
      <h2 className="text-2xl font-bold mb-4 text-purple-400">Glow Material Demo</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <GlowDemo className="h-64 w-full bg-black/20 rounded-lg" />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="power-slider">Glow Power: {power.toFixed(1)}</Label>
            </div>
            <Slider
              id="power-slider"
              min={0.5}
              max={5}
              step={0.1}
              value={[power]}
              onValueChange={(value) => setPower(value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="size-slider">Glow Size: {size.toFixed(1)}</Label>
            </div>
            <Slider
              id="size-slider"
              min={0.1}
              max={2}
              step={0.1}
              value={[size]}
              onValueChange={(value) => setSize(value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="opacity-slider">Glow Opacity: {opacity.toFixed(1)}</Label>
            </div>
            <Slider
              id="opacity-slider"
              min={0.1}
              max={1}
              step={0.1}
              value={[opacity]}
              onValueChange={(value) => setOpacity(value[0])}
            />
          </div>

          <div className="text-sm text-gray-400">
            <p>The glow material uses a custom shader to create a realistic glow effect around 3D objects.</p>
            <p className="mt-2">Adjust the sliders to see how different parameters affect the glow appearance.</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="usage">
          <TabsList>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="code">Code Example</TabsTrigger>
          </TabsList>
          <TabsContent value="usage" className="p-4 bg-black/20 rounded-md mt-2">
            <p className="text-sm text-gray-300">To use the glow material in your Three.js components:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1 text-sm text-gray-300">
              <li>
                Import the hook:{" "}
                <code className="bg-black/30 px-1 rounded">
                  import {"{"} useGlowMaterial {"}"} from '@/hooks/use-glow-material'
                </code>
              </li>
              <li>
                Create the material:{" "}
                <code className="bg-black/30 px-1 rounded">
                  const glowMaterial = useGlowMaterial({"{"} color, power, size {"}"});
                </code>
              </li>
              <li>Apply to a mesh that wraps your object</li>
            </ol>
          </TabsContent>
          <TabsContent value="code" className="p-4 bg-black/20 rounded-md mt-2">
            <pre className="text-xs text-gray-300 overflow-auto">
              {`// Example usage
import { useGlowMaterial } from '@/hooks/use-glow-material';

function GlowingSphere() {
  const glowMaterial = useGlowMaterial({
    color: 0x88ccff,
    power: ${power},
    size: ${size},
    opacity: ${opacity}
  });
  
  return (
    <group>
      {/* Base sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={0x88ccff} />
      </mesh>
      
      {/* Glow layer */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <primitive object={glowMaterial} />
      </mesh>
    </group>
  );
}`}
            </pre>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
