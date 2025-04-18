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
import { FeucetDataProps } from "./feucet-list";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TokenPair } from "./token-pair";
import { useAccount } from "wagmi";

export function FaucetDialog({
  data,
  handleRemoveFaucet,
}: {
  data: FeucetDataProps[];
  handleRemoveFaucet: (id: string) => void;
}) {
  const { address } = useAccount();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"teal"} size={"sm"}>
          Continue
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md md:max-w-3xl dark:bg-slate-950 dark:border-muted-dark">
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
          >
            Get Tokens
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
