import { useSimulateContract, useWriteContract } from "wagmi";
import CentuariClobAbi from "@/lib/abis/CentuariCLOB.json";
import { toast } from "sonner";
import { useEffect } from "react";

interface UseRepayProps {
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
    data: simulateData,
    error: simulateError,
    refetch,
  } = useSimulateContract({
    address,
    abi: CentuariClobAbi,
    functionName: "repay",
    args: [
      {
        loanToken: "0x..." as `0x${string}`,
        collateralToken: "0x..." as `0x${string}`,
        maturity: BigInt(1700000000),
      },
      BigInt(5_000), // rate
      BigInt(1_000_000), // amount
    ],
    query: {
      enabled: false,
    },
  });

  const {
    writeContract,
    data: txHash,
    error: writeError,
    isPending,
    isSuccess,
    isError,
  } = useWriteContract();

  const repay = async () => {
    let toastId: string | number | undefined;
    try {
      if (toastOptions.showToast) {
        toastId = toast.loading(
          toastOptions.pendingMessage || "Processing transaction..."
        );
      }

      const { data } = await refetch();

      if (!data?.request) {
        throw new Error("Failed to simulate transaction");
      }

      writeContract(data.request);
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

    if (isError && (simulateError || writeError)) {
      toast.error(toastOptions.errorMessage || "Transaction failed", {
        description:
          simulateError?.message || writeError?.message || "Unknown error",
      });
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
    repay,
    simulateData,
    simulateError,
    txHash,
    writeError,
    isPending,
    isSuccess,
    isError,
  };
};
