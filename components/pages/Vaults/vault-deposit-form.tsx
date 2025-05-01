'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTokenBalance } from "@/hooks/use-token-balance";
import { useVaultDeposit } from "@/hooks/use-vault-deposit";
import { parseToAmount } from "@/lib/helper";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { CENTUARI_PRIME } from "@/lib/tokenAddress";
import { useApproval } from "@/hooks/use-approval";
import { useRouter } from 'next/navigation';

interface IVaultDepositFormProps {
    curatorAddress: string;
    vaultName: string;
    vaultTokenAddress: string;
    vaultTokenSymbol: string;
    vaultTokenDecimals: number;
    centuariPrimeTokenAddress: string;
    centuariPrimeTokenSymbol: string;
    onSuccess?: () => void;
}

export function VaultDepositForm({ 
            curatorAddress, 
            vaultName, 
            vaultTokenAddress, 
            vaultTokenSymbol, 
            vaultTokenDecimals, 
            centuariPrimeTokenAddress, 
            centuariPrimeTokenSymbol,
            onSuccess
        }: IVaultDepositFormProps) 
    {
    const router = useRouter();

    const { address } = useAccount();
    const [depositAmount, setDepositAmount] = useState(0);
    
    const approvalHandler = useApproval();
    
    const { balance: centuariPrimeBalance, refetch: refetchPrimeBalance } = useTokenBalance({
        tokenAddress: centuariPrimeTokenAddress as `0x${string}`
    });

    const { balance: vaultBalance, refetch: refetchVaultBalance } = useTokenBalance({
        tokenAddress: vaultTokenAddress as `0x${string}`
    });

    const { 
        deposit,
        txHash,
        writeError,
        isPending,
        isSuccess,
        isError 
    } = useVaultDeposit({
        config: {
            curator: curatorAddress as `0x${string}`,
            token: vaultTokenAddress as `0x${string}`,
            name: vaultName,
            amount: depositAmount * 10 ** vaultTokenDecimals,
            tokenDecimals: vaultTokenDecimals
        }
    });

    // Effect to handle successful deposits
    useEffect(() => {
        if (isSuccess && txHash) {
            // Reset form and refresh balances
            setDepositAmount(0);
            refetchPrimeBalance();
            refetchVaultBalance();
            
            // Refresh the current route
            router.refresh();
        }
    }, [isSuccess, isError, txHash]);

    const handleDeposit = async () => {
        if (!address || !depositAmount || depositAmount <= 0) {
            console.error("Invalid deposit parameters");
            return;
        }
        
        
        try {
            const result = await approvalHandler.approve({
                spender: CENTUARI_PRIME as `0x${string}`,
                amount: BigInt(depositAmount * 10 ** vaultTokenDecimals),
                address: vaultTokenAddress as `0x${string}`,
            });
            
            await deposit();
        } catch (error) {
            console.error("Deposit process failed:", error);
        }
    }

    return (
        <div className="relative w-full max-w-sm">
            <div className="flex items-center w-full">
                <Input
                    type="text"
                    placeholder={`Deposit ${vaultTokenSymbol}`}
                    className="w-full appearance-none"
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    value={depositAmount || ''}
                />
                <span className="ml-2">{vaultTokenSymbol}</span>
            </div>
            <div className="mt-4">
                <div>
                    <div className="text-sm dark:text-white/70">Your position</div>
                    <div className="text-base font-bold">{parseToAmount(centuariPrimeBalance?.toString() ?? "0", vaultTokenDecimals)} {centuariPrimeTokenSymbol}</div>
                </div>
                <div className="mt-4">
                    <div className="text-sm dark:text-white/70">Wallet Balance</div>
                    <div className="text-base font-bold">{parseToAmount(vaultBalance?.toString() ?? "0", vaultTokenDecimals)} {vaultTokenSymbol}</div>
                </div>
            </div>
            <Button variant={"colorful"} className="w-full mt-4" onClick={handleDeposit} disabled={isPending || !depositAmount || depositAmount <= 0}>
                Deposit
            </Button>
        </div>
    );
}
