"use client";

import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface OpenOrdersProps {
  marketId: string;
}

interface OpenOrder {
  id: string;
  type: "lend" | "borrow";
  rate: number;
  amount: number;
  time: string;
  status: "pending" | "partial" | "open";
}

export function OpenOrders({ marketId }: OpenOrdersProps) {
  const orders: OpenOrder[] = [
    {
      id: "order1",
      type: "lend",
      rate: 3.5,
      amount: 10000,
      time: "2 hours ago",
      status: "open",
    },
    {
      id: "order2",
      type: "lend",
      rate: 3.8,
      amount: 5000,
      time: "1 hour ago",
      status: "partial",
    },
    {
      id: "order3",
      type: "borrow",
      rate: 4.2,
      amount: 7500,
      time: "30 mins ago",
      status: "pending",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="sm">
          Cancel All
        </Button>
      </div>
      <div className="space-y-3">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/10"
            >
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={
                    order.type === "lend"
                      ? "bg-green/10 text-green-light border-green/30"
                      : "bg-accent/10 text-accent border-accent/30"
                  }
                >
                  {order.type === "lend" ? "Lend" : "Borrow"}
                </Badge>
                <div className="flex flex-col">
                  <span className="font-medium">
                    {order.amount.toLocaleString()} USDC
                  </span>
                  <span className="text-sm text-muted-foreground dark:text-muted-dark">
                    at {order.rate}%
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-xs text-muted-foreground dark:text-muted-dark">
                  <Clock className="h-3 w-3 mr-1" />
                  {order.time}
                </div>
                <Badge
                  variant="outline"
                  className={
                    order.status === "open"
                      ? "bg-green/10 text-green-light border-green/30"
                      : order.status === "partial"
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                      : "bg-blue-500/10 text-blue-500 border-blue-500/30"
                  }
                >
                  {order.status}
                </Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Cancel order</span>
                </Button>
              </div>
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
