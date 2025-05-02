import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const sql = neon(process.env.DATABASE_URL ?? "");
  const orderBooks = await sql`
SELECT * FROM (SELECT 
  ob.*
FROM 
  order_book ob
WHERE
  ob.market_id = ${id} AND side = 'BORROW'
ORDER BY rate DESC
LIMIT 6) bo
UNION ALL
SELECT * FROM (SELECT 
  ob.*
FROM 
  order_book ob
WHERE
  ob.market_id = ${id} AND side = 'LEND'
ORDER BY rate ASC
LIMIT 6) lo
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

  orderBookData.lend.sort((a: any, b: any) => b.rate - a.rate);
  orderBookData.borrow.sort((a: any, b: any) => b.rate - a.rate);

  return NextResponse.json(orderBookData);
}
