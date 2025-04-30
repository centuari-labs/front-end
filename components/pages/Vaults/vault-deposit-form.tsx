'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTokenBalance } from "@/hooks/use-token-balance";
import { useVaultDeposit } from "@/hooks/use-vault-deposit";
import { parseToAmount } from "@/lib/helper";
import { useState } from "react";
import { useAccount } from "wagmi";
import { CENTUARI_PRIME } from "@/lib/tokenAddress";
import { useApproval } from "@/hooks/use-approval";

interface IVaultDepositFormProps {
    curatorAddress: string;
    vaultName: string;
    vaultTokenAddress: string;
    vaultTokenSymbol: string;
    vaultTokenDecimals: number;
    centuariPrimeTokenAddress: string;
    centuariPrimeTokenSymbol: string;
}

export function VaultDepositForm({ 
            curatorAddress, 
            vaultName, 
            vaultTokenAddress, 
            vaultTokenSymbol, 
            vaultTokenDecimals, 
            centuariPrimeTokenAddress, 
            centuariPrimeTokenSymbol  
        }: IVaultDepositFormProps) 
    {

    const { address } = useAccount();
    const [depositAmount, setDepositAmount] = useState(0);
    
    const approvalHandler = useApproval();
    
    const { balance: centuariPrimeBalance } = useTokenBalance({
        tokenAddress: centuariPrimeTokenAddress as `0x${string}`
    });

    const { balance: vaultBalance } = useTokenBalance({
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
        }
    });

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
            <Input
                type="text"
                placeholder={`Deposit ${vaultTokenSymbol}`}
                className="w-full appearance-none "
                onChange={(e) => setDepositAmount(Number(e.target.value))}
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
            <Button variant={"colorful"} className="w-full mt-4" onClick={handleDeposit}>
                Deposit
            </Button>
        </div>
    );
}
