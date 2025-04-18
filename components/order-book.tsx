"use client";

import { useState, useMemo } from "react";

interface OrderBookProps {
  marketId: string;
}

interface Order {
  rate: number;
  amount: number;
  total: number;
  type: "borrow" | "lend";
}

export function OrderBook({ marketId }: OrderBookProps) {
  // In a real app, we would fetch this data based on the marketId
  const [orders] = useState<Order[]>([
    { rate: 5.5, amount: 41996, total: 41996, type: "lend" },
    { rate: 5.0, amount: 5216, total: 47212, type: "lend" },
    { rate: 4.5, amount: 97148, total: 144360, type: "lend" },
    { rate: 4.0, amount: 86290, total: 230650, type: "lend" },
    { rate: 3.5, amount: 71459, total: 302109, type: "lend" },
    { rate: 3.0, amount: 23688, total: 325797, type: "borrow" },
    { rate: 2.5, amount: 117884, total: 443681, type: "borrow" },
    { rate: 2.0, amount: 80478, total: 524159, type: "borrow" },
    { rate: 1.5, amount: 22846, total: 547005, type: "borrow" },
    { rate: 1.0, amount: 180369, total: 727374, type: "borrow" },
    { rate: 0.5, amount: 103038, total: 830412, type: "borrow" },
  ]);

  // Calculate the maximum amount for bar width scaling
  const maxAmount = useMemo(
    () => Math.max(...orders.map((order) => order.amount)),
    [orders]
  );

  return (
    <div className="space-y-1">
      {/* Sell Orders (Higher rates) */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-muted-foreground dark:text-muted-dark mb-2">
          Lend Orders
        </h3>
        {orders
          .filter((order) => order.type === "lend")
          .map((order) => (
            <div
              key={order.rate}
              className="relative flex items-center h-8 group"
            >
              {/* Background bar */}
              <div
                className="absolute right-0 h-full order-book-sell transition-all duration-200 group-hover:opacity-80 bg-green-300 dark:bg-green-700"
                style={{ width: `${(order.amount / maxAmount) * 100}%` }}
              />
              {/* Content */}
              <div className="relative flex justify-between w-full px-2 text-sm">
                <span className="font-medium">{order.rate}%</span>
                <span className="font-medium">
                  {order.amount.toLocaleString()} USDC
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* Spread/Middle line */}
      <div className="h-px bg-border my-4" />

      {/* Buy Orders (Lower rates) */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-muted-foreground dark:text-muted-dark mb-2">
          Borrow Orders
        </h3>
        {orders
          .filter((order) => order.type === "borrow")
          .map((order) => (
            <div
              key={order.rate}
              className="relative flex items-center h-8 group"
            >
              {/* Background bar */}
              <div
                className="absolute right-0 h-full order-book-buy transition-all duration-200 group-hover:opacity-80 bg-red-300 dark:bg-red-700"
                style={{ width: `${(order.amount / maxAmount) * 100}%` }}
              />
              {/* Content */}
              <div className="relative flex justify-between w-full px-2 text-sm">
                <span className="font-medium">{order.rate}%</span>
                <span className="font-medium">
                  {order.amount.toLocaleString()} USDC
                </span>
              </div>
            </div>
          ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-muted-foreground dark:text-muted-dark border-t border-border/30 pt-4">
        <div>
          <p>
            Highest Lend:{" "}
            <span className="text-green-300 dark:text-green-600 font-medium">
              {Math.max(
                ...orders.filter((o) => o.type === "lend").map((o) => o.rate)
              )}
              %
            </span>
          </p>
          <p>
            Lowest Borrow:{" "}
            <span className="text-red-300 dark:text-red-600 font-medium">
              {Math.min(
                ...orders.filter((o) => o.type === "borrow").map((o) => o.rate)
              )}
              %
            </span>
          </p>
        </div>
        <div className="text-right">
          <p>
            Total Lend Volume:{" "}
            <span className="font-medium">
              {orders
                .filter((o) => o.type === "lend")
                .reduce((acc, curr) => acc + curr.amount, 0)
                .toLocaleString()}{" "}
              USDC
            </span>
          </p>
          <p>
            Total Borrow Volume:{" "}
            <span className="font-medium">
              {orders
                .filter((o) => o.type === "borrow")
                .reduce((acc, curr) => acc + curr.amount, 0)
                .toLocaleString()}{" "}
              USDC
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
