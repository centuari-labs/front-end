"use client"

import type React from "react"

import { useState } from "react"
import { Info, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface LendingFormProps {
  market: {
    id: string
    name: string
    lendingAPY: number
    totalSupply: number
    collateralFactor: number
    fixedRate: boolean
  }
}

export function LendingForm({ market }: LendingFormProps) {
  const [amount, setAmount] = useState("")
  const [duration, setDuration] = useState(30)
  const [isCollateral, setIsCollateral] = useState(true)
  const [isTokenized, setIsTokenized] = useState(false)
  const [customRate, setCustomRate] = useState(market.lendingAPY.toString())
  const [rateType, setRateType] = useState("market")
  const [activeTab, setActiveTab] = useState("market")

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }

  const handleDurationChange = (value: number[]) => {
    setDuration(value[0])
  }

  const handleCustomRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomRate(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would submit the lending order here
    console.log({
      amount,
      duration,
      isCollateral,
      isTokenized,
      orderType: activeTab,
      customRate: rateType === "custom" ? customRate : null,
    })

    if (activeTab === "market") {
      alert(`Market order submitted for ${amount} ${market.name.split("/")[0]} at market rate`)
    } else {
      alert(`Limit order submitted for ${amount} ${market.name.split("/")[0]} at ${customRate}% APY`)
    }
  }

  // Calculate estimated earnings based on amount, APY, and duration
  const rateToUse = rateType === "custom" ? Number.parseFloat(customRate) || market.lendingAPY : market.lendingAPY
  const estimatedEarnings = amount
    ? (Number.parseFloat(amount) * (rateToUse / 100) * (duration / 365)).toFixed(2)
    : "0.00"

  return (
    <Card className="card-colorful">
      <CardHeader>
        <CardTitle className="gradient-blue-text font-bold">Lend {market.name}</CardTitle>
        <CardDescription>Supply assets and earn interest</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="market" className="w-full" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="market" className="data-[state=active]:bg-blue data-[state=active]:text-white">
              Market Order
            </TabsTrigger>
            <TabsTrigger value="limit" className="data-[state=active]:bg-coral data-[state=active]:text-white">
              Limit Order
            </TabsTrigger>
          </TabsList>
          <TabsContent value="market" className="mt-4">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="amount">Amount</Label>
                    <span className="text-xs text-muted-foreground">Balance: 1,000 {market.name.split("/")[0]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      id="amount"
                      placeholder="0.00"
                      value={amount}
                      onChange={handleAmountChange}
                      className="flex-1 border-input"
                    />
                    <Button type="button" variant="teal" size="sm" onClick={() => setAmount("1000")}>
                      MAX
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label>Duration (days)</Label>
                    <span className="text-sm font-medium">{duration} days</span>
                  </div>
                  <Slider
                    defaultValue={[30]}
                    max={365}
                    min={1}
                    step={1}
                    onValueChange={handleDurationChange}
                    className="[&>span]:bg-blue"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 day</span>
                    <span>1 year</span>
                  </div>
                </div>

                <div className="grid gap-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="collateral">Use as collateral</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5">
                              <Info className="h-3 w-3" />
                              <span className="sr-only">Info</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Enable to use this deposit as collateral for borrowing</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Switch id="collateral" checked={isCollateral} onCheckedChange={setIsCollateral} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="tokenized">Receive as tokenized bond</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5">
                              <Info className="h-3 w-3" />
                              <span className="sr-only">Info</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Receive a transferable token representing your lending position</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Switch id="tokenized" checked={isTokenized} onCheckedChange={setIsTokenized} />
                  </div>
                </div>

                <div className="rounded-lg bg-muted p-4 border border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Fixed APY</span>
                    <span className="font-medium text-teal">{market.lendingAPY}%</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Estimated earnings</span>
                    <span className="font-medium text-teal">
                      {estimatedEarnings} {market.name.split("/")[0]}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Collateral factor</span>
                    <span className="font-medium">{market.collateralFactor}%</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rate type</span>
                    <Badge variant="outline" className="bg-blue/10 text-blue border-blue/30">
                      Fixed
                    </Badge>
                  </div>
                </div>
              </div>

              <Button type="submit" className="mt-6 w-full" variant="blue">
                Supply {market.name.split("/")[0]}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="limit" className="mt-4">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="limit-amount">Amount</Label>
                    <span className="text-xs text-muted-foreground">Balance: 1,000 {market.name.split("/")[0]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      id="limit-amount"
                      placeholder="0.00"
                      value={amount}
                      onChange={handleAmountChange}
                      className="flex-1 border-input"
                    />
                    <Button type="button" variant="teal" size="sm" onClick={() => setAmount("1000")}>
                      MAX
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label>Duration (days)</Label>
                    <span className="text-sm font-medium">{duration} days</span>
                  </div>
                  <Slider
                    defaultValue={[30]}
                    max={365}
                    min={1}
                    step={1}
                    onValueChange={handleDurationChange}
                    className="[&>span]:bg-coral"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 day</span>
                    <span>1 year</span>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="rate-type">Interest Rate</Label>
                  <RadioGroup value={rateType} onValueChange={setRateType} className="grid gap-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="market" id="market-rate" className="border-blue text-blue" />
                      <Label htmlFor="market-rate" className="flex items-center gap-2">
                        Market Rate ({market.lendingAPY}%)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom-rate" className="border-coral text-coral" />
                      <Label htmlFor="custom-rate" className="flex items-center gap-2">
                        Custom Rate
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {rateType === "custom" && (
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="custom-rate-input">Your Rate (%)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5">
                              <HelpCircle className="h-3 w-3" />
                              <span className="sr-only">Help</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Set your own lending rate. Higher rates may take longer to match with borrowers.</p>
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
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Market rate: {market.lendingAPY}%</span>
                      <span>Your rate: {customRate}%</span>
                    </div>
                  </div>
                )}

                <div className="grid gap-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="limit-collateral">Use as collateral</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5">
                              <Info className="h-3 w-3" />
                              <span className="sr-only">Info</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Enable to use this deposit as collateral for borrowing</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Switch id="limit-collateral" checked={isCollateral} onCheckedChange={setIsCollateral} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="limit-tokenized">Receive as tokenized bond</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5">
                              <Info className="h-3 w-3" />
                              <span className="sr-only">Info</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Receive a transferable token representing your lending position</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Switch id="limit-tokenized" checked={isTokenized} onCheckedChange={setIsTokenized} />
                  </div>
                </div>

                <div className="rounded-lg bg-muted p-4 border border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Your Fixed APY</span>
                    <span className="font-medium text-teal">
                      {rateType === "custom" ? customRate : market.lendingAPY}%
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Estimated earnings</span>
                    <span className="font-medium text-teal">
                      {estimatedEarnings} {market.name.split("/")[0]}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Order type</span>
                    <Badge variant="outline" className="bg-coral/10 text-coral border-coral/30">
                      Limit Order
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rate type</span>
                    <Badge variant="outline" className="bg-blue/10 text-blue border-blue/30">
                      Fixed
                    </Badge>
                  </div>
                </div>
              </div>

              <Button type="submit" className="mt-6 w-full" variant="coral">
                Create Limit Order
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

