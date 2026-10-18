import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Base atomic pulsing skeleton element.
 */
export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "animate-pulse rounded-xl bg-stone-200/80 dark:bg-[#1E1915]",
          className
        )
      )}
      {...props}
    />
  );
};

/**
 * Skeleton for cards (services, mechanics, bookings, stats).
 */
export interface CardSkeletonProps {
  className?: string;
  hasImage?: boolean;
  lines?: number;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  className,
  hasImage = true,
  lines = 3,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "p-5 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] space-y-4 shadow-subtle",
          className
        )
      )}
    >
      {hasImage && <Skeleton className="w-full h-44 rounded-xl" />}
      <div className="space-y-2">
        <Skeleton className="w-3/4 h-5 rounded-md" />
        <Skeleton className="w-1/2 h-4 rounded-md opacity-70" />
      </div>
      <div className="space-y-1.5 pt-1">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className={twMerge(
              clsx(
                "h-3.5 rounded",
                i === lines - 1 ? "w-4/5" : "w-full",
                "opacity-60"
              )
            )}
          />
        ))}
      </div>
      <div className="pt-2 flex items-center justify-between border-t border-[#E7E5DF]/60 dark:border-[#2B231D]/60">
        <Skeleton className="w-20 h-6 rounded-md" />
        <Skeleton className="w-24 h-9 rounded-xl" />
      </div>
    </div>
  );
};

/**
 * Skeleton for data tables (bookings, users, payments, KYC applications).
 */
export interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 5,
  className,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "w-full rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] overflow-hidden shadow-subtle",
          className
        )
      )}
    >
      {/* Table Header Skeleton */}
      <div className="p-4 bg-stone-50 dark:bg-[#1A1613] border-b border-[#E7E5DF] dark:border-[#2B231D] flex items-center gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton
            key={i}
            className={twMerge(
              clsx("h-4 rounded-md", i === 0 ? "w-28" : "flex-1")
            )}
          />
        ))}
      </div>

      {/* Table Rows Skeleton */}
      <div className="divide-y divide-[#E7E5DF]/60 dark:divide-[#2B231D]/60">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="p-4 flex items-center gap-4">
            {Array.from({ length: columns }).map((_, c) => (
              <Skeleton
                key={c}
                className={twMerge(
                  clsx(
                    "h-4 rounded",
                    c === 0 ? "w-24" : c === columns - 1 ? "w-20" : "flex-1",
                    "opacity-75"
                  )
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Skeleton for detail pages (Booking Details, Job Details, Service Details).
 */
export const DetailSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={twMerge(clsx("space-y-6", className))}>
      {/* Header bar */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="w-48 h-7 rounded-lg" />
          <Skeleton className="w-32 h-4 rounded-md opacity-70" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="w-24 h-9 rounded-xl" />
          <Skeleton className="w-32 h-9 rounded-xl" />
        </div>
      </div>

      {/* Grid columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] space-y-4">
            <Skeleton className="w-36 h-5 rounded-md" />
            <Skeleton className="w-full h-24 rounded-xl" />
            <Skeleton className="w-4/5 h-4 rounded-md" />
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] space-y-3">
            <Skeleton className="w-40 h-5 rounded-md" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-16 rounded-xl" />
              <Skeleton className="h-16 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Sidebar card */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] space-y-4">
            <Skeleton className="w-28 h-5 rounded-md" />
            <Skeleton className="w-full h-32 rounded-xl" />
            <Skeleton className="w-full h-11 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
