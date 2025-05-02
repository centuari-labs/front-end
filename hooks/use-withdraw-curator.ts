import { useWriteContract } from "wagmi";
import CentuariPrimeAbi from "@/lib/abis/CentuariPrime.json";
import { toast } from "sonner";
import { useEffect } from "react";

interface UseWithdrawCuratorProps {
  address: `0x${string}`;
  config?: {
    curator?: `0x${string}`;
    token?: `0x${string}`;
    name?: string;
    shares?: bigint;
  };
  toastOptions?: {
    showToast?: boolean;
    pendingMessage?: string;
    successMessage?: string;
    errorMessage?: string;
  };
}

export const useWithdrawCurator = ({
  address,
  config,
  toastOptions = {
    showToast: true,
    pendingMessage: "Withdrawing...",
    successMessage: "Withdrawn successfully!",
    errorMessage: "Failed to withdraw",
  },
}: UseWithdrawCuratorProps) => {
  const {
    writeContract,
    data: txHash,
    error: writeError,
    isPending,
    isSuccess,
    isError,
  } = useWriteContract();

  const withdrawCurator = async () => {
    let toastId: string | number | undefined;
    try {
      if (toastOptions.showToast) {
        toastId = toast.loading(
          toastOptions.pendingMessage || "Processing transaction..."
        );
      }

      const request = {
        address,
        abi: CentuariPrimeAbi,
        functionName: "withdraw",
        args: [
          {
            curator: config?.curator || ("0x..." as `0x${string}`),
            token: config?.token || ("0x..." as `0x${string}`),
            name: config?.name,
          },
          config?.shares || BigInt(5_000),
        ],
      };

      writeContract(request);
    } catch (error) {
      if (toastOptions.showToast && toastId) {
        toast.error(toastOptions.errorMessage || "Transaction failed", {
          id: toastId,
          description: (error as Error)?.message || "Unknown error",
        });
      }
      console.error("Withdraw collateral transaction error:", error);
    }
  };

  useEffect(() => {
    if (!toastOptions.showToast) return;

    if (isSuccess && txHash) {
      toast.success(toastOptions.successMessage || "Transaction successful", {
        description: `Transaction Hash: ${txHash.slice(0, 10)}...${txHash.slice(
          -8
        )}`,
      });
    }

    if (isError && writeError) {
      toast.error(toastOptions.errorMessage || "Transaction failed", {
        description: writeError?.message || "Unknown error",
      });
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
    withdrawCurator,
    txHash,
    writeError,
    isPending,
    isSuccess,
    isError,
  };
};
