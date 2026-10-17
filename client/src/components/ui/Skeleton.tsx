import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "animate-pulse rounded-xl bg-stone-200 dark:bg-stone-800",
          className
        )
      )}
      {...props}
    />
  );
};
