import React from "react";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none disabled:active:scale-100 select-none";

    const variants = {
      primary:
        "bg-[#FF771C] hover:bg-[#E56814] text-white shadow-[0_2px_14px_rgba(255,119,28,0.35)] focus:ring-[#FF771C]/30 font-bold",
      secondary:
        "bg-[#252621] dark:bg-[#1A1613] hover:bg-[#040404] dark:hover:bg-[#231E19] text-white shadow-subtle border border-transparent dark:border-[#2E251E] focus:ring-[#FF771C]/30 font-semibold",
      outline:
        "border border-[#E7E5DF] dark:border-[#2E251E] bg-white dark:bg-[#1A1613] hover:bg-[#F8F7F3] dark:hover:bg-[#231E19] text-[#252621] dark:text-[#F5F2EB] dark:hover:border-[#FF771C]/50 shadow-subtle focus:ring-[#FF771C]/20 font-semibold",
      ghost:
        "bg-transparent hover:bg-[#F8F7F3] dark:hover:bg-[#1A1613] text-[#252621] dark:text-[#F5F2EB] font-medium",
      danger:
        "bg-rose-600 hover:bg-rose-700 text-white shadow-subtle focus:ring-rose-500 font-semibold",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2.5 gap-2",
      lg: "text-base px-6 py-3 gap-2.5 font-semibold",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
