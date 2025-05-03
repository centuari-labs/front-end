import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;

  const sql = neon(process.env.DATABASE_URL ?? "");
  const lending = await sql`
    SELECT alp.* from active_lending_position alp
    WHERE lower(alp.trader) = lower(${address})
`;

  return NextResponse.json(lending);
}
