import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";
import { TokenPair } from "./token-pair";
import { FeucetDataProps } from "./feucet-list";

interface FeucetCardProps {
  data: FeucetDataProps;
  handleFeucetSelect: (id: string) => void;
  selectedFeucet?: any;
}

export function FeucetCard({
  data,
  handleFeucetSelect,
  selectedFeucet,
}: FeucetCardProps) {
  const { id, name, tokenIcons, claimLimit } = data;

  return (
    <Card
      className={cn(
        "card-colorful",
        selectedFeucet.includes(id) && "bg-slate-200 dark:bg-slate-700"
      )}
      onClick={() => handleFeucetSelect(id)}
    >
      <CardContent className="p-6">
        <TokenPair icons={tokenIcons} />
        <div className="flex flex-col gap-1 mt-3">
          <p className="font-semibold dark:text-primary-dark">{name}</p>
          <div className="flex items-center gap-1">
            <p className="text-sm font-light">{claimLimit}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
