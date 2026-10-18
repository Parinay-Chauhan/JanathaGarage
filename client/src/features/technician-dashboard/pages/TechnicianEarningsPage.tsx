import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  DollarSign,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  CreditCard,
  Building,
  Receipt,
  Search,
  Clock,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useGetMyBookingsQuery } from "../../bookings/api/bookingsApi";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { Skeleton } from "../../../components/ui/Skeleton";
import { Booking } from "../../../types/api.types";

export const TechnicianEarningsPage: React.FC = () => {
  const { data, isLoading } = useGetMyBookingsQuery();

  // Date Filter State
  const [dateFilter, setDateFilter] = useState<"ALL" | "MONTH" | "WEEK" | "TODAY">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Realistic sample completed jobs for empty DB or fallback
  const sampleCompletedJobs: Booking[] = [
    {
      id: "demo-comp-1",
      bookingNumber: "JG-8421",
      customerId: "cust-1",
      serviceId: "svc-brake",
      status: "COMPLETED",
      problemDescription: "Front disc brake pads worn out. Replaced pads & bled lines.",
      scheduledAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      agreedPrice: 750,
      serviceAddress: "Tower 4, DLF Phase 5, Gurugram",
      service: {
        id: "svc-brake",
        categoryId: "mechanic",
        title: "Front Brake Pads Replacement & Disc Clean",
        defaultPrice: 750,
      },
      customer: {
        id: "cust-1",
        user: { fullName: "Aman Singhania", phone: "+91 98765 43210" },
      },
      payment: {
        id: "pay-1",
        bookingId: "demo-comp-1",
        amount: 750,
        method: "UPI",
        status: "COMPLETED",
        transactionId: "UPI/261017482910",
        createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    },
    {
      id: "demo-comp-2",
      bookingNumber: "JG-8119",
      customerId: "cust-2",
      serviceId: "svc-ac",
      status: "COMPLETED",
      problemDescription: "Split AC deep anti-bacterial jet foam wash.",
      scheduledAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
      agreedPrice: 499,
      serviceAddress: "Sector 29 Market, Gurugram",
      service: {
        id: "svc-ac",
        categoryId: "ac-repair",
        title: "Split AC Deep Anti-Bacterial Jet Wash",
        defaultPrice: 499,
      },
      customer: {
        id: "cust-2",
        user: { fullName: "Priya Menon", phone: "+91 98765 43211" },
      },
      payment: {
        id: "pay-2",
        bookingId: "demo-comp-2",
        amount: 499,
        method: "CASH",
        status: "COMPLETED",
        transactionId: "CASH/REC-4819",
        createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    },
    {
      id: "demo-comp-3",
      bookingNumber: "JG-7904",
      customerId: "cust-3",
      serviceId: "svc-battery",
      status: "COMPLETED",
      problemDescription: "Emergency battery jumpstart at highway toll plaza.",
      scheduledAt: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
      agreedPrice: 399,
      serviceAddress: "Kherki Daula Toll, NH-48, Gurugram",
      service: {
        id: "svc-battery",
        categoryId: "breakdown",
        title: "Emergency Battery Jumpstart & Diagnostic",
        defaultPrice: 399,
      },
      customer: {
        id: "cust-3",
        user: { fullName: "Vikram Rastogi", phone: "+91 98765 43212" },
      },
      payment: {
        id: "pay-3",
        bookingId: "demo-comp-3",
        amount: 399,
        method: "UPI",
        status: "COMPLETED",
        transactionId: "UPI/261011993421",
        createdAt: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
    },
    {
      id: "demo-comp-4",
      bookingNumber: "JG-7640",
      customerId: "cust-4",
      serviceId: "svc-spa",
      status: "COMPLETED",
      problemDescription: "Doorstep high-pressure foam wash and interior sanitization.",
      scheduledAt: new Date(Date.now() - 12 * 24 * 3600 * 1000).toISOString(),
      agreedPrice: 599,
      serviceAddress: "South City 1, Gurugram",
      service: {
        id: "svc-spa",
        categoryId: "car-spa",
        title: "Complete Car Doorstep Snow Foam Spa",
        defaultPrice: 599,
      },
      customer: {
        id: "cust-4",
        user: { fullName: "Karan Johar", phone: "+91 98765 43213" },
      },
      payment: {
        id: "pay-4",
        bookingId: "demo-comp-4",
        amount: 599,
        method: "UPI",
        status: "COMPLETED",
        transactionId: "UPI/261005882319",
        createdAt: new Date(Date.now() - 12 * 24 * 3600 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 13 * 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 12 * 24 * 3600 * 1000).toISOString(),
    },
  ];

  // Resolve completed jobs
  const realBookings: Booking[] = data?.data?.bookings || [];
  const realCompleted = realBookings.filter((b) => b.status === "COMPLETED");
  const allCompleted = realCompleted.length > 0 ? realCompleted : sampleCompletedJobs;

  // Filter jobs by date & search query
  const filteredJobs = useMemo(() => {
    const now = new Date().getTime();
    return allCompleted.filter((job) => {
      const jobTime = new Date(job.updatedAt || job.scheduledAt).getTime();
      const diffDays = (now - jobTime) / (1000 * 3600 * 24);

      if (dateFilter === "TODAY" && diffDays > 1) return false;
      if (dateFilter === "WEEK" && diffDays > 7) return false;
      if (dateFilter === "MONTH" && diffDays > 30) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          job.bookingNumber.toLowerCase().includes(q) ||
          job.service?.title?.toLowerCase().includes(q) ||
          job.customer?.user?.fullName?.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [allCompleted, dateFilter, searchQuery]);

  // Financial aggregates
  const totalGrossEarnings = filteredJobs.reduce(
    (acc, job) => acc + (Number(job.agreedPrice) || 0),
    0
  );
  const totalCompletedCount = filteredJobs.length;
  const avgOrderValue =
    totalCompletedCount > 0 ? Math.round(totalGrossEarnings / totalCompletedCount) : 0;

  // Payout bank settlements history
  const payoutHistory = [
    {
      id: "SETTLE-2026-W41",
      period: "06 Oct - 12 Oct 2026",
      amount: 4250,
      bank: "HDFC Bank •••• 4812",
      utr: "UTR-HDFC8849201948",
      status: "SETTLED",
      date: "13 Oct 2026",
    },
    {
      id: "SETTLE-2026-W40",
      period: "29 Sep - 05 Oct 2026",
      amount: 5800,
      bank: "HDFC Bank •••• 4812",
      utr: "UTR-HDFC7729103982",
      status: "SETTLED",
      date: "06 Oct 2026",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87532]">
            Finance & Ledger
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-white mt-0.5">
            Technician Earnings & Payouts
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Track doorstep earnings, customer settlements, and direct bank payout schedules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/technician/jobs">
            <Button variant="outline" size="sm" className="font-semibold text-xs">
              View All Jobs
            </Button>
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E7E5DF] dark:border-[#2B231D] bg-white dark:bg-[#141210] text-xs font-bold hover:bg-[#F8F7F3] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Statement</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-5 border-[#E7E5DF] dark:border-[#2B231D] space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Gross Earnings</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-mono text-[#252621] dark:text-white">
            ₹{totalGrossEarnings.toLocaleString("en-IN")}
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold block">
            100% Guaranteed Payout
          </span>
        </Card>

        <Card className="p-5 border-[#E7E5DF] dark:border-[#2B231D] space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Completed Jobs</span>
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-[#E87532] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-mono text-[#252621] dark:text-white">
            {totalCompletedCount}
          </p>
          <span className="text-[10px] text-stone-400 block">Verified with Start OTP</span>
        </Card>

        <Card className="p-5 border-[#E7E5DF] dark:border-[#2B231D] space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Avg Ticket Size</span>
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-mono text-[#252621] dark:text-white">
            ₹{avgOrderValue}
          </p>
          <span className="text-[10px] text-stone-400 block">Per completed service</span>
        </Card>

        <Card className="p-5 border-[#E7E5DF] dark:border-[#2B231D] space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Payout Cycle</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-bold text-[#252621] dark:text-white mt-1">
            Every Monday
          </p>
          <span className="text-[10px] text-emerald-600 font-bold block">
            Direct IMPS / NEFT
          </span>
        </Card>
      </div>

      {/* Registered Payout Bank Card */}
      <Card className="p-5 border-[#E7E5DF] dark:border-[#2B231D] bg-[#F8F7F3] dark:bg-[#1A1613] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] text-[#E87532] flex items-center justify-center shrink-0 shadow-sm">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-[#252621] dark:text-white">
                Primary Settlement Account: HDFC Bank
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                Verified
              </span>
            </div>
            <p className="text-xs text-stone-500 font-mono mt-0.5">
              A/C No: ••••••••4812 · IFSC: HDFC0001234 · Vikramjit Singh
            </p>
          </div>
        </div>

        <Link to="/technician/profile">
          <Button variant="outline" size="sm" className="text-xs font-semibold shrink-0">
            Manage Bank Details
          </Button>
        </Link>
      </Card>

      {/* Date Filter & Search Controls */}
      <div className="rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Date Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "ALL", label: "All Time" },
            { id: "MONTH", label: "This Month" },
            { id: "WEEK", label: "Last 7 Days" },
            { id: "TODAY", label: "Today" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDateFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                dateFilter === tab.id
                  ? "bg-[#E87532] text-white shadow-sm"
                  : "bg-[#F8F7F3] dark:bg-[#1A1613] text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-[#2A2B24] border border-[#E7E5DF] dark:border-[#2B231D]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search booking # or customer..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs text-[#252621] dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E87532]"
          />
        </div>
      </div>

      {/* Individual Booking Records Ledger */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base font-display text-[#252621] dark:text-white">
            Completed Job Receipts ({filteredJobs.length})
          </h3>
          <span className="text-xs text-stone-400">
            Showing net credited amounts per service
          </span>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-2xl" />
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="space-y-3">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-[#E7E5DF] dark:border-[#2B231D] hover:border-[#E87532]/40 transition-all shadow-sm"
              >
                {/* Left: Job details */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#E87532]">
                      #{job.bookingNumber}
                    </span>
                    <span className="text-xs text-stone-400">•</span>
                    <span className="text-xs text-stone-500 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(job.updatedAt || job.scheduledAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                    <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      PAID ({job.payment?.method || "CASH"})
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-[#252621] dark:text-white">
                    {job.service?.title || "Doorstep Service"}
                  </h4>

                  <div className="flex flex-wrap items-center gap-x-4 text-xs text-stone-500">
                    <span>Customer: {job.customer?.user?.fullName || "Valued Customer"}</span>
                    {job.payment?.transactionId && (
                      <span className="font-mono text-[11px] text-stone-400">
                        Ref: {job.payment.transactionId}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Amount & Details CTA */}
                <div className="flex items-center justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E7E5DF] dark:border-[#2B231D]">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">
                      Net Credited
                    </span>
                    <span className="text-xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                      +₹{job.agreedPrice}
                    </span>
                  </div>

                  <Link to={`/technician/jobs/${job.id}`}>
                    <Button variant="outline" size="sm" className="text-xs font-semibold">
                      Details
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-10 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-stone-300 mx-auto" />
            <h4 className="font-bold text-sm text-[#252621] dark:text-white">
              No completed jobs in this timeframe
            </h4>
            <p className="text-xs text-stone-400">
              Completed bookings and earnings will appear here once verified via Start OTP.
            </p>
          </Card>
        )}
      </div>

      {/* Past Bank Settlements / Payout History */}
      <Card className="p-6 border-[#E7E5DF] dark:border-[#2B231D] space-y-4 shadow-card">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF] dark:border-[#2B231D]">
          <div>
            <h3 className="font-bold text-base font-display text-[#252621] dark:text-white">
              Direct Bank Settlement History
            </h3>
            <p className="text-xs text-stone-500">
              Weekly automatic bank transfers initiated by JantaGaraj payouts.
            </p>
          </div>

          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Automated Payouts Active</span>
          </span>
        </div>

        <div className="space-y-3">
          {payoutHistory.map((payout) => (
            <div
              key={payout.id}
              className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#252621] dark:text-white">
                    {payout.period}
                  </span>
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {payout.status}
                  </span>
                </div>
                <p className="text-stone-500 font-mono text-[11px]">
                  {payout.utr} · Deposited on {payout.date} to {payout.bank}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-lg font-mono font-extrabold text-[#252621] dark:text-white">
                  ₹{payout.amount.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-stone-400 block">IMPS Transfer</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
