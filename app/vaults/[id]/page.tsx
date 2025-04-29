import { Input } from "@/components/ui/input";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { IVaultMarketDataProps } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { VAULT_DETAIL_API, VAULT_DETAIL_MARKET_API } from "@/lib/api";
import { parseToAmount, parseToRate } from "@/lib/helper";
import { TokenSingle } from "@/components/token-single";
import { VaultDepositForm } from "@/components/pages/Vaults/vault-deposit-form";

export const metadata: Metadata = {
  title: "Vaults - DeFi Lending & Borrowing",
  description: "View vault",
};

export default async function VaultPage({ params }: { params: { id: string } }) {
  const { id: vaultAddress } = await params;
  const vault = await fetch(VAULT_DETAIL_API(vaultAddress));
  const vaultData = await vault.json();

  const markets = await fetch(VAULT_DETAIL_MARKET_API(vaultAddress));
  const marketsData = await markets.json();

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{vaultData.name}</h1>
          <p className="text-muted-foreground dark:text-muted-dark">
            This vault is designed to efficiently allocate {vaultData.token_symbol} liquidity to various markets. <br />
            Managed by {vaultData.curator}, it aims to optimize returns while maintaining balanced risk exposure across different lending opportunities.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="grid grid-cols-3 gap-12">
              <div className="flex flex-col gap-4">
                <div>Total Deposits ({vaultData.token_symbol})</div>
                <div>
                  <div className="text-2xl font-bold">
                    {parseToAmount(vaultData.deposit, vaultData.token_decimals)} {vaultData.token_symbol}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div>APY</div>
                <div className="text-2xl font-bold">{parseToRate(vaultData.apy)}%</div>
              </div>
            </div>
            <div className="mt-8">
              <div className="rounded-md border dark:border-white/20 w-full">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">
                        Market Token
                      </TableHead>
                      <TableHead className="hidden md:table-cell text-center">
                        Market Maturity
                      </TableHead>
                      <TableHead className="hidden md:table-cell text-center">
                        Market Rate
                      </TableHead>
                      <TableHead className="hidden md:table-cell text-center">
                        Allocation
                      </TableHead>
                      <TableHead className="text-center">Cap</TableHead>
                      <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marketsData.map((market: IVaultMarketDataProps) => (
                      <TableRow key={market.index}>
                        <TableCell>
                          <div className="flex justify-start">
                            <TokenSingle
                              name={market.collateral_token_symbol}
                              tokenUrl={market.collateral_token_image_uri}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {new Date(Number(market.maturity) * 1000).toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell className="text-center">
                          {parseToRate(market.rate)}%
                        </TableCell>
                        <TableCell className="text-center">
                          {parseFloat(((Number(market.cap) / Number(vaultData.deposit)) * 100 / 10 ** 6).toFixed(2))}%
                        </TableCell>
                        <TableCell className="text-center">
                          {parseToAmount(market.cap, market.loan_token_decimals)} {market.loan_token_symbol}
                        </TableCell>
                        <TableCell className="text-center">
                          <Link href={`/markets/${market.collateral_token}/${market.loan_token}`}>
                            <Button variant="ghost" size="sm">
                              Details
                              <ArrowUpRight className="ml-1 h-3 w-3" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
            <VaultDepositForm
              curatorAddress={vaultData.curator}
              vaultName={vaultData.name}
              vaultTokenAddress={vaultData.token}
              vaultTokenSymbol={vaultData.token_symbol}
              vaultTokenDecimals={vaultData.token_decimals}
              centuariPrimeTokenAddress={vaultData.centuari_prime_token}
              centuariPrimeTokenSymbol={vaultData.centuari_prime_token_symbol}
            />
        </div>
      </div>
    </div>
  );
}
