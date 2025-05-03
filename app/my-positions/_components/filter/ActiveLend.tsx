"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { FilterCard } from "../filter-card";
import { parseToAmount } from "@/lib/helper";

export const ActiveLend = () => {
  const { address } = useAccount();

  const [activelend, setActiveLend] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  async function getActiveLend() {
    setLoading(true);
    try {
      const res = await fetch(`/api/my-position/${address}/lending`);
      if (!res.ok) return undefined;
      const resData = await res.json();

      const total = resData.reduce(
        (acc: any, curr: any) => acc + parseFloat(curr.assets) / 10e6,
        0
      );
      setActiveLend(total);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getActiveLend();
  }, []);

  if (loading) {
    return <div className="rounded-md bg-gray-800 h-36 animate-pulse"></div>;
  }

  return (
    <FilterCard title="Active Lend" description="Across all markets">
      <div className="text-2xl font-bold">
        ${parseToAmount(activelend?.toString(), 0, 2)}
      </div>
    </FilterCard>
  );
};
