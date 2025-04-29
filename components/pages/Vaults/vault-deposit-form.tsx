'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTokenBalance } from "@/hooks/use-token-balance";
import { parseToAmount } from "@/lib/helper";

interface IVaultDepositFormProps {
    vaultTokenAddress: string;
    vaultTokenSymbol: string;
    vaultTokenDecimals: number;
    centuariPrimeTokenAddress: string;
    centuariPrimeTokenSymbol: string;
}

export function VaultDepositForm({ vaultTokenAddress, vaultTokenSymbol, vaultTokenDecimals, centuariPrimeTokenAddress, centuariPrimeTokenSymbol }: IVaultDepositFormProps) {
    
    const { balance: centuariPrimeBalance } = useTokenBalance({
        tokenAddress: centuariPrimeTokenAddress as `0x${string}`
    });

    const { balance: vaultBalance } = useTokenBalance({
        tokenAddress: vaultTokenAddress as `0x${string}`
    });

    return (
        <div className="relative w-full max-w-sm">
            <Input
                type="text"
                placeholder={`Deposit ${vaultTokenSymbol}`}
                className="w-full appearance-none "
            />
        <div className="mt-8">
        <div>
            <div className="text-sm dark:text-white/70">Your position</div>
            <div>
            <div className="text-base font-bold">{parseToAmount(centuariPrimeBalance?.toString() ?? "0", 18)} {centuariPrimeTokenSymbol}</div>
            </div>
        </div>
        <div className="mt-4">
            <div className="text-sm dark:text-white/70">Wallet Balance</div>
            <div>
            <div className="text-base font-bold">{parseToAmount(vaultBalance?.toString() ?? "0", vaultTokenDecimals)} {vaultTokenSymbol}</div>
            </div>
        </div>
        </div>
        <Button variant={"colorful"} className="w-full mt-4">
            Deposit
        </Button>
        </div>
    );
}
