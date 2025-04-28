import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TokenPair } from "./token-pair";

interface IToken {
  address: string;
  name: string;
  image_uri: string;
  decimal: number;
  symbol: string;
}

export interface MarketCardProps {
  id: string;
  name: string;
  lltv: string;
  lending_apy: string;
  borrow_apy: string;
  market_volume: string;
  loan_token: IToken;
  collateral_token: IToken;
  maturity_date: Date;
  maturity: string;
}

export function MarketCard({
  id,
  name,
  lltv,
  market_volume,
  lending_apy,
  borrow_apy,
  loan_token,
  collateral_token,
  maturity_date,
}: MarketCardProps) {
  return (
    <Card className="overflow-hidden card-colorful animate-float">
      <CardContent className="p-6">
        <TokenPair
          loanTokenUrl={loan_token.image_uri}
          collateralTokenUrl={collateral_token.image_uri}
          pairName={name}
          loanToken={loan_token.name}
          collateralToken={collateral_token.name}
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
                parseFloat(lending_apy) > 5
                  ? "text-teal"
                  : "dark:text-primary-dark"
              )}
            >
              {parseFloat(lending_apy) / 10 ** 16}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground dark:text-muted-dark">
              Borrowing APY
            </p>
            <p className="text-lg font-bold dark:text-primary-dark">
              {parseFloat(borrow_apy) / 10 ** 16}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground dark:text-muted-dark">
              Market Volume
            </p>
            <p className="font-medium dark:text-primary-dark">
              $ {parseFloat(market_volume).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground dark:text-muted-dark">
              LLTV
            </p>
            <p className="font-medium dark:text-primary-dark">
              {parseFloat(lltv) / 10 ** 16} %
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 dark:bg-card-dark p-4">
        <Link
          href={`/markets/${collateral_token.address}/${loan_token.address}`}
          className="w-full"
        >
          <Button className="w-full" variant={"colorful"}>
            View Market
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
