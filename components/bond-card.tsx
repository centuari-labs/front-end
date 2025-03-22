import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Calendar } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface BondCardProps {
  bond: {
    id: string
    marketId: string
    name: string
    icon: string
    yield: number
    maturityDate: string
    issuanceDate: string
    totalSupply: number
    minAmount: number
    remainingSupply: number
    value?: number
    amount?: number
  }
  isOwned?: boolean
}

export function BondCard({ bond, isOwned = false }: BondCardProps) {
  const maturityDate = new Date(bond.maturityDate)
  const issuanceDate = new Date(bond.issuanceDate)
  const now = new Date()

  // Calculate days remaining until maturity
  const daysRemaining = Math.ceil((maturityDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  const totalDays = Math.ceil((maturityDate.getTime() - issuanceDate.getTime()) / (1000 * 60 * 60 * 24))
  const progressPercent = 100 - (daysRemaining / totalDays) * 100

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src={bond.icon || `/placeholder.svg?height=40&width=40`}
                alt={bond.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold">{bond.name}</h3>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Bond Token
              </Badge>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Yield at Maturity</span>
            <span className="font-medium text-green-500">+{bond.yield}%</span>
          </div>
          {isOwned && bond.amount && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Your Amount</span>
              <span className="font-medium">
                {bond.amount.toLocaleString()} {bond.name.split(" ")[0]}
              </span>
            </div>
          )}
          {isOwned && bond.value && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Current Value</span>
              <span className="font-medium">${bond.value.toLocaleString()}</span>
            </div>
          )}
          {!isOwned && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Minimum Amount</span>
              <span className="font-medium">
                {bond.minAmount.toLocaleString()} {bond.name.split(" ")[0]}
              </span>
            </div>
          )}
          {!isOwned && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Remaining Supply</span>
              <span className="font-medium">${bond.remainingSupply.toLocaleString()}</span>
            </div>
          )}
          <div className="mt-2">
            <div className="flex justify-between mb-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Matures {maturityDate.toLocaleDateString()}</span>
              </div>
              <span className="text-xs font-medium">{daysRemaining} days left</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 bg-muted/50 p-4">
        {isOwned ? (
          <>
            <Button variant="destructive" size="sm">
              Redeem Early
            </Button>
            <Button variant="outline" size="sm">
              Transfer
            </Button>
          </>
        ) : (
          <Link href={`/markets/${bond.marketId}`} className="col-span-2">
            <Button className="w-full">
              Purchase Bond
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}

