import React from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface FormFieldProps {
  label?: string;
  id?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  success?: boolean;
  charCount?: { current: number; max: number };
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  required,
  error,
  helperText,
  success,
  charCount,
  className,
  children,
}) => {
  return (
    <div className={twMerge(clsx("w-full space-y-1.5", className))}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={id}
            className="block text-xs font-semibold uppercase tracking-wider text-[#252621]/80 dark:text-[#F5F2EB]/80"
          >
            {label}
            {required && <span className="text-rose-500 ml-1 font-bold">*</span>}
          </label>
          {charCount && (
            <span
              className={clsx(
                "text-[11px] font-medium",
                charCount.current > charCount.max
                  ? "text-rose-500 font-bold"
                  : "text-stone-400"
              )}
            >
              {charCount.current} / {charCount.max}
            </span>
          )}
        </div>
      )}

      {children}

      {/* Validation feedback */}
      {error ? (
        <div className="flex items-center gap-1.5 text-xs text-rose-500 font-medium pt-0.5 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : success ? (
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium pt-0.5">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>Verified & valid</span>
        </div>
      ) : helperText ? (
        <div className="flex items-center gap-1.5 text-[11px] text-[#717167] dark:text-[#9E9488] pt-0.5">
          <Info className="w-3 h-3 shrink-0 opacity-70" />
          <span>{helperText}</span>
        </div>
      ) : null}
    </div>
  );
};

export interface FormErrorAlertProps {
  title?: string;
  message?: string;
  errors?: string[];
  onDismiss?: () => void;
  className?: string;
}

export const FormErrorAlert: React.FC<FormErrorAlertProps> = ({
  title = "Validation Error",
  message,
  errors = [],
  onDismiss,
  className,
}) => {
  if (!message && errors.length === 0) return null;

  return (
    <div
      className={twMerge(
        clsx(
          "p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs sm:text-sm space-y-2 relative shadow-subtle",
          className
        )
      )}
      role="alert"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{title}</span>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="text-rose-500 hover:text-rose-700 p-0.5 -mr-1 -mt-1 rounded"
            aria-label="Dismiss"
          >
            ×
          </button>
        )}
      </div>

      {message && <p className="text-rose-600 dark:text-rose-300/90">{message}</p>}

      {errors.length > 0 && (
        <ul className="list-disc list-inside space-y-1 text-rose-600 dark:text-rose-300/80 pt-1">
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
