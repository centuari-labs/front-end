"use client";

import { useMemo, useState } from "react";
import { FeucetCard } from "./feucet-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaucetDialog } from "./faucet-dialog";

export interface FeucetDataProps {
  id: string;
  name: string;
  chain: string;
  chainId: number;
  tokenIcons: string[];
  explorer: string;
  faucetUrl: string;
  claimLimit: string;
  status: string;
}

export function FeucetList({ feucets }: { feucets: FeucetDataProps[] }) {
  const [selectedFeucet, setSelectedFeucet] = useState<string[]>([]);
  const handleFeucetSelect = (id: string) => {
    if (selectedFeucet.includes(id)) {
      setSelectedFeucet(selectedFeucet.filter((feucet) => feucet !== id));
    } else {
      setSelectedFeucet([...selectedFeucet, id]);
    }
  };

  const handleFaucetClear = () => {
    setSelectedFeucet([]);
  };

  const handleRemoveFaucet = (id: string) => {
    setSelectedFeucet(selectedFeucet.filter((feucet) => feucet !== id));
  };

  const detailFeucet = useMemo(() => {
    return feucets.filter((feucet) => selectedFeucet.includes(feucet.id));
  }, [feucets, selectedFeucet]);

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {feucets.map((feucet: any) => (
          <FeucetCard
            key={feucet.id}
            data={feucet}
            handleFeucetSelect={handleFeucetSelect}
            selectedFeucet={selectedFeucet}
          />
        ))}
      </div>
      {selectedFeucet.length > 0 && (
        <div
          className={`flex items-center justify-center transition-transform duration-300 ease-in-out ${
            selectedFeucet.length > 0 ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="fixed bottom-10 bg-slate-800 dark:bg-muted-dark rounded-lg p-4 shadow-lg text-white">
            <div className="flex items-center gap-20">
              <div className="flex items-center gap-2">
                <Badge>{selectedFeucet.length}</Badge>
                <p>
                  {selectedFeucet.length > 1 ? "Faucets" : "Faucet"} Selected
                </p>
              </div>
              <div className="space-x-2">
                <Button variant={"outline"} onClick={handleFaucetClear}>
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
      )}
    </>
  );
}
