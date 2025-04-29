import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { IVaultData } from "@/lib/data";
import { TokenSingle } from "@/components/token-single";
import { parseToAmount, parseToRate } from "@/lib/helper";

interface IVaultTableProps {
  vaults: IVaultData[];
}

export function VaultTable({ vaults }: IVaultTableProps) {
  return (
    <div className="rounded-md border dark:border-white/20">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Vault</TableHead>
            <TableHead className="hidden md:table-cell text-center">
              Token
            </TableHead>
            <TableHead className="hidden md:table-cell text-center">
              Deposit
            </TableHead>
            <TableHead className="text-center">Curator</TableHead>
            <TableHead className="text-center">APY</TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vaults.map((vault) => (
            <TableRow key={vault.address}>
              <TableCell>
                <div className="flex justify-center">{vault.name}</div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <TokenSingle
                    name={vault.token_symbol}
                    tokenUrl={vault.token_image_uri}
                  />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-center">
                {parseFloat(vault.deposit) > 0
                  ? `$${parseToAmount(vault.deposit, vault.token_decimals)}`
                  : "-"}
              </TableCell>
              <TableCell className="hidden md:table-cell text-center">
                {vault.curator}
              </TableCell>
              <TableCell
                className={cn(
                  parseFloat(vault.apy) > 5
                    ? "text-green-500 font-medium text-center"
                    : "text-center"
                )}
              >
                {parseToRate(vault.apy)}%
              </TableCell>
              <TableCell className="text-center">
                <Link href={`/vaults/${vault.address}`}>
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
  );
}
