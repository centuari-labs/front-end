import { CENTUARI_CLOB } from "@/lib/tokenAddress";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { erc20Abi, type TransactionReceipt } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export interface ApproveResult {
  transactionHash: string;
  receipt: TransactionReceipt;
}

interface UseApproveOptions {
  onSuccess?: (result: ApproveResult) => void;
  onError?: (error: Error) => void;
}

interface ApproveParams {
  spender: `0x${string}`;
  amount: bigint;
  address: `0x${string}`;
}

interface UseApproveReturn {
  approve: (params: ApproveParams) => Promise<any>;
  isApproving: boolean;
  error: any;
}

export const useApproval = (
  options: UseApproveOptions = {}
): UseApproveReturn => {
  const { onError, onSuccess } = options;
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const {
    data: approveHash,
    isPending: isApprovePending,
    writeContract: approveTransaction,
  } = useWriteContract();

  const { isLoading: isApproveLoading } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  const approve = async ({ address, amount, spender }: ApproveParams) => {
    try {
      await approveTransaction({
        abi: erc20Abi,
        address: address,
        functionName: "approve",
        args: [spender, amount],
      });

      console.log("✅ Approval transaction sent!");
    } catch (error) {
      console.error("❌ Transaction failed:", error);
      setError("Transaction failed. Please try again.");
    }
  };

  return {
    approve,
    isApproving,
    error,
  };
};
