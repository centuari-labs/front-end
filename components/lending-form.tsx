"use client";

import type React from "react";

import { useState } from "react";
import { Info, HelpCircle } from "lucide-react";

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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePlaceOrder } from "@/hooks/use-place-order";
import { useAccount } from "wagmi";

interface LendingFormProps {
  market: {
    id: string;
    name: string;
    lending_apy: number;
    marketVolume: number;
    collateralFactor: number;
    fixedRate: boolean;
  };
  // fixedRate: number;
  // handleFixRatedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LendingForm({
  market,
}: // fixedRate,
// handleFixRatedChange,
LendingFormProps) {
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState(30);
  const [isCollateral, setIsCollateral] = useState(true);
  const [isTokenized, setIsTokenized] = useState(false);
  const [customRate, setCustomRate] = useState(market.lending_apy.toString());
  const [rateType, setRateType] = useState("market");
  const [activeTab, setActiveTab] = useState("market");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleCustomRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomRate(e.target.value);
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // In a real app, we would submit the lending order here
  //   console.log({
  //     amount,
  //     duration,
  //     isCollateral,
  //     isTokenized,
  //     orderType: activeTab,
  //     customRate: rateType === "custom" ? customRate : null,
  //   });

  //   if (activeTab === "market") {
  //     alert(
  //       `Market order submitted for ${amount}
  //       at market rate`
  //     );
  //   } else {
  //     alert(`Limit order submitted for ${amount} at ${customRate}% APY`);
  //   }
  // };

  // // Calculate estimated earnings based on amount, APY, and duration
  // const rateToUse =
  //   rateType === "custom"
  //     ? Number.parseFloat(customRate) || market.lending_apy
  //     : market.lending_apy;
  // const estimatedEarnings = amount
  //   ? (
  //       Number.parseFloat(amount) *
  //       (rateToUse / 100) *
  //       (duration / 365)
  //     ).toFixed(2)
  //   : "0.00";

  const { address } = useAccount();

  const {
    placeOrder: placeOrderLend,
    isPending: isPendingLend,
    isSuccess: isSuccessLend,
    isError: isErrorLend,
    simulateError: simulateErrorLend,
    writeError: writeErrorLend,
    txHash: txHashLend,
  } = usePlaceOrder({
    address: address as `0x${string}`,
    config: {
      amount: BigInt(1194095083),
      collateralAmount: BigInt("1135561116146701431"),
      collateralToken: "0x16bd2f7d7ea5f85dd089f41bf6d5be7d70e1e546",
      loanToken: "0x3cfc20f01894017817ad1299890182d65a62bad4",
      maturity: BigInt(1776948836),
      rate: BigInt("10000000000000000"),
      side: 0,
    },
  });

  const {
    placeOrder: placeOrderBorrow,
    isPending,
    isSuccess,
    isError,
    simulateError,
    writeError,
    txHash,
  } = usePlaceOrder({
    address: address as `0x${string}`,
    config: {
      amount: BigInt(1194095083),
      collateralAmount: BigInt("1135561116146701431"),
      collateralToken: "0x16bd2f7d7ea5f85dd089f41bf6d5be7d70e1e546",
      loanToken: "0x3cfc20f01894017817ad1299890182d65a62bad4",
      maturity: BigInt(1776948836),
      rate: BigInt("10000000000000000"),
      side: 1,
    },
  });

  const handleSubmitLend = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrderLend();
  };

  const handleSubmitBorrow = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrderLend();
  };

  return (
    <Card className="card-colorful">
      <CardHeader>
        <CardTitle className="gradient-blue-text font-bold">
          {/* Lend {market.name} */}
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
                      {/* Balance: 1,000 {market.name.split("/")[0]} */}
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
                      onClick={() => setAmount("1000")}
                    >
                      MAX
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg bg-muted/10 dark:bg-slate-900/40 p-4 border border-border dark:border-white/20">
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Estimated earnings
                    </span>
                    <span className="font-medium text-teal">
                      {/* {estimatedEarnings} {market.name.split("/")[0]} */}
                    </span>
                  </div>
                  {/* <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Collateral factor
                    </span>
                    <span className="font-medium">
                      {market.collateralFactor}%
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
                  </div> */}
                </div>
              </div>

              <Button
                type="button"
                className="mt-6 w-full"
                variant="colorful"
                onClick={handleSubmitLend}
              >
                {/* Lend {market.name.split("/")[0]} */}
                Lend
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="limit" className="mt-4">
            <form>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  {/* Fix Rate Input */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="fixed-rate">Fixed Rate</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      id="fixed-rate"
                      placeholder="0.00"
                      // value={fixedRate}
                      // onChange={handleFixRatedChange}
                      className="flex-1 border-input"
                      type="number"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="limit-amount">Amount</Label>
                    <span className="text-xs text-muted-foreground dark:text-muted-dark">
                      {/* Balance: 1,000 {market.name.split("/")[0]} */}
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
                      onClick={() => setAmount("1000")}
                    >
                      MAX
                    </Button>
                  </div>
                </div>
                {/* <div className="grid gap-2">
                  <Label htmlFor="rate-type">Interest Rate</Label>
                  <RadioGroup
                    value={rateType}
                    onValueChange={setRateType}
                    className="grid gap-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="market"
                        id="market-rate"
                        className="border-blue text-blue"
                      />
                      <Label
                        htmlFor="market-rate"
                        className="flex items-center gap-2"
                      >
                        Market Rate ({market.lendingAPY}%)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="custom"
                        id="custom-rate"
                        className="border-coral text-coral"
                      />
                      <Label
                        htmlFor="custom-rate"
                        className="flex items-center gap-2"
                      >
                        Custom Rate
                      </Label>
                    </div>
                  </RadioGroup>
                </div> */}

                {rateType === "custom" && (
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="custom-rate-input">Your Rate (%)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5"
                            >
                              <HelpCircle className="h-3 w-3" />
                              <span className="sr-only">Help</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Set your own lending rate. Higher rates may take
                              longer to match with borrowers.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="custom-rate-input"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Enter APY %"
                      value={customRate}
                      onChange={handleCustomRateChange}
                      className="border-input"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground dark:text-muted-dark">
                      <span>Market rate: {market.lending_apy}%</span>
                      <span>Your rate: {customRate}%</span>
                    </div>
                  </div>
                )}

                <div className="rounded-lg bg-muted/10 dark:bg-slate-900/40 p-4 border border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Fixed Rate
                    </span>
                    <span className="font-medium text-teal">
                      {/* {isNaN(fixedRate) ? 0 : fixedRate}% */}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-muted-dark">
                      Estimated earnings
                    </span>
                    <span className="font-medium text-teal">
                      {/* {estimatedEarnings} {market.name.split("/")[0]} */}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                type="button"
                className="mt-6 w-full"
                variant="colorful"
                onClick={handleSubmitBorrow}
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
