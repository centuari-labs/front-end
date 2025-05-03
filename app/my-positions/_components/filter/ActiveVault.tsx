"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { FilterCard } from "../filter-card";

export const ActiveVault = () => {
  const { address } = useAccount();

  const [activeVault, setActiveVault] = useState<number>(0);

  async function getActiveVault() {
    const res = await fetch(`/api/my-position/${address}/vault`);
    if (!res.ok) return undefined;
    const resData = await res.json();

    setActiveVault(resData);
  }

  useEffect(() => {
    getActiveVault();
  }, []);

  return (
    <FilterCard title="Active Vault" description="Across all markets">
      <div className="text-2xl font-bold">$12,450.83</div>
    </FilterCard>
  );
};
