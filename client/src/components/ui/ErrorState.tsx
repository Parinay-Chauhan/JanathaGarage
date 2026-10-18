import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, RefreshCw, ArrowLeft, ChevronDown, ChevronUp, LifeBuoy } from "lucide-react";
import { Button } from "./Button";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: any;
  onRetry?: () => void | Promise<void>;
  backTo?: string;
  backLabel?: string;
  showSupportLink?: boolean;
  className?: string;
  compact?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "We encountered an unexpected error while loading this data. Please check your network and try again.",
  error,
  onRetry,
  backTo,
  backLabel = "Go Back",
  showSupportLink = true,
  className,
  compact = false,
}) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleRetry = async () => {
    if (!onRetry) return;
    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  const getErrorString = () => {
    if (!error) return null;
    if (typeof error === "string") return error;
    if (error?.data?.message) return error.data.message;
    if (error?.message) return error.message;
    try {
      return JSON.stringify(error, null, 2);
    } catch {
      return "Unknown error details";
    }
  };

  const errorString = getErrorString();

  return (
    <div
      className={twMerge(
        clsx(
          "w-full rounded-2xl bg-white dark:bg-[#141210] border border-rose-200 dark:border-rose-900/50 text-center flex flex-col items-center justify-center shadow-subtle transition-all",
          compact ? "p-6 sm:p-8" : "p-8 sm:p-12 my-4",
          className
        )
      )}
    >
      {/* Visual Error Badge */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4 sm:mb-5 shadow-inner">
        <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.2]" />
      </div>

      {/* Typography */}
      <h3 className="text-lg sm:text-xl font-bold font-display text-[#252621] dark:text-[#F5F2EB] mb-2">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-[#717167] dark:text-[#9E9488] max-w-md mx-auto mb-6 leading-relaxed">
        {message}
      </p>

      {/* Technical Error Accordion */}
      {errorString && (
        <div className="w-full max-w-md mb-6 text-left">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#252621] transition-colors"
          >
            <span>Technical details</span>
            {showDetails ? (
              <ChevronUp className="w-4 h-4 text-stone-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-stone-400" />
            )}
          </button>
          {showDetails && (
            <pre className="mt-2 p-3 rounded-xl bg-[#1A1B18] text-rose-300 font-mono text-[11px] overflow-x-auto max-h-36 border border-rose-950">
              {errorString}
            </pre>
          )}
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <Button
            variant="primary"
            size="md"
            onClick={handleRetry}
            disabled={isRetrying}
            className="shadow-orange-glow font-bold text-xs sm:text-sm"
            leftIcon={
              <RefreshCw className={clsx("w-4 h-4", isRetrying && "animate-spin")} />
            }
          >
            {isRetrying ? "Retrying..." : "Retry / Reload"}
          </Button>
        )}

        {backTo ? (
          <Link to={backTo}>
            <Button
              variant="outline"
              size="md"
              className="text-xs sm:text-sm border-[#E7E5DF] dark:border-[#2B231D]"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              {backLabel}
            </Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            size="md"
            onClick={() => window.history.back()}
            className="text-xs sm:text-sm border-[#E7E5DF] dark:border-[#2B231D]"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            {backLabel}
          </Button>
        )}

        {showSupportLink && (
          <Link to="/help">
            <Button
              variant="ghost"
              size="md"
              className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 hover:text-[#E87532]"
              leftIcon={<LifeBuoy className="w-4 h-4" />}
            >
              Contact Support
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
