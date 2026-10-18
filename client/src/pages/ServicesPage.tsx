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

interface ServicesPageProps {
  onOpenAuthModal?: () => void;
}

// Default high-quality categorized service images
const categoryImages: Record<string, string> = {
  electrician:
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
  plumbing:
    "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80",
  "ac-repair":
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80",
  appliance:
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
  cleaning:
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
  mechanic:
    "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80",
  default:
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80",
};

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
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
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
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80",
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
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=600&q=80",
  },
];

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenAuthModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state synchronization
  const initialCategory = searchParams.get("category") || "ALL";
  const initialSearch = searchParams.get("search") || "";

  const { t, tc, ts } = useLanguage();

  // Local filter states
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("ALL");
  const [instantDispatchOnly, setInstantDispatchOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6;

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
        image:
          srv.image ||
          categoryImages[srv.category?.slug?.toLowerCase() || ""] ||
          categoryImages.default,
      }));
    }
    return fallbackCatalog;
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
    <div className="bg-[#F8F7F3] dark:bg-[#040404] text-[#252621] dark:text-[#F5F2EB] min-h-screen pb-20 transition-colors">
      {/* ========================================================= */}
      {/* 01 BREADCRUMB & HEADER SECTION                            */}
      {/* ========================================================= */}
      <div className="border-b border-[#E7E5DF] dark:border-[#2B231D] bg-white/60 dark:bg-[#141210]/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-[#717167] dark:text-[#9E9488]">
            <Link to="/" className="hover:text-[#E87532] transition-colors">
              {t("common.home")}
            </Link>
            <span>/</span>
            <span className="text-[#252621] dark:text-[#F5F2EB] font-semibold">
              {t("servicesPage.allServices")}
            </span>
          </nav>

          {/* Heading and Search Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-[1.3] text-[#252621] dark:text-[#F5F2EB]">
                {t("servicesPage.headerTitle")}
              </h1>
              <p className="text-sm text-[#717167] dark:text-[#9E9488] mt-1.5 max-w-xl">
                {t("servicesPage.headerSubtitle")}
              </p>
            </div>

            {/* Top Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F8F85] pointer-events-none" />
              <input
                type="text"
                placeholder={t("servicesPage.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] text-xs sm:text-sm text-[#252621] dark:text-[#F5F2EB] placeholder:text-[#8F8F85] focus:outline-none focus:ring-2 focus:ring-[#E87532]/20 focus:border-[#E87532] shadow-subtle"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8F8F85] hover:text-[#252621]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: Left Filters Sidebar + Right Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ========================================================= */}
          {/* 02 LEFT FILTERS SIDEBAR (Desktop)                         */}
          {/* ========================================================= */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E5DF] dark:border-[#2B231D]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#E87532]" />
                  <h3 className="font-bold text-sm text-[#252621] dark:text-[#F5F2EB]">
                    {t("common.filters")}
                  </h3>
                </div>
                {(selectedCategory !== "ALL" ||
                  selectedPriceRange !== "ALL" ||
                  instantDispatchOnly ||
                  searchQuery) && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] font-bold text-[#E87532] hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    {t("common.clear")}
                  </button>
                )}
              </div>

              {/* Instant Booking Toggle */}
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={instantDispatchOnly}
                    onChange={(e) => setInstantDispatchOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-[#E87532] focus:ring-[#E87532] border-[#E7E5DF] dark:border-[#2B231D]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#252621] dark:text-[#F5F2EB] group-hover:text-[#E87532] transition-colors">
                      {t("servicesPage.instantDispatch")}
                    </p>
                    <p className="text-[10px] text-[#717167] dark:text-[#9E9488]">
                      {t("servicesPage.instantDispatchSub")}
                    </p>
                  </div>
                </label>
              </div>

              {/* All Categories Filter */}
              <div className="space-y-3 pt-3 border-t border-[#E7E5DF] dark:border-[#2B231D]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#252621] dark:text-[#F5F2EB]">
                  {t("categories.allCategories")}
                </h4>
                <div className="space-y-1">
                  {categoriesList.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isSelected
                            ? "bg-orange-50 dark:bg-orange-950/40 text-[#E87532] border border-[#E87532]/30"
                            : "text-[#717167] dark:text-[#9E9488] hover:bg-[#F8F7F3] dark:hover:bg-[#1A1613] hover:text-[#252621] dark:hover:text-[#F5F2EB]"
                        }`}
                      >
                        <span className="truncate">{tc(cat.name)}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full ${
                            isSelected
                              ? "bg-[#E87532] text-white"
                              : "bg-[#F8F7F3] dark:bg-[#1A1613] text-[#8F8F85]"
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
              <div className="space-y-3 pt-3 border-t border-[#E7E5DF] dark:border-[#2B231D]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#252621] dark:text-[#F5F2EB]">
                  {t("servicesPage.priceRange")}
                </h4>
                <div className="space-y-2 text-xs">
                  {[
                    { id: "ALL", label: t("servicesPage.allPrices") },
                    { id: "UNDER_250", label: t("servicesPage.under250") },
                    { id: "250_TO_500", label: t("servicesPage.p250to500") },
                    { id: "500_TO_1000", label: t("servicesPage.p500to1000") },
                    { id: "ABOVE_1000", label: t("servicesPage.above1000") },
                  ].map((range) => (
                    <label
                      key={range.id}
                      className="flex items-center gap-2.5 cursor-pointer text-[#717167] dark:text-[#9E9488] hover:text-[#252621] dark:hover:text-[#F5F2EB]"
                    >
                      <input
                        type="radio"
                        name="priceRange"
                        checked={selectedPriceRange === range.id}
                        onChange={() => {
                          setSelectedPriceRange(range.id);
                          setCurrentPage(1);
                        }}
                        className="text-[#E87532] focus:ring-[#E87532]"
                      />
                      <span
                        className={
                          selectedPriceRange === range.id
                            ? "font-bold text-[#E87532]"
                            : ""
                        }
                      >
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Guarantee Highlight */}
              <div className="p-3.5 rounded-xl bg-orange-50/70 dark:bg-[#1A1613] border border-orange-200/50 dark:border-[#2B231D] space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#E87532]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t("servicesPage.doorstepWarranty")}</span>
                </div>
                <p className="text-[11px] text-[#717167] dark:text-[#9E9488] leading-relaxed">
                  {t("servicesPage.warrantyDesc")}
                </p>
              </div>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* 03 RIGHT CONTENT: SERVICE CARDS GRID                      */}
          {/* ========================================================= */}
          <main className="lg:col-span-9 space-y-6">
            {/* Top Toolbar: Active Filters & Sort */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-subtle flex flex-wrap items-center justify-between gap-4">
              {/* Active Filter Chips */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="text-[#717167] dark:text-[#9E9488] font-medium">
                  {t("servicesPage.showing")}{" "}
                  <strong className="text-[#252621] dark:text-[#F5F2EB]">
                    {filteredServices.length}
                  </strong>{" "}
                  {t("servicesPage.servicesCount")}
                </span>

                {selectedCategory !== "ALL" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 text-[#E87532] border border-orange-200 text-[11px] font-bold">
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
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 text-[#E87532] border border-orange-200 text-[11px] font-bold">
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
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
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
                <span className="text-[#717167] dark:text-[#9E9488] font-semibold">
                  {t("common.sort")}:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] rounded-xl px-3 py-1.5 text-xs font-bold text-[#252621] dark:text-[#F5F2EB] focus:outline-none focus:border-[#E87532]"
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-subtle space-y-4"
                  >
                    <Skeleton className="h-40 w-full rounded-xl" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex justify-between items-center pt-3 border-t border-[#E7E5DF]">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-8 w-24 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            ) : servicesError ? (
              /* Error State */
              <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#141210] border border-rose-200 dark:border-rose-900/50 shadow-card space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
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
              /* Active Services Grid (HandyHub Card Aesthetic) */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedServices.map((service) => (
                  <div
                    key={service.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card hover:shadow-card-hover dark:hover:border-[#FF771C]/50 dark:hover:shadow-[0_12px_36px_rgba(255,119,28,0.12)] transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Card Thumbnail Image */}
                      <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-[#F8F7F3] dark:bg-[#1A1613] mb-4">
                        <img
                          src={
                            service.image ||
                            categoryImages[service.category?.slug?.toLowerCase() || ""] ||
                            categoryImages.default
                          }
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Rating pill on image */}
                        <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-lg bg-white/95 dark:bg-[#141210]/95 backdrop-blur-sm border border-[#E7E5DF] dark:border-[#2E251E] text-[11px] font-bold text-[#252621] dark:text-[#F5F2EB] flex items-center gap-1 shadow-subtle">
                          <Star className="w-3.5 h-3.5 fill-[#FF771C] text-[#FF771C]" />
                          <span>{service.rating || 4.9}</span>
                          <span className="text-[#8A8074] font-normal">
                            ({service.reviewsCount || 120})
                          </span>
                        </div>
                      </div>

                      {/* Category Badge & Duration */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF771C] bg-orange-50 dark:bg-[#23170E] px-2.5 py-0.5 rounded-full border border-orange-200/50 dark:border-[#FF771C]/30">
                          {tc(service.category?.name || "Service")}
                        </span>
                        <div className="text-[11px] text-[#717167] dark:text-[#9E9488] flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#FF771C]" />
                          <span>
                            {service.durationMinutes || 45} {t("common.mins")}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold font-display text-[#252621] dark:text-[#F5F2EB] group-hover:text-[#FF771C] transition-colors leading-snug">
                        {ts(service.title)}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[#717167] dark:text-[#9E9488] mt-1.5 line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Card Footer: Price & Book CTA */}
                    <div className="pt-4 mt-4 border-t border-[#E7E5DF] dark:border-[#2E251E] flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-wider text-[#8A8074] block">
                          {t("categories.starts")}
                        </span>
                        <span className="text-lg font-mono font-extrabold text-[#252621] dark:text-[#F5F2EB]">
                          ₹{service.defaultPrice}
                        </span>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedService(service);
                          setBookingModalOpen(true);
                        }}
                        className="font-bold bg-[#FF771C] hover:bg-[#E56814] text-white shadow-[0_2px_14px_rgba(255,119,28,0.35)] px-4 py-2 rounded-xl"
                      >
                        {t("common.bookNow")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-[#E87532] flex items-center justify-center mx-auto border border-orange-200/50">
                  <Search className="w-7 h-7" />
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
                  className="font-bold"
                >
                  {t("common.clear")}
                </Button>
              </div>
            )}

            {/* ========================================================= */}
            {/* 04 PAGINATION CONTROLS                                    */}
            {/* ========================================================= */}
            {filteredServices.length > pageSize && (
              <div className="p-4 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-subtle flex items-center justify-between">
                <p className="text-xs text-[#717167] dark:text-[#9E9488]">
                  {t("servicesPage.showing")} {(currentPage - 1) * pageSize + 1} -{" "}
                  {Math.min(currentPage * pageSize, filteredServices.length)}{" "}
                  {t("servicesPage.of")} {filteredServices.length}{" "}
                  {t("servicesPage.servicesCount")}
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-1.5 rounded-lg border border-[#E7E5DF] dark:border-[#2B231D] text-[#252621] dark:text-[#F5F2EB] disabled:opacity-30 hover:bg-[#F8F7F3] dark:hover:bg-[#1A1613] transition-colors"
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
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                          isActive
                            ? "bg-[#E87532] text-white shadow-orange-glow"
                            : "border border-[#E7E5DF] dark:border-[#2B231D] text-[#717167] hover:bg-[#F8F7F3] dark:hover:bg-[#1A1613]"
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
                    className="p-1.5 rounded-lg border border-[#E7E5DF] dark:border-[#2B231D] text-[#252621] dark:text-[#F5F2EB] disabled:opacity-30 hover:bg-[#F8F7F3] dark:hover:bg-[#1A1613] transition-colors"
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
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-xs h-full bg-[#F8F7F3] dark:bg-[#1A1613] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF] dark:border-[#2B231D]">
                <h3 className="font-bold text-base text-[#252621] dark:text-[#F5F2EB]">
                  Filters
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800"
                >
                  <X className="w-5 h-5 text-[#8F8F85]" />
                </button>
              </div>

              {/* Mobile Categories */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#717167]">
                  Category
                </h4>
                <div className="space-y-1">
                  {categoriesList.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        handleCategoryChange(cat.id);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                        selectedCategory === cat.id
                          ? "bg-[#E87532] text-white"
                          : "text-[#252621] dark:text-[#F5F2EB] bg-white dark:bg-[#141210]"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price Filter */}
              <div className="space-y-2 pt-3 border-t border-[#E7E5DF] dark:border-[#2B231D]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#717167]">
                  Price
                </h4>
                <div className="space-y-2 text-xs">
                  {[
                    { id: "ALL", label: "All Prices" },
                    { id: "UNDER_250", label: "Under ₹250" },
                    { id: "250_TO_500", label: "₹250 to ₹500" },
                    { id: "500_TO_1000", label: "₹500 to ₹1,000" },
                    { id: "ABOVE_1000", label: "₹1,000 and above" },
                  ].map((range) => (
                    <label
                      key={range.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="mobilePriceRange"
                        checked={selectedPriceRange === range.id}
                        onChange={() => {
                          setSelectedPriceRange(range.id);
                          setCurrentPage(1);
                        }}
                        className="text-[#E87532] focus:ring-[#E87532]"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E7E5DF] dark:border-[#2B231D] space-y-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full font-bold shadow-orange-glow"
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
                className="w-full text-xs"
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
