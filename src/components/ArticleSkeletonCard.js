import React from 'react';
export default function ArticleSkeletonCard() {
  return (
    <li className="bg-white p-6 rounded-lg shadow-md border border-gray-100 animate-pulse h-full flex flex-col">
      {/* Title Placeholder */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

      {/* Content Placeholder Lines */}
      <div className="flex-grow space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>

      {/* Date Placeholder */}
      <div className="mt-4 h-3 bg-gray-200 rounded w-1/4"></div>
    </li>
  );
}