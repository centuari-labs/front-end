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
  const { name, address, decimal, image_uri, symbol } = data;

  const addTokenAddress = async (
    e: React.MouseEvent<HTMLButtonElement>,
    token: Record<string, string>
  ) => {
    e.stopPropagation();
    if (!window.ethereum) {
      alert("Wallet not found");
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: token.address,
            symbol: token.symbol,
            decimals: decimal,
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
        selectedFaucet.includes(symbol) && "bg-slate-100 dark:bg-slate-900"
      )}
      onClick={() => handleFaucetSelect(symbol)}
    >
      <CardContent className="p-6">
        <div className="flex justify-between">
          <TokenPair image={image_uri} />
          <Button
            size={"sm"}
            className="p-2 rounded-xl"
            onClick={(e) =>
              addTokenAddress(e, {
                address: address,
                symbol: symbol,
              })
            }
          >
            <Wallet size={"16"} className="text-white/60 hover:text-white" />
          </Button>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <p className="font-semibold dark:text-primary-dark">{name}</p>
          <div className="flex items-center gap-1">
            <p className="text-sm font-light">1,000,00 / 30 Minutes</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
