import { parseToAmount, parseToRate } from "@/lib/helper";
import { useMemo } from "react";

interface OrderBookProps {
  marketId: string;
}

interface Order {
  borrow: {
    rate: number;
    amount: number;
  }[];
  lend: {
    rate: number;
    amount: number;
  }[];
}

export function OrderBook({
  orders,
  handleFixRated,
}: {
  orders: Order;
  handleFixRated: (value: number) => void;
}) {
  // Calculate the maximum amount for bar width scaling
  const maxAmountBorrow = useMemo(
    () => Math.max(...orders.borrow.map((order) => order.amount)),
    [orders]
  );

  const maxAmountLend = useMemo(
    () => Math.max(...orders.lend.map((order) => order.amount)),
    [orders]
  );

  return (
    <div className="space-y-1">
      {/* Sell Orders (Higher rates) */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-muted-foreground dark:text-muted-dark mb-2">
          Lend Orders
        </h3>
        {orders.lend.map((order) => (
          <div
            key={order.rate}
            className="relative flex items-center h-8 group cursor-pointer"
            onClick={() => handleFixRated(order.rate)}
          >
            {/* Background bar */}
            <div
              className="absolute right-0 h-full order-book-sell transition-all duration-200 group-hover:opacity-80 bg-gradient-to-br from-[#10b981] to-cyan-700"
              style={{ width: `${(order.amount / maxAmountLend) * 100}%` }}
            />
            {/* Content */}
            <div className="relative flex justify-between w-full px-2 text-sm">
              <span className="font-medium">
                {parseToRate(order.rate.toLocaleString())}%
              </span>
              <span className="font-medium">
                {parseToAmount(order.amount.toLocaleString(), 6)} MUSDC
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
        {orders.borrow.map((order) => (
          <div
            key={order.rate}
            className="relative flex items-center h-8 group cursor-pointer"
            onClick={() => handleFixRated(order.rate)}
          >
            <div
              className="absolute right-0 h-full order-book-buy transition-all duration-200 group-hover:opacity-80 bg-gradient-to-br from-[#6366f1] to-blue-700"
              style={{ width: `${(order.amount / maxAmountBorrow) * 100}%` }}
            />
            <div className="relative flex justify-between w-full px-2 text-sm">
              <span className="font-medium">
                {parseToRate(order.rate.toLocaleString())}%
              </span>
              <span className="font-medium">
                {parseToAmount(order.amount.toLocaleString(), 6)} MUSDC
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-muted-foreground dark:text-muted-dark border-t border-border/30 pt-4"> */}
        {/* <div>
          <p>
            Highest Borrow:{" "}
            <span className="text-green-300 dark:text-green-600 font-medium">
              {Math.max(
                ...orders.borrow.map((o) =>
                  parseFloat(parseToRate(o.rate.toLocaleString()))
                )
              )}
              %
            </span>
          </p>
          <p>
            Lowest Lend:{" "}
            <span className="text-red-300 dark:text-red-600 font-medium">
              {Math.min(
                ...orders.lend.map((o: any) =>
                  parseFloat(parseToRate(o.rate.toLocaleString()))
                )
              )}
              %
            </span>
          </p>
        </div> */}
        {/* <div className="text-right">
          <p>
            Total Lend Volume:{" "}
            <span className="font-medium text-xs">
              {parseToAmount(
                orders.lend
                  .reduce(
                    (acc, curr) => acc + parseFloat(curr.amount.toString()),
                    0
                  )
                  .toString(),
                3,
                3
              )}{" "}
              USDC
            </span>
          </p>
          <p>
            Total Borrow Volume:{" "}
            <span className="font-medium text-xs">
              {parseToAmount(
                orders.borrow
                  .reduce(
                    (acc, curr) => acc + parseFloat(curr.amount.toString()),
                    0
                  )
                  .toString(),
                3,
                3
              )}{" "}
              USDC
            </span>
          </p>
        </div> */}
      {/* </div> */}
    </div>
  );
}
