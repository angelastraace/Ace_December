export function FuturisticCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-gradient-to-r from-cyan-800 to-blue-900 p-6 rounded-xl shadow-lg text-white max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}
