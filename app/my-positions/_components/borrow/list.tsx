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
import { useApproval } from "@/hooks/use-approval";
import { useRepay } from "@/hooks/use-repay";
import { useTokenBalance } from "@/hooks/use-token-balance";
import { useWithdrawBorrow } from "@/hooks/use-withdraw-borrow";
import { parseToRate } from "@/lib/helper";
import { CENTUARI, METH_TOKEN, USDC_TOKEN } from "@/lib/tokenAddress";
import { IVaultPositionProps } from "@/lib/types";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const BorrowPositionList = () => {
  const { address } = useAccount();
  const { approve, error, isApproving } = useApproval();
  // const [balances, setBalances] = useState<Record<string, string>>({});

  const [borrowData, setBorrowData] = useState<any[]>([]);

  async function getBorrowData() {
    const res = await fetch(`/api/my-position/${address}/borrow`);
    if (!res.ok) return undefined;
    const resData = await res.json();
    setBorrowData(resData);
  }

  useEffect(() => {
    getBorrowData();
  }, []);

  const { withdrawBorrow } = useWithdrawBorrow({
    address: CENTUARI,
    config: {
      loanToken: USDC_TOKEN,
      collateralToken: METH_TOKEN,
      amount: BigInt("1194"), // contoh 1194 USDC
      maturity: BigInt(1753981200),
      rate: BigInt("60000000000000000"),
    },
  });

  const handleWitdrawBorrow = async () => {
    await approve({
      amount: BigInt("83138790259"),
      spender: CENTUARI,
      address: USDC_TOKEN as `0x${string}`,
    });
    await withdrawBorrow();
  };

  const { repay } = useRepay({
    address: CENTUARI,
    config: {
      loanToken: USDC_TOKEN,
      collateralToken: METH_TOKEN,
      amount: BigInt("1194"), // contoh 1194 USDC
      maturity: BigInt(1753981200),
      rate: BigInt("60000000000000000"),
    },
  });

  const handleRepaySubmit = async () => {
    await approve({
      amount: BigInt("83138790259"),
      spender: CENTUARI,
      address: USDC_TOKEN as `0x${string}`,
    });
    await repay();
  };

  return (
    <AccordionItem
      value="item-2"
      className="border border-muted-dark/40 dark:border-muted-dark/40 px-4 rounded-md bg-card dark:bg-card-dark"
    >
      <AccordionTrigger className="text-start">
        <div>
          <h1>Borrow</h1>
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
