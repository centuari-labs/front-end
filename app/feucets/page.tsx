import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Metadata } from "next";
import { FeucetCard } from "./_components/feucet-card";
import { feucetData } from "@/lib/data";
import { useState } from "react";
import { FeucetList } from "./_components/feucet-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Feucets - DeFi Lending & Borrowing",
  description: "View your feucets",
};

export default function FeucetsPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 relative">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Choose Feucets</h1>
          <p className="text-muted-foreground">
            Get testnet tokens. Multiple assets available. Experiment with smart
            contracts today.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-muted-dark" />
            <Input
              type="search"
              placeholder="Search feucets..."
              className="w-full appearance-none pl-8"
            />
          </div>
        </div>
        <FeucetList feucets={feucetData} />
      </div>
    </div>
  );
}
