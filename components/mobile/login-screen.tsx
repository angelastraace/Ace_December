export default function LoginScreen() {
  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-sm mx-auto text-center">
      <h2 className="text-lg font-bold mb-3">🔒 Secure Login</h2>
      <input type="text" placeholder="Wallet Address" className="w-full mb-3 p-2 border border-gray-300 rounded" />
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Connect Wallet</button>
    </div>
  )
}
