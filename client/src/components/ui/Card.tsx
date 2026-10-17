import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = false,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "rounded-2xl bg-white dark:bg-[#14110E] border border-stone-200/80 dark:border-[#261E18] p-6 shadow-premium dark:shadow-chai transition-all duration-300",
          hoverable &&
            "hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-chai-hover hover:border-brand-500/40 dark:hover:border-[#3D2E24] dark:hover:bg-[#1C1713] cursor-pointer",
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
