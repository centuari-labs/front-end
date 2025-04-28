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
import { BASE_URL } from "@/lib/api";
import { useRouter } from "next/navigation";

export interface Maturity {
  market_id: string;
  maturity: number;
}

export function SelectMaturity({ data }: { data: Maturity[] }) {
  const router = useRouter();

  const handleSelectMaturity = async (maturity: Maturity) => {
    console.log({ maturity });
    const getMarketDetail = await fetch(
      `${BASE_URL}/api/market/${maturity.market_id}`
    );
    const market = await getMarketDetail.json();

    router.push(`/markets/${market.collateral_token}/${market.loan_token}`);
  };

  return (
    <Select>
      <SelectTrigger className="w-[440px] bg-background/95 dark:bg-[#1a1b2f] border border-gray-300 dark:border-gray-700 rounded-md p-2 dark:text-white text-black">
        <SelectValue
          placeholder={`Maturity ${new Date(data[0]?.maturity * 1000)
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
            <SelectItem
              key={index}
              value={item.market_id}
              onClick={() => {
                console.log("masuk item", { item });
                handleSelectMaturity(item);
              }}
            >
              Maturity {` `}
              {new Date(item?.maturity * 1000)
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
