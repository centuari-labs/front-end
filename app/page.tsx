import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MarketCard } from "@/components/market-card";
import { StatsCard } from "@/components/stats-card";
import { marketData } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <section className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-background to-muted dark:bg-gradient-to-r dark:from-background-dark dark:to-background-dark">
        <div className="hidden dark:block absolute w-[300px] bottom-0 right-0 h-[200px] rounded-full bg-blue-900 blur-[200px]"></div>
        <div className="hidden dark:block absolute w-1/3 left-0 top-0 h-1/3 transform translate-x-0.5 translate-y-0.5 rounded-full bg-blue-950 blur-[200px]"></div>

        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                <span>Centuari</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground dark:text-primary-dark md:text-xl">
                A DeFi platform revolutionizing CLOB for borrowers and lenders.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/markets">
                <Button variant="colorful" size="lg">
                  Explore Markets
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/my-positions">
                <Button variant="outline" size="lg">
                  My Positions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-6">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight dark:text-primary-dark">
              Platform Statistics
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatsCard
              title="Total Value Locked"
              value="$1.24B"
              change="+5.4%"
              isPositive={true}
            />
            <StatsCard
              title="Total Borrowed"
              value="$820M"
              change="+2.1%"
              isPositive={true}
            />
            <StatsCard
              title="Markets"
              value="24"
              change="+2"
              isPositive={true}
            />
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-6">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight dark:text-primary-dark">
              Popular Markets
            </h2>
            <Link
              href="/markets"
              className="flex items-center text-sm font-medium dark:text-slate-300 text-slate-600 hover:text-slate-700 hover:dark:text-primary-dark"
            >
              View all markets
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {marketData.slice(0, 6).map((market) => (
              <MarketCard
                key={market.id}
                id={market.id}
                name={market.name}
                lendToken={market.lend_token}
                collateralToken={market.collateral_token}
                lendingAPY={market.lendingAPY}
                borrowingAPY={market.borrowingAPY}
                marketVolume={market.marketVolume}
                ltv={market.ltv}
                trending={market.trending}
                lendTokenUrl="https://etherscan.io/token/images/usdc_ofc_32.svg"
                borrowTokenUrl="https://etherscan.io/token/images/weth_28.png?v=2"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
