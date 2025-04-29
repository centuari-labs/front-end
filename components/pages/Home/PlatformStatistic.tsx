import { StatsCard } from "@/components/stats-card";
import { SectionLayout } from "./SectionLayout";

export const PlatformStatistic = () => {
  return (
    <SectionLayout title="Platform Statistics">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Value Locked"
          value="$1.24B"
          change="+5.4%"
          isPositive={true}
        />
        <StatsCard
          title="Total Borrowed"
          value="$820M"
          change="+2.1%"
          isPositive={true}
        />
        <StatsCard title="Markets" value="24" change="+2" isPositive={true} />
      </div>
    </SectionLayout>
  );
};
