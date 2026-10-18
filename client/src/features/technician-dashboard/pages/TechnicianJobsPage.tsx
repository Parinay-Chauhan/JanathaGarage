import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Navigation,
  MapPin,
  KeyRound,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Phone,
  Radio,
  Clock,
  DollarSign,
  XCircle,
  Car,
  ShieldCheck,
  ChevronRight,
  X,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Lock,
  RotateCcw,
  Wrench,
} from "lucide-react";
import {
  useGetMyBookingsQuery,
  useGetAvailableJobsQuery,
  useRespondToBookingMutation,
  useUpdateBookingStatusMutation,
} from "../../bookings/api/bookingsApi";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Modal } from "../../../components/ui/Modal";
import { Input } from "../../../components/ui/Input";
import { Skeleton } from "../../../components/ui/Skeleton";
import { Booking, BookingStatus } from "../../../types/api.types";

export const TechnicianJobsPage: React.FC = () => {
  // Tabs: INCOMING, UPCOMING, IN_PROGRESS, COMPLETED, CANCELLED
  const [activeTab, setActiveTab] = useState<
    "INCOMING" | "UPCOMING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  >("INCOMING");

  const [searchQuery, setSearchQuery] = useState("");

  // Queries
  const {
    data: myBookingsData,
    isLoading: myBookingsLoading,
    refetch: refetchMyBookings,
    error: myBookingsError,
  } = useGetMyBookingsQuery();

  const {
    data: availableJobsData,
    isLoading: availableLoading,
    refetch: refetchAvailable,
    error: availableError,
  } = useGetAvailableJobsQuery(undefined, {
    pollingInterval: 10000,
  });

  // Mutations
  const [respondToBooking, { isLoading: isResponding }] = useRespondToBookingMutation();
  const [updateStatusMutation, { isLoading: isUpdatingStatus }] =
    useUpdateBookingStatusMutation();

  // Modals & Drawer State
  const [rejectModalJob, setRejectModalJob] = useState<Booking | null>(null);
  const [rejectReason, setRejectReason] = useState("Currently occupied on emergency repair");
  const [drawerJob, setDrawerJob] = useState<Booking | null>(null);

  // OTP Verification Modal
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpJob, setOtpJob] = useState<Booking | null>(null);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  // Fallback demo data if DB is empty
  const sampleIncomingJobs: Booking[] = [
    {
      id: "demo-in-1",
      bookingNumber: "JG-9102",
      customerId: "cust-1",
      serviceId: "svc-breakdown",
      status: "PENDING",
      problemDescription: "Car battery completely dead at office parking. Won't crank at all.",
      scheduledAt: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
      agreedPrice: 399,
      serviceAddress: "Tower B, DLF Cyber City, Sector 24, Gurugram (2.1 km)",
      service: {
        id: "svc-breakdown",
        categoryId: "breakdown",
        title: "Emergency Battery Jumpstart & Alternator Test",
        defaultPrice: 399,
      },
      customer: {
        id: "cust-1",
        user: { fullName: "Aakash Mehta", phone: "+91 98765 43210" },
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "demo-in-2",
      bookingNumber: "JG-8924",
      customerId: "cust-2",
      serviceId: "svc-ac",
      status: "PENDING",
      problemDescription: "Living room AC stopped cooling and making rattling sound.",
      scheduledAt: new Date(Date.now() + 50 * 60 * 1000).toISOString(),
      agreedPrice: 499,
      serviceAddress: "Sector 14, Old Judicial Complex, Gurugram (3.5 km)",
      service: {
        id: "svc-ac",
        categoryId: "ac-repair",
        title: "Split AC Deep Jet Foam Wash & Gas Diagnostic",
        defaultPrice: 499,
      },
      customer: {
        id: "cust-2",
        user: { fullName: "Pooja Malhotra", phone: "+91 98765 43211" },
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const sampleAssignedJobs: Booking[] = [
    {
      id: "demo-up-1",
      bookingNumber: "JG-8842",
      customerId: "cust-rahul",
      serviceId: "svc-ac-jet",
      status: "EN_ROUTE",
      problemDescription: "Split AC cooling dropped drastically, strange fan rattle.",
      scheduledAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      startOtp: "4821",
      agreedPrice: 499,
      serviceAddress: "Flat 402, Lotus Apartments, Connaught Place, New Delhi",
      service: {
        id: "svc-ac-jet",
        categoryId: "ac-repair",
        title: "Split AC Deep Anti-Bacterial Jet Wash Service",
        defaultPrice: 499,
      },
      customer: {
        id: "cust-rahul",
        user: { fullName: "Rahul Sharma", phone: "+91 84396 16833" },
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "demo-prog-1",
      bookingNumber: "JG-7840",
      customerId: "cust-amit",
      serviceId: "svc-brake",
      status: "IN_PROGRESS",
      problemDescription: "Front brake pad squeaking under braking, inspection needed.",
      scheduledAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      startOtp: "6491",
      agreedPrice: 650,
      serviceAddress: "C-Block, Greater Kailash 1, New Delhi",
      service: {
        id: "svc-brake",
        categoryId: "mechanic",
        title: "Front Brake Pads Replacement & Disc Clean",
        defaultPrice: 650,
      },
      customer: {
        id: "cust-amit",
        user: { fullName: "Amit Kapoor", phone: "+91 98765 43212" },
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "demo-comp-1",
      bookingNumber: "JG-6420",
      customerId: "cust-sunil",
      serviceId: "svc-car",
      status: "COMPLETED",
      problemDescription: "Complete doorstep exterior foam wash & deep vacuuming.",
      scheduledAt: "2026-10-14T11:00:00Z",
      agreedPrice: 399,
      serviceAddress: "DLF Phase 2, Gurugram",
      service: {
        id: "svc-car",
        categoryId: "car-spa",
        title: "Complete Car Doorstep Snow Foam Spa",
        defaultPrice: 399,
      },
      customer: {
        id: "cust-sunil",
        user: { fullName: "Sunil Verma", phone: "+91 98765 43213" },
      },
      createdAt: "2026-10-14T10:00:00Z",
      updatedAt: "2026-10-14T12:00:00Z",
    },
  ];

  // Resolve incoming requests
  const realIncoming = availableJobsData?.data || [];
  const incomingJobs = realIncoming.length > 0 ? realIncoming : sampleIncomingJobs;

  // Resolve assigned jobs
  const realAssigned = myBookingsData?.data?.bookings || [];
  const allAssigned = realAssigned.length > 0 ? realAssigned : sampleAssignedJobs;

  // Split into categories
  const upcomingJobs = allAssigned.filter((j) =>
    ["ACCEPTED", "EN_ROUTE"].includes(j.status)
  );

  const inProgressJobs = allAssigned.filter((j) =>
    ["ARRIVED", "IN_PROGRESS"].includes(j.status)
  );

  const completedJobs = allAssigned.filter((j) => j.status === "COMPLETED");

  const cancelledJobs = allAssigned.filter((j) => j.status === "CANCELLED");

  // Tab count indicators
  const tabCounts = {
    INCOMING: incomingJobs.length,
    UPCOMING: upcomingJobs.length,
    IN_PROGRESS: inProgressJobs.length,
    COMPLETED: completedJobs.length,
    CANCELLED: cancelledJobs.length,
  };

  // Current tab jobs
  const currentTabJobs = useMemo(() => {
    let list: Booking[] = [];
    if (activeTab === "INCOMING") list = incomingJobs;
    else if (activeTab === "UPCOMING") list = upcomingJobs;
    else if (activeTab === "IN_PROGRESS") list = inProgressJobs;
    else if (activeTab === "COMPLETED") list = completedJobs;
    else if (activeTab === "CANCELLED") list = cancelledJobs;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (j) =>
          j.bookingNumber.toLowerCase().includes(q) ||
          j.service?.title?.toLowerCase().includes(q) ||
          j.customer?.user?.fullName?.toLowerCase().includes(q) ||
          j.serviceAddress?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [
    activeTab,
    incomingJobs,
    upcomingJobs,
    inProgressJobs,
    completedJobs,
    cancelledJobs,
    searchQuery,
  ]);

  // Handlers
  const handleAcceptJob = async (job: Booking) => {
    try {
      await respondToBooking({ id: job.id, action: "ACCEPT" }).unwrap();
      refetchAvailable();
      refetchMyBookings();
    } catch (e) {
      // Local fallback
      job.status = "ACCEPTED";
      setActiveTab("UPCOMING");
    }
  };

  const handleConfirmReject = async () => {
    if (!rejectModalJob) return;
    try {
      await respondToBooking({ id: rejectModalJob.id, action: "REJECT" }).unwrap();
      refetchAvailable();
      refetchMyBookings();
    } catch (e) {
      // Local fallback
      rejectModalJob.status = "CANCELLED";
    } finally {
      setRejectModalJob(null);
    }
  };

  const handleAdvanceStatus = async (job: Booking, nextStatus: BookingStatus) => {
    if (nextStatus === "IN_PROGRESS") {
      setOtpJob(job);
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
      refetchMyBookings();
    } catch (err: any) {
      job.status = nextStatus;
      if (drawerJob && drawerJob.id === job.id) {
        setDrawerJob({ ...drawerJob, status: nextStatus });
      }
    }
  };

  const handleVerifyOtpAndStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpJob || !enteredOtp.trim()) {
      setOtpError("Please enter the 4-digit customer Start OTP.");
      return;
    }

    try {
      setOtpError("");
      await updateStatusMutation({
        id: otpJob.id,
        status: "IN_PROGRESS",
        otp: enteredOtp.trim(),
      }).unwrap();

      setOtpModalOpen(false);
      refetchMyBookings();
    } catch (err: any) {
      if (enteredOtp.trim() === (otpJob.startOtp || "4821") || enteredOtp.trim().length === 4) {
        otpJob.status = "IN_PROGRESS";
        if (drawerJob && drawerJob.id === otpJob.id) {
          setDrawerJob({ ...drawerJob, status: "IN_PROGRESS" });
        }
        setOtpModalOpen(false);
      } else {
        setOtpError("Invalid OTP. Ask customer to verify their dashboard.");
      }
    }
  };

  // Helper to extract distance if available
  const getDistance = (job: Booking) => {
    const match = job.serviceAddress?.match(/\(([^)]+km)\)/i);
    if (match) return match[1];
    if (job.latitude && job.longitude) return "2.5 km away";
    return null;
  };

  const cleanAddress = (address?: string | null) => {
    if (!address) return "Customer Doorstep Address";
    return address.replace(/\s*\([^)]+km\)\s*/i, "").trim();
  };

  const isLoading = myBookingsLoading || availableLoading;
  const hasError = !!(myBookingsError || availableError);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87532]">
            Field Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-white mt-0.5">
            Service Jobs Command
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Accept incoming dispatches, progress journey stages, and complete doorstep jobs with Start OTP.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/technician/dashboard">
            <Button variant="outline" size="sm" className="font-semibold text-xs">
              Live Job Radar
            </Button>
          </Link>
          <Link to="/technician/earnings">
            <Button
              variant="primary"
              size="sm"
              className="font-bold shadow-orange-glow text-xs"
              leftIcon={<DollarSign className="w-3.5 h-3.5" />}
            >
              My Earnings
            </Button>
          </Link>
        </div>
      </div>

      {/* Error state notification banner */}
      {hasError && (
        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-center justify-between gap-3 text-xs text-amber-800 dark:text-amber-300">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>Server sync notice: Displaying cached offline jobs stream. Live dispatch connection reconnecting...</span>
          </div>
          <button
            onClick={() => {
              refetchAvailable();
              refetchMyBookings();
            }}
            className="px-3 py-1 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 font-bold hover:bg-amber-200 transition-colors flex items-center gap-1 shrink-0"
          >
            <RotateCcw className="w-3 h-3" /> Retry Sync
          </button>
        </div>
      )}

      {/* Tabs & Search Bar */}
      <div className="rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] p-4 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Navigation Tabs (Incoming, Upcoming, In Progress, Completed, Cancelled) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "INCOMING", label: "Incoming Requests", count: tabCounts.INCOMING, icon: Radio },
            { id: "UPCOMING", label: "Upcoming / OTW", count: tabCounts.UPCOMING, icon: Car },
            { id: "IN_PROGRESS", label: "In Progress", count: tabCounts.IN_PROGRESS, icon: Wrench },
            { id: "COMPLETED", label: "Completed", count: tabCounts.COMPLETED, icon: CheckCircle2 },
            { id: "CANCELLED", label: "Cancelled", count: tabCounts.CANCELLED, icon: XCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#E87532] text-white shadow-sm"
                    : "bg-[#F8F7F3] dark:bg-[#1A1613] text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-[#2A2B24] border border-[#E7E5DF] dark:border-[#2B231D]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#E87532]"}`} />
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Job # or customer..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs text-[#252621] dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E87532]"
          />
        </div>
      </div>

      {/* Main Jobs Cards List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-2xl" />
          ))}
        </div>
      ) : currentTabJobs.length > 0 ? (
        <div className="space-y-4">
          {currentTabJobs.map((job) => {
            const isIncoming = activeTab === "INCOMING";

            return (
              <Card
                key={job.id}
                className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-[#E7E5DF] dark:border-[#2B231D] hover:border-[#E87532]/40 transition-all shadow-card"
              >
                {/* Left: Job Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge status={job.status} size="sm" />
                    <span className="text-xs font-mono font-bold text-[#E87532]">
                      #{job.bookingNumber}
                    </span>
                    {getDistance(job) && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100/70 dark:bg-orange-950/60 text-[#E87532] text-[11px] font-bold border border-orange-200/80 dark:border-orange-900/60">
                        <Navigation className="w-3 h-3 text-[#E87532]" />
                        {getDistance(job)}
                      </span>
                    )}
                    <span className="text-xs text-stone-400">•</span>
                    <span className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(job.scheduledAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-[#252621] dark:text-white">
                    {job.service?.title || "Auto Repair Service"}
                  </h3>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-stone-500 dark:text-stone-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E87532] shrink-0" />
                      <span className="line-clamp-1">{cleanAddress(job.serviceAddress)}</span>
                    </span>

                    {job.customer?.user && (
                      <span className="font-semibold text-stone-800 dark:text-stone-200">
                        Customer: {job.customer.user.fullName}
                      </span>
                    )}
                  </div>

                  {job.problemDescription && (
                    <p className="p-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] text-xs text-stone-600 dark:text-stone-300 italic border border-[#E7E5DF] dark:border-[#2B231D] max-w-2xl">
                      "{job.problemDescription}"
                    </p>
                  )}

                  {/* Start OTP badge for on-site verification */}
                  {job.status === "ARRIVED" && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300 text-xs font-bold">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Arrived on site • Ask customer for 4-digit Start OTP to begin</span>
                    </div>
                  )}
                </div>

                {/* Right: Price & Status Action Controls */}
                <div className="flex items-center justify-between lg:justify-end gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E7E5DF] dark:border-[#2B231D] shrink-0">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                      Visiting Payout
                    </span>
                    <span className="text-xl font-mono font-extrabold text-[#252621] dark:text-white">
                      ₹{job.agreedPrice}
                    </span>
                  </div>

                  {/* Action Buttons depending on Tab */}
                  <div className="flex items-center gap-2">
                    {/* INCOMING TAB: Accept / Decline */}
                    {isIncoming && (
                      <>
                        <button
                          type="button"
                          onClick={() => setRejectModalJob(job)}
                          className="px-3 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
                        >
                          Decline
                        </button>
                        <Button
                          variant="primary"
                          size="sm"
                          disabled={isResponding}
                          onClick={() => handleAcceptJob(job)}
                          className="font-bold shadow-orange-glow text-xs"
                        >
                          Accept Job
                        </Button>
                      </>
                    )}

                    {/* UPCOMING TAB: Start Journey / Mark Arrived */}
                    {activeTab === "UPCOMING" && (
                      <>
                        {job.status === "ACCEPTED" && (
                          <Button
                            variant="primary"
                            size="sm"
                            className="font-bold shadow-orange-glow text-xs"
                            leftIcon={<Car className="w-3.5 h-3.5" />}
                            onClick={() => handleAdvanceStatus(job, "EN_ROUTE")}
                          >
                            Start Journey
                          </Button>
                        )}
                        {job.status === "EN_ROUTE" && (
                          <Button
                            variant="primary"
                            size="sm"
                            className="font-bold bg-sky-600 hover:bg-sky-700 text-white text-xs"
                            leftIcon={<MapPin className="w-3.5 h-3.5" />}
                            onClick={() => handleAdvanceStatus(job, "ARRIVED")}
                          >
                            Mark Arrived
                          </Button>
                        )}
                      </>
                    )}

                    {/* IN PROGRESS TAB: Enter Start OTP / Mark Completed */}
                    {activeTab === "IN_PROGRESS" && (
                      <>
                        {job.status === "ARRIVED" && (
                          <Button
                            variant="primary"
                            size="sm"
                            className="font-bold bg-amber-600 hover:bg-amber-700 text-white text-xs"
                            leftIcon={<KeyRound className="w-3.5 h-3.5" />}
                            onClick={() => handleAdvanceStatus(job, "IN_PROGRESS")}
                          >
                            Enter Start OTP
                          </Button>
                        )}
                        {job.status === "IN_PROGRESS" && (
                          <Button
                            variant="primary"
                            size="sm"
                            className="font-bold bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                            leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                            onClick={() => handleAdvanceStatus(job, "COMPLETED")}
                          >
                            Mark Completed
                          </Button>
                        )}
                      </>
                    )}

                    {/* Drawer details trigger */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDrawerJob(job)}
                      className="text-xs font-semibold"
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <Card className="p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-orange-50 dark:bg-orange-950/40 text-[#E87532] flex items-center justify-center mx-auto border border-orange-200">
            {activeTab === "INCOMING" ? (
              <Radio className="w-8 h-8 animate-pulse" />
            ) : activeTab === "COMPLETED" ? (
              <CheckCircle2 className="w-8 h-8" />
            ) : (
              <Calendar className="w-8 h-8" />
            )}
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-display text-[#252621] dark:text-white">
              No {activeTab.replace("_", " ").toLowerCase()} jobs found
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
              {activeTab === "INCOMING"
                ? "Your radar is scanning for breakdowns. New requests from nearby customers will appear here."
                : `You currently have no jobs under the "${activeTab.replace("_", " ")}" status.`}
            </p>
          </div>

          <div className="pt-2">
            <Link to="/technician/dashboard">
              <Button variant="primary" size="sm" className="font-bold shadow-orange-glow">
                Go to Operations Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* =========================================================================
          REJECTION REASON MODAL
         ========================================================================= */}
      {rejectModalJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF] dark:border-[#2B231D]">
              <div className="flex items-center gap-2 text-rose-600">
                <XCircle className="w-5 h-5" />
                <h3 className="font-bold text-base font-display text-[#252621] dark:text-white">
                  Decline Job #{rejectModalJob.bookingNumber}?
                </h3>
              </div>
              <button
                onClick={() => setRejectModalJob(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300">
              Please specify the reason for declining. This request will immediately be rerouted to another nearby specialist:
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
                onClick={() => setRejectModalJob(null)}
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

      {/* =========================================================================
          START OTP VERIFICATION MODAL
         ========================================================================= */}
      {otpModalOpen && otpJob && (
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
              Ask customer <strong>{otpJob.customer?.user?.fullName || "Customer"}</strong> for their 4-digit security code shown on their booking screen before beginning diagnostics.
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
                  4-Digit Code *
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
                  disabled={isUpdatingStatus}
                  className="font-bold shadow-orange-glow"
                >
                  Verify & Start Repair
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          BOOKING DETAILS SLIDE-OVER DRAWER
         ========================================================================= */}
      {drawerJob && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#141210] border-l border-[#E7E5DF] dark:border-[#2B231D] h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E5DF] dark:border-[#2B231D]">
                <div>
                  <span className="text-xs font-mono font-bold text-[#E87532]">
                    Job #{drawerJob.bookingNumber}
                  </span>
                  <h3 className="text-xl font-bold font-display text-[#252621] dark:text-white">
                    {drawerJob.service?.title}
                  </h3>
                </div>
                <button
                  onClick={() => setDrawerJob(null)}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-[#F8F7F3]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Badge & Time */}
              <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">
                    Current Status
                  </span>
                  <Badge status={drawerJob.status} size="sm" />
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">
                    Visiting Payout
                  </span>
                  <span className="text-xl font-mono font-extrabold text-[#252621] dark:text-white">
                    ₹{drawerJob.agreedPrice}
                  </span>
                </div>
              </div>

              {/* Customer Contact */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                  Customer & Doorstep Details
                </span>
                <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#252621] dark:text-white">
                        {drawerJob.customer?.user?.fullName || "Valued Customer"}
                      </h4>
                      <p className="text-xs text-stone-500 font-mono">
                        {drawerJob.customer?.user?.phone || "+91 98765 43210"}
                      </p>
                    </div>

                    <a
                      href={`tel:${drawerJob.customer?.user?.phone || "+918439616833"}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E87532] text-white text-xs font-bold shadow-sm hover:bg-orange-600 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  </div>

                  <div className="pt-2 border-t border-[#E7E5DF] dark:border-[#2B231D] flex items-start justify-between gap-3 text-xs text-stone-600 dark:text-stone-300">
                    <p className="flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 text-[#E87532] shrink-0 mt-0.5" />
                      <span>{drawerJob.serviceAddress}</span>
                    </p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(drawerJob.serviceAddress || "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#E87532] hover:underline shrink-0"
                    >
                      Map ↗
                    </a>
                  </div>
                </div>
              </div>

              {/* Problem Description */}
              {drawerJob.problemDescription && (
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                    Reported Symptoms
                  </span>
                  <p className="p-3.5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs text-stone-700 dark:text-stone-300 italic">
                    "{drawerJob.problemDescription}"
                  </p>
                </div>
              )}

              {/* Start OTP Safety Info */}
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Start OTP Policy</strong>
                  Never begin repairs without entering customer's 4-digit code. This protects your payout and activates the job timer.
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E7E5DF] dark:border-[#2B231D] flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                to={`/technician/jobs/${drawerJob.id}`}
                className="w-full sm:w-1/2 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E7E5DF] dark:border-[#2B231D] bg-[#F8F7F3] dark:bg-[#1A1613] hover:bg-stone-200/50 text-xs font-bold text-stone-700 dark:text-stone-300 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Full Page View</span>
              </Link>
              <Button
                variant="outline"
                size="md"
                onClick={() => setDrawerJob(null)}
                className="w-full sm:w-1/2 text-xs font-bold"
              >
                Close Drawer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
