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
  Calendar,
  PackageCheck,
  Cpu,
  Gauge,
  Sliders,
  DollarSign,
} from "lucide-react";
import {
  useGetServiceByIdQuery,
  useGetServicesQuery,
} from "../features/services/api/servicesApi";
import { useGetTechniciansQuery } from "../features/technicians/api/techniciansApi";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "../context/LocationContext";
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
  const { location, detectCurrentLocation, isLoadingGPS } = useLocation();

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Scheduling states for the sticky summary box
  const [selectedDate, setSelectedDate] = useState<"today" | "tomorrow" | "dayAfter">("today");
  const [selectedSlot, setSelectedSlot] = useState<string>("urgent");

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
      title: "Comprehensive Car Inspection & OBD-II Diagnostics",
      categoryId: "mechanic",
      category: { id: "mechanic", name: "Auto & Garage Repair", slug: "mechanic" },
      defaultPrice: 899,
      description:
        "40-point vehicle diagnostic including live OBD-II CAN-bus scanner error triage, battery voltage health, brake pad wear inspection, coolant density, and comprehensive digital roadworthiness report.",
      durationMinutes: 60,
      rating: 4.95,
      reviewsCount: 236,
      image: getServiceImage("Comprehensive Car Inspection & OBD-II Diagnostics", "mechanic"),
    };
  }, [serviceByIdData, allServicesData, slug]);

  // Contextual Scope of Work: What's Included
  const includedWork = useMemo(() => {
    const title = (service.title || "").toLowerCase();
    if (title.includes("ac") || title.includes("foam")) {
      return [
        isHi ? "इनडोर इवेपोरेटर कॉइल और ब्लोअर के लिए हाई-प्रेशर जेट वॉश" : "High-pressure jet pump wash for indoor evaporator coil and blower",
        isHi ? "आउटडोर कंडेनसर फिन्स की डीप क्लीनिंग व डस्ट ब्लो-आउट" : "Outdoor condenser fin deep foam wash & dust blow-out",
        isHi ? "लीकप्रूफ ड्रेनेज ट्रे इंस्पेक्शन और एंटीबैक्टीरियल फ्लश" : "Drainage tray overflow check & antibacterial sanitizer flush",
        isHi ? "ऑपरेटिंग गैस प्रेशर व कंप्रेसर लोड एम्पिएरेज डायग्नोस्टिक्स" : "Operating refrigerant pressure & compressor load amperage testing",
        isHi ? "एंटीमाइक्रोबियल प्रोटेक्टिव स्प्रे व एयर फिल्टर सैनिटाइजेशन" : "Air filter cleaning & antimicrobial protective spray coating",
        isHi ? "सर्विस के बाद डिजिटल थर्मामीटर से कूलिंग परफॉरमेंस टेस्ट" : "Post-service cooling temperature drop test with client signoff",
      ];
    }
    if (title.includes("brake") || title.includes("pad")) {
      return [
        isHi ? "फ्रंट व रियर दोनों पहियों के ब्रेक पैड की मोटाई जांच" : "Brake pad thickness inspection on front and rear wheels",
        isHi ? "डिस्क रोटर रन-आउट व ग्रूव स्कोरिंग डायग्नोस्टिक टेस्ट" : "Disc rotor run-out and surface scoring dial gauge test",
        isHi ? "कैलिपर स्लाइड पिन की क्लीनिंग व हाई-टेम्परेचर सिलिकॉन ग्रीसिंग" : "Caliper slide pin degreasing and high-temp silicone lubrication",
        isHi ? "ब्रेक फ्लुइड (DOT 4) की नमी जांच व टॉप-अप" : "DOT 4 brake fluid moisture percentage test and reservoir top-up",
        isHi ? "हाइड्रोलिक लाइन से हवा निकालना (Brake Bleeding)" : "Hydraulic brake bleeding to eliminate pedal sponginess",
        isHi ? "हाईवे स्पीड पर ब्रेकिंग स्टॉपिंग डिस्टेंस टेस्ट" : "Post-installation road test & emergency stopping calibration",
      ];
    }
    if (title.includes("battery") || title.includes("jumpstart")) {
      return [
        isHi ? "हाई-कैपेसिटी हेवी गेज बूस्टर केबल्स से त्वरित जंपस्टार्ट" : "Heavy-duty 1000A booster cable hookup & emergency start",
        isHi ? "डिजिटल मल्टीमीटर से अल्टरनेटर डायोड आउटपुट चार्जिंग टेस्ट" : "Digital multimeter test of alternator charging voltage (13.8V - 14.4V)",
        isHi ? "बैटरी टर्मिनल से सल्फेट व जंग की केमिकल क्लीनिंग" : "Lead terminal corrosion cleanup and anti-oxidant grease coat",
        isHi ? "बैटरी क्रैंकिंग एम्प्स (CCA) और हेल्थ प्रतिशत रिपोर्ट" : "Cold Cranking Amps (CCA) electronic load test & battery state-of-health",
        isHi ? "पैरासिटिक करंट ड्रेन (Dark Current) का रिसाव परीक्षण" : "Parasitic current drain detection to identify overnight battery drain",
      ];
    }
    return [
      isHi ? "40-पॉइंट कम्प्यूटरीकृत OBD-II डायग्नोस्टिक स्कैन" : "40-point computerized OBD-II CAN-bus ECU health scan",
      isHi ? "इंजन ऑयल लेवल, विस्कोसिटी व बर्न कंडीशन एनालिसिस" : "Engine oil level, viscosity breakdown & burnt residue analysis",
      isHi ? "कूलेंट डेंसिटी, ब्रेक फ्लुइड व बैटरी चार्ज टेस्टिंग" : "Coolant density, brake fluid moisture & battery cranking test",
      isHi ? "टायर प्रेशर, ट्रेड डेप्थ व सस्पेंशन बुश इंस्पेक्शन" : "Tyre tread depth audit, pressure check & suspension bushing check",
      isHi ? "लाइव सेंसर टेलीमेट्री लॉग व चेक-इंजन एरर कोड रिसेट" : "Live sensor telemetry log & check-engine light DTC code clearing",
      isHi ? "डिजिटल रोडवर्थीनेस इंस्पेक्शन रिपोर्ट ग्राहक डैशबोर्ड पर" : "Comprehensive digital health report delivered directly to your portal",
    ];
  }, [service.title, isHi]);

  // Contextual Scope of Work: What's Excluded
  const excludedWork = useMemo(() => {
    return [
      isHi ? "अनधिकृत या बिना कोटेशन वाले अतिरिक्त स्पेयर पार्ट्स" : "Unquoted replacement parts (quoted and approved upfront)",
      isHi ? "मेजर इंजन ओवरहाल या ट्रांसमिशन ड्रॉपिंग (गैराज में आवश्यक)" : "Major engine rebuild or transmission removal (requires hoist at garage)",
      isHi ? "अनधिकृत ऑफ-प्लेटफॉर्म नकद मांग (सख्त रूप से प्रतिबंधित)" : "Off-platform unitemized cash charges (strictly prohibited)",
      isHi ? "थर्ड-पार्टी एक्सीडेंट क्लेम लीगल डॉक्यूमेंटेशन" : "Third-party motor insurance claim legal liaison work",
    ];
  }, [isHi]);

  // Contextual Parts & Consumables Used (Transparency Highlight)
  const partsUsed = useMemo(() => {
    const title = (service.title || "").toLowerCase();
    if (title.includes("ac") || title.includes("foam")) {
      return [
        {
          name: "R134a / R32 Refrigerant",
          spec: "99.9% High Purity Gas",
          brand: "Chemours / Floron OEM",
          warranty: "12 Months Cooling SLA",
        },
        {
          name: "Antibacterial Coil Foam",
          spec: "Bio-Enzymatic Degreaser",
          brand: "3M Professional Automotive",
          warranty: "Non-Corrosive Fin Seal",
        },
        {
          name: "Microfiber Cabin Filter",
          spec: "PM 2.5 Active Carbon Layer",
          brand: "Bosch / Mahle",
          warranty: "10,000 km Airflow Guarantee",
        },
      ];
    }
    if (title.includes("brake") || title.includes("pad")) {
      return [
        {
          name: "Ceramic Disc Brake Pads",
          spec: "Low-Dust High-Friction Matrix",
          brand: "Bosch / Brembo / TVS OEM",
          warranty: "15,000 km Wear Warranty",
        },
        {
          name: "Synthetic Caliper Pin Grease",
          spec: "High-Temp Silicone Lubricant",
          brand: "Liqui Moly / Würth",
          warranty: "Prevents Caliper Seizing",
        },
        {
          name: "DOT 4 Hydraulic Brake Fluid",
          spec: "Dry Boiling Point > 260°C",
          brand: "Castrol / Bosch DOT4",
          warranty: "Sealed Factory Container",
        },
      ];
    }
    return [
      {
        name: "OBD-II CAN-Bus Telemetry Scanner",
        spec: "ISO 15765-4 Diagnostic Rig",
        brand: "Launch / Autel Diagnostic",
        warranty: "Calibrated Hardware",
      },
      {
        name: "Synthetic Engine Lube (if chosen)",
        spec: "API SN Plus / ACEA A3/B4",
        brand: "Mobil 1 / Castrol Magnatec",
        warranty: "10,000 km Engine Protection",
      },
      {
        name: "Spin-on Oil Filter Element",
        spec: "Synthetic Blend Pleated Media",
        brand: "Bosch / Purolator OEM",
        warranty: "100% Anti-Drainback Valve",
      },
    ];
  }, [service.title]);

  // FAQs
  const faqs = [
    {
      q: isHi
        ? "बुकिंग के कितनी देर में मैकेनिक मेरे स्थान पर पहुंचेगा?"
        : "How soon does the technician arrive after booking?",
      a: isHi
        ? "हमारा ऑटो-डिस्पैच सिस्टम आपके नजदीकी प्रमाणित तकनीशियन को असाइन करता है। औसत आगमन समय 25 से 35 मिनट के बीच रहता है।"
        : "Our smart telemetry dispatch radar routes your booking to the nearest verified technician in your sector with an average doorstep arrival SLA under 28 minutes.",
    },
    {
      q: isHi
        ? "क्या कोई छुपा हुआ विजिटिंग या इंस्पेक्शन चार्ज है?"
        : "Is there any hidden visiting or inspection charge?",
      a: isHi
        ? `बिल्कुल नहीं। प्रदर्शित मूल्य (₹${service.defaultPrice}) में सभी मानक श्रम व डोरस्टेप विजिट शामिल हैं। ₹149 का इंस्पेक्शन शुल्क अंतिम बिल में 100% समायोजित कर दिया जाता है।`
        : `No. The standard ₹149 inspection fee is 100% credited against your service invoice. You only pay the transparent published rate of ₹${service.defaultPrice}.`,
    },
    {
      q: isHi
        ? "इस सर्विस के साथ मुझे क्या वारंटी मिलती है?"
        : "What guarantee or warranty do I get with this service?",
      a: isHi
        ? "JantaGaraj की प्रत्येक सर्विस पर 30 दिन की लिखित डोरस्टेप वारंटी मिलती है। 30 दिनों में वही समस्या होने पर वरिष्ठ मैकेनिक निःशुल्क समाधान करता है।"
        : "Every qualifying repair includes a 30-day doorstep workmanship warranty. If the diagnosed issue recurs within 30 days, we dispatch a senior inspector free of charge.",
    },
    {
      q: isHi
        ? "भुगतान कैसे और कब करना होता है?"
        : "How and when do I make the payment?",
      a: isHi
        ? "भुगतान केवल कार्य पूर्ण होने, टेस्ट ड्राइव और आपके संतुष्ट होने के बाद ही लिया जाता है। आप UPI, कार्ड या कैश से सुरक्षित भुगतान कर सकते हैं।"
        : "Payment is strictly collected after work completion and your personal road-test verification. Pay securely via UPI, Card, or Cash.",
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
        : "Cooling and mechanical loads are verified against OEM specs, generating a digital GST invoice with 30-day protection.",
    },
  ];

  // Related certified technicians
  const relatedTechnicians = useMemo(() => {
    if (techniciansData?.data && techniciansData.data.length > 0) {
      return techniciansData.data.slice(0, 3);
    }
    return [
      {
        id: "tech-1",
        user: { fullName: "Rameshwar Sharma", phone: "+91 84396 16833" },
        experienceYears: 9,
        bio: "Master diagnostic engineer specializing in OBD-II live telemetry, EFI, and engine overhauls.",
        avgRating: 4.95,
        baseVisitingCharge: 199,
        jobsDone: 342,
      },
      {
        id: "tech-2",
        user: { fullName: "Vikramjit Singh", phone: "+91 84396 16833" },
        experienceYears: 7,
        bio: "Specialist in automotive electricals, alternator diagnostics, and circuit load testing.",
        avgRating: 4.91,
        baseVisitingCharge: 149,
        jobsDone: 280,
      },
      {
        id: "tech-3",
        user: { fullName: "Sunil Verma", phone: "+91 84396 16833" },
        experienceYears: 8,
        bio: "HVAC cooling precision specialist with expertise in R134a/R32 charging and deep foam jet cleaning.",
        avgRating: 4.88,
        baseVisitingCharge: 249,
        jobsDone: 410,
      },
    ];
  }, [techniciansData]);

  // Verified reviews
  const serviceReviews = [
    {
      id: "sr-1",
      name: "Rohit Agarwal",
      location: "Indirapuram, Ghaziabad",
      rating: 5,
      date: isHi ? "3 दिन पहले" : "3 days ago",
      comment: isHi
        ? "हाईवे पर कार की समस्या को 24 मिनट में मौके पर पहुंचकर ठीक किया। अल्टरनेटर का आउटपुट भी चेक किया। पारदर्शी तय रेट, कोई मोलभाव नहीं।"
        : "Technician arrived in 24 minutes, hooked up diagnostics, and verified the alternator output before letting me leave. Transparent rate card, zero roadside bargaining.",
    },
    {
      id: "sr-2",
      name: "Pooja Deshmukh",
      location: "Kothrud, Pune",
      rating: 5,
      date: isHi ? "1 सप्ताह पहले" : "1 week ago",
      comment: isHi
        ? "कार्य बहुत ही सफाई से किया गया। डिजिटल इनवॉइस और 30 दिन की वारंटी स्लिप तुरंत मिली। अनवेरिफाइड मैकेनिकों से कहीं बेहतर अनुभव।"
        : "Very polite, clean work, and zero mess left behind. Digital GST bill and 30-day warranty slip were issued on the spot.",
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[560px] bg-[radial-gradient(ellipse_70%_50%_at_50%_-15%,rgba(245,158,11,0.06),transparent_70%)] pointer-events-none -z-0" />
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
            <span>
              {isHi ? "सक्रिय डिस्पैच उपलब्ध" : "Live Dispatch Active"} (
              {location.city || "NCR Metro"})
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12 sm:space-y-16">
        {/* ========================================================= */}
        {/* MAIN SPLIT VIEW: LEFT DETAILS + RIGHT STICKY SUMMARY BOX  */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN (8 cols): Title, Visual, Scope, Parts, Workflow*/}
          {/* ========================================================= */}
          <div className="lg:col-span-8 space-y-10 sm:space-y-12">
            {/* Header Area */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                  {tc(service.category?.name || "Automotive Engineering")}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {isHi ? "30 दिन लिखित वारंटी" : "30-Day Workmanship Warranty"}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
                  <Radio className="w-3.5 h-3.5 text-cyan-400" />
                  {isHi ? "< 28 मिनट डिस्पैच SLA" : "< 28 Min Dispatch SLA"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.16]">
                {ts(service.title)}
              </h1>

              {/* Rating, Duration & Standards Bar */}
              <div className="flex items-center gap-5 text-xs sm:text-sm text-slate-400 font-normal pt-1 flex-wrap">
                <div className="flex items-center gap-1.5 text-slate-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-white">{service.rating || 4.95}</span>
                  <span className="text-slate-400">
                    ({service.reviewsCount || 236} {isHi ? "सत्यापित समीक्षाएं" : "audited reviews"})
                  </span>
                </div>
                <span className="text-slate-700">•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>{service.durationMinutes || 45} {isHi ? "मिनट अनुमानित अवधि" : "mins typical duration"}</span>
                </div>
                <span className="text-slate-700 hidden sm:inline">•</span>
                <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
                  <BadgeCheck className="w-4 h-4 text-amber-400" />
                  <span>{isHi ? "OEM डायग्नोस्टिक मानक" : "OEM Diagnostic Standards"}</span>
                </div>
              </div>
            </div>

            {/* Service Banner Image with Dark Vignette */}
            <div className="relative rounded-3xl overflow-hidden aspect-[16/9] bg-[#0d121c] border border-white/[0.08] shadow-2xl group">
              <img
                src={
                  service.image ||
                  getServiceImage(service.title, service.category?.slug)
                }
                alt={service.title}
                onError={handleImageError}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b11]/90 via-[#080b11]/25 to-transparent flex items-end p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 font-medium backdrop-blur-md bg-black/60 px-4 py-2 rounded-full border border-white/[0.1]">
                  <Wrench className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {isHi
                      ? "सत्यापित मास्टर मैकेनिक द्वारा आधुनिक टूल्स से निष्पादन"
                      : "Executed using calibrated diagnostic equipment and OEM genuine parts"}
                  </span>
                </div>
              </div>
            </div>

            {/* Service Overview */}
            <div className="p-7 sm:p-8 rounded-3xl bg-[#0d121c]/70 border border-white/[0.06] backdrop-blur-md space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {isHi ? "सर्विस विवरण व तकनीकी मानक" : "Service Overview & Diagnostic Standards"}
              </h2>
              <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
                {service.description ||
                  "Professional doorstep service provided by verified local master mechanics. Every booking is backed by genuine spare parts, transparent upfront rate cards, and full 30-day workmanship warranty."}
              </p>
            </div>

            {/* ========================================================= */}
            {/* TRANSPARENT SCOPE OF WORK: INCLUDED & EXCLUDED BREAKDOWN  */}
            {/* ========================================================= */}
            <div className="p-7 sm:p-8 rounded-3xl bg-[#0d121c]/70 border border-white/[0.06] backdrop-blur-md space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
                  {isHi ? "पारदर्शिता केंद्र" : "Transparency Standard"}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {isHi ? "कार्य का दायरा (Scope of Work)" : "Detailed Scope of Work Breakdown"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-normal">
                  {isHi
                    ? "पारदर्शी सर्विस नियम—स्पष्ट जानें क्या शामिल है और क्या नहीं, शून्य अनपेक्षित बिलिंग।"
                    : "Zero guesswork or roadside surprises. Clear itemized breakdown of what will be performed on your vehicle."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* What is Included */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-emerald-500/20 space-y-3.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{isHi ? "क्या शामिल है (Included)" : "What is Included"}</span>
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

                {/* What is Excluded */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-slate-400" />
                    <span>{isHi ? "क्या शामिल नहीं है (Excluded)" : "What is Not Included"}</span>
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

            {/* ========================================================= */}
            {/* PARTS & CONSUMABLES USED (TRANSPARENCY FOCUS)             */}
            {/* ========================================================= */}
            <div className="p-7 sm:p-8 rounded-3xl bg-[#0d121c]/70 border border-white/[0.06] backdrop-blur-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                    {isHi ? "मूल पार्ट्स प्रमाणन" : "Genuine Consumables & Spares"}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {isHi ? "उपयोग किए जाने वाले स्पेयर पार्ट्स" : "OEM Parts & Consumables Specification"}
                  </h2>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 self-start sm:self-auto">
                  <PackageCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>100% FACTORY SEALED</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                {isHi
                  ? "सभी स्पेयर पार्ट्स संबंधित वाहन निर्माता (OEM) द्वारा अनुशंसित ग्रेड के होते हैं और आधिकारिक वारंटी के साथ आते हैं।"
                  : "All replacement parts and fluids match or exceed vehicle OEM specifications, supplied in tamper-evident sealed packaging."}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                {partsUsed.map((part, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase">
                        Part 0{idx + 1}
                      </span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full font-mono">
                        VERIFIED
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white tracking-tight">
                      {part.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      {part.spec}
                    </p>
                    <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-slate-300">
                      <span>Brand: <strong>{part.brand}</strong></span>
                    </div>
                    <p className="text-[10px] text-cyan-400 font-mono">
                      ✓ {part.warranty}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 1-2-3 Service Execution Workflow */}
            <div className="p-7 sm:p-8 rounded-3xl bg-[#0d121c]/70 border border-white/[0.06] backdrop-blur-md space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
                  {isHi ? "निष्पादन प्रक्रिया" : "Execution Protocol"}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {isHi ? "यह सर्विस कैसे काम करती है (3 चरण)" : "How This Service Works in 3 Steps"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {processSteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2.5 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-2xl font-mono font-bold text-white/[0.15] block mb-1">
                        {step.step}
                      </span>
                      <h3 className="text-sm font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-white/[0.04] flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                      <Check className="w-3.5 h-3.5" />
                      <span>{isHi ? "सत्यापित मानक" : "Guaranteed SLA"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Certified Technicians */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
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
                    className="p-5 rounded-2xl bg-[#0d121c]/70 border border-white/[0.06] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between space-y-4 group"
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
            <div className="p-7 sm:p-8 rounded-3xl bg-[#0d121c]/70 border border-white/[0.06] backdrop-blur-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {isHi ? "ग्राहकों की समीक्षाएं" : "Customer Reviews & Field Reports"}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-normal">
                    {isHi
                      ? "पूर्ण की गई बुकिंग्स से प्रमाणित प्रतिक्रियाएं"
                      : "Verified feedback from completed doorstep appointments"}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-medium text-white self-start sm:self-auto">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.95 / 5.0 Rating</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-3"
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
            <div className="p-7 sm:p-8 rounded-3xl bg-[#0d121c]/70 border border-white/[0.06] backdrop-blur-md space-y-6">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {isHi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
              </h2>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-colors"
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
          {/* RIGHT COLUMN (4 cols): STICKY SUMMARY BOX WITH SCHEDULING */}
          {/* & INSTANT PRICE TALLY (TRANSPARENCY FOCUS)                */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#0d121c]/90 border border-white/[0.08] backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-5">
              {/* Subtle ambient amber accent glow inside card */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

              {/* Instant Price Tally Box */}
              <div className="relative z-10 space-y-3 pb-5 border-b border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-400">
                    {isHi ? "पारदर्शी मूल्य निर्धारण" : "Instant Price Tally"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {isHi ? "शून्य गुप्त शुल्क" : "Zero Hidden Surcharges"}
                  </span>
                </div>

                {/* Line Item Breakdown */}
                <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Base Service & Diagnostics:</span>
                    <span className="font-mono text-white">₹{service.defaultPrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Doorstep Inspection Fee:</span>
                    <span className="font-mono text-slate-400 line-through">₹149</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>100% Inspection Fee Credit:</span>
                    <span className="font-mono font-semibold">-₹149 (WAIVED)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Applicable Taxes (GST):</span>
                    <span className="font-mono text-slate-400">Included</span>
                  </div>
                </div>

                {/* Total Tally Line */}
                <div className="pt-3 border-t border-white/[0.06] flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-medium block">
                      {isHi ? "कुल देय राशि:" : "Total Payable:"}
                    </span>
                    <p className="text-[10px] text-slate-500">
                      {isHi ? "संतुष्टि के बाद ही भुगतान करें" : "Pay strictly post-testing"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black font-mono tracking-tight text-white">
                      ₹{service.defaultPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Scheduling Options */}
              <div className="relative z-10 space-y-3.5">
                <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHi ? "सर्विस शेड्यूलिंग" : "Select Appointment Slot"}</span>
                </span>

                {/* Date Selection Pills */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDate("today")}
                    className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                      selectedDate === "today"
                        ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-sm"
                        : "bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.04]"
                    }`}
                  >
                    <p className="text-xs font-semibold">{isHi ? "आज" : "Today"}</p>
                    <p className="text-[10px] opacity-75 font-mono">Earliest</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedDate("tomorrow")}
                    className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                      selectedDate === "tomorrow"
                        ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-sm"
                        : "bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.04]"
                    }`}
                  >
                    <p className="text-xs font-semibold">{isHi ? "कल" : "Tomorrow"}</p>
                    <p className="text-[10px] opacity-75 font-mono">Scheduled</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedDate("dayAfter")}
                    className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                      selectedDate === "dayAfter"
                        ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-sm"
                        : "bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.04]"
                    }`}
                  >
                    <p className="text-xs font-semibold">{isHi ? "परसों" : "Day After"}</p>
                    <p className="text-[10px] opacity-75 font-mono">Flexible</p>
                  </button>
                </div>

                {/* Time Slot Selection */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedSlot("urgent")}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedSlot === "urgent"
                        ? "bg-cyan-950/40 border-cyan-400/60 text-cyan-300 shadow-sm"
                        : "bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-[11px]">
                      <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                      <span>&lt; 28 Min Dispatch</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">High-priority triage</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedSlot("morning")}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedSlot === "morning"
                        ? "bg-white/[0.08] border-amber-400/60 text-white shadow-sm"
                        : "bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.04]"
                    }`}
                  >
                    <p className="font-semibold text-[11px]">09:00 AM - 11:00 AM</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Morning Slot</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedSlot("afternoon")}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedSlot === "afternoon"
                        ? "bg-white/[0.08] border-amber-400/60 text-white shadow-sm"
                        : "bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.04]"
                    }`}
                  >
                    <p className="font-semibold text-[11px]">01:00 PM - 03:00 PM</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Afternoon Slot</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedSlot("evening")}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedSlot === "evening"
                        ? "bg-white/[0.08] border-amber-400/60 text-white shadow-sm"
                        : "bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.04]"
                    }`}
                  >
                    <p className="font-semibold text-[11px]">04:30 PM - 06:30 PM</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Evening Slot</p>
                  </button>
                </div>

                {/* Location indicator */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/[0.04]">
                  <div className="flex items-center gap-1.5 text-slate-300 truncate">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{location.city || "NCR Metro"}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => detectCurrentLocation()}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-medium underline underline-offset-2 shrink-0 ml-2"
                  >
                    {isLoadingGPS ? "..." : t("nav.gpsDetect")}
                  </button>
                </div>
              </div>

              {/* Guarantees Checklist */}
              <div className="relative z-10 space-y-2 pt-4 border-t border-white/[0.06] text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>30-Day Written Workmanship Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>4-Digit Secure OTP Work Authorization</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Pay Post-Satisfaction via UPI / Card / Cash</span>
                </div>
              </div>

              {/* Main Booking Action */}
              <div className="relative z-10 space-y-2.5 pt-4 border-t border-white/[0.06]">
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
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#080b11]/95 backdrop-blur-xl border-t border-white/[0.08] p-3.5 lg:hidden flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-medium block">
            {isHi ? "कुल देय राशि" : "Total Tally"}
          </span>
          <span className="text-xl font-bold font-mono tracking-tight text-white">
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
