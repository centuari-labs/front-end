"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { TokenPair } from "./token-pair";
import { MarketCardProps } from "./market-card";
import { useRouter, useSearchParams } from "next/navigation";
import { parseToAmount, parseToRate } from "@/lib/helper";
interface MarketTableProps {
  markets: MarketCardProps[];
}

export function MarketTable({ markets }: MarketTableProps) {
  const router = useRouter();

  const handleMarketClick = (
    collateral_address: string,
    loan_address: string
  ) => {
    router.push(`/markets/${collateral_address}/${loan_address}`);
  };

  return (
    <div className="rounded-md border dark:border-white/20">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Asset</TableHead>
            <TableHead className="hidden md:table-cell text-left">
              Market Volume
            </TableHead>
            <TableHead className="hidden md:table-cell text-center">
              LLTV
            </TableHead>
            <TableHead className="text-center">Lending APY</TableHead>
            <TableHead className="text-center">Borrowing APY</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {markets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No markets found
              </TableCell>
            </TableRow>
          ) : (
            markets.map((market, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex justify-start">
                    <TokenPair
                      loanToken={market.loan_token.name}
                      collateralToken={market.collateral_token.name}
                      loanTokenUrl={market.loan_token.image_uri}
                      collateralTokenUrl={market.collateral_token.image_uri}
                      pairName={market.name}
                      onClick={() =>
                        handleMarketClick(
                          market.collateral_token.address,
                          market.loan_token.address
                        )
                      }
                    />
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell ">
                  $
                  {parseToAmount(
                    market.market_volume,
                    market.loan_token.decimal
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell text-center">
                  {parseToRate(market.lltv)}%
                </TableCell>
                <TableCell
                  className={cn(
                    parseFloat(market.lending_apy) > 5
                      ? "text-green-500 font-medium text-center"
                      : "text-center"
                  )}
                >
                  {parseToRate(market.lending_apy)}%
                </TableCell>
                <TableCell className="text-center">
                  {parseToRate(market.borrow_apy)}%
                </TableCell>
                <TableCell className="text-center">
                  <Link
                    href={`/markets/${market.collateral_token.address}/${market.loan_token.address}`}
                  >
                    <Button variant="ghost" size="sm">
                      Details
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
