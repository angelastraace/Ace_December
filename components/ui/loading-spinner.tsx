export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-purple-500 border-r-blue-500 border-b-pink-500 border-l-indigo-500 animate-spin"></div>
        <div className="absolute top-2 left-2 w-12 h-12 rounded-full border-4 border-t-blue-400 border-r-pink-400 border-b-indigo-400 border-l-purple-400 animate-spin-slow"></div>
        <div className="absolute top-4 left-4 w-8 h-8 rounded-full border-4 border-t-pink-300 border-r-indigo-300 border-b-purple-300 border-l-blue-300 animate-spin-slower"></div>
        <div className="absolute top-6 left-6 w-4 h-4 rounded-full bg-white animate-pulse"></div>
      </div>
    </div>
  )
}
