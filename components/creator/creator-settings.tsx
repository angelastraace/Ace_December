import { Card, CardContent } from "@/components/ui/card"

export default function CreatorSettings() {
  return (
    <Card className="w-full max-w-3xl mx-auto mt-6">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Creator Settings</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Display Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Short creator bio"
              rows={3}
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Save Settings
          </button>
        </form>
      </CardContent>
    </Card>
  )
}
