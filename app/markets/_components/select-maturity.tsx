"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
export interface Maturity {
  market_id: string;
  maturity: number;
}

export function SelectMaturity({ data }: { data: Maturity[] }) {
  const [value] = React.useState();
  const router = useRouter();

  const handleValueChange = async (value: string) => {
    const getMarketDetail = await fetch(`/api/market/${value}`);
    const market = await getMarketDetail.json();

    router.push(
      `/markets/${market.collateral_token.address}/${market.loan_token.address}?market_id=${value}`
    );
  };

  return (
    <Select onValueChange={handleValueChange} value={value}>
      <SelectTrigger className="w-[440px] bg-background/95 dark:bg-[#1a1b2f] border border-gray-300 dark:border-gray-700 rounded-md p-2 dark:text-white text-black">
        <SelectValue
          placeholder={`Maturity ${new Date((data[0]?.maturity-1) * 1000)
            .toLocaleString("en-US", {
              month: "short",
              year: "numeric",
            })
            .toUpperCase()}`}
          className="text-xl"
        />
      </SelectTrigger>
      <SelectContent className="bg-background/95 dark:bg-[#1a1b2f] border border-gray-300 dark:border-gray-700 rounded-md p-2 dark:text-white text-black">
        <SelectGroup>
          <SelectLabel>Select Maturity</SelectLabel>
          {data.map((item: Maturity, index: number) => (
            <SelectItem key={index} value={item.market_id}>
              Maturity {` `}
              {new Date((item?.maturity-1) * 1000)
                .toLocaleString("en-US", {
                  month: "short",
                  year: "numeric",
                })
                .toUpperCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
