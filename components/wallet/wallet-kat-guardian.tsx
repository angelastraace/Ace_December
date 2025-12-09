import type React from "react"

interface WalletKatGuardianProps {
  guardianName?: string
  guardianStatus?: "active" | "inactive"
}

const WalletKatGuardian: React.FC<WalletKatGuardianProps> = ({
  guardianName = "Kat Guardian",
  guardianStatus = "active",
}) => {
  return (
    <div className="wallet-kat-guardian p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">{guardianName}</h2>
      <p>
        Status:{" "}
        <span className={`font-bold ${guardianStatus === "active" ? "text-green-600" : "text-red-600"}`}>
          {guardianStatus.toUpperCase()}
        </span>
      </p>
      <p className="mt-2 text-sm text-gray-600">
        The Kat Guardian protects your wallet by monitoring suspicious activities.
      </p>
    </div>
  )
}

export default WalletKatGuardian
