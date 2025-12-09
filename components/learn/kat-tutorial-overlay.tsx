export default function KatTutorialOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h3 className="text-xl font-bold mb-4">Meet Your Kat</h3>
        <p className="text-sm text-gray-600 mb-4">
          Learn how your Kat companion helps you earn XP, explore ACE, and master quests.
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Got It!</button>
      </div>
    </div>
  )
}
