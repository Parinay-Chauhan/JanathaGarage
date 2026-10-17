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
          "rounded-2xl bg-white dark:bg-garage-card border border-stone-200/80 dark:border-stone-800 p-6 shadow-premium transition-all duration-300",
          hoverable &&
            "hover:-translate-y-1 hover:shadow-xl hover:border-brand-500/40 dark:hover:border-brand-500/40 cursor-pointer",
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
