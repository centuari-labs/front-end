import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TokenPair } from "./token-pair";

interface MarketCardProps {
  id: string;
  name: string;
  lendingAPY: number;
  borrowingAPY: number;
  marketVolume: number;
  ltv: number;
  trending: number;
  lendTokenUrl: string;
  borrowTokenUrl: string;
  lendToken: string;
  collateralToken: string;
}

export function MarketCard({
  id,
  name,
  lendingAPY,
  borrowingAPY,
  marketVolume,
  ltv,
  trending,
  lendTokenUrl,
  borrowTokenUrl,
  lendToken,
  collateralToken,
}: MarketCardProps) {
  return (
    <Card className="overflow-hidden card-colorful animate-float">
      <CardContent className="p-6">
        <TokenPair
          lendTokenUrl={lendTokenUrl}
          borrowTokenUrl={borrowTokenUrl}
          pairName={name}
          marketTrending={trending}
          lendToken={lendToken}
          collateralToken={collateralToken}
        />
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground dark:text-muted-dark">
              Lending APY
            </p>
            <p
              className={cn(
                "text-lg font-bold",
                lendingAPY > 5 ? "text-teal" : "dark:text-primary-dark"
              )}
            >
              {lendingAPY}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground dark:text-muted-dark">
              Borrowing APY
            </p>
            <p className="text-lg font-bold dark:text-primary-dark">
              {borrowingAPY}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground dark:text-muted-dark">
              Market Volume
            </p>
            <p className="font-medium dark:text-primary-dark">
              ${marketVolume.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground dark:text-muted-dark">
              LLTV
            </p>
            <p className="font-medium dark:text-primary-dark">
              ${ltv.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 dark:bg-card-dark p-4">
        <Link href={`/markets/${id}`} className="w-full">
          <Button className="w-full" variant={"colorful"}>
            View Market
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
