import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const rpcResult = await fetch("https://devnet.dplabs-internal.com/", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const json = await rpcResult.json();

  return NextResponse.json(json);
}
