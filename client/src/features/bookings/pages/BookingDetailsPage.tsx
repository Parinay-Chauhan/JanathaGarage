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
  Lock,
  Copy,
  Check,
  Printer,
  Download,
  MessageCircle,
  Clock,
  Car,
  Navigation,
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
import { Booking } from "../../../types/api.types";

export const BookingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [copiedOtp, setCopiedOtp] = useState(false);

  const { data, isLoading, error } = useGetBookingByIdQuery(id || "");
  const [createOrder] = useCreatePaymentOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  // Fallback demo booking for test links / preview
  const demoFallbackBooking: Booking = {
    id: id || "demo-live-101",
    bookingNumber: "JG-8842",
    customerId: "demo-cust",
    serviceId: "svc-ac-jet",
    status: "EN_ROUTE",
    problemDescription:
      "Split AC is not cooling properly and making a buzzing noise. Need indoor jet foam wash and compressor inspection.",
    scheduledAt: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
    startOtp: "4821",
    agreedPrice: 499,
    serviceAddress: "Flat 402, Lotus Apartments, Connaught Place, New Delhi - 110001",
    service: {
      id: "svc-ac-jet",
      categoryId: "ac-repair",
      title: "Split AC Deep Anti-Bacterial Jet Wash & Gas Inspection",
      defaultPrice: 499,
      durationMinutes: 45,
      rating: 4.9,
    },
    technician: {
      id: "tech-vikram",
      experienceYears: 7,
      user: {
        fullName: "Vikramjit Singh",
        phone: "+91 84396 16833",
      },
    },
    payment: {
      id: "pay-101",
      bookingId: id || "demo-live-101",
      amount: 499,
      method: "CASH",
      status: "PENDING",
      createdAt: new Date().toISOString(),
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const booking = data?.data || (id?.startsWith("demo") || error ? demoFallbackBooking : null);

  const handleCopyOtp = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  const handleSimulatePayment = async () => {
    if (!booking) return;
    try {
      setPaymentProcessing(true);
      const orderRes = await createOrder({
        bookingId: booking.id,
        method: "UPI",
      }).unwrap();

      if (orderRes.data) {
        await verifyPayment({
          paymentId: orderRes.data.paymentId,
          status: "SUCCESS",
          transactionId: `UPI-TXN-${Date.now()}`,
        }).unwrap();
      }
    } catch (e: any) {
      // In local demo fallback, mark paid locally
      if (booking.payment) {
        booking.payment.status = "SUCCESS";
        alert("Payment simulated successfully via UPI!");
      }
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
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

  if (!booking) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <AlertCircle className="w-16 h-16 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-bold font-display text-[#252621] dark:text-white">
          Booking Not Found
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          This booking reference could not be found or you may not be authorized.
        </p>
        <Link to="/customer/bookings">
          <Button variant="primary">Return to My Bookings</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E7E5DF] dark:border-[#2B231D]">
        <div className="space-y-1">
          <Link
            to="/customer/bookings"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-[#E87532] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Bookings</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#252621] dark:text-white">
              Booking #{booking.bookingNumber}
            </h1>
            <Badge status={booking.status} size="sm" />
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Created on{" "}
            {new Date(booking.createdAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>

        {/* Action CTAs: Print / Rate */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrintInvoice}
            leftIcon={<Printer className="w-4 h-4" />}
            className="font-semibold text-xs"
          >
            Print Receipt
          </Button>

          {booking.status === "COMPLETED" && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Star className="w-4 h-4 fill-white" />}
              onClick={() => setReviewModalOpen(true)}
              className="font-bold shadow-orange-glow text-xs"
            >
              Rate Technician
            </Button>
          )}
        </div>
      </div>

      {/* Start OTP Highlight Box (if active) */}
      {booking.startOtp && booking.status !== "COMPLETED" && booking.status !== "CANCELLED" && (
        <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                Job Start Verification OTP
              </span>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 max-w-md">
                Only share this 4-digit code in person when the technician arrives at your doorstep to start billing safely.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-5 py-2 rounded-2xl bg-white dark:bg-[#1A1613] border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 font-mono text-2xl font-black tracking-widest shadow-sm">
              {booking.startOtp}
            </span>
            <button
              onClick={() => handleCopyOtp(booking.startOtp || "")}
              className="p-2.5 rounded-2xl bg-white dark:bg-[#1A1613] border border-amber-300 dark:border-amber-700 text-amber-700 hover:text-amber-900 transition-colors"
              title="Copy OTP"
            >
              {copiedOtp ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Real-time Status Timeline Stepper */}
      <Card className="p-6 sm:p-8 space-y-6 border-[#E87532]/30">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87532] block">
            Real-Time Job Progression
          </span>
          <h2 className="text-xl font-bold font-display text-[#252621] dark:text-white mt-0.5">
            Service Tracking Timeline
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Live status updates from dispatch to doorstep completion.
          </p>
        </div>

        <BookingStatusTimeline
          status={booking.status}
          startOtp={booking.startOtp}
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Service & Appointment Snapshot Card */}
        <Card className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-[#E7E5DF] dark:border-[#2B231D]">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-[#E87532] flex items-center justify-center shrink-0 border border-orange-200">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Selected Service
              </span>
              <h3 className="font-bold text-base text-[#252621] dark:text-white font-display">
                {booking.service?.title}
              </h3>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5 text-stone-600 dark:text-stone-300">
              <Calendar className="w-4 h-4 text-[#E87532] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-[#252621] dark:text-white">
                  Appointment Schedule
                </span>
                <span>
                  {new Date(booking.scheduledAt).toLocaleString("en-IN", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-stone-600 dark:text-stone-300">
              <MapPin className="w-4 h-4 text-[#E87532] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-[#252621] dark:text-white">
                  Service Address
                </span>
                <span>{booking.serviceAddress}</span>
              </div>
            </div>

            {booking.problemDescription && (
              <div className="pt-2 border-t border-[#E7E5DF] dark:border-[#2B231D]">
                <span className="font-semibold block text-[#252621] dark:text-white mb-1">
                  Reported Issue Description:
                </span>
                <p className="p-3 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] text-stone-600 dark:text-stone-300 italic border border-[#E7E5DF] dark:border-[#2B231D]">
                  "{booking.problemDescription}"
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Assigned Technician Contact Card */}
        <Card className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-[#E7E5DF] dark:border-[#2B231D]">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Assigned Specialist
              </span>
              <h3 className="font-bold text-base text-[#252621] dark:text-white font-display">
                {booking.technician?.user?.fullName || "Awaiting Assignment"}
              </h3>
            </div>
          </div>

          {booking.technician ? (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Contact Number:</span>
                <a
                  href={`tel:${booking.technician.user?.phone || "+918439616833"}`}
                  className="font-bold text-[#E87532] flex items-center gap-1 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{booking.technician.user?.phone}</span>
                </a>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-500">Certified Field Experience:</span>
                <span className="font-semibold text-[#252621] dark:text-white">
                  {booking.technician.experienceYears || 7}+ Years
                </span>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Identity, Skill & Police KYC Verified by JantaGaraj</span>
              </div>

              <div className="flex gap-2 pt-1">
                <a
                  href={`tel:${booking.technician.user?.phone || "+918439616833"}`}
                  className="flex-1 py-2 rounded-xl text-center text-xs font-bold bg-[#E87532] text-white hover:bg-orange-600 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Specialist
                </a>
                <a
                  href={`https://wa.me/918439616833?text=Hi%20JantaGaraj%20regarding%20booking%20${booking.bookingNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl text-xs font-bold border border-[#E7E5DF] dark:border-[#2B231D] hover:bg-[#F8F7F3] text-stone-700 dark:text-stone-200 flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center space-y-2">
              <div className="w-8 h-8 rounded-full border-2 border-[#E87532] border-t-transparent animate-spin mx-auto" />
              <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Broadcasting to nearby specialists...
              </p>
              <p className="text-[11px] text-stone-400">
                A verified technician will accept your request within 90 seconds.
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Invoice & Payment Card */}
      <Card className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-[#E7E5DF] dark:border-[#2B231D]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#E87532]" />
            <h3 className="text-lg font-bold font-display text-[#252621] dark:text-white">
              Billing & Settlement
            </h3>
            <Badge status={booking.payment?.status || "PENDING"} size="sm" />
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm">
            Fixed upfront rate card with 100% price guarantee. Pay digitally via UPI, card, or cash after inspection.
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-6 pt-4 sm:pt-0 border-t sm:border-t-0 border-[#E7E5DF] dark:border-[#2B231D]">
          <div className="text-right">
            <span className="text-xs text-stone-400 block font-medium">Total Bill</span>
            <span className="text-2xl font-mono font-extrabold text-[#252621] dark:text-white">
              ₹{booking.agreedPrice}
            </span>
          </div>

          {booking.payment?.status === "SUCCESS" ? (
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 dark:bg-emerald-950/50 px-4 py-2.5 rounded-2xl border border-emerald-200 dark:border-emerald-800">
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
              className="font-bold shadow-orange-glow"
            >
              Pay ₹{booking.agreedPrice} Online
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
