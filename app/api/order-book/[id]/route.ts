import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const sql = neon(process.env.DATABASE_URL ?? "");
  const orderBooks = await sql`SELECT 
    ob.*
  FROM 
      order_book ob
  WHERE
      ob.market_id = ${id}
    `;

  const orderBookData: any = {
    lend: [],
    borrow: [],
  };

  orderBooks.forEach((orderBook) => {
    const { side, rate, amount } = orderBook;
    if (side === "LEND") {
      orderBookData.lend.push({ rate, amount });
    } else if (side === "BORROW") {
      orderBookData.borrow.push({ rate, amount });
    }
  });
  return NextResponse.json(orderBookData);
}
