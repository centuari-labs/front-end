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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {feucets.map((feucet: any) => (
          <FeucetCard
            key={feucet.id}
            data={feucet}
            handleFeucetSelect={handleFeucetSelect}
            selectedFeucet={selectedFeucet}
          />
        ))}
      </div>

      {/* Fixed position element with higher z-index */}
      {selectedFeucet.length > 0 && (
        <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center pb-0 md:pb-10">
          <div className="bg-slate-800  dark:bg-slate-800 rounded-lg p-4 shadow-lg text-white transition-all duration-300 ease-in-out transform translate-y-0">
            <div className="flex items-center justify-between gap-4 md:gap-20">
              <div className="flex items-center gap-2">
                <Badge>{selectedFeucet.length}</Badge>
                <p className="text-xs md:text-lg">
                  {selectedFeucet.length > 1 ? "Faucets" : "Faucet"} Selected
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size={"sm"}
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
      )}
    </>
  );
}
