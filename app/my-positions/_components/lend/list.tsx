"use client";

import { TokenPair as TokenPairDesktop } from "@/components/token-pair";
import { TokenPair as TokenPairMobile } from "../token-pair";
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
import { useWithdrawLend } from "@/hooks/use-withdraw-lend";
import { formatDate, parseToAmount, parseToRate } from "@/lib/helper";
import { CENTUARI } from "@/lib/tokenAddress";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import { IPosition } from "@/lib/types";

export const LendPositionList = () => {
  const { address } = useAccount();
  const isMobile = useIsMobile();
  const { approve, error, isApproving } = useApproval();
  const [balances, setBalances] = useState<Record<string, string>>({});

  const [lendData, setLendData] = useState<IPosition[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getLendingPosition() {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/my-position/${address}/lending`);
      if (!res.ok) return undefined;
      const resData = await res.json();
      setLendData(resData);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getLendingPosition();
  }, []);

  const { withdrawLend } = useWithdrawLend({
    address: CENTUARI,
  });

  const handleWithdrawLend = async ({
    loanToken,
    collateralToken,
    shares,
    maturity,
    rate,
  }: {
    loanToken: `0x${string}`;
    collateralToken: `0x${string}`;
    shares: string;
    maturity: string;
    rate: string;
  }) => {
    await approve({
      amount: BigInt("83138790259"),
      spender: CENTUARI,
      address: loanToken as `0x${string}`,
    });
    await withdrawLend({
      loanToken,
      collateralToken,
      shares: BigInt(shares),
      maturity: BigInt(maturity),
      rate: BigInt(rate),
    });
  };

  if (isLoading) {
    return <div className="rounded-md bg-gray-800 h-20 animate-pulse"></div>;
  }

  return (
    <AccordionItem
      value="item-3"
      className="border border-muted-dark/40 dark:border-muted-dark/40 px-4 rounded-md bg-card dark:bg-card-dark"
    >
      <AccordionTrigger className="text-start">
        <div>
          <h1>Lend</h1>
          <p className="text-xs font-light">
            {lendData.length} {lendData.length > 1 ? "Positions" : "Position"}
          </p>
        </div>
      </AccordionTrigger>
      <AccordionContent className="border-t border-muted-dark/40 dark:border-muted-dark/40 pt-4">
        <div className="rounded-md border border-muted-dark/40 dark:border-muted-dark/40">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="md:w-[400px]">Assets</TableHead>
                <TableHead className="hidden md:table-cell">APY</TableHead>
                <TableHead>Maturity</TableHead>
                <TableHead>Supplied</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lendData.length > 0 ? (
                lendData.map((item: IPosition, index: number) => (
                  <TableRow key={index}>
                    <Link
                      href={`markets/${item.collateral_token}/${item.loan_token}`}
                    >
                      <TableCell>
                        {isMobile ? (
                          <TokenPairMobile
                            lendTokenUrl={item.loan_token_image_uri}
                            borrowTokenUrl={item.collateral_token_image_uri}
                          />
                        ) : (
                          <TokenPairDesktop
                            loanTokenUrl={item.loan_token_image_uri}
                            collateralTokenUrl={item.collateral_token_image_uri}
                            loanToken={item.loan_token_symbol}
                            collateralToken={item.collateral_token_symbol}
                          />
                        )}
                      </TableCell>
                    </Link>
                    <TableCell>{parseToRate(item.rate)}%</TableCell>
                    <TableCell>{formatDate(item.maturity)}</TableCell>
                    <TableCell>${parseToAmount(item.shares)}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Button
                        variant="colorful"
                        size="sm"
                        className="w-full"
                        onClick={() =>
                          handleWithdrawLend({
                            collateralToken:
                              item.collateral_token as `0x${string}`,
                            loanToken: item.loan_token as `0x${string}`,
                            maturity: item.maturity,
                            rate: item.rate,
                            shares: item.shares,
                          })
                        }
                      >
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
