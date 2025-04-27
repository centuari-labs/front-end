import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function GET() {
  const sql = neon(process.env.DATABASE_URL ?? "");
  const markets = await sql`SELECT 
  m.*,
  lt.name as loan_token_name,
  lt.image_uri as loan_token_image_uri,
  lt.decimal as loan_token_decimal,
  lt.symbol as loan_token_symbol,
  ct.name as collateral_token_name,
  ct.image_uri as collateral_token_image_uri,
  ct.decimal as collateral_token_decimal,
  ct.symbol as collateral_token_symbol
FROM 
    market m
    left join token lt on lower(lt.address) = lower(m.loan_token)
    LEFT JOIN TOKEN ct ON lower(ct.address) = lower(m.collateral_token);`;

  const marketData = markets.map((market) => ({
    id: market.id,
    name: market.name,
    lltv: market.lltv,
    market_volume: market.market_volume,
    borrow_apy: market.borrow_apy,
    lending_apy: market.lending_apy,
    loan_token: {
      address: market.loan_token,
      name: market.loan_token_name,
      image_uri: market.loan_token_image_uri,
      decimal: market.loan_token_decimal,
      symbol: market.loan_token_symbol,
    },
    collateral_token: {
      address: market.collateral_token,
      name: market.collateral_token_name,
      image_uri: market.collateral_token_image_uri,
      decimal: market.collateral_token_decimal,
      symbol: market.collateral_token_symbol,
    },
    maturity_date: new Date(Number(market.maturity) * 1000),
  }));

  return NextResponse.json(marketData);
}
