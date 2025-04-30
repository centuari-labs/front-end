import { useWriteContract } from "wagmi";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import CentuariClobAbi from "@/lib/abis/CentuariCLOB.json";

interface UsePlaceOrderProps {
  address: `0x${string}`;
}

export const usePlaceOrder = ({ address }: UsePlaceOrderProps) => {
  const toastIdRef = useRef<any>(undefined);

  const {
    writeContract,
    data: txHash,
    error: writeError,
    isPending,
    isSuccess,
    isError,
  } = useWriteContract();

  const placeOrder = async ({
    loanToken,
    collateralToken,
    maturity,
    rate,
    side,
    amount,
    collateralAmount,
  }: {
    loanToken: `0x${string}`;
    collateralToken: `0x${string}`;
    maturity: bigint;
    rate: bigint;
    side: number;
    amount: bigint;
    collateralAmount: bigint;
  }) => {
    try {
      toastIdRef.current = toast.loading("Placing order...");

      await writeContract({
        address,
        abi: CentuariClobAbi,
        functionName: "placeOrder",
        args: [
          { loanToken, collateralToken, maturity },
          rate,
          side,
          amount,
          collateralAmount,
        ],
      });

      console.log("writeError", writeError);
    } catch (error) {
      if (toastIdRef.current) {
        toast.error("Failed to place order", { id: toastIdRef.current });
      }
      throw error;
    }
  };

  useEffect(() => {
    if (isSuccess && txHash && toastIdRef.current) {
      toast.success("Order placed successfully!", {
        id: toastIdRef.current,
        description: `Tx Hash: ${txHash.slice(0, 6)}...${txHash.slice(-4)}`,
      });
      toastIdRef.current = undefined;
    }

    if (isError && writeError && toastIdRef.current) {
      toast.error("Order placement failed", {
        id: toastIdRef.current,
        description: writeError?.message || "Unknown error",
      });
      toastIdRef.current = undefined;
    }
  }, [isSuccess, isError, txHash, writeError]);

  return {
    placeOrder,
    isPending,
    isSuccess,
    isError,
  };
};
