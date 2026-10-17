import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Clock, AlertCircle } from "lucide-react";
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

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenAuthModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategoryParam = searchParams.get("category") || "ALL";

  const { t, tc, ts } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const { data: categoriesData, isLoading: catLoading } = useGetCategoriesQuery();
  const { data: servicesData, isLoading: servicesLoading } = useGetServicesQuery({
    categoryId: selectedCategoryParam !== "ALL" ? selectedCategoryParam : undefined,
  });

  const handleCategorySelect = (categoryId: string) => {
    if (categoryId === "ALL") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", categoryId);
    }
    setSearchParams(searchParams);
  };

  const filteredServices = (servicesData?.data || []).filter((s) => {
    return (
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ts(s.title).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-stone-900 dark:text-white">
          {t("servicesPage.title")}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
          {t("servicesPage.subtitle")}
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <input
            type="text"
            placeholder={t("servicesPage.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 shadow-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
          <button
            onClick={() => handleCategorySelect("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategoryParam === "ALL"
                ? "bg-brand-500 text-white shadow-glow"
                : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800"
            }`}
          >
            {t("servicesPage.allServices")}
          </button>
          {!catLoading &&
            categoriesData?.data?.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategoryParam === cat.id
                    ? "bg-brand-500 text-white shadow-glow"
                    : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800"
                }`}
              >
                {tc(cat.name)}
              </button>
            ))}
        </div>
      </div>

      {/* Services Grid */}
      {servicesLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-60 w-full rounded-2xl" />
          ))}
        </div>
      ) : filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              hoverable
              className="flex flex-col justify-between border-stone-200/80 dark:border-stone-800"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {tc(service.category?.name || "Auto Service")}
                  </span>
                  <span className="text-xl font-mono font-extrabold text-stone-900 dark:text-white">
                    ₹{service.defaultPrice}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-stone-900 dark:text-white">
                  {ts(service.title)}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
                  {t("trending.desc")}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-3">
                <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-brand-500" />
                  <span>{t("servicesPage.visitDuration")}</span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedService(service);
                    setBookingModalOpen(true);
                  }}
                >
                  {t("trending.bookBtn")}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-white font-display">
            {t("servicesPage.noServices")}
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
            {t("servicesPage.tryDifferent")}
          </p>
        </div>
      )}

      {/* Booking Dialog */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        service={selectedService}
        onRequireAuth={onOpenAuthModal}
      />
    </div>
  );
};
