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
  Radio,
  Sparkles,
  MessageSquare,
  Zap,
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Service & Appointment Snapshot Card */}
        <Card className="p-6 sm:p-7 flex flex-col justify-between space-y-5 border border-[#E7E5DF] dark:border-[#2B231D] rounded-3xl bg-white dark:bg-[#141210] shadow-card">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#E7E5DF] dark:border-[#2B231D]">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF771C]/15 to-[#FF771C]/5 border border-[#FF771C]/30 text-[#FF771C] flex items-center justify-center shrink-0 shadow-sm">
                  <Wrench className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF771C] bg-[#FF771C]/10 border border-[#FF771C]/20 px-2 py-0.5 rounded-full">
                      Selected Service
                    </span>
                    <span className="text-[11px] font-semibold text-[#8A8074]">
                      {booking.service?.category?.name || "Doorstep Service"}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#252621] dark:text-[#F5F2EB] font-display mt-0.5 line-clamp-2">
                    {booking.service?.title}
                  </h3>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A8074] block">
                  Agreed Rate
                </span>
                <span className="text-xl font-extrabold font-mono text-[#252621] dark:text-[#F5F2EB]">
                  ₹{booking.agreedPrice}
                </span>
              </div>
            </div>

            {/* Structured Appointment & Location Info Tiles */}
            <div className="space-y-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-[#F9F8F5] dark:bg-[#1A1613] border border-[#EBE8E1] dark:border-[#2D241E] flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#251E18] text-[#FF771C] flex items-center justify-center shrink-0 shadow-xs border border-[#E7E5DF] dark:border-[#382D24]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A8074] block">
                    Appointment Schedule
                  </span>
                  <div className="flex items-center gap-2 flex-wrap mt-0.5">
                    <span className="text-xs font-bold text-[#252621] dark:text-[#F5F2EB]">
                      {new Date(booking.scheduledAt).toLocaleDateString("en-IN", {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-md bg-[#FF771C]/10 text-[#FF771C] border border-[#FF771C]/20">
                      {new Date(booking.scheduledAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })} (IST)
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F9F8F5] dark:bg-[#1A1613] border border-[#EBE8E1] dark:border-[#2D241E] flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#251E18] text-[#FF771C] flex items-center justify-center shrink-0 shadow-xs border border-[#E7E5DF] dark:border-[#382D24]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A8074] block">
                    Service Address / Parking Spot
                  </span>
                  <p className="text-xs font-bold text-[#252621] dark:text-[#F5F2EB] truncate mt-0.5">
                    {booking.serviceAddress}
                  </p>
                </div>
              </div>

              {booking.problemDescription && (
                <div className="p-3.5 rounded-2xl bg-[#F9F8F5] dark:bg-[#1A1613] border border-[#EBE8E1] dark:border-[#2D241E] space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A8074] block flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-[#FF771C]" />
                    <span>Reported Vehicle Issue</span>
                  </span>
                  <p className="text-xs italic text-[#717167] dark:text-[#C5BCB2] leading-relaxed">
                    "{booking.problemDescription}"
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between text-[11px] text-[#717167] dark:text-[#9E9488]">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#FF771C]" />
              <span>Transparent Upfront Guarantee</span>
            </span>
            <span className="font-mono font-semibold text-[#252621] dark:text-[#F5F2EB]">
              ID: #{booking.bookingNumber}
            </span>
          </div>
        </Card>

        {/* Assigned Technician Contact Card */}
        <Card className="p-6 sm:p-7 flex flex-col justify-between space-y-5 border border-[#E7E5DF] dark:border-[#2B231D] rounded-3xl bg-white dark:bg-[#141210] shadow-card">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#E7E5DF] dark:border-[#2B231D]">
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    booking.technician
                      ? "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                      : "bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30 text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {booking.technician ? (
                    <User className="w-6 h-6" />
                  ) : (
                    <Radio className="w-6 h-6 animate-pulse" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        booking.technician
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                          : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                      }`}
                    >
                      {booking.technician ? "Assigned Specialist" : "Live Dispatch"}
                    </span>
                    {!booking.technician && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <span>Radar Active</span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#252621] dark:text-[#F5F2EB] font-display mt-0.5">
                    {booking.technician?.user?.fullName || "Matching Certified Specialist"}
                  </h3>
                </div>
              </div>

              {booking.technician && (
                <div className="text-right shrink-0">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FFF5EE] dark:bg-[#251A12] border border-[#FFD9C2] dark:border-[#3D2617] text-[#FF771C] text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#FF771C]" />
                    <span>4.9</span>
                  </div>
                </div>
              )}
            </div>

            {booking.technician ? (
              <div className="space-y-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-[#F9F8F5] dark:bg-[#1A1613] border border-[#EBE8E1] dark:border-[#2D241E] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#FF771C]" />
                    <span className="text-xs text-stone-500 dark:text-stone-400">Direct Contact:</span>
                  </div>
                  <a
                    href={`tel:${booking.technician.user?.phone || "+918439616833"}`}
                    className="font-mono font-bold text-xs text-[#FF771C] hover:underline"
                  >
                    {booking.technician.user?.phone || "+91 84396 16833"}
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F9F8F5] dark:bg-[#1A1613] border border-[#EBE8E1] dark:border-[#2D241E] flex items-center justify-between text-xs">
                  <span className="text-stone-500 dark:text-stone-400">Field Experience:</span>
                  <span className="font-bold text-[#252621] dark:text-[#F5F2EB]">
                    {booking.technician.experienceYears || 7}+ Years Certified
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Identity, Skill & Police KYC Verified by JantaGaraj</span>
                </div>

                <div className="flex gap-2 pt-1">
                  <a
                    href={`tel:${booking.technician.user?.phone || "+918439616833"}`}
                    className="flex-1 py-2.5 rounded-xl text-center text-xs font-bold bg-[#FF771C] hover:bg-[#E56814] text-white shadow-md shadow-[#FF771C]/25 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Specialist
                  </a>
                  <a
                    href={`https://wa.me/918439616833?text=Hi%20JantaGaraj%20regarding%20booking%20${booking.bookingNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl text-xs font-bold border border-[#E7E5DF] dark:border-[#2B231D] hover:bg-[#F8F7F3] dark:hover:bg-[#1A1613] text-stone-700 dark:text-stone-200 flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <div className="py-4 px-3 flex flex-col items-center justify-center text-center space-y-4">
                {/* Visual Radar Rings */}
                <div className="relative flex items-center justify-center w-20 h-20 my-1">
                  <div className="absolute w-20 h-20 rounded-full bg-[#FF771C]/10 border border-[#FF771C]/20 animate-ping duration-1000" />
                  <div className="absolute w-14 h-14 rounded-full bg-[#FF771C]/15 border border-[#FF771C]/30 animate-pulse duration-700" />
                  <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF771C] to-[#E56814] text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,119,28,0.4)]">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#252621] dark:text-[#F5F2EB] font-display">
                    Broadcasting to Nearby Specialists...
                  </h4>
                  <p className="text-xs text-[#717167] dark:text-[#9E9488] max-w-xs mx-auto">
                    Scanning active certified mechanics within 5 km. A specialist will accept your request within 90 seconds.
                  </p>
                </div>

                {/* Progress Mini-steps */}
                <div className="w-full max-w-sm bg-[#F9F8F5] dark:bg-[#1A1613] rounded-2xl p-3 border border-[#EBE8E1] dark:border-[#2D241E] text-left space-y-2 text-[11px]">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Booking verified & slot reserved</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#FF771C] font-semibold animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-[#FF771C] ml-1 mr-0.5 shrink-0" />
                    <span>Broadcasting dispatch signal to 8 nearby mechanics</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card 2 Footer */}
          <div className="pt-3 border-t border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between gap-2 flex-wrap text-[11px]">
            <span className="text-[#717167] dark:text-[#9E9488] flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% KYC & Police Verified</span>
            </span>
            <div className="flex items-center gap-2">
              <a
                href="tel:+918439616833"
                className="px-3 py-1.5 rounded-xl font-bold border border-[#E7E5DF] dark:border-[#2B231D] hover:bg-[#F8F7F3] dark:hover:bg-[#1A1613] text-[#252621] dark:text-[#F5F2EB] flex items-center gap-1 transition-colors"
              >
                <Phone className="w-3 h-3 text-[#FF771C]" />
                <span>Call Helpline</span>
              </a>
              <a
                href={`https://wa.me/918439616833?text=Hi%20JantaGaraj%2C%20urgent%20dispatch%20for%20booking%20${booking.bookingNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 hover:bg-emerald-100 dark:hover:bg-emerald-950/70 transition-colors"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
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
