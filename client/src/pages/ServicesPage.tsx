import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Clock,
  AlertCircle,
  Filter,
  X,
  SlidersHorizontal,
  Star,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  Zap,
  Droplets,
  Wind,
  Tv,
  Car,
  Check,
  CheckCircle2,
  Wrench,
  Shield,
  ArrowRight,
  Flame,
  Gauge,
  Disc,
  Fuel,
  Compass,
} from "lucide-react";
import {
  useGetCategoriesQuery,
  useGetServicesQuery,
} from "../features/services/api/servicesApi";
import { useLanguage } from "../context/LanguageContext";
import { Service } from "../types/api.types";
import { Skeleton } from "../components/ui/Skeleton";
import { BookingModal } from "../features/bookings/components/BookingModal";
import {
  getServiceImage,
  handleImageError,
  categoryFallbackImages,
  DEFAULT_FALLBACK_IMAGE,
} from "../lib/serviceImageMap";

interface ServicesPageProps {
  onOpenAuthModal?: () => void;
}

// Dynamic icon resolver for each service category
const getCategoryIcon = (slugOrId: string = "") => {
  const s = slugOrId.toLowerCase();
  if (s.includes("car") || s.includes("mechanic") || s.includes("periodic") || s.includes("denting")) return Car;
  if (s.includes("sos") || s.includes("emergency") || s.includes("battery") || s.includes("electrician")) return Zap;
  if (s.includes("two-wheeler") || s.includes("bike")) return Wrench;
  if (s.includes("brake") || s.includes("suspension") || s.includes("clutch")) return Disc;
  if (s.includes("tyre") || s.includes("wheel") || s.includes("puncture")) return Gauge;
  if (s.includes("wash") || s.includes("detailing") || s.includes("spa")) return Sparkles;
  if (s.includes("paint") || s.includes("waterproof") || s.includes("plumbing") || s.includes("ro")) return Droplets;
  if (s.includes("carpentry") || s.includes("wood")) return Wrench;
  if (s.includes("cctv") || s.includes("security")) return Shield;
  if (s.includes("ac") || s.includes("cool")) return Wind;
  if (s.includes("appliance")) return Tv;
  if (s.includes("cleaning")) return Sparkles;
  return Sparkles;
};

// Dynamic Included Checklist generator for automotive e-commerce cards
const getServiceChecklist = (service: Service): string[] => {
  const t = (service.title || "").toLowerCase();
  const cat = (service.category?.slug || service.categoryId || "").toLowerCase();

  if (t.includes("engine") || t.includes("diagnostic") || t.includes("obd")) {
    return ["OBD-II CAN-bus ECU scan", "Live sensor telemetry log", "30-Day error warranty"];
  }
  if (t.includes("brake") || t.includes("pad") || cat.includes("brake")) {
    return ["Ceramic pad inspection & fit", "Caliper slide pin lubrication", "Brake fluid level top-up"];
  }
  if (t.includes("battery") || t.includes("jumpstart")) {
    return ["Heavy-duty booster cable hookup", "Alternator diode output test", "Terminal corrosion cleaning"];
  }
  if (t.includes("oil") || t.includes("periodic") || t.includes("maintenance")) {
    return ["Synthetic engine oil drain & fill", "OEM grade oil filter swap", "40-point vehicle safety check"];
  }
  if (t.includes("ac") || cat.includes("ac")) {
    return ["High-pressure foam jet wash", "Gas leak pressure inspection", "Antimicrobial duct sanitization"];
  }
  if (t.includes("dent") || t.includes("paint")) {
    return ["Paintless dent extraction (PDR)", "3M compound scratch buffing", "Clear-coat UV seal finish"];
  }
  if (t.includes("tyre") || t.includes("wheel") || t.includes("puncture")) {
    return ["Tubeless puncture seal & patch", "Wheel balancing & pressure check", "Tread wear safety audit"];
  }
  if (cat.includes("electrician")) {
    return ["Phase & neutral load test", "MCB breaker short circuit triage", "Surge protection check"];
  }
  if (cat.includes("plumbing")) {
    return ["Acoustic pipe leak diagnosis", "Pressure valve calibration", "High-flow CPVC sealant"];
  }
  return ["Doorstep technician visit", "OEM certified replacement parts", "30-Day workmanship warranty"];
};

