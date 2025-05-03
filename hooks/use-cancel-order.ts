import { useWriteContract } from "wagmi";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import CentuariClobAbi from "@/lib/abis/CentuariCLOB.json";

interface UseCancelOrderProps {
  address: `0x${string}`;
}

export const useCancelOrder = ({ address }: UseCancelOrderProps) => {
  const toastIdRef = useRef<any>(undefined);

  const {
    writeContract,
    data: txHash,
    error: writeError,
    isPending,
    isSuccess,
    isError,
  } = useWriteContract();

  const cancelOrder = async ({
    config,
    orderId,
  }: {
    config: {
      loanToken: `0x${string}`;
      collateralToken: `0x${string}`;
      maturity: bigint;
    };
    orderId: bigint;
  }) => {
    try {
      toastIdRef.current = toast.loading("Cancelling order...");

      await writeContract({
        address,
        abi: CentuariClobAbi,
        functionName: "cancelOrder",
        args: [config, orderId],
      });
    } catch (error) {
      if (toastIdRef.current) {
        toast.error("Failed to cancel order", { id: toastIdRef.current });
      }
      throw error;
    }
  };

  useEffect(() => {
    if (isSuccess && txHash && toastIdRef.current) {
      toast.success("Order cancelled successfully!", {
        id: toastIdRef.current,
        description: `Tx Hash: ${txHash.slice(0, 6)}...${txHash.slice(-4)}`,
      });
      toastIdRef.current = undefined;
    }

    if (isError && writeError && toastIdRef.current) {
      toast.error("Order cancellation failed", {
        id: toastIdRef.current,
        description: writeError?.message || "Unknown error",
      });
      toastIdRef.current = undefined;
    }
  }, [isSuccess, isError, txHash, writeError]);

  return {
    cancelOrder,
    isPending,
    isSuccess,
    isError,
  };
};
