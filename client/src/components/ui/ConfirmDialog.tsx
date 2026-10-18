import React, { useState, useEffect } from "react";
import { AlertTriangle, XCircle, Info, CheckCircle2, X } from "lucide-react";
import { Button } from "./Button";
import { FormField } from "./FormField";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type ConfirmVariant = "danger" | "warning" | "info" | "brand";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void | Promise<void>;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmVariant;
  requireReason?: boolean;
  reasonLabel?: string;
  reasonPlaceholder?: string;
  reasonMinLength?: number;
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm Action",
  cancelLabel = "Cancel",
  variant = "danger",
  requireReason = false,
  reasonLabel = "Reason for this action",
  reasonPlaceholder = "Please explain the reason...",
  reasonMinLength = 5,
  isLoading = false,
}) => {
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setReason("");
      setReasonError(null);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const handleConfirmClick = async () => {
    if (requireReason) {
      if (!reason.trim()) {
        setReasonError("A mandatory reason is required to proceed.");
        return;
      }
      if (reason.trim().length < reasonMinLength) {
        setReasonError(`Please provide at least ${reasonMinLength} characters explaining the reason.`);
        return;
      }
    }
    setReasonError(null);
    await onConfirm(reason.trim());
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
          bg: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900",
          buttonVariant: "primary" as const,
          buttonClass: "bg-rose-600 hover:bg-rose-700 text-white shadow-none",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
          bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900",
          buttonVariant: "primary" as const,
          buttonClass: "bg-amber-600 hover:bg-amber-700 text-white shadow-none",
        };
      case "info":
        return {
          icon: <Info className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
          bg: "bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900",
          buttonVariant: "primary" as const,
          buttonClass: "bg-sky-600 hover:bg-sky-700 text-white shadow-none",
        };
      case "brand":
      default:
        return {
          icon: <CheckCircle2 className="w-6 h-6 text-[#E87532]" />,
          bg: "bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900",
          buttonVariant: "primary" as const,
          buttonClass: "bg-[#E87532] hover:bg-[#d66525] text-white shadow-orange-glow",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#252621]/60 backdrop-blur-sm transition-opacity"
        onClick={isLoading ? undefined : onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
          className="relative transform overflow-hidden rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-6 sm:p-7"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-5 right-5 text-stone-400 hover:text-stone-600 dark:hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div
              className={twMerge(
                clsx(
                  "w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0",
                  styles.bg
                )
              )}
            >
              {styles.icon}
            </div>
            <div className="pr-6">
              <h3 className="text-lg font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-[#717167] dark:text-[#9E9488] mt-1 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Optional reason textarea */}
          {requireReason && (
            <div className="my-4">
              <FormField
                label={reasonLabel}
                required
                error={reasonError || undefined}
                helperText={`Minimum ${reasonMinLength} characters required.`}
              >
                <textarea
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                    if (reasonError) setReasonError(null);
                  }}
                  disabled={isLoading}
                  rows={3}
                  placeholder={reasonPlaceholder}
                  className="w-full rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs sm:text-sm p-3 text-[#252621] dark:text-[#F5F2EB] placeholder:text-stone-400 focus:outline-none focus:border-[#E87532] focus:ring-1 focus:ring-[#E87532] resize-none"
                />
              </FormField>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3 border-t border-[#E7E5DF]/60 dark:border-[#2B231D]/60">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
              disabled={isLoading}
              className="w-full sm:w-auto text-xs sm:text-sm border-[#E7E5DF] dark:border-[#2B231D]"
            >
              {cancelLabel}
            </Button>

            <Button
              type="button"
              variant={styles.buttonVariant}
              size="md"
              onClick={handleConfirmClick}
              isLoading={isLoading}
              className={twMerge(
                clsx(
                  "w-full sm:w-auto text-xs sm:text-sm font-bold",
                  styles.buttonClass
                )
              )}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
