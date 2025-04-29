import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { IVaultData } from "@/lib/data";
export async function GET() {
  const sql = neon(process.env.DATABASE_URL ?? "");
  const vaults = await sql `
    SELECT 
        v.*,
        t.name as token_name,
        t.symbol as token_symbol, 
        t.image_uri as token_image_uri,
        t.decimal as token_decimals
    FROM vault v
    LEFT JOIN token t ON lower(v.token) = lower(t.address)`;

  const vaultData: IVaultData[] = vaults.map((vault) => ({
    address: vault.vault,
    name: vault.name,
    curator: vault.curator,
    curator_name: vault.curator_name ?? "Centuari",
    token: vault.token,
    token_name: vault.token_name,
    token_symbol: vault.token_symbol,
    token_image_uri: vault.token_image_uri,
    token_decimals: vault.token_decimals,
    deposit: vault.deposit,
    apy: vault.apy,
    centuari_prime_token: vault.centuari_prime_token,
    centuari_prime_token_symbol: vault.centuari_prime_token_symbol,
    centuari_prime_token_name: vault.centuari_prime_token_name
  }));
  
  return NextResponse.json(vaultData);
}
