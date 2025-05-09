// app/api/proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const url = "https://devnet.dplabs-internal.com";
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch("https://devnet.dplabs-internal.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}