// Quick 1-click filter chips for the hero bar
const quickChips = [
  { id: "ALL", label: "All Services", icon: Flame },
  { id: "emergency-roadside-sos", label: "Roadside SOS", icon: Zap },
  { id: "car-periodic-maintenance", label: "Periodic Service", icon: Car },
  { id: "engine-diagnostics", label: "Engine Diagnostic", icon: Gauge },
  { id: "brakes-clutch-suspension", label: "Brake Service", icon: Disc },
  { id: "two-wheeler-repair", label: "Bike Repair", icon: Wrench },
  { id: "ac-repair", label: "AC Foam Jet", icon: Wind },
  { id: "car-denting-painting", label: "Denting & Painting", icon: Sparkles },
  { id: "tyres-wheel-care", label: "Tyres & Wheels", icon: Gauge },
];

// Realistic fallback catalog with detailed automotive & home services
const fallbackCatalog: Service[] = [
  {
    id: "srv-mech-1",
    title: "General Car Inspection & Comprehensive Engine Diagnostics",
    categoryId: "mechanic",
    category: { id: "mechanic", name: "Engine Diagnostic", slug: "engine-diagnostics" },
    defaultPrice: 899,
    description: "40-point vehicle diagnostic including engine health, coolant level, battery charge, brake pads, and tyre pressure.",
    durationMinutes: 60,
    rating: 4.95,
    reviewsCount: 312,
  },
  {
    id: "srv-mech-2",
    title: "Emergency Battery Jumpstart & Alternator Charging Test",
    categoryId: "mechanic",
    category: { id: "mechanic", name: "Roadside SOS", slug: "emergency-roadside-sos" },
    defaultPrice: 349,
    description: "Rapid on-demand doorstep jumpstart with high-capacity booster kit and comprehensive alternator output test.",
    durationMinutes: 25,
    rating: 4.96,
    reviewsCount: 428,
  },
  {
    id: "srv-mech-3",
    title: "Standard Engine Oil & Oil Filter Replacement",
    categoryId: "mechanic",
    category: { id: "mechanic", name: "Periodic Maintenance", slug: "car-periodic-maintenance" },
    defaultPrice: 1499,
    description: "Full synthetic or semi-synthetic engine oil drain and refill with genuine OEM oil filter swap.",
    durationMinutes: 50,
    rating: 4.91,
    reviewsCount: 265,
  },
  {
    id: "srv-mech-5",
    title: "Front & Rear Disc Brake Pad Replacement & Caliper Overhaul",
    categoryId: "mechanic",
    category: { id: "mechanic", name: "Brake Service", slug: "brakes-clutch-suspension" },
    defaultPrice: 599,
    description: "Ceramic / semi-metallic brake pad installation, disc rotor inspection, caliper pin lubrication, and brake fluid top-up.",
    durationMinutes: 45,
    rating: 4.89,
    reviewsCount: 172,
  },
  {
    id: "srv-mech-6",
    title: "Computerized OBD-II Engine Scanner Diagnostics & ECU Reset",
    categoryId: "mechanic",
    category: { id: "mechanic", name: "Engine Diagnostic", slug: "engine-diagnostics" },
    defaultPrice: 499,
    description: "Digital ECU fault code scanning, check-engine light clearing, sensor live-data logging, and diagnostic report.",
    durationMinutes: 30,
    rating: 4.92,
    reviewsCount: 188,
  },
  {
    id: "srv-ac-1",
    title: "Split AC Deep Foam Jet Service & Antibacterial Wash",
    categoryId: "ac-repair",
    category: { id: "ac-repair", name: "AC & Climate", slug: "ac-repair" },
    defaultPrice: 549,
    description: "High-pressure jet pump wash with indoor leakproof funnel jacket, coil degreasing, and filter sterilization.",
    durationMinutes: 45,
    rating: 4.96,
    reviewsCount: 384,
  },
  {
    id: "srv-dent-1",
    title: "Paintless Dent Removal (PDR) & Minor Body Scratch Buffing",
    categoryId: "car-denting-painting",
    category: { id: "car-denting-painting", name: "Denting & Painting", slug: "car-denting-painting" },
    defaultPrice: 799,
    description: "Vacuum extraction of minor body dings without paint damage, followed by 3M compound rubbing and high-gloss buffing.",
    durationMinutes: 60,
    rating: 4.91,
    reviewsCount: 142,
  },
  {
    id: "srv-bike-1",
    title: "Motorcycle Full General Service & Chain Sprocket Lube",
    categoryId: "two-wheeler-repair",
    category: { id: "two-wheeler-repair", name: "Two-Wheeler Care", slug: "two-wheeler-repair" },
    defaultPrice: 349,
    description: "Engine oil change, spark plug cleanup, carburetor tuning, high-pressure chain degreasing, and brake adjustment.",
    durationMinutes: 45,
    rating: 4.93,
    reviewsCount: 228,
  },
  {
    id: "srv-tyre-1",
    title: "Doorstep Tubeless Tyre Puncture Repair & Wheel Balancing",
    categoryId: "tyres-wheel-care",
    category: { id: "tyres-wheel-care", name: "Tyres & Wheels", slug: "tyres-wheel-care" },
    defaultPrice: 249,
    description: "Mushroom patch / cold plug puncture fix, digital pressure check, valve replacement, and tread depth audit.",
    durationMinutes: 25,
    rating: 4.88,
    reviewsCount: 196,
  },
];

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenAuthModal }) => {
  const { t, tc, ts, language } = useLanguage();
  const isHi = language === "hi";

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const searchFromUrl = searchParams.get("search");

  // State Management
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl || "ALL");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState<string>(searchFromUrl || "");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [instantDispatchOnly, setInstantDispatchOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Booking Modal State
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // RTK Query Hooks
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();

  const {
    data: servicesData,
    isLoading: servicesLoading,
    isError: servicesError,
    refetch,
  } = useGetServicesQuery();

  // Sync state if URL changes externally
  useEffect(() => {
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
      setCurrentPage(1);
    }
  }, [categoryFromUrl]);

  useEffect(() => {
    if (searchFromUrl !== null && searchFromUrl !== searchQuery) {
      setSearchQuery(searchFromUrl);
      setCurrentPage(1);
    }
  }, [searchFromUrl]);

  // Combine DB services with rich fallbacks so catalog is never empty
  const allServices: Service[] = useMemo(() => {
    const rawServices: Service[] =
      servicesData?.data && servicesData.data.length > 0
        ? servicesData.data
        : fallbackCatalog;

    return rawServices.map((service) => {
      const categorySlug =
        service.category?.slug ||
        categoriesData?.data?.find((c) => c.id === service.categoryId)?.slug ||
        service.categoryId;

      return {
        ...service,
        image: getServiceImage(service.title, categorySlug, service.image),
        rating: service.rating || 4.9,
        reviewsCount: service.reviewsCount || 120,
      };
    });
  }, [servicesData, categoriesData]);

  // Categories list with live counts
  const categoriesList = useMemo(() => {
    const countsMap: Record<string, number> = {};
    allServices.forEach((s) => {
      const key = s.categoryId || "other";
      countsMap[key] = (countsMap[key] || 0) + 1;
    });

    const dbCategories =
      categoriesData?.data && categoriesData.data.length > 0
        ? categoriesData.data.map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug || c.id,
            count: countsMap[c.id] || 0,
          }))
        : [
            { id: "mechanic", name: "Engine Diagnostic & Overhaul", slug: "engine-diagnostics", count: 18 },
            { id: "brakes-clutch-suspension", name: "Brake Service & Suspension", slug: "brakes-clutch-suspension", count: 12 },
            { id: "car-periodic-maintenance", name: "Periodic Maintenance", slug: "car-periodic-maintenance", count: 16 },
            { id: "emergency-roadside-sos", name: "Roadside SOS & Battery", slug: "emergency-roadside-sos", count: 14 },
            { id: "ac-repair", name: "AC Foam Jet & Climate", slug: "ac-repair", count: 10 },
            { id: "two-wheeler-repair", name: "Two-Wheeler & Bike Care", slug: "two-wheeler-repair", count: 15 },
            { id: "car-denting-painting", name: "Denting & Panel Painting", slug: "car-denting-painting", count: 9 },
            { id: "tyres-wheel-care", name: "Tyres & Wheel Care", slug: "tyres-wheel-care", count: 8 },
            { id: "electrician", name: "Electrical & Inverter", slug: "electrician", count: 11 },
            { id: "plumbing", name: "Plumbing & Hydraulics", slug: "plumbing", count: 9 },
          ];

    return [
      { id: "ALL", name: isHi ? "सभी श्रेणियां" : "All Categories", slug: "all", count: allServices.length },
      ...dbCategories,
    ];
  }, [categoriesData, allServices, isHi]);

  // Filter & Search Logic
  const filteredServices = useMemo(() => {
    return allServices
      .filter((service) => {
        // Category Filter
        if (selectedCategory !== "ALL") {
          const serviceCatId = service.categoryId || "";
          const serviceCatSlug = service.category?.slug || "";
          const target = selectedCategory.toLowerCase();

          const matchesCat =
            serviceCatId.toLowerCase() === target ||
            serviceCatSlug.toLowerCase() === target ||
            serviceCatSlug.includes(target) ||
            target.includes(serviceCatSlug);

          if (!matchesCat) return false;
        }

        // Instant Dispatch Filter
        if (instantDispatchOnly) {
          const duration = service.durationMinutes || 60;
          if (duration > 45) return false;
        }

        // Price Filter
        if (selectedPriceRange !== "ALL") {
          const price = service.defaultPrice;
          if (selectedPriceRange === "UNDER_250" && price >= 250) return false;
          if (selectedPriceRange === "250_TO_500" && (price < 250 || price > 500)) return false;
          if (selectedPriceRange === "500_TO_1000" && (price < 500 || price > 1000)) return false;
          if (selectedPriceRange === "ABOVE_1000" && price <= 1000) return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const title = (service.title || "").toLowerCase();
          const desc = (service.description || "").toLowerCase();
          const cat = (service.category?.name || "").toLowerCase();
          if (!title.includes(q) && !desc.includes(q) && !cat.includes(q)) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.defaultPrice - b.defaultPrice;
        if (sortBy === "price_desc") return b.defaultPrice - a.defaultPrice;
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        if (sortBy === "duration") return (a.durationMinutes || 45) - (b.durationMinutes || 45);
        return 0; // Default featured
      });
  }, [allServices, selectedCategory, selectedPriceRange, searchQuery, sortBy, instantDispatchOnly]);

  // Pagination Calculation
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage) || 1;
  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredServices.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredServices, currentPage, itemsPerPage]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
    if (catId === "ALL") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", catId);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const handleBookNow = (service: Service) => {
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  const resetFilters = () => {
    setSelectedCategory("ALL");
    setSelectedPriceRange("ALL");
    setSearchQuery("");
    setSortBy("featured");
    setInstantDispatchOnly(false);
    setCurrentPage(1);
    setSearchParams({}, { replace: true });
  };

  return (
    <div className="bg-[#080b11] text-slate-100 min-h-screen selection:bg-amber-500 selection:text-slate-950 font-sans relative overflow-x-hidden pb-24">
      {/* ========================================================= */}
      {/* 00 QUIET, PREMIUM LIGHTING & ATMOSPHERE                   */}
      {/* ========================================================= */}
      {/* Soft, diffuse overhead ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[460px] bg-[radial-gradient(ellipse_70%_40%_at_50%_-10%,rgba(245,158,11,0.06),transparent_70%)] pointer-events-none -z-0" />
      {/* Subtle organic grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none -z-0" />

      {/* ========================================================= */}
      {/* 01 HERO CATALOG HEADER                                    */}
      {/* ========================================================= */}
      <section className="relative z-10 pt-10 sm:pt-14 pb-8 sm:pb-10 border-b border-white/[0.06]">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-slate-300 backdrop-blur-md">
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>
                  {isHi
                    ? "ई-कॉमर्स ऑटोमोटिव सर्विस कैटलॉग"
                    : "Automotive Service Marketplace · Standard Rate Cards"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                {isHi ? (
                  <>
                    पारदर्शी तय दरों पर{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">
                      सत्यापित सेवाएं
                    </span>
                  </>
                ) : (
                  <>
                    Verified automotive services with{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">
                      upfront rates.
                    </span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
                {isHi
                  ? "इंजन डायग्नोस्टिक्स, ब्रेक ओवरहाल और नियमित रखरखाव। प्रत्येक सर्विस में शामिल कार्य, समय और तय दरें पारदर्शी रूप से देखें।"
                  : "Compare transparent checklist inclusions, estimated durations, and pre-published pricing. 100% inspection fee credited upon repair."}
              </p>
            </div>

            {/* Quick Search Bar */}
            <div className="w-full md:w-80 lg:w-96">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={
                    isHi
                      ? "सेवा, लक्षण या समस्या खोजें..."
                      : "Search by service, issue, or keyword..."
                  }
                  className="w-full pl-10 pr-9 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-full text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/60 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Category Chips Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
            {quickChips.map((chip) => {
              const isSelected =
                (chip.id === "ALL" && selectedCategory === "ALL") ||
                selectedCategory.toLowerCase() === chip.id.toLowerCase();
              const IconComp = chip.icon;
              return (
                <button
                  key={chip.id}
                  onClick={() => handleCategoryChange(chip.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? "bg-amber-500 text-slate-950 font-semibold shadow-sm"
                      : "bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.04]"
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 02 NATURAL METRICS STRIP                                  */}
      {/* ========================================================= */}
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl bg-[#0d121c]/50 border border-white/[0.06]">
          <div className="space-y-0.5">
            <span className="text-lg sm:text-xl font-bold font-mono text-cyan-400">
              100+ Rates
            </span>
            <p className="text-xs text-slate-300 font-medium">
              {isHi ? "पूर्व-प्रकाशित मानक दरें" : "Pre-Published Rate Cards"}
            </p>
            <p className="text-[11px] text-slate-500">
              {isHi ? "शून्य अप्रत्याशित ओवरचार्जिंग" : "Zero arbitrary hidden fees"}
            </p>
          </div>

          <div className="space-y-0.5">
            <span className="text-lg sm:text-xl font-bold font-mono text-amber-400">
              &lt; 28 min
            </span>
            <p className="text-xs text-slate-300 font-medium">
              {isHi ? "औसत डोरस्टेप डिस्पैच SLA" : "Average Doorstep Dispatch"}
            </p>
            <p className="text-[11px] text-slate-500">
              {isHi ? "निकटतम जीपीएस मैकेनिक मैच" : "Proximity radar routing"}
            </p>
          </div>

          <div className="space-y-0.5">
            <span className="text-lg sm:text-xl font-bold font-mono text-white">
              30-Day SLA
            </span>
            <p className="text-xs text-slate-300 font-medium">
              {isHi ? "लिखित कारीगरी वारंटी" : "Workmanship Guarantee"}
            </p>
            <p className="text-[11px] text-slate-500">
              {isHi ? "पुनरावृत्ति पर फ्री री-विज़िट" : "Free re-inspection on faults"}
            </p>
          </div>

          <div className="space-y-0.5">
            <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400">
              100% KYC
            </span>
            <p className="text-xs text-slate-300 font-medium">
              {isHi ? "पुलिस व आधार सत्यापित फ्लीट" : "Audited Certified Fleet"}
            </p>
            <p className="text-[11px] text-slate-500">
              {isHi ? "4.92 औसत रेटिंग" : "4.92 average pro rating"}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 03 TWO-COLUMN DESKTOP MARKETPLACE LAYOUT                  */}
      {/* ========================================================= */}
      <div className="max-w-[1560px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-slate-200"
          >
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {t("common.filters")}{" "}
              {selectedCategory !== "ALL" || selectedPriceRange !== "ALL"
                ? ` • ${t("servicesPage.active")}`
                : ""}
            </span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">{t("common.sort")}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0d121c] border border-white/[0.08] rounded-xl px-2.5 py-1 text-xs font-medium text-slate-200 focus:outline-none"
            >
              <option value="featured">{t("servicesPage.featured")}</option>
              <option value="price_asc">{t("servicesPage.priceLowHigh")}</option>
              <option value="price_desc">{t("servicesPage.priceHighLow")}</option>
              <option value="rating">{t("servicesPage.rating")}</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start relative">
          {/* ========================================================= */}
          {/* LEFT SIDEBAR: STICKY CATEGORY & BUDGET FILTER BAR        */}
          {/* ========================================================= */}
          <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24 self-start z-20">
            <div className="p-6 rounded-3xl bg-[#0d121c]/70 border border-white/[0.06] backdrop-blur-md shadow-xl space-y-6 max-h-[calc(100vh-7.5rem)] overflow-y-auto scrollbar-thin">
              {/* Filter Header & Reset */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300">
                    <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white">
                      {isHi ? "फिल्टर व श्रेणियां" : "Service Categories"}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {filteredServices.length} {isHi ? "सेवाएं उपलब्ध" : "active rates"}
                    </p>
                  </div>
                </div>

                {(selectedCategory !== "ALL" ||
                  selectedPriceRange !== "ALL" ||
                  instantDispatchOnly ||
                  searchQuery) && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{t("common.clear")}</span>
                  </button>
                )}
              </div>

              {/* Instant Proximity Dispatch Toggle Card */}
              <div
                onClick={() => setInstantDispatchOnly(!instantDispatchOnly)}
                className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                  instantDispatchOnly
                    ? "bg-emerald-500/10 border-emerald-500/30 shadow-[0_4px_16px_rgba(16,185,129,0.15)]"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        {isHi ? "< 28 मिनट त्वरित डिस्पैच" : "Rapid < 28 Min Dispatch"}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {isHi ? "केवल तत्काल उपलब्ध सेवाएं" : "Immediate triage ready"}
                      </p>
                    </div>
                  </div>

                  {/* Switch Pill */}
                  <div
                    className={`w-8 h-4.5 rounded-full transition-colors relative flex items-center p-0.5 ${
                      instantDispatchOnly
                        ? "bg-emerald-500 justify-end"
                        : "bg-white/[0.1] justify-start"
                    }`}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
              </div>

              {/* Sticky Categories List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {isHi ? "ऑटोमोटिव श्रेणियां" : "Automotive Specialties"}
                  </h4>
                  <span className="text-[10px] text-slate-500">
                    {categoriesList.length}
                  </span>
                </div>

                <div className="space-y-1">
                  {categoriesList.map((cat) => {
                    const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
                    const IconComp = getCategoryIcon(cat.slug || cat.id);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 group ${
                          isSelected
                            ? "bg-amber-500 text-slate-950 font-semibold shadow-[0_4px_16px_rgba(245,158,11,0.25)]"
                            : "text-slate-300 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <IconComp
                            className={`w-3.5 h-3.5 shrink-0 transition-transform group-hover:scale-105 ${
                              isSelected ? "text-slate-950" : "text-amber-400"
                            }`}
                          />
                          <span className="truncate">{tc(cat.name)}</span>
                        </div>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ml-2 shrink-0 ${
                            isSelected
                              ? "bg-black/20 text-slate-950"
                              : "bg-white/[0.04] text-slate-400 group-hover:text-white"
                          }`}
                        >
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-2.5 pt-3 border-t border-white/[0.06]">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {isHi ? "मूल्य दायरा" : "Price Range"}
                </h4>
                <div className="grid grid-cols-1 gap-1.5 text-xs">
                  {[
                    { id: "ALL", label: isHi ? "सभी दरें" : "All Budgets" },
                    { id: "UNDER_250", label: isHi ? "₹250 से कम" : "Under ₹250" },
                    { id: "250_TO_500", label: "₹250 - ₹500" },
                    { id: "500_TO_1000", label: "₹500 - ₹1,000" },
                    { id: "ABOVE_1000", label: isHi ? "₹1,000 से अधिक" : "Above ₹1,000" },
                  ].map((range) => {
                    const isSelected = selectedPriceRange === range.id;
                    return (
                      <button
                        key={range.id}
                        type="button"
                        onClick={() => {
                          setSelectedPriceRange(range.id);
                          setCurrentPage(1);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-white/[0.06] text-white border border-amber-500/40"
                            : "bg-white/[0.02] border border-transparent text-slate-400 hover:text-white hover:bg-white/[0.04]"
                        }`}
                      >
                        <span>{range.label}</span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quality Guarantee Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/[0.06] space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{isHi ? "100% विज़िट शुल्क समायोजन" : "Fee Credited On Repair"}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {isHi
                    ? "यदि आप रिपेयर कराते हैं, तो ₹149 का इंस्पेक्शन शुल्क अंतिम बिल में पूरा काट लिया जाता है।"
                    : "The standard ₹149 doorstep inspection fee is 100% deducted from your final repair invoice."}
                </p>
                <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-slate-400">
                  <span>✓ 30-Day SLA</span>
                  <span>✓ Genuine OEM Parts</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* RIGHT SIDE: RICH AUTOMOTIVE SERVICE CARDS GRID            */}
          {/* ========================================================= */}
          <main className="flex-1 min-w-0 space-y-6">
            {/* Toolbar: Result Counts & Sorting */}
            <div className="p-4 rounded-2xl bg-[#0d121c]/70 border border-white/[0.06] backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="text-slate-400 font-medium">
                  {isHi ? "प्रदर्शित सेवाएं:" : "Showing"}{" "}
                  <strong className="text-white font-semibold">
                    {filteredServices.length}
                  </strong>{" "}
                  {isHi ? "सेवाएं" : "services"}
                </span>

                {selectedCategory !== "ALL" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] text-slate-200 border border-white/[0.08] text-[11px] font-medium">
                    {tc(categoriesList.find((c) => c.id === selectedCategory)?.name || selectedCategory)}
                    <button
                      onClick={() => handleCategoryChange("ALL")}
                      className="hover:text-red-400 ml-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {selectedPriceRange !== "ALL" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] text-slate-200 border border-white/[0.08] text-[11px] font-medium">
                    {selectedPriceRange.replace(/_/g, " ")}
                    <button
                      onClick={() => setSelectedPriceRange("ALL")}
                      className="hover:text-red-400 ml-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {instantDispatchOnly && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    &lt; 28 Min Rapid
                    <button
                      onClick={() => setInstantDispatchOnly(false)}
                      className="hover:text-red-400 ml-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
              </div>

              {/* Desktop Sort Options */}
              <div className="hidden lg:flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">{t("common.sort")}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#080b11] border border-white/[0.08] rounded-xl px-3 py-1.5 text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-400/50 transition-colors"
                >
                  <option value="featured">{t("servicesPage.featured")}</option>
                  <option value="price_asc">{t("servicesPage.priceLowHigh")}</option>
                  <option value="price_desc">{t("servicesPage.priceHighLow")}</option>
                  <option value="rating">{t("servicesPage.rating")}</option>
                  <option value="duration">Fastest Duration</option>
                </select>
              </div>
            </div>

            {/* Services Grid States */}
            {servicesLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="p-5 rounded-3xl bg-[#0d121c]/50 border border-white/[0.06] space-y-4"
                  >
                    <Skeleton className="h-44 w-full rounded-2xl bg-white/[0.03]" />
                    <Skeleton className="h-5 w-3/4 bg-white/[0.03]" />
                    <Skeleton className="h-4 w-full bg-white/[0.03]" />
                    <div className="flex justify-between items-center pt-3 border-t border-white/[0.06]">
                      <Skeleton className="h-6 w-20 bg-white/[0.03]" />
                      <Skeleton className="h-8 w-24 rounded-full bg-white/[0.03]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : servicesError && allServices.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-[#0d121c]/50 border border-rose-500/20 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Unable to connect to service catalog
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto font-normal">
                  Check network connection or click retry to reload standardized rate cards.
                </p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-all shadow-[0_4px_16px_rgba(245,158,11,0.25)]"
                >
                  {t("servicesPage.retry")}
                </button>
              </div>
            ) : paginatedServices.length > 0 ? (
              /* Rich Automotive Service Cards (E-Commerce Style with Checklist & Fast Book) */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedServices.map((service) => {
                  const checklist = getServiceChecklist(service);
                  return (
                    <div
                      key={service.id}
                      className="p-5 rounded-3xl bg-[#0d121c]/70 border border-white/[0.06] hover:border-white/[0.16] hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex flex-col justify-between group relative overflow-hidden"
                    >
                      <div>
                        {/* Service Card Thumbnail */}
                        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-[#080b11] mb-4">
                          <img
                            src={service.image || DEFAULT_FALLBACK_IMAGE}
                            alt={service.title}
                            onError={handleImageError}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#080b11]/90 via-[#080b11]/25 to-transparent pointer-events-none" />

                          {/* Top-Left Verified Pro Badge */}
                          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white flex items-center gap-1.5 shadow-sm">
                            <ShieldCheck className="w-3 h-3 text-amber-400" />
                            <span>100% KYC</span>
                          </div>

                          {/* Top-Right Rating Pill */}
                          <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-white flex items-center gap-1 shadow-sm">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{service.rating || 4.9}</span>
                            <span className="text-slate-400 font-normal text-[10px]">
                              ({service.reviewsCount || 120})
                            </span>
                          </div>

                          {/* Bottom Duration Badge Over Image */}
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
                            <span className="text-[10px] font-medium uppercase tracking-wide text-white bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-0.5 rounded-full shadow-sm truncate max-w-[65%]">
                              {tc(service.category?.name || "Automotive")}
                            </span>
                            <div className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-slate-300 font-medium flex items-center gap-1 border border-white/10 shrink-0">
                              <Clock className="w-3 h-3 text-cyan-400" />
                              <span>{service.durationMinutes || 45} mins</span>
                            </div>
                          </div>
                        </div>

                        {/* Service Title */}
                        <Link
                          to={`/services/${service.id}`}
                          className="block text-base font-semibold text-white group-hover:text-amber-400 transition-colors leading-snug tracking-tight line-clamp-1"
                        >
                          {ts(service.title)}
                        </Link>

                        {/* Description */}
                        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Rich E-Commerce Included Checklist */}
                        <div className="mt-3.5 pt-3 border-t border-white/[0.04] space-y-1.5 bg-white/[0.015] p-3 rounded-2xl border border-white/[0.03]">
                          <span className="text-[10px] uppercase font-mono font-semibold tracking-wider text-slate-400 block">
                            {isHi ? "शामिल कार्य (What's Included):" : "Included in this Service:"}
                          </span>
                          <ul className="space-y-1">
                            {checklist.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-300 truncate">
                                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                                <span className="truncate">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Card Footer: Transparent Price & 'Book Now' Button */}
                      <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="text-[10px] uppercase font-medium tracking-wider text-slate-500 block">
                            {isHi ? "तय रेट (जीएसटी सहित)" : "Upfront Rate"}
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold font-mono text-white">
                              ₹{service.defaultPrice}
                            </span>
                            <span className="text-[10px] text-emerald-400 font-medium hidden sm:inline">
                              · 100% offset
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Link
                            to={`/services/${service.id}`}
                            className="hidden xl:inline-flex text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-full hover:bg-white/[0.04] transition-colors"
                          >
                            Details
                          </Link>

                          {/* Generous Padding on Pill Button to Prevent Text Clipping */}
                          <button
                            type="button"
                            onClick={() => handleBookNow(service)}
                            className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs tracking-wide shadow-[0_4px_16px_rgba(245,158,11,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
                          >
                            <span>{t("common.bookNow")}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty Search / Filter State */
              <div className="p-12 text-center rounded-3xl bg-[#0d121c]/50 border border-white/[0.06] space-y-4">
                <Search className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  {t("servicesPage.noResults")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                  {t("servicesPage.noResultsDesc")}
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-all shadow-[0_4px_16px_rgba(245,158,11,0.25)]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t("servicesPage.clearFilters")}</span>
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-6 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5 text-xs font-mono">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        currentPage === page
                          ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                          : "bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] border border-white/[0.04]"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE FILTER MODAL DRAWER                                */}
      {/* ========================================================= */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end lg:hidden">
          <div className="w-full max-w-xs bg-[#080b11] h-full p-6 border-l border-white/[0.08] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <h3 className="font-semibold text-sm text-white">
                {t("common.filters")}
              </h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase font-mono font-semibold text-slate-400">
                Categories
              </h4>
              <div className="space-y-1">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      handleCategoryChange(cat.id);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? "bg-amber-500 text-slate-950 font-semibold"
                        : "text-slate-300 hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{tc(cat.name)}</span>
                    <span className="text-[10px] opacity-75">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Reset Action */}
            <div className="pt-4 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-semibold text-slate-200"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Dialog Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        service={selectedService}
        onRequireAuth={onOpenAuthModal}
      />
    </div>
  );
};
