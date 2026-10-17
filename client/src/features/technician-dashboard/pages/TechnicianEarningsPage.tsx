import React from "react";
import { DollarSign, CheckCircle2, TrendingUp } from "lucide-react";
import { useGetMyBookingsQuery } from "../../bookings/api/bookingsApi";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { Skeleton } from "../../../components/ui/Skeleton";

export const TechnicianEarningsPage: React.FC = () => {
  const { data, isLoading } = useGetMyBookingsQuery({ status: "COMPLETED" });

  const completedJobs = data?.data?.bookings || [];
  const totalEarnings = completedJobs.reduce((acc, job) => acc + (Number(job.agreedPrice) || 0), 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 dark:text-white">
          Technician Earnings & Payouts
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Detailed breakdown of your completed service orders and payouts.
        </p>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-500">Gross Earnings</p>
            <p className="text-3xl font-extrabold font-mono text-stone-900 dark:text-white">
              ₹{totalEarnings}
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-500">Completed Orders</p>
            <p className="text-3xl font-extrabold font-mono text-stone-900 dark:text-white">
              {completedJobs.length}
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-500">Payout Cycle</p>
            <p className="text-xl font-bold text-stone-900 dark:text-white">
              Every Monday
            </p>
          </div>
        </Card>
      </div>

      {/* Completed Jobs Payout Ledger */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold font-display text-stone-900 dark:text-white">
          Completed Jobs Ledger
        </h3>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl" />
            ))}
          </div>
        ) : completedJobs.length > 0 ? (
          <div className="space-y-3">
            {completedJobs.map((job) => (
              <Card
                key={job.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-stone-200/80 dark:border-stone-800"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-stone-400">
                      #{job.bookingNumber}
                    </span>
                    <Badge status="COMPLETED" size="sm" />
                  </div>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-white">
                    {job.service?.title}
                  </h4>
                  <p className="text-xs text-stone-400">
                    Completed on {new Date(job.updatedAt).toLocaleDateString("en-IN")}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-emerald-500 font-bold block">Settled</span>
                  <span className="text-xl font-mono font-extrabold text-stone-900 dark:text-white">
                    +₹{job.agreedPrice}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center text-xs text-stone-500">
            No completed jobs yet. Once you complete repairs and verify OTP, earnings will appear here.
          </Card>
        )}
      </div>
    </div>
  );
};
