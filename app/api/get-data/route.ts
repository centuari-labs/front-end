import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function GET() {
  const sql = neon(process.env.DATABASE_URL ?? "");
  const response = await sql`SELECT version()`;
  return NextResponse.json(response);
}
