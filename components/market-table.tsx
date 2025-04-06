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

interface MarketTableProps {
  markets: Array<{
    id: string;
    name: string;
    lendingAPY: number;
    borrowingAPY: number;
    marketVolume: number;
    ltv: number;
    trending: number;
    lendTokenUrl: string;
    borrowTokenUrl: string;
  }>;
}

export function MarketTable({ markets }: MarketTableProps) {
  return (
    <div className="rounded-md border">
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
                    lendTokenUrl={market.lendTokenUrl}
                    borrowTokenUrl={market.borrowTokenUrl}
                    pairName={market.name}
                    marketTrending={market.trending}
                  />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-center">
                ${market.marketVolume.toLocaleString()}
              </TableCell>
              <TableCell className="hidden md:table-cell text-center">
                ${market.ltv.toLocaleString()}
              </TableCell>
              <TableCell
                className={cn(
                  market.lendingAPY > 5
                    ? "text-green-500 font-medium text-center"
                    : "text-center"
                )}
              >
                {market.lendingAPY}%
              </TableCell>
              <TableCell className="text-center">
                {market.borrowingAPY}%
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
