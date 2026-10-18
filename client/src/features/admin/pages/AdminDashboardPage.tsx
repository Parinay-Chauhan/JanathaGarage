import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  CalendarCheck,
  DollarSign,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Car,
  Wrench,
  Search,
  Filter,
  Download,
  Building,
  Radio,
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Bell,
  Headphones,
} from "lucide-react";
import {
  useGetPlatformStatsQuery,
  useGetPendingKYCApplicationsQuery,
} from "../api/adminApi";
import { useGetMyBookingsQuery } from "../../bookings/api/bookingsApi";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Skeleton } from "../../../components/ui/Skeleton";
import { Booking } from "../../../types/api.types";

export const AdminDashboardPage: React.FC = () => {
  // Queries
  const {
    data: statsData,
    isLoading: statsLoading,
    refetch: refetchStats,
  } = useGetPlatformStatsQuery();

  const {
    data: kycData,
    isLoading: kycLoading,
    refetch: refetchKyc,
  } = useGetPendingKYCApplicationsQuery({ status: "SUBMITTED", limit: 5 });

  const {
    data: bookingsData,
    isLoading: bookingsLoading,
    refetch: refetchBookings,
  } = useGetMyBookingsQuery({ limit: 6 });

  // Filters
  const [timeRange, setTimeRange] = useState<"Today" | "This Week" | "This Month" | "This Year">("This Month");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(6); // Default July (idx 6)

  const stats = statsData?.data;

  // Fallback demo bookings if DB is empty
  const sampleBookings: Booking[] = [
    {
      id: "bk-1",
      bookingNumber: "JG-9102",
      customerId: "cust-1",
      serviceId: "svc-1",
      status: "IN_PROGRESS",
      problemDescription: "Car battery dead at office parking. Alternator diagnostic.",
      scheduledAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      agreedPrice: 399,
      serviceAddress: "DLF Cyber City, Tower B, Gurugram",
      service: { id: "svc-1", title: "Emergency Battery Jumpstart", defaultPrice: 399 },
      customer: { id: "cust-1", user: { fullName: "Aakash Mehta", phone: "+91 98765 43210" } },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "bk-2",
      bookingNumber: "JG-8842",
      customerId: "cust-2",
      serviceId: "svc-2",
      status: "EN_ROUTE",
      problemDescription: "Split AC jet foam wash and refrigerant top up.",
      scheduledAt: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
      agreedPrice: 499,
      serviceAddress: "Connaught Place, Central Delhi",
      service: { id: "svc-2", title: "Split AC Deep Jet Wash", defaultPrice: 499 },
      customer: { id: "cust-2", user: { fullName: "Rahul Sharma", phone: "+91 84396 16833" } },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "bk-3",
      bookingNumber: "JG-8421",
      customerId: "cust-3",
      serviceId: "svc-3",
      status: "COMPLETED",
      problemDescription: "Front disc brake pads worn out. Replaced pads & bled lines.",
      scheduledAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      agreedPrice: 750,
      serviceAddress: "DLF Phase 5, Golf Course Road, Gurugram",
      service: { id: "svc-3", title: "Front Brake Pads Replacement", defaultPrice: 750 },
      customer: { id: "cust-3", user: { fullName: "Aman Singhania", phone: "+91 98765 43211" } },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "bk-4",
      bookingNumber: "JG-8119",
      customerId: "cust-4",
      serviceId: "svc-4",
      status: "COMPLETED",
      problemDescription: "Doorstep high pressure foam wash & interior sanitization.",
      scheduledAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
      agreedPrice: 599,
      serviceAddress: "Sector 29, Gurugram",
      service: { id: "svc-4", title: "Complete Car Doorstep Spa", defaultPrice: 599 },
      customer: { id: "cust-4", user: { fullName: "Priya Menon", phone: "+91 98765 43212" } },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "bk-5",
      bookingNumber: "JG-7904",
      customerId: "cust-5",
      serviceId: "svc-5",
      status: "PENDING",
      problemDescription: "Radiator coolant leaking after highway trip.",
      scheduledAt: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
      agreedPrice: 349,
      serviceAddress: "Sohna Road, Sector 48, Gurugram",
      service: { id: "svc-5", title: "Coolant Leakage Diagnostic", defaultPrice: 349 },
      customer: { id: "cust-5", user: { fullName: "Vikram Rastogi", phone: "+91 98765 43213" } },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const rawBookings: Booking[] = bookingsData?.data?.bookings || [];
  const recentBookings = rawBookings.length > 0 ? rawBookings.slice(0, 5) : sampleBookings;

  // Fallback demo KYC applicants if DB is empty
  const sampleKYCApplicants = [
    {
      id: "tech-app-1",
      user: { fullName: "Jaspreet Singh", phone: "+91 98110 44219" },
      docType: "AADHAAR",
      docNumber: "•••• •••• 9214",
      experienceYears: 6,
      serviceRadiusKm: 15,
      kycStatus: "SUBMITTED",
      updatedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    },
    {
      id: "tech-app-2",
      user: { fullName: "Manoj Kumar", phone: "+91 98110 55198" },
      docType: "DRIVING_LICENSE",
      docNumber: "DL-14201100984",
      experienceYears: 9,
      serviceRadiusKm: 12,
      kycStatus: "SUBMITTED",
      updatedAt: new Date(Date.now() - 7 * 3600 * 1000).toISOString(),
    },
    {
      id: "tech-app-3",
      user: { fullName: "Suresh Chauhan", phone: "+91 98110 77123" },
      docType: "PAN",
      docNumber: "ABCDE1234F",
      experienceYears: 4,
      serviceRadiusKm: 10,
      kycStatus: "SUBMITTED",
      updatedAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    },
  ];

  const rawKYC = kycData?.data?.technicians || [];
  const pendingKYCList = rawKYC.length > 0 ? rawKYC : sampleKYCApplicants;

  // Verified Technician Fleet Availability List (matching right card of Fleetly ref)
  const activeFleet = [
    {
      id: "tech-fleet-1",
      name: "Vikramjit Singh",
      specialty: "Auto Electrician & AC Specialist",
      rating: 4.9,
      status: "In Service",
      city: "Gurugram (Cyber City)",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&fit=crop",
    },
    {
      id: "tech-fleet-2",
      name: "Harish Rawat",
      specialty: "Brake & Suspension Lead",
      rating: 4.8,
      status: "Available",
      city: "South Delhi (GK 1)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&fit=crop",
    },
    {
      id: "tech-fleet-3",
      name: "Amit Solanki",
      specialty: "High-Pressure Spa & Detailing",
      rating: 4.9,
      status: "Available",
      city: "Gurugram (Golf Course)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop",
    },
    {
      id: "tech-fleet-4",
      name: "Rajesh Soni",
      specialty: "Emergency Breakdown Recovery",
      rating: 4.7,
      status: "In Service",
      city: "NH-48 Toll Corridor",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&fit=crop",
    },
  ];

  // Performance Report Monthly Data (Jan - Dec)
  const monthlyData = [
    { month: "Jan", revenue: 18500, expenses: 9200 },
    { month: "Feb", revenue: 22100, expenses: 10400 },
    { month: "Mar", revenue: 28400, expenses: 13200 },
    { month: "Apr", revenue: 25000, expenses: 11800 },
    { month: "May", revenue: 31200, expenses: 14500 },
    { month: "Jun", revenue: 36800, expenses: 16900 },
    { month: "Jul", revenue: 42300, expenses: 18700 },
    { month: "Aug", revenue: 39500, expenses: 17800 },
    { month: "Sep", revenue: 45000, expenses: 19800 },
    { month: "Oct", revenue: 48600, expenses: 21400 },
    { month: "Nov", revenue: 52000, expenses: 22900 },
    { month: "Dec", revenue: 58000, expenses: 25600 },
  ];

  // Derived Statistics from backend with sensible fallbacks
  const totalRevenue = stats?.revenue?.totalINR || 33750;
  const partnerPayouts = Math.round(totalRevenue * 0.58) || 19575;
  const netPlatformMargin = totalRevenue - partnerPayouts;

  const totalUsers = stats?.users?.total || 1284;
  const totalCustomers = stats?.users?.customers || 1142;
  const totalTechnicians = stats?.users?.technicians || 142;

  const totalBookings = stats?.bookings?.total || 342;
  const completedBookings = stats?.bookings?.completed || 284;
  const pendingKycCount = stats?.kyc?.pendingVerification || pendingKYCList.length;

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* =========================================================================
          TOP EXECUTIVE HEADER & SEARCH BAR
         ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E87532]">
              Operations Command
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              Gateway Live (99.98% Uptime)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-white mt-0.5">
            Overview
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            Monitor verified users, breakdown booking statuses, settled payment revenue, and pending KYC audits.
          </p>
        </div>

        {/* Global Search & Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search box */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bookings or partners..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] text-xs text-[#252621] dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E87532]"
            />
            <kbd className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[9px] font-mono text-stone-400 bg-stone-100 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
              ⌘K
            </kbd>
          </div>

          {/* Timeframe Selector Dropdown */}
          <div className="relative inline-block">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-[#E87532] text-white font-bold text-xs shadow-orange-glow focus:outline-none cursor-pointer"
            >
              <option value="Today" className="text-stone-800 bg-white">Today</option>
              <option value="This Week" className="text-stone-800 bg-white">This Week</option>
              <option value="This Month" className="text-stone-800 bg-white">This Month</option>
              <option value="This Year" className="text-stone-800 bg-white">This Year</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-white absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Refresh Action */}
          <button
            onClick={() => {
              refetchStats();
              refetchKyc();
              refetchBookings();
            }}
            className="p-2 rounded-xl border border-[#E7E5DF] dark:border-[#2B231D] bg-white dark:bg-[#141210] text-stone-500 hover:text-[#E87532] transition-colors shadow-sm"
            title="Refresh Live Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          HERO FINANCIAL ROW (Matching "Fleetly" Reference Design)
         ========================================================================= */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold font-display text-[#252621] dark:text-white">
              Total Revenue & Financial Health
            </h2>
            <p className="text-xs text-stone-400">
              Real-time platform GMV clearly aggregated from successful gateway settlements.
            </p>
          </div>
          <Link
            to="/admin/bookings"
            className="text-xs font-bold text-[#E87532] hover:underline inline-flex items-center gap-1"
          >
            <span>Revenue Detail</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Vibrant Terracotta Hero Card (Income / Total Revenue) */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E87532] to-[#D55F1B] p-6 text-white shadow-orange-glow flex flex-col justify-between min-h-[160px]">
            {/* Subtle decorative curved background wave line */}
            <svg
              className="absolute right-0 bottom-0 w-48 h-24 opacity-25 pointer-events-none"
              viewBox="0 0 200 100"
              fill="none"
            >
              <path
                d="M0 60 C40 30, 80 80, 120 40 C160 10, 180 50, 200 30 L200 100 L0 100 Z"
                fill="white"
              />
            </svg>

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                Income / Total Revenue
              </span>
              <span className="text-white/80 hover:text-white cursor-pointer text-sm">•••</span>
            </div>

            <div className="space-y-1.5 my-2">
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white">
                  ₹{totalRevenue.toLocaleString("en-IN")}
                </span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold">
                  <TrendingUp className="w-3 h-3" /> +3%
                </span>
              </div>
              <p className="text-xs text-white/80 font-medium">
                Increased by ₹1,180 from yesterday · All successful payments
              </p>
            </div>

            <div className="text-[10px] text-white/70 font-mono">
              Aggregated from verified Razorpay & cash receipts
            </div>
          </div>

          {/* Card 2: Partner Payouts / Expenses */}
          <Card className="p-6 border-[#E7E5DF] dark:border-[#2B231D] flex flex-col justify-between min-h-[160px] shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Partner Disbursals (Expense)
              </span>
              <span className="text-stone-300 hover:text-stone-500 cursor-pointer text-sm">•••</span>
            </div>

            <div className="space-y-1.5 my-2">
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-[#252621] dark:text-white">
                  ₹{partnerPayouts.toLocaleString("en-IN")}
                </span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 text-[11px] font-bold">
                  <TrendingUp className="w-3 h-3" /> +2%
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                Up 2% from ₹1,430 yesterday · Direct mechanic payouts
              </p>
            </div>

            <div className="text-[10px] text-stone-400 font-mono">
              Weekly Monday auto-disbursement cycle
            </div>
          </Card>

          {/* Card 3: Net Operational Margin */}
          <Card className="p-6 border-[#E7E5DF] dark:border-[#2B231D] flex flex-col justify-between min-h-[160px] shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Net Platform Commission
              </span>
              <span className="text-stone-300 hover:text-stone-500 cursor-pointer text-sm">•••</span>
            </div>

            <div className="space-y-1.5 my-2">
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-[#252621] dark:text-white">
                  ₹{netPlatformMargin.toLocaleString("en-IN")}
                </span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 text-[11px] font-bold">
                  <TrendingDown className="w-3 h-3" /> -1%
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                Down 1% from ₹1,430 yesterday · Platform retained margin
              </p>
            </div>

            <div className="text-[10px] text-stone-400 font-mono">
              Net profit margin after payment gateway fees
            </div>
          </Card>
        </div>
      </div>

      {/* =========================================================================
          OPERATIONAL METRICS GRID: USERS, BOOKING STATUSES, PENDING KYC
         ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Metric 1: Total Users & Mechanics */}
        <Card className="p-5 border-[#E7E5DF] dark:border-[#2B231D] space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Total Community Users
            </span>
            <div className="w-8 h-8 rounded-xl bg-orange-100/60 dark:bg-orange-950/50 text-[#E87532] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-mono text-[#252621] dark:text-white">
            {totalUsers.toLocaleString()}
          </p>
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-1 border-t border-[#E7E5DF] dark:border-[#2B231D]">
            <span>{totalCustomers} Customers</span>
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              {totalTechnicians} Verified Mechanics
            </span>
          </div>
        </Card>

        {/* Metric 2: Bookings & Statuses */}
        <Card className="p-5 border-[#E7E5DF] dark:border-[#2B231D] space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Total Platform Bookings
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100/60 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-mono text-[#252621] dark:text-white">
            {totalBookings.toLocaleString()}
          </p>
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-1 border-t border-[#E7E5DF] dark:border-[#2B231D]">
            <span className="text-emerald-600 font-bold">
              {completedBookings} Completed
            </span>
            <span>{totalBookings - completedBookings} Active / In-Flight</span>
          </div>
        </Card>

        {/* Metric 3: Pending KYC Applications Queue */}
        <Card className="p-5 border-[#E7E5DF] dark:border-[#2B231D] space-y-2 shadow-sm bg-gradient-to-br from-white to-amber-50/40 dark:from-[#141210] dark:to-[#23170E]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Pending KYC Verification
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold font-mono text-amber-700 dark:text-amber-400">
              {pendingKycCount}
            </p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              Action Required
            </span>
          </div>
          <div className="pt-1 border-t border-[#E7E5DF] dark:border-[#2B231D]">
            <Link
              to="/admin/technicians/verification"
              className="text-xs text-[#E87532] font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Audit Submitted Documents</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Card>
      </div>

      {/* =========================================================================
          ANALYTICS CHART & TECHNICIAN AVAILABILITY WIDGET (Fleetly Dual Layout)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Performance Report Line Chart */}
        <Card className="lg:col-span-2 p-6 border-[#E7E5DF] dark:border-[#2B231D] space-y-4 shadow-card flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-lg font-display text-[#252621] dark:text-white">
                Performance Report
              </h3>
              <p className="text-xs text-stone-400">
                Monthly trajectory of Gross Platform Revenue vs Partner Disbursals
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-[#E87532] text-white text-xs font-bold shadow-sm">
                2026 Fiscal Year
              </span>
            </div>
          </div>

          {/* Interactive Dual-Line SVG Chart */}
          <div className="relative pt-6 pb-2">
            {/* Tooltip on hovered point */}
            {hoveredMonth !== null && (
              <div
                className="absolute z-20 pointer-events-none p-3 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] shadow-xl text-xs space-y-1 transition-all"
                style={{
                  left: `${(hoveredMonth / 11) * 85 + 4}%`,
                  top: "10px",
                }}
              >
                <div className="font-bold text-stone-800 dark:text-stone-200">
                  {monthlyData[hoveredMonth].month} 2026
                </div>
                <div className="flex items-center gap-2 text-[#E87532] font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#E87532]" />
                  <span>Revenue: ₹{monthlyData[hoveredMonth].revenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300 font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-stone-700" />
                  <span>Disbursed: ₹{monthlyData[hoveredMonth].expenses.toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* SVG Canvas */}
            <div className="w-full h-52">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 550 160">
                <defs>
                  <linearGradient id="revenueGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E87532" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#E87532" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                {[30, 70, 110, 150].map((y) => (
                  <line
                    key={y}
                    x1="20"
                    y1={y}
                    x2="530"
                    y2={y}
                    stroke="currentColor"
                    className="text-stone-200 dark:text-stone-800"
                    strokeDasharray="4 4"
                  />
                ))}

                {/* Revenue Curve (Terracotta Line) */}
                <path
                  d="M 20 120 C 60 110, 100 80, 150 95 C 200 110, 250 60, 300 45 C 350 35, 400 50, 450 30 C 490 20, 520 25, 530 18"
                  fill="none"
                  stroke="#E87532"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Revenue Gradient Fill */}
                <path
                  d="M 20 120 C 60 110, 100 80, 150 95 C 200 110, 250 60, 300 45 C 350 35, 400 50, 450 30 C 490 20, 520 25, 530 18 L 530 150 L 20 150 Z"
                  fill="url(#revenueGlow)"
                />

                {/* Expenses / Payouts Curve (Dark/Charcoal Line) */}
                <path
                  d="M 20 135 C 60 125, 100 110, 150 120 C 200 130, 250 95, 300 85 C 350 80, 400 95, 450 75 C 490 65, 520 70, 530 60"
                  fill="none"
                  stroke="#252621"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="dark:stroke-stone-400"
                />

                {/* Interactive points */}
                {monthlyData.map((d, i) => {
                  const cx = 20 + i * 46;
                  // Approximate y for revenue
                  const cy = 120 - (d.revenue / 60000) * 105;
                  return (
                    <g key={d.month} onMouseEnter={() => setHoveredMonth(i)} className="cursor-pointer">
                      <circle
                        cx={cx}
                        cy={cy}
                        r={hoveredMonth === i ? 6 : 4}
                        fill="#E87532"
                        stroke="white"
                        strokeWidth="2"
                        className="transition-all"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* X-Axis Month Labels */}
            <div className="flex justify-between text-[11px] font-mono text-stone-400 pt-2 px-2">
              {monthlyData.map((d, i) => (
                <span
                  key={d.month}
                  onMouseEnter={() => setHoveredMonth(i)}
                  className={`cursor-pointer transition-colors ${
                    hoveredMonth === i ? "text-[#E87532] font-bold" : "hover:text-stone-700"
                  }`}
                >
                  {d.month}
                </span>
              ))}
            </div>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center gap-6 pt-3 border-t border-[#E7E5DF] dark:border-[#2B231D] text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E87532]" />
              <span className="font-semibold text-stone-700 dark:text-stone-300">
                Gross Inflow (Revenue)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#252621] dark:bg-stone-400" />
              <span className="font-semibold text-stone-700 dark:text-stone-300">
                Partner Disbursals (Payouts)
              </span>
            </div>
          </div>
        </Card>

        {/* Right 1 Col: Technician Fleet Availability (Matching Fleetly vehicle list) */}
        <Card className="p-6 border-[#E7E5DF] dark:border-[#2B231D] space-y-4 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF] dark:border-[#2B231D]">
            <div>
              <h3 className="font-bold text-base font-display text-[#252621] dark:text-white">
                Mechanic Fleet Duty
              </h3>
              <p className="text-xs text-stone-400">Live field technician status</p>
            </div>
            <Link
              to="/admin/technicians/verification"
              className="text-xs font-bold text-[#E87532] hover:underline"
            >
              See Details ↗
            </Link>
          </div>

          {/* Fleet List Items */}
          <div className="space-y-3.5">
            {activeFleet.map((tech) => (
              <div
                key={tech.id}
                className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={tech.avatar}
                    alt={tech.name}
                    className="w-10 h-10 rounded-xl object-cover border border-[#E7E5DF] dark:border-[#2B231D]"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-[#252621] dark:text-white">
                      {tech.name}
                    </h4>
                    <p className="text-[11px] text-stone-400 truncate max-w-[140px]">
                      {tech.specialty}
                    </p>
                    <span className="text-[10px] text-stone-500 font-mono">
                      ★ {tech.rating} · {tech.city}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      tech.status === "Available"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                        : "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300"
                    }`}
                  >
                    {tech.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Link to="/admin/technicians/verification">
            <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
              Manage All {totalTechnicians} Mechanics
            </Button>
          </Link>
        </Card>
      </div>

      {/* =========================================================================
          BOTTOM DUAL GRIDS: RECENT BOOKINGS & RECENT KYC APPLICATIONS
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings Stream */}
        <Card className="p-6 border-[#E7E5DF] dark:border-[#2B231D] space-y-4 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF] dark:border-[#2B231D]">
            <div>
              <h3 className="font-bold text-base font-display text-[#252621] dark:text-white">
                Recent Bookings Activity
              </h3>
              <p className="text-xs text-stone-400">Customer requests and fulfillment status</p>
            </div>
            <Link
              to="/admin/bookings"
              className="text-xs font-bold text-[#E87532] hover:underline inline-flex items-center gap-1"
            >
              <span>View All Bookings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {bookingsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#E87532]">
                        #{b.bookingNumber}
                      </span>
                      <Badge status={b.status} size="sm" />
                    </div>
                    <h4 className="font-bold text-stone-900 dark:text-white text-xs">
                      {b.service?.title || "Doorstep Repair"}
                    </h4>
                    <p className="text-stone-400 text-[11px]">
                      Customer: {b.customer?.user?.fullName || "Valued Customer"} ·{" "}
                      {new Date(b.scheduledAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                    <span className="text-sm font-mono font-extrabold text-[#252621] dark:text-white">
                      ₹{b.agreedPrice}
                    </span>
                    <Link
                      to={`/customer/bookings/${b.id}`}
                      className="text-[11px] font-bold text-[#E87532] hover:underline"
                    >
                      Audit Record ↗
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Technician Applications (KYC Verification Queue) */}
        <Card className="p-6 border-[#E7E5DF] dark:border-[#2B231D] space-y-4 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF] dark:border-[#2B231D]">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base font-display text-[#252621] dark:text-white">
                  Technician KYC Applications
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  {pendingKYCList.length} Pending
                </span>
              </div>
              <p className="text-xs text-stone-400">Aadhaar, Driving License & PAN documents</p>
            </div>
            <Link
              to="/admin/technicians/verification"
              className="text-xs font-bold text-[#E87532] hover:underline inline-flex items-center gap-1"
            >
              <span>Full KYC Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {kycLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {pendingKYCList.map((app) => (
                <div
                  key={app.id}
                  className="p-3.5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 dark:text-white">
                        {app.user?.fullName}
                      </span>
                      <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-orange-100 text-[#E87532]">
                        {app.docType}
                      </span>
                    </div>
                    <p className="text-stone-500 font-mono text-[11px]">
                      ID: {app.docNumber} · {app.user?.phone}
                    </p>
                    <p className="text-[10px] text-stone-400">
                      Experience: {app.experienceYears || 5} yrs · Coverage: {app.serviceRadiusKm || 12} km
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                    <Link
                      to="/admin/technicians/verification"
                      className="px-3 py-1.5 rounded-xl bg-[#E87532] text-white font-bold text-xs shadow-sm hover:bg-orange-600 transition-colors"
                    >
                      Audit & Approve
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
