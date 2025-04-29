  import { Input } from "@/components/ui/input";
  import { Metadata } from "next";
  import { Button } from "@/components/ui/button";
  import { marketData } from "@/lib/data";
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

  export const metadata: Metadata = {
    title: "Vaults - DeFi Lending & Borrowing",
    description: "View vault",
  };

  export default async function VaultPage({ params }: { params: { id: string } }) {
    const { id: vaultAddress } = await params;
    //@todo fetch vault detail data from database

    return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">USDC housesteak</h1>
            <p className="text-muted-foreground dark:text-muted-dark">
              The vault curated by Centuari is intended to seamlessly allocate
              USDC liquidity to Centuari markets.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="grid grid-cols-3 gap-12">
                <div className="flex flex-col gap-4">
                  <div>Total Deposits (USDC)</div>
                  <div>
                    <div className="text-2xl font-bold">$375.21 M</div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div>APY</div>
                  <div className="text-2xl font-bold">3.5%</div>
                </div>
              </div>
              <div className="mt-8">
                <div className="rounded-md border dark:border-white/20 w-full">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center" colSpan={3}>
                          Market
                        </TableHead>
                        <TableHead className="hidden md:table-cell text-center">
                          Allocation
                        </TableHead>
                        <TableHead className="hidden md:table-cell text-center">
                          Total supply
                        </TableHead>
                        <TableHead className="text-center">Cap</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {marketData.map((market) => (
                        <TableRow key={market.id}>
                          <TableCell>
                            <div className="flex justify-start">
                              {market.collateral_token}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-start">
                              {/* {market.maturity} */}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-start">
                              {/* {market.rate} */}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-center">
                            {market.borrowingAPY}%
                          </TableCell>
                          <TableCell>${market.ltv.toLocaleString()}</TableCell>
                          <TableCell>${market.ltv.toLocaleString()}</TableCell>
                          <TableCell className="text-center">
                            <Link href={`/markets/${market.id}`}>
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
            <div className="relative w-full max-w-sm">
              <Input
                type="text"
                placeholder="Deposit USDC"
                className="w-full appearance-none "
              />
              <div className="mt-8">
                <div>
                  <div className="text-sm dark:text-white/70">Your position</div>
                  <div>
                    <div className="text-base font-bold">$1 M</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm dark:text-white/70">APY</div>
                  <div>
                    <div className="text-base font-bold">5.11%</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm dark:text-white/70">Wallet Balance</div>
                  <div>
                    <div className="text-base font-bold">$21 M</div>
                  </div>
                </div>
              </div>
              <Button variant={"colorful"} className="w-full mt-4">
                Deposit
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
