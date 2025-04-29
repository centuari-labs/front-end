import { MarketCard, MarketCardProps } from "@/components/market-card";
import { SectionLayout } from "./SectionLayout";

export const PopularMarket = async ({
  marketData,
}: {
  marketData: MarketCardProps[];
}) => {
  return (
    <>
      <SectionLayout
        title="Popular Markets"
        sectionLink="/markets"
        sectionLinkText="View all markets"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {marketData.map((market: MarketCardProps) => (
            <MarketCard
              key={market.id}
              maturity={market.maturity}
              id={market.id}
              name={market.name}
              loan_token={market.loan_token}
              collateral_token={market.collateral_token}
              lending_apy={market.lending_apy}
              borrow_apy={market.borrow_apy}
              market_volume={market.market_volume}
              lltv={market.lltv}
              maturity_date={market.maturity_date}
            />
          ))}
        </div>
      </SectionLayout>
    </>
  );
};
