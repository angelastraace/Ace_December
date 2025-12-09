import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ScrollAnimationClient from "./scroll-animation-client"

export function TradeHistory() {
  // Sample trade history data
  const trades = [
    {
      id: 1,
      pair: "BTC/USDT",
      type: "Buy",
      amount: "0.05",
      price: "42,150.00",
      total: "2,107.50",
      time: "2023-05-15 14:32",
    },
    {
      id: 2,
      pair: "ETH/USDT",
      type: "Sell",
      amount: "1.2",
      price: "2,250.75",
      total: "2,700.90",
      time: "2023-05-15 13:45",
    },
    { id: 3, pair: "SOL/USDT", type: "Buy", amount: "15", price: "87.25", total: "1,308.75", time: "2023-05-15 12:30" },
    { id: 4, pair: "AVAX/USDT", type: "Sell", amount: "10", price: "32.15", total: "321.50", time: "2023-05-15 11:20" },
    { id: 5, pair: "DOT/USDT", type: "Buy", amount: "50", price: "6.85", total: "342.50", time: "2023-05-15 10:15" },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Trade History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pair</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade) => (
              <TableRow key={trade.id}>
                <TableCell className="font-medium">{trade.pair}</TableCell>
                <TableCell className={trade.type === "Buy" ? "text-green-500" : "text-red-500"}>{trade.type}</TableCell>
                <TableCell>{trade.amount}</TableCell>
                <TableCell>{trade.price}</TableCell>
                <TableCell>{trade.total}</TableCell>
                <TableCell>{trade.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Use the client component for animations if needed */}
        <div className="mt-4">
          <ScrollAnimationClient />
        </div>
      </CardContent>
    </Card>
  )
}

export default TradeHistory
