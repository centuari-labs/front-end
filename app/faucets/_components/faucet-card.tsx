import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { ChangeEvent } from "react";
import { TokenPair } from "./token-pair";
import { FaucetDataProps } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { toast } from "sonner";

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
  const {
    id,
    name,
    tokenIcons,
    claimLimit,
    limitTime,
    limitTimeUnit,
    address,
    tokenName,
  } = data;

  const addTokenAddress = async (
    e: React.MouseEvent<HTMLButtonElement>,
    token: Record<string, string>
  ) => {
    e.stopPropagation();
    if (!window.ethereum) {
      alert("Wallet not found");
      return;
    }
    const tokenDecimals = 18;

    console.log("token", token);

    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: token.address,
            symbol: token.symbol,
            decimals: tokenDecimals,
          },
        },
      });

      toast.success("Token added to wallet");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Card
      className={cn(
        "card-colorful",
        selectedFaucet.includes(id) && "bg-slate-100 dark:bg-slate-900"
      )}
      onClick={() => handleFaucetSelect(id)}
    >
      <CardContent className="p-6">
        <div className="flex justify-between">
          <TokenPair icons={tokenIcons} />
          <Button
            size={"sm"}
            className="p-2 rounded-xl"
            onClick={(e) =>
              addTokenAddress(e, {
                address: address,
                symbol: tokenName,
              })
            }
          >
            <Wallet size={"16"} className="text-white/60 hover:text-white" />
          </Button>
        </div>
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
