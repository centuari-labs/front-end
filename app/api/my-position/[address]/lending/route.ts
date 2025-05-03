import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;

  const sql = neon(process.env.DATABASE_URL ?? "");
  const lending = await sql`
  SELECT 
  m.loan_token, lt.name as loan_token_name, lt.symbol as loan_token_symbol, lt.image_uri as loan_token_image_uri, lt.decimal as loan_token_decimal,
  m.collateral_token, ct.name as collateral_token_name, ct.symbol as collateral_token_symbol, ct.image_uri as collateral_token_image_uri, ct.decimal as collateral_token_decimal,
  m.centuari_token, cs.rate, m.maturity
FROM pharos_centuari_supply cs
  LEFT JOIN market m ON m.id = cs.market_id
  LEFT JOIN token lt ON LOWER(lt.address) = LOWER(m.loan_token)
  LEFT JOIN token ct ON LOWER(ct.address) = LOWER(m.collateral_token)
WHERE cs.user = ${address}
`;

  return NextResponse.json(lending);
}
