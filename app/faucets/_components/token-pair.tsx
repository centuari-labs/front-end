import { cn } from "@/lib/utils";
import Image from "next/image";

export function TokenPair({
  icons,
  className,
}: {
  icons: string[];
  className?: string;
}) {
  if (!icons || icons.length === 0) return null;
  return (
    <div className="flex items-center">
      <div className="flex -space-x-3 overflow-visible">
        {icons.map((icon, index) => (
          <div
            key={index}
            className={cn(
              "relative h-8 w-8 rounded-full border-2 border-white shadow-sm",
              className
            )}
          >
            <Image
              src={icon}
              alt={`Token ${index + 1}`}
              fill
              className="rounded-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
