import { useState } from "react";
import { erc20Abi } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import CentuariClobAbi from "@/lib/abis/CentuariCLOB.json";

interface ApproveParams {
  spender: `0x${string}`;
  amount: bigint;
  address: `0x${string}`;
}

export const useApproval = () => {
  const [isApproving, setIsApproving] = useState(false);
  const [error, setError] = useState<string>("");

  const { writeContract, data: txHash } = useWriteContract();
  const { isLoading: isApproveLoading } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const approve = async ({ address, amount, spender }: ApproveParams) => {
    setIsApproving(true);
    try {
      console.log("amount", amount);
      await writeContract({
        abi: erc20Abi,
        address,
        functionName: "approve",
        args: [spender, amount],
      });
    } catch (err) {
      console.error("Approve error:", err);
      setError("Approve transaction failed.");
    } finally {
      setIsApproving(false);
    }
  };

  return {
    approve,
    isApproving: isApproving || isApproveLoading,
    error,
  };
};
