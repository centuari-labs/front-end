import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const sql = neon(process.env.DATABASE_URL ?? "");
  const market = await sql`SELECT 
    m.*
  FROM 
      market m
  WHERE
      m.id = ${id}
    `;

  return NextResponse.json(market.length > 0 ? market[0] : null);
}
