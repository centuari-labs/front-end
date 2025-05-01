import { useWriteContract } from "wagmi";
import CentuariClobAbi from "@/lib/abis/CentuariCLOB.json";
import { toast } from "sonner";
import { useEffect } from "react";

interface UseWithdrawBorrowProps {
  address: `0x${string}`;
  config?: {
    loanToken?: `0x${string}`;
    collateralToken?: `0x${string}`;
    maturity?: bigint;
    rate?: bigint;
    amount?: bigint;
  };
  toastOptions?: {
    showToast?: boolean;
    pendingMessage?: string;
    successMessage?: string;
    errorMessage?: string;
  };
}

export const useWithdrawBorrow = ({
  address,
  config,
  toastOptions = {
    showToast: true,
    pendingMessage: "Withdrawing collateral...",
    successMessage: "Collateral withdrawn successfully!",
    errorMessage: "Failed to withdraw collateral",
  },
}: UseWithdrawBorrowProps) => {
  const {
    writeContract,
    data: txHash,
    error: writeError,
    isPending,
    isSuccess,
    isError,
  } = useWriteContract();

  const withdrawBorrow = async () => {
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
        functionName: "withdrawCollateral",
        args: [
          {
            loanToken: config?.loanToken || ("0x..." as `0x${string}`),
            collateralToken:
              config?.collateralToken || ("0x..." as `0x${string}`),
            maturity: config?.maturity || BigInt(1700000000),
          },
          config?.rate || BigInt(5_000),
          config?.amount || BigInt(1_000_000),
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
    withdrawBorrow,
    txHash,
    writeError,
    isPending,
    isSuccess,
    isError,
  };
};
