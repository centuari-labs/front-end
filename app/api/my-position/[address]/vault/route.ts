import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;

  const sql = neon(process.env.DATABASE_URL ?? "");
  const vaults = await sql`SELECT * FROM active_vault_position avp WHERE LOWER(avp.user) = LOWER(${address});
`;

  return NextResponse.json(vaults);
}
