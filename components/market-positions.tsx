"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface MarketPositionsProps {
  marketId: string
  type: "lending" | "borrowing"
}

export function MarketPositions({ marketId, type }: MarketPositionsProps) {
  // In a real app, we would fetch this data based on the marketId and type
  // This is just sample data for demonstration
  const hasPositions = type === "lending"
  const isLending = type === "lending"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your {isLending ? "Lending" : "Borrowing"} Positions</CardTitle>
        <CardDescription>
          {isLending ? "Assets you've supplied to this market" : "Assets you've borrowed from this market"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasPositions ? (
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Current Position</span>
                <span className="font-medium">10,000 USDC</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Value</span>
                <span>$10,000</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">APY</span>
                <span className={isLending ? "text-green-500" : ""}>{isLending ? "+" : "-"}3.5%</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Started</span>
                <span>June 15, 2023</span>
              </div>

              {!isLending && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Health Factor</span>
                    <span className="text-sm font-medium text-green-500">1.85</span>
                  </div>
                  <Progress value={65} className="bg-green-500" />
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <Button variant={isLending ? "destructive" : "default"} size="sm" className="flex-1">
                  {isLending ? "Withdraw" : "Repay"}
                </Button>
                {isLending && (
                  <Button variant="outline" size="sm" className="flex-1">
                    Add More
                  </Button>
                )}
              </div>
            </div>

            <Link href="/my-positions" className="block">
              <Button variant="outline" size="sm" className="w-full">
                View All Positions
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-muted-foreground">
              You don't have any {isLending ? "lending" : "borrowing"} positions in this market yet.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Use the form to create a new position.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

