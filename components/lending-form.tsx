"use client";

import type React from "react";

import { useEffect, useState } from "react";

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
import { usePlaceOrder } from "@/hooks/use-place-order";
import { useApproval } from "@/hooks/use-approval";
import { CENTUARI_CLOB } from "@/lib/tokenAddress";
import { useTokenBalance } from "@/hooks/use-token-balance";
import { parseToAmount, parseToRate } from "@/lib/helper";
import { ILendingMarketProps } from "@/lib/types";

export function LendingForm({ market }: ILendingMarketProps) {
  const [amount, setAmount] = useState("");
  const [fixedRate, setFixedRate] = useState(
    parseToRate(market.borrow_apy ? market.borrow_apy.toString() : "0")
  );
  const [activeTab, setActiveTab] = useState("market");
  const [estimatedEarnings, setEstimatedEarnings] = useState(0);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    if (isNaN(parseFloat(amount))) {
      setEstimatedEarnings(0);
    } else {
      const convertedAmount = parseFloat(amount);
      const convertedRate = parseFloat(fixedRate) / 100;
      setEstimatedEarnings(convertedAmount + convertedAmount * convertedRate);
    }
  }, [amount, fixedRate]);

  const { approve, error, isApproving } = useApproval();

  const { placeOrder: placeOrderLend, isSuccess } = usePlaceOrder({
    address: CENTUARI_CLOB as `0x${string}`,
  });

  const handleSubmitLend = async (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate amount as BigInt with proper decimal handling
    const amountInSmallestUnit = Math.floor(
      parseFloat(amount) * 10 ** market.loan_token.decimal
    );

    // Convert to BigInt by multiplying by 10^14 and handling as a string calculation
    // This helps avoid floating-point precision issues
    if (activeTab == "market") setFixedRate("0");
    const rateInSmallestUnit = Math.round(parseFloat(fixedRate) * 10 ** 16);

    console.log("test lending market", {
      amountInSmallestUnit,
      rateInSmallestUnit,
      loanToken: market.loan_token.address as `0x${string}`,
      collateralToken: market.collateral_token.address as `0x${string}`,
      amount: BigInt(amountInSmallestUnit),
      collateralAmount: BigInt("0"),
      maturity: BigInt(market.maturity),
      rate: BigInt(rateInSmallestUnit),
      side: 0,
    });

    await approve({
      amount: BigInt(amountInSmallestUnit),
      spender: CENTUARI_CLOB,
      address: market.loan_token.address as `0x${string}`,
    });

    await placeOrderLend({
      loanToken: market.loan_token.address as `0x${string}`,
      collateralToken: market.collateral_token.address as `0x${string}`,
      amount: BigInt(amountInSmallestUnit),
      collateralAmount: BigInt("0"),
      maturity: BigInt(market.maturity),
      rate: BigInt(rateInSmallestUnit),
      side: 0, // lend
    });

    setAmount("");
    setFixedRate("0");
  };

  const { balance } = useTokenBalance({
    tokenAddress: market.loan_token.address as `0x${string}`,
  });

  console.log("amout", amount);

  return (
    <Card className="card-colorful">
      <CardHeader>
        <CardTitle className="gradient-blue-text font-bold">Lend</CardTitle>
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
              className="text-slate-400 dark:text-white data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-700 data-[state=active]:to-blue-900 data-[state=active]:text-white"
            >
              Market Order
            </TabsTrigger>
            <TabsTrigger
              value="limit"
              className="text-slate-400 dark:text-white data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-700 data-[state=active]:to-red-900 data-[state=active]:text-white"
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
                      Balance:{" "}
                      {parseToAmount(
                        balance?.toString() ?? "0",
                        market.loan_token.decimal
                      )}{" "}
                      {market.loan_token.symbol}
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
                      className="bg-blue-500 hover:bg-blue-200 text-white dark:hover:bg-blue-500 bg-gradient-to-br from-blue-700 to-blue-900"
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
                      {parseToRate(
                        market.borrow_apy ? market.borrow_apy.toString() : "0"
                      )}
                      %
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Estimated earnings
                    </span>
                    <span className="font-medium text-teal">
                      {parseToAmount(estimatedEarnings.toString(), 0, 2, false)}{" "}
                      {market.loan_token.symbol}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                type="button"
                className="mt-6 w-full"
                variant="colorful"
                onClick={handleSubmitLend}
                disabled={amount === "" && Number(amount) === 0 ? true : false}
              >
                Create Market Order
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
                      onChange={(e) =>
                        setFixedRate(parseFloat(e.target.value).toString())
                      }
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
                      Balance:{" "}
                      {parseToAmount(
                        balance?.toString() ?? "0",
                        market.loan_token.decimal
                      )}{" "}
                      {market.loan_token.symbol}
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
                      className="bg-red-500 hover:bg-red-200 dark:bg-red-600 text-white dark:hover:bg-red-500 bg-gradient-to-br from-red-700 to-red-900"
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
                    <span className="font-medium text-teal">{fixedRate}%</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Estimated earnings
                    </span>
                    <span className="font-medium text-teal">
                      {parseToAmount(estimatedEarnings.toString(), 0, 2, false)}{" "}
                      {market.loan_token.symbol}
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
