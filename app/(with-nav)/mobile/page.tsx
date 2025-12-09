"use client"

import MobileAppPreview from "@/components/mobile-app-preview"
import MobileLoginScreen from "@/components/mobile/login-screen"
import MobileHomeScreen from "@/components/mobile/home-screen"
import MobileWalletScreen from "@/components/mobile/wallet-screen"
import MobileTradeScreen from "@/components/mobile/trade-screen"
import MobileKatScreen from "@/components/mobile/kat-screen"
import MobileXpScreen from "@/components/mobile/xp-screen"
import MobileSettingsScreen from "@/components/mobile/settings-screen"

export default function MobileDemoPage() {
  const screens = [
    {
      id: "login",
      name: "Login",
      component: <MobileLoginScreen />,
    },
    {
      id: "home",
      name: "Home",
      component: <MobileHomeScreen />,
    },
    {
      id: "wallet",
      name: "Wallet",
      component: <MobileWalletScreen />,
    },
    {
      id: "trade",
      name: "Trade",
      component: <MobileTradeScreen />,
    },
    {
      id: "kat",
      name: "Kat",
      component: <MobileKatScreen />,
    },
    {
      id: "xp",
      name: "XP",
      component: <MobileXpScreen />,
    },
    {
      id: "settings",
      name: "Settings",
      component: <MobileSettingsScreen />,
    },
  ]

  return (
    <div className="min-h-screen bg-[#001219] py-12">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container absolute inset-0 z-0">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">ACE Mobile Core</h1>
          <p className="text-gray-400">Wallet, Kat, Trade & XP in Your Pocket</p>
        </div>

        <MobileAppPreview screens={screens} />

        <div className="mt-16 rounded-lg border border-gray-800 bg-black/40 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-white">About ACE Mobile</h2>
          <p className="mb-4 text-gray-300">
            ACE Mobile brings the full ACE Exchange experience to your pocket. Access your wallet, trade assets,
            interact with your ACE Kat, and track your XP progress on the go.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
              <h3 className="mb-2 text-lg font-bold text-white">Secure & Convenient</h3>
              <p className="text-sm text-gray-400">
                Biometric authentication, secure wallet storage, and offline mode for seamless access to your assets.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
              <h3 className="mb-2 text-lg font-bold text-white">ACE Kat Assistant</h3>
              <p className="text-sm text-gray-400">
                Your personal AI companion follows you on mobile with animations, chat, and helpful alerts.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
              <h3 className="mb-2 text-lg font-bold text-white">Trade Anywhere</h3>
              <p className="text-sm text-gray-400">
                Mobile-optimized trading interface with quick swaps, real-time charts, and price alerts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
