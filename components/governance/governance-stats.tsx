export default function GovernanceStats() {
  return (
    <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-md">
      <div>
        <h4 className="text-md font-semibold text-gray-700">Active Proposals</h4>
        <p className="text-2xl font-bold text-blue-600">3</p>
      </div>
      <div>
        <h4 className="text-md font-semibold text-gray-700">Voters Participated</h4>
        <p className="text-2xl font-bold text-green-600">124</p>
      </div>
    </div>
  )
}
