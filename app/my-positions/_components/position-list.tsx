"use client";

import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TokenPair } from "./token-pair";
import { marketData } from "@/lib/data";
import { useRepay } from "@/hooks/use-repay";
import { CENTUARI, METH_TOKEN, USDC_TOKEN } from "@/lib/tokenAddress";
import { useApproval } from "@/hooks/use-approval";
import { useWithdrawBorrow } from "@/hooks/use-withdraw-borrow";
import { useWithdrawLend } from "@/hooks/use-withdraw-lend";
import { useAccount } from "wagmi";
import { useWithdrawCurator } from "@/hooks/use-withdraw-curator";
import { VaultPositionList } from "./vault/list";

const PositionList = () => {
  const { address } = useAccount();
  const [lendingData, setLendingData] = useState([]);

  async function getLendingData() {
    const res = await fetch(`/api/my-position/${address}/lending`);
    if (!res.ok) return undefined;
    const resData = await res.json();
    setLendingData(resData);
  }

  useEffect(() => {
    getLendingData();
  }, []);

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

  const { withdrawLend } = useWithdrawLend({
    address: CENTUARI,
    config: {
      loanToken: USDC_TOKEN,
      collateralToken: METH_TOKEN,
      shares: BigInt("1194"), // contoh 1194 USDC
      maturity: BigInt(1753981200),
      rate: BigInt("60000000000000000"),
    },
  });

  const { withdrawCurator } = useWithdrawCurator({
    address: CENTUARI,
    config: {
      curator: USDC_TOKEN,
      token: METH_TOKEN,
      name: "name",
      shares: BigInt("1194"), // contoh 1194 USDC
    },
  });

  const { approve, error, isApproving } = useApproval();

  const handleRepaySubmit = async () => {
    await approve({
      amount: BigInt("83138790259"),
      spender: CENTUARI,
      address: USDC_TOKEN as `0x${string}`,
    });
    await repay();
  };

  const handleWitdrawBorrow = async () => {
    await approve({
      amount: BigInt("83138790259"),
      spender: CENTUARI,
      address: USDC_TOKEN as `0x${string}`,
    });
    await withdrawBorrow();
  };

  const handleWithdrawLend = async () => {
    await approve({
      amount: BigInt("83138790259"),
      spender: CENTUARI,
      address: USDC_TOKEN as `0x${string}`,
    });
    await withdrawLend();
  };

  const handleWithdrawCurator = async () => {
    await approve({
      amount: BigInt("83138790259"),
      spender: CENTUARI,
      address: USDC_TOKEN as `0x${string}`,
    });
    await withdrawCurator();
  };

  return (
    <Accordion type="multiple" className="w-full space-y-4">
      <VaultPositionList />

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
                  <TableHead>Borrowed</TableHead>
                  <TableHead className="hidden md:table-cell">Value</TableHead>
                  <TableHead className="hidden md:table-cell">APY</TableHead>
                  <TableHead>Collateral</TableHead>
                  <TableHead>Maturity</TableHead>
                  <TableHead>Health Factor</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <TokenPair
                      lendToken={marketData[0].lend_token}
                      collateralToken={marketData[0].collateral_token}
                      lendTokenUrl={marketData[0].lendTokenUrl}
                      borrowTokenUrl={marketData[0].borrowTokenUrl}
                      pairName={marketData[0].name}
                      marketTrending={marketData[0].trending}
                    />
                  </TableCell>
                  <TableCell>2.5 ETH</TableCell>
                  <TableCell>$5,000</TableCell>
                  <TableCell>-5.15%</TableCell>
                  <TableCell>USDT</TableCell>
                  <TableCell>September 30, 2023</TableCell>
                  <TableCell>1.85</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Button
                      variant={"destructive"}
                      size="sm"
                      className="w-full"
                      onClick={handleRepaySubmit}
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
                    <TokenPair
                      lendToken={marketData[0].lend_token}
                      collateralToken={marketData[0].collateral_token}
                      lendTokenUrl={marketData[0].lendTokenUrl}
                      borrowTokenUrl={marketData[0].borrowTokenUrl}
                      pairName={marketData[0].name}
                      marketTrending={marketData[0].trending}
                    />
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
                      onClick={handleRepaySubmit}
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
    </Accordion>
  );
};

export default PositionList;
