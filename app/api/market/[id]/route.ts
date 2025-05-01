import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const sql = neon(process.env.DATABASE_URL ?? "");
  const market = await sql`SELECT 
  m.loan_token, lt.name as loan_token_name, lt.symbol as loan_token_symbol, lt.decimal as loan_token_decimal, lt.image_uri as loan_token_image_uri,
  m.collateral_token,  ct.name as collateral_token_name, ct.symbol as collateral_token_symbol, ct.decimal as collateral_token_decimal, ct.image_uri as collateral_token_image_uri,
  maturity, lltv, market_volume, borrow_apy, lending_apy
FROM market m
  LEFT JOIN token lt ON lower(lt.address) = lower(m.loan_token)
  LEFT JOIN token ct ON lower(ct.address) = lower(m.collateral_token)
WHERE
  m.id = ${id}
    `;

  const marketDataDetail = market.length > 0 ? market[0] : null;

  const marketDetail = {
    id: marketDataDetail?.id,
    lltv: marketDataDetail?.lltv,
    market_volume: marketDataDetail?.market_volume,
    borrow_apy: marketDataDetail?.borrow_apy,
    lending_apy: marketDataDetail?.lending_apy,
    loan_token: {
      address: marketDataDetail?.loan_token,
      name: marketDataDetail?.loan_token_name,
      image_uri: marketDataDetail?.loan_token_image_uri,
      decimal: marketDataDetail?.loan_token_decimal,
      symbol: marketDataDetail?.loan_token_symbol,
    },
    collateral_token: {
      address: marketDataDetail?.collateral_token,
      name: marketDataDetail?.collateral_token_name,
      image_uri: marketDataDetail?.collateral_token_image_uri,
      decimal: marketDataDetail?.collateral_token_decimal,
      symbol: marketDataDetail?.collateral_token_symbol,
    },
    maturity_date: new Date(Number(marketDataDetail?.maturity) * 1000),
    maturity: marketDataDetail?.maturity,
  };

  return NextResponse.json(marketDetail);
}
