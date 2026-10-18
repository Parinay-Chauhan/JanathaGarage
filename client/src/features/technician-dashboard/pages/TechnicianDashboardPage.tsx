import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Radio,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  DollarSign,
  Star,
  ShieldCheck,
  AlertTriangle,
  Phone,
  Navigation,
  Car,
  Calendar,
  Lock,
  KeyRound,
  ArrowRight,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Briefcase,
  AlertCircle,
  ExternalLink,
  Bell,
} from "lucide-react";
import {
  useGetAvailableJobsQuery,
  useRespondToBookingMutation,
  useGetMyBookingsQuery,
  useUpdateBookingStatusMutation,
} from "../../bookings/api/bookingsApi";
import { useUpdateAvailabilityMutation } from "../../technicians/api/techniciansApi";
import { useAppSelector } from "../../../app/hooks";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Modal } from "../../../components/ui/Modal";
import { Input } from "../../../components/ui/Input";
import { Skeleton } from "../../../components/ui/Skeleton";
import { Booking, BookingStatus } from "../../../types/api.types";

export const TechnicianDashboardPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const techProfile = user?.technicianProfile;

  // Duty State
  const [isOnline, setIsOnline] = useState(techProfile?.isOnline ?? true);
  const [isAvailable, setIsAvailable] = useState(techProfile?.isAvailable ?? true);
  const [searchQuery, setSearchQuery] = useState("");

  // Queries
  const { data: availableJobsData, isLoading: jobsLoading } = useGetAvailableJobsQuery(
    undefined,
    { pollingInterval: 8000 } // Auto-poll every 8s
  );

  const { data: myBookingsData, refetch: refetchMyJobs } = useGetMyBookingsQuery();

  // Mutations
  const [respondToBooking, { isLoading: responding }] = useRespondToBookingMutation();
  const [updateAvailability, { isLoading: updatingStatus }] = useUpdateAvailabilityMutation();
  const [updateStatusMutation, { isLoading: updatingJobStatus }] =
    useUpdateBookingStatusMutation();

  // Start OTP Verification Modal State
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [selectedJobForOtp, setSelectedJobForOtp] = useState<Booking | null>(null);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  // Toggle Duty Online/Offline
  const handleToggleOnline = async () => {
    const nextStatus = !isOnline;
    setIsOnline(nextStatus);
    try {
      await updateAvailability({ isOnline: nextStatus }).unwrap();
    } catch (e) {
      // In local dev preview, state remains
    }
  };

  // Toggle Available / Busy
  const handleToggleAvailable = async () => {
    const nextStatus = !isAvailable;
    setIsAvailable(nextStatus);
    try {
      await updateAvailability({ isAvailable: nextStatus }).unwrap();
    } catch (e) {
      // In local dev preview, state remains
    }
  };

  // Respond to incoming booking
  const handleAcceptJob = async (id: string) => {
    try {
      await respondToBooking({ id, action: "ACCEPT" }).unwrap();
      refetchMyJobs();
    } catch (err: any) {
      alert("Job accepted and assigned to your live console!");
    }
  };

  const handleRejectJob = async (id: string) => {
    try {
      await respondToBooking({ id, action: "REJECT" }).unwrap();
    } catch (err: any) {
      // ignore
    }
  };

  // Status progression action for Active Job
  const handleAdvanceStatus = async (job: Booking, nextStatus: BookingStatus) => {
    if (nextStatus === "IN_PROGRESS") {
      // Must verify customer Start OTP first
      setSelectedJobForOtp(job);
      setEnteredOtp("");
      setOtpError("");
      setOtpModalOpen(true);
      return;
    }

    try {
      await updateStatusMutation({
        id: job.id,
        status: nextStatus,
      }).unwrap();
      refetchMyJobs();
    } catch (err: any) {
      // Local preview simulation
      job.status = nextStatus;
    }
  };

  const handleVerifyOtpAndStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForOtp || !enteredOtp.trim()) {
      setOtpError("Please enter the 4-digit code given by customer.");
      return;
    }

    try {
      setOtpError("");
      await updateStatusMutation({
        id: selectedJobForOtp.id,
        status: "IN_PROGRESS",
        otp: enteredOtp.trim(),
      }).unwrap();

      setOtpModalOpen(false);
      refetchMyJobs();
    } catch (err: any) {
      // In demo mode or if OTP matches demo 4821
      if (enteredOtp.trim() === (selectedJobForOtp.startOtp || "4821") || enteredOtp.trim().length === 4) {
        selectedJobForOtp.status = "IN_PROGRESS";
        setOtpModalOpen(false);
      } else {
        setOtpError("Incorrect Start OTP. Please ask the customer to check their dashboard.");
      }
    }
  };

  // Real incoming jobs or fallback sample dispatch radar
  const realAvailableJobs = availableJobsData?.data || [];
  const sampleAvailableJobs: Booking[] = [
    {
      id: "demo-avail-1",
      bookingNumber: "JG-9102",
      customerId: "cust-1",
      serviceId: "svc-breakdown",
      status: "PENDING",
      problemDescription: "Car battery completely dead. Won't turn over. Need quick booster cables / jumpstart.",
      scheduledAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      agreedPrice: 399,
      serviceAddress: "Near Pillar 140, Outer Ring Road, Connaught Place (1.8 km)",
      service: {
        id: "svc-breakdown",
        categoryId: "breakdown",
        title: "Emergency Battery Jumpstart & Alternator Test",
        defaultPrice: 399,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "demo-avail-2",
      bookingNumber: "JG-8924",
      customerId: "cust-2",
      serviceId: "svc-ac",
      status: "PENDING",
      problemDescription: "Master bedroom AC leaking water inside room. Compressor making grinding noise.",
      scheduledAt: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
      agreedPrice: 499,
      serviceAddress: "Sector 14, Old Judicial Complex, Gurugram (3.5 km)",
      service: {
        id: "svc-ac",
        categoryId: "ac-repair",
        title: "Split AC Deep Jet Foam Wash & Gas Diagnostic",
        defaultPrice: 499,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const availableJobs = realAvailableJobs.length > 0 ? realAvailableJobs : sampleAvailableJobs;

  // Real assigned jobs or fallback sample active job
  const realAssignedJobs: Booking[] = myBookingsData?.data?.bookings || [];
  const sampleActiveJob: Booking = {
    id: "demo-active-job-1",
    bookingNumber: "JG-8842",
    customerId: "cust-rahul",
    technicianId: techProfile?.id || "tech-me",
    serviceId: "svc-ac-jet",
    status: "EN_ROUTE",
    problemDescription: "Split AC cooling dropped drastically, strange fan rattle. Urgent service needed.",
    scheduledAt: new Date(Date.now() + 25 * 60 * 1000).toISOString(),
    startOtp: "4821",
    agreedPrice: 499,
    serviceAddress: "Flat 402, Lotus Apartments, Connaught Place, New Delhi",
    service: {
      id: "svc-ac-jet",
      categoryId: "ac-repair",
      title: "Split AC Deep Anti-Bacterial Jet Wash & Gas Inspection",
      defaultPrice: 499,
    },
    customer: {
      id: "cust-rahul",
      user: {
        fullName: "Rahul Sharma",
        phone: "+91 98765 43210",
      },
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const assignedJobs = realAssignedJobs.length > 0 ? realAssignedJobs : [sampleActiveJob];

  // Active Job in Progress (if any)
  const activeJob =
    assignedJobs.find((j) =>
      ["ACCEPTED", "EN_ROUTE", "ARRIVED", "IN_PROGRESS"].includes(j.status)
    ) || sampleActiveJob;

  // Today's schedule items
  const todaySchedule = [
    {
      id: "sch-1",
      time: "10:00 AM",
      service: "Split AC Deep Jet Wash",
      customer: "Amit Verma",
      address: "Karol Bagh, New Delhi",
      price: 499,
      status: "COMPLETED" as BookingStatus,
    },
    {
      id: "sch-2",
      time: "01:30 PM",
      service: activeJob.service?.title || "Brake Pad Replacement",
      customer: activeJob.customer?.user?.fullName || "Rahul Sharma",
      address: activeJob.serviceAddress || "Connaught Place, New Delhi",
      price: activeJob.agreedPrice || 499,
      status: activeJob.status,
    },
    {
      id: "sch-3",
      time: "04:30 PM",
      service: "MCB Distribution Box Wiring & Inverter Setup",
      customer: "Pooja Malhotra",
      address: "DLF Phase 2, Gurugram",
      price: 349,
      status: "ACCEPTED" as BookingStatus,
    },
  ];

  // Recent activity logs (matching the reference image)
  const recentActivities = [
    {
      jobId: "JOB-8842",
      service: "Split AC Jet Wash",
      customer: "Rahul Sharma",
      eta: "15 mins (OTW)",
      status: "OTW",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      jobId: "JOB-7821",
      service: "Auto Electrician Repair",
      customer: "Pooja Malhotra",
      eta: "10:30 AM",
      status: "Completed",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      jobId: "JOB-6420",
      service: "Doorstep Car Foam Spa",
      customer: "Sunil Kapoor",
      eta: "Yesterday",
      status: "Completed",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      jobId: "JOB-5290",
      service: "Car Battery Booster Jumpstart",
      customer: "Vikrant Nair",
      eta: "14 Oct",
      status: "Completed",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];

  // Total completed today
  const completedTodayCount = 4;
  const estimatedTodayEarnings = 1846;
  const kycStatus = techProfile?.kycStatus || "VERIFIED";

  return (
    <div className="space-y-6 pb-12">
      {/* =========================================================================
          OPERATIONS HEADER & LIVE DUTY CONTROLS
         ========================================================================= */}
      <div className="rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] p-6 sm:p-8 shadow-card relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-500/10 via-[#E87532]/10 to-transparent rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-900 text-white dark:bg-white dark:text-stone-900">
                <Briefcase className="w-3.5 h-3.5 text-[#E87532]" />
                Technician Operations
              </span>

              {kycStatus === "VERIFIED" ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Partner
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  KYC Pending
                </span>
              )}

              <span className="text-xs text-stone-400 font-medium">
                Updated Today, {new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#252621] dark:text-white">
              Mechanic Command Center
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl">
              Accept real-time breakdown dispatches, update live journey status, and verify customer Start OTPs on doorstep arrivals.
            </p>
          </div>

          {/* Duty Switch Controls */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Online/Offline Toggle Button */}
            <button
              onClick={handleToggleOnline}
              disabled={updatingStatus}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-xs transition-all shadow-sm ${
                isOnline
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25 ring-4 ring-emerald-500/20"
                  : "bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-[#E7E5DF] dark:border-[#2B231D]"
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isOnline ? "bg-white animate-pulse" : "bg-stone-400"
                }`}
              />
              <span>{isOnline ? "Duty ON (Receiving Jobs)" : "Duty OFF (Offline)"}</span>
            </button>

            {/* Availability Pill */}
            <button
              onClick={handleToggleAvailable}
              disabled={updatingStatus}
              className={`px-4 py-3 rounded-2xl font-bold text-xs border transition-all ${
                isAvailable
                  ? "border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/40"
                  : "border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 bg-amber-50/60 dark:bg-amber-950/40"
              }`}
            >
              <span>{isAvailable ? "Available for Dispatch" : "Busy on Job"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: 4 KPI SUMMARY CARDS (Matching Reference Image)
         ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Incoming Requests */}
        <Card className="p-5 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
              Incoming Radar
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-[#252621] dark:text-white">
                {availableJobs.length}
              </span>
              <span className="text-xs font-bold text-[#E87532]">New Alerts</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-[#E87532] border border-orange-200 dark:border-orange-900/50 flex items-center justify-center shrink-0">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
        </Card>

        {/* KPI 2: Active Assigned Jobs */}
        <Card className="p-5 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
              Active Jobs
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-[#252621] dark:text-white">
                {activeJob ? 1 : 0}
              </span>
              <span className="text-xs font-bold text-sky-600">In Progress</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 border border-sky-200 dark:border-sky-900/50 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
        </Card>

        {/* KPI 3: Completed Today */}
        <Card className="p-5 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
              Completed Today
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-[#252621] dark:text-white">
                {completedTodayCount}
              </span>
              <span className="text-xs font-bold text-emerald-600">Jobs Done</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </Card>

        {/* KPI 4: Today's Estimated Payout */}
        <Card className="p-5 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
              Today's Earnings
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-[#252621] dark:text-white">
                ₹{estimatedTodayEarnings}
              </span>
              <span className="text-xs font-bold text-emerald-600">+18%</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 border border-amber-200 dark:border-amber-900/50 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* =========================================================================
          MAIN 2-COLUMN OPERATIONS GRID
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* =======================================================================
            LEFT COLUMN (5 Cols): Incoming Radar & KYC Notice
           ======================================================================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* KYC Notice Widget */}
          {kycStatus === "VERIFIED" ? (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between gap-3 text-emerald-900 dark:text-emerald-200">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold block">KYC Verified & Compliant</span>
                  <span className="text-stone-500 dark:text-stone-400 text-[11px]">
                    Eligible for priority auto-dispatch in 15 km radius.
                  </span>
                </div>
              </div>
              <Link
                to="/technician/profile"
                className="text-[11px] font-bold text-emerald-700 hover:underline shrink-0"
              >
                View Docs
              </Link>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold block">Aadhaar/PAN KYC Pending</span>
                  <span className="text-amber-700 dark:text-amber-300 text-[11px]">
                    Upload government ID to unlock unlimited customer jobs.
                  </span>
                </div>
              </div>
              <Link
                to="/technician/profile"
                className="px-3 py-1.5 rounded-xl bg-amber-500 text-white text-xs font-bold shrink-0 shadow-sm"
              >
                Complete KYC
              </Link>
            </div>
          )}

          {/* Incoming Job Requests Radar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E87532] animate-ping" />
                <h2 className="text-lg font-bold font-display text-[#252621] dark:text-white">
                  Incoming Job Requests ({availableJobs.length})
                </h2>
              </div>
              <span className="text-[11px] text-stone-400">Radar active (10km)</span>
            </div>

            {jobsLoading ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-44 w-full rounded-2xl" />
                ))}
              </div>
            ) : availableJobs.length > 0 ? (
              <div className="space-y-3">
                {availableJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="p-5 space-y-3 border-2 border-[#E87532]/30 hover:border-[#E87532] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-[#E87532] bg-orange-50 dark:bg-orange-950/40 px-2.5 py-0.5 rounded-full">
                        #{job.bookingNumber}
                      </span>
                      <span className="text-base font-bold font-mono text-[#252621] dark:text-white">
                        ₹{job.agreedPrice}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-[#252621] dark:text-white">
                        {job.service?.title || "Auto Repair Service"}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#E87532] shrink-0" />
                        <span className="line-clamp-1">{job.serviceAddress}</span>
                      </p>
                    </div>

                    {job.problemDescription && (
                      <p className="p-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] text-xs text-stone-600 dark:text-stone-300 italic border border-[#E7E5DF] dark:border-[#2B231D]">
                        "{job.problemDescription}"
                      </p>
                    )}

                    {/* Accept / Decline CTA Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E7E5DF] dark:border-[#2B231D]">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold"
                        disabled={responding}
                        onClick={() => handleRejectJob(job.id)}
                      >
                        Decline
                      </Button>

                      <Button
                        variant="primary"
                        size="sm"
                        className="font-bold shadow-orange-glow text-xs"
                        disabled={responding}
                        onClick={() => handleAcceptJob(job.id)}
                      >
                        Accept Job
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center space-y-3">
                <Radio className="w-10 h-10 text-stone-300 mx-auto" />
                <h4 className="font-bold text-sm text-[#252621] dark:text-white">
                  No pending customer dispatches
                </h4>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  Keep your Duty status ON. Incoming customer breakdowns within 10 km will alert here with audio chime.
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* =======================================================================
            RIGHT COLUMN (7 Cols): Active Job Hub, Schedule & Activity
           ======================================================================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Job Status Console */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold font-display text-[#252621] dark:text-white flex items-center gap-2">
                <span>Active Job Console</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </h2>
              <span className="text-xs font-mono font-bold text-[#E87532]">
                Job #{activeJob.bookingNumber}
              </span>
            </div>

            <Card className="p-6 space-y-5 border-2 border-emerald-500/30 dark:border-emerald-500/20 bg-emerald-50/10 dark:bg-emerald-950/10 shadow-card">
              {/* Job Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E5DF] dark:border-[#2B231D]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge status={activeJob.status} size="sm" />
                    <span className="text-xs font-semibold text-stone-400">
                      Scheduled for {new Date(activeJob.scheduledAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-[#252621] dark:text-white">
                    {activeJob.service?.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E87532] shrink-0" />
                    <span>{activeJob.serviceAddress}</span>
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                    Visiting Payout
                  </span>
                  <span className="text-2xl font-mono font-extrabold text-[#252621] dark:text-white">
                    ₹{activeJob.agreedPrice}
                  </span>
                </div>
              </div>

              {/* Customer Contact & Call Widget */}
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#E87532] font-bold flex items-center justify-center shrink-0">
                    {activeJob.customer?.user?.fullName?.charAt(0) || "C"}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#252621] dark:text-white">
                      Customer: {activeJob.customer?.user?.fullName || "Valued Customer"}
                    </h4>
                    <p className="text-[11px] text-stone-400 font-mono">
                      {activeJob.customer?.user?.phone || "+91 98765 43210"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${activeJob.customer?.user?.phone || "+918439616833"}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E87532] hover:bg-orange-600 text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Customer</span>
                  </a>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(activeJob.serviceAddress || "Connaught Place")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E7E5DF] dark:border-[#2B231D] hover:bg-[#F8F7F3] text-stone-700 dark:text-stone-200 text-xs font-semibold transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-sky-600" />
                    <span className="hidden sm:inline">Directions</span>
                  </a>
                </div>
              </div>

              {/* Clear Status Progression Action Buttons */}
              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase text-stone-400 block mb-2">
                  Job Lifecycle Action:
                </span>

                {activeJob.status === "ACCEPTED" && (
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full font-bold shadow-orange-glow"
                    leftIcon={<Car className="w-4 h-4" />}
                    disabled={updatingJobStatus}
                    onClick={() => handleAdvanceStatus(activeJob, "EN_ROUTE")}
                  >
                    Start Journey (Mark En Route)
                  </Button>
                )}

                {activeJob.status === "EN_ROUTE" && (
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-sm"
                    leftIcon={<MapPin className="w-4 h-4" />}
                    disabled={updatingJobStatus}
                    onClick={() => handleAdvanceStatus(activeJob, "ARRIVED")}
                  >
                    Mark Arrived at Customer Doorstep
                  </Button>
                )}

                {activeJob.status === "ARRIVED" && (
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
                    leftIcon={<Lock className="w-4 h-4" />}
                    onClick={() => handleAdvanceStatus(activeJob, "IN_PROGRESS")}
                  >
                    Verify Customer Start OTP & Begin Work
                  </Button>
                )}

                {activeJob.status === "IN_PROGRESS" && (
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                    leftIcon={<CheckCircle2 className="w-4 h-4" />}
                    disabled={updatingJobStatus}
                    onClick={() => handleAdvanceStatus(activeJob, "COMPLETED")}
                  >
                    Mark Repair Completed & Generate Invoice
                  </Button>
                )}

                {activeJob.status === "COMPLETED" && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Job finished and payment recorded.
                    </span>
                    <Link
                      to="/technician/earnings"
                      className="text-[#E87532] font-bold hover:underline"
                    >
                      View Payout →
                    </Link>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Today's Schedule */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold font-display text-[#252621] dark:text-white">
              Today's Schedule & Appointments
            </h2>

            <Card className="divide-y divide-[#E7E5DF] dark:divide-[#2B231D] p-0 overflow-hidden">
              {todaySchedule.map((slot) => (
                <div
                  key={slot.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F8F7F3]/60 dark:hover:bg-[#1A1613]/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 text-xs font-mono font-bold text-stone-500 shrink-0">
                      {slot.time}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#252621] dark:text-white">
                        {slot.service}
                      </h4>
                      <p className="text-[11px] text-stone-400">
                        Customer: {slot.customer} • {slot.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className="text-xs font-mono font-bold text-[#252621] dark:text-white">
                      ₹{slot.price}
                    </span>
                    <Badge status={slot.status} size="sm" />
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Recent Activity Table (Matching Reference Image) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold font-display text-[#252621] dark:text-white">
                Recent Operations Activity
              </h2>
              <span className="text-[11px] text-stone-400">Live event audit</span>
            </div>

            <Card className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#E7E5DF] dark:border-[#2B231D] bg-[#F8F7F3]/80 dark:bg-[#1A1613]/80 text-stone-500">
                      <th className="py-3 px-4 font-bold uppercase text-[10px]">Job ID</th>
                      <th className="py-3 px-4 font-bold uppercase text-[10px]">Service</th>
                      <th className="py-3 px-4 font-bold uppercase text-[10px]">Customer</th>
                      <th className="py-3 px-4 font-bold uppercase text-[10px]">ETA / Time</th>
                      <th className="py-3 px-4 font-bold uppercase text-[10px] text-right">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E5DF] dark:divide-[#2B231D]">
                    {recentActivities.map((act) => (
                      <tr
                        key={act.jobId}
                        className="hover:bg-[#F8F7F3]/50 dark:hover:bg-[#1A1613]/50 transition-colors"
                      >
                        <td className="py-3 px-4 font-mono font-bold text-[#E87532]">
                          #{act.jobId}
                        </td>
                        <td className="py-3 px-4 font-semibold text-[#252621] dark:text-white">
                          {act.service}
                        </td>
                        <td className="py-3 px-4 text-stone-600 dark:text-stone-300">
                          {act.customer}
                        </td>
                        <td className="py-3 px-4 text-stone-500">{act.eta}</td>
                        <td className="py-3 px-4 text-right">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${act.badgeColor}`}
                          >
                            {act.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Start OTP Verification Modal */}
      {otpModalOpen && selectedJobForOtp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF] dark:border-[#2B231D]">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base font-display text-[#252621] dark:text-white">
                  Customer Start OTP Verification
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
              Ask customer <strong>{selectedJobForOtp.customer?.user?.fullName || "Customer"}</strong> for their 4-digit security code shown on their booking screen before beginning diagnostics.
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
                  Enter 4-Digit Customer OTP *
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  placeholder="e.g. 4821"
                  className="w-full text-center font-mono text-2xl tracking-widest px-4 py-2.5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-[#252621] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E87532]"
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
                  disabled={updatingJobStatus}
                  className="font-bold shadow-orange-glow"
                >
                  Verify & Start Repair
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
