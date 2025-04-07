import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarketTable } from "@/components/market-table";
import { marketData } from "@/lib/data";

export default function MarketsPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Markets</h1>
          <p className="text-muted-foreground dark:text-muted-dark">
            Explore all available lending and borrowing markets on the platform.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
        </div>

        <MarketTable markets={marketData} />
      </div>
    </div>
  );
}
