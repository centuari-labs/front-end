import type { Metadata } from "next";
import PositionList from "./_components/position-list";
import { PageLayout } from "@/components/layout/page-layout";
import { FilterCard } from "./_components/filter-card";
import { ActiveLend } from "./_components/filter/ActiveLend";
import { ActiveBorrow } from "./_components/filter/ActiveBorrow";
import { ActiveVault } from "./_components/filter/ActiveVault";

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
          <div className="w-full">
            <div className="grid gap-6 md:grid-cols-3">
              <ActiveLend />
              <ActiveBorrow />
              <ActiveVault />
            </div>
          </div>
        </>
      }
    >
      <PositionList />
    </PageLayout>
  );
}
