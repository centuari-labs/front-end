export default function Loading() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 rounded bg-gray-700 animate-pulse"></div>
        <div className="h-6 w-40 bg-gray-700 rounded ml-3 animate-pulse"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 bg-gray-800 rounded-lg p-6">
          <div className="mb-4">
            <div className="h-7 w-40 bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-72 bg-gray-700 rounded animate-pulse"></div>
          </div>

          <div className="flex justify-between mb-8 mt-6">
            <div>
              <div className="h-4 w-40 bg-gray-700 rounded animate-pulse mb-3"></div>
              <div className="h-8 w-52 bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div>
              <div className="h-4 w-20 bg-gray-700 rounded animate-pulse mb-3"></div>
              <div className="h-8 w-28 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <th key={item} className="py-4 px-2 text-left">
                      <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((row) => (
                  <tr key={row} className="border-b border-gray-700">
                    <td className="py-4 px-2 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse mr-2"></div>
                      <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="h-4 w-14 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="h-4 w-14 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full lg:w-1/3 bg-gray-800 h-fit rounded-lg p-6">
          <div className="h-7 w-24 bg-gray-700 rounded animate-pulse mb-6"></div>

          <div className="mb-6">
            <div className="h-12 bg-gray-700 rounded-lg animate-pulse mb-1"></div>
            <div className="flex justify-end">
              <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="mb-2">
            <div className="h-4 w-28 bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-6 w-32 bg-gray-700 rounded animate-pulse"></div>
          </div>

          <div className="mb-8">
            <div className="h-4 w-28 bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-6 w-32 bg-gray-700 rounded animate-pulse"></div>
          </div>

          <div className="h-12 bg-blue-600 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
