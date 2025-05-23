import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;

  const sql = neon(process.env.DATABASE_URL ?? "");
  const lending = await sql`
  SELECT * from active_lending_position
  WHERE lower(trader) = lower(${address})
`;

  return NextResponse.json(lending);
}
