import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Clock } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface PositionCardProps {
  position: {
    id: string
    marketId: string
    marketName: string
    marketIcon: string
    amount: number
    value: number
    apy: number
    startDate: string
    endDate?: string
    healthFactor?: number
    collateralRatio?: number
  }
  type: "lending" | "borrowing"
}

export function PositionCard({ position, type }: PositionCardProps) {
  const isLending = type === "lending"

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src={position.marketIcon || `/placeholder.svg?height=40&width=40`}
                alt={position.marketName}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold">{position.marketName}</h3>
              <p className="text-sm text-muted-foreground">{isLending ? "Lending Position" : "Borrowing Position"}</p>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{isLending ? "Supplied" : "Borrowed"}</span>
            <span className="font-medium">
              {position.amount.toLocaleString()} {position.marketName.split("/")[0]}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Value</span>
            <span className="font-medium">${position.value.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">APY</span>
            <span className={cn("font-medium", isLending ? "text-green-500" : "")}>
              {isLending ? "+" : "-"}
              {position.apy}%
            </span>
          </div>
          {!isLending && position.healthFactor && (
            <div className="mt-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Health Factor</span>
                <span
                  className={cn(
                    "font-medium",
                    position.healthFactor < 1.1
                      ? "text-red-500"
                      : position.healthFactor < 1.5
                        ? "text-yellow-500"
                        : "text-green-500",
                  )}
                >
                  {position.healthFactor.toFixed(2)}
                </span>
              </div>
              <Progress
                value={Math.min((position.healthFactor / 2) * 100, 100)}
                className={cn(
                  position.healthFactor < 1.1
                    ? "bg-red-500"
                    : position.healthFactor < 1.5
                      ? "bg-yellow-500"
                      : "bg-green-500",
                )}
              />
            </div>
          )}
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Started {new Date(position.startDate).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 bg-muted/50 p-4">
        <Button variant={isLending ? "destructive" : "default"} size="sm">
          {isLending ? "Withdraw" : "Repay"}
        </Button>
        <Link href={`/markets/${position.marketId}`}>
          <Button variant="outline" size="sm" className="w-full">
            {isLending ? "Add More" : "View Market"}
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

