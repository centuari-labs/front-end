import { TrendingUp, TrendingDown } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
}

export function StatsCard({ title, value, change, isPositive }: StatsCardProps) {
  return (
    <Card className="card-colorful">
      <CardContent className="p-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-teal" />
            ) : (
              <TrendingDown className="h-4 w-4 text-coral" />
            )}
            <p className={cn("text-sm font-medium", isPositive ? "text-teal" : "text-coral")}>{change}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

