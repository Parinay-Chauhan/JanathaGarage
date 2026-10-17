import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, AlertCircle, Wrench } from "lucide-react";
import { useGetMyBookingsQuery } from "../../bookings/api/bookingsApi";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { Skeleton } from "../../../components/ui/Skeleton";

export const CustomerBookingsPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetMyBookingsQuery({
    status: statusFilter !== "ALL" ? statusFilter : undefined,
    page,
    limit: 10,
  });

  const bookings = data?.data?.bookings || [];
  const pagination = data?.data?.pagination;

  const filterTabs = [
    { label: "All Bookings", value: "ALL" },
    { label: "Pending", value: "PENDING" },
    { label: "Active & En Route", value: "ACCEPTED" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Cancelled", value: "CANCELLED" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 dark:text-white">
          My Vehicle Service History
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Track upcoming mechanic visits, view digital bills, and review finished jobs.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setStatusFilter(tab.value);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              statusFilter === tab.value
                ? "bg-brand-500 text-white shadow-glow"
                : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-2xl" />
          ))}
        </div>
      ) : bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card
              key={booking.id}
              hoverable
              className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-stone-200/80 dark:border-stone-800"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge status={booking.status} size="sm" />
                  <span className="text-xs font-mono font-bold text-stone-400">
                    #{booking.bookingNumber}
                  </span>
                  <span className="text-xs text-stone-400 font-medium hidden sm:inline">
                    · {new Date(booking.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-stone-900 dark:text-white">
                  {booking.service?.title || "Auto Repair Service"}
                </h3>

                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                  Address: {booking.serviceAddress || "Address provided"}
                </p>

                {booking.technician?.user && (
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold flex items-center gap-1">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Assigned Mechanic: {booking.technician.user.fullName}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-100 dark:border-stone-800">
                <div className="text-right">
                  <span className="text-xs text-stone-400 block font-medium">Agreed Price</span>
                  <span className="text-xl font-mono font-extrabold text-stone-900 dark:text-white">
                    ₹{booking.agreedPrice}
                  </span>
                </div>

                <Link to={`/customer/bookings/${booking.id}`}>
                  <Button variant="primary" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
                    Track Job
                  </Button>
                </Link>
              </div>
            </Card>
          ))}

          {/* Pagination Controls */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between pt-6">
              <span className="text-xs text-stone-500 font-medium">
                Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Card className="p-12 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 font-display">
            No bookings found
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            You don't have any bookings matching the "{statusFilter}" filter.
          </p>
          <Link to="/services">
            <Button variant="primary" size="sm">
              Book a Service Now
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
};
