import { useCallback } from "react";
import { toast } from "sonner";
import { useAccount, useReadContract } from "wagmi";
import { erc20Abi } from "viem";
import { useApproval } from "./use-approval";
import { usePlaceOrder } from "./use-place-order";

interface UseClobActionsProps {
  clobAddress: `0x${string}`;
}

export const usePlaceOrderWithApprove = ({
  clobAddress,
}: UseClobActionsProps) => {
  const { address: userAddress } = useAccount();
  const { approve, isApproving } = useApproval();
  const { placeOrder } = usePlaceOrder({ address: clobAddress });

  const checkAllowance = async (
    tokenAddress: `0x${string}`,
    amount: bigint
  ) => {
    if (!userAddress) return false;

    const { data: allowance } = await useReadContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "allowance",
      args: [userAddress, clobAddress],
    });

    return allowance ? BigInt(allowance) >= amount : false;
  };

  const executePlaceOrder = useCallback(
    async ({
      loanToken,
      collateralToken,
      amount,
      collateralAmount,
      maturity,
      rate,
      side,
    }: {
      loanToken: `0x${string}`;
      collateralToken: `0x${string}`;
      amount: bigint;
      collateralAmount: bigint;
      maturity: bigint;
      rate: bigint;
      side: number;
    }) => {
      if (!userAddress) {
        toast.error("Wallet not connected.");
        return;
      }

      try {
        const loanAllowanceOk = await checkAllowance(loanToken, amount);
        if (!loanAllowanceOk) {
          await approve({ address: loanToken, spender: clobAddress, amount });
          toast.success("Loan token approved.");
        }

        const collateralAllowanceOk = await checkAllowance(
          collateralToken,
          collateralAmount
        );
        if (!collateralAllowanceOk) {
          await approve({
            address: collateralToken,
            spender: clobAddress,
            amount: collateralAmount,
          });
          toast.success("Collateral token approved.");
        }

        await placeOrder({
          loanToken,
          collateralToken,
          maturity,
          rate,
          side,
          amount,
          collateralAmount,
        });
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || "Something went wrong");
      }
    },
    [approve, placeOrder, userAddress]
  );

  return {
    executePlaceOrder,
    isApproving,
  };
};
