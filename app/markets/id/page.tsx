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
import { marketData } from "@/lib/data";
import { SelectMaturity } from "../_components/select-maturity";
import { maturityList } from "./_data/maturity-list";
import { BASE_URL } from "@/lib/api";
import { useChainId, useConfig } from "wagmi";
import { MarketTitle } from "../_components/market-title";

interface Order {
  rate: number;
  amount: number;
  total: number;
  type: "borrow" | "lend";
}

// In a real app, we would fetch this data based on the marketId
// const market = marketData.find((m) => m.id === "usdc-eth") || marketData[0];

const orders = [
  { rate: 5.5, amount: 41996, total: 41996, type: "lend" },
  { rate: 5.0, amount: 5216, total: 47212, type: "lend" },
  { rate: 4.5, amount: 97148, total: 144360, type: "lend" },
  { rate: 4.0, amount: 86290, total: 230650, type: "lend" },
  { rate: 3.5, amount: 71459, total: 302109, type: "lend" },
  { rate: 3.0, amount: 23688, total: 325797, type: "borrow" },
  { rate: 2.5, amount: 117884, total: 443681, type: "borrow" },
  { rate: 2.0, amount: 80478, total: 524159, type: "borrow" },
  { rate: 1.5, amount: 22846, total: 547005, type: "borrow" },
  { rate: 1.0, amount: 180369, total: 727374, type: "borrow" },
  { rate: 0.5, amount: 103038, total: 830412, type: "borrow" },
];

async function getMarketData(id: string) {
  const res = await fetch(`${BASE_URL}/api/market/${id}`);
  if (!res.ok) return undefined;
  return res.json();
}

async function getOrderBookData(id: string) {
  const res = await fetch(`${BASE_URL}/api/market/order-book/${id}`);
  if (!res.ok) return undefined;
  return res.json();
}

export default async function MarketDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id: marketId } = await params;
  const market = await getMarketData(marketId);
  const orderBook = await getOrderBookData(marketId);

  // const marketDetailUrl = useMemo(() => MARKET_DETAIL_API(id), []);

  // const getMarketDetail = await fetch(`${BASE_URL}/api/market/${id}`);
  // const marketDetail = await getMarketDetail.json();

  // const marketDetailApi = useCallback(
  //   (): string => MARKET_DETAIL_API(id),
  //   [id]
  // );

  // console.log({ marketDetail });

  // const [fixedRate, setFixedRate] = useState<number>(0);

  // const handleFixRated = (value: number | string) => {
  //   setFixedRate(parseFloat(value.toString()));
  // };

  // const handleFixRatedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newValue = parseFloat(e.target.value);
  //   if (!isNaN(newValue)) {
  //     setFixedRate(parseFloat(newValue.toFixed(2)));
  //   } else {
  //     setFixedRate(0);
  //   }
  // };

  // console.log("orderBook", orderBook);
  if (!marketData && !orderBook) {
    return <p>Loading</p>;
  }

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
        <SelectMaturity data={maturityList} />
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
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
              <div className="flex flex-col gap-1 items-center">
                <span className="text-sm font-medium text-muted-foreground dark:text-muted-dark">
                  Market Volume
                </span>
                <span className="text-sm font-bold">
                  ${parseFloat(market.market_volume).toLocaleString()}
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
                  {parseFloat(market.lltv) / 10 ** 16} %
                </span>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <span className="text-sm font-medium text-muted-foreground dark:text-muted-dark">
                  Lending APY
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-green-500">
                    {parseFloat(market.lending_apy) / 10 ** 16} %
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <span className="text-sm font-medium text-muted-foreground dark:text-muted-dark">
                  Borrowing APY
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold">
                    {parseFloat(market.borrow_apy) / 10 ** 16} %
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-colorful">
          <CardHeader className="pb-3">
            <CardTitle>Order Book</CardTitle>
            <CardDescription>
              Current lending and borrowing orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <OrderBook
              orders={orders as Order[]}
              handleFixRated={handleFixRated}
            /> */}
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
              <TabsList className="grid w-full grid-cols-2 md:w-auto bg-muted dark:bg-gray-800 mb-6">
                <TabsTrigger
                  value="lend"
                  className="text-slate-400 dark:text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600"
                >
                  Lend
                </TabsTrigger>
                <TabsTrigger
                  value="borrow"
                  className="text-slate-400 dark:text-white data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600"
                >
                  Borrow
                </TabsTrigger>
              </TabsList>
              <TabsContent value="lend" className="m-0">
                <LendingForm
                  market={market}
                  // fixedRate={fixedRate}
                  // handleFixRatedChange={handleFixRatedChange}
                />
              </TabsContent>
              <TabsContent value="borrow" className="m-0">
                {/* <BorrowingForm
                  market={market}
                  fixedRate={fixedRate}
                  handleFixRatedChange={handleFixRatedChange}
                /> */}
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
  );
}
