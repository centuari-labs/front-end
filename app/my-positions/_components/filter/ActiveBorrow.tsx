"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { FilterCard } from "../filter-card";
import { parseToAmount } from "@/lib/helper";

export const ActiveBorrow = () => {
  const { address } = useAccount();

  const [activeBorrow, setActiveBorrow] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  async function getActiveBorrow() {
    setLoading(true);
    try {
      const res = await fetch(`/api/my-position/${address}/borrow`);
      if (!res.ok) return undefined;
      const resData = await res.json();

      const activeBorrow = resData.reduce(
        (acc: any, curr: any) => acc + parseFloat(curr.assets) / 10e6,
        0
      );

      setActiveBorrow(activeBorrow);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getActiveBorrow();
  }, []);

  if (loading) {
    return <div className="rounded-md bg-gray-800 h-36 animate-pulse"></div>;
  }

  return (
    <FilterCard title="Active Borrow" description="Across all markets">
      <div className="text-2xl font-bold">
        ${parseToAmount(activeBorrow?.toString(), 0, 2)}
      </div>
    </FilterCard>
  );
};
