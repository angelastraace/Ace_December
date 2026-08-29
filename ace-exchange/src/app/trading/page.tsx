import { CockpitShell } from "@/components/CockpitShell";

export default function TradingPage() {
  return (
    <CockpitShell
      title="Trading Cockpit"
      subtitle="Spot, perps and degen tools in one HUD."
    >
      <section className="grid gap-6 lg:grid-cols-[1.7fr,1.2fr] anim-fade-up">
        {/* LEFT: MARKET VIEW */}
        <div className="cockpit-panel p-4 md:p-6 flex flex-col gap-4">
          {/* Pair header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <div className="text-sm font-semibold text-slate-100">
                ACE / USDC
              </div>
              <div className="text-xs text-slate-500 font-mono">
                PERP · x25 max
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-emerald-400">+3.42%</span>
              <span className="text-slate-400">24h Vol</span>
              <span className="text-slate-100">$12.8M</span>
            </div>
          </div>

          {/* Timeframe tabs */}
          <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
            {["1m", "5m", "15m", "1h", "4h", "1d"].map((tf, idx) => (
              <button
                key={tf}
                type="button"
                className={`rounded-full border px-2.5 py-1 ${
                  idx === 2
                    ? "border-cyan-400/70 bg-cyan-500/15 text-cyan-100"
                    : "border-slate-600/70 bg-slate-900/60 hover:border-slate-400"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart placeholder */}
          <div className="flex-1 rounded-2xl border border-slate-700/70 bg-slate-950/70 p-3 md:p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>PRICE ACTION (MOCK)</span>
              <span>FEED · SIMULATED</span>
            </div>

            <div className="flex-1 relative overflow-hidden rounded-xl bg-slate-900/70 border border-slate-700/70">
              {/* Simple fake chart using layered gradients */}
              <div className="absolute inset-0 opacity-70">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-800/70 via-slate-900/80 to-slate-950" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_55%)]" />
              </div>
              <div className="absolute inset-x-2 bottom-2 h-20 flex items-end gap-[3px] opacity-80">
                {Array.from({ length: 60 }).map((_, i) => {
                  const height = 20 + Math.abs(Math.sin(i * 0.3)) * 60;
                  return (
                    <div
                      key={i}
                      className="w-[3px] rounded-t bg-gradient-to-t from-cyan-400/60 via-emerald-300/70 to-slate-50/90"
                      style={{ height: `${height}px` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: ORDER TICKET + ORDERBOOK + TRADES */}
        <div className="flex flex-col gap-4">
          {/* ORDER TICKET */}
          <div className="cockpit-panel p-4 md:p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="cockpit-label">ORDER TICKET</div>
              <div className="text-[11px] font-mono text-slate-400">
                MODE: <span className="text-cyan-300">DEMO</span>
              </div>
            </div>

            {/* Buy / Sell tabs */}
            <div className="flex gap-2 text-[11px] font-mono">
              <button
                type="button"
                className="flex-1 rounded-full border border-emerald-400/60 bg-emerald-500/15 text-emerald-100 px-2 py-1.5"
              >
                BUY / LONG
              </button>
              <button
                type="button"
                className="flex-1 rounded-full border border-slate-600/80 bg-slate-900/70 text-rose-300 px-2 py-1.5"
              >
                SELL / SHORT
              </button>
            </div>

            {/* Inputs (visual only) */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="space-y-1">
                <label className="text-slate-400">Order type</label>
                <div className="rounded-lg border border-slate-700/80 bg-slate-950/70 px-2 py-1.5 flex items-center justify-between">
                  <span className="text-slate-100">Limit</span>
                  <span className="text-slate-500">▼</span>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-slate-400">Leverage</label>
                <div className="rounded-lg border border-slate-700/80 bg-slate-950/70 px-2 py-1.5 flex items-center justify-between">
                  <span className="text-slate-100">5x</span>
                  <span className="text-slate-500">▼</span>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-slate-400">Size (ACE)</label>
                <div className="rounded-lg border border-slate-700/80 bg-slate-950/70 px-2 py-1.5 flex items-center justify-between">
                  <span className="text-slate-500">0.00</span>
                  <span className="text-slate-600">MAX</span>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-slate-400">Price (USDC)</label>
                <div className="rounded-lg border border-slate-700/80 bg-slate-950/70 px-2 py-1.5 flex items-center justify-between">
                  <span className="text-slate-100">1.024</span>
                  <span className="text-slate-600">MARK</span>
                </div>
              </div>
            </div>

            {/* Summary rows */}
            <div className="space-y-1 text-[11px] font-mono text-slate-400">
              <div className="flex justify-between">
                <span>Cost (est)</span>
                <span className="text-slate-100">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Fee (est)</span>
                <span className="text-slate-100">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>XP from this order</span>
                <span className="text-cyan-300">+0 XP</span>
              </div>
            </div>

            <button
              type="button"
              className="cockpit-button mt-2 w-full rounded-xl border border-emerald-400/80 bg-emerald-500/20 px-3 py-2 text-xs font-mono text-emerald-50 hover:bg-emerald-500/30 hover:shadow-cockpit-strong transition"
            >
              PLACE DEMO ORDER (DISABLED)
            </button>
          </div>

          {/* ORDERBOOK + TRADES */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* ORDERBOOK */}
            <div className="cockpit-panel p-3 md:p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="cockpit-label">ORDERBOOK</span>
                <span>ACE / USDC</span>
              </div>

              {/* Header */}
              <div className="grid grid-cols-3 text-[10px] font-mono text-slate-500">
                <span>Price</span>
                <span className="text-right">Size</span>
                <span className="text-right">Total</span>
              </div>

              {/* Asks */}
              <div className="space-y-[2px] text-[11px] font-mono">
                {[
                  { price: "1.0280", size: "3,420", total: "12,800" },
                  { price: "1.0275", size: "2,100", total: "9,380" },
                  { price: "1.0270", size: "1,680", total: "7,280" },
                ].map((row, idx) => (
                  <div
                    key={`ask-${idx}`}
                    className="relative grid grid-cols-3 items-center"
                  >
                    <div className="absolute inset-y-0 right-0 w-[60%] bg-rose-500/10" />
                    <span className="relative text-rose-300">{row.price}</span>
                    <span className="relative text-right text-slate-100">
                      {row.size}
                    </span>
                    <span className="relative text-right text-slate-500">
                      {row.total}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mid price */}
              <div className="my-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Last</span>
                <span className="text-slate-100">1.0265</span>
                <span className="text-emerald-400">+3.42%</span>
              </div>

              {/* Bids */}
              <div className="space-y-[2px] text-[11px] font-mono">
                {[
                  { price: "1.0260", size: "4,020", total: "14,300" },
                  { price: "1.0255", size: "3,600", total: "12,180" },
                  { price: "1.0250", size: "1,950", total: "8,580" },
                ].map((row, idx) => (
                  <div
                    key={`bid-${idx}`}
                    className="relative grid grid-cols-3 items-center"
                  >
                    <div className="absolute inset-y-0 right-0 w-[60%] bg-emerald-500/10" />
                    <span className="relative text-emerald-300">
                      {row.price}
                    </span>
                    <span className="relative text-right text-slate-100">
                      {row.size}
                    </span>
                    <span className="relative text-right text-slate-500">
                      {row.total}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT TRADES */}
            <div className="cockpit-panel p-3 md:p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="cockpit-label">RECENT TRADES</span>
                <span>STREAM · SIMULATED</span>
              </div>

              <div className="grid grid-cols-3 text-[10px] font-mono text-slate-500">
                <span>Time</span>
                <span className="text-right">Price</span>
                <span className="text-right">Size</span>
              </div>

              <div className="space-y-[2px] text-[11px] font-mono">
                {[
                  { time: "12:04:21", price: "1.0268", size: "850", side: "buy" },
                  { time: "12:04:18", price: "1.0264", size: "1,200", side: "sell" },
                  { time: "12:04:10", price: "1.0260", size: "640", side: "buy" },
                  { time: "12:03:55", price: "1.0258", size: "1,050", side: "sell" },
                  { time: "12:03:40", price: "1.0255", size: "420", side: "buy" },
                ].map((t, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-3 items-center text-[11px]"
                  >
                    <span className="text-slate-500">{t.time}</span>
                    <span
                      className={`text-right ${
                        t.side === "buy" ? "text-emerald-300" : "text-rose-300"
                      }`}
                    >
                      {t.price}
                    </span>
                    <span className="text-right text-slate-100">
                      {t.size}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-2 text-[10px] text-slate-500">
                Live data feed will eventually come from your real markets /
                matching engine. For now, it&apos;s here to make the cockpit feel
                like a trading terminal, not a landing page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </CockpitShell>
  );
}
