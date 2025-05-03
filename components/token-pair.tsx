import Image from "next/image";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TokenPairProps {
  loanTokenUrl: string;
  collateralTokenUrl: string;
  loanToken: string;
  collateralToken: string;
  onClick?: () => void;
}

export function TokenPair({
  loanTokenUrl,
  collateralTokenUrl,
  loanToken,
  collateralToken,
  onClick,
}: TokenPairProps) {
  return (
    <>
      <div className="flex gap-6">
        <div className="flex gap-2">
          <div className="relative h-10 w-10 rounded-full border-2 border-background">
            {loanTokenUrl && (
              <Image
                src={loanTokenUrl}
                alt={`Loan Token`}
                fill
                className="rounded-full object-cover cursor-pointer"
                onClick={onClick}
              />
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground dark:text-muted-dark">
              Loan Token
            </p>
            <h3
              className="font-semibold dark:text-primary-dark cursor-pointer"
              onClick={onClick}
            >
              {loanToken}
            </h3>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative h-10 w-10 rounded-full border-2 border-background">
            {collateralTokenUrl && (
              <Image
                src={collateralTokenUrl}
                alt={`Collateral Token`}
                fill
                className="rounded-full object-cover cursor-pointer"
                onClick={onClick}
              />
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground dark:text-muted-dark">
              Collateral Token
            </p>
            <h3
              className="font-semibold dark:text-primary-dark cursor-pointer"
              onClick={onClick}
            >
              {collateralToken}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
