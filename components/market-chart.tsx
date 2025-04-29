"use client";

import { parseToRate } from "@/lib/helper";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface MarketChartProps {
  marketId: string;
}

// Update the MarketChart to remove utilization rate tab and focus on fixed rates
export function MarketChart({ market }: any) {
  const [chartData, setChartData] = useState<any[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    // In a real app, we would fetch this data based on the marketId
    // This is just sample data for demonstration
    const generateData = () => {
      const data = [];
      const now = new Date();

      for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);

        const lendingAPY =
          3 + Math.random() * Number(parseToRate(market.lending_apy)); // Less variation for fixed rates
        const borrowingAPY =
          5 + Math.random() * Number(parseToRate(market.borrow_apy)); // Less variation for fixed rates
        const totalSupply = 1000000 + Math.random() * 200000 - 100000;
        const totalBorrowed = 600000 + Math.random() * 100000 - 50000;

        data.push({
          date: date.toLocaleDateString(),
          lendingAPY: lendingAPY.toFixed(2),
          borrowingAPY: borrowingAPY.toFixed(2),
          totalSupply: (totalSupply / 1000000).toFixed(2),
          totalBorrowed: (totalBorrowed / 1000000).toFixed(2),
        });
      }

      return data;
    };

    setChartData(generateData());
  }, [market]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={theme === "dark" ? "#B9C7E4" : "#000"}
        />
        <XAxis dataKey="date" stroke={theme === "dark" ? "#B9C7E4" : "#000"} />
        <YAxis stroke={theme === "dark" ? "#B9C7E4" : "#000"} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
          }}
        />
        <Legend
          wrapperStyle={{
            color: theme === "dark" ? "#fff" : "#000",
          }}
        />
        <Line
          type="monotone"
          dataKey="lendingAPY"
          stroke="#10b981"
          name="Lending APY (%)"
        />
        <Line
          type="monotone"
          dataKey="borrowingAPY"
          stroke="#6366f1"
          name="Borrowing APY (%)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
