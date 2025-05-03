"use client";

import { TokenSingle } from "@/components/token-single";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApproval } from "@/hooks/use-approval";
import { useTokenBalance } from "@/hooks/use-token-balance";
import { useWithdrawCurator } from "@/hooks/use-withdraw-curator";
import { parseToRate } from "@/lib/helper";
import { CENTUARI, METH_TOKEN, USDC_TOKEN } from "@/lib/tokenAddress";
import { IVaultPositionProps } from "@/lib/types";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const VaultPositionList = () => {
  const { address } = useAccount();
  const { approve, error, isApproving } = useApproval();

  const [balances, setBalances] = useState<Record<string, string>>({});
  const [vaultData, setVaultData] = useState<IVaultPositionProps[]>([]);

  async function getVaultPosition() {
    const res = await fetch(`/api/my-position/${address}/vault`);
    if (!res.ok) return undefined;
    const resData = await res.json();
    setVaultData(resData);
  }

  useEffect(() => {
    getVaultPosition();
  }, []);

  useEffect(() => {
    async function fetchBalances() {
      const balancePromises = vaultData.map(
        (vault) =>
          useTokenBalance({
            tokenAddress: vault.centuari_prime_token as `0x${string}`,
          }).balance
      );

      const resolvedBalances = await Promise.all(balancePromises);
      const balanceMap = vaultData.reduce((acc, vault, index) => {
        acc[vault.centuari_prime_token] =
          resolvedBalances[index]?.toString() || "";
        return acc;
      }, {} as Record<string, string>);

      setBalances(balanceMap);
    }

    if (vaultData.length > 0) {
      fetchBalances();
    }
  }, [vaultData]);

  const { withdrawCurator } = useWithdrawCurator({
    address: CENTUARI,
    config: {
      curator: USDC_TOKEN,
      token: METH_TOKEN,
      name: "name",
      shares: BigInt("1194"), // contoh 1194 USDC
    },
  });

  const handleWithdrawCurator = async () => {
    await approve({
      amount: BigInt("83138790259"),
      spender: CENTUARI,
      address: USDC_TOKEN as `0x${string}`,
    });
    await withdrawCurator();
  };

  return (
    <AccordionItem
      value="item-1"
      className="border border-muted-dark/40 dark:border-muted-dark/40 px-4 rounded-md bg-card dark:bg-card-dark"
    >
      <AccordionTrigger className="text-start">
        <div>
          <h1>Vault</h1>
          <p className="text-xs font-light">{vaultData.length} Position</p>
        </div>
      </AccordionTrigger>
      <AccordionContent className="border-t border-muted-dark/40 dark:border-muted-dark/40 pt-4">
        {vaultData.length > 0 ? (
          vaultData.map((vault, i) => (
            <div
              key={i}
              className="rounded-md border border-muted-dark/40 dark:border-muted-dark/40"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vault Name</TableHead>
                    <TableHead>Vault APY</TableHead>
                    <TableHead>Token</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Vault Token</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{vault.name}</TableCell>
                    <TableCell>{parseToRate(vault.apy)}%</TableCell>
                    <TableCell>
                      <TokenSingle
                        tokenUrl={vault.token_image_uri}
                        name={vault.token_symbol}
                      />
                    </TableCell>
                    <TableCell>
                      {balances[vault.centuari_prime_token] || "Loading..."}
                    </TableCell>
                    <TableCell>{vault.centuari_prime_token_symbol}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Withdraw
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-3 h-52 items-center justify-center">
            <p>No Position Yet</p>
            <Button variant={"colorful"}>View Vault</Button>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
