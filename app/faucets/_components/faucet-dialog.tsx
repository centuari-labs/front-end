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
import { FeucetDataProps } from "@/lib/data";
import { useEffect } from "react";
import { toast } from "sonner";

export function FaucetDialog({
  data,
  handleRemoveFaucet,
}: {
  data: FeucetDataProps[];
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
    const tokens = data.map((token) => token.address);

    writeContract({
      address: "0x27743e6494F76f46f34dbbEDF7443891A7FD64a0",
      abi: FaucetAbi,
      functionName: "requestTokens",
      args: [[0], address],
    });
  };

  const handleLastRequest = async () => {
    const result = await writeContract({
      address: "0x27743e6494F76f46f34dbbEDF7443891A7FD64a0",
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
              {data.map((feucet) => (
                <div key={feucet.id} className={cn("flex flex-col gap-4")}>
                  <div className="flex items-center gap-2 text-base">
                    <TokenPair
                      icons={feucet.tokenIcons}
                      className="h-10 border-0 w-10"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold dark:text-primary-dark">
                        {feucet.name}
                      </p>
                      <p className="text-sm dark:text-primary-dark">
                        {feucet.claimLimit.toLocaleString("en-US")}
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
          <Button
            type="button"
            variant="colorful"
            size={"lg"}
            className="w-full"
            onClick={handleLastRequest}
          >
            last request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
