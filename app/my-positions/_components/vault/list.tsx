"use client";

import { TokenPair } from "@/components/token-pair";
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
import { parseToRate } from "@/lib/helper";
import { IVaultPositionProps } from "@/lib/types";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const VaultPositionList = () => {
  const { address } = useAccount();

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
                    <TableHead>Name</TableHead>
                    <TableHead>Borrowed</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Value
                    </TableHead>
                    <TableHead className="hidden md:table-cell">APY</TableHead>
                    <TableHead>Collateral</TableHead>
                    <TableHead>Maturity</TableHead>
                    <TableHead>Health Factor</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{vault.name}</TableCell>
                    <TableCell>2.5 ETH</TableCell>
                    <TableCell>$5,000</TableCell>
                    <TableCell>{parseToRate(vault.apy)}%</TableCell>
                    <TableCell>USDT</TableCell>
                    <TableCell>September 30, 2023</TableCell>
                    <TableCell>1.85</TableCell>
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
