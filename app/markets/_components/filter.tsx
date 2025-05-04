import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Filter = () => {
  return (
    <>
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-muted-dark" />
        <Input
          type="search"
          placeholder="Search markets..."
          className="w-full appearance-none pl-8"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          Filter
        </Button>
        <Button variant="outline" size="sm">
          Sort: APY ↓
        </Button>
      </div>
    </>
  );
};
