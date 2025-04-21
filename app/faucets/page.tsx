import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Metadata } from "next";
import { feucetData } from "@/lib/data";
import { FeucetList } from "./_components/faucet-list";

export const metadata: Metadata = {
  title: "Feucets - DeFi Lending & Borrowing",
  description: "View your feucets",
};

export default function FeucetsPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 relative">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Choose Faucets</h1>
          <p className="text-muted-foreground dark:text-muted-dark">
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
