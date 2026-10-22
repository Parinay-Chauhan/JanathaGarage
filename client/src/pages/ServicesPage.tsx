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
  Wrench,
  Shield,
  ArrowRight,
  Flame,
} from "lucide-react";
import {
  useGetCategoriesQuery,
  useGetServicesQuery,
} from "../features/services/api/servicesApi";
import { useLanguage } from "../context/LanguageContext";
import { Service } from "../types/api.types";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";
import { BookingModal } from "../features/bookings/components/BookingModal";
import {
  getServiceImage,
  handleImageError,
  categoryFallbackImages,
  compressImageUrl,
} from "../lib/serviceImageMap";

interface ServicesPageProps {
  onOpenAuthModal?: () => void;
}

const categoryImages = categoryFallbackImages;

// Dynamic icon resolver for each service category
const getCategoryIcon = (slugOrId: string = "") => {
  const s = slugOrId.toLowerCase();
  if (s.includes("car") || s.includes("mechanic") || s.includes("periodic") || s.includes("denting")) return Car;
  if (s.includes("sos") || s.includes("emergency") || s.includes("battery") || s.includes("electrician")) return Zap;
  if (s.includes("two-wheeler") || s.includes("bike")) return Wrench;
  if (s.includes("brake") || s.includes("suspension") || s.includes("clutch")) return ShieldCheck;
  if (s.includes("tyre") || s.includes("wheel") || s.includes("puncture")) return ShieldCheck;
  if (s.includes("wash") || s.includes("detailing") || s.includes("spa")) return Sparkles;
  if (s.includes("paint") || s.includes("waterproof") || s.includes("plumbing") || s.includes("ro")) return Droplets;
  if (s.includes("carpentry") || s.includes("wood")) return Wrench;
  if (s.includes("cctv") || s.includes("security")) return Shield;
  if (s.includes("ac") || s.includes("cool")) return Wind;
  if (s.includes("appliance")) return Tv;
  if (s.includes("cleaning")) return Sparkles;
  return Sparkles;
};

// Quick 1-click filter chips for the hero bar
const quickChips = [
  { id: "ALL", label: "All Services", icon: Flame },
  { id: "emergency-roadside-sos", label: "Roadside SOS", icon: Zap },
  { id: "car-periodic-maintenance", label: "Car Service", icon: Car },
  { id: "two-wheeler-repair", label: "Bike Repair", icon: Wrench },
  { id: "tyres-wheel-care", label: "Tyres & Puncture", icon: ShieldCheck },
  { id: "detailing-wash-spa", label: "Wash & Spa", icon: Sparkles },
  { id: "brakes-clutch-suspension", label: "Brakes & Clutch", icon: ShieldCheck },
  { id: "ac-repair", label: "AC Repair", icon: Wind },
  { id: "electrician", label: "Electrician", icon: Zap },
  { id: "plumbing", label: "Plumbing", icon: Droplets },
];

