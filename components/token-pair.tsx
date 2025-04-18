import Image from "next/image";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TokenPairProps {
  lendTokenUrl: string;
  borrowTokenUrl: string;
  pairName: string;
  marketTrending: number;
  lendToken: string;
  collateralToken: string;
}

export function TokenPair({
  lendTokenUrl,
  borrowTokenUrl,
  pairName,
  marketTrending,
  lendToken,
  collateralToken,
}: TokenPairProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 rounded-full border-2 border-background">
            <Image
              src={lendTokenUrl}
              alt={`Lend Token`}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground dark:text-muted-dark">
              Lend Token
            </p>
            <h3 className="font-semibold dark:text-primary-dark">
              {lendToken}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 rounded-full border-2 border-background">
            <Image
              src={borrowTokenUrl}
              alt={`Borrow Token`}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground dark:text-muted-dark">
              Collateral Token
            </p>
            <h3 className="font-semibold dark:text-primary-dark">
              {collateralToken}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
