import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import { IVaultData } from "@/lib/data";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;

  const sql = neon(process.env.DATABASE_URL ?? "");
  
  const vault = await sql `
    SELECT 
        v.*, 
        t.name as token_name,
        t.symbol as token_symbol,
        t.image_uri as token_image_uri,
        t.decimal as token_decimals
    FROM vault v
    LEFT JOIN token t ON lower(v.token) = lower(t.address)
    WHERE v.vault = ${address}`;
  
  const vaultDataDetail = vault.length > 0 ? vault[0] : null;
  
  const vaultData: IVaultData = {
    address: vaultDataDetail?.vault,
    name: vaultDataDetail?.name,
    curator: vaultDataDetail?.curator,
    curator_name: vaultDataDetail?.curator_name ?? "Centuari",
    token: vaultDataDetail?.token,
    token_name: vaultDataDetail?.token_name,
    token_symbol: vaultDataDetail?.token_symbol,
    token_image_uri: vaultDataDetail?.token_image_uri,
    token_decimals: vaultDataDetail?.token_decimals,
    deposit: vaultDataDetail?.deposit,
    apy: vaultDataDetail?.apy,
    centuari_prime_token: vaultDataDetail?.centuari_prime_token,
    centuari_prime_token_symbol: vaultDataDetail?.centuari_prime_token_symbol,
    centuari_prime_token_name: vaultDataDetail?.centuari_prime_token_name
  };
  return NextResponse.json(vaultData);
}
