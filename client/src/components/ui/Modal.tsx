import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "md",
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className={`relative w-full ${maxWidths[maxWidth]} rounded-3xl bg-white dark:bg-[#141210] p-6 sm:p-8 shadow-premium border border-[#E7E5DF] dark:border-[#2B231D] transition-all z-10 animate-in fade-in zoom-in-95 duration-200`}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-[#8F8F85] hover:text-[#252621] dark:hover:text-[#F5F2EB] hover:bg-[#F8F7F3] dark:hover:bg-[#1A1613] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {title && (
          <div className="mb-5 pr-8">
            <h3 className="text-xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-[#717167] dark:text-[#9E9488] mt-1">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};
