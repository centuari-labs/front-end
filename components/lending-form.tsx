"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { HelpCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePlaceOrder } from "@/hooks/use-place-order";
import { useAccount } from "wagmi";
import { useApproval } from "@/hooks/use-approval";
import { CENTUARI_CLOB } from "@/lib/tokenAddress";
import { useTokenBalance } from "@/hooks/use-token-balance";
import { parseToAmount, parseToRate } from "@/lib/helper";

interface LendingFormProps {
  market: {
    id: string;
    name: string;
    lending_apy: number;
    marketVolume: number;
    collateralFactor: number;
    fixedRate: boolean;
    borrow_apy: number;
    loan_token: {
      address: string;
      name: string;
      image_uri: string;
      decimal: number;
      symbol: string;
    },
    collateral_token: {
      address: string;
      name: string;
      image_uri: string;
      decimal: number;
      symbol: string;
    },
    maturity: number;
  };
}

export function LendingForm({
  market,
}:
LendingFormProps) {
  const [amount, setAmount] = useState("");
  const [fixedRate, setFixedRate] = useState(parseToRate(market.borrow_apy.toString()));
  const [activeTab, setActiveTab] = useState("market");
  const [estimatedEarnings, setEstimatedEarnings] = useState(0);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    if(isNaN(parseFloat(amount))){
      setEstimatedEarnings(0);
    }else{
      const convertedAmount = parseFloat(amount);
      const convertedRate = parseFloat(fixedRate) / 100;
      setEstimatedEarnings(convertedAmount + (convertedAmount * convertedRate));
    }
  }, [amount, fixedRate]);

  const { approve, error, isApproving } = useApproval();

  const {  placeOrder: placeOrderLend, isSuccess } = usePlaceOrder({
    address: CENTUARI_CLOB as `0x${string}`,
  });

  // Effect to set customRate to 0 when activeTab is "market"
  useEffect(() => {
    if (activeTab === "market") {
      setFixedRate(parseToRate(market.borrow_apy.toString()));
    }
  }, [activeTab]);

  const handleSubmitLend = async (e: React.FormEvent) => {
    e.preventDefault();
    await approve({
      amount: BigInt(parseFloat(amount) * 10 ** market.loan_token.decimal),
      spender: CENTUARI_CLOB,
      address: market.loan_token.address as `0x${string}`,
    });
    await placeOrderLend({
      loanToken: market.loan_token.address as `0x${string}`,
      collateralToken: market.collateral_token.address as `0x${string}`,
      amount: BigInt(parseFloat(amount) * 10 ** market.loan_token.decimal),
      collateralAmount: BigInt("0"),
      maturity: BigInt(market.maturity),
      rate: BigInt(parseFloat(fixedRate) * 10 ** 14),
      side: 0, // lend
    });

    setAmount("");
    setFixedRate(parseToRate(market.borrow_apy.toString()));
  };

  const { balance } = useTokenBalance({
    tokenAddress: market.loan_token.address as `0x${string}`,
  });

  return (
    <Card className="card-colorful">
      <CardHeader>
        <CardTitle className="gradient-blue-text font-bold">
          Lend
        </CardTitle>
        <CardDescription>Supply assets and earn interest</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="market"
          className="w-full"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList className="grid w-full grid-cols-2 md:w-auto bg-muted dark:bg-gray-800">
            <TabsTrigger
              value="market"
              className="text-slate-400 dark:text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600"
            >
              Market Order
            </TabsTrigger>
            <TabsTrigger
              value="limit"
              className="text-slate-400 dark:text-white data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600"
            >
              Limit Order
            </TabsTrigger>
          </TabsList>
          <TabsContent value="market" className="mt-4">
            <form>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="amount">Amount</Label>
                    <span className="text-xs text-muted-foreground dark:text-muted-dark">
                      Balance: {parseToAmount(balance?.toString() ?? "0", market.loan_token.decimal)} {market.loan_token.symbol}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      id="amount"
                      placeholder="0.00"
                      value={amount}
                      onChange={handleAmountChange}
                      className="flex-1 border-input"
                    />
                    <Button
                      type="button"
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-200 dark:bg-blue-600 text-white dark:hover:bg-blue-500"
                      onClick={() => setAmount(balance?.toString() ?? "0")}
                    >
                      MAX
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg bg-muted/10 dark:bg-slate-900/40 p-4 border border-border dark:border-white/20">
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Highest Borrow Rate
                    </span>
                    <span className="font-medium text-teal">
                      {parseToRate(market.borrow_apy.toString())}%
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Estimated earnings
                    </span>
                    <span className="font-medium text-teal">
                      {parseToAmount(estimatedEarnings.toString(), 0, 2, false)} {market.loan_token.symbol}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                type="button"
                className="mt-6 w-full"
                variant="colorful"
                onClick={handleSubmitLend}
              >
                Lend
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="limit" className="mt-4">
            <form>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="fixed-rate">Fixed Rate</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      id="fixed-rate"
                      placeholder="0.00"
                      value={fixedRate}
                      onChange={(e) => setFixedRate(parseFloat(e.target.value).toString())}
                      className="flex-1 border-input"
                      type="number"
                      min="0.01"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="limit-amount">Amount</Label>
                    <span className="text-xs text-muted-foreground dark:text-muted-dark">
                      Balance: {parseToAmount(balance?.toString() ?? "0", market.loan_token.decimal)} {market.loan_token.symbol}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      id="limit-amount"
                      placeholder="0.00"
                      value={amount}
                      onChange={handleAmountChange}
                      className="flex-1 border-input"
                    />
                    <Button
                      type="button"
                      size="sm"
                      className="bg-red-500 hover:bg-red-200 dark:bg-red-600 text-white dark:hover:bg-red-500"
                      onClick={() => setAmount(balance?.toString() ?? "0")}
                    >
                      MAX
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg bg-muted/10 dark:bg-slate-900/40 p-4 border border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Fixed Rate
                    </span>
                    <span className="font-medium text-teal">
                      {fixedRate}%
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Estimated earnings
                    </span>
                    <span className="font-medium text-teal">
                      {parseToAmount(estimatedEarnings.toString(), 0, 2, false)} {market.loan_token.symbol}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                type="button"
                className="mt-6 w-full"
                variant="colorful"
                onClick={handleSubmitLend}
              >
                Create Limit Order
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
