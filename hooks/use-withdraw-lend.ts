import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import CentuariClobAbi from "@/lib/abis/CentuariCLOB.json";
import { toast } from "sonner";
import { useEffect } from "react";

interface UseWithdrawLendProps {
  address: `0x${string}`;
  toastOptions?: {
    showToast?: boolean;
    pendingMessage?: string;
    successMessage?: string;
    errorMessage?: string;
  };
}

export const useWithdrawLend = ({
  address,
  toastOptions = {
    showToast: true,
    pendingMessage: "Withdrawing lend...",
    successMessage: "Lend withdrawn successfully!",
    errorMessage: "Failed to withdraw lend",
  },
}: UseWithdrawLendProps) => {
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

  const withdrawLend = async ({
    loanToken,
    collateralToken,
    shares,
    maturity,
    rate,
  }: {
    loanToken: `0x${string}`;
    collateralToken: `0x${string}`;
    shares: bigint;
    maturity: bigint;
    rate: bigint;
  }) => {
    let toastId: string | number | undefined;
    try {
      if (toastOptions.showToast) {
        toastId = toast.loading(
          toastOptions.pendingMessage || "Processing transaction..."
        );
      }

      const request = {
        address,
        abi: CentuariClobAbi,
        functionName: "withdraw",
        args: [
          {
            loanToken: loanToken || ("0x..." as `0x${string}`),
            collateralToken: collateralToken || ("0x..." as `0x${string}`),
            maturity: maturity,
          },
          rate,
          shares,
        ],
      };

      await writeContract(request);
    } catch (error) {
      if (toastOptions.showToast && toastId) {
        toast.error(toastOptions.errorMessage || "Transaction failed", {
          id: toastId,
          description: (error as Error)?.message || "Unknown error",
        });
      }
      console.error("Withdraw lend transaction error:", error);
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
    withdrawLend,
    txHash,
    writeError,
    isPending,
    isSuccess,
    isError,
  };
};
