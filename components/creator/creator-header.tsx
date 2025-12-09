export default function CreatorHeader() {
  return (
    <header className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8 px-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, Creator</h1>
          <p className="text-sm text-white/80">Manage your profile, settings, and NFTs.</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100">
          Edit Profile
        </button>
      </div>
    </header>
  )
}
