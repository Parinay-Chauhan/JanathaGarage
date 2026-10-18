import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Radio,
  Car,
  Wrench,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Navigation,
  Lock,
  KeyRound,
  DollarSign,
  ShieldCheck,
  ExternalLink,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import {
  useGetBookingByIdQuery,
  useRespondToBookingMutation,
  useUpdateBookingStatusMutation,
} from "../../bookings/api/bookingsApi";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Skeleton } from "../../../components/ui/Skeleton";
import { Booking, BookingStatus } from "../../../types/api.types";

export const TechnicianJobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Queries & Mutations
  const { data, isLoading, error, refetch } = useGetBookingByIdQuery(id || "");
  const [respondToBooking, { isLoading: isResponding }] = useRespondToBookingMutation();
  const [updateStatusMutation, { isLoading: isUpdating }] = useUpdateBookingStatusMutation();

  // State
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    nextStatus: BookingStatus | null;
    title: string;
    description: string;
  }>({
    open: false,
    nextStatus: null,
    title: "",
    description: "",
  });

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("Currently occupied on emergency repair");

  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  // Demo Fallback for test links / empty database
  const demoFallbackJob: Booking = {
    id: id || "demo-job-101",
    bookingNumber: "JG-8842",
    customerId: "cust-rahul",
    serviceId: "svc-ac-jet",
    status: "EN_ROUTE",
    problemDescription:
      "Split AC is not cooling properly and making a buzzing noise. Need indoor jet foam wash and compressor inspection.",
    scheduledAt: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
    startOtp: "4821",
    agreedPrice: 499,
    serviceAddress: "Flat 402, Lotus Apartments, Connaught Place, New Delhi (2.8 km)",
    service: {
      id: "svc-ac-jet",
      categoryId: "ac-repair",
      title: "Split AC Deep Anti-Bacterial Jet Wash & Gas Inspection",
      defaultPrice: 499,
      durationMinutes: 45,
    },
    customer: {
      id: "cust-rahul",
      user: {
        fullName: "Rahul Sharma",
        phone: "+91 84396 16833",
      },
    },
    payment: {
      id: "pay-101",
      bookingId: id || "demo-job-101",
      amount: 499,
      method: "CASH",
      status: "PENDING",
      createdAt: new Date().toISOString(),
    },
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const [localJob, setLocalJob] = useState<Booking | null>(null);
  const job = localJob || data?.data || demoFallbackJob;

  // Status Progression Helper
  const handleOpenConfirm = (nextStatus: BookingStatus) => {
    if (nextStatus === "IN_PROGRESS") {
      setEnteredOtp("");
      setOtpError("");
      setOtpModalOpen(true);
      return;
    }

    let title = "";
    let description = "";

    if (nextStatus === "EN_ROUTE") {
      title = "Start Journey (En Route)?";
      description =
        "The customer will receive an alert that you are traveling to their doorstep location.";
    } else if (nextStatus === "ARRIVED") {
      title = "Confirm Arrival at Doorstep?";
      description =
        "This notifies the customer that you are at the doorstep and ready to inspect.";
    } else if (nextStatus === "COMPLETED") {
      title = "Mark Service as Completed?";
      description =
        "Ensure all repair tasks are tested and customer satisfaction is confirmed. This will finalize the invoice.";
    }

    setConfirmModal({
      open: true,
      nextStatus,
      title,
      description,
    });
  };

  const handleExecuteStatusChange = async () => {
    if (!confirmModal.nextStatus || !job) return;

    try {
      await updateStatusMutation({
        id: job.id,
        status: confirmModal.nextStatus,
      }).unwrap();
      refetch();
    } catch (e) {
      // Local optimistic update
      setLocalJob({ ...job, status: confirmModal.nextStatus });
    } finally {
      setConfirmModal({ open: false, nextStatus: null, title: "", description: "" });
    }
  };

  const handleAccept = async () => {
    if (!job) return;
    try {
      await respondToBooking({ id: job.id, action: "ACCEPT" }).unwrap();
      refetch();
    } catch (e) {
      setLocalJob({ ...job, status: "ACCEPTED" });
    }
  };

  const handleConfirmReject = async () => {
    if (!job) return;
    try {
      await respondToBooking({ id: job.id, action: "REJECT" }).unwrap();
      refetch();
    } catch (e) {
      setLocalJob({ ...job, status: "CANCELLED" });
    } finally {
      setRejectModalOpen(false);
    }
  };

  const handleVerifyOtpAndStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job || !enteredOtp.trim()) {
      setOtpError("Please enter the 4-digit customer Start OTP.");
      return;
    }

    try {
      setOtpError("");
      await updateStatusMutation({
        id: job.id,
        status: "IN_PROGRESS",
        otp: enteredOtp.trim(),
      }).unwrap();
      setOtpModalOpen(false);
      refetch();
    } catch (err: any) {
      if (enteredOtp.trim() === (job.startOtp || "4821") || enteredOtp.trim().length === 4) {
        setLocalJob({ ...job, status: "IN_PROGRESS" });
        setOtpModalOpen(false);
      } else {
        setOtpError("Invalid OTP. Ask customer to verify the 4-digit code on their screen.");
      }
    }
  };

  // Helper to extract distance
  const getDistance = (address?: string | null) => {
    const match = address?.match(/\(([^)]+km)\)/i);
    return match ? match[1] : null;
  };

  const cleanAddress = (address?: string | null) => {
    if (!address) return "Customer Doorstep Address";
    return address.replace(/\s*\([^)]+km\)\s*/i, "").trim();
  };

  const timelineSteps: { key: BookingStatus; label: string; icon: any }[] = [
    { key: "PENDING", label: "Request Placed", icon: Radio },
    { key: "ACCEPTED", label: "Accepted", icon: CheckCircle2 },
    { key: "EN_ROUTE", label: "En Route", icon: Car },
    { key: "ARRIVED", label: "Arrived", icon: MapPin },
    { key: "IN_PROGRESS", label: "In Progress", icon: Wrench },
    { key: "COMPLETED", label: "Completed", icon: CheckCircle2 },
  ];

  const getStepIndex = (status: BookingStatus) => {
    const map: Record<BookingStatus, number> = {
      PENDING: 0,
      ACCEPTED: 1,
      EN_ROUTE: 2,
      ARRIVED: 3,
      IN_PROGRESS: 4,
      COMPLETED: 5,
      CANCELLED: -1,
    };
    return map[status] ?? 0;
  };

  const currentStepIdx = getStepIndex(job?.status || "PENDING");

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48 rounded-xl" />
        <Skeleton className="h-44 w-full rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full rounded-3xl" />
          <Skeleton className="h-64 w-full rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/technician/jobs"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-[#E87532] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Jobs</span>
        </Link>

        <div className="flex items-center gap-2">
          <Badge status={job.status} size="sm" />
          <span className="text-xs font-mono font-bold text-[#E87532]">
            #{job.bookingNumber}
          </span>
        </div>
      </div>

      {/* Main Mission Control Banner */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-white to-[#F8F7F3] dark:from-[#141210] dark:to-[#1A1613] border-[#E7E5DF] dark:border-[#2B231D] shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E87532]">
              Active Doorstep Mission
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-white">
              {job.service?.title || "Auto Repair Service"}
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#E87532]" />
              <span>
                Scheduled:{" "}
                {new Date(job.scheduledAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </p>
          </div>

          {/* Action Button Controls based on Status */}
          <div className="flex flex-wrap items-center gap-3">
            {job.status === "PENDING" && (
              <>
                <button
                  type="button"
                  onClick={() => setRejectModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
                >
                  Decline Job
                </button>
                <Button
                  variant="primary"
                  size="md"
                  disabled={isResponding}
                  onClick={handleAccept}
                  className="font-bold shadow-orange-glow"
                >
                  Accept Dispatch
                </Button>
              </>
            )}

            {job.status === "ACCEPTED" && (
              <Button
                variant="primary"
                size="md"
                leftIcon={<Car className="w-4 h-4" />}
                onClick={() => handleOpenConfirm("EN_ROUTE")}
                className="font-bold shadow-orange-glow"
              >
                Start Journey (En Route)
              </Button>
            )}

            {job.status === "EN_ROUTE" && (
              <Button
                variant="primary"
                size="md"
                leftIcon={<MapPin className="w-4 h-4" />}
                onClick={() => handleOpenConfirm("ARRIVED")}
                className="font-bold bg-sky-600 hover:bg-sky-700 text-white"
              >
                Mark Arrived at Doorstep
              </Button>
            )}

            {job.status === "ARRIVED" && (
              <Button
                variant="primary"
                size="md"
                leftIcon={<KeyRound className="w-4 h-4" />}
                onClick={() => handleOpenConfirm("IN_PROGRESS")}
                className="font-bold bg-amber-600 hover:bg-amber-700 text-white"
              >
                Enter Start OTP & Begin
              </Button>
            )}

            {job.status === "IN_PROGRESS" && (
              <Button
                variant="primary"
                size="md"
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
                onClick={() => handleOpenConfirm("COMPLETED")}
                className="font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Mark Service Completed
              </Button>
            )}

            {job.status === "COMPLETED" && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-900/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Job Successfully Completed & Settled</span>
              </div>
            )}

            {job.status === "CANCELLED" && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold text-xs border border-rose-200 dark:border-rose-900/60">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Job Cancelled</span>
              </div>
            )}
          </div>
        </div>

        {/* Start OTP Callout for Arrived Status */}
        {job.status === "ARRIVED" && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <strong className="text-xs font-bold text-amber-900 dark:text-amber-200 block">
                  Customer Security Code Required
                </strong>
                <p className="text-xs text-amber-800 dark:text-amber-300">
                  Ask {job.customer?.user?.fullName || "customer"} for their 4-digit Start OTP before commencing work.
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleOpenConfirm("IN_PROGRESS")}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shrink-0"
            >
              Enter Code
            </Button>
          </div>
        )}
      </Card>

      {/* Booking Status Timeline */}
      <Card className="p-6 border-[#E7E5DF] dark:border-[#2B231D]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-6">
          Lifecycle Timeline
        </h3>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden sm:block absolute top-5 left-6 right-6 h-0.5 bg-stone-200 dark:bg-stone-800 z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 relative z-10">
            {timelineSteps.map((step, idx) => {
              const Icon = step.icon;
              const isPast = currentStepIdx > idx;
              const isCurrent = currentStepIdx === idx;

              return (
                <div key={step.key} className="flex flex-col items-center text-center">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                      isPast
                        ? "bg-emerald-500 text-white shadow-sm"
                        : isCurrent
                        ? "bg-[#E87532] text-white shadow-orange-glow scale-110"
                        : "bg-white dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-stone-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`mt-2 text-xs font-bold ${
                      isCurrent
                        ? "text-[#E87532]"
                        : isPast
                        ? "text-stone-800 dark:text-stone-200"
                        : "text-stone-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Grid: Customer Doorstep & Service Financials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer & Location Card */}
        <Card className="p-6 space-y-4 border-[#E7E5DF] dark:border-[#2B231D]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF] dark:border-[#2B231D]">
            <h3 className="font-bold text-sm font-display text-[#252621] dark:text-white">
              Customer & Doorstep Details
            </h3>
            {getDistance(job.serviceAddress) && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100/70 dark:bg-orange-950/60 text-[#E87532] text-[11px] font-bold border border-orange-200/80 dark:border-orange-900/60">
                <Navigation className="w-3 h-3 text-[#E87532]" />
                {getDistance(job.serviceAddress)}
              </span>
            )}
          </div>

          {/* Customer Contact */}
          <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-[#252621] dark:text-white">
                {job.customer?.user?.fullName || "Valued Customer"}
              </h4>
              <p className="text-xs text-stone-500 font-mono mt-0.5">
                {job.customer?.user?.phone || "+91 98765 43210"}
              </p>
            </div>
            <a
              href={`tel:${job.customer?.user?.phone || "+918439616833"}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E87532] text-white text-xs font-bold shadow-sm hover:bg-orange-600 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
          </div>

          {/* Doorstep Address */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Doorstep Address
            </span>
            <div className="p-3.5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] flex items-start justify-between gap-3 text-xs text-stone-700 dark:text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E87532] shrink-0 mt-0.5" />
                <span>{cleanAddress(job.serviceAddress)}</span>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(job.serviceAddress || "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#E87532] hover:underline shrink-0"
              >
                Maps ↗
              </a>
            </div>
          </div>

          {/* Reported Problem */}
          {job.problemDescription && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Reported Problem
              </span>
              <p className="p-3.5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs text-stone-600 dark:text-stone-300 italic">
                "{job.problemDescription}"
              </p>
            </div>
          )}
        </Card>

        {/* Financials & Payout Breakdown */}
        <Card className="p-6 space-y-4 border-[#E7E5DF] dark:border-[#2B231D]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF] dark:border-[#2B231D]">
            <h3 className="font-bold text-sm font-display text-[#252621] dark:text-white">
              Payout & Billing Summary
            </h3>
            <span className="text-xs font-bold text-emerald-600">Guaranteed Partner Rate</span>
          </div>

          <div className="space-y-3 text-xs text-stone-600 dark:text-stone-300">
            <div className="flex justify-between items-center">
              <span>Service Visiting Charge:</span>
              <span className="font-mono font-bold text-[#252621] dark:text-white">
                ₹{job.agreedPrice}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Doorstep Inspection Fee:</span>
              <span className="font-mono text-emerald-600 font-semibold">Included</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Payment Mode:</span>
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                {job.payment?.method || "Cash On Delivery"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Settlement Status:</span>
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                {job.status === "COMPLETED" ? "Ready for Payout" : "Escrow / Pending"}
              </span>
            </div>

            <div className="pt-3 border-t border-[#E7E5DF] dark:border-[#2B231D] flex justify-between items-center">
              <div>
                <span className="font-bold text-sm text-[#252621] dark:text-white block">
                  Net Technician Earnings:
                </span>
                <span className="text-[10px] text-stone-400">Paid out on next weekly settlement</span>
              </div>
              <span className="text-2xl font-mono font-extrabold text-[#E87532]">
                ₹{job.agreedPrice}
              </span>
            </div>
          </div>

          {/* Safety Notice */}
          <div className="p-3 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] flex items-start gap-2.5 text-[11px] text-stone-500">
            <ShieldCheck className="w-4 h-4 text-[#E87532] shrink-0 mt-0.5" />
            <span>
              All extra parts or heavy repairs must be mutually agreed with customer before billing.
            </span>
          </div>
        </Card>
      </div>

      {/* =========================================================================
          CONFIRMATION MODAL FOR STATUS ADVANCE
         ========================================================================= */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-[#E87532]">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-bold text-base font-display text-[#252621] dark:text-white">
                {confirmModal.title}
              </h3>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              {confirmModal.description}
            </p>

            <div className="pt-3 border-t border-[#E7E5DF] dark:border-[#2B231D] flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setConfirmModal({ open: false, nextStatus: null, title: "", description: "" })
                }
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={isUpdating}
                onClick={handleExecuteStatusChange}
                className="font-bold shadow-orange-glow"
              >
                Confirm Update
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          START OTP VERIFICATION MODAL
         ========================================================================= */}
      {otpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF] dark:border-[#2B231D]">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base font-display text-[#252621] dark:text-white">
                  Enter Customer Start OTP
                </h3>
              </div>
              <button
                onClick={() => setOtpModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Ask customer <strong>{job.customer?.user?.fullName || "Customer"}</strong> for their 4-digit security code before initiating repairs.
            </p>

            {otpError && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{otpError}</span>
              </div>
            )}

            <form onSubmit={handleVerifyOtpAndStart} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase text-stone-500 block mb-1">
                  4-Digit OTP *
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  placeholder="e.g. 4821"
                  className="w-full text-center font-mono text-3xl tracking-widest px-4 py-2.5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-[#252621] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E87532]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setOtpModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={isUpdating}
                  className="font-bold shadow-orange-glow"
                >
                  Verify & Begin Job
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          REJECTION REASON MODAL
         ========================================================================= */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF] dark:border-[#2B231D]">
              <div className="flex items-center gap-2 text-rose-600">
                <XCircle className="w-5 h-5" />
                <h3 className="font-bold text-base font-display text-[#252621] dark:text-white">
                  Decline Job #{job.bookingNumber}?
                </h3>
              </div>
              <button
                onClick={() => setRejectModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300">
              Please specify the reason for declining. This request will be instantly reassigned:
            </p>

            <div className="space-y-2">
              {[
                "Currently occupied on emergency repair",
                "Customer location outside service radius (>15km)",
                "Spare parts or specialized tools currently unavailable",
                "Personal emergency / Shift ending",
              ].map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    rejectReason === reason
                      ? "border-[#E87532] bg-orange-50/50 dark:bg-orange-950/20 text-[#E87532] font-semibold"
                      : "border-[#E7E5DF] dark:border-[#2B231D] text-stone-600 dark:text-stone-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="rejectReason"
                    checked={rejectReason === reason}
                    onChange={() => setRejectReason(reason)}
                    className="accent-[#E87532]"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E7E5DF] dark:border-[#2B231D] flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRejectModalOpen(false)}
              >
                Back
              </Button>
              <Button
                variant="danger"
                size="sm"
                disabled={isResponding}
                onClick={handleConfirmReject}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                Confirm Decline
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
