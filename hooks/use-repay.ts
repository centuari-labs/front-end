import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import CentuariAbi from "@/lib/abis/Centuari.json";
import { toast } from "sonner";
import { useEffect } from "react";

interface UseRepayProps {
  address: `0x${string}`;
  config: {
    loanToken: `0x${string}`;
    collateralToken: `0x${string}`;
    maturity: bigint;
    rate: bigint;
    amount: bigint;
  };
  toastOptions?: {
    showToast?: boolean;
    pendingMessage?: string;
    successMessage?: string;
    errorMessage?: string;
  };
}

export const useRepay = ({
  address,
  config,
  toastOptions = {
    showToast: true,
    pendingMessage: "Repaying loan...",
    successMessage: "Loan repaid successfully!",
    errorMessage: "Failed to repay loan",
  },
}: UseRepayProps) => {
  const {
    writeContract,
    data: txHash,
    error: writeError,
    isPending,
    isSuccess,
    isError,
  } = useWriteContract();

  const { isLoading: isRepayLoading } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const repay = async () => {
    let toastId: string | number | undefined;

    try {
      if (toastOptions.showToast) {
        toastId = toast.loading(
          toastOptions.pendingMessage || "Processing transaction..."
        );
      }

      const { loanToken, collateralToken, maturity } = config;

      await writeContract({
        address,
        abi: CentuariAbi,
        functionName: "repay",
        args: [
          {
            loanToken,
            collateralToken,
            maturity,
          },
          config.rate,
          config.amount,
        ],
      });
    } catch (error) {
      if (toastOptions.showToast && toastId) {
        toast.error(toastOptions.errorMessage || "Transaction failed", {
          id: toastId,
          description: (error as Error)?.message || "Unknown error",
        });
      }
      console.error("Repay transaction error:", error);
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
    repay,
    txHash,
    writeError,
    isPending,
    isSuccess,
    isError,
    isRepayLoading,
  };
};
