'use client'

import { useSimulateContract, useWriteContract } from "wagmi";
import CentuariPrimeAbi from "@/lib/abis/CentuariPrime.json";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { CENTUARI_PRIME } from "@/lib/tokenAddress";

interface UseVaultDepositProps {
  config?: {
    curator: string;
    token: string;
    name: string;
    amount: number;
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
    successMessage: `Deposited ${config?.amount} to ${config?.name} successfully!`,
    errorMessage: "Failed to deposit",
  },
}: UseVaultDepositProps) => {
  const toastIdRef = useRef<any>("");

  const {
    data: simulateData,
    error: simulateError,
    refetch,
  } = useSimulateContract({
    address: CENTUARI_PRIME,
    abi: CentuariPrimeAbi,
    functionName: "deposit",
    args: [
      {
        curator: config?.curator as `0x${string}`,
        token: config?.token as `0x${string}`,
        name: config?.name,
      },
      config?.amount,
    ],
    query: {
      enabled: false,
    },
  });

  useEffect(() => {
    if (config) {
      console.log("Deposit config:", {
        curator: config.curator,
        token: config.token,
        name: config.name,
        amount: config.amount,
      });
    }
  }, [config]);

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
      if (toastOptions.showToast) {
        toastIdRef.current = toast.loading(
          toastOptions.pendingMessage || "Processing transaction..."
        );
      }

      const { data } = await refetch();
      console.log("Simulation data:", data);

      if (!data?.request) {
        throw new Error("Failed to simulate transaction");
      }

      writeContract(data.request);
    } catch (error) {
      if (toastOptions.showToast && toastIdRef.current) {
        toast.error(toastOptions.errorMessage || "Transaction failed", {
          id: toastIdRef.current,
          description: (error as Error)?.message || "Unknown error",
        });
        toastIdRef.current = undefined;
      }
      console.error("Transaction error:", error);
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

    if (isError && (simulateError || writeError) && toastIdRef.current) {
      toast.error(toastOptions.errorMessage || "Transaction failed", {
        id: toastIdRef.current,
        description:
          simulateError?.message || writeError?.message || "Unknown error",
      });
      toastIdRef.current = undefined;
    }
  }, [
    isSuccess,
    isError,
    txHash,
    simulateError,
    writeError,
    toastOptions.showToast,
    toastOptions.successMessage,
    toastOptions.errorMessage,
  ]);

  return {
    deposit,
    simulateData,
    simulateError,
    txHash,
    writeError,
    isPending,
    isSuccess,
    isError,
  };
};
