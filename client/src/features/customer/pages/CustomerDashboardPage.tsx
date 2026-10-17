import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
} from "lucide-react";
import { useAppSelector } from "../../../app/hooks";
import { useGetMyBookingsQuery } from "../../bookings/api/bookingsApi";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Skeleton } from "../../../components/ui/Skeleton";

export const CustomerDashboardPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetMyBookingsQuery({ limit: 5 });

  const bookings = data?.data?.bookings || [];
  const activeBooking = bookings.find((b) =>
    ["PENDING", "ACCEPTED", "EN_ROUTE", "ARRIVED", "IN_PROGRESS"].includes(b.status)
  );

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900 to-stone-950 text-white border border-stone-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
            Customer Dashboard
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display mt-1">
            Welcome back, {user?.fullName || "Valued Customer"}!
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-md">
            Track your vehicle repair history, view active mechanic dispatches, and manage doorstep services.
          </p>
        </div>

        <Link to="/services">
          <Button
            variant="primary"
            size="md"
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Book New Repair
          </Button>
        </Link>
      </div>

      {/* Active Service Radar Alert */}
      {activeBooking && (
        <div className="p-6 rounded-3xl bg-brand-500/10 border-2 border-brand-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-glow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center shrink-0 animate-pulse">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge status={activeBooking.status} size="sm" />
                <span className="text-xs font-mono font-bold text-stone-500">
                  #{activeBooking.bookingNumber}
                </span>
              </div>
              <h3 className="text-lg font-bold font-display text-stone-900 dark:text-white">
                {activeBooking.service?.title || "Active Service Request"}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                {activeBooking.status === "PENDING"
                  ? "Looking for the nearest available mechanic in your area..."
                  : `Mechanic assigned: ${activeBooking.technician?.user?.fullName || "Certified Mechanic"}`}
              </p>
            </div>
          </div>

          <Link to={`/customer/bookings/${activeBooking.id}`}>
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Live Job Console
            </Button>
          </Link>
        </div>
      )}

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/50 text-brand-500 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
              Total Services Booked
            </p>
            <p className="text-2xl font-bold font-mono text-stone-900 dark:text-white">
              {data?.data?.pagination?.total || 0}
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
              Completed Repairs
            </p>
            <p className="text-2xl font-bold font-mono text-stone-900 dark:text-white">
              {bookings.filter((b) => b.status === "COMPLETED").length}
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-brand-500" />
          </div>
          <div>
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
              Account Status
            </p>
            <p className="text-base font-bold text-stone-900 dark:text-white">
              Verified Customer
            </p>
          </div>
        </Card>
      </div>

      {/* Recent Bookings List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold font-display text-stone-900 dark:text-white">
            Recent Service Bookings
          </h3>
          <Link
            to="/customer/bookings"
            className="text-xs font-bold text-brand-500 hover:underline"
          >
            View All ({data?.data?.pagination?.total || 0}) →
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl" />
            ))}
          </div>
        ) : bookings.length > 0 ? (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <Card
                key={booking.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-stone-200/80 dark:border-stone-800 hover:border-brand-500/40"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge status={booking.status} size="sm" />
                    <span className="text-xs font-mono font-semibold text-stone-400">
                      #{booking.bookingNumber}
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-stone-900 dark:text-white font-display">
                    {booking.service?.title || "Auto Repair Service"}
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Scheduled: {new Date(booking.scheduledAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-right">
                    <span className="text-xs text-stone-400 block font-medium">Price</span>
                    <span className="text-lg font-mono font-bold text-stone-900 dark:text-white">
                      ₹{booking.agreedPrice}
                    </span>
                  </div>

                  <Link to={`/customer/bookings/${booking.id}`}>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-stone-300 mx-auto" />
            <h4 className="font-bold text-stone-700 dark:text-stone-300">
              No service bookings yet
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              When your vehicle needs repairs or routine maintenance, book here in 2 clicks.
            </p>
            <Link to="/services">
              <Button variant="primary" size="sm">
                Explore Services Catalog
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
};
