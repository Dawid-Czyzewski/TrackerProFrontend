import React from 'react';

export const StatCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-900 border border-green-500/30 p-3 sm:p-4 md:p-6 rounded-lg animate-pulse">
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg"></div>
      </div>
      <div className="h-3 sm:h-4 bg-gray-800 rounded w-2/3 mb-2"></div>
      <div className="h-6 sm:h-7 md:h-8 bg-gray-800 rounded w-1/2"></div>
    </div>
  );
};

export const ApplicationItemSkeleton: React.FC = () => {
  return (
    <div className="border-b border-gray-800 pb-2 sm:pb-3 animate-pulse">
      <div className="flex justify-between items-start sm:items-center gap-2">
        <div className="flex-1 min-w-0">
          <div className="h-4 sm:h-5 bg-gray-800 rounded w-3/4 mb-2"></div>
          <div className="h-3 sm:h-4 bg-gray-800 rounded w-1/2"></div>
        </div>
        <div className="h-6 w-16 sm:w-20 bg-gray-800 rounded-full"></div>
      </div>
    </div>
  );
};

export const BudgetCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-800 border border-green-500/30 rounded-lg p-4 sm:p-5 md:p-6 animate-pulse">
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <div className="h-3 sm:h-4 bg-gray-700 rounded w-20 sm:w-24"></div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-lg"></div>
      </div>
      <div className="h-6 sm:h-7 md:h-8 bg-gray-700 rounded w-24 sm:w-32 mb-1 sm:mb-2"></div>
      <div className="h-2.5 sm:h-3 bg-gray-700 rounded w-16 sm:w-20"></div>
    </div>
  );
};

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <div>
        <div className="h-8 sm:h-9 md:h-10 bg-gray-800 rounded w-48 mb-2 animate-pulse"></div>
        <div className="h-5 sm:h-6 bg-gray-800 rounded w-64 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        {[...Array(6)].map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-5 md:p-6 animate-pulse">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg"></div>
              <div className="h-5 sm:h-6 bg-gray-800 rounded w-40"></div>
            </div>
            <div className="h-4 bg-gray-800 rounded w-16"></div>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {[...Array(5)].map((_, i) => (
              <ApplicationItemSkeleton key={i} />
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-5 md:p-6 animate-pulse">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg"></div>
              <div className="h-5 sm:h-6 bg-gray-800 rounded w-32"></div>
            </div>
            <div className="h-4 bg-gray-800 rounded w-16"></div>
          </div>
          <div className="flex flex-col items-center justify-center py-6 sm:py-8">
            <div className="h-12 sm:h-14 md:h-16 bg-gray-800 rounded w-40 mb-2"></div>
            <div className="h-4 bg-gray-800 rounded w-24 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ApplicationsSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <div className="h-6 sm:h-8 md:h-10 bg-gray-800 rounded w-48 sm:w-64 mb-1 sm:mb-2 animate-pulse"></div>
        <div className="h-4 sm:h-5 md:h-6 bg-gray-800 rounded w-64 sm:w-80 animate-pulse"></div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-gray-800 rounded animate-pulse"></div>
          <div className="h-4 sm:h-5 bg-gray-800 rounded w-40 sm:w-48 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-900 border border-green-500/30 p-3 sm:p-4 rounded-lg animate-pulse">
              <div className="h-3 sm:h-4 bg-gray-800 rounded w-16 sm:w-20 mb-2"></div>
              <div className="h-6 sm:h-7 md:h-8 bg-gray-800 rounded w-8 sm:w-12 mb-1"></div>
              <div className="h-2.5 sm:h-3 bg-gray-800 rounded w-12 sm:w-16"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1 h-10 sm:h-12 bg-gray-800 rounded-lg animate-pulse"></div>
        <div className="w-full sm:w-auto sm:w-40 h-10 sm:h-12 bg-gray-800 rounded-lg animate-pulse"></div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-end mb-4 sm:mb-6">
          <div className="h-8 sm:h-10 w-20 sm:w-32 bg-gray-800 rounded-lg animate-pulse"></div>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-gray-800 pb-3 sm:pb-4 last:border-b-0 animate-pulse">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                <div className="flex-1 min-w-0">
                  <div className="h-4 sm:h-5 bg-gray-800 rounded w-40 sm:w-48 mb-1 sm:mb-2"></div>
                  <div className="h-3 sm:h-4 bg-gray-800 rounded w-28 sm:w-32 mb-1 sm:mb-2"></div>
                  <div className="h-2.5 sm:h-3 bg-gray-800 rounded w-20 sm:w-24"></div>
                </div>
                <div className="h-7 sm:h-8 w-20 sm:w-24 bg-gray-800 rounded-full self-start sm:self-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BudgetSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <div className="h-6 sm:h-8 md:h-10 bg-gray-800 rounded w-40 sm:w-48 mb-1 sm:mb-2 animate-pulse"></div>
        <div className="h-4 sm:h-5 md:h-6 bg-gray-800 rounded w-56 sm:w-64 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {[...Array(3)].map((_, i) => (
          <BudgetCardSkeleton key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-5 md:p-6 animate-pulse">
          <div className="h-5 sm:h-6 bg-gray-700 rounded w-32 sm:w-40 mb-4 sm:mb-6"></div>
          <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="flex-1 h-10 sm:h-12 bg-gray-700 rounded-lg"></div>
            <div className="flex-1 h-10 sm:h-12 bg-gray-700 rounded-lg"></div>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <div className="h-3 sm:h-4 bg-gray-700 rounded w-16 sm:w-20 mb-1 sm:mb-2"></div>
              <div className="h-10 sm:h-12 bg-gray-700 rounded-lg"></div>
            </div>
            <div>
              <div className="h-3 sm:h-4 bg-gray-700 rounded w-20 sm:w-24 mb-1 sm:mb-2"></div>
              <div className="h-10 sm:h-12 bg-gray-700 rounded-lg"></div>
            </div>
            <div className="h-10 sm:h-12 bg-gray-700 rounded-lg"></div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-5 md:p-6 animate-pulse">
          <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-2">
            <div className="h-5 sm:h-6 bg-gray-700 rounded w-28 sm:w-32"></div>
            <div className="h-8 sm:h-10 w-20 sm:w-32 bg-gray-700 rounded-lg"></div>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-gray-700 rounded-lg p-3 sm:p-4">
                <div className="h-4 sm:h-5 bg-gray-700 rounded w-28 sm:w-32 mb-1.5 sm:mb-2"></div>
                <div className="h-3 sm:h-4 bg-gray-700 rounded w-20 sm:w-24 mb-1.5 sm:mb-2"></div>
                <div className="h-2 bg-gray-700 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
