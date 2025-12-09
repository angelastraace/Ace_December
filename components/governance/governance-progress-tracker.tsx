export default function GovernanceProgressTracker() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-2">Governance Progress</h2>
      <p className="text-gray-600 text-sm mb-3">Track your learning journey in ACE DAO governance.</p>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className="w-1/2 h-full bg-blue-600" />
      </div>
      <p className="text-right text-xs text-gray-500 mt-1">50% Complete</p>
    </div>
  )
}
