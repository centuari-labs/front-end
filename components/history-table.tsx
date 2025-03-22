import { ExternalLink } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface HistoryTableProps {
  transactions: Array<{
    id: string
    type: string
    marketId: string
    marketName: string
    amount: number
    value: number
    timestamp: string
    status: string
    txHash: string
  }>
}

export function HistoryTable({ transactions }: HistoryTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Market</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="hidden md:table-cell">Value</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    tx.type === "deposit"
                      ? "bg-green-500/10 text-green-500"
                      : tx.type === "withdrawal"
                        ? "bg-red-500/10 text-red-500"
                        : tx.type === "borrow"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : tx.type === "repay"
                            ? "bg-blue-500/10 text-blue-500"
                            : tx.type === "interest"
                              ? "bg-purple-500/10 text-purple-500"
                              : "bg-gray-500/10 text-gray-500",
                  )}
                >
                  {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <Link href={`/markets/${tx.marketId}`} className="hover:underline">
                  {tx.marketName}
                </Link>
              </TableCell>
              <TableCell>
                {tx.amount.toLocaleString()} {tx.marketName.split("/")[0]}
              </TableCell>
              <TableCell className="hidden md:table-cell">${tx.value.toLocaleString()}</TableCell>
              <TableCell className="hidden md:table-cell">{new Date(tx.timestamp).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    tx.status === "completed"
                      ? "bg-green-500/10 text-green-500"
                      : tx.status === "pending"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : tx.status === "failed"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-gray-500/10 text-gray-500",
                  )}
                >
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <a href={`https://etherscan.io/tx/${tx.txHash}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-3 w-3" />
                    <span className="sr-only">View on Etherscan</span>
                  </Button>
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

