import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { VaultList } from "@/components/pages/Vaults/VaultList";
import { VaultTable } from "@/components/pages/Vaults/VaultTable";
import { vaults } from "@/lib/data";

export const metadata: Metadata = {
  title: "Vaults - DeFi Lending & Borrowing",
  description: "View your feucets",
};

export default async function VaultPage() {
  const mengapa = await fetch("http://localhost:3000/api/get-data");

  const oke = await mengapa.json();

  console.log(oke);

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Vaults</h1>
          <p className="text-muted-foreground dark:text-muted-dark">
            Explore all available vault on the platform.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-muted-dark" />
            <Input
              type="search"
              placeholder="Search markets..."
              className="w-full appearance-none pl-8"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Filter
            </Button>
            <Button variant="outline" size="sm">
              Sort: APY ↓
            </Button>
          </div>
        </div>

        <VaultTable vaults={vaults} />
      </div>
    </div>
  );
}