// Realistic fallback catalog with detailed metadata
const fallbackCatalog: Service[] = [
  {
    id: "srv-1",
    title: "General Car Inspection & Comprehensive Engine Check",
    categoryId: "mechanic",
    category: { id: "mechanic", name: "Auto Service", slug: "mechanic" },
    defaultPrice: 899,
    description:
      "40-point vehicle diagnostic including engine health, coolant, battery charge, brake pads, and tyre pressure.",
    durationMinutes: 60,
    rating: 4.9,
    reviewsCount: 218,
    image: categoryImages.mechanic,
  },
  {
    id: "srv-2",
    title: "Emergency Battery Jumpstart & Alternator Test",
    categoryId: "mechanic",
    category: { id: "mechanic", name: "Auto Service", slug: "mechanic" },
    defaultPrice: 349,
    description:
      "Rapid on-demand doorstep jumpstart with high-capacity booster kit and comprehensive alternator output test.",
    durationMinutes: 25,
    rating: 4.95,
    reviewsCount: 312,
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=480&q=70&fm=webp",
  },
  {
    id: "srv-3",
    title: "Split AC Deep Foam Jet Service & Antibacterial Wash",
    categoryId: "ac-repair",
    category: { id: "ac-repair", name: "AC Repair", slug: "ac-repair" },
    defaultPrice: 549,
    description:
      "High-pressure jet pump wash with indoor leakproof funnel jacket, coil degreasing, and filter sterilization.",
    durationMinutes: 45,
    rating: 4.88,
    reviewsCount: 184,
    image: categoryImages["ac-repair"],
  },
  {
    id: "srv-4",
    title: "Complete Home Electrical Short Circuit Triage & MCB Fix",
    categoryId: "electrician",
    category: { id: "electrician", name: "Electrician", slug: "electrician" },
    defaultPrice: 249,
    description:
      "Testing of phase, neutral, earthing, and tripped breakers using digital insulation testers.",
    durationMinutes: 35,
    rating: 4.92,
    reviewsCount: 167,
    image: categoryImages.electrician,
  },
  {
    id: "srv-5",
    title: "Concealed Pipe Leak Detection & Tap Mixer Replacement",
    categoryId: "plumbing",
    category: { id: "plumbing", name: "Plumbing", slug: "plumbing" },
    defaultPrice: 199,
    description:
      "Non-invasive moisture testing, ceramic disc cartridge replacement, and high-pressure leak sealing.",
    durationMinutes: 40,
    rating: 4.85,
    reviewsCount: 142,
    image: categoryImages.plumbing,
  },
  {
    id: "srv-6",
    title: "Fully Automatic Washing Machine Motor & Drain Repair",
    categoryId: "appliance",
    category: { id: "appliance", name: "Appliance", slug: "appliance" },
    defaultPrice: 399,
    description:
      "Doorstep repair for spin drum vibration, drain valve blockage, error code diagnosis, and inlet solenoids.",
    durationMinutes: 50,
    rating: 4.86,
    reviewsCount: 96,
    image: categoryImages.appliance,
  },
  {
    id: "srv-7",
    title: "Home Deep Cleaning & Kitchen Degreasing Package",
    categoryId: "cleaning",
    category: { id: "cleaning", name: "Deep Cleaning", slug: "cleaning" },
    defaultPrice: 799,
    description:
      "Single-disc scrubbing of tiles, chimney degreasing, stainless steel buffing, and high-grade sanitizer wipe down.",
    durationMinutes: 90,
    rating: 4.91,
    reviewsCount: 220,
    image: categoryImages.cleaning,
  },
  {
    id: "srv-8",
    title: "Doorstep Bike Oil Change & Brake Pad Replacement",
    categoryId: "mechanic",
    category: { id: "mechanic", name: "Auto Service", slug: "mechanic" },
    defaultPrice: 299,
    description:
      "Premium synthetic engine oil refill, chain cleaning & lubrication, drum/disc brake pad tuning.",
    durationMinutes: 35,
    rating: 4.94,
    reviewsCount: 189,
    image:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=480&q=70&fm=webp",
  },
  {
    id: "srv-9",
    title: "Ceiling Fan Installation & Regulator Switch Wiring",
    categoryId: "electrician",
    category: { id: "electrician", name: "Electrician", slug: "electrician" },
    defaultPrice: 179,
    description:
      "Safe ceiling anchor drilling, modular switchboard connection, capacitor test, and speed regulator tuning.",
    durationMinutes: 30,
    rating: 4.87,
    reviewsCount: 110,
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=480&q=70&fm=webp",
  },
  {
    id: "srv-10",
    title: "Wall Dampness Treatment & Anti-Fungal Waterproofing",
    categoryId: "painting",
    category: { id: "painting", name: "Painting & Waterproofing", slug: "painting" },
    defaultPrice: 1799,
    description:
      "Deep moisture reading, wall efflorescence scrap, multi-layer polymer base coat, and waterproof barrier paint.",
    durationMinutes: 90,
    rating: 4.93,
    reviewsCount: 145,
    image: categoryImages.painting,
  },
  {
    id: "srv-11",
    title: "Door Lock, Handle & Concealed Hinge Repair",
    categoryId: "carpentry",
    category: { id: "carpentry", name: "Carpentry & Woodwork", slug: "carpentry" },
    defaultPrice: 249,
    description:
      "Heavy-duty mortise lock fixing, soft-close hydraulic cabinet hinge alignment, and striker plate repositioning.",
    durationMinutes: 40,
    rating: 4.89,
    reviewsCount: 132,
    image: categoryImages.carpentry,
  },
  {
    id: "srv-12",
    title: "Doorstep HD CCTV Camera Installation & Mobile App Config",
    categoryId: "cctv-security",
    category: { id: "cctv-security", name: "CCTV & Smart Security", slug: "cctv-security" },
    defaultPrice: 499,
    description:
      "Neat coaxial/Cat6 cable casing, night-vision infrared camera mounting, DVR network routing, and phone app streaming.",
    durationMinutes: 60,
    rating: 4.96,
    reviewsCount: 88,
    image: categoryImages["cctv-security"],
  },
  {
    id: "srv-13",
    title: "Comprehensive RO Service & Multi-Stage Filter Replacement",
    categoryId: "ro-water-purifier",
    category: { id: "ro-water-purifier", name: "RO Water Purifier Care", slug: "ro-water-purifier" },
    defaultPrice: 349,
    description:
      "Sediment filter backwash, activated carbon cartridge swap, membrane pressure check, and digital TDS calibration.",
    durationMinutes: 45,
    rating: 4.91,
    reviewsCount: 164,
    image: categoryImages["ro-water-purifier"],
  },
  {
    id: "srv-14",
    title: "Paintless Dent Removal & Minor Scratch Buffing",
    categoryId: "car-denting-painting",
    category: { id: "car-denting-painting", name: "Car Denting & Painting", slug: "car-denting-painting" },
    defaultPrice: 799,
    description:
      "High-precision metal rod PDR technique for door and fender dings without harming original factory paint finish.",
    durationMinutes: 60,
    rating: 4.9,
    reviewsCount: 204,
    image: categoryImages["car-denting-painting"],
  },
  {
    id: "srv-15",
    title: "Windshield Crack Resin Repair & Headlight Polish",
    categoryId: "windshield-lights-care",
    category: { id: "windshield-lights-care", name: "Windshield & Glass Care", slug: "windshield-lights-care" },
    defaultPrice: 399,
    description:
      "Vacuum UV optical resin injection for stone-chip star cracks and dual-stage abrasive buffing for yellowed headlight lenses.",
    durationMinutes: 40,
    rating: 4.88,
    reviewsCount: 97,
    image: categoryImages["windshield-lights-care"],
  },
];

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenAuthModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state synchronization
  const initialCategory = searchParams.get("category") || "ALL";
  const initialSearch = searchParams.get("search") || "";

  const { t, tc, ts, language } = useLanguage();

  // Local filter states
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("ALL");
  const [instantDispatchOnly, setInstantDispatchOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 15;

  // Selected service for booking modal
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Sync state if URL changes externally
  useEffect(() => {
    const cat = searchParams.get("category") || "ALL";
    const srch = searchParams.get("search") || "";
    setSelectedCategory(cat);
    setSearchQuery(srch);
  }, [searchParams]);

  // Backend API query
  const {
    data: categoriesData,
    isLoading: catLoading,
  } = useGetCategoriesQuery();

  const {
    data: servicesData,
    isLoading: servicesLoading,
    isError: servicesError,
    refetch,
  } = useGetServicesQuery({
    categoryId: selectedCategory !== "ALL" ? selectedCategory : undefined,
  });

  // Base services pool (API data or rich fallback catalog)
  const allServices: Service[] = useMemo(() => {
    if (servicesData?.data && servicesData.data.length > 0) {
      return servicesData.data.map((srv, idx) => ({
        ...srv,
        description:
          srv.description ||
          "Professional doorstep execution by verified local technicians with genuine parts and standardized post-service inspection.",
        durationMinutes: srv.durationMinutes || 45,
        rating: srv.rating || 4.9,
        reviewsCount: srv.reviewsCount || 100 + idx * 15,
        image: getServiceImage(srv.title, srv.category?.slug, srv.image),
      }));
    }
    return fallbackCatalog.map((srv) => ({
      ...srv,
      image: getServiceImage(srv.title, srv.category?.slug, srv.image),
    }));
  }, [servicesData]);

  // Categories list
  const categoriesList = useMemo(() => {
    if (categoriesData?.data && categoriesData.data.length > 0) {
      return [
        { id: "ALL", name: "All Categories", count: allServices.length },
        ...categoriesData.data.map((c) => ({
          id: c.id,
          name: c.name,
          count: allServices.filter(
            (s) => s.categoryId === c.id || s.category?.id === c.id
          ).length,
        })),
      ];
    }
    return [
      { id: "ALL", name: "All Categories", count: fallbackCatalog.length },
      { id: "mechanic", name: "Auto & Garage Repair", count: 3 },
      { id: "electrician", name: "Electrician", count: 2 },
      { id: "plumbing", name: "Plumbing", count: 1 },
      { id: "ac-repair", name: "AC Repair & Service", count: 1 },
      { id: "appliance", name: "Appliance Repair", count: 1 },
      { id: "cleaning", name: "Deep Cleaning", count: 1 },
      { id: "painting", name: "Painting & Waterproofing", count: 1 },
      { id: "carpentry", name: "Carpentry & Woodwork", count: 1 },
      { id: "cctv-security", name: "CCTV & Smart Security", count: 1 },
      { id: "ro-water-purifier", name: "RO Water Purifier Care", count: 1 },
      { id: "car-denting-painting", name: "Car Denting & Painting", count: 1 },
      { id: "windshield-lights-care", name: "Windshield & Glass Care", count: 1 },
    ];
  }, [categoriesData, allServices]);

  // Handler for category selection
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
    if (catId === "ALL") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", catId);
    }
    setSearchParams(searchParams);
  };

  // Handler for search submit
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    if (query.trim()) {
      searchParams.set("search", query.trim());
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("ALL");
    setSearchQuery("");
    setSelectedPriceRange("ALL");
    setInstantDispatchOnly(false);
    setSortBy("featured");
    setCurrentPage(1);
    setSearchParams({});
  };

  // Filtered and sorted services
  const filteredServices = useMemo(() => {
    return allServices
      .filter((srv) => {
        // Category filter
        if (selectedCategory !== "ALL") {
          const matchCatId = srv.categoryId === selectedCategory;
          const matchSlug =
            srv.category?.slug?.toLowerCase() === selectedCategory.toLowerCase();
          const matchName =
            srv.category?.name?.toLowerCase() === selectedCategory.toLowerCase();
          if (!matchCatId && !matchSlug && !matchName) return false;
        }

        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const titleMatch = srv.title.toLowerCase().includes(q);
          const descMatch = (srv.description || "").toLowerCase().includes(q);
          const catMatch = (srv.category?.name || "").toLowerCase().includes(q);
          if (!titleMatch && !descMatch && !catMatch) return false;
        }

        // Price range filter
        const price = Number(srv.defaultPrice);
        if (selectedPriceRange === "UNDER_250" && price >= 250) return false;
        if (
          selectedPriceRange === "250_TO_500" &&
          (price < 250 || price > 500)
        )
          return false;
        if (
          selectedPriceRange === "500_TO_1000" &&
          (price < 500 || price > 1000)
        )
          return false;
        if (selectedPriceRange === "ABOVE_1000" && price <= 1000) return false;

        // Instant dispatch filter
        if (instantDispatchOnly && (srv.durationMinutes || 0) > 40) return false;

        return true;
      })
      .sort((a, b) => {
        const priceA = Number(a.defaultPrice);
        const priceB = Number(b.defaultPrice);
        if (sortBy === "price_asc") return priceA - priceB;
        if (sortBy === "price_desc") return priceB - priceA;
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        if (sortBy === "duration")
          return (a.durationMinutes || 0) - (b.durationMinutes || 0);
        return 0; // featured default
      });
  }, [
    allServices,
    selectedCategory,
    searchQuery,
    selectedPriceRange,
    instantDispatchOnly,
    sortBy,
  ]);

  // Paginated items
  const totalPages = Math.ceil(filteredServices.length / pageSize) || 1;
  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredServices.slice(startIndex, startIndex + pageSize);
  }, [filteredServices, currentPage, pageSize]);

  return (
    <div className="relative bg-[#F8F7F3] dark:bg-[#070605] text-[#252621] dark:text-[#F5F2EB] min-h-screen pb-24 transition-colors">
      {/* Ambient Top Glow Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1560px] h-96 bg-gradient-to-b from-[#FF771C]/15 via-[#FF771C]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* ========================================================= */}
      {/* 01 BREADCRUMB & HERO HEADER SECTION                       */}
      {/* ========================================================= */}
      <div className="border-b border-[#E7E5DF] dark:border-[#221B16] bg-white/60 dark:bg-[#120F0D]/70 backdrop-blur-md relative z-10">
        <div className="max-w-[1560px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-[#717167] dark:text-[#9E9488]">
            <Link to="/" className="hover:text-[#FF771C] transition-colors">
              {t("common.home")}
            </Link>
            <span>/</span>
            <span className="text-[#FF771C] font-semibold">
              {t("servicesPage.allServices")}
            </span>
          </nav>

          {/* Title Badge & Heading Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF771C]/10 dark:bg-[#FF771C]/15 border border-[#FF771C]/30 text-[#FF771C] text-xs font-bold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#FF771C]" />
                <span>
                  {language === "hi"
                    ? "सत्यापित मैकेनिक व पेशेवर तकनीशियन"
                    : "Standardized Doorstep & Emergency Services"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-[#252621] dark:text-[#F5F2EB] leading-[1.2]">
                {language === "hi" ? "विश्वसनीय होम व ऑटो " : "Reliable Home & Auto "}
                <span className="bg-gradient-to-r from-[#FF771C] via-[#FFA463] to-[#FF771C] bg-clip-text text-transparent">
                  {language === "hi" ? "रिपेयर सेवाएं" : "Repair Services"}
                </span>
              </h1>

              <p className="text-sm text-[#717167] dark:text-[#A89E92] leading-relaxed">
                {t("servicesPage.headerSubtitle")}
              </p>
            </div>

            {/* Glowing Top Search Input */}
            <div className="w-full lg:w-96">
              <div className="relative group">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#FF771C] pointer-events-none transition-transform group-focus-within:scale-110" />
                <input
                  type="text"
                  placeholder={t("servicesPage.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-[#181411] border border-[#E7E5DF] dark:border-[#2D241E] text-xs sm:text-sm text-[#252621] dark:text-[#F5F2EB] placeholder:text-[#8F8F85] focus:outline-none focus:ring-4 focus:ring-[#FF771C]/15 focus:border-[#FF771C] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#8F8F85] hover:text-[#252621] dark:hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Category Chips Strip */}
          <div className="pt-2 border-t border-[#E7E5DF]/60 dark:border-[#221B16] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {quickChips.map((chip) => {
              const Icon = chip.icon;
              const isActive = selectedCategory === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => handleCategoryChange(chip.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#FF771C] to-[#E56814] text-white shadow-[0_4px_16px_rgba(255,119,28,0.4)] scale-[1.03]"
                      : "bg-white/80 dark:bg-[#181411] text-[#717167] dark:text-[#9E9488] hover:text-[#252621] dark:hover:text-white border border-[#E7E5DF] dark:border-[#2B231D] hover:border-[#FF771C]/40"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#FF771C]"}`} />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Layout: Left Filters Sidebar + Right Grid */}
      <div className="max-w-[1560px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Mobile Filter Toggle & Sort Header */}
        <div className="lg:hidden flex items-center justify-between pb-4 mb-4 border-b border-[#E7E5DF] dark:border-[#2B231D]">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Filter className="w-4 h-4 text-[#E87532]" />}
            onClick={() => setMobileFilterOpen(true)}
            className="text-xs font-bold"
          >
            {t("common.filters")}{" "}
            {selectedCategory !== "ALL" || selectedPriceRange !== "ALL"
              ? ` • ${t("servicesPage.active")}`
              : ""}
          </Button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#717167]">{t("common.sort")}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] rounded-lg px-2.5 py-1 text-xs font-semibold text-[#252621] dark:text-[#F5F2EB] focus:outline-none"
            >
              <option value="featured">{t("servicesPage.featured")}</option>
              <option value="price_asc">{t("servicesPage.priceLowHigh")}</option>
              <option value="price_desc">{t("servicesPage.priceHighLow")}</option>
              <option value="rating">{t("servicesPage.rating")}</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start relative">
          {/* ========================================================= */}
          {/* 02 LEFT FILTERS SIDEBAR (Desktop) - STICKY                */}
          {/* ========================================================= */}
          <aside className="hidden lg:block w-56 xl:w-64 shrink-0 sticky top-20 self-start z-20">
            <div className="p-4.5 sm:p-5 rounded-3xl bg-white/95 dark:bg-[#14100D]/95 backdrop-blur-xl border border-[#E7E5DF] dark:border-[#261E18] shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] space-y-5 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin">
              {/* Header & Reset */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E5DF] dark:border-[#261E18]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 dark:bg-[#FF771C]/15 border border-[#FF771C]/25 flex items-center justify-center text-[#FF771C]">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-[#252621] dark:text-[#F5F2EB]">
                      {t("common.filters")}
                    </h3>
                    <p className="text-[10px] text-[#8F8F85]">
                      {filteredServices.length} {t("servicesPage.servicesCount")}
                    </p>
                  </div>
                </div>
                {(selectedCategory !== "ALL" ||
                  selectedPriceRange !== "ALL" ||
                  instantDispatchOnly ||
                  searchQuery) && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] font-bold text-[#FF771C] hover:text-[#E56814] flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-[#23170E] border border-orange-200/60 dark:border-[#FF771C]/30 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    {t("common.clear")}
                  </button>
                )}
              </div>

              {/* Instant Dispatch Toggle Card */}
              <div
                onClick={() => setInstantDispatchOnly(!instantDispatchOnly)}
                className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                  instantDispatchOnly
                    ? "bg-gradient-to-br from-emerald-500/10 to-teal-500/5 dark:from-emerald-950/40 dark:to-teal-950/20 border-emerald-500/40 shadow-[0_4px_16px_rgba(16,185,129,0.15)]"
                    : "bg-[#F8F7F3] dark:bg-[#1A1410] border-[#E7E5DF] dark:border-[#261E18] hover:border-[#FF771C]/30"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <div>
                      <p className="text-xs font-extrabold text-[#252621] dark:text-[#F5F2EB]">
                        {t("servicesPage.instantDispatch")}
                      </p>
                      <p className="text-[10px] text-[#717167] dark:text-[#9E9488]">
                        {t("servicesPage.instantDispatchSub")}
                      </p>
                    </div>
                  </div>
                  {/* Switch Pill */}
                  <div
                    className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                      instantDispatchOnly
                        ? "bg-emerald-500 justify-end"
                        : "bg-[#D8D5CD] dark:bg-[#342A22] justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-sm transition-all" />
                  </div>
                </div>
              </div>

              {/* All Categories Filter */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#8F8F85] dark:text-[#9E9488]">
                    {t("categories.allCategories")}
                  </h4>
                  <span className="text-[10px] font-semibold text-[#8F8F85]">
                    {categoriesList.length}
                  </span>
                </div>
                <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1 scrollbar-thin">
                  {categoriesList.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    const IconComp = getCategoryIcon(cat.id);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group ${
                          isSelected
                            ? "bg-gradient-to-r from-[#FF771C] to-[#E56814] text-white shadow-[0_4px_16px_rgba(255,119,28,0.35)] scale-[1.02]"
                            : "text-[#717167] dark:text-[#9E9488] hover:bg-[#F8F7F3] dark:hover:bg-[#1F1813] hover:text-[#252621] dark:hover:text-[#F5F2EB]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <IconComp
                            className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                              isSelected ? "text-white" : "text-[#FF771C]"
                            }`}
                          />
                          <span className="truncate">{tc(cat.name)}</span>
                        </div>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ml-2 shrink-0 ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-[#EFECE6] dark:bg-[#251E17] text-[#8F8F85] group-hover:text-[#252621] dark:group-hover:text-white"
                          }`}
                        >
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-3 pt-3 border-t border-[#E7E5DF] dark:border-[#261E18]">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#8F8F85] dark:text-[#9E9488]">
                  {t("servicesPage.priceRange")}
                </h4>
                <div className="grid grid-cols-1 gap-1.5 text-xs">
                  {[
                    { id: "ALL", label: t("servicesPage.allPrices") },
                    { id: "UNDER_250", label: t("servicesPage.under250") },
                    { id: "250_TO_500", label: t("servicesPage.p250to500") },
                    { id: "500_TO_1000", label: t("servicesPage.p500to1000") },
                    { id: "ABOVE_1000", label: t("servicesPage.above1000") },
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
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-orange-50 dark:bg-[#2A1A10] text-[#FF771C] border border-[#FF771C]/50"
                            : "bg-[#F8F7F3]/70 dark:bg-[#1A1410] border border-transparent text-[#717167] dark:text-[#9E9488] hover:text-[#252621] dark:hover:text-[#F5F2EB] hover:bg-[#F0EDE6] dark:hover:bg-[#221A15]"
                        }`}
                      >
                        <span>{range.label}</span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#FF771C] shadow-[0_0_8px_#FF771C]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guarantee Highlight Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent dark:from-[#2A180E] dark:to-[#17100B] border border-orange-500/20 dark:border-[#FF771C]/25 space-y-2 relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-[#FF771C]/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF771C]">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{t("servicesPage.doorstepWarranty")}</span>
                </div>
                <p className="text-[11px] text-[#717167] dark:text-[#B3A99B] leading-relaxed">
                  {t("servicesPage.warrantyDesc")}
                </p>
                <div className="pt-2 border-t border-orange-500/15 flex items-center justify-between text-[10px] font-semibold text-[#8F8F85]">
                  <span>✓ 100% Genuine Spares</span>
                  <span>✓ Verified Pros</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* 03 RIGHT CONTENT: SERVICE CARDS GRID                      */}
          {/* ========================================================= */}
          <main className="flex-1 min-w-0 space-y-6">
            {/* Top Toolbar: Active Filters & Sort */}
            <div className="p-4 rounded-3xl bg-white/90 dark:bg-[#14100D]/90 backdrop-blur-xl border border-[#E7E5DF] dark:border-[#261E18] shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-wrap items-center justify-between gap-4">
              {/* Active Filter Chips */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="text-[#717167] dark:text-[#9E9488] font-bold">
                  {t("servicesPage.showing")}{" "}
                  <strong className="text-[#252621] dark:text-[#F5F2EB] font-black">
                    {filteredServices.length}
                  </strong>{" "}
                  {t("servicesPage.servicesCount")}
                </span>

                {selectedCategory !== "ALL" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/10 text-[#FF771C] border border-[#FF771C]/30 text-[11px] font-bold">
                    {t("servicesPage.category")}:{" "}
                    {tc(categoriesList.find((c) => c.id === selectedCategory)?.name ||
                      selectedCategory)}
                    <button
                      onClick={() => handleCategoryChange("ALL")}
                      className="hover:text-red-500 ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {selectedPriceRange !== "ALL" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/10 text-[#FF771C] border border-[#FF771C]/30 text-[11px] font-bold">
                    {t("servicesPage.priceRange")}: {selectedPriceRange.replace(/_/g, " ")}
                    <button
                      onClick={() => setSelectedPriceRange("ALL")}
                      className="hover:text-red-500 ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {instantDispatchOnly && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {t("servicesPage.instantDispatch")}
                    <button
                      onClick={() => setInstantDispatchOnly(false)}
                      className="hover:text-red-500 ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
              </div>

              {/* Desktop Sort Dropdown */}
              <div className="hidden lg:flex items-center gap-2 text-xs">
                <span className="text-[#8F8F85] font-semibold">
                  {t("common.sort")}:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#F8F7F3] dark:bg-[#1A1410] border border-[#E7E5DF] dark:border-[#261E18] rounded-xl px-3 py-1.5 text-xs font-bold text-[#252621] dark:text-[#F5F2EB] focus:outline-none focus:border-[#FF771C] transition-colors"
                >
                  <option value="featured">{t("servicesPage.featured")}</option>
                  <option value="price_asc">{t("servicesPage.priceLowHigh")}</option>
                  <option value="price_desc">{t("servicesPage.priceHighLow")}</option>
                  <option value="rating">{t("servicesPage.rating")}</option>
                </select>
              </div>
            </div>

            {/* Service Cards Grid (or Loading / Error / Empty States) */}
            {servicesLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#14100D] border border-[#E7E5DF] dark:border-[#261E18] shadow-subtle space-y-4"
                  >
                    <Skeleton className="h-44 w-full rounded-xl" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex justify-between items-center pt-3 border-t border-[#E7E5DF] dark:border-[#261E18]">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-8 w-24 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            ) : servicesError ? (
              /* Error State */
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#14100D] border border-rose-200 dark:border-rose-900/50 shadow-card space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                  Unable to load services right now
                </h3>
                <p className="text-xs text-[#717167] dark:text-[#9E9488] max-w-sm mx-auto">
                  There was an issue connecting to the service catalog. Please verify your connection or try again.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => refetch()}
                  className="font-bold shadow-orange-glow"
                >
                  {t("servicesPage.retry")}
                </Button>
              </div>
            ) : paginatedServices.length > 0 ? (
              /* Active Services Grid - Proportional 3-Column Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-5">
                {paginatedServices.map((service) => (
                  <div
                    key={service.id}
                    className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#15110E] border border-[#E7E5DF] dark:border-[#261E18] shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(255,119,28,0.16)] dark:hover:border-[#FF771C]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                  >
                    {/* Ambient Glow behind card */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#FF771C]/10 transition-colors" />

                    <div>
                      {/* Card Thumbnail Image with Floating Badges */}
                      <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-[#1F1813] mb-3">
                        <img
                          src={compressImageUrl(
                            service.image ||
                            getServiceImage(service.title, service.category?.slug),
                            480,
                            70
                          )}
                          alt={service.title}
                          onError={handleImageError}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                        {/* Dark Vignette Overlay for Crisp Contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                        {/* Top-Left Verified Badge */}
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white flex items-center gap-1.5 shadow-sm">
                          <Shield className="w-3.5 h-3.5 text-[#FF771C]" />
                          <span>Verified Pro</span>
                        </div>

                        {/* Top-Right Glass Rating Pill */}
                        <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-xs font-bold text-white flex items-center gap-1 shadow-sm">
                          <Star className="w-3.5 h-3.5 fill-[#FF771C] text-[#FF771C]" />
                          <span>{service.rating || 4.9}</span>
                          <span className="text-white/60 font-medium text-[11px]">
                            ({service.reviewsCount || 120})
                          </span>
                        </div>

                        {/* Bottom Floating Info Over Image */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
                          <span className="text-[11px] font-extrabold uppercase tracking-wide text-white bg-[#FF771C] px-2.5 py-0.5 rounded-full shadow-sm truncate max-w-[72%]">
                            {tc(service.category?.name || "Service")}
                          </span>
                          <div className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[11px] text-white/90 font-semibold flex items-center gap-1 border border-white/10 shrink-0">
                            <Clock className="w-3.5 h-3.5 text-[#FF771C]" />
                            <span>{service.durationMinutes || 45} {t("common.mins")}</span>
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-[17px] font-bold font-display text-[#252621] dark:text-[#F5F2EB] group-hover:text-[#FF771C] transition-colors leading-snug tracking-tight line-clamp-1">
                        {ts(service.title)}
                      </h3>

                      {/* Description */}
                      <p className="text-[13px] sm:text-[13.5px] text-[#717167] dark:text-[#9E9488] mt-1.5 line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Perks Check Row */}
                      <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-[#E7E5DF]/60 dark:border-[#261E18] text-xs font-semibold text-[#8F8F85]">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          Doorstep
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#FF771C]" />
                          Warranty
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          Genuine
                        </span>
                      </div>
                    </div>

                    {/* Card Footer: Price & Book CTA */}
                    <div className="pt-3.5 mt-3.5 border-t border-[#E7E5DF] dark:border-[#261E18] flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#8F8F85] block">
                          {t("categories.starts")}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-[22px] sm:text-2xl font-mono font-black text-[#252621] dark:text-white">
                            ₹{service.defaultPrice}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedService(service);
                          setBookingModalOpen(true);
                        }}
                        className="font-extrabold bg-gradient-to-r from-[#FF771C] to-[#E56814] hover:from-[#FF8433] hover:to-[#EB7220] text-white shadow-[0_3px_14px_rgba(255,119,28,0.35)] px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-xl transition-all duration-300 group/btn flex items-center gap-1.5 text-xs sm:text-[13px]"
                      >
                        <span>{t("common.bookNow")}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="p-12 text-center rounded-3xl bg-white/90 dark:bg-[#14100D]/90 backdrop-blur-xl border border-[#E7E5DF] dark:border-[#261E18] shadow-card space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-[#FF771C] flex items-center justify-center mx-auto border border-[#FF771C]/25 shadow-sm">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                  {t("servicesPage.noServicesMatch")}
                </h3>
                <p className="text-xs text-[#717167] dark:text-[#9E9488] max-w-sm mx-auto">
                  {t("servicesPage.adjustSearch")}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                  className="font-bold border-[#FF771C]/40 text-[#FF771C] hover:bg-orange-50 dark:hover:bg-[#23170E]"
                >
                  {t("common.clear")}
                </Button>
              </div>
            )}

            {/* ========================================================= */}
            {/* 04 PAGINATION CONTROLS                                    */}
            {/* ========================================================= */}
            {filteredServices.length > pageSize && (
              <div className="p-4 rounded-3xl bg-white/90 dark:bg-[#14100D]/90 backdrop-blur-xl border border-[#E7E5DF] dark:border-[#261E18] shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#717167] dark:text-[#A89E92]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF771C]" />
                  {language === "hi" ? (
                    <span>
                      कुल <span className="font-bold text-[#252621] dark:text-[#F5F2EB]">{filteredServices.length}</span> सेवाओं में से{" "}
                      <span className="font-bold text-[#FF771C]">
                        {(currentPage - 1) * pageSize + 1} से {Math.min(currentPage * pageSize, filteredServices.length)}
                      </span>
                    </span>
                  ) : (
                    <span>
                      Showing{" "}
                      <span className="font-bold text-[#FF771C]">
                        {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredServices.length)}
                      </span>{" "}
                      of{" "}
                      <span className="font-bold text-[#252621] dark:text-[#F5F2EB]">
                        {filteredServices.length}
                      </span>{" "}
                      services
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-2 rounded-xl border border-[#E7E5DF] dark:border-[#261E18] text-[#252621] dark:text-[#F5F2EB] disabled:opacity-30 hover:bg-[#F8F7F3] dark:hover:bg-[#1A1410] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-[#FF771C] to-[#E56814] text-white shadow-[0_4px_16px_rgba(255,119,28,0.4)] scale-105"
                            : "border border-[#E7E5DF] dark:border-[#261E18] text-[#717167] dark:text-[#9E9488] hover:bg-[#F8F7F3] dark:hover:bg-[#1A1410] hover:text-[#252621] dark:hover:text-[#F5F2EB]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    className="p-2 rounded-xl border border-[#E7E5DF] dark:border-[#261E18] text-[#252621] dark:text-[#F5F2EB] disabled:opacity-30 hover:bg-[#F8F7F3] dark:hover:bg-[#1A1410] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-xs h-full bg-[#FAFAF8] dark:bg-[#14100D] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#E7E5DF] dark:border-[#261E18]">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF] dark:border-[#261E18]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#FF771C]" />
                  <h3 className="font-extrabold text-base text-[#252621] dark:text-[#F5F2EB]">
                    Filters
                  </h3>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-[#251E17] text-[#8F8F85] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Instant Dispatch Toggle */}
              <div
                onClick={() => setInstantDispatchOnly(!instantDispatchOnly)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  instantDispatchOnly
                    ? "bg-emerald-500/10 border-emerald-500/40"
                    : "bg-white dark:bg-[#1A1410] border-[#E7E5DF] dark:border-[#261E18]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-[#252621] dark:text-[#F5F2EB]">
                      {t("servicesPage.instantDispatch")}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-4 rounded-full relative flex items-center p-0.5 ${
                      instantDispatchOnly ? "bg-emerald-500 justify-end" : "bg-stone-300 dark:bg-stone-700 justify-start"
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-white shadow-xs" />
                  </div>
                </div>
              </div>

              {/* Mobile Categories */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#8F8F85]">
                  Category
                </h4>
                <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                  {categoriesList.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    const IconComp = getCategoryIcon(cat.id);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          handleCategoryChange(cat.id);
                          setMobileFilterOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-gradient-to-r from-[#FF771C] to-[#E56814] text-white shadow-md"
                            : "text-[#252621] dark:text-[#F5F2EB] bg-white dark:bg-[#1A1410] border border-[#E7E5DF] dark:border-[#261E18]"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <IconComp className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-[#FF771C]"}`} />
                          <span className="truncate">{tc(cat.name)}</span>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "text-[#8F8F85]"}`}>
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Price Filter */}
              <div className="space-y-2 pt-3 border-t border-[#E7E5DF] dark:border-[#261E18]">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#8F8F85]">
                  Price
                </h4>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  {[
                    { id: "ALL", label: "All Prices" },
                    { id: "UNDER_250", label: "Under ₹250" },
                    { id: "250_TO_500", label: "₹250 to ₹500" },
                    { id: "500_TO_1000", label: "₹500 to ₹1,000" },
                    { id: "ABOVE_1000", label: "₹1,000 and above" },
                  ].map((range) => {
                    const isSelected = selectedPriceRange === range.id;
                    return (
                      <button
                        key={range.id}
                        onClick={() => {
                          setSelectedPriceRange(range.id);
                          setCurrentPage(1);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-left transition-all ${
                          isSelected
                            ? "bg-orange-50 dark:bg-[#2A180E] text-[#FF771C] border border-[#FF771C]/50"
                            : "bg-white dark:bg-[#1A1410] border border-[#E7E5DF] dark:border-[#261E18] text-[#717167] dark:text-[#9E9488]"
                        }`}
                      >
                        <span>{range.label}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#FF771C]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E7E5DF] dark:border-[#261E18] space-y-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full font-bold bg-[#FF771C] hover:bg-[#E56814] text-white shadow-[0_4px_16px_rgba(255,119,28,0.4)]"
              >
                Apply Filters
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full text-xs font-bold"
              >
                Reset All
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        service={selectedService}
        onRequireAuth={onOpenAuthModal}
      />
    </div>
  );
};
