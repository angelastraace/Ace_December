import { Canvas } from "@react-three/fiber"
import XPConstellation from "@/components/XPConstellation"

export default function Dashboard() {
  return (
    <Canvas camera={{ position: [0, 0, 100], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <XPConstellation userData={exampleUserData} scale={1} interactive={true} />
    </Canvas>
  )
}
import XPConstellation from "@/components/XPConstellation"
import type { UserXPData } from "@/services/user-data"

// Example user data — replace with real data fetched from your API or context
const exampleUserData: UserXPData = {
  totalXP: 350,
  level: 5,
  distribution: {
    trading: 40,
    learning: 30,
    social: 10,
    quests: 15,
    governance: 5,
  },
}

export default function Dashboard() {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <XPConstellation userData={exampleUserData} scale={1} interactive={true} />
    </div>
  );
}
