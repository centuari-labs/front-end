"use client";

import { TokenPair } from "@/components/token-pair";
import { TokenSingle } from "@/components/token-single";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTokenBalance } from "@/hooks/use-token-balance";
import { parseToRate } from "@/lib/helper";
import { IVaultPositionProps } from "@/lib/types";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const LendPositionList = () => {
  const { address } = useAccount();
  // const [balances, setBalances] = useState<Record<string, string>>({});

  const [lendData, setLendData] = useState<any[]>([]);

  async function getLendingPosition() {
    const res = await fetch(`/api/my-position/${address}/lend`);
    if (!res.ok) return undefined;
    const resData = await res.json();
    setLendData(resData);
  }

  useEffect(() => {
    getLendingPosition();
  }, []);

  console.log({ lendData });

  return (
    <AccordionItem
      value="item-3"
      className="border border-muted-dark/40 dark:border-muted-dark/40 px-4 rounded-md bg-card dark:bg-card-dark"
    >
      <AccordionTrigger className="text-start">
        <div>
          <h1>Lend</h1>
          <p className="text-xs font-light">1 Position</p>
        </div>
      </AccordionTrigger>
      <AccordionContent className="border-t border-muted-dark/40 dark:border-muted-dark/40 pt-4">
        <div className="rounded-md border border-muted-dark/40 dark:border-muted-dark/40">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assets</TableHead>
                <TableHead>Supplied</TableHead>
                <TableHead className="hidden md:table-cell">Value</TableHead>
                <TableHead className="hidden md:table-cell">APY</TableHead>
                <TableHead>Maturity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  {/* <TokenPair
                      loanToken={marketData[0].lend_token}
                      collateralToken={marketData[0].collateral_token}
                      loanTokenUrl={marketData[0].lendTokenUrl}
                      collateralTokenUrl={marketData[0].borrowTokenUrl}
                      pairName={marketData[0].name}
                      marketTrending={marketData[0].trending}
                    /> */}
                </TableCell>
                <TableCell>10,000 USDC</TableCell>
                <TableCell>$10,000</TableCell>
                <TableCell>+3.25%</TableCell>
                <TableCell>September 30, 2023</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Button
                    variant={"destructive"}
                    size="sm"
                    className="w-full"
                    onClick={() => {}}
                  >
                    Repay
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Withdraw
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
