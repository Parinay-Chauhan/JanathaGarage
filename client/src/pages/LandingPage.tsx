import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  Car,
  ChevronRight,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Star,
  ShieldCheck,
} from "lucide-react";
import { useGetCategoriesQuery, useGetServicesQuery } from "../features/services/api/servicesApi";
import { useGetTechniciansQuery } from "../features/technicians/api/techniciansApi";
import { useLanguage } from "../context/LanguageContext";
import { Service } from "../types/api.types";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Skeleton } from "../components/ui/Skeleton";
import { BookingModal } from "../features/bookings/components/BookingModal";
import { useGSAP, heroReveal } from "../lib/gsap";

interface LandingPageProps {
  onOpenAuthModal?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuthModal }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { t, tc, ts } = useLanguage();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: servicesData, isLoading: servicesLoading } = useGetServicesQuery();
  const { data: techniciansData } = useGetTechniciansQuery();

  useGSAP(
    () => {
      if (heroRef.current) {
        heroReveal(heroRef.current, heroRef.current.querySelectorAll(".hero-elem"));
      }
    },
    { scope: heroRef }
  );

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Ambient Glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/15 dark:bg-brand-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="hero-elem inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold tracking-wide uppercase shadow-sm">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>{t("hero.badge")}</span>
          </div>

          <h1 className="hero-elem text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-stone-900 dark:text-white leading-[1.15]">
            {t("hero.title1")}{" "}
            <span className="text-gradient">{t("hero.titleHighlight")}</span>
          </h1>

          <p className="hero-elem text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>

          <div className="hero-elem flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to="/services">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="px-8 shadow-glow-lg"
              >
                {t("hero.bookButton")}
              </Button>
            </Link>
            <Link to="/technicians">
              <Button variant="secondary" size="lg">
                {t("nav.findMechanics")}
              </Button>
            </Link>
          </div>

          {/* Quick Stats Pills */}
          <div className="hero-elem pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm backdrop-blur-sm">
              <p className="text-2xl font-extrabold text-stone-900 dark:text-white font-mono">
                {t("hero.stat1Value")}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                {t("hero.stat1Label")}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm backdrop-blur-sm">
              <p className="text-2xl font-extrabold text-stone-900 dark:text-white font-mono">
                {t("hero.stat2Value")}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                {t("hero.stat2Label")}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm backdrop-blur-sm">
              <p className="text-2xl font-extrabold text-stone-900 dark:text-white font-mono">
                4.9★
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                {t("techPage.reviews")}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm backdrop-blur-sm">
              <p className="text-2xl font-extrabold text-stone-900 dark:text-white font-mono">
                {t("hero.stat3Value")}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                {t("hero.stat3Label")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
              {t("categories.eyebrow")}
            </span>
            <h2 className="text-3xl font-bold font-display text-stone-900 dark:text-white mt-1">
              {t("categories.title")}
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-500 hover:text-brand-600 group"
          >
            <span>{t("categories.viewServices")}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {categoriesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-44 w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriesData?.data && categoriesData.data.length > 0 ? (
              categoriesData.data.map((category) => (
                <Link
                  key={category.id}
                  to={`/services?category=${category.id}`}
                  className="group"
                >
                  <Card
                    hoverable
                    className="h-full flex flex-col justify-between border-stone-200/80 dark:border-stone-800 hover:border-brand-500/50"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/50 text-brand-500 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                        <Car className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold font-display text-stone-900 dark:text-white group-hover:text-brand-500 transition-colors">
                        {tc(category.name)}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                        {category.services?.length || 0} {t("categories.specializedRepairs")}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs font-semibold text-brand-500 pt-4 mt-4 border-t border-stone-100 dark:border-stone-800">
                      <span>{t("categories.viewServices")}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-sm text-stone-500 dark:text-stone-400">
                No service categories currently available. Please check back shortly.
              </div>
            )}
          </div>
        )}
      </section>

      {/* Featured Services with Instant Booking */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
            {t("trending.eyebrow")}
          </span>
          <h2 className="text-3xl font-bold font-display text-stone-900 dark:text-white mt-1">
            {t("trending.title")}
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
            {t("trending.subtitle")}
          </p>
        </div>

        {servicesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-56 w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(servicesData?.data || []).slice(0, 6).map((service) => (
              <Card
                key={service.id}
                className="flex flex-col justify-between border-stone-200/80 dark:border-stone-800"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {tc(service.category?.name || "Maintenance")}
                    </span>
                    <span className="text-lg font-mono font-extrabold text-stone-900 dark:text-white">
                      ₹{service.defaultPrice}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-stone-900 dark:text-white">
                    {ts(service.title)}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
                    {t("trending.desc")}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-3">
                  <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-brand-500" />
                    <span>{t("trending.duration")}</span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleBookService(service)}
                  >
                    {t("trending.bookBtn")}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Featured Verified Technicians Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 text-white border border-stone-800 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-xl space-y-4">
              <Badge variant="brand" size="sm">
                {t("mechanics.badge")}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
                {t("mechanics.title")}
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed">
                {t("mechanics.desc")}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{t("mechanics.p1")}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{t("mechanics.p2")}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{t("mechanics.p3")}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{t("mechanics.p4")}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 min-w-[240px]">
              <Link to="/technicians">
                <Button variant="primary" size="lg" className="w-full">
                  {t("mechanics.browseAll")}
                </Button>
              </Link>
              <Link to="/technician/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-white border-stone-700 hover:bg-stone-800"
                >
                  {t("mechanics.joinBtn")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Real Featured Mechanics Showcase */}
          {techniciansData?.data && techniciansData.data.length > 0 && (
            <div className="mt-10 pt-10 border-t border-stone-800">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">
                    {t("mechanics.nearYou")}
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {t("mechanics.nearYouSubtitle")}
                  </p>
                </div>
                <Link
                  to="/technicians"
                  className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1"
                >
                  <span>{t("mechanics.browseAll")} ({techniciansData.data.length})</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {techniciansData.data.slice(0, 4).map((tech) => (
                  <div
                    key={tech.id}
                    className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 hover:border-brand-500/50 transition-all flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>{t("mechanics.p1")}</span>
                        </span>
                        <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{tech.avgRating || 5.0}</span>
                        </div>
                      </div>

                      <h4 className="font-bold text-base text-white font-display">
                        {tech.user?.fullName || "Certified Technician"}
                      </h4>
                      <p className="text-xs text-stone-400 mt-1">
                        {tech.experienceYears} {t("mechanics.experience")}
                      </p>
                      <p className="text-xs text-stone-400 line-clamp-2 mt-2 leading-relaxed">
                        {tech.bio}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-stone-500 block">
                          {t("mechanics.visitFee")}
                        </span>
                        <span className="text-sm font-bold font-mono text-white">
                          ₹{tech.baseVisitingCharge}
                        </span>
                      </div>
                      <Link to={`/technicians/${tech.id}`}>
                        <Button variant="outline" size="sm" className="text-xs py-1.5 px-3 border-stone-700 hover:bg-stone-800 text-white">
                          {t("mechanics.viewProfile")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Flow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
            {t("howItWorks.eyebrow")}
          </span>
          <h2 className="text-3xl font-bold font-display text-stone-900 dark:text-white mt-1">
            {t("howItWorks.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: t("howItWorks.step1Title"),
              desc: t("howItWorks.step1Desc"),
            },
            {
              step: "02",
              title: t("howItWorks.step2Title"),
              desc: t("howItWorks.step2Desc"),
            },
            {
              step: "03",
              title: t("howItWorks.step3Title"),
              desc: t("howItWorks.step3Desc"),
            },
            {
              step: "04",
              title: t("howItWorks.step4Title"),
              desc: t("howItWorks.step4Desc"),
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm"
            >
              <div className="text-3xl font-mono font-extrabold text-brand-500/20 dark:text-brand-500/30 mb-3">
                {item.step}
              </div>
              <h3 className="text-lg font-bold font-display text-stone-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

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
