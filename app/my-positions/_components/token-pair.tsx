import Image from "next/image";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <TooltipProvider>
      <div className="relative flex items-center gap-4">
        <div className="relative h-10 w-10 rounded-full border-2 border-background z-10">
          <Tooltip>
            <TooltipTrigger asChild>
              <Image
                src={lendTokenUrl}
                alt={`Loan Token`}
                fill
                className="rounded-full object-cover"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Loan Token</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="relative h-10 w-10 rounded-full border-2 border-background -ml-8 z-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Image
                src={borrowTokenUrl}
                alt={`Borrow Token`}
                fill
                className="rounded-full object-cover"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Colleteral Token</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
