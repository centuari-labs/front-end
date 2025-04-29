import { MARKET_API } from "@/lib/api";
import { Hero } from "@/components/pages/Home/Hero";
import { PlatformStatistic } from "@/components/pages/Home/PlatformStatistic";
import { PopularMarket } from "@/components/pages/Home/PopularMarket";

export default async function HomePage() {
  const getMarket = await fetch(MARKET_API);
  const marketData = await getMarket.json();

  return (
    <div className="flex flex-col gap-8 pb-8">
      <Hero />

      <PlatformStatistic />

      <PopularMarket marketData={marketData} />
    </div>
  );
}
