export default function Loading() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <div className="h-10 w-64 bg-gray-800 rounded-md animate-pulse mb-3"></div>
        <div className="h-6 w-full max-w-lg bg-gray-800 rounded-md animate-pulse"></div>
      </div>

      <div className="mb-8">
        <div className="h-12 w-full max-w-md bg-gray-800 rounded-md animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-gray-700 rounded-lg p-6 animate-pulse"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="h-12 w-12 bg-gray-800 rounded-full"></div>
              <div className="h-6 w-6 bg-gray-800 rounded-md"></div>
            </div>
            <div className="h-6 w-32 bg-gray-800 rounded-md mb-3"></div>
            <div className="h-5 w-48 bg-gray-800 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
