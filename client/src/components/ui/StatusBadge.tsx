import React from "react";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Wrench,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  CreditCard,
  RefreshCcw,
  Check,
  UserCheck,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  BookingStatus,
  PaymentStatus,
  VerificationStatus,
} from "../../types/api.types";

export type StatusBadgeSize = "sm" | "md" | "lg";

export interface StatusBadgeProps {
  status: string;
  type?: "booking" | "payment" | "kyc" | "auto";
  size?: StatusBadgeSize;
  showIcon?: boolean;
  showPulse?: boolean;
  className?: string;
  customLabel?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = "auto",
  size = "md",
  showIcon = true,
  showPulse = true,
  className,
  customLabel,
}) => {
  const normalized = status ? status.toUpperCase().trim() : "UNKNOWN";

  // Determine configuration based on status value
  let label = customLabel || normalized.replace(/_/g, " ");
  let icon: React.ReactNode = null;
  let hasPulse = false;
  let styleClasses = "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700";

  // 1. BOOKING STATUSES
  if (
    type === "booking" ||
    [
      "PENDING",
      "ACCEPTED",
      "ASSIGNED",
      "EN_ROUTE",
      "ARRIVED",
      "IN_PROGRESS",
      "COMPLETED",
      "CANCELLED",
    ].includes(normalized)
  ) {
    switch (normalized) {
      case "PENDING":
        label = customLabel || "Pending Dispatch";
        icon = <Clock className="w-3.5 h-3.5 text-amber-500" />;
        styleClasses =
          "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800/60";
        break;

      case "ACCEPTED":
      case "ASSIGNED":
        label = customLabel || "Mechanic Assigned";
        icon = <UserCheck className="w-3.5 h-3.5 text-sky-500" />;
        styleClasses =
          "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 border-sky-200 dark:border-sky-800/60";
        break;

      case "EN_ROUTE":
        label = customLabel || "En Route";
        icon = <Truck className="w-3.5 h-3.5 text-indigo-500" />;
        hasPulse = true;
        styleClasses =
          "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60";
        break;

      case "ARRIVED":
        label = customLabel || "Arrived Doorstep";
        icon = <Check className="w-3.5 h-3.5 text-purple-500" />;
        hasPulse = true;
        styleClasses =
          "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200 dark:border-purple-800/60";
        break;

      case "IN_PROGRESS":
        label = customLabel || "Under Service";
        icon = <Wrench className="w-3.5 h-3.5 text-[#E87532]" />;
        hasPulse = true;
        styleClasses =
          "bg-orange-50 text-[#E87532] dark:bg-orange-950/40 dark:text-orange-300 border-orange-200 dark:border-orange-800/60";
        break;

      case "COMPLETED":
        label = customLabel || "Service Completed";
        icon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
        styleClasses =
          "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60";
        break;

      case "CANCELLED":
        label = customLabel || "Cancelled";
        icon = <XCircle className="w-3.5 h-3.5 text-rose-500" />;
        styleClasses =
          "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800/60";
        break;
    }
  }

  // 2. PAYMENT STATUSES
  else if (
    type === "payment" ||
    ["SUCCESS", "PAID", "FAILED", "REFUNDED"].includes(normalized)
  ) {
    switch (normalized) {
      case "SUCCESS":
      case "PAID":
        label = customLabel || "Paid / Settled";
        icon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
        styleClasses =
          "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60";
        break;

      case "PENDING":
        label = customLabel || "Payment Pending";
        icon = <Clock className="w-3.5 h-3.5 text-amber-500" />;
        styleClasses =
          "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800/60";
        break;

      case "FAILED":
        label = customLabel || "Payment Failed";
        icon = <XCircle className="w-3.5 h-3.5 text-rose-500" />;
        styleClasses =
          "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800/60";
        break;

      case "REFUNDED":
        label = customLabel || "Refund Settled";
        icon = <RefreshCcw className="w-3.5 h-3.5 text-violet-500" />;
        styleClasses =
          "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300 border-violet-200 dark:border-violet-800/60";
        break;
    }
  }

  // 3. KYC STATUSES
  else if (
    type === "kyc" ||
    ["VERIFIED", "SUBMITTED", "UNDER_REVIEW", "REJECTED", "NOT_SUBMITTED"].includes(normalized)
  ) {
    switch (normalized) {
      case "VERIFIED":
        label = customLabel || "KYC Verified";
        icon = <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />;
        styleClasses =
          "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60";
        break;

      case "PENDING":
      case "SUBMITTED":
      case "UNDER_REVIEW":
        label = customLabel || "KYC In Review";
        icon = <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />;
        hasPulse = true;
        styleClasses =
          "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800/60";
        break;

      case "REJECTED":
        label = customLabel || "KYC Rejected";
        icon = <ShieldX className="w-3.5 h-3.5 text-rose-500" />;
        styleClasses =
          "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800/60";
        break;

      case "NOT_SUBMITTED":
        label = customLabel || "KYC Pending";
        icon = <ShieldAlert className="w-3.5 h-3.5 text-stone-400" />;
        styleClasses =
          "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700";
        break;
    }
  }

  const sizes = {
    sm: "text-[10px] px-2 py-0.5 gap-1",
    md: "text-[11px] sm:text-xs px-2.5 py-1 gap-1.5",
    lg: "text-xs sm:text-sm px-3.5 py-1.5 gap-2",
  };

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center font-bold rounded-full border tracking-wide uppercase shadow-2xs select-none transition-colors",
          sizes[size],
          styleClasses,
          className
        )
      )}
    >
      {showPulse && hasPulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {showIcon && !hasPulse && icon}
      <span>{label}</span>
    </span>
  );
};

export const BookingStatusBadge: React.FC<Omit<StatusBadgeProps, "type">> = (props) => (
  <StatusBadge {...props} type="booking" />
);

export const PaymentStatusBadge: React.FC<Omit<StatusBadgeProps, "type">> = (props) => (
  <StatusBadge {...props} type="payment" />
);

export const KYCStatusBadge: React.FC<Omit<StatusBadgeProps, "type">> = (props) => (
  <StatusBadge {...props} type="kyc" />
);
