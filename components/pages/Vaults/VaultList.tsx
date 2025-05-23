"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { VaultListItem } from "./VaultListItem";

export interface FeucetDataProps {
  id: string;
  name: string;
  tokenName: string;
  chain: string;
  chainId: number;
  tokenIcons: string[];
  explorer: string;
  faucetUrl: string;
  claimLimit: number;
  limitTime: string;
  limitTimeUnit: string;
  status: string;
}

export function VaultList() {
  const [selectedFeucet, setSelectedFeucet] = useState<string[]>([]);
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <VaultListItem />
        {/* {feucets.map((feucet: any) => (
          <FeucetCard
            key={feucet.id}
            data={feucet}
            handleFeucetSelect={handleFeucetSelect}
            selectedFeucet={selectedFeucet}
          />
        ))} */}
      </div>

      {/* {selectedFeucet.length > 0 && (
        <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center pb-0 md:pb-10">
          <div className="bg-slate-100 border dark:border-0 dark:bg-slate-800 rounded-lg p-4 shadow-lg text-white transition-all duration-300 ease-in-out transform translate-y-0">
            <div className="flex items-center justify-between gap-4 md:gap-20">
              <div className="flex items-center gap-2">
                <Badge className="text-xs font-light bg-[#0C63BA]">
                  {selectedFeucet.length}
                </Badge>
                <p className="text-xs md:text-sm text-muted-foreground dark:text-primary-dark">
                  {selectedFeucet.length > 1 ? "Faucets" : "Faucet"} Selected
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size={"sm"}
                  className="text-muted-foreground border-[#0C63BA] dark:border-white dark:text-primary-dark"
                  onClick={handleFaucetClear}
                >
                  Clear All
                </Button>
                <FaucetDialog
                  data={detailFeucet}
                  handleRemoveFaucet={handleRemoveFaucet}
                />
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}
