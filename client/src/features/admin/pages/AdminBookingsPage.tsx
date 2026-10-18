import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CalendarCheck,
  Search,
  Filter,
  Calendar,
  Clock,
  Phone,
  MapPin,
  Car,
  Wrench,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  X,
  CreditCard,
  DollarSign,
  ShieldCheck,
  User,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { useGetMyBookingsQuery } from "../../bookings/api/bookingsApi";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { Skeleton } from "../../../components/ui/Skeleton";
import { Booking, BookingStatus } from "../../../types/api.types";

export const AdminBookingsPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [dateFilter, setDateFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [drawerBooking, setDrawerBooking] = useState<Booking | null>(null);

  const { data, isLoading, refetch } = useGetMyBookingsQuery({
    limit: 50,
    status: statusFilter !== "ALL" ? statusFilter : undefined,
  });

  // Realistic sample bookings for empty DB / fallback demonstration
  const sampleBookings: Booking[] = [
    {
      id: "admin-bk-1",
      bookingNumber: "JG-9102",
      customerId: "cust-1",
      serviceId: "svc-1",
      status: "IN_PROGRESS",
      problemDescription: "Car battery completely dead at office parking. Won't crank at all.",
      scheduledAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      startOtp: "4821",
      agreedPrice: 399,
      serviceAddress: "Tower B, DLF Cyber City, Sector 24, Gurugram",
      service: { id: "svc-1", title: "Emergency Battery Jumpstart & Diagnostic", defaultPrice: 399 },
      customer: { id: "cust-1", user: { fullName: "Aakash Mehta", phone: "+91 98765 43210" } },
      technician: { id: "tech-1", user: { fullName: "Vikramjit Singh", phone: "+91 84396 16833" }, experienceYears: 7 },
      payment: { id: "pay-1", bookingId: "admin-bk-1", amount: 399, method: "UPI", status: "SUCCESS", transactionId: "UPI/261017482910", createdAt: new Date().toISOString() },
      createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "admin-bk-2",
      bookingNumber: "JG-8842",
      customerId: "cust-2",
      serviceId: "svc-2",
      status: "EN_ROUTE",
      problemDescription: "Living room Split AC stopped cooling and making rattling sound.",
      scheduledAt: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
      startOtp: "6912",
      agreedPrice: 499,
      serviceAddress: "Flat 402, Lotus Apartments, Connaught Place, New Delhi",
      service: { id: "svc-2", title: "Split AC Deep Anti-Bacterial Jet Wash", defaultPrice: 499 },
      customer: { id: "cust-2", user: { fullName: "Rahul Sharma", phone: "+91 84396 16833" } },
      technician: { id: "tech-2", user: { fullName: "Harish Rawat", phone: "+91 98110 33491" }, experienceYears: 8 },
      payment: { id: "pay-2", bookingId: "admin-bk-2", amount: 499, method: "CASH", status: "PENDING", createdAt: new Date().toISOString() },
      createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "admin-bk-3",
      bookingNumber: "JG-8421",
      customerId: "cust-3",
      serviceId: "svc-3",
      status: "COMPLETED",
      problemDescription: "Front disc brake pads worn out. Replaced pads & bled lines.",
      scheduledAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      agreedPrice: 750,
      serviceAddress: "C-Block, Greater Kailash 1, New Delhi",
      service: { id: "svc-3", title: "Front Brake Pads Replacement", defaultPrice: 750 },
      customer: { id: "cust-3", user: { fullName: "Aman Singhania", phone: "+91 98765 43211" } },
      technician: { id: "tech-1", user: { fullName: "Vikramjit Singh", phone: "+91 84396 16833" }, experienceYears: 7 },
      payment: { id: "pay-3", bookingId: "admin-bk-3", amount: 750, method: "UPI", status: "SUCCESS", transactionId: "UPI/261016881920", createdAt: new Date().toISOString() },
      createdAt: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    },
    {
      id: "admin-bk-4",
      bookingNumber: "JG-8119",
      customerId: "cust-4",
      serviceId: "svc-4",
      status: "COMPLETED",
      problemDescription: "Doorstep high-pressure foam wash & interior vacuuming.",
      scheduledAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
      agreedPrice: 599,
      serviceAddress: "Sector 29, Gurugram",
      service: { id: "svc-4", title: "Complete Car Doorstep Snow Foam Spa", defaultPrice: 599 },
      customer: { id: "cust-4", user: { fullName: "Priya Menon", phone: "+91 98765 43212" } },
      technician: { id: "tech-3", user: { fullName: "Amit Solanki", phone: "+91 98110 55910" }, experienceYears: 5 },
      payment: { id: "pay-4", bookingId: "admin-bk-4", amount: 599, method: "ONLINE", status: "SUCCESS", transactionId: "RZP/pay_O8291048", createdAt: new Date().toISOString() },
      createdAt: new Date(Date.now() - 50 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    },
    {
      id: "admin-bk-5",
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

  const rawList = data?.data?.bookings || [];
  const bookings = rawList.length > 0 ? rawList : sampleBookings;

  // Filter list
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesStatus = statusFilter === "ALL" || b.status === statusFilter;

      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchesSearch =
          b.bookingNumber.toLowerCase().includes(q) ||
          b.service?.title?.toLowerCase().includes(q) ||
          b.customer?.user?.fullName?.toLowerCase().includes(q) ||
          b.technician?.user?.fullName?.toLowerCase().includes(q) ||
          b.serviceAddress?.toLowerCase().includes(q);
      }

      return matchesStatus && matchesSearch;
    });
  }, [bookings, statusFilter, searchQuery]);

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87532]">
            Operations Ledger
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-white mt-0.5">
            Master Bookings Audit
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            Real-time audit log of customer service dispatches, assigned mechanics, and payment settlements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/admin/dashboard">
            <Button variant="outline" size="sm" className="font-semibold text-xs">
              Overview Dashboard
            </Button>
          </Link>
          <button
            onClick={() => refetch()}
            className="p-2 rounded-xl border border-[#E7E5DF] dark:border-[#2B231D] bg-white dark:bg-[#141210] text-stone-500 hover:text-[#E87532] transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] p-4 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Status Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "ALL", label: "All Bookings" },
            { id: "PENDING", label: "Pending" },
            { id: "EN_ROUTE", label: "En Route" },
            { id: "IN_PROGRESS", label: "In Progress" },
            { id: "COMPLETED", label: "Completed" },
            { id: "CANCELLED", label: "Cancelled" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setStatusFilter(tab.id);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === tab.id
                  ? "bg-[#E87532] text-white shadow-sm"
                  : "bg-[#F8F7F3] dark:bg-[#1A1613] text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 border border-[#E7E5DF] dark:border-[#2B231D]"
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
            placeholder="Search booking #, customer, mechanic..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs text-[#252621] dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E87532]"
          />
        </div>
      </div>

      {/* Bookings Table / Stream */}
      <Card className="overflow-hidden border-[#E7E5DF] dark:border-[#2B231D] shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8F7F3] dark:bg-[#1A1613] border-b border-[#E7E5DF] dark:border-[#2B231D] text-[11px] font-bold uppercase tracking-wider text-stone-500">
                <th className="py-3.5 px-4">Booking Ref</th>
                <th className="py-3.5 px-4">Service Details</th>
                <th className="py-3.5 px-4">Customer & Doorstep</th>
                <th className="py-3.5 px-4">Assigned Mechanic</th>
                <th className="py-3.5 px-4">Payment & Fee</th>
                <th className="py-3.5 px-4">Journey Status</th>
                <th className="py-3.5 px-4 text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5DF] dark:divide-[#2B231D]">
              {isLoading ? (
                [1, 2, 3, 4].map((i) => (
                  <tr key={i}>
                    <td colSpan={7} className="p-4">
                      <Skeleton className="h-10 w-full rounded-xl" />
                    </td>
                  </tr>
                ))
              ) : filteredBookings.length > 0 ? (
                filteredBookings.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-stone-50/50 dark:hover:bg-[#1A1613] transition-colors"
                  >
                    {/* Booking # & Date */}
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-[#E87532] block">
                        #{b.bookingNumber}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {new Date(b.scheduledAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </td>

                    {/* Service */}
                    <td className="py-3 px-4">
                      <span className="font-bold text-stone-900 dark:text-white block truncate max-w-[200px]">
                        {b.service?.title || "Doorstep Auto Care"}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {new Date(b.scheduledAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-4">
                      <span className="font-semibold text-stone-800 dark:text-stone-200 block">
                        {b.customer?.user?.fullName || "Valued Customer"}
                      </span>
                      <span className="text-[10px] text-stone-400 truncate max-w-[180px] block">
                        {b.serviceAddress || "Delhi NCR Doorstep"}
                      </span>
                    </td>

                    {/* Mechanic */}
                    <td className="py-3 px-4">
                      {b.technician?.user ? (
                        <div>
                          <span className="font-semibold text-stone-800 dark:text-stone-200 block">
                            {b.technician.user.fullName}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono">
                            {b.technician.user.phone}
                          </span>
                        </div>
                      ) : (
                        <span className="text-amber-600 font-semibold text-[11px] italic">
                          Awaiting Dispatch
                        </span>
                      )}
                    </td>

                    {/* Fee & Payment */}
                    <td className="py-3 px-4">
                      <span className="font-mono font-extrabold text-[#252621] dark:text-white block">
                        ₹{b.agreedPrice}
                      </span>
                      <span
                        className={`text-[10px] font-bold ${
                          b.payment?.status === "SUCCESS"
                            ? "text-emerald-600"
                            : "text-stone-400"
                        }`}
                      >
                        {b.payment?.status === "SUCCESS" ? "PAID" : "ESCROW / COD"}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4">
                      <Badge status={b.status} size="sm" />
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDrawerBooking(b)}
                        className="text-xs font-semibold"
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-stone-400">
                    No bookings match your current filter settings.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* =========================================================================
          BOOKING DETAIL INSPECTION SLIDE-OVER DRAWER
         ========================================================================= */}
      {drawerBooking && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#141210] border-l border-[#E7E5DF] dark:border-[#2B231D] h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E5DF] dark:border-[#2B231D]">
                <div>
                  <span className="text-xs font-mono font-bold text-[#E87532]">
                    Audit #{drawerBooking.bookingNumber}
                  </span>
                  <h3 className="text-xl font-bold font-display text-[#252621] dark:text-white">
                    {drawerBooking.service?.title}
                  </h3>
                </div>
                <button
                  onClick={() => setDrawerBooking(null)}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status & Payout Card */}
              <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">
                    Current Fulfillment State
                  </span>
                  <Badge status={drawerBooking.status} size="sm" />
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">
                    Agreed Visiting Charge
                  </span>
                  <span className="text-xl font-mono font-extrabold text-[#252621] dark:text-white">
                    ₹{drawerBooking.agreedPrice}
                  </span>
                </div>
              </div>

              {/* Customer Details */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                  Customer & Doorstep Location
                </span>
                <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-[#252621] dark:text-white">
                      {drawerBooking.customer?.user?.fullName || "Valued Customer"}
                    </span>
                    <span className="font-mono text-stone-500">
                      {drawerBooking.customer?.user?.phone || "+91 98765 43210"}
                    </span>
                  </div>
                  <p className="flex items-start gap-1.5 text-stone-600 dark:text-stone-300">
                    <MapPin className="w-3.5 h-3.5 text-[#E87532] shrink-0 mt-0.5" />
                    <span>{drawerBooking.serviceAddress}</span>
                  </p>
                </div>
              </div>

              {/* Assigned Technician */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                  Assigned Mechanic Partner
                </span>
                <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs">
                  {drawerBooking.technician?.user ? (
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-sm text-[#252621] dark:text-white block">
                          {drawerBooking.technician.user.fullName}
                        </span>
                        <span className="text-stone-400 text-[11px]">
                          Partner Experience: {drawerBooking.technician.experienceYears || 5} yrs
                        </span>
                      </div>
                      <span className="font-mono text-stone-500">
                        {drawerBooking.technician.user.phone}
                      </span>
                    </div>
                  ) : (
                    <span className="text-amber-600 font-semibold italic">
                      No technician dispatched yet (Pending radar pool acceptance)
                    </span>
                  )}
                </div>
              </div>

              {/* Reported Problem */}
              {drawerBooking.problemDescription && (
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                    Reported Symptoms
                  </span>
                  <p className="p-3.5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs text-stone-700 dark:text-stone-300 italic">
                    "{drawerBooking.problemDescription}"
                  </p>
                </div>
              )}

              {/* Administrative Dispute / Override Oversight Note */}
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Administrative Oversight</strong>
                  Start OTP security code is required for on-site work authorization. If a customer dispute arises, review GPS timestamp logs or call both parties.
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between gap-3">
              <Link
                to={`/customer/bookings/${drawerBooking.id}`}
                className="w-1/2 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E7E5DF] dark:border-[#2B231D] text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-[#F8F7F3] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Customer View</span>
              </Link>
              <Button
                variant="outline"
                size="md"
                onClick={() => setDrawerBooking(null)}
                className="w-1/2 text-xs font-bold"
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
