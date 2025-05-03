import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketChart } from "@/components/market-chart";
import { LendingForm } from "@/components/lending-form";
import { OpenOrders } from "@/components/open-orders";
import { BASE_URL } from "@/lib/api";
import { MarketTitle } from "../../_components/market-title";
import { Maturity, SelectMaturity } from "../../_components/select-maturity";
import { OrderBookCard } from "../../_components/card-order-book";
import { parseToAmount, parseToRate } from "@/lib/helper";
import { BorrowingForm } from "@/components/borrowing-form";

export interface Order {
  rate: number;
  amount: number;
  total: number;
  type: "borrow" | "lend";
}

async function getMarketData(id: string) {
  const res = await fetch(`${BASE_URL}/api/market/${id}`);
  if (!res.ok) return undefined;
  return res.json();
}

async function getMaturities(collateral_token: string, loan_token: string) {
  const res = await fetch(
    `${BASE_URL}/api/maturities/${collateral_token}/${loan_token}`
  );
  if (!res.ok) return undefined;
  return res.json();
}

async function getOrderBookData(id: string) {
  const res = await fetch(`${BASE_URL}/api/order-book/${id}`);
  if (!res.ok) return undefined;
  return res.json();
}

export default async function MarketDetailPage({
  params,
  searchParams,
}: {
  params: { collateral: string; loan: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { collateral, loan } = await params;
  const market_id = (await searchParams).market_id;

  const maturities = await getMaturities(collateral, loan);
  const orderBook = await getOrderBookData(
    market_id ?? maturities[0].market_id
  );

  const getMarketDetail = await fetch(
    `${BASE_URL}/api/market/${market_id ?? maturities[0].market_id}`
  );
  const market = await getMarketDetail.json();

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/markets">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div className="flex flex-col gap-1">
            <MarketTitle market={market} />
          </div>
        </div>
        <SelectMaturity data={maturities} />
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
              <MarketChart market={market} />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
              <div className="flex flex-col gap-1 items-center">
                <span className="text-sm font-medium text-muted-foreground dark:text-muted-dark">
                  Market Volume
                </span>
                <span className="text-sm font-bold">
                  {parseToAmount(
                    market.market_volume,
                    market.loan_token.decimal
                  )}{" "}
                  {market.loan_token.symbol}
                </span>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <span className="text-sm font-medium text-muted-foreground dark:text-muted-dark">
                  Maturity
                </span>
                <span className="text-sm font-bold">
                  {new Date(market.maturity_date)
                    .toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })
                    .toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <span className="text-sm font-medium text-muted-foreground dark:text-muted-dark">
                  LLTV
                </span>
                <span className="text-sm font-bold">
                  {parseToRate(market.lltv)}%
                </span>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <span className="text-sm font-medium text-muted-foreground dark:text-muted-dark">
                  Lending APY
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-green-500">
                    {parseToRate(market.lending_apy)}%
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <span className="text-sm font-medium text-muted-foreground dark:text-muted-dark">
                  Borrowing APY
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold">
                    {parseToRate(market.borrow_apy)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <OrderBookCard orders={orderBook} />

        {/* Bottom row */}
        <Card className="card-colorful">
          <CardHeader>
            <CardTitle>Trade</CardTitle>
            <CardDescription>Lend or borrow in this market</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="lend" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:w-auto bg-muted dark:bg-gray-800 mb-6">
                <TabsTrigger
                  value="lend"
                  className="text-slate-400 dark:text-white data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#10b981] data-[state=active]:to-cyan-700 data-[state=active]:text-white"
                >
                  Lend
                </TabsTrigger>
                <TabsTrigger
                  value="borrow"
                  className="text-slate-400 dark:text-white data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#6366f1] data-[state=active]:to-blue-700 data-[state=active]:text-white"
                >
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
            <OpenOrders marketId={market_id ?? maturities[0].market_id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
