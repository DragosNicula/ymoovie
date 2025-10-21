"use client";

export default function MovieCardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow animate-pulse">
      <div className="aspect-[2/3] bg-gray-700" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  );
}