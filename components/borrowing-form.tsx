"use client";

import type React from "react";

import { useState } from "react";

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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface BorrowingFormProps {
  market: {
    id: string;
    name: string;
    borrowingAPY: number;
    ltv: number;
    liquidationThreshold: number;
    fixedRate: boolean;
  };
  fixedRate: number;
  handleFixRatedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BorrowingForm({
  market,
  fixedRate,
  handleFixRatedChange,
}: BorrowingFormProps) {
  const [collateralAmount, setCollateralAmout] = useState("");
  const [borrowAmount, setBorrowAmount] = useState("");
  const [duration, setDuration] = useState(30);
  const [activeTab, setActiveTab] = useState("market");

  const handleCollateralAmoutChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCollateralAmout(e.target.value);
  };

  const handleBorrowAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBorrowAmount(e.target.value);
  };

  const handleDurationChange = (value: number[]) => {
    setDuration(value[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would submit the borrowing order here
    alert(
      `Borrowing order submitted for ${collateralAmount} ${
        market.name.split("/")[0]
      }`
    );
  };

  // Calculate estimated cost based on amount, APY, and duration
  // const estimatedCost = collateral
  //   ? (
  //       Number.parseFloat(collateral) *
  //       (market.borrowingAPY / 100) *
  //       (duration / 365)
  //     ).toFixed(2)
  //   : "0.00";

  // Mock data for available collateral and borrowing power
  // const availableCollateral = 10000;
  // const borrowingPower = 7500;
  // const maxBorrowAmount = 5000;
  // const currentBorrowAmount = amount ? Number.parseFloat(amount) : 0;
  // const healthFactor =
  //   currentBorrowAmount > 0
  //     ? ((borrowingPower - currentBorrowAmount) / borrowingPower) * 2 + 1
  //     : 2;

  return (
    <Card className="card-colorful">
      <CardHeader>
        <CardTitle className="gradient-coral-text font-bold">
          Borrow {market.name}
        </CardTitle>
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
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="rounded-lg bg-muted/10 dark:bg-slate-900/40 p-4 border border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Available Collateral
                    </span>
                    <span className="font-medium">
                      {/* ${availableCollateral.toLocaleString()} */}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Borrowing Power
                    </span>
                    <span className="font-medium">
                      {/* ${borrowingPower.toLocaleString()} */}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Max Borrow Amount
                    </span>
                    <span className="font-medium">
                      {/* ${maxBorrowAmount.toLocaleString()} */}
                    </span>
                  </div>
                </div>
                {/* Collateral */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="collateral">Collateral</Label>
                    <span className="text-xs text-muted-foreground dark:text-muted-dark">
                      Max: 1222.00
                      {market.name.split("/")[0]}
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
                      // onClick={() => setCollateral(maxBorrowAmount.toString())}
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
                      Max: 2222.00
                      {market.name.split("/")[0]}
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
                      // onClick={() => setAmount(maxBorrowAmount.toString())}
                    >
                      MAX
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg bg-muted/10 dark:bg-slate-900/40 p-4 border border-border">
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Estimated cost
                    </span>
                    <span className="font-medium">
                      {/* {estimatedCost} {market.name.split("/")[0]} */}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Liquidation threshold
                    </span>
                    <span className="font-medium">
                      {market.liquidationThreshold}%
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Rate type
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-blue/10 text-blue border-blue/30"
                    >
                      Fixed
                    </Badge>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground dark:text-muted-dark">
                        Health Factor
                      </span>
                      {/* <span
                        className={`text-sm font-medium ${
                          healthFactor < 1.1
                            ? "text-coral"
                            : healthFactor < 1.5
                            ? "text-amber"
                            : "text-teal"
                        }`}
                      >
                        {healthFactor.toFixed(2)}
                      </span> */}
                    </div>
                    {/* <Progress
                      value={Math.min((healthFactor / 2) * 100, 100)}
                      className={
                        healthFactor < 1.1
                          ? "bg-coral"
                          : healthFactor < 1.5
                          ? "bg-amber"
                          : "bg-teal"
                      }
                    /> */}
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground dark:text-muted-dark">
                      <span>Liquidation</span>
                      <span>Safe</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="mt-6 w-full" variant="colorful">
                Borrow {market.name.split("/")[0]}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="limit" className="mt-4">
            {/* <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground dark:text-muted-dark">
                As a borrower, you can browse available lending offers in the
                order book and accept them directly.
              </p>
              <p className="mt-2 text-sm text-muted-foreground dark:text-muted-dark">
                Select an offer from the order book tab to borrow at a fixed
                rate set by lenders.
              </p>
            </div> */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="rounded-lg bg-muted/10 dark:bg-slate-900/40 p-4 border border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Available Collateral
                    </span>
                    <span className="font-medium">
                      {/* ${availableCollateral.toLocaleString()} */}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Borrowing Power
                    </span>
                    <span className="font-medium">
                      {/* ${borrowingPower.toLocaleString()} */}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Max Borrow Amount
                    </span>
                    <span className="font-medium">
                      {/* ${maxBorrowAmount.toLocaleString()} */}
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
                      onChange={handleFixRatedChange}
                      className="flex-1 border-input"
                      type="number"
                    />
                  </div>
                </div>
                {/* Collateral */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="collateral">Collateral</Label>
                    <span className="text-xs text-muted-foreground dark:text-muted-dark">
                      Max: 1222.00
                      {market.name.split("/")[0]}
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
                      className="bg-red-500 hover:bg-red-200 dark:bg-red-600 text-white dark:hover:bg-red-500"
                      size="sm"
                      // onClick={() => setCollateral(maxBorrowAmount.toString())}
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
                      Max: 2222.00
                      {market.name.split("/")[0]}
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
                      className="bg-red-500 hover:bg-red-200 dark:bg-red-600 text-white dark:hover:bg-red-500"
                      size="sm"
                      // onClick={() => setAmount(maxBorrowAmount.toString())}
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
                      {isNaN(fixedRate) ? 0 : fixedRate}%
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Estimated cost
                    </span>
                    <span className="font-medium">
                      {/* {estimatedCost} {market.name.split("/")[0]} */}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Liquidation threshold
                    </span>
                    <span className="font-medium">
                      {market.liquidationThreshold}%
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Rate type
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-blue/10 text-blue border-blue/30"
                    >
                      Fixed
                    </Badge>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground dark:text-muted-dark">
                        Health Factor
                      </span>
                      {/* <span
                        className={`text-sm font-medium ${
                          healthFactor < 1.1
                            ? "text-coral"
                            : healthFactor < 1.5
                            ? "text-amber"
                            : "text-teal"
                        }`}
                      >
                        {healthFactor.toFixed(2)}
                      </span> */}
                    </div>
                    {/* <Progress
                      value={Math.min((healthFactor / 2) * 100, 100)}
                      className={
                        healthFactor < 1.1
                          ? "bg-coral"
                          : healthFactor < 1.5
                          ? "bg-amber"
                          : "bg-teal"
                      }
                    /> */}
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground dark:text-muted-dark">
                      <span>Liquidation</span>
                      <span>Safe</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="mt-6 w-full" variant="colorful">
                Borrow {market.name.split("/")[0]}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
