import React from "react";

// Card Skeleton for blog posts, videos, etc.
export const CardSkeleton = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden bg-white border-2 border-orange-100 rounded-2xl shadow-warm animate-pulse"
        >
          {/* Image skeleton */}
          <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300"></div>

          {/* Content skeleton */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <div className="w-3/4 h-6 rounded bg-gradient-to-r from-gray-200 to-gray-300"></div>

            {/* Description lines */}
            <div className="space-y-2">
              <div className="h-4 rounded bg-gradient-to-r from-gray-200 to-gray-300"></div>
              <div className="w-5/6 h-4 rounded bg-gradient-to-r from-gray-200 to-gray-300"></div>
            </div>

            {/* Button */}
            <div className="w-32 h-10 rounded-lg bg-gradient-to-r from-gray-200 to-gray-300"></div>
          </div>
        </div>
      ))}
    </>
  );
};

// List Skeleton for text content
export const ListSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
          <div className="flex-1 space-y-2">
            <div className="w-3/4 h-4 rounded bg-gradient-to-r from-gray-200 to-gray-300"></div>
            <div className="w-1/2 h-3 rounded bg-gradient-to-r from-gray-200 to-gray-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Table Skeleton
export const TableSkeleton = ({ rows = 5, cols = 4 }) => {
  return (
    <div className="overflow-hidden bg-white border-2 border-orange-100 rounded-2xl shadow-warm">
      <div className="animate-pulse">
        {/* Header */}
        <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300"></div>

        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4 border-t border-gray-200">
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            >
              {Array.from({ length: cols }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="h-4 rounded bg-gradient-to-r from-gray-200 to-gray-300"
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Form Skeleton
export const FormSkeleton = () => {
  return (
    <div className="p-8 space-y-6 bg-white border-2 border-orange-100 rounded-2xl shadow-warm-lg animate-pulse">
      {/* Title */}
      <div className="w-1/2 h-8 rounded bg-gradient-to-r from-gray-200 to-gray-300"></div>

      {/* Form fields */}
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <div className="w-24 h-4 rounded bg-gradient-to-r from-gray-200 to-gray-300"></div>
          <div className="h-12 rounded bg-gradient-to-r from-gray-200 to-gray-300"></div>
        </div>
      ))}

      {/* Button */}
      <div className="w-full h-12 rounded-lg bg-gradient-to-r from-gray-200 to-gray-300"></div>
    </div>
  );
};

// Page Skeleton
export const PageSkeleton = () => {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <div className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="space-y-8 animate-pulse">
          {/* Hero section */}
          <div className="space-y-4 text-center">
            <div className="w-1/2 h-12 mx-auto rounded bg-gradient-to-r from-gray-200 to-gray-300"></div>
            <div className="w-3/4 h-6 mx-auto rounded bg-gradient-to-r from-gray-200 to-gray-300"></div>
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
            <CardSkeleton count={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Spinner Component
export const Spinner = ({ size = "md" }) => {
  const sizes = {
    sm: "scale-90",
    md: "scale-100",
    lg: "scale-125",
  };

  return (
    <>
      <div className={`custom-spinner ${sizes[size]}`}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{ "--i": i + 1 }}></div>
        ))}
      </div>

      <style>{`
        .custom-spinner {
          position: relative;
          width: 30px;
          height: 30px;
          display: inline-block;
        }

        .custom-spinner div {
          position: absolute;
          width: 4px;
          height: 12px;
          background: #f97316; /* your UI color */
          border-radius: 999px;
          top: 50%;
          left: 50%;
          transform-origin: center -10px;
          transform: rotate(calc(var(--i) * 36deg)) translate(-50%, -50%);
          animation: pulse 1s linear infinite;
          animation-delay: calc(var(--i) * 0.1s);
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: rotate(calc(var(--i) * 36deg)) translate(-50%, -50%) scaleY(1);
          }

          50% {
            opacity: 1;
            transform: rotate(calc(var(--i) * 36deg)) translate(-50%, -50%) scaleY(1.5);
          }
        }
      `}</style>
    </>
  );
};

// Full Page Loader
export const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <Spinner size="lg" />

        <p className="mt-6 text-sm font-semibold uppercase text-[#f97316]">
          Loading
        </p>
      </div>
    </div>
  );
};

const skeletons = {
  CardSkeleton,
  ListSkeleton,
  TableSkeleton,
  FormSkeleton,
  PageSkeleton,
  Spinner,
  PageLoader,
};

export default skeletons;
