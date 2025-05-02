export default function Loading() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex items-center mb-6">
        <div className="h-8 w-8 bg-gray-700 rounded-md animate-pulse mr-3"></div>
        <div className="h-6 w-40 bg-gray-700 rounded-md animate-pulse"></div>
        <div className="ml-auto h-8 w-40 bg-gray-700 rounded-md animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="mb-3">
            <div className="h-6 w-40 bg-gray-700 rounded-md animate-pulse mb-1"></div>
            <div className="h-4 w-48 bg-gray-700 rounded-md animate-pulse"></div>
          </div>

          <div className="h-64 bg-gray-800 rounded-md mb-4 relative">
            <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-6 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center justify-end">
                  <div
                    className={`w-2 bg-gray-700 animate-pulse rounded-t-sm`}
                    style={{ height: `${Math.max(15, Math.random() * 80)}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="absolute left-0 bottom-0 right-0 h-px bg-gray-700"></div>
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-700"></div>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col">
                <div className="h-4 w-20 bg-gray-700 rounded-md animate-pulse mb-2"></div>
                <div className="h-5 w-16 bg-gray-700 rounded-md animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="mb-3">
            <div className="h-6 w-32 bg-gray-700 rounded-md animate-pulse mb-1"></div>
            <div className="h-4 w-64 bg-gray-700 rounded-md animate-pulse"></div>
          </div>

          <div className="mb-2">
            <div className="h-5 w-24 bg-gray-700 rounded-md animate-pulse mb-3"></div>

            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between mb-2">
                <div className="h-5 w-16 bg-green-900 rounded-md animate-pulse"></div>
                <div className="h-5 w-24 bg-green-900 rounded-md animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="mb-2 mt-4">
            <div className="h-5 w-32 bg-gray-700 rounded-md animate-pulse mb-3"></div>

            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between mb-2">
                <div className="h-5 w-16 bg-red-900 rounded-md animate-pulse"></div>
                <div className="h-5 w-24 bg-red-900 rounded-md animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-3">
            <div className="h-5 w-32 bg-gray-700 rounded-md animate-pulse"></div>
            <div className="h-5 w-32 bg-gray-700 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="bg-gray-800 lg:col-span-2 rounded-lg p-4 border border-gray-700">
          <div className="mb-3">
            <div className="h-6 w-24 bg-gray-700 rounded-md animate-pulse mb-1"></div>
            <div className="h-4 w-48 bg-gray-700 rounded-md animate-pulse"></div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="h-10 w-full bg-blue-800 rounded-md animate-pulse"></div>
            <div className="h-10 w-full bg-gray-700 rounded-md animate-pulse"></div>
          </div>

          <div className="mb-4">
            <div className="h-6 w-24 bg-gray-700 rounded-md animate-pulse mb-1"></div>
            <div className="h-4 w-64 bg-gray-700 rounded-md animate-pulse mb-3"></div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="h-10 w-full bg-blue-800 rounded-md animate-pulse"></div>
              <div className="h-10 w-full bg-gray-700 rounded-md animate-pulse"></div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <div className="h-4 w-16 bg-gray-700 rounded-md animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-700 rounded-md animate-pulse"></div>
              </div>
              <div className="flex">
                <div className="h-10 w-full bg-gray-700 rounded-l-md animate-pulse"></div>
                <div className="h-10 w-16 bg-blue-800 rounded-r-md animate-pulse"></div>
              </div>
            </div>

            <div className="flex justify-between mb-2">
              <div className="h-5 w-32 bg-gray-700 rounded-md animate-pulse"></div>
              <div className="h-5 w-24 bg-gray-700 rounded-md animate-pulse"></div>
            </div>
            <div className="flex justify-between mb-4">
              <div className="h-5 w-40 bg-gray-700 rounded-md animate-pulse"></div>
              <div className="h-5 w-32 bg-gray-700 rounded-md animate-pulse"></div>
            </div>

            <div className="h-12 w-full bg-blue-600 rounded-md animate-pulse"></div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="mb-3">
            <div className="h-6 w-32 bg-gray-700 rounded-md animate-pulse mb-1"></div>
            <div className="h-4 w-64 bg-gray-700 rounded-md animate-pulse"></div>
          </div>

          <div className="h-64 flex items-center justify-center">
            <div className="h-5 w-32 bg-gray-700 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
