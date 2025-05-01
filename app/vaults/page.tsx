import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { VaultTable } from "@/components/pages/Vaults/VaultTable";
import { VAULT_API } from "@/lib/api";
import { PageLayout } from "@/components/layout/page-layout";

export const metadata: Metadata = {
  title: "Vaults - DeFi Lending & Borrowing",
  description: "View all vaults on the platform",
};

export default async function VaultPage() {
  const getVault = await fetch(VAULT_API);
  const vaults = await getVault.json();

  return (
    <PageLayout
      title="Vaults"
      description="Explore all available vault on the platform."
      filter={
        <>
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
        </>
      }
    >
      <VaultTable vaults={vaults} />
    </PageLayout>
  );
}
