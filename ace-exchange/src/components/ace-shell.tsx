"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CandlestickChart,
  Bot,
  Rocket,
  WalletCards,
  Users,
  GraduationCap,
  Banknote,
  Gem,
  ShieldCheck,
  Globe2,
  Gift,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { WalletStatus } from "./wallet-status";

type NavGroup =
  | "CORE"
  | "TRADE"
  | "EARN"
  | "WEB3"
  | "SOCIAL"
  | "CARD"
  | "VIP"
  | "INST";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  group: NavGroup;
};

const navItems: NavItem[] = [
  // Core
  {
    label: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="w-4 h-4" />,
    group: "CORE",
  },
  {
    label: "Rewards Hub",
    href: "/rewards",
    icon: <Gift className="w-4 h-4" />,
    group: "CORE",
  },
  {
    label: "Learn & School",
    href: "/learn",
    icon: <GraduationCap className="w-4 h-4" />,
    group: "CORE",
  },

  // Trading
  {
    label: "Spot Trading",
    href: "/trade/spot",
    icon: <CandlestickChart className="w-4 h-4" />,
    group: "TRADE",
  },
  {
    label: "Futures",
    href: "/trade/futures",
    icon: <CandlestickChart className="w-4 h-4" />,
    group: "TRADE",
  },
  {
    label: "Options",
    href: "/trade/options",
    icon: <CandlestickChart className="w-4 h-4" />,
    group: "TRADE",
  },

  // Earn & Bots
  {
    label: "Earn Hub",
    href: "/earn",
    icon: <Banknote className="w-4 h-4" />,
    group: "EARN",
  },
  {
    label: "Bots",
    href: "/bots",
    icon: <Bot className="w-4 h-4" />,
    group: "EARN",
  },

  // Web3 & Launch
  {
    label: "Launchpad",
    href: "/launchpad",
    icon: <Rocket className="w-4 h-4" />,
    group: "WEB3",
  },
  {
    label: "Web3 Hub",
    href: "/web3",
    icon: <Globe2 className="w-4 h-4" />,
    group: "WEB3",
  },

  // Social
  {
    label: "Social Space",
    href: "/social",
    icon: <Users className="w-4 h-4" />,
    group: "SOCIAL",
  },

  // Card
  {
    label: "ACE Card",
    href: "/card",
    icon: <WalletCards className="w-4 h-4" />,
    group: "CARD",
  },

  // VIP
  {
    label: "ACE VIP",
    href: "/vip",
    icon: <Gem className="w-4 h-4" />,
    group: "VIP",
  },

  // Institutional
  {
    label: "Institutional",
    href: "/institutional",
    icon: <ShieldCheck className="w-4 h-4" />,
    group: "INST",
  },
];

const groupLabels: Record<NavGroup, string> = {
  CORE: "Core",
  TRADE: "Trading",
  EARN: "Earn & Bots",
  WEB3: "Web3 & Launch",
  SOCIAL: "Social",
  CARD: "Payments",
  VIP: "VIP",
  INST: "Institutional",
};

export function AceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const grouped = navItems.reduce(
    (acc, item) => {
      (acc[item.group] = acc[item.group] || []).push(item);
      return acc;
    },
    {} as Record<NavGroup, NavItem[]>
  );

  return (
    <div className="min-h-screen text-slate-100">
      {/* TOP HUD BAR */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-3 border-b border-white/10 bg-black/40 backdrop-blur-xl dark:bg-slate-950/70">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full border border-cyan-400/70 shadow-md shadow-cyan-500/40 flex items-center justify-center text-[10px] font-bold tracking-[0.22em]">
            ACE
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
              Exchange
            </span>
            <span className="text-[11px] text-slate-500">
              Operative System · Orbit Mode
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden sm:block">
            <WalletStatus />
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500" />
            <span className="text-[11px] text-slate-300">Guest Pilot</span>
          </div>
        </div>
      </header>

      {/* BODY: SIDEBAR + MAIN */}
      <div className="flex min-h-[calc(100vh-52px)]">
        {/* SIDEBAR */}
        <aside className="hidden md:flex w-64 flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl dark:bg-slate-950/70">
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
            {(Object.keys(groupLabels) as NavGroup[]).map((groupKey) => {
              const items = grouped[groupKey];
              if (!items || items.length === 0) return null;

              return (
                <div key={groupKey} className="space-y-2">
                  <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {groupLabels[groupKey]}
                  </p>
                  <div className="space-y-1">
                    {items.map((item) => {
                      const active =
                        pathname === item.href ||
                        (item.href !== "/" && pathname?.startsWith(item.href));

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={[
                            "flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs transition-colors",
                            active
                              ? "bg-cyan-500/20 text-cyan-100 border border-cyan-500/50"
                              : "text-slate-300 hover:bg-white/5 border border-transparent",
                          ].join(" ")}
                        >
                          <span className="shrink-0">{item.icon}</span>
                          <span className="truncate">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-white/10 px-3 py-3 text-[11px] text-slate-500">
            <p>ACE v0.1 · Shell Mode</p>
            <p className="text-slate-600">Mock data only · No real trading</p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 relative">
          <div className="h-full max-w-6xl mx-auto px-4 sm:px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
