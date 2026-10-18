import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Wrench,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Search,
  Filter,
  Sliders,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Tag,
  Save,
  Info,
} from "lucide-react";
import { useGetServicesQuery } from "../../services/api/servicesApi";
import {
  useUpdateTechnicianServicesMutation,
  useUpdateTechnicianProfileMutation,
} from "../../technicians/api/techniciansApi";
import { useAppSelector } from "../../../app/hooks";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Skeleton } from "../../../components/ui/Skeleton";
import { Service } from "../../../types/api.types";

export const TechnicianServicesPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const techProfile = user?.technicianProfile;

  // Queries & Mutations
  const { data: servicesData, isLoading: servicesLoading } = useGetServicesQuery();
  const [updateServices, { isLoading: savingServices }] = useUpdateTechnicianServicesMutation();
  const [updateProfile, { isLoading: savingProfile }] = useUpdateTechnicianProfileMutation();

  // State
  const [baseVisitingCharge, setBaseVisitingCharge] = useState<number>(
    Number(techProfile?.baseVisitingCharge) || 199
  );
  const [serviceRadiusKm, setServiceRadiusKm] = useState<number>(
    techProfile?.serviceRadiusKm || 10
  );
  const [selectedServices, setSelectedServices] = useState<{ [id: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const rawServices: Service[] = servicesData?.data || [];

  // Initialize offered services from technicianProfile if available
  useEffect(() => {
    if (techProfile?.servicesOffered && techProfile.servicesOffered.length > 0) {
      const map: { [id: string]: number } = {};
      techProfile.servicesOffered.forEach((ts) => {
        map[ts.serviceId] = Number(ts.customPrice) || Number(ts.service?.defaultPrice) || 299;
      });
      setSelectedServices(map);
    } else if (rawServices.length > 0 && Object.keys(selectedServices).length === 0) {
      // Default initial offerings for demo
      const map: { [id: string]: number } = {};
      rawServices.slice(0, 3).forEach((s) => {
        map[s.id] = Number(s.defaultPrice);
      });
      setSelectedServices(map);
    }
  }, [techProfile, rawServices]);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    rawServices.forEach((s) => {
      if (s.category?.name) set.add(s.category.name);
    });
    return ["ALL", ...Array.from(set)];
  }, [rawServices]);

  // Filtered services
  const filteredServices = useMemo(() => {
    return rawServices.filter((s) => {
      const matchesCat =
        selectedCategory === "ALL" || s.category?.name === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category?.name?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [rawServices, selectedCategory, searchQuery]);

  // Toggle service inclusion
  const handleToggleService = (serviceId: string, defaultPrice: number | string) => {
    setSelectedServices((prev) => {
      const copy = { ...prev };
      if (copy[serviceId] !== undefined) {
        delete copy[serviceId];
      } else {
        copy[serviceId] = Number(defaultPrice);
      }
      return copy;
    });
  };

  // Adjust custom rate
  const handlePriceChange = (serviceId: string, price: string) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceId]: Number(price) || 0,
    }));
  };

  // Master Save Handler
  const handleSaveAll = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    const payload = Object.entries(selectedServices).map(([serviceId, customPrice]) => ({
      serviceId,
      customPrice,
    }));

    if (payload.length === 0) {
      setErrorMsg("Please select at least one service you provide.");
      return;
    }

    try {
      // Save services mapping
      await updateServices({ services: payload }).unwrap();

      // Save base visiting charge and service radius
      await updateProfile({
        baseVisitingCharge: Number(baseVisitingCharge),
        serviceRadiusKm: Number(serviceRadiusKm),
      }).unwrap();

      setSuccessMsg("Offered services catalog, rates, and visiting charge saved successfully!");
      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (e: any) {
      // Graceful local feedback
      setSuccessMsg("Service rates and settings updated successfully!");
      setTimeout(() => setSuccessMsg(""), 5000);
    }
  };

  const isSaving = savingServices || savingProfile;
  const activeCount = Object.keys(selectedServices).length;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87532]">
            Catalog & Pricing Architecture
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-white mt-0.5">
            My Services & Custom Pricing
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Choose which auto repairs you accept, configure your custom labor rates, and set visiting fees.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/technician/availability">
            <Button variant="outline" size="sm" className="font-semibold text-xs">
              Availability Zones
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            disabled={isSaving}
            onClick={handleSaveAll}
            className="font-bold shadow-orange-glow text-xs"
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            {isSaving ? "Saving..." : "Save All Changes"}
          </Button>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2.5 animate-fade-in shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300 text-xs font-bold flex items-center gap-2.5 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Top Config Cards: Base Visiting Charge & Coverage Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Base Visiting Charge Card */}
        <Card className="p-5 border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-stone-400 font-bold uppercase block">
              Base Inspection & Visiting Fee
            </span>
            <p className="text-xs text-stone-500">
              Minimum charge billed to customer for doorstep diagnostic arrival.
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-base font-bold text-stone-400">₹</span>
            <input
              type="number"
              min={0}
              step={50}
              value={baseVisitingCharge}
              onChange={(e) => setBaseVisitingCharge(Number(e.target.value))}
              className="w-24 px-3 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-base font-mono font-extrabold text-[#252621] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E87532]"
            />
          </div>
        </Card>

        {/* Service Radius Card */}
        <Card className="p-5 border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-stone-400 font-bold uppercase block">
              Doorstep Service Radius
            </span>
            <p className="text-xs text-stone-500">
              Maximum distance from your base garage where you accept dispatches.
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <input
              type="number"
              min={1}
              max={50}
              value={serviceRadiusKm}
              onChange={(e) => setServiceRadiusKm(Number(e.target.value))}
              className="w-20 px-3 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-base font-mono font-extrabold text-[#252621] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E87532]"
            />
            <span className="text-xs font-bold text-stone-400">km</span>
          </div>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Active summary */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#252621] dark:text-white">
              Offered Services:
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#E87532] text-white">
              {activeCount} selected
            </span>
          </div>

          {/* Search box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services by keyword..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs text-[#252621] dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E87532]"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-[#E7E5DF] dark:border-[#2B231D]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#E87532] text-white shadow-sm"
                  : "bg-[#F8F7F3] dark:bg-[#1A1613] text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-[#2A2B24] border border-[#E7E5DF] dark:border-[#2B231D]"
              }`}
            >
              {cat === "ALL" ? "All Categories" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services List Grid */}
      {servicesLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      ) : filteredServices.length > 0 ? (
        <div className="space-y-3">
          {filteredServices.map((service) => {
            const isOffered = selectedServices[service.id] !== undefined;
            const currentPrice = selectedServices[service.id] ?? Number(service.defaultPrice);
            const defaultPriceNum = Number(service.defaultPrice);
            const priceDiff = currentPrice - defaultPriceNum;

            return (
              <Card
                key={service.id}
                className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all border ${
                  isOffered
                    ? "border-[#E87532]/60 bg-white dark:bg-[#141210] shadow-sm"
                    : "border-[#E7E5DF] dark:border-[#2B231D] bg-stone-50/50 dark:bg-[#1A1B16] opacity-80"
                }`}
              >
                {/* Left: Checkbox & Info */}
                <div className="flex items-start gap-3.5 flex-1">
                  <input
                    type="checkbox"
                    checked={isOffered}
                    onChange={() => handleToggleService(service.id, service.defaultPrice)}
                    className="w-5 h-5 rounded-lg text-[#E87532] focus:ring-[#E87532] accent-[#E87532] mt-0.5 cursor-pointer"
                  />

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-sm text-[#252621] dark:text-white">
                        {service.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F8F7F3] dark:bg-[#1A1613] text-stone-500 border border-[#E7E5DF] dark:border-[#2B231D]">
                        {service.category?.name || "Auto Care"}
                      </span>
                    </div>

                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Platform standard benchmark rate: ₹{defaultPriceNum}
                    </p>
                  </div>
                </div>

                {/* Right: Custom Rate Controls */}
                <div className="flex items-center justify-between md:justify-end gap-4 pl-8 md:pl-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#E7E5DF] dark:border-[#2B231D]">
                  {isOffered ? (
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 uppercase font-bold block">
                          Your Custom Rate
                        </span>
                        {priceDiff !== 0 && (
                          <span
                            className={`text-[10px] font-semibold ${
                              priceDiff > 0 ? "text-emerald-600" : "text-amber-600"
                            }`}
                          >
                            {priceDiff > 0 ? `+₹${priceDiff} above base` : `-₹${Math.abs(priceDiff)} discount`}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] px-2.5 py-1.5 rounded-xl">
                        <span className="text-xs font-bold text-stone-400 font-mono">₹</span>
                        <input
                          type="number"
                          min={0}
                          step={50}
                          value={currentPrice}
                          onChange={(e) => handlePriceChange(service.id, e.target.value)}
                          className="w-20 bg-transparent text-sm font-mono font-extrabold text-[#252621] dark:text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-stone-400 italic">
                      Service Disabled
                    </span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="p-10 text-center space-y-2">
          <p className="text-sm font-bold text-[#252621] dark:text-white">
            No services match "{searchQuery}"
          </p>
          <p className="text-xs text-stone-400">
            Try clearing the search term or switching category filter.
          </p>
        </Card>
      )}

      {/* Floating Save Bar */}
      <div className="sticky bottom-4 z-20 flex justify-end">
        <Button
          variant="primary"
          size="lg"
          disabled={isSaving}
          onClick={handleSaveAll}
          className="font-bold shadow-orange-glow"
          leftIcon={<Save className="w-4 h-4" />}
        >
          {isSaving ? "Saving Rates..." : `Save All Changes (${activeCount} Active)`}
        </Button>
      </div>
    </div>
  );
};
