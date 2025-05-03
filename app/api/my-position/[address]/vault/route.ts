import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;

  const sql = neon(process.env.DATABASE_URL ?? "");
  const vaults = await sql`SELECT 
  v.vault,
  v.curator,
  v.name,
  v.apy,
  t.address as token_address,
  t.name as token_name,
  t.symbol as token_symbol,
  t.decimal as token_decimal,
  t.image_uri as token_image_uri,
  v.centuari_prime_token as centuari_prime_token,
  v.centuari_prime_token_name as centuari_prime_token_name,
  v.centuari_prime_token_symbol as centuari_prime_token_symbol
FROM vault_deposit vd, vault v 
LEFT JOIN token t on lower(t.address) = lower(v.token)
WHERE v.vault = vd.vault AND lower(vd.user) = lower(${address})
`;

  return NextResponse.json(vaults);
}
