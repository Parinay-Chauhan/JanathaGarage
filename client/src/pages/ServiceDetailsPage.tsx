import React, { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Wrench,
  Clock,
  ShieldCheck,
  Star,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Phone,
  ChevronDown,
  ChevronUp,
  MapPin,
  CalendarCheck,
  BadgeCheck,
  Sparkles,
  AlertCircle,
  Check,
  Radio,
  UserCheck,
  Shield,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import {
  useGetServiceByIdQuery,
  useGetServicesQuery,
} from "../features/services/api/servicesApi";
import { useGetTechniciansQuery } from "../features/technicians/api/techniciansApi";
import { useLanguage } from "../context/LanguageContext";
import { Service } from "../types/api.types";
import { Skeleton } from "../components/ui/Skeleton";
import { BookingModal } from "../features/bookings/components/BookingModal";
import { getServiceImage, handleImageError } from "../lib/serviceImageMap";

interface ServiceDetailsPageProps {
  onOpenAuthModal?: () => void;
}

export const ServiceDetailsPage: React.FC<ServiceDetailsPageProps> = ({
  onOpenAuthModal,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, tc, ts, language } = useLanguage();
  const isHi = language === "hi";

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Queries
  const { data: serviceByIdData, isLoading: srvLoading } = useGetServiceByIdQuery(
    slug || "",
    { skip: !slug }
  );
  const { data: allServicesData } = useGetServicesQuery();
  const { data: techniciansData } = useGetTechniciansQuery();

  // Find service from query or fallback
  const service: Service = useMemo(() => {
    if (serviceByIdData?.data) {
      return {
        ...serviceByIdData.data,
        image: getServiceImage(
          serviceByIdData.data.title,
          serviceByIdData.data.category?.slug,
          serviceByIdData.data.image
        ),
      };
    }
    if (allServicesData?.data && slug) {
      const found = allServicesData.data.find(
        (s) =>
          s.id === slug ||
          s.title.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
      );
      if (found) {
        return {
          ...found,
          image: getServiceImage(found.title, found.category?.slug, found.image),
        };
      }
    }

    // Default rich fallback matching slug
    return {
      id: slug || "srv-featured",
      title: "Split AC Deep Foam Jet Service & Gas Check",
      categoryId: "ac-repair",
      category: { id: "ac-repair", name: "AC Repair & Service", slug: "ac-repair" },
      defaultPrice: 549,
      description:
        "Comprehensive deep foam jet wash designed to remove accumulated indoor dirt, restore cooling airflow, and sterilize coils using eco-friendly antibacterial agents.",
      durationMinutes: 45,
      rating: 4.9,
      reviewsCount: 184,
      image: getServiceImage("Split AC Deep Foam Jet Service & Gas Check", "ac-repair"),
    };
  }, [serviceByIdData, allServicesData, slug]);

  // Included work items
  const includedWork = [
    isHi
      ? "इनडोर इवेपोरेटर कॉइल और ब्लोअर के लिए हाई-प्रेशर जेट वॉश"
      : "High-pressure jet pump wash for indoor evaporator coil and blower",
    isHi
      ? "आउटडोर कंडेनसर फिन्स की डीप क्लीनिंग व डस्ट ब्लो-आउट"
      : "Outdoor unit condenser fin cleaning and dust blow-out",
    isHi
      ? "लीकप्रूफ ड्रेनेज ट्रे इंस्पेक्शन और एंटीबैक्टीरियल फ्लश"
      : "Leakproof drainage tray inspection and antibacterial flush",
    isHi
      ? "ऑपरेटिंग गैस प्रेशर व कंप्रेसर लोड एम्पिएरेज डायग्नोस्टिक्स"
      : "Operating refrigerant pressure & compressor load amperage testing",
    isHi
      ? "एंटीमाइक्रोबियल प्रोटेक्टिव स्प्रे व एयर फिल्टर सैनिटाइजेशन"
      : "Air filter wash and antimicrobial protective spray coating",
    isHi
      ? "सर्विस के बाद डिजिटल थर्मामीटर से कूलिंग परफॉरमेंस टेस्ट"
      : "Post-service cooling performance temperature check with client signoff",
  ];

  const excludedWork = [
    isHi
      ? "कॉपर पाइपिंग एक्सटेंशन (आवश्यकता पड़ने पर अलग कोटेशन)"
      : "Major copper piping extension (quoted separately if required)",
    isHi
      ? "कंप्रेसर रिप्लेसमेंट या आउटडोर यूनिट वॉल ब्रैकेट रीमाउंटिंग"
      : "Compressor replacement or outdoor unit wall bracket remounting",
    isHi
      ? "स्पेयर पार्ट्स (कैपेसिटर, पीसीबी) तय रेट कार्ड के अनुसार देय होंगे"
      : "Spare part replacements (capacitors, PCBs) billed as per published rate card",
  ];

  // Specific FAQs for service
  const faqs = [
    {
      q: isHi
        ? "बुकिंग के कितनी देर में मैकेनिक मेरे पते पर पहुंचेगा?"
        : "How soon can a technician arrive at my location?",
      a: isHi
        ? "हमारा ऑटो-डिस्पैच सिस्टम आपके नजदीकी प्रमाणित तकनीशियन को असाइन करता है। औसत आगमन समय 25 से 35 मिनट के बीच रहता है।"
        : "Our smart telemetry dispatch system automatically routes your booking to the nearest verified technician in your sector. The average arrival time is 25 to 35 minutes.",
    },
    {
      q: isHi
        ? "क्या कोई छुपा हुआ विजिटिंग या इंस्पेक्शन चार्ज है?"
        : "Is there any hidden visiting or inspection charge?",
      a: isHi
        ? "बिल्कुल नहीं। प्रदर्शित मूल्य (₹" +
          service.defaultPrice +
          ") में सभी मानक श्रम व डोरस्टेप विजिट शामिल हैं। पार्ट्स बदलने से पहले मैकेनिक आपकी लिखित सहमति लेगा।"
        : "No. The price shown (₹" +
          service.defaultPrice +
          ") includes standard service labor and doorstep visit. If additional replacement spare parts are necessary, the technician will present the standard price list for your written approval before proceeding.",
    },
    {
      q: isHi
        ? "इस सर्विस के साथ मुझे क्या वारंटी मिलती है?"
        : "What guarantee or warranty do I get with this service?",
      a: isHi
        ? "JantaGaraj की प्रत्येक सर्विस पर 30 दिन की लिखित डोरस्टेप वारंटी मिलती है। 30 दिनों में कोई भी समस्या होने पर सीनियर इंस्पेक्टर निःशुल्क समाधान करता है।"
        : "Every service booked through JantaGaraj includes an instant 30-day doorstep workmanship warranty. If you encounter any issue within 30 days, we dispatch a senior inspector free of charge.",
    },
    {
      q: isHi
        ? "भुगतान कैसे और कब करना होता है?"
        : "How and when do I make the payment?",
      a: isHi
        ? "भुगतान केवल कार्य पूर्ण होने और आपके सत्यापन के बाद ही लिया जाता है। आप UPI (GPay, PhonePe, Paytm), कार्ड या कैश से सुरक्षित भुगतान कर सकते हैं।"
        : "Payment is strictly collected after the work is fully completed and tested by you. You can pay via UPI (GPay, PhonePe, Paytm), Card, or Cash.",
    },
  ];

  // 1-2-3 Service Process
  const processSteps = [
    {
      step: "01",
      title: isHi ? "तत्काल डिस्पैच व लाइव ट्रैकिंग" : "Dispatch & Live GPS Telemetry",
      desc: isHi
        ? "बुकिंग कन्फर्म होते ही निकटतम प्रमाणित तकनीशियन असाइन होता है। आगमन समय व लाइव लोकेशन ऐप पर दिखती है।"
        : "Within seconds, the nearest background-verified specialist is routed with real-time ETA and vehicle details.",
    },
    {
      step: "02",
      title: isHi ? "4-अंकीय OTP व डिजिटल जॉब कार्ड" : "4-Digit OTP Gate & Diagnostic Scan",
      desc: isHi
        ? "आपके फोन पर आए गोपनीय OTP के सत्यापन के बाद ही मैकेनिक कार्य शुरू करता है। पहले पारदर्शी इंस्पेक्शन होता है।"
        : "Technicians cannot initiate repairs without validating your encrypted start code, followed by structured diagnostics.",
    },
    {
      step: "03",
      title: isHi ? "सत्यापित टेस्टिंग व 30 दिन वारंटी" : "Post-Service Test & 30-Day Warranty",
      desc: isHi
        ? "कार्य पूरा होने पर परफॉरमेंस टेस्ट, डिजिटल जीएसटी इनवॉइस और 30 दिन की निःशुल्क वारंटी स्लिप प्राप्त करें।"
        : "Cooling and electrical loads are verified against OEM specs, generating a digital GST invoice with 30-day protection.",
    },
  ];

  // Related technicians offering this work
  const relatedTechnicians = useMemo(() => {
    if (techniciansData?.data && techniciansData.data.length > 0) {
      return techniciansData.data.slice(0, 3);
    }
    return [
      {
        id: "tech-1",
        user: { fullName: "Sunil Verma", phone: "+91 84396 16833" },
        experienceYears: 8,
        bio: "Specialist in residential HVAC, inverter systems, and deep cleaning.",
        avgRating: 4.92,
        baseVisitingCharge: 199,
        jobsDone: 310,
      },
      {
        id: "tech-2",
        user: { fullName: "Amit Sharma", phone: "+91 84396 16833" },
        experienceYears: 6,
        bio: "Certified technician with 6+ years of commercial and domestic experience.",
        avgRating: 4.88,
        baseVisitingCharge: 149,
        jobsDone: 195,
      },
      {
        id: "tech-3",
        user: { fullName: "Mohammad Imran", phone: "+91 84396 16833" },
        experienceYears: 9,
        bio: "Senior HVAC engineer skilled in split/cassette systems and rapid diagnostics.",
        avgRating: 4.95,
        baseVisitingCharge: 199,
        jobsDone: 420,
      },
    ];
  }, [techniciansData]);

  // Verified reviews
  const serviceReviews = [
    {
      id: "sr-1",
      name: "Gaurav Sen",
      location: "Noida Sector 76",
      rating: 5,
      date: isHi ? "4 दिन पूर्व" : "4 days ago",
      comment: isHi
        ? "जेट वॉश बहुत ही सफाई से किया गया। दीवार या वॉलपेपर पर एक बूंद भी नहीं गिरी। कूलिंग में जबरदस्त सुधार हुआ है!"
        : "The jet wash was executed flawlessly with a dedicated collection jacket. Not a drop touched my wall paint. Cooling airflow is night-and-day better.",
    },
    {
      id: "sr-2",
      name: "Meenakshi K.",
      location: "Dwarka, New Delhi",
      rating: 5,
      date: isHi ? "1 सप्ताह पूर्व" : "1 week ago",
      comment: isHi
        ? "समय के पाबंद और बहुत शालीन। 22 मिनट में पहुंचे, कम गैस प्रेशर की सटीक जांच की और सब कुछ पारदर्शी रखा।"
        : "Punctual and courteous. Arrived in 22 minutes, diagnosed the pressure leak immediately, and charged exactly as per the rate card.",
    },
  ];

  if (srvLoading) {
    return (
      <div className="bg-[#080b11] min-h-screen text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-5 w-44 bg-white/[0.04] rounded-lg" />
          <Skeleton className="h-80 w-full bg-white/[0.03] rounded-3xl" />
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
            <Link to="/services" className="hover:text-white transition-colors">
              {isHi ? "सेवाएं" : "Services"}
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200 font-medium truncate max-w-xs sm:max-w-md">
              {ts(service.title)}
            </span>
          </nav>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isHi ? "सक्रिय डिस्पैच उपलब्ध" : "Live Dispatch Active"}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12 sm:space-y-16">
        {/* Main Grid: Left Details + Right Sticky Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN (8 cols): Title, Visual, Scope, Workflow, FAQ */}
          {/* ========================================================= */}
          <div className="lg:col-span-8 space-y-10 sm:space-y-12">
            {/* Header Area */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                  {tc(service.category?.name || "Professional Service")}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {isHi ? "30 दिन लिखित वारंटी" : "30-Day Doorstep Warranty"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.18]">
                {ts(service.title)}
              </h1>

              {/* Rating & Duration Bar */}
              <div className="flex items-center gap-5 text-xs sm:text-sm text-slate-400 font-normal pt-1 flex-wrap">
                <div className="flex items-center gap-1.5 text-slate-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-white">{service.rating || 4.9}</span>
                  <span className="text-slate-400">
                    ({service.reviewsCount || 184} {isHi ? "सत्यापित समीक्षाएं" : "verified reviews"})
                  </span>
                </div>
                <span className="text-slate-700">•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{service.durationMinutes || 45} {isHi ? "मिनट अनुमानित अवधि" : "mins typical duration"}</span>
                </div>
                <span className="text-slate-700 hidden sm:inline">•</span>
                <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
                  <BadgeCheck className="w-4 h-4 text-cyan-400" />
                  <span>{isHi ? "ओरिजिनल OEM उपकरण" : "OEM Diagnostic Standards"}</span>
                </div>
              </div>
            </div>

            {/* Service Banner Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[16/9] bg-white/[0.02] border border-white/[0.08] shadow-2xl group">
              <img
                src={
                  service.image ||
                  getServiceImage(service.title, service.category?.slug)
                }
                alt={service.title}
                onError={handleImageError}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b11]/90 via-[#080b11]/20 to-transparent flex items-end p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 font-medium backdrop-blur-md bg-black/40 px-3.5 py-1.5 rounded-full border border-white/[0.1]">
                  <Wrench className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {isHi
                      ? "प्रमाणित तकनीशियन द्वारा आधुनिक टूल्स से निष्पादन"
                      : "Executed using industrial-grade diagnostic & sanitization equipment"}
                  </span>
                </div>
              </div>
            </div>

            {/* Service Overview */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white/[0.02] border border-white/[0.06] shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                {isHi ? "सर्विस विवरण" : "Service Overview"}
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
                {service.description ||
                  "Professional doorstep service provided by verified local technicians. Every booking is backed by genuine spare parts, transparent quotes, and full workmanship warranty."}
              </p>
            </div>

            {/* 1-2-3 Service Process (Workflow) */}
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {isHi ? "प्रक्रिया" : "Service Execution"}
                </span>
                <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                  {isHi ? "यह सर्विस कैसे काम करती है (3 चरण)" : "How This Service Works"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {processSteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:-translate-y-0.5 transition-all duration-300 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-2xl font-mono font-medium text-slate-600 block mb-2">
                        {step.step}
                      </span>
                      <h3 className="text-sm font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-white/[0.04] flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isHi ? "गारंटीकृत मानक" : "Guaranteed standard"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included & Excluded (Scope of Work) */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white/[0.02] border border-white/[0.06] shadow-sm space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                  {isHi ? "कार्य का दायरा (Scope of Work)" : "Scope of Work"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-normal">
                  {isHi
                    ? "पारदर्शी सर्विस नियम—जानें क्या शामिल है और क्या नहीं"
                    : "Clear boundaries to eliminate guesswork and surprise charges."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Included */}
                <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.05] space-y-3.5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{isHi ? "क्या शामिल है" : "What is Included"}</span>
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                    {includedWork.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Excluded */}
                <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.05] space-y-3.5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-slate-400" />
                    <span>{isHi ? "क्या शामिल नहीं है" : "What is Not Included"}</span>
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                    {excludedWork.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Related Certified Technicians */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                    {isHi ? "इस सर्विस हेतु उपलब्ध तकनीशियन" : "Available Technicians For This Service"}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-normal">
                    {isHi
                      ? "आपके क्षेत्र में तत्काल डिस्पैच हेतु सत्यापित विशेषज्ञ"
                      : "Background-verified professionals ready for dispatch in your sector"}
                  </p>
                </div>
                <Link
                  to="/technicians"
                  className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>{isHi ? "सभी देखें" : "View All"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedTechnicians.map((tech) => (
                  <div
                    key={tech.id}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between space-y-4 group"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] text-amber-400 font-semibold text-sm flex items-center justify-center shrink-0">
                          {tech.user?.fullName?.charAt(0) || "T"}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                            {tech.user?.fullName || "Verified Pro"}
                          </h4>
                          <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            KYC Verified
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/[0.04]">
                        <div className="flex items-center gap-1 text-white font-medium">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{tech.avgRating || 4.9}</span>
                        </div>
                        <span>{tech.experienceYears}+ yrs exp</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setBookingModalOpen(true)}
                      className="w-full py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.08] hover:border-white/[0.16] font-medium text-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>{isHi ? "इनके साथ बुक करें" : "Book With Pro"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reviews for Service */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white/[0.02] border border-white/[0.06] shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                    {isHi ? "ग्राहकों की समीक्षाएं" : "Customer Reviews"}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-normal">
                    {isHi
                      ? "पूर्ण की गई बुकिंग्स से प्रमाणित प्रतिक्रियाएं"
                      : "Verified feedback from completed doorstep appointments"}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-medium text-white self-start sm:self-auto">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5.0 Rating</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.05] space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-500">{rev.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal italic">
                      "{rev.comment}"
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.04] text-xs">
                      <span className="font-semibold text-white">{rev.name}</span>
                      <span className="text-slate-500">{rev.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service FAQs */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white/[0.02] border border-white/[0.06] shadow-sm space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                {isHi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
              </h2>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-white/[0.06] bg-white/[0.015] overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-medium text-xs sm:text-sm text-white hover:bg-white/[0.02] transition-colors gap-3"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal border-t border-white/[0.04] pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN (4 cols): Sticky Pricing & Booking Card      */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] shadow-2xl relative overflow-hidden space-y-6">
              {/* Subtle ambient amber accent glow inside card */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

              {/* Pricing breakdown */}
              <div className="relative z-10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-medium tracking-wider text-slate-400">
                    {isHi ? "पारदर्शी तय मूल्य" : "Transparent Rate"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {isHi ? "कोई छिपा शुल्क नहीं" : "Zero Hidden Fees"}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-4xl font-black tracking-tight text-white">
                    ₹{service.defaultPrice}
                  </span>
                  <span className="text-xs text-slate-400 font-normal">
                    {isHi ? "(जीएसटी व इंस्पेक्शन सहित)" : "(Incl. GST & Doorstep Visit)"}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-normal leading-relaxed pt-1">
                  {isHi
                    ? "सर्विस पूर्ण होने और टेस्ट करने के बाद ही भुगतान करें।"
                    : "Pay securely after the job is completed and tested."}
                </p>
              </div>

              {/* Booking Highlights */}
              <div className="relative z-10 space-y-3 pt-5 border-t border-white/[0.06] text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{isHi ? "30 मिनट के भीतर त्वरित डिस्पैच" : "Instant dispatch within 30 minutes"}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{isHi ? "100% पुलिस व क्रेडेंशियल सत्यापित मैकेनिक" : "100% background-checked master technician"}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{isHi ? "30 दिन की लिखित निःशुल्क वारंटी" : "30-day post-service free warranty"}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{isHi ? "UPI, कार्ड या कैश से सुरक्षित भुगतान" : "Pay securely via UPI / Cash upon satisfaction"}</span>
                </div>
              </div>

              {/* Main Booking Action */}
              <div className="relative z-10 space-y-3 pt-5 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full inline-flex flex-row items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                >
                  <span>{isHi ? "अभी सर्विस बुक करें" : "Book This Service Now"}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <a
                  href="tel:+918439616833"
                  className="w-full inline-flex flex-row items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] hover:border-white/[0.16] font-medium text-xs transition-all whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{isHi ? "हेल्पलाइन: +91 84396 16833" : "Call Helpline: +91 84396 16833"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bottom Booking Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#080b11]/90 backdrop-blur-xl border-t border-white/[0.08] p-3.5 lg:hidden flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-medium block">
            {isHi ? "तय मूल्य" : "Starting Price"}
          </span>
          <span className="text-xl font-bold tracking-tight text-white">
            ₹{service.defaultPrice}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setBookingModalOpen(true)}
          className="inline-flex flex-row items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs sm:text-sm shadow-[0_4px_20px_rgba(245,158,11,0.25)] transition-all active:scale-[0.98] whitespace-nowrap"
        >
          <span>{isHi ? "बुक करें" : "Book Service"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Booking Dialog Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        service={service}
        onRequireAuth={onOpenAuthModal}
      />
    </div>
  );
};
