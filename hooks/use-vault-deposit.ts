'use client'

import { useWriteContract } from "wagmi";
import CentuariPrimeAbi from "@/lib/abis/CentuariPrime.json";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { CENTUARI_PRIME } from "@/lib/tokenAddress";
import { parseToAmount } from "@/lib/helper";

interface UseVaultDepositProps {
  config?: {
    curator: string;
    token: string;
    name: string;
    amount: number;
    tokenDecimals: number;
};
  toastOptions?: {
    showToast?: boolean;
    pendingMessage?: string;
    successMessage?: string;
    errorMessage?: string;
  };
}

export const useVaultDeposit = ({
  config,
  toastOptions = {
    showToast: true,
    pendingMessage: `Deposit to ${config?.name} vault...`,
    successMessage: `Deposited ${config?.amount ? parseToAmount(config?.amount.toString(), config?.tokenDecimals) : "0"} to ${config?.name} successfully!`,
    errorMessage: "Failed to deposit",
  },
}: UseVaultDepositProps) => {
  const toastIdRef = useRef<any>("");

  const {
    writeContract,
    data: txHash,
    error: writeError,
    isPending,
    isSuccess,
    isError,
  } = useWriteContract();

  const deposit = async () => {
    try {
      if (!config?.curator || !config?.token || !config?.name || !config?.amount) {
        throw new Error("Missing vault deposit parameters");
      }

      if (toastOptions.showToast) {
        toastIdRef.current = toast.loading(
          toastOptions.pendingMessage || "Processing transaction..."
        );
      }

      // Direct contract write without simulation
      const hash = await writeContract({
        address: CENTUARI_PRIME as `0x${string}`,
        abi: CentuariPrimeAbi,
        functionName: "deposit",
        args: [
          {
            curator: config.curator as `0x${string}`,
            token: config.token as `0x${string}`,
            name: config.name,
          },
          config.amount,
        ],
      });
      
      return hash;
    } catch (error) {
      if (toastOptions.showToast && toastIdRef.current) {
        toast.error(toastOptions.errorMessage || "Transaction failed", {
          id: toastIdRef.current,
          description: (error as Error)?.message || "Unknown error",
        });
        toastIdRef.current = undefined;
      }
      console.error("Deposit transaction error details:", error);
    }
  };

  useEffect(() => {
    if (!toastOptions.showToast) return;

    if (isSuccess && txHash && toastIdRef.current) {
      toast.success(toastOptions.successMessage || "Transaction successful", {
        id: toastIdRef.current,
        description: `Transaction Hash: ${txHash.slice(0, 10)}...${txHash.slice(
          -8
        )}`,
      });
      toastIdRef.current = undefined;
    }

    if (isError && writeError && toastIdRef.current) {
      toast.error(toastOptions.errorMessage || "Transaction failed", {
        id: toastIdRef.current,
        description: writeError?.message || "Unknown error",
      });
      toastIdRef.current = undefined;
    }
  }, [
    isSuccess,
    isError,
    txHash,
    writeError,
    toastOptions.showToast,
    toastOptions.successMessage,
    toastOptions.errorMessage,
  ]);

  return {
    deposit,
    txHash,
    writeError,
    isPending,
    isSuccess,
    isError,
  };
};
