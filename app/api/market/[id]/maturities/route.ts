import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const maturity = request.nextUrl.searchParams.get("maturity");

  const sql = neon(process.env.DATABASE_URL ?? "");
  const market = await sql`SELECT 
    m.id,
    m.maturity
  FROM 
      market m
  WHERE
      m.id = ${id}
      AND m.maturity = ${maturity}
  GROUP BY
    m.maturity
    `;

  // const marketData = markets.map((market) => ({
  //   id: market.id,
  //   name: market.name,
  //   lltv: market.lltv,
  //   market_volume: market.market_volume,
  //   borrow_apy: market.borrow_apy,
  //   lending_apy: market.lending_apy,
  //   loan_token: {
  //     address: market.loan_token,
  //     name: market.loan_token_name,
  //     image_uri: market.loan_token_image_uri,
  //     decimal: market.loan_token_decimal,
  //     symbol: market.loan_token_symbol,
  //   },
  //   collateral_token: {
  //     address: market.collateral_token,
  //     name: market.collateral_token_name,
  //     image_uri: market.collateral_token_image_uri,
  //     decimal: market.collateral_token_decimal,
  //     symbol: market.collateral_token_symbol,
  //   },
  //   maturity_date: new Date(Number(market.maturity) * 1000),
  //   maturity: market.maturity,
  // }));

  return NextResponse.json(market);
}
