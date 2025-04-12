import { Copy, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
        <Button variant={"teal"}>Continue</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md md:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Get tokens</DialogTitle>
          <DialogDescription>
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
                <Label htmlFor={`address-${feucet.id}`}>{feucet.name}</Label>
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
        <DialogFooter className="sm:justify-center">
          <Button type="button" variant="purple" size={"lg"}>
            Get Tokens
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
