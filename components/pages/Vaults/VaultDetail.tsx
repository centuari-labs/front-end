import { Button } from "@/components/ui/button";

export const VaultDetail = () => {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md dark:bg-white/5 dark:border-muted-dark">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Vault Name</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            View
          </Button>
          <Button variant="outline" size="sm">
            Deposit
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground dark:text-muted-dark">
        Vault description goes here. This is a brief overview of the vault's
        purpose and features.
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground dark:text-muted-dark">
            APY: <strong>5.00%</strong>
          </span>
          <span className="text-sm text-muted-foreground dark:text-muted-dark">
            LTV: <strong>75%</strong>
          </span>
          <span className="text-sm text-muted-foreground dark:text-muted-dark">
            Market Volume: <strong>$1,000,000</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground dark:text-muted-dark">
            Status: <strong>Active</strong>
          </span>
          <span className="text-sm text-muted-foreground dark:text-muted-dark">
            Last Updated: <strong>1 hour ago</strong>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          View Details
        </Button>
        <Button variant="outline" size="sm">
          Deposit
        </Button>
        <Button variant="outline" size="sm">
          Withdraw
        </Button>
        <Button variant="outline" size="sm">
          Claim
        </Button>
        <Button variant="outline" size="sm">
          Remove
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground dark:text-muted-dark">
          Created At: <strong>2023-10-01</strong>
        </span>
        <span className="text-sm text-muted-foreground dark:text-muted-dark">
          Updated At: <strong>2023-10-15</strong>
        </span>
        <span className="text-sm text-muted-foreground dark:text-muted-dark">
          Created By: <strong>0x1234567890abcdef</strong>
        </span>
        <span className="text-sm text-muted-foreground dark:text-muted-dark">
          Updated By: <strong>0xabcdef1234567890</strong>
        </span>
      </div>
    </div>
  );
};
