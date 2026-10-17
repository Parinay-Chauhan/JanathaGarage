import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Wrench,
  Clock,
  Car,
  ChevronRight,
  ArrowRight,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { useGetCategoriesQuery, useGetServicesQuery } from "../features/services/api/servicesApi";
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
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: servicesData, isLoading: servicesLoading } = useGetServicesQuery();

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
            <span>India's #1 Doorstep Auto Garage Network</span>
          </div>

          <h1 className="hero-elem text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-stone-900 dark:text-white leading-[1.15]">
            Vehicle Breakdown? <br />
            <span className="text-gradient">Certified Mechanics</span> At Your Doorstep.
          </h1>

          <p className="hero-elem text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Book trusted neighborhood mechanics for car & bike repair, general servicing, jumpstarts, and roadside SOS in under 30 minutes with transparent rate cards.
          </p>

          <div className="hero-elem flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to="/services">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="px-8 shadow-glow-lg"
              >
                Explore All Services
              </Button>
            </Link>
            <Link to="/technicians">
              <Button variant="secondary" size="lg">
                View Nearby Mechanics
              </Button>
            </Link>
          </div>

          {/* Quick Stats Pills */}
          <div className="hero-elem pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm backdrop-blur-sm">
              <p className="text-2xl font-extrabold text-stone-900 dark:text-white font-mono">
                30 Min
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                Avg Doorstep Arrival
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm backdrop-blur-sm">
              <p className="text-2xl font-extrabold text-stone-900 dark:text-white font-mono">
                100%
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                KYC Verified Mechanics
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm backdrop-blur-sm">
              <p className="text-2xl font-extrabold text-stone-900 dark:text-white font-mono">
                4.9★
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                Customer Rating
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm backdrop-blur-sm">
              <p className="text-2xl font-extrabold text-stone-900 dark:text-white font-mono">
                ₹0
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                No Hidden Surcharges
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
              Complete Vehicle Catalog
            </span>
            <h2 className="text-3xl font-bold font-display text-stone-900 dark:text-white mt-1">
              Popular Service Categories
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-500 hover:text-brand-600 group"
          >
            <span>Browse Full Catalog</span>
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
                        {category.name}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                        {category.services?.length || 0} specialized repairs & diagnostic packages
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs font-semibold text-brand-500 pt-4 mt-4 border-t border-stone-100 dark:border-stone-800">
                      <span>View Services</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              ))
            ) : (
              // Fallback cards if database catalog is newly initialized
              [
                { title: "Car Periodic Maintenance", desc: "Oil change, filters, brake inspection, AC tuning" },
                { title: "Emergency Roadside SOS", desc: "Battery jumpstart, flat tyre replacement, breakdown assistance" },
                { title: "Two-Wheeler Servicing", desc: "Full tune-up, carburetor cleaning, chain lubrication" },
                { title: "Clutch & Brake Diagnostics", desc: "Pad replacement, brake fluid bleed, clutch cable repair" },
              ].map((item, idx) => (
                <Card key={idx} hoverable className="h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/50 text-brand-500 flex items-center justify-center mb-4">
                      <Wrench className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold font-display text-stone-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      {item.desc}
                    </p>
                  </div>
                  <Link
                    to="/services"
                    className="text-xs font-semibold text-brand-500 pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 block"
                  >
                    View Rate Card →
                  </Link>
                </Card>
              ))
            )}
          </div>
        )}
      </section>

      {/* Featured Services with Instant Booking */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
            Instant Doorstep Booking
          </span>
          <h2 className="text-3xl font-bold font-display text-stone-900 dark:text-white mt-1">
            Trending Repair Packages
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
            Select a service below to book a nearby mechanic with secure OTP verification.
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
                      {service.category?.name || "Maintenance"}
                    </span>
                    <span className="text-lg font-mono font-extrabold text-stone-900 dark:text-white">
                      ₹{service.defaultPrice}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-stone-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
                    Doorstep diagnosis, certified parts, and clean execution by our nearest available technician.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-3">
                  <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-brand-500" />
                    <span>~45 min repair</span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleBookService(service)}
                  >
                    Book Service
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
                Certified Garage Network
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
                Meet Verified Mechanics In Your Neighborhood
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed">
                Every technician on JantaGaraj undergoes strict Government ID (Aadhaar / DL) KYC verification and background checks before they can accept bookings.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Police & KYC Verified</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Transparent Rate Cards</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>OTP Secure Job Start</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Live Booking Tracking</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 min-w-[240px]">
              <Link to="/technicians">
                <Button variant="primary" size="lg" className="w-full">
                  Browse All Mechanics
                </Button>
              </Link>
              <Link to="/technician/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-white border-stone-700 hover:bg-stone-800"
                >
                  Join as Technician Partner
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Flow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
            Frictionless Process
          </span>
          <h2 className="text-3xl font-bold font-display text-stone-900 dark:text-white mt-1">
            How JantaGaraj Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Choose Service",
              desc: "Select the required vehicle maintenance package or describe your emergency breakdown issue.",
            },
            {
              step: "02",
              title: "Select Time & Spot",
              desc: "Pick your preferred time slot and service location or roadside GPS pin.",
            },
            {
              step: "03",
              title: "Mechanic Dispatched",
              desc: "Nearest certified technician accepts the job and arrives with necessary tools and parts.",
            },
            {
              step: "04",
              title: "OTP Verification & Pay",
              desc: "Share your 4-digit start OTP. Pay digitally or cash after 100% satisfactory completion.",
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
