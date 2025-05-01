export default function Loading() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <div className="h-10 w-44 bg-gray-800 rounded-md mb-2 animate-pulse"></div>
        <div className="h-6 w-96 bg-gray-800 rounded-md animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900 p-6 rounded-lg animate-pulse">
          <div className="h-7 w-36 bg-gray-800 rounded-md mb-2"></div>
          <div className="h-5 w-32 bg-gray-800 rounded-md mb-4"></div>
          <div className="h-9 w-40 bg-gray-800 rounded-md"></div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg animate-pulse">
          <div className="h-7 w-36 bg-gray-800 rounded-md mb-2"></div>
          <div className="h-5 w-32 bg-gray-800 rounded-md mb-4"></div>
          <div className="h-9 w-36 bg-gray-800 rounded-md"></div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg animate-pulse">
          <div className="h-7 w-36 bg-gray-800 rounded-md mb-2"></div>
          <div className="h-5 w-32 bg-gray-800 rounded-md mb-4"></div>
          <div className="h-9 w-36 bg-gray-800 rounded-md"></div>
        </div>
      </div>

      <div className="mb-4">
        <div className="bg-gray-900 p-6 rounded-lg flex justify-between items-center animate-pulse">
          <div className="flex flex-col">
            <div className="h-6 w-20 bg-gray-800 rounded-md mb-2"></div>
            <div className="h-5 w-24 bg-gray-800 rounded-md"></div>
          </div>
          <div className="h-5 w-5 bg-gray-800 rounded-md"></div>
        </div>
      </div>

      <div className="mb-4">
        <div className="bg-gray-900 p-6 rounded-lg flex justify-between items-center animate-pulse">
          <div className="flex flex-col">
            <div className="h-6 w-24 bg-gray-800 rounded-md mb-2"></div>
            <div className="h-5 w-24 bg-gray-800 rounded-md"></div>
          </div>
          <div className="h-5 w-5 bg-gray-800 rounded-md"></div>
        </div>
      </div>

      <div className="mb-4">
        <div className="bg-gray-900 p-6 rounded-lg flex justify-between items-center animate-pulse">
          <div className="flex flex-col">
            <div className="h-6 w-16 bg-gray-800 rounded-md mb-2"></div>
            <div className="h-5 w-24 bg-gray-800 rounded-md"></div>
          </div>
          <div className="h-5 w-5 bg-gray-800 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
