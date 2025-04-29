import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import { IVaultMarketDataProps } from "@/lib/data";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;

  const sql = neon(process.env.DATABASE_URL ?? "");
  
  const vault = await sql `
    SELECT
      vm.index,
      vm.rate,
      vm.cap,
      vm.maturity,
      lt.address as loan_token_address,
      lt.name as loan_token_name,
      lt.symbol as loan_token_symbol,
      lt.decimal as loan_token_decimals,
      lt.image_uri as loan_token_image_uri,
      ct.address as collateral_token_address,
      ct.name as collateral_token_name,
      ct.symbol as collateral_token_symbol,
      ct.decimal as collateral_token_decimals,
      ct.image_uri as collateral_token_image_uri	
    FROM vault_market vm
    LEFT JOIN token lt ON lower(lt.address) = lower(vm.loan_token)
    LEFT JOIN token ct on lower(ct.address) = lower(vm.collateral_token)
    WHERE vm.vault = ${address}
    ORDER BY vm.index ASC`;

  const vaultData: IVaultMarketDataProps[] = vault.map((vault) => ({
    loan_token: vault.loan_token_address,
    loan_token_symbol: vault.loan_token_symbol,
    loan_token_image_uri: vault.loan_token_image_uri,
    loan_token_decimals: vault.loan_token_decimals,
    collateral_token: vault.collateral_token_address,
    collateral_token_symbol: vault.collateral_token_symbol,
    collateral_token_image_uri: vault.collateral_token_image_uri,
    collateral_token_decimals: vault.collateral_token_decimals,
    maturity: vault.maturity,
    rate: vault.rate,
    cap: vault.cap,
    index: vault.index
  }));
  
  return NextResponse.json(vaultData);
}
