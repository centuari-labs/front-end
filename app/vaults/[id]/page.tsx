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
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { VAULT_DETAIL_API, VAULT_DETAIL_MARKET_API } from "@/lib/api";
import { parseToAmount, parseToRate } from "@/lib/helper";
import { TokenSingle } from "@/components/token-single";
import { VaultDepositForm } from "@/components/pages/Vaults/vault-deposit-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export const metadata: Metadata = {
  title: "Vaults - DeFi Lending & Borrowing",
  description: "View vault",
};

export default async function VaultPage({
  params,
}: {
  params: { id: string };
}) {
  const { id: vaultAddress } = await params;
  const vault = await fetch(VAULT_DETAIL_API(vaultAddress), {
    cache: "no-store",
    next: { revalidate: 0 }, // Disable cache for this request
  });
  const vaultData = await vault.json();

  const markets = await fetch(VAULT_DETAIL_MARKET_API(vaultAddress), {
    cache: "no-store",
    next: { revalidate: 0 }, // Disable cache for this request
  });
  const marketsData = await markets.json();

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <Link href="/markets">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">
            {vaultData.name}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <Card className="card-colorful w-2/3">
            <CardHeader>
              <CardTitle>Vault Overview</CardTitle>
              <CardDescription>
                This vault is designed to efficiently allocate MUSDC liquidity
                to various markets.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-12">
                <div className="flex flex-col gap-4">
                  <div>Total Deposits ({vaultData.token_symbol})</div>
                  <div>
                    <div className="text-2xl font-bold">
                      {parseToAmount(
                        vaultData.deposit,
                        vaultData.token_decimals
                      )}{" "}
                      {vaultData.token_symbol}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div>APY</div>
                  <div className="text-2xl font-bold">
                    {parseToRate(vaultData.apy)}%
                  </div>
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
                            {new Date(
                              Number(market.maturity) * 1000
                            ).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </TableCell>
                          <TableCell className="text-center">
                            {parseToRate(market.rate)}%
                          </TableCell>
                          <TableCell className="text-center">
                            {parseFloat(
                              (
                                ((Number(market.cap) /
                                  Number(vaultData.deposit)) *
                                  100) /
                                10 ** 6
                              ).toFixed(2)
                            )}
                            %
                          </TableCell>
                          <TableCell className="text-center">
                            {parseToAmount(
                              market.cap,
                              market.loan_token_decimals
                            )}{" "}
                            {market.loan_token_symbol}
                          </TableCell>
                          <TableCell className="text-center">
                            <Link
                              href={`/markets/${market.collateral_token}/${market.loan_token}`}
                            >
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
            </CardContent>
          </Card>
          <Card className="card-colorful h-fit w-1/3">
            <CardHeader>
              <CardTitle>Deposit</CardTitle>
            </CardHeader>
            <CardContent>
              <VaultDepositForm
                curatorAddress={vaultData.curator}
                vaultName={vaultData.name}
                vaultTokenAddress={vaultData.token}
                vaultTokenSymbol={vaultData.token_symbol}
                vaultTokenDecimals={vaultData.token_decimals}
                centuariPrimeTokenAddress={vaultData.centuari_prime_token}
                centuariPrimeTokenSymbol={vaultData.centuari_prime_token_symbol}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
