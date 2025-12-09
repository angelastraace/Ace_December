export default function GovernanceProgressTracker() {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Governance Progress</h2>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-blue-600 h-2 rounded-full w-1/2"></div>
      </div>
      <p className="text-xs text-gray-500 mt-1">50% Complete</p>
    </div>
  )
}
