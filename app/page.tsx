import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MarketCard } from "@/components/market-card"
import { StatsCard } from "@/components/stats-card"
import { marketData } from "@/lib/data"


export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="gradient-text">PINJOC</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
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
            <h2 className="text-2xl font-bold tracking-tight gradient-blue-text">Platform Statistics</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Total Value Locked" value="$1.24B" change="+5.4%" isPositive={true} />
            <StatsCard title="Total Borrowed" value="$820M" change="+2.1%" isPositive={true} />
            <StatsCard title="Active Users" value="42.5K" change="+12.3%" isPositive={true} />
            <StatsCard title="Markets" value="24" change="+2" isPositive={true} />
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-6">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight gradient-coral-text">Popular Markets</h2>
            <Link href="/markets" className="flex items-center text-sm font-medium text-coral">
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
                lendingAPY={market.lendingAPY} 
                borrowingAPY={market.borrowingAPY} 
                totalSupply={market.totalSupply} 
                totalBorrowed={market.totalBorrowed} 
                trending={market.trending} 
                lendTokenUrl='https://etherscan.io/token/images/usdc_ofc_32.svg' 
                borrowTokenUrl='https://etherscan.io/token/images/weth_28.png?v=2' />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

