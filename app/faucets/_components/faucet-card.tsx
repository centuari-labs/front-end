import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";
import { TokenPair } from "./token-pair";
import { FaucetDataProps } from "@/lib/data";

interface FaucetCardProps {
  data: FaucetDataProps;
  handleFaucetSelect: (id: string) => void;
  selectedFaucet?: any;
}

export function FaucetCard({
  data,
  handleFaucetSelect,
  selectedFaucet,
}: FaucetCardProps) {
  const { id, name, tokenIcons, claimLimit, limitTime, limitTimeUnit } = data;

  return (
    <Card
      className={cn(
        "card-colorful",
        selectedFaucet.includes(id) && "bg-slate-100 dark:bg-slate-900"
      )}
      onClick={() => handleFaucetSelect(id)}
    >
      <CardContent className="p-6">
        <TokenPair icons={tokenIcons} />
        <div className="flex flex-col gap-1 mt-3">
          <p className="font-semibold dark:text-primary-dark">{name}</p>
          <div className="flex items-center gap-1">
            <p className="text-sm font-light">
              {claimLimit.toLocaleString("en-US")} / {limitTime} {limitTimeUnit}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
