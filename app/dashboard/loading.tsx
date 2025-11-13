"use client";
import React, { useEffect, useState } from 'react';

const SIDEBAR_ITEMS = 6;
const CONTENT_BLOCKS = 5;

// Utility to create a random "percentage" between min% and max%, used for skeleton block widths
const createRandomPercentArray = (length: number, min: number, max: number) => {
  return Array.from({ length }, () => min + Math.random() * (max - min));
};

const getNavItemWidths = () => createRandomPercentArray(SIDEBAR_ITEMS, 60, 100); // px
const getContentBlockWidths = () => createRandomPercentArray(CONTENT_BLOCKS, 70, 100); // percent
const getAdditionalBlockWidths = () => createRandomPercentArray(4, 80, 100); // percent
const getTableCellWidths = () => createRandomPercentArray(4, 60, 100); // percent

const Loading: React.FC = () => {
  const [navItemWidths, setNavItemWidths] = useState<number[]>(() => Array(SIDEBAR_ITEMS).fill(80));
  const [contentBlockWidths, setContentBlockWidths] = useState<number[]>(() => Array(CONTENT_BLOCKS).fill(90));
  const [additionalBlocks, setAdditionalBlocks] = useState<number[][]>(() =>
    Array.from({ length: 2 }, () => Array(4).fill(90))
  );
  const [tableCellWidths, setTableCellWidths] = useState<number[][]>(() =>
    Array.from({ length: 5 }, () => Array(4).fill(80))
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setNavItemWidths(getNavItemWidths());
    setContentBlockWidths(getContentBlockWidths());
    setAdditionalBlocks(Array.from({ length: 2 }, () => getAdditionalBlockWidths()));
    setTableCellWidths(Array.from({ length: 5 }, () => getTableCellWidths()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-slate-50 z-[9999] overflow-hidden">
      <div className="flex h-full w-full">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 rounded-lg text-white shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Sidebar Skeleton */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative w-64 bg-slate-900 flex flex-col h-full z-40 transition-transform duration-300 ease-in-out`}>
          {/* Sidebar Header Skeleton */}
          <div className="border-b border-slate-700 p-4 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
              <div className="flex-1">
                <div className="h-5 bg-slate-700/50 rounded w-32 mb-2 animate-pulse"></div>
                <div className="h-3 bg-slate-700/50 rounded w-20 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Sidebar Content Skeleton */}
          <div className="p-4 flex flex-col h-full overflow-y-auto">
            {/* Navigation Items Skeleton */}
            <nav className="space-y-2 flex-1">
              {navItemWidths.map((width, i) => (
                <div key={i} className="flex items-center px-3 py-3 rounded-xl">
                  <div className="w-5 h-5 bg-slate-700/50 rounded animate-pulse mr-3"></div>
                  <div
                    className="h-4 bg-slate-700/50 rounded animate-pulse"
                    style={{ width: `${width}px` }}
                  ></div>
                </div>
              ))}
            </nav>

            {/* Upgrade Card Skeleton */}
            <div className="mb-6 flex-shrink-0">
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
            <div className="mb-4 flex-shrink-0">
              <div className="space-y-2">
                {Array.from({ length: 2 }, (_, i) => (
                  <div key={i} className="flex items-center px-3 py-3 rounded-xl">
                    <div className="w-5 h-5 bg-slate-700/50 rounded animate-pulse mr-3"></div>
                    <div className="h-4 bg-slate-700/50 rounded animate-pulse w-28"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* User Section Skeleton */}
            <div className="pt-4 border-t border-slate-700/50 flex-shrink-0">
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

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content Area Skeleton */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header Skeleton */}
          <header className="bg-white border-b border-slate-200 flex-shrink-0">
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
          <main className="flex-1 overflow-y-auto bg-slate-50">
            <div className="p-6">
              {/* Page Title Skeleton */}
              <div className="mb-6">
                <div className="h-8 bg-slate-200 rounded w-48 mb-2 animate-pulse"></div>
                <div className="h-4 bg-slate-200 rounded w-96 animate-pulse"></div>
              </div>

              {/* Content Cards Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {Array.from({ length: 3 }, (_, i) => (
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
                <div className="space-y-3">
                  {contentBlockWidths.map((width, i) => (
                    <div
                      key={i}
                      className="h-4 bg-slate-200 rounded"
                      style={{ width: `${width}%` }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Additional Content Blocks for Full Page Effect */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {additionalBlocks.map((block, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
                    <div className="h-6 bg-slate-200 rounded w-32 mb-4"></div>
                    <div className="space-y-3">
                      {block.map((width, j) => (
                        <div
                          key={j}
                          className="h-4 bg-slate-200 rounded"
                          style={{ width: `${width}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Skeleton */}
              <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-40 mb-4"></div>
                <div className="overflow-x-auto">
                  <div className="min-w-full">
                    <div className="border-b border-slate-200 pb-3 mb-3">
                      <div className="grid grid-cols-4 gap-4">
                        {Array.from({ length: 4 }, (_, i) => (
                          <div key={i} className="h-4 bg-slate-200 rounded"></div>
                        ))}
                      </div>
                    </div>
                    {tableCellWidths.map((row, i) => (
                      <div key={i} className="grid grid-cols-4 gap-4 py-3 border-b border-slate-100 last:border-0">
                        {row.map((width, j) => (
                          <div key={j} className="h-4 bg-slate-200 rounded" style={{ width: `${width}%` }}></div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Loading;