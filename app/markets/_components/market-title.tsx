"use client";

import { MarketCardProps } from "@/components/market-card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export function MarketTitle({ market }: { market: MarketCardProps }) {
  return (
    <div className="flex items-center gap-2">
      <h1 className="text-2xl font-bold tracking-tight">
        {market.collateral_token.symbol} / {market.loan_token.symbol}
      </h1>
      <Link
        href={`https://etherscan.io/address/${market.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <ExternalLink className="h-4 w-4" />
          <span className="sr-only">View on Explorer</span>
        </Button>
      </Link>
    </div>
    //   <p className="text-muted-foreground dark:text-muted-dark">
    //   {market.description}
    // </p>
  );
}
