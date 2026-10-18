import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  BookingStatus,
  PaymentStatus,
  VerificationStatus,
} from "../../types/api.types";

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "brand";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  status?: BookingStatus | VerificationStatus | PaymentStatus | string;
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant,
  status,
  size = "md",
  className,
  ...props
}) => {
  // Infer variant automatically from status if not specified
  let effectiveVariant = variant || "default";

  if (status) {
    switch (status) {
      case "VERIFIED":
      case "COMPLETED":
      case "SUCCESS":
        effectiveVariant = "success";
        break;
      case "PENDING":
      case "SUBMITTED":
      case "UNDER_REVIEW":
        effectiveVariant = "warning";
        break;
      case "REJECTED":
      case "CANCELLED":
      case "FAILED":
        effectiveVariant = "danger";
        break;
      case "ACCEPTED":
      case "EN_ROUTE":
      case "ARRIVED":
      case "IN_PROGRESS":
        effectiveVariant = "info";
        break;
      default:
        effectiveVariant = "default";
    }
  }

  const variants = {
    default:
      "bg-[#F8F7F3] text-[#252621] dark:bg-[#1A1613] dark:text-[#F5F2EB] border-[#E7E5DF] dark:border-[#2E251E]",
    success:
      "bg-emerald-50 text-emerald-700 dark:bg-[#0E1F17] dark:text-[#00E599] border-emerald-200 dark:border-[#13402E] dark:shadow-[0_0_8px_rgba(0,229,153,0.15)]",
    warning:
      "bg-amber-50 text-amber-700 dark:bg-[#23170E] dark:text-[#FF9533] border-amber-200 dark:border-[#52290F]",
    danger:
      "bg-rose-50 text-rose-700 dark:bg-[#251012] dark:text-[#FF5252] border-rose-200 dark:border-[#5C1A20]",
    info:
      "bg-sky-50 text-sky-700 dark:bg-[#0C1E2B] dark:text-[#38BDF8] border-sky-200 dark:border-[#153D5B]",
    brand:
      "bg-orange-50 text-[#FF771C] dark:bg-[#23170E] dark:text-[#FF771C] border-orange-200 dark:border-[#FF771C]/40",
  };

  const sizes = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center font-semibold rounded-full border tracking-wide uppercase",
          variants[effectiveVariant],
          sizes[size],
          className
        )
      )}
      {...props}
    >
      {children || status}
    </span>
  );
};
