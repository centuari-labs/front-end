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
import { CENTUARI_CLOB } from "@/lib/tokenAddress";
import { useApproval } from "@/hooks/use-approval";
import { usePlaceOrder } from "@/hooks/use-place-order";
import { parseToRate } from "@/lib/helper";

import { useTokenBalance } from "@/hooks/use-token-balance";
import { parseToAmount, getCollateralPrice } from "@/lib/helper";
import { ILendingMarketProps } from "@/lib/types";

export function BorrowingForm({ market }: ILendingMarketProps) {
  const [collateralAmount, setCollateralAmout] = useState("");
  const [borrowAmount, setBorrowAmount] = useState("");
  const [activeTab, setActiveTab] = useState("market");
  const [maxBorrowAmount, setMaxBorrowAmount] = useState(0);
  const [healthFactor, setHealthFactor] = useState(0);

  const [fixedRate, setFixedRate] = useState(
    parseToRate(market.borrow_apy ? market.borrow_apy.toString() : "0")
  );

  const { approve, error, isApproving } = useApproval();

  const { placeOrder: placeOrderBorrow, isSuccess } = usePlaceOrder({
    address: CENTUARI_CLOB as `0x${string}`,
  });

  const handleCollateralAmoutChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCollateralAmout(e.target.value);
  };

  const handleBorrowAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBorrowAmount(e.target.value);
  };

  const { balance: collateralBalance } = useTokenBalance({
    tokenAddress: market.collateral_token.address as `0x${string}`,
  });

  useEffect(() => {
    if (activeTab === "market") {
      setFixedRate("0");
    }
  }, [activeTab]);

  useEffect(() => {
    const collateralPrice =
      parseFloat(collateralAmount) *
      getCollateralPrice(market.collateral_token.symbol);

    const amountInSmallestUnit = Math.floor(parseFloat(borrowAmount));

    const healthFactor = collateralPrice / amountInSmallestUnit;
    setHealthFactor(healthFactor ? healthFactor : 0);
  }, [borrowAmount, collateralAmount]);

  useEffect(() => {
    const collateralPriceInToken = Number(
      BigInt(collateralBalance || 0) /
        BigInt(10 ** market.collateral_token.decimal)
    );

    const collateralPrice =
      collateralPriceInToken *
      getCollateralPrice(market.collateral_token.symbol);
    const maxBorrowAmount =
      (collateralPrice * parseFloat(parseToRate(market.lltv.toString()))) / 100;
    setMaxBorrowAmount(maxBorrowAmount);
  }, [collateralBalance]);

  const handleSubmitBorrow = async (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate amount as BigInt with proper decimal handling
    const amountInSmallestUnit = Math.floor(
      parseFloat(borrowAmount) * 10 ** market.loan_token.decimal
    );

    const collateralAmountInSmallestUnit = Math.floor(
      parseFloat(collateralAmount) * 10 ** market.collateral_token.decimal
    );

    // Convert to BigInt by multiplying by 10^14 and handling as a string calculation
    // This helps avoid floating-point precision issues
    const rateInSmallestUnit = Math.round(parseFloat(fixedRate) * 10 ** 16);

    await approve({
      amount: BigInt(collateralAmountInSmallestUnit),
      spender: CENTUARI_CLOB,
      address: market.collateral_token.address as `0x${string}`,
    });

    await placeOrderBorrow({
      loanToken: market.loan_token.address as `0x${string}`,
      collateralToken: market.collateral_token.address as `0x${string}`,
      amount: BigInt(amountInSmallestUnit),
      collateralAmount: BigInt(collateralAmountInSmallestUnit),
      maturity: BigInt(market.maturity),
      rate: BigInt(rateInSmallestUnit),
      side: 1, // borrow
    });

    setBorrowAmount("");
    setCollateralAmout("");
    setFixedRate(parseToRate(market.borrow_apy.toString()));
  };

  return (
    <Card className="card-colorful">
      <CardHeader>
        <CardTitle className="gradient-coral-text font-bold">Borrow</CardTitle>
        <CardDescription>Borrow assets using your collateral</CardDescription>
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
                <div className="rounded-lg bg-muted/10 dark:bg-slate-900/40 p-4 border border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Available Collateral
                    </span>
                    <span className="font-medium">
                      {parseToAmount(
                        collateralBalance?.toString() ?? "0",
                        market.collateral_token.decimal
                      )}{" "}
                      {market.collateral_token.symbol}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Max Borrow Amount
                    </span>
                    <span className="font-medium">
                      {parseToAmount(
                        maxBorrowAmount.toString(),
                        market.loan_token.decimal
                      )}{" "}
                      {market.loan_token.symbol}
                    </span>
                  </div>
                </div>
                {/* Collateral */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="collateral">Collateral</Label>
                    <span className="text-xs text-muted-foreground dark:text-muted-dark">
                      Max:{" "}
                      {collateralBalance ? collateralBalance.toString() : "0"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      id="collateral"
                      placeholder="0.00"
                      value={collateralAmount}
                      onChange={handleCollateralAmoutChange}
                      className="flex-1 border-input"
                    />
                    <Button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-200 dark:bg-blue-600 text-white dark:hover:bg-blue-500"
                      size="sm"
                      onClick={() => {
                        setCollateralAmout(
                          collateralBalance ? collateralBalance.toString() : "0"
                        );
                      }}
                    >
                      MAX
                    </Button>
                  </div>
                </div>
                {/* Borrow */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="borrowAmount">Borrow</Label>
                    <span className="text-xs text-muted-foreground dark:text-muted-dark">
                      Max:{" "}
                      {collateralBalance ? collateralBalance.toString() : "0"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      id="borrowAmount"
                      placeholder="0.00"
                      value={borrowAmount}
                      onChange={handleBorrowAmountChange}
                      className="flex-1 border-input"
                    />
                    <Button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-200 dark:bg-blue-600 text-white dark:hover:bg-blue-500"
                      size="sm"
                      onClick={() => {
                        setCollateralAmout(
                          collateralBalance ? collateralBalance.toString() : "0"
                        );
                      }}
                    >
                      MAX
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg bg-muted/10 dark:bg-slate-900/40 p-4 border border-border">
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      LLTV
                    </span>
                    <span className="font-medium">
                      {parseToRate(market.lltv.toString())}%
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Collateral Price
                    </span>
                    <span className="font-medium">
                      {parseFloat(collateralAmount) > 0
                        ? parseToAmount(
                            (
                              getCollateralPrice(
                                market.collateral_token.symbol
                              ) * parseFloat(collateralAmount)
                            ).toString(),
                            0
                          )
                        : "0"}{" "}
                      {market.loan_token.symbol}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground dark:text-muted-dark">
                        Health Factor
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          healthFactor < 1.1
                            ? "text-coral"
                            : healthFactor < 1.5
                            ? "text-amber"
                            : "text-teal"
                        }`}
                      >
                        {healthFactor}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="mt-6 w-full"
                variant="colorful"
                disabled={borrowAmount === "" || isApproving}
                onClick={handleSubmitBorrow}
              >
                Borrow
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="limit" className="mt-4">
            <form>
              <div className="grid gap-4">
                <div className="rounded-lg bg-muted/10 dark:bg-slate-900/40 p-4 border border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Available Collateral
                    </span>
                    <span className="font-medium">
                      {parseToAmount(
                        collateralBalance?.toString() ?? "0",
                        market.collateral_token.decimal
                      )}{" "}
                      {market.collateral_token.symbol}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Max Borrow Amount
                    </span>
                    <span className="font-medium">
                      {parseToAmount(
                        maxBorrowAmount.toString(),
                        market.loan_token.decimal
                      )}{" "}
                      {market.loan_token.symbol}
                    </span>
                  </div>
                </div>
                <div className="grid gap-2">
                  {/* Fix Rate Input */}
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
                {/* Collateral */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="collateral">Collateral</Label>
                    <span className="text-xs text-muted-foreground dark:text-muted-dark">
                      Max:{" "}
                      {collateralBalance ? collateralBalance.toString() : "0"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      id="collateral"
                      placeholder="0.00"
                      value={collateralAmount}
                      onChange={handleCollateralAmoutChange}
                      className="flex-1 border-input"
                    />
                    <Button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-200 dark:bg-blue-600 text-white dark:hover:bg-blue-500"
                      size="sm"
                      onClick={() => {
                        setCollateralAmout(
                          collateralBalance ? collateralBalance.toString() : "0"
                        );
                      }}
                    >
                      MAX
                    </Button>
                  </div>
                </div>
                {/* Borrow */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="borrowAmount">Borrow</Label>
                    <span className="text-xs text-muted-foreground dark:text-muted-dark">
                      Max:{" "}
                      {collateralBalance ? collateralBalance.toString() : "0"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      id="borrowAmount"
                      placeholder="0.00"
                      value={borrowAmount}
                      onChange={handleBorrowAmountChange}
                      className="flex-1 border-input"
                    />
                    <Button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-200 dark:bg-blue-600 text-white dark:hover:bg-blue-500"
                      size="sm"
                      onClick={() => {
                        setCollateralAmout(
                          collateralBalance ? collateralBalance.toString() : "0"
                        );
                      }}
                    >
                      MAX
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg bg-muted/10 dark:bg-slate-900/40 p-4 border border-border">
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      LLTV
                    </span>
                    <span className="font-medium">
                      {parseToRate(market.lltv.toString())}%
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Collateral Price
                    </span>
                    <span className="font-medium">
                      {parseFloat(collateralAmount) > 0
                        ? parseToAmount(
                            (
                              getCollateralPrice(
                                market.collateral_token.symbol
                              ) * parseFloat(collateralAmount)
                            ).toString(),
                            0
                          )
                        : "0"}{" "}
                      {market.loan_token.symbol}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground dark:text-muted-dark">
                        Health Factor
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          healthFactor < 1.1
                            ? "text-coral"
                            : healthFactor < 1.5
                            ? "text-amber"
                            : "text-teal"
                        }`}
                      >
                        {healthFactor}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="mt-6 w-full"
                variant="colorful"
                disabled={borrowAmount === "" || isApproving}
                onClick={handleSubmitBorrow}
              >
                Borrow
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
