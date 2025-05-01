"use client";

import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime, parseToAmount, parseToRate } from "@/lib/helper";

interface OpenOrdersProps {
  loan_token_decimal: number;
  loan_token_symbol: string;
  matched_amount: string;
  original_amount: string;
  rate: string;
  side: "LEND" | "BORROW";
  status: "PARTIALLY_FILLED" | "OPEN";
  timestamp: string;
}

// interface OpenOrder {
//   id: string;
//   type: "lend" | "borrow";
//   rate: number;
//   amount: number;
//   time: string;
//   status: "pending" | "partial" | "open";
// }

export function OpenOrders({ data }: { data: OpenOrdersProps[] }) {
  // const orders: OpenOrder[] = [
  //   {
  //     id: "order1",
  //     type: "lend",
  //     rate: 3.5,
  //     amount: 10000,
  //     time: "2 hours ago",
  //     status: "open",
  //   },
  //   {
  //     id: "order2",
  //     type: "lend",
  //     rate: 3.8,
  //     amount: 5000,
  //     time: "1 hour ago",
  //     status: "partial",
  //   },
  //   {
  //     id: "order3",
  //     type: "borrow",
  //     rate: 4.2,
  //     amount: 7500,
  //     time: "30 mins ago",
  //     status: "pending",
  //   },
  // ];

  // const {
  //   side,
  //   rate,
  //   original_amount,
  //   loan_token_symbol,
  //   matched_amount,
  //   loan_token_decimal,
  //   timestamp,
  //   status,
  // } = data;

  return (
    <div>
      {/* <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          className="border border-muted-dark/40 dark:border-muted-dark/40"
        >
          Cancel All
        </Button>
      </div> */}
      <div className="space-y-3">
        {data.length > 0 ? (
          data.map((order: OpenOrdersProps, index: any) => (
            <div
              key={index}
              className="relative flex flex-col p-3 rounded-lg border border-muted-dark/40 dark:border-muted-dark/40 dark:bg-slate-900/40"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex gap-2 items-center">
                  <Badge
                    variant="outline"
                    className={
                      order.side === "LEND"
                        ? "bg-green/10 text-green-light border-green/30"
                        : "bg-accent/10 text-accent border-accent/30"
                    }
                  >
                    {order.side === "LEND" ? "Lend" : "Borrow"}
                  </Badge>
                  <div>
                    <span className="font-medium">
                      {parseToAmount(
                        (
                          Number(order.original_amount) -
                          Number(order.matched_amount)
                        ).toString()
                      )}{" "}
                      {order.loan_token_symbol}
                    </span>
                  </div>
                </div>
                {/* <Badge
                  variant="outline"
                  className={
                    order.status === "OPEN"
                      ? "bg-green/10 text-green-light border-green/30"
                      : order.status === "PARTIALLY_FILLED"
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                      : "bg-blue-500/10 text-blue-500 border-blue-500/30"
                  }
                >
                  {order.status}
                </Badge> */}
                {/* <span className="text-sm text-muted-foreground dark:text-muted-dark">
                  at {parseToRate(order.rate)}%
                </span> */}
                <div className="flex items-center text-xs text-muted-foreground dark:text-muted-dark">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatRelativeTime(Number(order.timestamp))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* <div className="flex items-center text-xs text-muted-foreground dark:text-muted-dark">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatRelativeTime(Number(order.timestamp))}
                </div> */}
                <div className="flex justify-between items-center w-full mt-4">
                  <span className="text-xs ml-1 text-muted-foreground dark:text-muted-dark">
                    Rate: {parseToRate(order.rate)}%
                  </span>
                  <Badge
                    variant="outline"
                    className={
                      order.status === "OPEN"
                        ? "bg-green/10 text-green-light border-green/30"
                        : order.status === "PARTIALLY_FILLED"
                        ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                        : "bg-blue-500/10 text-blue-500 border-blue-500/30"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
              <Button
                // variant={"destructive"}
                size="icon"
                className="h-5 w-5 absolute -top-2 -right-2 bg-red-700 hover:bg-red-800 rounded-full"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Cancel order</span>
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>No open orders</p>
          </div>
        )}
      </div>
    </div>
  );
}
