"use client";

import { useMemo, useState } from "react";
import { FaucetCard } from "./faucet-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaucetDialog } from "./faucet-dialog";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { FaucetDataProps } from "@/lib/data";

export function FaucetList({ faucets }: { faucets: FaucetDataProps[] }) {
  const [selectedFaucet, setSelectedFaucet] = useState<string[]>([]);
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const handleFaucetSelect = (symbol: string) => {
    if (!address) {
      openConnectModal?.();
    } else {
      if (selectedFaucet.includes(symbol)) {
        setSelectedFaucet(selectedFaucet.filter((faucet) => faucet !== symbol));
      } else {
        setSelectedFaucet([...selectedFaucet, symbol]);
      }
    }
  };

  const handleFaucetClear = () => {
    setSelectedFaucet([]);
  };

  const handleRemoveFaucet = (symbol: string) => {
    setSelectedFaucet(selectedFaucet.filter((faucet) => faucet !== symbol));
  };

  const detailFaucet = useMemo(() => {
    return faucets.filter((faucet: FaucetDataProps) =>
      selectedFaucet.includes(faucet.symbol)
    );
  }, [faucets, selectedFaucet]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {faucets.map((faucet: FaucetDataProps) => (
          <FaucetCard
            key={faucet.symbol}
            data={faucet}
            handleFaucetSelect={handleFaucetSelect}
            selectedFaucet={selectedFaucet}
          />
        ))}
      </div>

      {/* Fixed position element with higher z-index */}
      {selectedFaucet.length > 0 && (
        <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center pb-0 md:pb-10">
          <div className="bg-slate-100 border dark:border-0 dark:bg-slate-800 rounded-lg p-4 shadow-lg text-white transition-all duration-300 ease-in-out transform translate-y-0">
            <div className="flex items-center justify-between gap-4 md:gap-20">
              <div className="flex items-center gap-2">
                <Badge className="text-xs font-light bg-[#0C63BA]">
                  {selectedFaucet.length}
                </Badge>
                <p className="text-xs md:text-sm text-muted-foreground dark:text-primary-dark">
                  {selectedFaucet.length > 1 ? "Faucets" : "Faucet"} Selected
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
                  data={detailFaucet}
                  handleRemoveFaucet={handleRemoveFaucet}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
