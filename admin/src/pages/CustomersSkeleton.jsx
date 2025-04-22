import React from 'react'

const CustomersSkeleton = () => {
  return (    
    <>
      {/* Skeleton Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-pulse">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-md p-3 w-10 h-10" />
              <div className="ml-5 w-full">
                <div className="h-4 bg-gray-300 rounded w-2/3 mb-2" />
                <div className="h-6 bg-gray-400 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    
      {/* Skeleton Customer List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg animate-pulse">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="h-6 bg-gray-300 rounded w-1/3" />
        </div>
        <ul className="divide-y divide-gray-200">
          {Array(5).fill(0).map((_, i) => (
            <li key={i} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-300 rounded-full" />
                  <div className="ml-4">
                    <div className="h-4 bg-gray-300 rounded w-32 mb-1" />
                    <div className="h-3 bg-gray-200 rounded w-48" />
                  </div>
                </div>
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-6 w-6 bg-gray-300 rounded" />
                  ))}
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex space-x-4">
                  <div className="h-4 bg-gray-200 rounded w-32" />
                  <div className="h-4 bg-gray-200 rounded w-24 mt-2 sm:mt-0" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-40 mt-2 sm:mt-0" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>      
  )
}

export default CustomersSkeleton