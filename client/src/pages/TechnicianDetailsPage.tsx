import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Wrench,
  CalendarCheck,
  CheckCircle2,
  Phone,
  AlertCircle,
  ArrowRight,
  Radio,
  BadgeCheck,
  Sparkles,
  Check,
  Shield,
  HelpCircle,
  Award,
} from "lucide-react";
import { useGetTechnicianByIdQuery } from "../features/technicians/api/techniciansApi";
import { useLanguage } from "../context/LanguageContext";
import { Service, TechnicianProfile } from "../types/api.types";
import { Skeleton } from "../components/ui/Skeleton";
import { BookingModal } from "../features/bookings/components/BookingModal";

interface TechnicianDetailsPageProps {
  onOpenAuthModal?: () => void;
}

export const TechnicianDetailsPage: React.FC<TechnicianDetailsPageProps> = ({
  onOpenAuthModal,
}) => {
  const { id } = useParams<{ id: string }>();
  const { t, ts, language } = useLanguage();
  const isHi = language === "hi";

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
    bio: isHi
      ? "8+ वर्षों के व्यावहारिक अनुभव के साथ प्रमाणित ऑटोमोटिव और इलेक्ट्रिकल डायग्नोस्टिक विशेषज्ञ। पारदर्शी तय रेट कार्ड, त्वरित आगमन और साफ-सुथरे कार्य के प्रति समर्पित।"
      : "Senior certified automotive mechanic and electrical diagnostic specialist with over 8 years of hands-on dealership and mobile breakdown experience. Dedicated to transparent pricing, prompt arrival, and clean workmanship.",
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
        comment: isHi
          ? "रामेश्वर जी भारी ट्रैफिक के बावजूद 20 मिनट में पहुंचे। कार की अल्टरनेटर समस्या को तुरंत ठीक किया और तय शुल्क ही लिया। बहुत ही अनुशंसित पेशेवर!"
          : "Rameshwar arrived within 20 minutes in heavy traffic. Fixed my car alternator issue on the spot and charged the exact agreed fee. Highly recommended pro!",
        createdAt: "2026-10-12T10:00:00Z",
        customer: { user: { fullName: "Ankur Saxena" } },
      } as any,
      {
        id: "r-2",
        rating: 5,
        comment: isHi
          ? "बहुत ईमानदार तकनीशियन। कोई अनावश्यक पार्ट्स बदलने का दबाव नहीं डाला और समस्या को साफ समझाया। 5 स्टार!"
          : "Very honest technician. Did not push for unneeded parts and explained the brake issue clearly. 5 stars for honesty and speed.",
        createdAt: "2026-10-08T15:30:00Z",
        customer: { user: { fullName: "Deepika Rao" } },
      } as any,
    ],
  };

  const technician: TechnicianProfile = techData?.data || fallbackTech;

  // 1-2-3 Dispatch & Execution Protocol
  const dispatchProtocol = [
    {
      step: "01",
      title: isHi ? "तत्काल डिस्पैच व आगमन" : "Immediate Dispatch & GPS ETA",
      desc: isHi
        ? "बुकिंग के तुरंत बाद तकनीशियन का लाइव जीपीएस रूट और आगमन समय ऐप पर दिखने लगता है।"
        : "Once booked, real-time vehicle telemetry and ETA route directly to your doorstep in < 28 minutes.",
    },
    {
      step: "02",
      title: isHi ? "4-अंकीय स्टार्ट कोड सत्यापन" : "4-Digit OTP Work Authorization",
      desc: isHi
        ? "आपके फोन पर आए गोपनीय ओटीपी के सत्यापन के बाद ही डायग्नोस्टिक्स या रिपेयर कार्य शुरू होता है।"
        : "Technicians cannot initiate diagnostics without you verbalizing the encrypted start PIN.",
    },
    {
      step: "03",
      title: isHi ? "ओरिजिनल पार्ट्स व 30 दिन वारंटी" : "Genuine Spares & 30-Day Warranty",
      desc: isHi
        ? "कार्य पूर्ण होने पर डिजिटल जीएसटी इनवॉइस और 30 दिन की निःशुल्क लिखित वारंटी स्लिप प्राप्त करें।"
        : "Every repair is logged into a tamper-evident digital GST invoice backed by a 30-day warranty.",
    },
  ];

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
      <div className="bg-[#080b11] min-h-screen text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-5 w-48 bg-white/[0.04] rounded-lg" />
          <Skeleton className="h-64 w-full bg-white/[0.03] rounded-3xl" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Skeleton className="lg:col-span-8 h-96 bg-white/[0.03] rounded-3xl" />
            <Skeleton className="lg:col-span-4 h-96 bg-white/[0.03] rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#080b11] text-slate-100 min-h-screen selection:bg-amber-500 selection:text-slate-950 font-sans relative overflow-x-hidden pb-24">
      {/* ========================================================= */}
      {/* 00 QUIET, PREMIUM LIGHTING & ATMOSPHERE                   */}
      {/* ========================================================= */}
      {/* Soft, diffuse overhead ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[560px] bg-[radial-gradient(ellipse_70%_50%_at_50%_-15%,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none -z-0" />
      {/* Micro-warm amber accent whisper */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[360px] bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(245,158,11,0.035),transparent_65%)] pointer-events-none -z-0" />
      {/* Subtle organic grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none -z-0" />

      {/* ========================================================= */}
      {/* BREADCRUMB STRIP                                          */}
      {/* ========================================================= */}
      <div className="relative z-10 border-b border-white/[0.06] bg-[#080b11]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs font-normal text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">
              {isHi ? "होम" : "Home"}
            </Link>
            <span className="text-slate-600">/</span>
            <Link to="/technicians" className="hover:text-white transition-colors">
              {isHi ? "तकनीशियन फ्लीट" : "Technicians"}
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200 font-medium truncate max-w-xs sm:max-w-md">
              {technician.user?.fullName || "Technician Profile"}
            </span>
          </nav>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] text-slate-300">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                technician.isOnline && technician.isAvailable
                  ? "bg-emerald-400 animate-pulse"
                  : "bg-slate-500"
              }`}
            />
            <span>
              {technician.isOnline && technician.isAvailable
                ? isHi ? "डिस्पैच हेतु तैयार" : "Available for Dispatch"
                : isHi ? "वर्तमान में ऑफलाइन" : "Currently Offline"}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-10 sm:space-y-12">
        {/* ========================================================= */}
        {/* PROFILE HERO CARD: High-End Automotive Aesthetic          */}
        {/* ========================================================= */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] shadow-2xl relative overflow-hidden">
          {/* Subtle warm accent in corner */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar with Status Indicator */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/[0.04] border border-white/[0.1] text-amber-400 font-bold text-3xl flex items-center justify-center shadow-lg">
                  {technician.user?.fullName?.charAt(0) || "T"}
                </div>
                {/* Genuine Live Availability Indicator */}
                <div
                  className={`absolute -bottom-1 -right-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                    technician.isOnline && technician.isAvailable
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-white/[0.05] text-slate-400 border-white/[0.1]"
                  } flex items-center gap-1.5 shadow-sm backdrop-blur-md`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      technician.isOnline && technician.isAvailable
                        ? "bg-emerald-400 animate-pulse"
                        : "bg-slate-500"
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
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                    {technician.user?.fullName || "Verified Technician"}
                  </h1>
                  {technician.kycStatus === "VERIFIED" ? (
                    <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isHi ? "पुलिस व आधार सत्यापित" : "KYC Verified Pro"}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20">
                      <span>{isHi ? "सत्यापन प्रगति पर" : "Verification Pending"}</span>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed font-normal">
                  {technician.bio ||
                    "Professional certified technician dedicated to clean diagnostics and high repair standards."}
                </p>

                {/* Rating & Service Area */}
                <div className="flex items-center gap-4 sm:gap-5 text-xs text-slate-400 pt-1 flex-wrap">
                  <div className="flex items-center gap-1.5 text-white font-semibold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{technician.avgRating || 4.95}</span>
                    <span className="text-slate-400 font-normal">
                      ({technician.totalReviews || 18} {isHi ? "समीक्षाएं" : "reviews"})
                    </span>
                  </div>
                  <span className="text-slate-700">•</span>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Wrench className="w-3.5 h-3.5 text-slate-400" />
                    <span>{technician.experienceYears}+ {isHi ? "वर्ष अनुभव" : "years experience"}</span>
                  </div>
                  <span className="text-slate-700 hidden sm:inline">•</span>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{isHi ? `${technician.serviceRadiusKm || 10} किमी कवरेज दायरा` : `Serving within ${technician.serviceRadiusKm || 10} km`}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visiting Fee & Fast Booking CTA */}
            <div className="w-full lg:w-auto p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-left lg:text-right space-y-3 shrink-0">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-medium tracking-wider block">
                  {isHi ? "डोरस्टेप इंस्पेक्शन शुल्क" : "Doorstep Visiting & Diagnostic"}
                </span>
                <div className="flex items-baseline lg:justify-end gap-1.5 mt-0.5">
                  <span className="text-3xl font-black tracking-tight text-white font-mono">
                    ₹{technician.baseVisitingCharge || 149}
                  </span>
                  <span className="text-xs text-slate-400 font-normal">
                    {isHi ? "(कार्य कराने पर 100% माफ)" : "(Waived if repair done)"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleBookService()}
                className="w-full inline-flex flex-row items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs sm:text-sm shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <span>{isHi ? "इन्हें अभी बुक करें" : "Book This Technician"}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 1-2-3 DISPATCH PROTOCOL (WORKFLOW)                        */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {dispatchProtocol.map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:-translate-y-0.5 transition-all duration-300 space-y-3 flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-mono font-medium text-slate-600 block mb-2">
                  {item.step}
                </span>
                <h3 className="text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
              <div className="pt-3 border-t border-white/[0.04] flex items-center gap-1.5 text-[11px] text-slate-500">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isHi ? "मानकीकृत सुरक्षा" : "Standardized security"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* TWO COLUMN CONTENT: SERVICES & REVIEWS vs SIDEBAR         */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Offered Services & Reviews */}
          <div className="lg:col-span-8 space-y-8">
            {/* Offered Services Section */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white/[0.02] border border-white/[0.06] shadow-sm space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                  {isHi ? "प्रमाणित सेवाएं व तय रेट कार्ड" : "Offered Services & Standard Pricing"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 font-normal">
                  {isHi
                    ? "पारदर्शी तय शुल्क। कार्य पूरा होने और टेस्ट करने के बाद ही भुगतान करें।"
                    : "Standardized rate card. Pay securely only after the job is completed and tested."}
                </p>
              </div>

              {technician.servicesOffered && technician.servicesOffered.length > 0 ? (
                <div className="space-y-3">
                  {technician.servicesOffered.map((item) => {
                    const price = item.customPrice || item.service?.defaultPrice || 299;
                    return (
                      <div
                        key={item.serviceId}
                        className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.05] hover:border-white/[0.1] hover:-translate-y-0.5 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <h3 className="font-semibold text-sm sm:text-base text-white">
                            {ts(item.service?.title || "Specialized Service")}
                          </h3>
                          <p className="text-xs text-slate-400 font-normal">
                            {isHi
                              ? "डोरस्टेप इंस्पेक्शन, ओरिजिनल OEM टूल्स और 30 दिन की लिखित वारंटी।"
                              : "Doorstep inspection, industrial tooling, and 30-day workmanship warranty."}
                          </p>
                        </div>

                        <div className="flex items-center gap-3.5 w-full sm:w-auto justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.04]">
                          <span className="text-xl font-mono font-black text-white">
                            ₹{price}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleBookService(item.service)}
                            className="inline-flex flex-row items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs shadow-[0_4px_16px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_24px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                          >
                            <span>{isHi ? "बुक करें" : "Book Service"}</span>
                            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-400 bg-white/[0.015] rounded-2xl border border-white/[0.05]">
                  {isHi
                    ? "अनुरोध पर सामान्य मरम्मत व आपातकालीन ब्रेकडाउन इंस्पेक्शन उपलब्ध है।"
                    : "General repair and breakdown inspection available on direct request."}
                </div>
              )}
            </div>

            {/* Customer Reviews Section */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white/[0.02] border border-white/[0.06] shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                    {isHi ? "सत्यापित ग्राहक समीक्षाएं" : "Verified Customer Reviews"}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-normal">
                    {isHi
                      ? "सफलतापूर्वक पूर्ण की गई बुकिंग्स से प्राप्त रेटिंग्स"
                      : "Direct feedback from completed doorstep service jobs"}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{technician.avgRating || 4.9} / 5.0</span>
                </div>
              </div>

              {technician.reviews && technician.reviews.length > 0 ? (
                <div className="space-y-4">
                  {technician.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.05] space-y-2.5"
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
                        <span className="text-[10px] text-emerald-400 font-medium">✓ Verified Job</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal italic">
                        "{rev.comment}"
                      </p>
                      <p className="text-xs font-semibold text-white pt-1">
                        {rev.customer?.user?.fullName || "Verified Customer"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-400 bg-white/[0.015] rounded-2xl border border-white/[0.05]">
                  {isHi ? "इस तकनीशियन के लिए अभी कोई समीक्षा दर्ज नहीं है।" : "No reviews submitted yet for this technician."}
                </div>
              )}
            </div>
          </div>

          {/* Right Column (4 cols): Genuine Availability, Service Area, Guarantee */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            {/* Availability & Hours Card */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.08] shadow-2xl relative overflow-hidden space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white tracking-tight">
                  {isHi ? "उपलब्धता एवं समय" : "Availability & Timing"}
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.04]">
                  <span className="text-slate-400">{isHi ? "वर्तमान स्थिति" : "Current Status"}</span>
                  <span
                    className={`font-semibold flex items-center gap-1.5 ${
                      technician.isOnline && technician.isAvailable
                        ? "text-emerald-400"
                        : "text-slate-400"
                    }`}
                  >
                    <span>
                      {technician.isOnline && technician.isAvailable
                        ? isHi ? "डिस्पैच हेतु तैयार" : "Ready for Dispatch"
                        : isHi ? "अनुपलब्ध" : "Unavailable"}
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.04]">
                  <span className="text-slate-400">{isHi ? "कार्य समय" : "Operating Hours"}</span>
                  <span className="font-semibold text-white">8:00 AM - 9:00 PM</span>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.04]">
                  <span className="text-slate-400">{isHi ? "औसत आगमन समय" : "Dispatch Window"}</span>
                  <span className="font-semibold text-amber-400">&lt; 28 Minutes</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{isHi ? "सर्विस दायरा" : "Coverage Radius"}</span>
                  <span className="font-semibold text-white">
                    {technician.serviceRadiusKm || 10} km
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleBookService()}
                  className="w-full inline-flex flex-row items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs sm:text-sm shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                >
                  <span>{isHi ? "अपॉइंटमेंट शेड्यूल करें" : "Schedule Appointment"}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>

            {/* Direct Helpline Card */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{isHi ? "आपातकालीन सहायता की आवश्यकता?" : "Need Urgent Assistance?"}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {isHi
                  ? "यदि आपकी गाड़ी रास्ते में बंद हो गई है या तत्काल सहायता चाहिए, तो हमारी 24/7 सेंट्रल हेल्पलाइन से संपर्क करें।"
                  : "If you have an urgent highway breakdown or questions regarding this technician, contact our 24/7 central triage desk."}
              </p>
              <a
                href="tel:+918439616833"
                className="w-full inline-flex flex-row items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-xs font-medium text-slate-200 hover:text-white transition-all whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+91 84396 16833</span>
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
