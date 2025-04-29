import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string; trader: string }> }
) {
  const { id, trader } = await params;

  const sql = neon(process.env.DATABASE_URL ?? "");
  const openOrders = await sql`
  SELECT 
  o.*, 
  lt.name as loan_token_name, lt.symbol as loan_token_symbol, lt.image_uri as loan_token_image_uri, lt.decimal as loan_token_decimal,
  ct.name as collateral_token_name, ct.symbol as collateral_token_symbol, ct.image_uri as collateral_token_image_uri, ct.decimal as collateral_token_decimal
FROM "order" o
  LEFT JOIN market m ON m.id = o.market_id
  LEFT JOIN token lt ON LOWER(lt.address) = LOWER(m.loan_token)
  LEFT JOIN token ct ON LOWER(ct.address) = LOWER(m.collateral_token)
WHERE (status = 'OPEN' OR status = 'PARTIALLY_FILLED') AND trader = ${trader} AND market_id = ${id}
  `;

  const openOrderData = openOrders.map((openOrder) => ({
    rate: openOrder.rate,
    original_amount: openOrder.original_amount,
    loan_token_symbol: openOrder.loan_token_symbol,
    matched_amount: openOrder.matched_amount,
    loan_token_decimal: openOrder.loan_token_decimal,
    timestamp: openOrder.timestamp,
    status: openOrder.status,
    side: openOrder.side,
  }));

  return NextResponse.json(openOrderData);
}
