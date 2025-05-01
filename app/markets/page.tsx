import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarketTable } from "@/components/market-table";
import { MARKET_API } from "@/lib/api";
import { PageLayout } from "@/components/layout/page-layout";

export default async function MarketsPage() {
  const getMarket = await fetch(MARKET_API);
  let marketData = await getMarket.json();

  // Sort markets by lending APY in descending order
  marketData = marketData.sort(
    (a: any, b: any) => b.lending_apy - a.lending_apy
  );

  return (
    <PageLayout
      title="Markets"
      description="Explore all available lending and borrowing markets on the platform."
      filter={
        <>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-muted-dark" />
            <Input
              type="search"
              placeholder="Search markets..."
              className="w-full appearance-none pl-8"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Filter
            </Button>
            <Button variant="outline" size="sm">
              Sort: APY ↓
            </Button>
          </div>
        </>
      }
    >
      <MarketTable markets={marketData} />
    </PageLayout>
  );
}
