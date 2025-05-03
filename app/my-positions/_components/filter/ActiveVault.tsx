"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { FilterCard } from "../filter-card";

export const ActiveVault = () => {
  const { address } = useAccount();

  const [activeVault, setActiveVault] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  async function getActiveVault() {
    setLoading(true);
    try {
      const res = await fetch(`/api/my-position/${address}/vault`);
      if (!res.ok) return undefined;
      const resData = await res.json();

      setActiveVault(resData);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getActiveVault();
  }, []);

  console.log("activeVault", activeVault);

  if (loading) {
    return <div className="rounded-md bg-gray-800 h-36 animate-pulse"></div>;
  }

  return (
    <FilterCard title="Active Vault" description="Across all markets">
      <div className="text-2xl font-bold">$12,450.83</div>
    </FilterCard>
  );
};
