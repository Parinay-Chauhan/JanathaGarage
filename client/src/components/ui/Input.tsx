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
            className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-stone-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={twMerge(
              clsx(
                "w-full rounded-xl bg-white dark:bg-[#16120F] border text-stone-900 dark:text-[#FDF6EE] placeholder:text-stone-400 dark:placeholder:text-[#6E645A] text-sm px-4 py-2.5 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500",
                leftIcon && "pl-10",
                rightIcon && "pr-10",
                error
                  ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                  : "border-stone-300 dark:border-[#2C221A] focus:dark:border-brand-500",
                className
              )
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-stone-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-rose-500 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-stone-500 dark:text-stone-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
