import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Wrench,
  User,
  Phone,
  CreditCard,
  ShieldCheck,
  Star,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  DollarSign,
} from "lucide-react";
import { useGetBookingByIdQuery } from "../api/bookingsApi";
import {
  useCreatePaymentOrderMutation,
  useVerifyPaymentMutation,
} from "../../payments/api/paymentsApi";
import { BookingStatusTimeline } from "../components/BookingStatusTimeline";
import { ReviewModal } from "../../reviews/components/ReviewModal";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Skeleton } from "../../../components/ui/Skeleton";

export const BookingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const { data, isLoading, error } = useGetBookingByIdQuery(id || "");
  const [createOrder] = useCreatePaymentOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  const booking = data?.data;

  const handleSimulatePayment = async () => {
    if (!booking) return;
    try {
      setPaymentProcessing(true);
      // 1. Initialize order
      const orderRes = await createOrder({
        bookingId: booking.id,
        method: "UPI",
      }).unwrap();

      // 2. Simulate successful payment verification callback
      if (orderRes.data) {
        await verifyPayment({
          paymentId: orderRes.data.paymentId,
          status: "SUCCESS",
          transactionId: `UPI-TXN-${Date.now()}`,
        }).unwrap();
      }
    } catch (e: any) {
      alert(e?.data?.message || "Payment simulation failed");
    } finally {
      setPaymentProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 py-8">
        <Skeleton className="h-12 w-48 rounded-xl" />
        <Skeleton className="h-64 w-full rounded-3xl" />
        <Skeleton className="h-44 w-full rounded-3xl" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <AlertCircle className="w-16 h-16 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-bold font-display text-stone-900 dark:text-white">
          Booking Not Found
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          This booking reference might be invalid or you may not be authorized to view it.
        </p>
        <Link to="/customer/bookings">
          <Button variant="primary">Return to My Bookings</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Top Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            to="/customer/bookings"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-brand-500 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Bookings</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-stone-900 dark:text-white">
              Booking #{booking.bookingNumber}
            </h1>
            <Badge status={booking.status} size="sm" />
          </div>
          <p className="text-xs text-stone-500">
            Booked on {new Date(booking.createdAt).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}
          </p>
        </div>

        {/* Action Button: Rate Mechanic if completed */}
        {booking.status === "COMPLETED" && (
          <Button
            variant="primary"
            size="md"
            leftIcon={<Star className="w-4 h-4 fill-white" />}
            onClick={() => setReviewModalOpen(true)}
          >
            Rate Mechanic
          </Button>
        )}
      </div>

      {/* Live Timeline & OTP Stepper Card */}
      <Card className="p-6 sm:p-8 space-y-6 border-brand-500/30">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-500 block">
            Real-Time Job Progression
          </span>
          <h3 className="text-xl font-bold font-display text-stone-900 dark:text-white mt-0.5">
            Service Tracking Status
          </h3>
        </div>

        <BookingStatusTimeline
          status={booking.status}
          startOtp={booking.startOtp}
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Service Details Card */}
        <Card className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-500 flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Service Selected
              </span>
              <h4 className="font-bold text-base text-stone-900 dark:text-white font-display">
                {booking.service?.title}
              </h4>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5 text-stone-600 dark:text-stone-300">
              <Calendar className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-stone-900 dark:text-white">
                  Appointment Schedule
                </span>
                <span>{new Date(booking.scheduledAt).toLocaleString("en-IN", { dateStyle: "full", timeStyle: "short" })}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-stone-600 dark:text-stone-300">
              <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-stone-900 dark:text-white">
                  Service Address / Location
                </span>
                <span>{booking.serviceAddress}</span>
              </div>
            </div>

            {booking.problemDescription && (
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <span className="font-semibold block text-stone-900 dark:text-white mb-1">
                  Reported Issue:
                </span>
                <p className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 text-stone-600 dark:text-stone-300 italic">
                  "{booking.problemDescription}"
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Assigned Mechanic Card */}
        <Card className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500 flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Assigned Mechanic
              </span>
              <h4 className="font-bold text-base text-stone-900 dark:text-white font-display">
                {booking.technician?.user?.fullName || "Awaiting Assignment"}
              </h4>
            </div>
          </div>

          {booking.technician ? (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Contact Number:</span>
                <a
                  href={`tel:${booking.technician.user?.phone}`}
                  className="font-bold text-brand-500 flex items-center gap-1 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{booking.technician.user?.phone}</span>
                </a>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-500">Field Experience:</span>
                <span className="font-semibold text-stone-900 dark:text-white">
                  {booking.technician.experienceYears || 5} Years Certified
                </span>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Identity & Police KYC Verified by JantaGaraj</span>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center space-y-2">
              <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin mx-auto" />
              <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Broadcasting to nearby mechanics...
              </p>
              <p className="text-[11px] text-stone-400">
                A verified mechanic will accept your request shortly.
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Invoice & Payment Card */}
      <Card className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-stone-200/80 dark:border-stone-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-brand-500" />
            <h3 className="text-lg font-bold font-display text-stone-900 dark:text-white">
              Billing & Payment
            </h3>
            <Badge
              status={booking.payment?.status || "PENDING"}
              size="sm"
            />
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm">
            Fixed upfront rate card. Pay digitally via UPI, card or cash on completion.
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-6 pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-100 dark:border-stone-800">
          <div className="text-right">
            <span className="text-xs text-stone-400 block font-medium">Total Bill</span>
            <span className="text-2xl font-mono font-extrabold text-stone-900 dark:text-white">
              ₹{booking.agreedPrice}
            </span>
          </div>

          {booking.payment?.status === "SUCCESS" ? (
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 dark:bg-emerald-950/50 px-4 py-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-5 h-5" />
              <span>Paid Online</span>
            </div>
          ) : (
            <Button
              variant="primary"
              size="md"
              leftIcon={<DollarSign className="w-4 h-4" />}
              isLoading={paymentProcessing}
              onClick={handleSimulatePayment}
            >
              Pay ₹{booking.agreedPrice} (UPI / Card)
            </Button>
          )}
        </div>
      </Card>

      {/* Review Modal Dialog */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        bookingId={booking.id}
      />
    </div>
  );
};
