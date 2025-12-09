export default function ProfileActivity() {
  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-2">📅 Recent Activity</h3>
      <ul className="text-gray-700 space-y-1">
        <li>Traded ACE Tokens - 2 hours ago</li>
        <li>Completed Quest "Moonshot" - 1 day ago</li>
        <li>Joined DAO Proposal Vote - 3 days ago</li>
      </ul>
    </div>
  )
}
