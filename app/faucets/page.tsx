import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Metadata } from "next";
import { faucetData } from "@/lib/data";
import { FaucetList } from "./_components/faucet-list";
import { BASE_URL } from "@/lib/api";
import { PageLayout } from "@/components/layout/page-layout";

export const metadata: Metadata = {
  title: "Faucets - DeFi Lending & Borrowing",
  description: "View your faucets",
};

async function getTokenData() {
  const res = await fetch(`${BASE_URL}/api/tokens`);
  if (!res.ok) return undefined;
  return res.json();
}

export default async function FaucetsPage() {
  const tokens = await getTokenData();

  return (
    <PageLayout
      title="Choose Faucets"
      description="Get testnet tokens."
      filter={
        <>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-muted-dark" />
            <Input
              type="search"
              placeholder="Search faucets..."
              className="w-full appearance-none pl-8"
            />
          </div>
        </>
      }
    >
      <FaucetList faucets={tokens} />
    </PageLayout>
  );
}
