import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TokenPair } from "./token-pair";
import { useAccount, useWriteContract } from "wagmi";
import FaucetAbi from "@/lib/abis/Faucet.json";
import { FaucetDataProps } from "@/lib/data";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  FAUCET_TOKEN,
  MAAVE_TOKEN,
  MBTC_TOKEN,
  METH_TOKEN,
  MLINK_TOKEN,
  MSOL_TOKEN,
  USDC_TOKEN,
} from "@/lib/tokenAddress";

export function FaucetDialog({
  data,
  handleRemoveFaucet,
}: {
  data: FaucetDataProps[];
  handleRemoveFaucet: (id: string) => void;
}) {
  const { address } = useAccount();

  const {
    writeContract,
    data: txData,
    isPending,
    isSuccess,
    error,
  } = useWriteContract();

  const {
    writeContract: lastWriteRequest,
    data: txDataData,
    isPending: isPendingLast,
    isSuccess: isSuccessLast,
    error: errorLast,
  } = useWriteContract();

  const handleClick = () => {
    const tokenMap = new Map<string, number>([
      [USDC_TOKEN, 0],
      [METH_TOKEN, 1],
      [MBTC_TOKEN, 2],
      [MSOL_TOKEN, 3],
      [MLINK_TOKEN, 4],
      [MAAVE_TOKEN, 5],
    ]);

    const indexToken = data
      .map((item) => tokenMap.get(item.address))
      .filter((value): value is number => value !== undefined);

    writeContract({
      address: FAUCET_TOKEN,
      abi: FaucetAbi,
      functionName: "requestTokens",
      args: [indexToken, address],
    });
  };

  const handleLastRequest = async () => {
    const result = await writeContract({
      address: "0x5243D5e1eB036D7e25E315E45177672C23A5bc9f",
      abi: FaucetAbi,
      functionName: "lastRequestTime",
      args: [address],
    });

    console.log("handleLastRequest", { result });
  };

  useEffect(() => {
    if (isPending) {
      console.log("Transaction is pending...");
    }
    if (isSuccess) {
      console.log("Transaction confirmed:", txData);
    }
    if (error) {
      console.error("Transaction failed:", error.message);
    }
  }, [isPending, isSuccess, error, txData]);

  useEffect(() => {
    if (isPendingLast) {
      console.log("Transaction is pending...");
    }
    if (isSuccessLast) {
      console.log("Transaction confirmed:", txDataData);
    }
    if (errorLast) {
      console.error("Transaction failed:", errorLast.message);
    }
  }, [isPendingLast, isSuccessLast, errorLast, txDataData]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} className="bg-[#0C63BA]">
          Continue
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md md:max-w-3xl dark:bg-slate-950 dark:border-white/20">
        <DialogHeader>
          <DialogTitle>Get tokens</DialogTitle>
          <DialogDescription>
            Confirm your addresses and get the tokens.
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-3" />
        <div className="flex flex-col gap-4">
          <div>
            <div className="grid gap-4 max-h-[300px] overflow-y-auto mt-1">
              {data.map((faucet) => (
                <div key={faucet.id} className={cn("flex flex-col gap-4")}>
                  <div className="flex items-center gap-2 text-base">
                    <TokenPair
                      icons={faucet.tokenIcons}
                      className="h-10 border-0 w-10"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold dark:text-primary-dark">
                        {faucet.name}
                      </p>
                      <p className="text-sm dark:text-primary-dark">
                        {faucet.claimLimit.toLocaleString("en-US")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm">Recipient</p>
            <p>{address}</p>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="colorful"
            size={"lg"}
            className="w-full"
            onClick={handleClick}
          >
            Get Tokens
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
