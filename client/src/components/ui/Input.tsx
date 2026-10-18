import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#252621]/80 dark:text-[#F5F2EB]/80"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#8F8F85]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={twMerge(
              clsx(
                "w-full rounded-xl bg-white dark:bg-[#1A1613] border text-[#252621] dark:text-[#F5F2EB] placeholder:text-[#8A8074] text-sm px-4 py-2.5 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#FF771C]/20 focus:border-[#FF771C]",
                leftIcon && "pl-10",
                rightIcon && "pr-10",
                error
                  ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                  : "border-[#E7E5DF] dark:border-[#2E251E] focus:border-[#FF771C]",
                className
              )
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-[#8F8F85]">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-rose-500 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-[#717167] dark:text-[#9E9488]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
