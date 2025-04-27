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

interface MaturityProps {
  month: string;
  year: string;
}

export function SelectMaturity({ data }: { data: MaturityProps[] }) {
  return (
    <Select>
      <SelectTrigger className="w-[440px] bg-background/95 dark:bg-[#1a1b2f] border border-gray-300 dark:border-gray-700 rounded-md p-2 dark:text-white text-black">
        <SelectValue
          placeholder={`Maturity ${data[0].month} ${data[0].year}`}
          className="text-xl"
        />
      </SelectTrigger>
      <SelectContent className="bg-background/95 dark:bg-[#1a1b2f] border border-gray-300 dark:border-gray-700 rounded-md p-2 dark:text-white text-black">
        <SelectGroup>
          <SelectLabel>Select Maturity</SelectLabel>
          {data.map((item, index) => (
            <SelectItem key={index} value={`${item.month} ${item.year}`}>
              Maturity {item.month} {item.year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
