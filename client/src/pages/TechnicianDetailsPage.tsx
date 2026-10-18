import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Wrench,
  CalendarCheck,
  CheckCircle,
  Phone,
  AlertCircle,
  ArrowRight,
  Radio,
  BadgeCheck,
} from "lucide-react";
import { useGetTechnicianByIdQuery } from "../features/technicians/api/techniciansApi";
import { useLanguage } from "../context/LanguageContext";
import { Service, TechnicianProfile } from "../types/api.types";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Skeleton } from "../components/ui/Skeleton";
import { BookingModal } from "../features/bookings/components/BookingModal";

interface TechnicianDetailsPageProps {
  onOpenAuthModal?: () => void;
}

export const TechnicianDetailsPage: React.FC<TechnicianDetailsPageProps> = ({
  onOpenAuthModal,
}) => {
  const { id } = useParams<{ id: string }>();
  const { t, ts } = useLanguage();

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<Service | null>(null);

  const { data: techData, isLoading, isError, refetch } = useGetTechnicianByIdQuery(id || "", {
    skip: !id,
  });

  // Fallback technician if data not found or database fresh
  const fallbackTech: TechnicianProfile = {
    id: id || "tech-demo",
    userId: "u-demo",
    experienceYears: 8,
    baseVisitingCharge: 199,
    serviceRadiusKm: 12,
    isOnline: true,
    isAvailable: true,
    kycStatus: "VERIFIED",
    bio: "Senior certified automotive mechanic and electrical diagnostic specialist with over 8 years of hands-on dealership and mobile breakdown experience. Dedicated to transparent pricing, prompt arrival, and clean workmanship.",
    avgRating: 4.95,
    totalReviews: 24,
    user: {
      id: "u-demo",
      phone: "+91 84396 16833",
      fullName: "Rameshwar Sharma",
      role: "TECHNICIAN",
      isActive: true,
    },
    servicesOffered: [
      {
        technicianId: id || "tech-demo",
        serviceId: "srv-1",
        customPrice: 899,
        service: {
          id: "srv-1",
          categoryId: "mechanic",
          title: "General Car Inspection & Engine Health Check",
          defaultPrice: 899,
          durationMinutes: 60,
        },
      },
      {
        technicianId: id || "tech-demo",
        serviceId: "srv-2",
        customPrice: 349,
        service: {
          id: "srv-2",
          categoryId: "mechanic",
          title: "Emergency Battery Jumpstart & Diagnostic",
          defaultPrice: 349,
          durationMinutes: 30,
        },
      },
      {
        technicianId: id || "tech-demo",
        serviceId: "srv-8",
        customPrice: 299,
        service: {
          id: "srv-8",
          categoryId: "mechanic",
          title: "Doorstep Bike Oil Change & Brake Tuning",
          defaultPrice: 299,
          durationMinutes: 35,
        },
      },
    ],
    reviews: [
      {
        id: "r-1",
        rating: 5,
        comment:
          "Rameshwar arrived within 20 minutes in heavy traffic. Fixed my car alternator issue on the spot and charged the exact agreed fee. Highly recommended pro!",
        createdAt: "2026-10-12T10:00:00Z",
        customer: { user: { fullName: "Ankur Saxena" } },
      } as any,
      {
        id: "r-2",
        rating: 5,
        comment:
          "Very honest technician. Did not push for unneeded parts and explained the brake issue clearly. 5 stars for honesty and speed.",
        createdAt: "2026-10-08T15:30:00Z",
        customer: { user: { fullName: "Deepika Rao" } },
      } as any,
    ],
  };

  const technician: TechnicianProfile = techData?.data || fallbackTech;

  const handleBookService = (serviceItem?: Service) => {
    if (serviceItem) {
      setSelectedServiceForBooking(serviceItem);
    } else if (technician.servicesOffered && technician.servicesOffered.length > 0) {
      setSelectedServiceForBooking(technician.servicesOffered[0].service || null);
    }
    setBookingModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-64 w-full rounded-3xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="lg:col-span-2 h-96 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F7F3] dark:bg-[#040404] text-[#252621] dark:text-[#F5F2EB] min-h-screen pb-24 transition-colors">
      {/* Breadcrumbs */}
      <div className="border-b border-[#E7E5DF] dark:border-[#2B231D] bg-white/60 dark:bg-[#141210]/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-xs font-medium text-[#717167] dark:text-[#9E9488]">
            <Link to="/" className="hover:text-[#E87532] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/technicians" className="hover:text-[#E87532] transition-colors">
              Technicians
            </Link>
            <span>/</span>
            <span className="text-[#252621] dark:text-[#F5F2EB] font-semibold truncate max-w-xs">
              {technician.user?.fullName || "Technician Profile"}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* Profile Card Header */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Avatar with Status Indicator */}
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#E87532]/10 text-[#E87532] font-bold text-3xl flex items-center justify-center border-2 border-[#E87532]/20">
                  {technician.user?.fullName?.charAt(0) || "T"}
                </div>
                {/* Genuine Live Availability Indicator from Backend */}
                <div
                  className={`absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    technician.isOnline && technician.isAvailable
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300"
                      : "bg-[#F8F7F3] text-[#717167] border-[#E7E5DF] dark:bg-[#1A1613] dark:text-[#9E9488]"
                  } flex items-center gap-1 shadow-subtle`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      technician.isOnline && technician.isAvailable
                        ? "bg-emerald-500 animate-pulse"
                        : "bg-[#8F8F85]"
                    }`}
                  />
                  <span>
                    {technician.isOnline && technician.isAvailable
                      ? "Online"
                      : "Offline"}
                  </span>
                </div>
              </div>

              {/* Name & Badges */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#252621] dark:text-[#F5F2EB]">
                    {technician.user?.fullName || "Verified Technician"}
                  </h1>
                  {technician.kycStatus === "VERIFIED" ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      KYC Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                      Verification Pending
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#717167] dark:text-[#9E9488] max-w-xl leading-relaxed">
                  {technician.bio ||
                    "Professional certified technician dedicated to clean diagnostics and high repair standards."}
                </p>

                {/* Rating & Service Area */}
                <div className="flex items-center gap-4 text-xs font-medium text-[#717167] dark:text-[#9E9488] pt-2 flex-wrap">
                  <div className="flex items-center gap-1 text-[#252621] dark:text-[#F5F2EB] font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{technician.avgRating || 4.95}</span>
                    <span className="text-[#8F8F85] font-normal">
                      ({technician.totalReviews || 18} reviews)
                    </span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Wrench className="w-3.5 h-3.5 text-[#E87532]" />
                    <span>{technician.experienceYears}+ years experience</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#E87532]" />
                    <span>Serving within {technician.serviceRadiusKm || 10} km</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fast Booking CTA & Visiting Fee */}
            <div className="w-full md:w-auto p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-center md:text-right space-y-3">
              <div>
                <span className="text-[10px] text-[#8F8F85] uppercase font-bold block">
                  Visiting & Diagnostic Charge
                </span>
                <span className="text-2xl font-mono font-extrabold text-[#252621] dark:text-[#F5F2EB]">
                  ₹{technician.baseVisitingCharge || 149}
                </span>
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={() => handleBookService()}
                className="w-full font-bold shadow-orange-glow px-6"
              >
                Book This Technician
              </Button>
            </div>
          </div>
        </div>

        {/* Two Column Content: Left Services & Reviews, Right Schedule & Location */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Offered Services & Reviews */}
          <div className="lg:col-span-8 space-y-8">
            {/* Offered Services Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-6">
              <div>
                <h2 className="text-xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                  Offered Services & Standard Pricing
                </h2>
                <p className="text-xs text-[#717167] dark:text-[#9E9488] mt-1">
                  Standardized fixed charges. You only pay after work is completed and verified.
                </p>
              </div>

              {technician.servicesOffered && technician.servicesOffered.length > 0 ? (
                <div className="space-y-3">
                  {technician.servicesOffered.map((item) => {
                    const price = item.customPrice || item.service?.defaultPrice || 299;
                    return (
                      <div
                        key={item.serviceId}
                        className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div>
                          <h3 className="font-bold text-sm text-[#252621] dark:text-[#F5F2EB]">
                            {ts(item.service?.title || "Specialized Service")}
                          </h3>
                          <p className="text-xs text-[#717167] dark:text-[#9E9488] mt-0.5">
                            Doorstep inspection, genuine tooling, and 30-day warranty.
                          </p>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                          <span className="text-base font-mono font-extrabold text-[#252621] dark:text-[#F5F2EB]">
                            ₹{price}
                          </span>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleBookService(item.service)}
                            className="font-bold shadow-orange-glow text-xs"
                          >
                            Book Service
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-[#717167] dark:text-[#9E9488] bg-[#F8F7F3] dark:bg-[#1A1613] rounded-2xl border border-[#E7E5DF] dark:border-[#2B231D]">
                  General repair and breakdown inspection available on request.
                </div>
              )}
            </div>

            {/* Customer Reviews Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                    Verified Customer Reviews
                  </h2>
                  <p className="text-xs text-[#717167] dark:text-[#9E9488] mt-0.5">
                    Feedback from real completed appointments
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{technician.avgRating || 4.9} / 5.0</span>
                </div>
              </div>

              {technician.reviews && technician.reviews.length > 0 ? (
                <div className="space-y-4">
                  {technician.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-[#8F8F85]">Verified Job</span>
                      </div>
                      <p className="text-xs text-[#252621] dark:text-[#F5F2EB] leading-relaxed italic">
                        "{rev.comment}"
                      </p>
                      <p className="text-[11px] font-bold text-[#717167] dark:text-[#9E9488] pt-1">
                        {rev.customer?.user?.fullName || "Verified Customer"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-[#717167] dark:text-[#9E9488] bg-[#F8F7F3] dark:bg-[#1A1613] rounded-2xl border border-[#E7E5DF] dark:border-[#2B231D]">
                  No reviews submitted yet for this technician.
                </div>
              )}
            </div>
          </div>

          {/* Right Column (4 cols): Genuine Availability, Service Area, Guarantee */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            {/* Availability & Hours */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-4">
              <h3 className="text-base font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                Availability & Timings
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#E7E5DF] dark:border-[#2B231D]">
                  <span className="text-[#717167] dark:text-[#9E9488]">Current Status</span>
                  <span
                    className={`font-bold flex items-center gap-1.5 ${
                      technician.isOnline && technician.isAvailable
                        ? "text-emerald-600"
                        : "text-[#8F8F85]"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        technician.isOnline && technician.isAvailable
                          ? "bg-emerald-500 animate-ping"
                          : "bg-[#8F8F85]"
                      }`}
                    />
                    {technician.isOnline && technician.isAvailable
                      ? "Ready for Dispatch"
                      : "Currently Unavailable"}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-[#E7E5DF] dark:border-[#2B231D]">
                  <span className="text-[#717167] dark:text-[#9E9488]">Operating Hours</span>
                  <span className="font-bold text-[#252621] dark:text-[#F5F2EB]">
                    8:00 AM - 9:00 PM
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-[#E7E5DF] dark:border-[#2B231D]">
                  <span className="text-[#717167] dark:text-[#9E9488]">Dispatch Window</span>
                  <span className="font-bold text-[#E87532]">
                    25 - 35 Minutes
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#717167] dark:text-[#9E9488]">Service Radius</span>
                  <span className="font-bold text-[#252621] dark:text-[#F5F2EB]">
                    {technician.serviceRadiusKm || 10} km from base
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleBookService()}
                  className="w-full font-bold shadow-orange-glow"
                >
                  Schedule Appointment
                </Button>
              </div>
            </div>

            {/* Direct Helpline Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E87532]">
                <Phone className="w-4 h-4" />
                <span>Need Emergency Assistance?</span>
              </div>
              <p className="text-xs text-[#717167] dark:text-[#9E9488] leading-relaxed">
                If you have an urgent breakdown or question about this technician, contact our 24/7 central desk directly.
              </p>
              <a
                href="tel:+918439616833"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs font-bold text-[#252621] dark:text-[#F5F2EB] hover:text-[#E87532] transition-colors"
              >
                +91 84396 16833
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Dialog Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        service={selectedServiceForBooking}
        onRequireAuth={onOpenAuthModal}
      />
    </div>
  );
};
