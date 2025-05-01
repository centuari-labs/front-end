import { cn } from "@/lib/utils";
import Image from "next/image";

export function TokenPair({
  image,
  className,
}: {
  image: string;
  className?: string;
}) {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-3 overflow-visible">
        <div
          className={cn(
            "relative h-8 w-8 rounded-full border-2 border-white shadow-sm",
            className
          )}
        >
          <Image
            src={image}
            alt={`Token`}
            fill
            className="rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
