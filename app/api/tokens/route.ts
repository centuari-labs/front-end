import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function GET() {
  const sql = neon(process.env.DATABASE_URL ?? "");
  const tokens = await sql`
    SELECT 
        *
    FROM token t`;

  return NextResponse.json(tokens);
}
