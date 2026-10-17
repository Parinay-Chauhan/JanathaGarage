import React from "react";
import { CheckCircle2, Clock, Car, Navigation, Wrench, AlertTriangle } from "lucide-react";
import { BookingStatus } from "../../../types/api.types";

interface BookingStatusTimelineProps {
  status: BookingStatus;
  startOtp?: string | null;
}

export const BookingStatusTimeline: React.FC<BookingStatusTimelineProps> = ({
  status,
  startOtp,
}) => {
  if (status === "CANCELLED") {
    return (
      <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center gap-3 text-rose-700 dark:text-rose-300">
        <AlertTriangle className="w-5 h-5 shrink-0" />
        <span className="text-sm font-semibold">
          This booking has been cancelled or declined.
        </span>
      </div>
    );
  }

  const steps = [
    { key: "PENDING", label: "Requested", icon: Clock },
    { key: "ACCEPTED", label: "Mechanic Assigned", icon: CheckCircle2 },
    { key: "EN_ROUTE", label: "On The Way", icon: Navigation },
    { key: "ARRIVED", label: "Arrived at Spot", icon: Car },
    { key: "IN_PROGRESS", label: "Repairing", icon: Wrench },
    { key: "COMPLETED", label: "Completed", icon: CheckCircle2 },
  ];

  const statusOrder: BookingStatus[] = [
    "PENDING",
    "ACCEPTED",
    "EN_ROUTE",
    "ARRIVED",
    "IN_PROGRESS",
    "COMPLETED",
  ];

  const currentIndex = statusOrder.indexOf(status);

  return (
    <div className="w-full space-y-6">
      {/* Visual Stepper */}
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-stone-200 dark:bg-stone-800 w-full z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-500 transition-all duration-500 z-0"
          style={{
            width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isDone = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isCurrent
                    ? "bg-brand-500 text-white shadow-glow scale-110 ring-4 ring-brand-500/20"
                    : isDone
                    ? "bg-brand-600 text-white"
                    : "bg-white dark:bg-stone-900 border-2 border-stone-300 dark:border-stone-700 text-stone-400"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-[11px] font-semibold mt-2 text-center max-w-[80px] hidden sm:block ${
                  isCurrent
                    ? "text-brand-600 dark:text-brand-400 font-bold"
                    : isDone
                    ? "text-stone-900 dark:text-stone-100"
                    : "text-stone-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* OTP Display Card when job is waiting to start */}
      {startOtp && status !== "COMPLETED" && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Job Start Verification OTP
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-300 mt-0.5">
              Share this 4-digit code with the mechanic only after they arrive at your location.
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white dark:bg-stone-900 border border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 font-mono text-xl font-extrabold tracking-widest shadow-sm">
            {startOtp}
          </div>
        </div>
      )}
    </div>
  );
};
