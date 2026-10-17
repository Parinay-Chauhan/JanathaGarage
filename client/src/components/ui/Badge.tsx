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
      "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700",
    success:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    warning:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    danger:
      "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    info:
      "bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    brand:
      "bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border-brand-200 dark:border-brand-800",
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
