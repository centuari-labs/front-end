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
import { useWithdrawCurator } from "@/hooks/use-withdraw-curator";
import { VaultPositionList } from "./vault/list";
import { LendPositionList } from "./lend/list";
import { BorrowPositionList } from "./borrow/list";

const PositionList = () => {
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
      <BorrowPositionList />
      <LendPositionList />
    </Accordion>
  );
};

export default PositionList;
