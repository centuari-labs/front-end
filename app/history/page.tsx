import type { Metadata } from "next"
import { Calendar, Download, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HistoryTable } from "@/components/history-table"
import { transactionHistory } from "@/lib/data"

export const metadata: Metadata = {
  title: "Transaction History - DeFi Lending & Borrowing",
  description: "View your transaction history",
}

export default function HistoryPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Transaction History</h1>
          <p className="text-muted-foreground">View and export your complete transaction history.</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          <Button variant="outline" size="sm" className="h-8">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Summary</CardTitle>
            <CardDescription>Overview of your recent activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Total Transactions</span>
                <span className="text-2xl font-bold">42</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Total Volume</span>
                <span className="text-2xl font-bold">$28,450.83</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Fees Paid</span>
                <span className="text-2xl font-bold">$124.32</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Interest Earned</span>
                <span className="text-2xl font-bold text-green-500">+$345.67</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="deposits">Deposits</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            <TabsTrigger value="interest">Interest</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <HistoryTable transactions={transactionHistory} />
          </TabsContent>
          <TabsContent value="deposits" className="mt-6">
            <HistoryTable transactions={transactionHistory.filter((tx) => tx.type === "deposit")} />
          </TabsContent>
          <TabsContent value="withdrawals" className="mt-6">
            <HistoryTable transactions={transactionHistory.filter((tx) => tx.type === "withdrawal")} />
          </TabsContent>
          <TabsContent value="interest" className="mt-6">
            <HistoryTable transactions={transactionHistory.filter((tx) => tx.type === "interest")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

