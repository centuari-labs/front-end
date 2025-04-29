import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { IVaultData } from "@/lib/data";

export async function GET(params: { params: { address: string } }) {
//   const { address } = await params;

  const sql = neon(process.env.DATABASE_URL ?? "");
  
  const vault = await sql `
    SELECT 
        v.*, 
        t.symbol as token_symbol, 
        t.image_uri as token_image_uri,
        t.decimal as token_decimals
    FROM vault v
    LEFT JOIN token t ON lower(v.token) = lower(t.address)`;

  const vaultData: IVaultData[] = vault.map((vault) => ({
    address: vault.vault,
    name: vault.name,
    curator: "Centuari",
    token: vault.token,
    token_symbol: vault.token_symbol,
    token_image_uri: vault.token_image_uri,
    token_decimals: vault.token_decimals,
    deposit: vault.deposit,
    apy: vault.apy
  }));
  return NextResponse.json(vaultData);
}
