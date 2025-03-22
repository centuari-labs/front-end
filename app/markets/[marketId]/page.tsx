import Link from "next/link"
import { ArrowLeft, ExternalLink, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketChart } from "@/components/market-chart"
import { OrderBook } from "@/components/order-book"
import { LendingForm } from "@/components/lending-form"
import { BorrowingForm } from "@/components/borrowing-form"
import { OpenOrders } from "@/components/open-orders"
import { marketData } from "@/lib/data"

export default function MarketDetailPage({ params }: { params: { marketId: string } }) {
  // In a real app, we would fetch this data based on the marketId
  const market = marketData.find((m) => m.id === params.marketId) || marketData[0]

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/markets">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">{market.name}</h1>
            <Link
              href={`https://etherscan.io/address/${market.contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">View on Etherscan</span>
              </Button>
            </Link>
          </div>
          <p className="text-muted-foreground">{market.description}</p>
        </div>
      </div>

      {/* Main grid layout matching the wireframe */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
        {/* Top row */}
        <Card className="card-colorful">
          <CardHeader>
            <CardTitle>Market Overview</CardTitle>
            <CardDescription>Historical rates and liquidity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <MarketChart marketId={market.id} />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex flex-col gap-1 items-center">
                <span className="text-sm font-medium text-muted-foreground">Total Supply</span>
                <span className="text-xl font-bold">${market.totalSupply.toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <span className="text-sm font-medium text-muted-foreground">Total Borrowed</span>
                <span className="text-xl font-bold">${market.totalBorrowed.toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <span className="text-sm font-medium text-muted-foreground">Lending APY</span>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold text-green-500">{market.lendingAPY}%</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <span className="text-sm font-medium text-muted-foreground">Borrowing APY</span>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold">{market.borrowingAPY}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-colorful">
          <CardHeader className="pb-3">
            <CardTitle>Order Book</CardTitle>
            <CardDescription>Current lending and borrowing orders</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderBook marketId={market.id} />
          </CardContent>
        </Card>

        {/* Bottom row */}
        <Card className="card-colorful">
          <CardHeader>
            <CardTitle>Trade</CardTitle>
            <CardDescription>Lend or borrow in this market</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="lend" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="lend" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  Lend
                </TabsTrigger>
                <TabsTrigger value="borrow" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  Borrow
                </TabsTrigger>
              </TabsList>
              <TabsContent value="lend" className="m-0">
                <LendingForm market={market} />
              </TabsContent>
              <TabsContent value="borrow" className="m-0">
                <BorrowingForm market={market} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="card-colorful">
          <CardHeader>
            <CardTitle>Open Orders</CardTitle>
            <CardDescription>Your active orders in this market</CardDescription>
          </CardHeader>
          <CardContent>
            <OpenOrders marketId={market.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

