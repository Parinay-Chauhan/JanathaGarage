import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  ShieldAlert,
  CalendarCheck,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { useGetPlatformStatsQuery } from "../api/adminApi";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Skeleton } from "../../../components/ui/Skeleton";

export const AdminDashboardPage: React.FC = () => {
  const { data, isLoading } = useGetPlatformStatsQuery();
  const stats = data?.data;

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
          Executive Operations
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-stone-900 dark:text-white mt-1">
          Platform Performance & Compliance
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
          Live overview of users, technician KYC pipeline, bookings, and platform revenue.
        </p>
      </div>

      {/* Main KPI Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-3xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 space-y-2 border-stone-200/80 dark:border-stone-800">
            <div className="flex items-center justify-between text-stone-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Users</span>
              <Users className="w-5 h-5 text-brand-500" />
            </div>
            <p className="text-3xl font-extrabold font-mono text-stone-900 dark:text-white">
              {stats?.users.total || 0}
            </p>
            <p className="text-xs text-stone-400">
              {stats?.users.customers || 0} Customers · {stats?.users.technicians || 0} Mechanics
            </p>
          </Card>

          <Card className="p-6 space-y-2 border-stone-200/80 dark:border-stone-800">
            <div className="flex items-center justify-between text-stone-500">
              <span className="text-xs font-semibold uppercase tracking-wider">KYC Queue</span>
              <ShieldAlert className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-extrabold font-mono text-stone-900 dark:text-white">
              {stats?.kyc.pendingVerification || 0}
            </p>
            <Link
              to="/admin/technicians/verification"
              className="text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Review Documents</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>

          <Card className="p-6 space-y-2 border-stone-200/80 dark:border-stone-800">
            <div className="flex items-center justify-between text-stone-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Bookings</span>
              <CalendarCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-3xl font-extrabold font-mono text-stone-900 dark:text-white">
              {stats?.bookings.total || 0}
            </p>
            <p className="text-xs text-emerald-600 font-semibold">
              {stats?.bookings.completed || 0} Successful Repairs
            </p>
          </Card>

          <Card className="p-6 space-y-2 border-stone-200/80 dark:border-stone-800">
            <div className="flex items-center justify-between text-stone-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Platform GMV</span>
              <DollarSign className="w-5 h-5 text-brand-500" />
            </div>
            <p className="text-3xl font-extrabold font-mono text-stone-900 dark:text-white">
              ₹{stats?.revenue.totalINR || 0}
            </p>
            <p className="text-xs text-stone-400">
              Settled payment volume
            </p>
          </Card>
        </div>
      )}

      {/* Quick Action Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-base text-stone-900 dark:text-white font-display">
                Mechanic KYC Verifications
              </h4>
              <p className="text-xs text-stone-500">
                Review submitted Aadhaar, Driving License and PAN cards.
              </p>
            </div>
          </div>
          <Link to="/admin/technicians/verification">
            <Button variant="primary" size="sm" className="w-full">
              Open Verification Queue ({stats?.kyc.pendingVerification || 0})
            </Button>
          </Link>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-base text-stone-900 dark:text-white font-display">
                Bookings Management
              </h4>
              <p className="text-xs text-stone-500">
                Audit all customer orders, active statuses and billing records.
              </p>
            </div>
          </div>
          <Link to="/admin/bookings">
            <Button variant="secondary" size="sm" className="w-full">
              Audit Platform Bookings
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};
