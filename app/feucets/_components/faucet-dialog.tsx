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

export function FaucetDialog({
  data,
  handleRemoveFaucet,
}: {
  data: FeucetDataProps[];
  handleRemoveFaucet: (id: string) => void;
}) {
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
          <DialogDescription className="text-muted-foreground dark:text-muted-dark">
            Confirm your addresses and get the tokens.
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-3" />
        <div>
          <div className="grid gap-8 max-h-[300px] overflow-y-auto px-3">
            {data.map((feucet) => (
              <div
                key={feucet.id}
                className={cn(
                  "flex flex-col gap-2",
                  data.length - 1 === data.indexOf(feucet) ? "mb-4" : "mb-0"
                )}
              >
                <Label
                  htmlFor={`address-${feucet.id}`}
                  className="flex items-center gap-1"
                >
                  <TokenPair
                    icons={feucet.tokenIcons}
                    className="h-5 border-0 w-5"
                  />

                  {feucet.name}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id={`address-${feucet.id}`}
                    placeholder="Wallet Address"
                    className="w-full"
                  />
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    onClick={() => handleRemoveFaucet(feucet.id)}
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>
            ))}
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
