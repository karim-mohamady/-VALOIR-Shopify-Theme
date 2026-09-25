import React from 'react';

interface ProductCardSkeletonProps {
  aspectRatio?: '4/5' | '1/1' | '16/9';
  count?: number;
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({
  aspectRatio = '4/5',
  count = 6
}) => {
  const aspectClass =
    aspectRatio === '1/1'
      ? 'aspect-square'
      : aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : 'aspect-[4/5]';

  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col justify-between bg-white border border-[#E8E5DF] rounded-sm p-4 animate-subtle-pulse relative overflow-hidden transition-all duration-300 shadow-2xs"
        >
          {/* Media box skeleton with luxury shimmering wave */}
          <div
            className={`relative w-full ${aspectClass} bg-[#F4F2ED] rounded-xs overflow-hidden flex items-center justify-center p-4 shimmer-surface`}
          >
            {/* Top metadata tags */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
              <div className="h-4 w-16 bg-[#E5E1D8] rounded-xs shimmer-surface" />
              <div className="h-4 w-12 bg-[#E5E1D8] rounded-xs shimmer-surface" />
            </div>

            {/* Silhouette placeholder with pulse */}
            <div className="w-3/5 h-10 bg-[#E2DED5]/90 rounded-full shimmer-surface" />

            {/* Bottom quick action bar skeleton */}
            <div className="absolute inset-x-3 bottom-3 h-7 bg-[#E8E4DB]/70 rounded-xs shimmer-surface" />
          </div>

          {/* Meta details skeleton */}
          <div className="mt-4 flex flex-col flex-1 justify-between gap-3">
            <div>
              {/* Origin and category indicator */}
              <div className="flex items-center justify-between mb-2">
                <div className="h-3 w-28 bg-[#EAE6DE] rounded-xs shimmer-surface" />
                <div className="h-3 w-10 bg-[#EAE6DE] rounded-xs shimmer-surface" />
              </div>

              {/* Title */}
              <div className="h-5 w-4/5 bg-[#DFDBD2] rounded-xs mb-2 shimmer-surface" />

              {/* Subtitle */}
              <div className="h-3.5 w-3/5 bg-[#EAE6DE] rounded-xs shimmer-surface" />
            </div>

            {/* Price & swatches */}
            <div className="pt-3 border-t border-[#F0ECE4] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#DFDBD2] shimmer-surface" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#DFDBD2] shimmer-surface" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#DFDBD2] shimmer-surface" />
              </div>

              <div className="flex items-center gap-2">
                <div className="h-4 w-14 bg-[#DFDBD2] rounded-xs shimmer-surface" />
                <div className="w-6 h-6 bg-[#E8E4DB] rounded-xs shimmer-surface" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

