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
import { TokenPair } from "@/components/token-pair";
import { IVaultData } from "@/lib/data";
import { TokenSingle } from "@/components/token-single";

interface IVaultTableProps {
  vaults: IVaultData[];
}

export function VaultTable({ vaults }: IVaultTableProps) {
  return (
    <div className="rounded-md border dark:border-white/20">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Curator</TableHead>
            <TableHead className="hidden md:table-cell text-center">
              Loan
            </TableHead>
            <TableHead className="hidden md:table-cell text-center">
              LTV
            </TableHead>
            <TableHead className="text-center">Liquidity</TableHead>
            <TableHead className="text-center">APY</TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vaults.map((vault) => (
            <TableRow key={vault.id}>
              <TableCell>
                <div className="flex justify-center">{vault.name}</div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <TokenSingle
                    name={vault.lend_token}
                    tokenUrl={vault.lendTokenUrl}
                  />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-center">
                ${vault.marketVolume.toLocaleString()}
              </TableCell>
              <TableCell className="hidden md:table-cell text-center">
                ${vault.ltv.toLocaleString()}
              </TableCell>
              <TableCell
                className={cn(
                  vault.apy > 5
                    ? "text-green-500 font-medium text-center"
                    : "text-center"
                )}
              >
                {vault.apy}%
              </TableCell>
              <TableCell className="text-center">
                <Link href={`/vaults/${vault.id}`}>
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
