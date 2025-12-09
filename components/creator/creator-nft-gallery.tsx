const mockNFTs = [
  { id: "1", name: "Galaxy Kat", image: "/nft1.png" },
  { id: "2", name: "Rocket Ronny", image: "/nft2.png" },
  { id: "3", name: "Astro Boi", image: "/nft3.png" },
]

export function CreatorNFTGallery() {
  return (
    <section className="max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Your NFT Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockNFTs.map((nft) => (
          <div key={nft.id} className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition">
            <img
              src={nft.image || "/placeholder.svg"}
              alt={nft.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{nft.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CreatorNFTGallery
