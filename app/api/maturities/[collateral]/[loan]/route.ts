import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ collateral: string; loan: string }> }
) {
  const { collateral, loan } = await params;

  const sql = neon(process.env.DATABASE_URL ?? "");
  const maturities = await sql`SELECT 
  id as market_id, maturity
FROM market m
WHERE
  m.loan_token = ${loan} and m.collateral_token = ${collateral} and maturity > CAST(EXTRACT(epoch FROM NOW()) AS INT)
order by maturity asc
`;

  return NextResponse.json(maturities);
}
