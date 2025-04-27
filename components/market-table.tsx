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

interface MarketTableProps {
  markets: MarketCardProps[];
}

export function MarketTable({ markets }: MarketTableProps) {
  return (
    <div className="rounded-md border dark:border-white/20">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Asset</TableHead>
            <TableHead className="hidden md:table-cell text-center">
              Market Volume
            </TableHead>
            <TableHead className="hidden md:table-cell text-center">
              LTV
            </TableHead>
            <TableHead className="text-center">Lending APY</TableHead>
            <TableHead className="text-center">Borrowing APY</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {markets.map((market) => (
            <TableRow key={market.id}>
              <TableCell>
                <div className="flex justify-center">
                  <TokenPair
                    loanToken={market.loan_token.name}
                    collateralToken={market.collateral_token.name}
                    loanTokenUrl={market.loan_token.image_uri}
                    collateralTokenUrl={market.collateral_token.image_uri}
                    pairName={market.name}
                  />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-center">
                ${market.market_volume.toLocaleString()}
              </TableCell>
              <TableCell className="hidden md:table-cell text-center">
                ${(parseFloat(market.lltv) / 10 ** 16).toLocaleString()}
              </TableCell>
              <TableCell
                className={cn(
                  parseFloat(market.lending_apy) / 10 ** 16 > 5
                    ? "text-green-500 font-medium text-center"
                    : "text-center"
                )}
              >
                {parseFloat(market.lending_apy) / 10 ** 16}%
              </TableCell>
              <TableCell className="text-center">
                {parseFloat(market.borrow_apy) / 10 ** 16}%
              </TableCell>
              <TableCell className="text-center">
                <Link href={`/markets/${market.id}`}>
                  <Button variant="ghost" size="sm">
                    Details
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
