import React from 'react';

const ListSkeleton = () => {
    return (
        <div className='flex flex-col gap-2 animate-pulse'>
          {/* Skeleton Product Rows */}
          {Array(5).fill(0).map((_, idx) => (
            <div key={idx} className='flex flex-col md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr] items-center border py-2 px-3 gap-2'>
              <div className="w-24 h-24 bg-gray-300 rounded-md" />
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-2/3" />
              <div className="h-4 bg-gray-300 rounded w-1/2 flex items-center gap-1" />
              <div className='flex justify-center gap-2'>
                <div className="h-8 w-8 bg-gray-300 rounded" />
                <div className="h-8 w-8 bg-gray-300 rounded" />
              </div>
            </div>
          ))}
        </div>
    );
};

export default ListSkeleton;