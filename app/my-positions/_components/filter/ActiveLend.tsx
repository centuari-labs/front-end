"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { FilterCard } from "../filter-card";

export const ActiveLend = () => {
  const { address } = useAccount();

  const [activelend, setActiveLend] = useState();

  async function getActiveLend() {
    const res = await fetch(`/api/my-position/${address}/active-lend`);
    if (!res.ok) return undefined;
    const resData = await res.json();

    console.log({ resData });
    setActiveLend(resData);
  }

  useEffect(() => {
    getActiveLend();
  }, []);

  return (
    <FilterCard title="Active Lend" description="Across all markets">
      <div className="text-2xl font-bold">$12,450.83</div>
    </FilterCard>
  );
};
