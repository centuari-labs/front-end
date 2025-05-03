"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { FilterCard } from "../filter-card";

export const ActiveBorrow = () => {
  const { address } = useAccount();

  const [activeBorrow, setActiveBorrow] = useState();

  async function getActiveBorrow() {
    const res = await fetch(`/api/my-position/${address}/active-borrow`);
    if (!res.ok) return undefined;
    const resData = await res.json();

    console.log({ resData });
    setActiveBorrow(resData);
  }

  useEffect(() => {
    getActiveBorrow();
  }, []);

  return (
    <FilterCard title="Active Borrow" description="Across all markets">
      <div className="text-2xl font-bold">$12,450.83</div>
    </FilterCard>
  );
};
