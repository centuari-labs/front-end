export default function Loading() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      {/* Header and description */}
      <div className="mb-8">
        <div className="h-8 w-56 bg-gray-700 rounded-md animate-pulse mb-4"></div>
        <div className="h-5 w-full max-w-3xl bg-gray-700 rounded-md animate-pulse mb-2"></div>
        <div className="h-5 w-full max-w-2xl bg-gray-700 rounded-md animate-pulse"></div>
      </div>

      {/* Vault stats */}
      <div className="flex flex-wrap gap-16 mb-8">
        <div>
          <div className="h-5 w-44 bg-gray-700 rounded-md animate-pulse mb-2"></div>
          <div className="h-8 w-40 bg-gray-700 rounded-md animate-pulse"></div>
        </div>

        <div>
          <div className="h-5 w-20 bg-gray-700 rounded-md animate-pulse mb-2"></div>
          <div className="h-8 w-24 bg-gray-700 rounded-md animate-pulse"></div>
        </div>
      </div>

      <div className="flex justify-between">
        {/* Table */}
        <div className="mb-8">
          <div className="rounded-md overflow-hidden border border-gray-700">
            {/* Table Header */}
            <div className="grid grid-cols-6 bg-gray-800 p-4">
              <div className="h-6 w-28 bg-gray-700 rounded-md animate-pulse"></div>
              <div className="h-6 w-32 bg-gray-700 rounded-md animate-pulse"></div>
              <div className="h-6 w-24 bg-gray-700 rounded-md animate-pulse"></div>
              <div className="h-6 w-24 bg-gray-700 rounded-md animate-pulse"></div>
              <div className="h-6 w-20 bg-gray-700 rounded-md animate-pulse"></div>
              <div className="h-6 w-16 bg-gray-700 rounded-md animate-pulse"></div>
            </div>

            {/* Table Rows */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-6 p-4 border-t border-gray-700"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gray-700 rounded-full animate-pulse mr-3"></div>
                  <div className="h-5 w-16 bg-gray-700 rounded-md animate-pulse"></div>
                </div>
                <div className="h-5 w-24 bg-gray-700 rounded-md animate-pulse self-center"></div>
                <div className="h-5 w-16 bg-gray-700 rounded-md animate-pulse self-center"></div>
                <div className="h-5 w-16 bg-gray-700 rounded-md animate-pulse self-center"></div>
                <div className="h-5 w-20 bg-gray-700 rounded-md animate-pulse self-center"></div>
                <div className="h-6 w-20 bg-gray-700 rounded-md animate-pulse self-center"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side stats */}
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div className="flex-1">{/* Additional content could go here */}</div>

          <div className="md:w-96">
            {/* Deposit input */}
            <div className="flex mb-4">
              <div className="h-12 w-full bg-gray-700 rounded-l-md animate-pulse"></div>
              <div className="h-12 w-24 bg-gray-700 rounded-r-md animate-pulse"></div>
            </div>

            {/* Position info */}
            <div className="mb-2">
              <div className="h-5 w-32 bg-gray-700 rounded-md animate-pulse mb-1"></div>
              <div className="h-6 w-48 bg-gray-700 rounded-md animate-pulse"></div>
            </div>

            {/* Wallet balance */}
            <div className="mb-6">
              <div className="h-5 w-32 bg-gray-700 rounded-md animate-pulse mb-1"></div>
              <div className="h-6 w-24 bg-gray-700 rounded-md animate-pulse"></div>
            </div>

            {/* Deposit button */}
            <div className="h-12 w-full bg-gray-700 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
