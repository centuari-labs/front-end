import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { TokenPair } from "./token-pair"

interface MarketCardProps {
  id: string
  name: string
  lendingAPY: number
  borrowingAPY: number
  totalSupply: number
  totalBorrowed: number
  trending: number
  lendTokenUrl: string,
  borrowTokenUrl: string
}

export function MarketCard({ id, name, lendingAPY, borrowingAPY, totalSupply, totalBorrowed, trending, lendTokenUrl, borrowTokenUrl }: MarketCardProps) {
  return (
    <Card className="overflow-hidden card-colorful animate-float">
      <CardContent className="p-6">
        <TokenPair
            lendTokenUrl={lendTokenUrl}
            borrowTokenUrl={borrowTokenUrl}
            pairName={name}
            marketTrending={trending}
        />
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Lending APY</p>
            <p className={cn("text-lg font-bold", lendingAPY > 5 ? "text-teal" : "")}>{lendingAPY}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Borrowing APY</p>
            <p className="text-lg font-bold">{borrowingAPY}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Supply</p>
            <p className="font-medium">${totalSupply.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Borrowed</p>
            <p className="font-medium">${totalBorrowed.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4">
        <Link href={`/markets/${id}`} className="w-full">
          <Button variant="colorful" className="w-full">
            View Market
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

