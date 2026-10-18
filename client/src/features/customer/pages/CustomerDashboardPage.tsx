import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Wrench,
  Search,
  MapPin,
  Phone,
  Navigation,
  Car,
  Copy,
  Check,
  Star,
  HelpCircle,
  Sparkles,
  Zap,
  Droplets,
  Wind,
  RotateCcw,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { useAppSelector } from "../../../app/hooks";
import { useGetMyBookingsQuery } from "../../bookings/api/bookingsApi";
import { useGetServicesQuery } from "../../services/api/servicesApi";
import { useGetTechniciansQuery } from "../../technicians/api/techniciansApi";
import { useLocation as useGeoLocation } from "../../../context/LocationContext";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Skeleton } from "../../../components/ui/Skeleton";
import { BookingModal } from "../../bookings/components/BookingModal";
import { Booking, BookingStatus, Service } from "../../../types/api.types";

export const CustomerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { location, isLoadingGPS, detectCurrentLocation, setManualLocation } =
    useGeoLocation();

  // Queries
  const { data: bookingsData, isLoading: bookingsLoading } = useGetMyBookingsQuery({
    limit: 10,
  });
  const { data: servicesData } = useGetServicesQuery();
  const { data: techniciansData } = useGetTechniciansQuery();

  // Local state
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [bookingStatusFilter, setBookingStatusFilter] = useState<
    "ALL" | "ACTIVE" | "COMPLETED" | "CANCELLED"
  >("ALL");
  const [selectedServiceForModal, setSelectedServiceForModal] =
    useState<Service | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [copiedOtp, setCopiedOtp] = useState(false);
  const [cityModalOpen, setCityModalOpen] = useState(false);

  // Available Indian Cities for quick selection
  const popularCities = [
    { name: "New Delhi", address: "Connaught Place, Central Delhi", lat: 28.6139, lng: 77.209 },
    { name: "Gurugram", address: "Cyber City, DLF Phase 2", lat: 28.4595, lng: 77.0266 },
    { name: "Noida", address: "Sector 18 Market, Gautam Buddha Nagar", lat: 28.5708, lng: 77.3271 },
    { name: "Mumbai", address: "Bandra Kurla Complex, Bandra East", lat: 19.0657, lng: 72.8687 },
    { name: "Bengaluru", address: "Indiranagar 100 Feet Road", lat: 12.9716, lng: 77.5946 },
    { name: "Pune", address: "Koregaon Park, Lane 7", lat: 18.5204, lng: 73.8567 },
    { name: "Hyderabad", address: "Hitec City, Madhapur", lat: 17.385, lng: 78.4867 },
    { name: "Jaipur", address: "MI Road, C-Scheme", lat: 26.9124, lng: 75.7873 },
  ];

  // Popular Service Shortcuts
  const serviceShortcuts = [
    {
      id: "emergency-breakdown",
      title: "Breakdown & Towing",
      subtitle: "Puncture, battery jumpstart, towing",
      startingPrice: 299,
      icon: Car,
      tag: "Avg 18m arrival",
      color: "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/30 dark:border-red-900/50",
      slug: "emergency-breakdown-repair",
    },
    {
      id: "ac-jet-wash",
      title: "AC Jet Wash & Service",
      subtitle: "High-pressure wash, gas level inspection",
      startingPrice: 499,
      icon: Wind,
      tag: "Top Rated",
      color: "bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-950/30 dark:border-sky-900/50",
      slug: "ac-jet-wash-service",
    },
    {
      id: "electrician-service",
      title: "Auto & Home Electrician",
      subtitle: "Wiring, MCB, battery, starter motor",
      startingPrice: 199,
      icon: Zap,
      tag: "Certified",
      color: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50",
      slug: "home-and-auto-electrician",
    },
    {
      id: "plumbing-service",
      title: "Plumbing & Leakages",
      subtitle: "Taps, motor repair, pipe fittings",
      startingPrice: 199,
      icon: Droplets,
      tag: "Doorstep",
      color: "bg-cyan-50 text-cyan-600 border-cyan-200 dark:bg-cyan-950/30 dark:border-cyan-900/50",
      slug: "plumbing-and-leakage-repair",
    },
    {
      id: "car-spa",
      title: "Doorstep Car Spa",
      subtitle: "Foam wash, deep vacuuming, polish",
      startingPrice: 399,
      icon: Sparkles,
      tag: "Eco Wash",
      color: "bg-orange-50 text-[#E87532] border-orange-200 dark:bg-orange-950/30 dark:border-orange-900/50",
      slug: "doorstep-car-spa",
    },
    {
      id: "appliance-repair",
      title: "Appliance Repair",
      subtitle: "Washing machine, fridge, microwave",
      startingPrice: 349,
      icon: Wrench,
      tag: "30-Day Warranty",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900/50",
      slug: "home-appliance-repair",
    },
  ];

  // Bookings resolution
  const realBookings: Booking[] = bookingsData?.data?.bookings || [];

  // Fallback demo active booking for rich presentation if DB has none
  const sampleActiveBooking: Booking = {
    id: "demo-live-101",
    bookingNumber: "JG-8842",
    customerId: user?.id || "demo-cust",
    serviceId: "svc-ac-jet",
    status: "EN_ROUTE",
    problemDescription:
      "Split AC is not cooling properly and making a buzzing noise. Need indoor jet foam wash and compressor inspection.",
    scheduledAt: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
    startOtp: "4821",
    agreedPrice: 499,
    serviceAddress: location.address || "Connaught Place, Central Delhi",
    service: {
      id: "svc-ac-jet",
      categoryId: "ac-repair",
      title: "AC High-Pressure Jet Service & Gas Inspection",
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Find active booking from real data, or fallback to sample active booking
  const realActiveBooking = realBookings.find((b) =>
    ["PENDING", "ACCEPTED", "EN_ROUTE", "ARRIVED", "IN_PROGRESS"].includes(b.status)
  );

  const activeBooking = realActiveBooking || sampleActiveBooking;

  // Recent bookings list (merge sample bookings if empty for first time customer)
  const sampleRecentBookings: Booking[] = [
    {
      id: "demo-b-1",
      bookingNumber: "JG-7821",
      customerId: user?.id || "demo-cust",
      serviceId: "svc-elec",
      status: "COMPLETED",
      problemDescription: "Short circuit in main MCB distribution board.",
      scheduledAt: "2026-10-12T14:30:00Z",
      agreedPrice: 249,
      serviceAddress: "Flat 402, Green Avenue, Delhi",
      service: {
        id: "svc-elec",
        categoryId: "electrician",
        title: "MCB & Fuse Box Short Circuit Repair",
        defaultPrice: 249,
      },
      technician: {
        id: "tech-1",
        experienceYears: 9,
        user: { fullName: "Rameshwar Sharma", phone: "+91 98765 43210" },
      },
      createdAt: "2026-10-12T10:00:00Z",
      updatedAt: "2026-10-12T15:30:00Z",
    },
    {
      id: "demo-b-2",
      bookingNumber: "JG-6420",
      customerId: user?.id || "demo-cust",
      serviceId: "svc-car",
      status: "COMPLETED",
      problemDescription: "Doorstep high-foaming water wash and interior cabin vacuum.",
      scheduledAt: "2026-10-04T11:00:00Z",
      agreedPrice: 399,
      serviceAddress: "Bandra West, Mumbai",
      service: {
        id: "svc-car",
        categoryId: "car-spa",
        title: "Complete Car Doorstep Foam Spa",
        defaultPrice: 399,
      },
      technician: {
        id: "tech-4",
        experienceYears: 6,
        user: { fullName: "Mohammad Imran", phone: "+91 98765 43213" },
      },
      createdAt: "2026-10-04T09:00:00Z",
      updatedAt: "2026-10-04T12:00:00Z",
    },
  ];

  const allDisplayBookings =
    realBookings.length > 0 ? realBookings : sampleRecentBookings;

  // Filtered recent bookings
  const filteredBookings = useMemo(() => {
    return allDisplayBookings.filter((b) => {
      // Status filter
      if (bookingStatusFilter === "ACTIVE") {
        if (!["PENDING", "ACCEPTED", "EN_ROUTE", "ARRIVED", "IN_PROGRESS"].includes(b.status))
          return false;
      } else if (bookingStatusFilter === "COMPLETED") {
        if (b.status !== "COMPLETED") return false;
      } else if (bookingStatusFilter === "CANCELLED") {
        if (b.status !== "CANCELLED") return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = b.service?.title?.toLowerCase().includes(query);
        const matchesNum = b.bookingNumber.toLowerCase().includes(query);
        const matchesTech = b.technician?.user?.fullName?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesNum && !matchesTech) return false;
      }

      return true;
    });
  }, [allDisplayBookings, bookingStatusFilter, searchQuery]);

  // Recommended technicians (from API or curated fallback)
  const displayTechnicians =
    techniciansData?.data && techniciansData.data.length > 0
      ? techniciansData.data.slice(0, 3)
      : [
          {
            id: "tech-1",
            user: { fullName: "Rameshwar Sharma", phone: "+91 84396 16833" },
            experienceYears: 9,
            bio: "Certified senior automobile technician specializing in breakdown diagnosis and Japanese/German cars.",
            avgRating: 4.95,
            baseVisitingCharge: 199,
            specialty: "Master Auto Mechanic",
            jobsDone: 342,
          },
          {
            id: "tech-2",
            user: { fullName: "Vikramjit Singh", phone: "+91 84396 16833" },
            experienceYears: 7,
            bio: "Licensed industrial & domestic wireman, expert in MCB boards and inverters.",
            avgRating: 4.9,
            baseVisitingCharge: 149,
            specialty: "Licensed Electrician",
            jobsDone: 280,
          },
          {
            id: "tech-3",
            user: { fullName: "Sunil Verma", phone: "+91 84396 16833" },
            experienceYears: 8,
            bio: "HVAC and AC specialist with expertise in inverter compressors and jet washing.",
            avgRating: 4.88,
            baseVisitingCharge: 249,
            specialty: "HVAC & AC Expert",
            jobsDone: 410,
          },
        ];

  // Recommended Services (from API or fallback)
  const displayServices =
    servicesData?.data && servicesData.data.length > 0
      ? servicesData.data.slice(0, 3)
      : [
          {
            id: "rec-1",
            categoryId: "breakdown",
            title: "Emergency Roadside Battery Jumpstart & Towing",
            defaultPrice: 299,
            durationMinutes: 20,
            rating: 4.92,
          },
          {
            id: "rec-2",
            categoryId: "ac-repair",
            title: "Split AC Deep Anti-Bacterial Jet Wash",
            defaultPrice: 499,
            durationMinutes: 45,
            rating: 4.88,
          },
          {
            id: "rec-3",
            categoryId: "electrician",
            title: "Inverter & Home Wiring Health Checkup",
            defaultPrice: 199,
            durationMinutes: 30,
            rating: 4.95,
          },
        ];

  // Copy OTP handler
  const handleCopyOtp = (otp: string) => {
    navigator.clipboard.writeText(otp);
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2500);
  };

  // Stepper definition
  const trackerSteps = [
    { key: "PENDING", label: "Requested", icon: Clock },
    { key: "ACCEPTED", label: "Assigned", icon: CheckCircle2 },
    { key: "EN_ROUTE", label: "En Route", icon: Navigation },
    { key: "ARRIVED", label: "Arrived", icon: Car },
    { key: "IN_PROGRESS", label: "In Progress", icon: Wrench },
    { key: "COMPLETED", label: "Finished", icon: CheckCircle2 },
  ];

  const statusOrder: BookingStatus[] = [
    "PENDING",
    "ACCEPTED",
    "EN_ROUTE",
    "ARRIVED",
    "IN_PROGRESS",
    "COMPLETED",
  ];

  const currentStepIndex = statusOrder.indexOf(activeBooking.status);

  // Status explanatory label
  const getStatusDescription = (status: BookingStatus) => {
    switch (status) {
      case "PENDING":
        return "Searching for the closest verified technician within 5 km... Average match time: 90 seconds.";
      case "ACCEPTED":
        return `Technician ${activeBooking.technician?.user?.fullName || "Partner"} has accepted your booking and is preparing equipment.`;
      case "EN_ROUTE":
        return `Technician ${activeBooking.technician?.user?.fullName || "Partner"} is en route to your location. ETA ~15 minutes.`;
      case "ARRIVED":
        return "Technician has arrived at your doorstep! Verify their ID badge and share the Start OTP to begin.";
      case "IN_PROGRESS":
        return "Diagnostic and repair work is currently in progress. Digital bill will be generated upon completion.";
      case "COMPLETED":
        return "Service finished successfully. Please inspect the work and submit your rating.";
      default:
        return "Booking status updated.";
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* =========================================================================
          SECTION 1: WELCOME HEADER & LOCATION
         ========================================================================= */}
      <div className="rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] p-6 sm:p-8 shadow-card relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#E87532]/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-50 dark:bg-orange-950/40 text-[#E87532] border border-orange-200 dark:border-orange-900/50">
                <span className="w-2 h-2 rounded-full bg-[#E87532] animate-pulse"></span>
                Customer Console
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Account
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#252621] dark:text-white">
              Welcome back,{" "}
              <span className="text-[#E87532]">
                {user?.fullName?.split(" ")[0] || "Valued Customer"}
              </span>{" "}
              👋
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-300 max-w-xl">
              Track active mechanic dispatches in real time, book verified home & vehicle repairs, and manage your service history with transparent pricing.
            </p>

            {/* Location selector pill */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs font-medium text-[#252621] dark:text-[#F5F2EB]">
                <MapPin className="w-4 h-4 text-[#E87532] shrink-0" />
                <span className="font-bold text-[#252621] dark:text-white">
                  {location.city || "New Delhi"}:
                </span>
                <span className="truncate max-w-[200px] sm:max-w-xs text-stone-500 dark:text-stone-400">
                  {location.address || "Connaught Place, Central Delhi"}
                </span>
                <button
                  onClick={() => setCityModalOpen(true)}
                  className="ml-1 text-[11px] font-bold text-[#E87532] hover:underline"
                >
                  Change
                </button>
              </div>

              <button
                onClick={detectCurrentLocation}
                disabled={isLoadingGPS}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-[#252621] hover:bg-[#F8F7F3] dark:hover:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] transition-all"
              >
                <RotateCcw
                  className={`w-3.5 h-3.5 text-[#E87532] ${
                    isLoadingGPS ? "animate-spin" : ""
                  }`}
                />
                <span>{isLoadingGPS ? "Detecting GPS..." : "Detect Location"}</span>
              </button>
            </div>
          </div>

          {/* Quick Action Button & Stats Pills */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 shrink-0">
            <Link to="/services">
              <Button
                variant="primary"
                size="lg"
                className="shadow-orange-glow font-bold w-full sm:w-auto"
                leftIcon={<PlusCircle className="w-5 h-5" />}
              >
                Book New Service
              </Button>
            </Link>

            <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
              <span className="flex items-center gap-1">
                <strong className="text-[#252621] dark:text-white font-mono text-sm">
                  {realBookings.filter((b) =>
                    ["PENDING", "ACCEPTED", "EN_ROUTE", "ARRIVED", "IN_PROGRESS"].includes(
                      b.status
                    )
                  ).length || 1}
                </strong>{" "}
                Active
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <strong className="text-[#252621] dark:text-white font-mono text-sm">
                  {realBookings.filter((b) => b.status === "COMPLETED").length || 2}
                </strong>{" "}
                Completed
              </span>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Protected
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: SEARCH OR BOOK A SERVICE
         ========================================================================= */}
      <div className="rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] p-5 sm:p-6 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold font-display text-[#252621] dark:text-white">
              Search & Instant Booking
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Find verified mechanics, electricians, plumbers, and technicians near you in {location.city || "your city"}.
            </p>
          </div>

          {/* 24/7 Helpline Pill */}
          <a
            href="tel:+918439616833"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-rose-600" />
            <span>Emergency Roadside Helpline: +91 84396 16833</span>
          </a>
        </div>

        {/* Search input bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  navigate(`/services?search=${encodeURIComponent(searchQuery.trim())}`);
                }
              }}
              placeholder="Search electric repair, AC jet wash, car battery, plumbing, bike puncture..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-sm text-[#252621] dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E87532] focus:border-transparent transition-all"
            />
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => {
              if (searchQuery.trim()) {
                navigate(`/services?search=${encodeURIComponent(searchQuery.trim())}`);
              } else {
                navigate("/services");
              }
            }}
            className="font-bold shrink-0"
          >
            Explore Catalog
          </Button>
        </div>

        {/* Category quick filter chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "ALL", label: "All Categories" },
            { id: "emergency-breakdown", label: "Roadside Breakdown" },
            { id: "ac-repair", label: "AC Repair & Wash" },
            { id: "electrician", label: "Electrician & Inverter" },
            { id: "plumbing", label: "Plumber & Pipe" },
            { id: "car-spa", label: "Doorstep Car Spa" },
            { id: "appliance", label: "Home Appliances" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategoryFilter(cat.id);
                if (cat.id !== "ALL") {
                  navigate(`/services?category=${cat.id}`);
                }
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                categoryFilter === cat.id
                  ? "bg-[#E87532] text-white shadow-sm"
                  : "bg-[#F8F7F3] dark:bg-[#1A1613] text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: POPULAR SERVICE SHORTCUTS
         ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-display text-[#252621] dark:text-white">
              Popular Service Shortcuts
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              One-click booking with certified nearby professionals.
            </p>
          </div>
          <Link
            to="/services"
            className="text-xs font-bold text-[#E87532] hover:underline flex items-center gap-1"
          >
            <span>All 50+ Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {serviceShortcuts.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                onClick={() => {
                  setSelectedServiceForModal({
                    id: svc.id,
                    categoryId: svc.id,
                    title: svc.title,
                    defaultPrice: svc.startingPrice,
                    durationMinutes: 45,
                    rating: 4.9,
                  });
                  setBookingModalOpen(true);
                }}
                className="group p-5 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] hover:border-[#E87532]/60 hover:shadow-card-hover transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${svc.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#252621] dark:text-white group-hover:text-[#E87532] transition-colors">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                        {svc.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E7E5DF]/60 dark:border-[#2B231D] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                      Starts from
                    </span>
                    <span className="text-base font-bold font-mono text-[#252621] dark:text-white">
                      ₹{svc.startingPrice}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E87532] group-hover:translate-x-1 transition-transform">
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          SECTION 4 & 5: UPCOMING BOOKING CARD & BOOKING STATUS TRACKER
         ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-display text-[#252621] dark:text-white">
              Upcoming Booking & Live Status Tracker
            </h2>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          {activeBooking && (
            <Link
              to={`/customer/bookings/${activeBooking.id}`}
              className="text-xs font-bold text-[#E87532] hover:underline flex items-center gap-1"
            >
              <span>Full Job Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {activeBooking ? (
          <div className="rounded-3xl bg-white dark:bg-[#141210] border-2 border-[#E87532]/40 shadow-card p-6 sm:p-8 space-y-6 relative overflow-hidden">
            {/* Top accent badge bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E7E5DF] dark:border-[#2B231D]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-[#E87532] border border-orange-200 dark:border-orange-900/50 flex items-center justify-center shrink-0">
                  <Car className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-1">
                    <Badge status={activeBooking.status} size="sm" />
                    <span className="text-xs font-mono font-bold text-stone-500">
                      Booking #{activeBooking.bookingNumber}
                    </span>
                    <span className="text-xs text-stone-400">•</span>
                    <span className="text-xs text-stone-500 font-medium">
                      Scheduled:{" "}
                      {new Date(activeBooking.scheduledAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold font-display text-[#252621] dark:text-white">
                    {activeBooking.service?.title || "Active Service Request"}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#E87532] shrink-0" />
                    <span className="truncate max-w-md">
                      {activeBooking.serviceAddress || location.address}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-[11px] text-stone-400 block font-medium">
                    Agreed Visiting Price
                  </span>
                  <span className="text-2xl font-bold font-mono text-[#252621] dark:text-white">
                    ₹{activeBooking.agreedPrice}
                  </span>
                </div>
                <Link to={`/customer/bookings/${activeBooking.id}`}>
                  <Button variant="primary" size="sm" className="font-bold">
                    Job Console
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stepper Status Progression */}
            <div className="space-y-4 pt-2">
              <div className="relative flex items-center justify-between">
                {/* Background line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#E7E5DF] dark:bg-[#2B231D] w-full z-0" />
                {/* Completed colored line */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#E87532] transition-all duration-500 z-0"
                  style={{
                    width: `${
                      (Math.max(0, currentStepIndex) / (trackerSteps.length - 1)) * 100
                    }%`,
                  }}
                />

                {trackerSteps.map((step, idx) => {
                  const Icon = step.icon;
                  const isDone = idx < currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div
                      key={step.key}
                      className="relative z-10 flex flex-col items-center group"
                    >
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          isCurrent
                            ? "bg-[#E87532] text-white shadow-orange-glow scale-110 ring-4 ring-orange-500/20"
                            : isDone
                            ? "bg-[#E87532] text-white"
                            : "bg-white dark:bg-[#141210] border-2 border-[#E7E5DF] dark:border-[#2B231D] text-stone-400"
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span
                        className={`text-[11px] font-semibold mt-2 text-center max-w-[80px] hidden sm:block ${
                          isCurrent
                            ? "text-[#E87532] font-bold"
                            : isDone
                            ? "text-[#252621] dark:text-stone-200"
                            : "text-stone-400"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Status explanation alert box */}
              <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] flex items-start gap-3">
                <Navigation className="w-5 h-5 text-[#E87532] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#252621] dark:text-white uppercase tracking-wider">
                    Current Status: {activeBooking.status.replace("_", " ")}
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                    {getStatusDescription(activeBooking.status)}
                  </p>
                </div>
              </div>
            </div>

            {/* Start OTP Safety Box & Assigned Technician Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Start OTP Card */}
              {activeBooking.startOtp && activeBooking.status !== "COMPLETED" ? (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Start OTP (Share in person)</span>
                    </div>
                    <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                      Share this code with technician only after they arrive at your location.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#1A1613] border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 font-mono text-xl font-extrabold tracking-widest shadow-sm">
                      {activeBooking.startOtp}
                    </span>
                    <button
                      onClick={() => handleCopyOtp(activeBooking.startOtp || "")}
                      className="p-2 rounded-xl bg-white dark:bg-[#1A1613] border border-amber-300 dark:border-amber-700 text-amber-700 hover:text-amber-900 transition-colors"
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
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-semibold">
                    Service completed and verified with secure OTP. Digital receipt archived below.
                  </span>
                </div>
              )}

              {/* Assigned Technician Details */}
              <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#E87532]/10 text-[#E87532] border border-[#E87532]/20 font-bold flex items-center justify-center text-lg shrink-0">
                    {activeBooking.technician?.user?.fullName?.charAt(0) || "T"}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-[#252621] dark:text-white truncate">
                        {activeBooking.technician?.user?.fullName || "Assigned Specialist"}
                      </h4>
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                      {activeBooking.technician?.experienceYears || 7}+ Years Exp · 4.9 ★ Rating
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${activeBooking.technician?.user?.phone || "+918439616833"}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] text-[#252621] dark:text-white hover:text-[#E87532] shadow-sm transition-colors shrink-0"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E87532]" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <Card className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-orange-50 dark:bg-orange-950/40 text-[#E87532] flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-[#252621] dark:text-white">
                No active repairs running
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto mt-1">
                Your home appliances, electricals, and vehicles are all running smoothly. Need routine maintenance or seasonal checks?
              </p>
            </div>
            <Link to="/services">
              <Button variant="primary" size="md" className="font-bold">
                Browse Services Catalog
              </Button>
            </Link>
          </Card>
        )}
      </div>

      {/* =========================================================================
          SECTION 6: RECENT BOOKINGS (Table / List with Filters)
         ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold font-display text-[#252621] dark:text-white">
              Recent Service Bookings
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Overview of your recent doorstep dispatches and maintenance logs.
            </p>
          </div>

          <Link
            to="/customer/bookings"
            className="text-xs font-bold text-[#E87532] hover:underline"
          >
            View All ({bookingsData?.data?.pagination?.total || allDisplayBookings.length}) →
          </Link>
        </div>

        {/* Filter Pills (Reference Inspired) */}
        <div className="flex flex-wrap items-center gap-2 pb-1">
          {[
            { id: "ALL", label: `All (${allDisplayBookings.length})` },
            {
              id: "ACTIVE",
              label: `Active (${
                allDisplayBookings.filter((b) =>
                  ["PENDING", "ACCEPTED", "EN_ROUTE", "ARRIVED", "IN_PROGRESS"].includes(
                    b.status
                  )
                ).length
              })`,
            },
            {
              id: "COMPLETED",
              label: `Completed (${
                allDisplayBookings.filter((b) => b.status === "COMPLETED").length
              })`,
            },
            {
              id: "CANCELLED",
              label: `Cancelled (${
                allDisplayBookings.filter((b) => b.status === "CANCELLED").length
              })`,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setBookingStatusFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                bookingStatusFilter === tab.id
                  ? "bg-[#E87532] text-white shadow-sm"
                  : "bg-white dark:bg-[#141210] text-stone-600 dark:text-stone-300 hover:bg-[#F8F7F3] dark:hover:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table / Card List */}
        {bookingsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl" />
            ))}
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="overflow-hidden rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card">
            <div className="divide-y divide-[#E7E5DF] dark:divide-[#2B231D]">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F8F7F3]/60 dark:hover:bg-[#1A1613]/60 transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge status={b.status} size="sm" />
                      <span className="text-xs font-mono font-semibold text-stone-400">
                        #{b.bookingNumber}
                      </span>
                      <span className="text-xs text-stone-400">•</span>
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        {new Date(b.scheduledAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-[#252621] dark:text-white font-display">
                      {b.service?.title || "Auto Repair Service"}
                    </h4>

                    <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
                      <span>
                        Technician:{" "}
                        <strong className="text-[#252621] dark:text-stone-200">
                          {b.technician?.user?.fullName || "Assigned Specialist"}
                        </strong>
                      </span>
                      <span>•</span>
                      <span className="truncate max-w-xs">{b.serviceAddress}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 font-medium block">
                        Agreed Price
                      </span>
                      <span className="text-lg font-mono font-bold text-[#252621] dark:text-white">
                        ₹{b.agreedPrice}
                      </span>
                    </div>

                    <Link to={`/customer/bookings/${b.id}`}>
                      <Button variant="outline" size="sm" className="font-semibold">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Card className="p-8 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-stone-300 mx-auto" />
            <h4 className="font-bold text-stone-700 dark:text-stone-300">
              No matching bookings found
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Try switching your filter or search query above.
            </p>
          </Card>
        )}
      </div>

      {/* =========================================================================
          SECTION 7: RECOMMENDED SERVICES & VERIFIED TECHNICIANS
         ========================================================================= */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold font-display text-[#252621] dark:text-white">
            Recommended Technicians & Services
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Top-rated verified professionals serving {location.city || "your area"}.
          </p>
        </div>

        {/* Technicians Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayTechnicians.map((tech) => (
            <div
              key={tech.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card hover:shadow-card-hover dark:hover:border-[#FF7A1A]/40 dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between gap-4 group"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E87532]/25 to-[#E87532]/5 text-[#E87532] font-black flex items-center justify-center text-lg border border-[#E87532]/40 shrink-0 shadow-sm">
                  {tech.user?.fullName?.charAt(0) || "T"}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-sm text-[#252621] dark:text-[#F5F5F0] truncate group-hover:text-[#E87532] transition-colors">
                      {tech.user?.fullName}
                    </h4>
                    <ShieldCheck className="w-4 h-4 text-emerald-500 fill-emerald-500/10 shrink-0" />
                  </div>
                  <p className="text-xs font-semibold text-[#E87532]">
                    {(tech as any).specialty || "Certified Technician"}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-[#8E8D88] mt-0.5">
                    {tech.experienceYears}+ Yrs Experience • 4.9 ★ ({(tech as any).jobsDone || 120}+ jobs)
                  </p>
                </div>
              </div>

              <p className="text-xs text-stone-600 dark:text-[#9A9993] line-clamp-2 leading-relaxed">
                {tech.bio}
              </p>

              <div className="pt-3 border-t border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase block font-bold tracking-wider">
                    Visiting Charge
                  </span>
                  <span className="text-base font-bold font-mono text-[#252621] dark:text-white">
                    ₹{tech.baseVisitingCharge || 199}
                  </span>
                </div>

                <Link to={`/technicians/${tech.id}`}>
                  <Button variant="primary" size="sm" className="font-bold text-xs shadow-orange-glow px-3.5 rounded-xl">
                    View Profile
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayServices.map((svc) => (
            <div
              key={svc.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{svc.rating || 4.9}</span>
                  <span className="text-stone-400 font-normal">
                    • {svc.durationMinutes || 45} mins
                  </span>
                </div>
                <h4 className="font-bold text-sm text-[#252621] dark:text-white">
                  {svc.title}
                </h4>
              </div>

              <div className="pt-3 border-t border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase block font-semibold">
                    Starting at
                  </span>
                  <span className="text-base font-bold font-mono text-[#252621] dark:text-white">
                    ₹{svc.defaultPrice}
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  className="font-bold text-xs"
                  onClick={() => {
                    setSelectedServiceForModal(svc as any);
                    setBookingModalOpen(true);
                  }}
                >
                  Book Service
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          SECTION 8: HELP & SUPPORT SHORTCUT
         ========================================================================= */}
      <div className="rounded-3xl bg-gradient-to-r from-stone-900 to-stone-950 text-white p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6 border border-stone-800">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-orange-400 border border-white/15">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>24/7 Priority Support & Escrow Guarantee</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display">
            Need urgent assistance with a mechanic or billing?
          </h3>
          <p className="text-xs sm:text-sm text-stone-400">
            JantaGaraj provides 100% price protection, verified background-checked technicians, and a 30-day service warranty on all completed doorstep jobs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="https://wa.me/918439616833"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Support</span>
          </a>

          <a
            href="tel:+918439616833"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors"
          >
            <Phone className="w-4 h-4 text-orange-400" />
            <span>Call +91 84396 16833</span>
          </a>

          <Link to="/help">
            <Button variant="secondary" size="md" className="font-bold text-xs">
              Help Center & FAQs
            </Button>
          </Link>
        </div>
      </div>

      {/* Booking Modal for 1-click booking from shortcuts */}
      {selectedServiceForModal && (
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => {
            setBookingModalOpen(false);
            setSelectedServiceForModal(null);
          }}
          service={selectedServiceForModal}
        />
      )}

      {/* Manual City Selector Modal */}
      {cityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF] dark:border-[#2B231D]">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#E87532]" />
                <h3 className="font-bold text-base font-display text-[#252621] dark:text-white">
                  Select Your City
                </h3>
              </div>
              <button
                onClick={() => setCityModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-500 dark:text-stone-400">
              Select your service city to get accurate nearby technician ETA and visiting charges:
            </p>

            <div className="grid grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {popularCities.map((city) => (
                <button
                  key={city.name}
                  onClick={() => {
                    setManualLocation(city.name, city.address, city.lat, city.lng);
                    setCityModalOpen(false);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    location.city === city.name
                      ? "border-[#E87532] bg-orange-50/50 dark:bg-orange-950/30 text-[#E87532] font-bold"
                      : "border-[#E7E5DF] dark:border-[#2B231D] hover:border-stone-400 text-[#252621] dark:text-stone-200"
                  }`}
                >
                  <p className="text-xs font-bold">{city.name}</p>
                  <p className="text-[10px] text-stone-400 truncate mt-0.5">
                    {city.address}
                  </p>
                </button>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCityModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
