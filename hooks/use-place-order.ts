import { useSimulateContract, useWriteContract } from "wagmi";
import CentuariClobAbi from "@/lib/abis/CentuariCLOB.json";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

interface UsePlaceOrderProps {
  address: `0x${string}`;
  config?: {
    loanToken?: `0x${string}`;
    collateralToken?: `0x${string}`;
    maturity?: bigint;
    rate?: bigint;
    side?: number;
    amount?: bigint;
    collateralAmount?: bigint;
  };
  toastOptions?: {
    showToast?: boolean;
    pendingMessage?: string;
    successMessage?: string;
    errorMessage?: string;
  };
}

export const usePlaceOrder = ({
  address,
  config,
  toastOptions = {
    showToast: true,
    pendingMessage: "Placing order...",
    successMessage: "Order placed successfully!",
    errorMessage: "Failed to place order",
  },
}: UsePlaceOrderProps) => {
  const toastIdRef = useRef<any>("");

  const {
    data: simulateData,
    error: simulateError,
    refetch,
  } = useSimulateContract({
    address,
    abi: CentuariClobAbi,
    functionName: "placeOrder",
    args: [
      {
        loanToken: config?.loanToken as `0x${string}`,
        collateralToken: config?.collateralToken as `0x${string}`,
        maturity: config?.maturity,
      },
      config?.rate, // rate
      config?.side, // 1 = borrow, 0 = lend
      config?.amount, // amount
      config?.collateralAmount, // collateralAmount
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

  const placeOrder = async () => {
    try {
      if (toastOptions.showToast) {
        toastIdRef.current = toast.loading(
          toastOptions.pendingMessage || "Processing transaction..."
        );
      }

      const { data } = await refetch();

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
    placeOrder,
    simulateData,
    simulateError,
    txHash,
    writeError,
    isPending,
    isSuccess,
    isError,
  };
};
