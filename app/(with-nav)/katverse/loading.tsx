export default function KatVerseLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold text-white">Loading KatVerse...</h2>
        <div className="h-2 w-64 overflow-hidden rounded-full bg-gray-700">
          <div className="h-full animate-pulse bg-purple-500"></div>
        </div>
        <p className="mt-4 text-gray-400">Preparing your multiplayer experience</p>
      </div>
    </div>
  )
}
