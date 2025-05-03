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
  ct.name as collateral_token_name, ct.symbol as collateral_token_symbol, ct.image_uri as collateral_token_image_uri, ct.decimal as collateral_token_decimal,
  m.loan_token as loan_token_address, m.collateral_token as collateral_token_address, m.maturity as maturity
FROM "order" o
  LEFT JOIN market m ON m.id = o.market_id
  LEFT JOIN token lt ON LOWER(lt.address) = LOWER(m.loan_token)
  LEFT JOIN token ct ON LOWER(ct.address) = LOWER(m.collateral_token)
WHERE (status = 'OPEN' OR status = 'PARTIALLY_FILLED') AND LOWER(o.trader) = LOWER(${trader}) AND LOWER(o.market_id) = LOWER(${id})
  `;

  const openOrderData = openOrders.map((openOrder) => ({
    rate: openOrder.rate,
    original_amount: openOrder.original_amount,
    loan_token_symbol: openOrder.loan_token_symbol,
    loan_token_address: openOrder.loan_token_address,
    collateral_token_address: openOrder.collateral_token_address,
    matched_amount: openOrder.matched_amount,
    loan_token_decimal: openOrder.loan_token_decimal,
    timestamp: openOrder.timestamp,
    status: openOrder.status,
    side: openOrder.side,
    orderId: openOrder.order_id,
    maturity: openOrder.maturity,
  }));

  return NextResponse.json(openOrderData);
}
