
import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  variant?: "default" | "inner" | "glow";
}

 

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = false,
  variant = "default",
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "rounded-2xl transition-all duration-200 border",
          // Light theme
          "bg-white border-[#E7E5DF] text-[#252621] shadow-card",
          // Dark theme (RequestKit Image 2 specification: warm deep obsidian + warm hairline border)
          variant === "inner"
            ? "dark:bg-[#1A1613] dark:border-[#2E251E] dark:text-[#E8E2D8]"
            : "dark:bg-[#141210] dark:border-[#2B231D] dark:text-[#F5F2EB] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)]",
          hoverable &&
            "hover:-translate-y-0.5 hover:shadow-card-hover hover:border-[#D5D2C9] dark:hover:border-[#FF771C]/50 dark:hover:shadow-[0_12px_36px_rgba(255,119,28,0.12)] cursor-pointer",
          variant === "glow" &&
            "dark:border-[#FF771C]/40 dark:shadow-[0_0_28px_rgba(255,119,28,0.16)]",
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
