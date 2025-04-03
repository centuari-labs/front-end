import Image from "next/image";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TokenPairProps {
  lendTokenUrl: string;
  borrowTokenUrl: string;
  pairName: string;
  marketTrending: number;
}

export function TokenPair({
  lendTokenUrl,
  borrowTokenUrl,
  pairName,
  marketTrending,
}: TokenPairProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex">
        <div className="relative h-10 w-10 rounded-full border-2 border-background">
          <Image
            src={lendTokenUrl}
            alt={`Lend Token`}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="relative -ml-6 h-10 w-10 rounded-full border-2 border-background">
          <Image
            src={borrowTokenUrl}
            alt={`Borrow Token`}
            fill
            className="rounded-full object-cover"
          />
        </div>
      </div>
      <div>
        <h3 className="font-semibold dark:text-primary-dark">{pairName}</h3>
        <div className="flex items-center gap-2">
          {marketTrending > 0 ? (
            <Badge
              variant="outline"
              className="bg-teal/10 dark:bg-teal/10 text-teal border-teal/30 dark:border-teal/90"
            >
              <TrendingUp className="mr-1 h-3 w-3" />+{marketTrending}%
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-coral/10 dark:text-primary-dark text-coral border-coral/30"
            >
              <TrendingDown className="mr-1 h-3 w-3" />
              {marketTrending}%
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
