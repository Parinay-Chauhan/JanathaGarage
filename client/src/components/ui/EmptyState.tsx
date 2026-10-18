import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarX,
  SearchX,
  AlertCircle,
  Briefcase,
  MapPinOff,
  ReceiptOff,
  ShieldCheck,
  Plus,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { Button } from "./Button";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type EmptyStatePreset =
  | "no-bookings"
  | "no-jobs"
  | "no-results"
  | "no-transactions"
  | "no-addresses"
  | "no-kyc"
  | "default";

export interface EmptyStateProps {
  preset?: EmptyStatePreset;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
  actionIcon?: React.ReactNode;
  secondaryActionLabel?: string;
  secondaryActionTo?: string;
  onSecondaryAction?: () => void;
  className?: string;
  compact?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  preset = "default",
  icon,
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
  actionIcon,
  secondaryActionLabel,
  secondaryActionTo,
  onSecondaryAction,
  className,
  compact = false,
}) => {
  // Preset defaults
  let effectiveIcon = icon;
  let effectiveTitle = title;
  let effectiveDescription = description;
  let effectiveActionLabel = actionLabel;
  let effectiveActionTo = actionTo;
  let effectiveActionIcon = actionIcon;

  switch (preset) {
    case "no-bookings":
      effectiveIcon = effectiveIcon || <CalendarX className="w-8 h-8 text-[#E87532]" />;
      effectiveTitle = effectiveTitle || "No Bookings Found";
      effectiveDescription =
        effectiveDescription ||
        "You haven't booked any doorstep repair or service yet. Schedule a certified mechanic today!";
      effectiveActionLabel = effectiveActionLabel || "Explore Services";
      effectiveActionTo = effectiveActionTo || "/services";
      break;

    case "no-jobs":
      effectiveIcon = effectiveIcon || <Briefcase className="w-8 h-8 text-[#E87532]" />;
      effectiveTitle = effectiveTitle || "No Active Jobs in Queue";
      effectiveDescription =
        effectiveDescription ||
        "All incoming booking requests have been answered. Keep your availability online to receive live doorstep requests.";
      effectiveActionLabel = effectiveActionLabel || "Open Live Radar";
      effectiveActionTo = effectiveActionTo || "/technician/dashboard";
      break;

    case "no-results":
      effectiveIcon = effectiveIcon || <SearchX className="w-8 h-8 text-stone-400" />;
      effectiveTitle = effectiveTitle || "No Matching Results";
      effectiveDescription =
        effectiveDescription ||
        "We couldn't find any items matching your filters or search keywords. Try adjusting your search query.";
      effectiveActionLabel = effectiveActionLabel || "Clear Filters";
      break;

    case "no-transactions":
      effectiveIcon = effectiveIcon || <ReceiptOff className="w-8 h-8 text-stone-400" />;
      effectiveTitle = effectiveTitle || "No Payment Records Yet";
      effectiveDescription =
        effectiveDescription ||
        "There are no transaction records or payment invoices matching the selected criteria.";
      break;

    case "no-addresses":
      effectiveIcon = effectiveIcon || <MapPinOff className="w-8 h-8 text-[#E87532]" />;
      effectiveTitle = effectiveTitle || "No Saved Addresses";
      effectiveDescription =
        effectiveDescription ||
        "Save your home, office, or garage address for fast 1-click doorstep mechanic dispatch.";
      effectiveActionLabel = effectiveActionLabel || "Add New Address";
      effectiveActionIcon = effectiveActionIcon || <Plus className="w-4 h-4" />;
      break;

    case "no-kyc":
      effectiveIcon = effectiveIcon || <ShieldCheck className="w-8 h-8 text-emerald-500" />;
      effectiveTitle = effectiveTitle || "All Caught Up!";
      effectiveDescription =
        effectiveDescription ||
        "No pending technician KYC verification requests in this queue.";
      break;

    default:
      effectiveIcon = effectiveIcon || <AlertCircle className="w-8 h-8 text-[#E87532]" />;
      effectiveTitle = effectiveTitle || "No Data Available";
      effectiveDescription =
        effectiveDescription || "There is nothing to display in this section right now.";
  }

  return (
    <div
      className={twMerge(
        clsx(
          "w-full rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] text-center flex flex-col items-center justify-center shadow-subtle transition-all",
          compact ? "p-6 sm:p-8" : "p-8 sm:p-14 my-4",
          className
        )
      )}
    >
      {/* Icon Badge */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-center mb-4 sm:mb-5 shadow-inner">
        {effectiveIcon}
      </div>

      {/* Typography */}
      <h3 className="text-lg sm:text-xl font-bold font-display text-[#252621] dark:text-[#F5F2EB] mb-2">
        {effectiveTitle}
      </h3>
      <p className="text-xs sm:text-sm text-[#717167] dark:text-[#9E9488] max-w-md mx-auto mb-6 leading-relaxed">
        {effectiveDescription}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {effectiveActionLabel && (
          effectiveActionTo ? (
            <Link to={effectiveActionTo}>
              <Button
                variant="primary"
                size="md"
                className="shadow-orange-glow font-bold text-xs sm:text-sm"
                leftIcon={effectiveActionIcon}
                rightIcon={!effectiveActionIcon && <ArrowRight className="w-4 h-4" />}
              >
                {effectiveActionLabel}
              </Button>
            </Link>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={onAction}
              className="shadow-orange-glow font-bold text-xs sm:text-sm"
              leftIcon={effectiveActionIcon}
            >
              {effectiveActionLabel}
            </Button>
          )
        )}

        {secondaryActionLabel && (
          secondaryActionTo ? (
            <Link to={secondaryActionTo}>
              <Button
                variant="outline"
                size="md"
                className="text-xs sm:text-sm border-[#E7E5DF] dark:border-[#2B231D]"
              >
                {secondaryActionLabel}
              </Button>
            </Link>
          ) : (
            <Button
              variant="outline"
              size="md"
              onClick={onSecondaryAction}
              className="text-xs sm:text-sm border-[#E7E5DF] dark:border-[#2B231D]"
            >
              {secondaryActionLabel}
            </Button>
          )
        )}
      </div>
    </div>
  );
};
