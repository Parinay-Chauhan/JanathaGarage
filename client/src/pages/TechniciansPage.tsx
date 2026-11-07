import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  ShieldCheck,
  Search,
  Filter,
  X,
  Clock,
  MapPin,
  Wrench,
  Shield,
  Check,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Phone,
  Zap,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";
import { useGetTechniciansQuery } from "../features/technicians/api/techniciansApi";
import { useLanguage } from "../context/LanguageContext";
import { Skeleton } from "../components/ui/Skeleton";

export const TechniciansPage: React.FC = () => {
  const { t, ts, language } = useLanguage();
  const isHi = language === "hi";

  const { data: techniciansData, isLoading } = useGetTechniciansQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("ALL");
  const [onlineOnly, setOnlineOnly] = useState(false);

  // 12 Rich fallback technicians representing full platform capabilities
  const fallbackTechs = [
    {
      id: "tech-1",
      user: { fullName: "Vikram Sharma", phone: "+91 84396 16833" },
      experienceYears: 8,
      specialty: "mechanic",
      bio: isHi
        ? "मारुति और हुंडई अधिकृत वर्कशॉप में 8+ वर्ष का अनुभव। इंजन डायग्नोस्टिक्स, ब्रेक ओवरहाल और त्वरित डोरस्टेप समाधान में विशेषज्ञ।"
        : "8+ years experience as Head Mechanic at Authorized Maruti & Hyundai workshops. Expert in engine diagnostics, brake overhauls, and fast doorstep breakdown resolution.",
      avgRating: 4.96,
      totalReviews: 24,
      baseVisitingCharge: 199,
      isOnline: true,
      serviceRadiusKm: 15,
      servicesOffered: [
        { serviceId: "s-1", service: { title: "Standard Car Engine Oil & Filter Service" } },
        { serviceId: "s-2", service: { title: "Comprehensive 50-Point Car Health Inspection" } },
        { serviceId: "s-3", service: { title: "Complete AC Gas Refill & Cooling Coil Flush" } },
      ],
    },
    {
      id: "tech-2",
      user: { fullName: "Suresh Verma", phone: "+91 84396 16833" },
      experienceYears: 6,
      specialty: "two-wheeler",
      bio: isHi
        ? "रॉयल एनफील्ड, केटीएम, होंडा और यामाहा ट्यूनिंग में 6 वर्षों का व्यावहारिक अनुभव। इलेक्ट्रिकल वायरिंग और हाई-परफॉरमेंस क्लच में माहिर।"
        : "Master two-wheeler mechanic with 6 years experience in Royal Enfield, Honda, Yamaha, and KTM tuning. Certified for electrical wiring and high-performance clutch setups.",
      avgRating: 4.92,
      totalReviews: 18,
      baseVisitingCharge: 149,
      isOnline: true,
      serviceRadiusKm: 12,
      servicesOffered: [
        { serviceId: "s-4", service: { title: "Two-Wheeler Full Periodic Tune-Up" } },
        { serviceId: "s-5", service: { title: "Carburetor & Fuel Injector Ultrasonic Clean" } },
        { serviceId: "s-6", service: { title: "Chain Sprocket & Disc Brake Overhaul" } },
      ],
    },
    {
      id: "tech-3",
      user: { fullName: "Rajesh Kumar Verma", phone: "+91 84396 16833" },
      experienceYears: 11,
      specialty: "mechanic",
      bio: isHi
        ? "बॉश कार सर्विस में 11 वर्ष का अनुभव। कंप्यूटरयुक्त ओबीडी-II स्कैनर टूल्स, एसी रीचार्ज किट और सस्पेंशन स्ट्रट ओवरहाल से लैस।"
        : "11 years specialized automotive experience. Former senior mechanic at Bosch Car Service. Equipped with digital OBD-II scanning tools, AC recharge kits, and suspension jacks.",
      avgRating: 4.98,
      totalReviews: 32,
      baseVisitingCharge: 249,
      isOnline: true,
      serviceRadiusKm: 18,
      servicesOffered: [
        { serviceId: "s-7", service: { title: "Computerized OBD-II Scanner Diagnostics" } },
        { serviceId: "s-8", service: { title: "Complete AC Gas Refill & Cooling Coil Flush" } },
        { serviceId: "s-9", service: { title: "Suspension Bushing & Strut Replacement" } },
      ],
    },
    {
      id: "tech-4",
      user: { fullName: "Amit Patel", phone: "+91 84396 16833" },
      experienceYears: 5,
      specialty: "emergency",
      bio: isHi
        ? "हाईवे और सिटी इमरजेंसी ब्रेकडाउन विशेषज्ञ। 25 मिनट में पंचर रिपेयर, बैटरी जंपस्टार्ट और कूलेंट लीकेज समाधान।"
        : "Fast response emergency breakdown specialist. Covers highway punctures, battery jumpstarts, and coolant leakage issues within 25 minutes of booking.",
      avgRating: 4.89,
      totalReviews: 21,
      baseVisitingCharge: 179,
      isOnline: true,
      serviceRadiusKm: 20,
      servicesOffered: [
        { serviceId: "s-10", service: { title: "Doorstep Tubeless Tyre Puncture Repair" } },
        { serviceId: "s-11", service: { title: "Starter Motor & Alternator Current Check" } },
        { serviceId: "s-12", service: { title: "Emergency Car Jumpstart & Battery Triage" } },
      ],
    },
    {
      id: "tech-5",
      user: { fullName: "Mohammad Imran", phone: "+91 84396 16833" },
      experienceYears: 7,
      specialty: "plumbing",
      bio: isHi
        ? "अकॉस्टिक मीटर से कंसील्ड पाइप लीकेज डिटेक्शन, सेनेटरी फिटिंग्स और हाई-प्रेशर वॉटर मोटर की मरम्मत में 7+ वर्ष का अनुभव।"
        : "7+ years expertise in residential and commercial plumbing. Concealed leak detection using acoustic meters, sanitary installations, and high-pressure water pump troubleshooting.",
      avgRating: 4.91,
      totalReviews: 16,
      baseVisitingCharge: 149,
      isOnline: true,
      serviceRadiusKm: 10,
      servicesOffered: [
        { serviceId: "s-13", service: { title: "Concealed Pipe Leak Detection & Repair" } },
        { serviceId: "s-14", service: { title: "Bathroom Sanitary Fittings & Mixer Faucet" } },
        { serviceId: "s-15", service: { title: "Water Overhead Tank & Pressure Pump Setup" } },
      ],
    },
    {
      id: "tech-6",
      user: { fullName: "Sunil Kumar Mishra", phone: "+91 84396 16833" },
      experienceYears: 9,
      specialty: "ac",
      bio: isHi
        ? "इन्वर्टर एसी पीसीबी बोर्ड रिपेयर, एंटीबैक्टीरियल फोम जेट वॉश, कॉपर पाइप ब्रेजिंग और R32/R410A गैस चार्जिंग विशेषज्ञ।"
        : "HVAC & multi-brand AC specialist with 9 years experience. Inverter PCB board triage, anti-bacterial foam jet cleaning, copper pipe brazing, and R32/R410A gas charging.",
      avgRating: 4.95,
      totalReviews: 28,
      baseVisitingCharge: 249,
      isOnline: true,
      serviceRadiusKm: 14,
      servicesOffered: [
        { serviceId: "s-16", service: { title: "Split AC Deep Foam Jet Service" } },
        { serviceId: "s-17", service: { title: "Inverter PCB Board Repair & Diagnostics" } },
        { serviceId: "s-18", service: { title: "Complete AC Gas Refill & Cooling Coil Flush" } },
      ],
    },
    {
      id: "tech-7",
      user: { fullName: "Rameshwar Singh Yadav", phone: "+91 84396 16833" },
      experienceYears: 10,
      specialty: "electrician",
      bio: isHi
        ? "3-फेज वायरिंग, एमसीबी ट्रिपिंग फॉल्ट, इन्वर्टर बैटरी बैंक सेटअप और मॉड्युलर स्विचबोर्ड वायरिंग में 10+ वर्ष का अनुभव।"
        : "Senior certified domestic electrician with 10+ years experience in heavy load balancing, 3-phase wiring, MCB tripping triage, inverter battery bank setup, and modular circuits.",
      avgRating: 4.94,
      totalReviews: 19,
      baseVisitingCharge: 179,
      isOnline: true,
      serviceRadiusKm: 12,
      servicesOffered: [
        { serviceId: "s-19", service: { title: "Complete Home Electrical Short Circuit Triage" } },
        { serviceId: "s-20", service: { title: "Inverter & Dual Battery Bank Setup" } },
        { serviceId: "s-21", service: { title: "Ceiling Fan Installation & Regulator Switch Wiring" } },
      ],
    },
    {
      id: "tech-8",
      user: { fullName: "Deepak Chauhan", phone: "+91 84396 16833" },
      experienceYears: 6,
      specialty: "mechanic",
      bio: isHi
        ? "पेंटलेस डेंट रिमूवल (PDR) व डिटेलिंग विशेषज्ञ। ओरिजिनल फैक्ट्री पेंट को नुकसान पहुंचाए बिना डेंट ठीक करना व 9H सेरेमिक कोटिंग।"
        : "Certified Paintless Dent Repair (PDR) & detailing expert. Specialist in German car dent pulling without paint damage, 9H ceramic coating, and doorstep compound buffing.",
      avgRating: 4.93,
      totalReviews: 15,
      baseVisitingCharge: 299,
      isOnline: true,
      serviceRadiusKm: 16,
      servicesOffered: [
        { serviceId: "s-22", service: { title: "Paintless Dent Removal & Minor Scratch Buffing" } },
        { serviceId: "s-23", service: { title: "Ceramic Coating Polish & Hydrophobic Shield" } },
        { serviceId: "s-24", service: { title: "Doorstep Foam Wash & Deep Interior Vacuuming" } },
      ],
    },
    {
      id: "tech-9",
      user: { fullName: "Karan Thapa", phone: "+91 84396 16833" },
      experienceYears: 8,
      specialty: "two-wheeler",
      bio: isHi
        ? "रॉयल एनफील्ड हिमालयन, क्लासिक, केटीएम ड्यूक व सुपरबाइक्स ट्यूनिंग। डिस्क ब्रेक सिस्टम ब्लीडिंग व फोर्क सील रिप्लेसमेंट।"
        : "8 years tuning Royal Enfield Himalayan, Classic, KTM Duke, and Japanese commuter bikes. Complete carburetor syncing, disc brake overhaul, and chain sprocket replacements.",
      avgRating: 4.95,
      totalReviews: 17,
      baseVisitingCharge: 159,
      isOnline: true,
      serviceRadiusKm: 14,
      servicesOffered: [
        { serviceId: "s-25", service: { title: "Royal Enfield & Superbike Engine Tuning" } },
        { serviceId: "s-26", service: { title: "Brembo & Bybre Disc Brake System Bleeding" } },
        { serviceId: "s-27", service: { title: "Fork Seal Replacement & Suspension Stiffening" } },
      ],
    },
    {
      id: "tech-10",
      user: { fullName: "Arjun Gupta", phone: "+91 84396 16833" },
      experienceYears: 5,
      specialty: "appliances",
      bio: isHi
        ? "सभी प्रमुख आरओ वाटर प्यूरीफायर (Kent, Aquaguard), टीडीएस कैलिब्रेशन, बूस्टर पंप व वॉशिंग मशीन रिपेयर में 5 वर्ष का अनुभव।"
        : "5+ years servicing all major RO water purifiers (Kent, Aquaguard, Pureit). TDS membrane testing, booster pump replacement, and fully automatic washing machine motor repairs.",
      avgRating: 4.88,
      totalReviews: 14,
      baseVisitingCharge: 149,
      isOnline: true,
      serviceRadiusKm: 10,
      servicesOffered: [
        { serviceId: "s-28", service: { title: "Comprehensive RO Service & Multi-Stage Filter Replacement" } },
        { serviceId: "s-29", service: { title: "Water TDS Calibration & Booster Pump Check" } },
        { serviceId: "s-30", service: { title: "Automatic Washing Machine Drum & Motor Repair" } },
      ],
    },
    {
      id: "tech-11",
      user: { fullName: "Pooja Rawat", phone: "+91 84396 16833" },
      experienceYears: 6,
      specialty: "security",
      bio: isHi
        ? "एचडी सीसीटीवी कैमरा इंस्टॉलेशन, कैट6 नेटवर्किंग, नाइट-विजन अलाइनमेंट और स्मार्ट वीडियो डोरबेल सेटअप विशेषज्ञ।"
        : "Certified smart home security technician with 6 years experience in HD CCTV installation, Cat6 networking, night-vision camera alignment, and smart digital door lock setup.",
      avgRating: 4.96,
      totalReviews: 13,
      baseVisitingCharge: 199,
      isOnline: true,
      serviceRadiusKm: 15,
      servicesOffered: [
        { serviceId: "s-31", service: { title: "Doorstep HD CCTV Camera Installation & Mobile App Config" } },
        { serviceId: "s-32", service: { title: "Smart Video Doorbell & Digital Lock Fitting" } },
        { serviceId: "s-33", service: { title: "Security DVR/NVR Wiring & Mobile App Live Config" } },
      ],
    },
    {
      id: "tech-12",
      user: { fullName: "Harpreet Singh", phone: "+91 84396 16833" },
      experienceYears: 12,
      specialty: "carpentry",
      bio: isHi
        ? "12+ वर्ष का मास्टर बढ़ई अनुभव। हाइड्रॉलिक कंसील्ड हिंज, मोर्टिस लॉक, स्लाइडिंग वॉर्डरोब रोलर्स व मॉड्यूलर किचन रिपेयर।"
        : "12+ years master carpenter and interior woodwork specialist. Heavy-duty hydraulic concealed hinges, mortise locks, sliding wardrobe rollers, and modular kitchen repair.",
      avgRating: 4.97,
      totalReviews: 22,
      baseVisitingCharge: 249,
      isOnline: true,
      serviceRadiusKm: 15,
      servicesOffered: [
        { serviceId: "s-34", service: { title: "Door Lock, Handle & Concealed Hinge Repair" } },
        { serviceId: "s-35", service: { title: "Modular Kitchen Cabinet & Drawer Channel Tuning" } },
        { serviceId: "s-36", service: { title: "Custom Furniture Assembly & Wooden Polish" } },
      ],
    },
  ];

  const rawTechnicians =
    techniciansData?.data && techniciansData.data.length > 0
      ? techniciansData.data
      : fallbackTechs;

  // Filter chips for specialties
  const specialtyChips = [
    { id: "ALL", label: isHi ? "सभी तकनीशियन" : "All Specialties" },
    { id: "mechanic", label: isHi ? "कार मैकेनिक" : "Auto Mechanics" },
    { id: "two-wheeler", label: isHi ? "बाइक व टू-व्हीलर" : "Two-Wheeler" },
    { id: "emergency", label: isHi ? "रोडसाइड इमरजेंसी" : "Roadside SOS" },
    { id: "ac", label: isHi ? "एसी व एचवीएसी" : "AC & Cooling" },
    { id: "electrician", label: isHi ? "इलेक्ट्रीशियन" : "Electricians" },
    { id: "plumbing", label: isHi ? "प्लंबिंग" : "Plumbers" },
  ];

  // Filtered technicians based on search & specialty
  const filteredTechnicians = useMemo(() => {
    return rawTechnicians.filter((tech: any) => {
      // Specialty filter
      if (selectedSpecialty !== "ALL") {
        const spec = tech.specialty || "";
        const bio = (tech.bio || "").toLowerCase();
        const srvs = (tech.servicesOffered || [])
          .map((s: any) => s.service?.title || "")
          .join(" ")
          .toLowerCase();

        if (selectedSpecialty === "mechanic") {
          if (!spec.includes("mechanic") && !bio.includes("car") && !bio.includes("engine") && !srvs.includes("car"))
            return false;
        } else if (selectedSpecialty === "two-wheeler") {
          if (!spec.includes("two-wheeler") && !bio.includes("bike") && !srvs.includes("two-wheeler"))
            return false;
        } else if (selectedSpecialty === "emergency") {
          if (!spec.includes("emergency") && !bio.includes("jumpstart") && !bio.includes("puncture"))
            return false;
        } else if (selectedSpecialty === "ac") {
          if (!spec.includes("ac") && !bio.includes("ac") && !bio.includes("cooling"))
            return false;
        } else if (selectedSpecialty === "electrician") {
          if (!spec.includes("electrician") && !bio.includes("electrician") && !bio.includes("wiring"))
            return false;
        } else if (selectedSpecialty === "plumbing") {
          if (!spec.includes("plumbing") && !bio.includes("plumb") && !bio.includes("leak"))
            return false;
        }
      }

      // Online only filter
      if (onlineOnly && !tech.isOnline) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = (tech.user?.fullName || "").toLowerCase().includes(q);
        const bioMatch = (tech.bio || "").toLowerCase().includes(q);
        const srvMatch = (tech.servicesOffered || []).some((s: any) =>
          (s.service?.title || "").toLowerCase().includes(q)
        );
        if (!nameMatch && !bioMatch && !srvMatch) return false;
      }

      return true;
    });
  }, [rawTechnicians, selectedSpecialty, onlineOnly, searchQuery]);

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
      {/* 01 BREADCRUMB & HERO SECTION                              */}
      {/* ========================================================= */}
      <div className="border-b border-white/[0.06] bg-[#080b11]/70 backdrop-blur-md relative z-10">
        <div className="max-w-[1560px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-normal text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">
              {isHi ? "होम" : "Home"}
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200 font-medium">
              {isHi ? "तकनीशियन फ्लीट" : "Technician Fleet"}
            </span>
          </nav>

          {/* Title Badge & Heading Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-medium backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {isHi
                    ? "100% पुलिस व आधार सत्यापित मास्टर मैकेनिक"
                    : "100% KYC & Background Audited Fleet"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
                {isHi ? "सत्यापित मास्टर मैकेनिक व " : "Verified master mechanics & "}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">
                  {isHi ? "डायग्नोस्टिक विशेषज्ञ।" : "diagnostic specialists."}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
                {isHi
                  ? "पारदर्शी विजिटिंग चार्ज, वास्तविक रेटिंग्स और रियल-टाइम जीपीएस ट्रैकिंग के साथ अपने क्षेत्र के सर्वश्रेष्ठ तकनीशियन चुनें।"
                  : "Browse certified automotive diagnostics, master mechanics, and home engineers backed by standardized visiting fees, background audits, and < 28 min dispatch SLAs."}
              </p>
            </div>

            {/* Glowing Top Search Input */}
            <div className="w-full lg:w-96">
              <div className="relative group">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-400 transition-colors pointer-events-none" />
                <input
                  type="text"
                  placeholder={isHi ? "नाम, विशेषज्ञता या सर्विस खोजें..." : "Search by name, skill, or service..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400/50 shadow-sm transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Specialty Chips Strip */}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {specialtyChips.map((chip) => {
                const isActive = selectedSpecialty === chip.id;
                return (
                  <button
                    key={chip.id}
                    onClick={() => setSelectedSpecialty(chip.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? "bg-amber-500 text-slate-950 font-semibold shadow-[0_4px_16px_rgba(245,158,11,0.25)] scale-[1.02]"
                        : "bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 hover:text-white border border-white/[0.08] hover:border-white/[0.16]"
                    }`}
                  >
                    <span>{chip.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Instant Online Dispatch Switch */}
            <button
              type="button"
              onClick={() => setOnlineOnly(!onlineOnly)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium transition-all ${
                onlineOnly
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_2px_12px_rgba(16,185,129,0.15)]"
                  : "bg-white/[0.03] text-slate-400 border-white/[0.08] hover:text-white"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${onlineOnly ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
              <span>{isHi ? "केवल सक्रिय (Online)" : "Online Dispatches Only"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 02 NATURAL METRICS STRIP                                  */}
      {/* ========================================================= */}
      <div className="max-w-[1560px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              100% KYC
            </p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {isHi ? "आधार व पुलिस सत्यापन" : "Govt ID & Criminal Clear"}
            </p>
            <p className="text-[11px] text-slate-500 font-normal">
              {isHi ? "शून्य समझौता सुरक्षा" : "Zero tolerance policy"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              &lt; 28 min
            </p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {isHi ? "औसत सेक्टर डिस्पैच" : "Sector Arrival SLA"}
            </p>
            <p className="text-[11px] text-slate-500 font-normal">
              {isHi ? "लाइव जीपीएस ट्रैकिंग" : "Active GPS telemetry"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              4.92 / 5.0
            </p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {isHi ? "12,000+ सत्यापित जॉब्स" : "From 12,000+ Verified Jobs"}
            </p>
            <p className="text-[11px] text-slate-500 font-normal">
              {isHi ? "निरंतर गुणवत्ता ऑडिट" : "Continuous rating gate"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              ₹0 Hidden
            </p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {isHi ? "तय विजिटिंग व रेट कार्ड" : "Published Visiting Fees"}
            </p>
            <p className="text-[11px] text-slate-500 font-normal">
              {isHi ? "कार्य कराने पर 100% माफ" : "Waived on service approval"}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 03 TECHNICIANS GRID                                       */}
      {/* ========================================================= */}
      <div className="max-w-[1560px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-6">
        {/* Results Counter Toolbar */}
        <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
          <span>
            {isHi ? "कुल उपलब्ध तकनीशियन:" : "Available Verified Specialists:"}{" "}
            <strong className="text-white font-semibold">{filteredTechnicians.length}</strong>
          </span>
          {(searchQuery || selectedSpecialty !== "ALL" || onlineOnly) && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedSpecialty("ALL");
                setOnlineOnly(false);
              }}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isHi ? "फ़िल्टर रीसेट करें" : "Reset Filters"}</span>
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] space-y-4"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="w-12 h-12 rounded-2xl bg-white/[0.03]" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-32 bg-white/[0.03]" />
                    <Skeleton className="h-3 w-20 bg-white/[0.03]" />
                  </div>
                </div>
                <Skeleton className="h-12 w-full bg-white/[0.03] rounded-xl" />
                <div className="flex justify-between items-center pt-3 border-t border-white/[0.04]">
                  <Skeleton className="h-6 w-20 bg-white/[0.03]" />
                  <Skeleton className="h-8 w-28 rounded-full bg-white/[0.03]" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredTechnicians.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTechnicians.map((tech: any) => (
              <div
                key={tech.id}
                className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  {/* Top Row: Avatar, Name, Verified Seal & Online Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-amber-400 font-semibold text-lg flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                        {tech.user?.fullName?.charAt(0) || "T"}
                      </div>
                      <div className="min-w-0">
                        <Link
                          to={`/technicians/${tech.id}`}
                          className="font-semibold text-base text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5 truncate"
                        >
                          <span className="truncate">{tech.user?.fullName || "Certified Technician"}</span>
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        </Link>
                        <p className="text-xs text-slate-400 mt-0.5 font-normal">
                          {tech.experienceYears}+ {isHi ? "वर्ष अनुभव" : "years experience"}
                        </p>
                      </div>
                    </div>

                    {/* Online / Offline Pill */}
                    <span
                      className={`text-[10px] font-medium px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 shrink-0 ${
                        tech.isOnline
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                          : "bg-white/[0.03] text-slate-500 border-white/[0.06]"
                      }`}
                    >
                      {tech.isOnline && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                      <span>{tech.isOnline ? "Online" : "Offline"}</span>
                    </span>
                  </div>

                  {/* Rating & Location Tag */}
                  <div className="flex items-center gap-3 text-xs mb-3.5">
                    <div className="flex items-center gap-1 text-white font-semibold bg-white/[0.03] border border-white/[0.06] px-2.5 py-0.5 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{tech.avgRating || 4.9}</span>
                      <span className="text-slate-400 font-normal text-[10px]">
                        ({tech.totalReviews || 12})
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{tech.serviceRadiusKm || 12} km radius</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed font-normal">
                    {tech.bio}
                  </p>

                  {/* Services list tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4">
                    {tech.servicesOffered && tech.servicesOffered.length > 0 ? (
                      tech.servicesOffered.slice(0, 3).map((s: any) => (
                        <span
                          key={s.serviceId}
                          className="text-[11px] font-normal bg-white/[0.02] text-slate-300 border border-white/[0.06] px-2.5 py-1 rounded-lg truncate max-w-[240px]"
                        >
                          {ts(s.service?.title || "Repair Service")}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] font-normal bg-white/[0.02] text-slate-400 border border-white/[0.06] px-2.5 py-1 rounded-lg">
                        General Inspection & Repairs
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer: Visiting Fee & Action Button */}
                <div className="pt-4 mt-5 border-t border-white/[0.06] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-medium tracking-wider text-slate-500 block mb-0.5">
                      {isHi ? "विजिटिंग शुल्क" : "Visiting Fee"}
                    </span>
                    <span className="text-2xl font-black tracking-tight text-white font-mono">
                      ₹{tech.baseVisitingCharge || 199}
                    </span>
                  </div>
                  <Link
                    to={`/technicians/${tech.id}`}
                    className="inline-flex flex-row items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs sm:text-sm shadow-[0_4px_16px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_24px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                  >
                    <span>{isHi ? "प्रोफाइल देखें" : "View Profile"}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/[0.06] shadow-sm space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.04] text-slate-400 flex items-center justify-center mx-auto border border-white/[0.08]">
              <Search className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              {isHi ? "कोई तकनीशियन नहीं मिला" : "No Technicians Match"}
            </h3>
            <p className="text-xs text-slate-400 font-normal leading-relaxed">
              {isHi
                ? "आपके खोज मानदंडों के अनुसार कोई तकनीशियन नहीं मिला। कृपया अपने फ़िल्टर रीसेट करें।"
                : "No verified professionals match your current filter parameters. Try clearing your search or filters."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedSpecialty("ALL");
                setOnlineOnly(false);
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.1] text-xs font-medium transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>{isHi ? "फ़िल्टर रीसेट करें" : "Reset Filters"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
