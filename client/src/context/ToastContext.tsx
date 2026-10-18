import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type, title, message, duration = 4000 }: Omit<ToastItem, "id">) => {
      const id = "toast_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6);
      const newToast: ToastItem = { id, type, title, message, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const success = useCallback(
    (message: string, title?: string) => {
      showToast({ type: "success", message, title: title || "Success" });
    },
    [showToast]
  );

  const error = useCallback(
    (message: string, title?: string) => {
      showToast({ type: "error", message, title: title || "Error" });
    },
    [showToast]
  );

  const warning = useCallback(
    (message: string, title?: string) => {
      showToast({ type: "warning", message, title: title || "Attention" });
    },
    [showToast]
  );

  const info = useCallback(
    (message: string, title?: string) => {
      showToast({ type: "info", message, title: title || "Notice" });
    },
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{ showToast, removeToast, success, error, warning, info }}
    >
      {children}

      {/* Floating Toasts Container */}
      <div
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
        aria-live="polite"
        role="region"
      >
        {toasts.map((t) => {
          const config = {
            success: {
              icon: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
              border: "border-emerald-300 dark:border-emerald-800",
              bg: "bg-white/95 dark:bg-[#1E251F]/95",
              glow: "shadow-[0_8px_30px_rgb(16,185,129,0.15)]",
            },
            error: {
              icon: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
              border: "border-rose-300 dark:border-rose-800",
              bg: "bg-white/95 dark:bg-[#251D1E]/95",
              glow: "shadow-[0_8px_30px_rgb(244,63,94,0.15)]",
            },
            warning: {
              icon: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
              border: "border-amber-300 dark:border-amber-800",
              bg: "bg-white/95 dark:bg-[#25221B]/95",
              glow: "shadow-[0_8px_30px_rgb(245,158,11,0.15)]",
            },
            info: {
              icon: <Info className="w-5 h-5 text-[#E87532] shrink-0" />,
              border: "border-orange-300 dark:border-orange-900",
              bg: "bg-white/95 dark:bg-[#24201D]/95",
              glow: "shadow-[0_8px_30px_rgb(232,117,50,0.15)]",
            },
          }[t.type];

          return (
            <div
              key={t.id}
              className={twMerge(
                clsx(
                  "pointer-events-auto p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 flex items-start gap-3 shadow-lg animate-fadeIn",
                  config.bg,
                  config.border,
                  config.glow
                )
              )}
            >
              {config.icon}
              <div className="flex-1 min-w-0 pr-1">
                {t.title && (
                  <h4 className="text-xs font-bold text-[#252621] dark:text-[#F5F2EB] mb-0.5 tracking-tight">
                    {t.title}
                  </h4>
                )}
                <p className="text-xs text-[#717167] dark:text-[#A8A79F] leading-snug break-words">
                  {t.message}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-0.5 rounded transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
