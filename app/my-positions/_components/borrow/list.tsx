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
import { useIsMobile } from "@/hooks/use-mobile";
import { useRepay } from "@/hooks/use-repay";
import { useTokenBalance } from "@/hooks/use-token-balance";
import { useWithdrawBorrow } from "@/hooks/use-withdraw-borrow";
import { formatDate, parseToAmount, parseToRate } from "@/lib/helper";
import { CENTUARI, METH_TOKEN, USDC_TOKEN } from "@/lib/tokenAddress";
import { IPosition, IVaultPositionProps } from "@/lib/types";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const BorrowPositionList = () => {
  const { address } = useAccount();
  const isMobile = useIsMobile();
  const { approve, error, isApproving } = useApproval();
  const [balances, setBalances] = useState<Record<string, string>>({});

  const [borrowData, setBorrowData] = useState<IPosition[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getBorrowPosition() {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/my-position/${address}/borrow`);
      if (!res.ok) return undefined;
      const resData = await res.json();
      setBorrowData(resData);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBorrowPosition();
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

  if (isLoading) {
    return <div className="rounded-md bg-gray-800 h-20 animate-pulse"></div>;
  }

  return (
    <AccordionItem
      value="item-2"
      className="border border-muted-dark/40 dark:border-muted-dark/40 px-4 rounded-md bg-card dark:bg-card-dark"
    >
      <AccordionTrigger className="text-start">
        <div>
          <h1>Borrow</h1>
          <p className="text-xs font-light">
            {borrowData.length <= 0
              ? "0 Position"
              : ` ${borrowData.length} ${
                  borrowData.length > 1 ? "Positions" : "Position"
                }`}
          </p>
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
              {borrowData.length > 0 ? (
                borrowData.map((item: IPosition, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TokenPair
                        loanToken={item.loan_token_symbol}
                        collateralToken={item.collateral_token}
                        loanTokenUrl={item.loan_token_image_uri}
                        collateralTokenUrl={item.collateral_token_image_uri}
                      />
                    </TableCell>
                    <TableCell>
                      {parseToAmount(item.shares)} {item.loan_token_symbol}
                    </TableCell>
                    <TableCell>${parseToAmount(item.shares)}</TableCell>
                    <TableCell>{parseToRate(item.rate)}%</TableCell>
                    <TableCell>{formatDate(item.maturity)}</TableCell>
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="flex flex-col gap-3 h-52 items-center justify-center">
                      <p>No Position Yet</p>
                      <Button variant={"colorful"}>View Lend</Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
