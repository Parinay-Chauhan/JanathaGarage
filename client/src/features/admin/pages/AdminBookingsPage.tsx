import React from "react";
import { Link } from "react-router-dom";
import { useGetMyBookingsQuery } from "../../bookings/api/bookingsApi";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { Skeleton } from "../../../components/ui/Skeleton";

export const AdminBookingsPage: React.FC = () => {
  const { data, isLoading } = useGetMyBookingsQuery({ limit: 50 });

  const bookings = data?.data?.bookings || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 dark:text-white">
          Master Bookings Directory
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Complete platform audit of customer repair requests, assigned mechanics, and billing status.
        </p>
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
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-stone-200/80 dark:border-stone-800"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge status={booking.status} size="sm" />
                  <span className="text-xs font-mono font-bold text-stone-400">
                    #{booking.bookingNumber}
                  </span>
                  <span className="text-xs text-stone-400">
                    · {new Date(booking.scheduledAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <h4 className="font-bold text-base text-stone-900 dark:text-white font-display">
                  {booking.service?.title}
                </h4>
                <p className="text-xs text-stone-500">
                  Customer: <strong>{booking.customer?.user?.fullName || "Customer"}</strong> · Mechanic: <strong>{booking.technician?.user?.fullName || "Unassigned"}</strong>
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6">
                <div className="text-right">
                  <span className="text-xs text-stone-400 font-medium block">Agreed Fee</span>
                  <span className="text-lg font-mono font-extrabold text-stone-900 dark:text-white">
                    ₹{booking.agreedPrice}
                  </span>
                </div>

                <Link to={`/customer/bookings/${booking.id}`}>
                  <Button variant="outline" size="sm">
                    Inspect
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center text-xs text-stone-500">
          No platform bookings recorded yet.
        </Card>
      )}
    </div>
  );
};
