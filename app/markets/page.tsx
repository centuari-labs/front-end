import { MarketTable } from "@/components/market-table";
import { MARKET_API } from "@/lib/api";
import { PageLayout } from "@/components/layout/page-layout";
import { Filter } from "./_components/filter";

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
      filter={<Filter />}
    >
      <MarketTable markets={marketData} />
    </PageLayout>
  );
}
