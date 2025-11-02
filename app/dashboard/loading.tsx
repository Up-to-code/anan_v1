import React from 'react';

export default function Loading() {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar Skeleton */}
      <div className="w-64 bg-slate-900 flex flex-col">
        {/* Sidebar Header Skeleton */}
        <div className="border-b border-slate-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
            <div className="flex-1">
              <div className="h-5 bg-slate-700/50 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-3 bg-slate-700/50 rounded w-20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Sidebar Content Skeleton */}
        <div className="p-4 flex flex-col h-full">
          {/* Navigation Items Skeleton */}
          <nav className="space-y-2 flex-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center px-3 py-3 rounded-xl">
                <div className="w-5 h-5 bg-slate-700/50 rounded animate-pulse mr-3"></div>
                <div className="h-4 bg-slate-700/50 rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}px` }}></div>
              </div>
            ))}
          </nav>

          {/* Upgrade Card Skeleton */}
          <div className="mb-6">
            <div className="bg-slate-800/30 rounded-2xl p-5 animate-pulse">
              <div className="text-center">
                <div className="w-10 h-10 bg-slate-700/50 rounded-full mx-auto mb-3"></div>
                <div className="h-4 bg-slate-700/50 rounded w-32 mx-auto mb-2"></div>
                <div className="h-3 bg-slate-700/50 rounded w-40 mx-auto mb-4"></div>
                <div className="h-9 bg-slate-700/50 rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Support Section Skeleton */}
          <div className="mb-4">
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center px-3 py-3 rounded-xl">
                  <div className="w-5 h-5 bg-slate-700/50 rounded animate-pulse mr-3"></div>
                  <div className="h-4 bg-slate-700/50 rounded animate-pulse w-28"></div>
                </div>
              ))}
            </div>
          </div>

          {/* User Section Skeleton */}
          <div className="pt-4 border-t border-slate-700/50">
            <div className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-xl animate-pulse">
              <div className="w-10 h-10 bg-slate-700/50 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-slate-700/50 rounded w-24 mb-2"></div>
                <div className="h-3 bg-slate-700/50 rounded w-16"></div>
              </div>
              <div className="w-8 h-8 bg-slate-700/50 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area Skeleton */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Skeleton */}
        <header className="bg-white border-b border-slate-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Breadcrumb Skeleton */}
                <div className="flex items-center space-x-2">
                  <div className="h-4 bg-slate-200 rounded w-16 animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded w-2 animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded w-20 animate-pulse"></div>
                </div>
              </div>

              {/* Right side Skeleton */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-200 rounded-lg animate-pulse"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse"></div>
                  <div className="hidden md:block">
                    <div className="h-4 bg-slate-200 rounded w-24 mb-1 animate-pulse"></div>
                    <div className="h-3 bg-slate-200 rounded w-16 animate-pulse"></div>
                  </div>
                  <div className="w-4 h-4 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Skeleton */}
        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="p-6">
            {/* Page Title Skeleton */}
            <div className="mb-6">
              <div className="h-8 bg-slate-200 rounded w-48 mb-2 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-96 animate-pulse"></div>
            </div>

            {/* Content Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-5 bg-slate-200 rounded w-24"></div>
                    <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                  </div>
                  <div className="h-8 bg-slate-200 rounded w-20 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-32"></div>
                </div>
              ))}
            </div>

            {/* Large Content Block Skeleton */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
              <div className="h-6 bg-slate-200 rounded w-40 mb-4"></div>
              {(() => {
                // Precompute random widths only once per render
                const widths = [1, 2, 3, 4, 5].map(() => 70 + Math.random() * 30);
                return (
                  <div className="space-y-3">
                    {widths.map((width, i) => (
                      <div
                        key={i}
                        className="h-4 bg-slate-200 rounded"
                        style={{ width: `${width}%` }}
                      ></div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}