"use client";

import { OrderBook } from "@/components/order-book";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

export const OrderBookCard = ({ orders }: { orders: Order }) => {
  const handleFixRated = (rate: number) => {
    console.log("Fix rated", rate);
  };

  return (
    <Card className="card-colorful">
      <CardHeader className="pb-3">
        <CardTitle>Order Book</CardTitle>
        <CardDescription>Current lending and borrowing orders</CardDescription>
      </CardHeader>
      <CardContent>
        <OrderBook orders={orders} handleFixRated={handleFixRated} />
      </CardContent>
    </Card>
  );
};
