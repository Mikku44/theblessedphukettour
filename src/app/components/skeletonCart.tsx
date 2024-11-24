import React from 'react';


const SkeletonCard = () => {
  return (
    <div className="w-full max-w-xl rounded-lg border border-gray-200 shadow">
      <div className="p-4 space-y-5">
        {/* Card Body */}
        <div className="space-y-4">
          {/* Image Skeleton */}
          <div className="relative w-full h-[300px] rounded-lg bg-gray-200 animate-pulse" />
          
          {/* Content Area */}
          <div className="space-y-3">
            {/* Title Skeleton */}
            <div className="w-3/5 h-8 rounded-lg bg-gray-200 animate-pulse" />
            
            {/* Description Skeleton */}
            <div className="w-4/5 h-16 rounded-lg bg-gray-200 animate-pulse" />
            
            {/* Rating Section */}
            <div className="flex items-center gap-2">
              {/* Star Icon Skeleton */}
              <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse">
                <div className="w-6 h-6 text-gray-300" />
              </div>
              
              {/* Rating Text Skeletons */}
              <div className="w-16 h-4 rounded-lg bg-gray-200 animate-pulse" />
              <div className="w-24 h-4 rounded-lg bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex justify-between gap-3 pt-4 border-t border-gray-100">
          {/* Location Info */}
          <div className="flex flex-col gap-2 w-full">
            {/* Location 1 */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse">
                <div className="w-6 h-6 text-gray-300" />
              </div>
              <div className="w-1/3 h-4 rounded-lg bg-gray-200 animate-pulse" />
            </div>
            
            {/* Location 2 */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse">
                <div className="w-6 h-6 text-gray-300" />
              </div>
              <div className="w-1/3 h-4 rounded-lg bg-gray-200 animate-pulse" />
            </div>
          </div>

          {/* Price Info */}
          <div className="flex flex-col items-end justify-end">
            <div className="w-24 h-4 rounded-lg bg-gray-200 animate-pulse" />
            <div className="w-32 h-8 rounded-lg bg-gray-200 animate-pulse mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;