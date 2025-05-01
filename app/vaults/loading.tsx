export default function Loading() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-4">
        <div className="h-10 w-36 bg-gray-800 rounded-md mb-2 animate-pulse"></div>
        <div className="h-6 w-96 bg-gray-800 rounded-md animate-pulse"></div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <div className="h-10 w-full bg-gray-900 rounded-md animate-pulse"></div>
        </div>
        <div className="flex space-x-3">
          <div className="h-10 w-24 bg-gray-900 rounded-md animate-pulse"></div>
          <div className="h-10 w-28 bg-gray-900 rounded-md animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 py-4 border-b border-gray-800 text-sm font-medium text-gray-400">
        <div className="col-span-1">Vault</div>
        <div className="col-span-1">Token</div>
        <div className="col-span-1">Deposit</div>
        <div className="col-span-1">Curator</div>
        <div className="col-span-1">APY</div>
        <div className="col-span-1 text-right">Action</div>
      </div>

      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-6 gap-4 py-6 border-b border-gray-800 animate-pulse"
        >
          <div>
            <div className="h-5 w-24 bg-gray-800 rounded-md mb-1"></div>
            <div className="h-4 w-20 bg-gray-800 rounded-md"></div>
          </div>

          <div className="col-span-1 flex items-center">
            <div className="h-5 w-20 bg-gray-800 rounded-md"></div>
          </div>

          <div className="col-span-1 flex items-center">
            <div className="h-5 w-16 bg-gray-800 rounded-md"></div>
          </div>

          <div className="col-span-1 flex items-center">
            <div className="h-5 w-16 bg-gray-800 rounded-md"></div>
          </div>

          <div className="col-span-1 flex items-center">
            <div className="h-5 w-16 bg-gray-800 rounded-md"></div>
          </div>

          <div className="col-span-1 flex items-center justify-end">
            <div className="h-5 w-20 bg-gray-800 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
