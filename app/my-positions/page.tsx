import type { Metadata } from "next";
import PositionList from "./_components/position-list";
import { PageLayout } from "@/components/layout/page-layout";
import { FilterCard } from "./_components/filter-card";

export const metadata: Metadata = {
  title: "My Positions - DeFi Lending & Borrowing",
  description: "View your current lending and borrowing positions",
};

export default function MyPositionsPage() {
  return (
    <PageLayout
      title="My Positions"
      description="View your current lending and borrowing positions"
      filter={
        <>
          <div className="container px-4 py-8 md:px-6 md:py-12">
            <div className="grid gap-6 md:grid-cols-3">
              <FilterCard
                title="Active Supply"
                description="Across all markets"
              >
                <div className="text-2xl font-bold">$12,450.83</div>
              </FilterCard>
              <FilterCard
                title="Active Borrow"
                description="Across all markets"
              >
                <div className="text-2xl font-bold">$5,280.42</div>
              </FilterCard>
              <FilterCard title="Active Vault" description="Across all markets">
                <div className="text-2xl font-bold">$8,280.42</div>
              </FilterCard>
            </div>
          </div>
        </>
      }
    >
      <PositionList />
    </PageLayout>
  );
}
