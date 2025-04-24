import Image from "next/image";

interface TokenSingle {
  tokenUrl: string;
  name: string;
}

export function TokenSingle({ tokenUrl, name }: TokenSingle) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 rounded-full ">
            <Image
              src={tokenUrl}
              alt={`${name} token`}
              fill
              className="rounded-full object-cover brightness-90"
            />
          </div>
          <div>
            <h3 className="font-semibold dark:text-primary-dark">{name}</h3>
          </div>
        </div>
      </div>
    </>
  );
}
