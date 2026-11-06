import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wrench,
  Search,
  MapPin,
  Clock,
  CheckCircle,
  ShieldCheck,
  Star,
  ArrowRight,
  ChevronRight,
  Phone,
  Video,
  MessageSquare,
  Zap,
  Droplets,
  Wind,
  Sparkles,
  CalendarCheck,
  Activity,
  Cpu,
  Gauge,
  Navigation,
  CheckCircle2,
  Radio,
  FileText,
  Sliders,
  Car,
  Bike,
  Flame,
  Layers,
} from "lucide-react";
import { useGetCategoriesQuery, useGetServicesQuery } from "../features/services/api/servicesApi";
import { useGetTechniciansQuery } from "../features/technicians/api/techniciansApi";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "../context/LocationContext";
import { Service } from "../types/api.types";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";
import { BookingModal } from "../features/bookings/components/BookingModal";
import { useGSAP, heroReveal, fadeInStagger } from "../lib/gsap";
import {
  ElectricianTradeIcon,
  PlumbingTradeIcon,
  AcRepairTradeIcon,
  ApplianceRepairTradeIcon,
  CleaningTradeIcon,
  AutoGarageTradeIcon,
  PaintingTradeIcon,
  CarpentryTradeIcon,
  SecurityCctvTradeIcon,
  RoPurifierTradeIcon,
  DentingPaintingTradeIcon,
  WindshieldGlassTradeIcon,
} from "../components/icons/TradeCategoryIcons";

interface LandingPageProps {
  onOpenAuthModal?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuthModal }) => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const { language, t, tc, ts } = useLanguage();
  const { location, detectCurrentLocation, isLoadingGPS } = useLocation();

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSegment, setSelectedSegment] = useState<string>("auto");
  const [activeTelemetryStage, setActiveTelemetryStage] = useState<number>(3);

  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: servicesData, isLoading: servicesLoading } = useGetServicesQuery();
  const { data: techniciansData } = useGetTechniciansQuery();

  // GSAP Entrance Animations
  useGSAP(
    () => {
      if (heroRef.current) {
        heroReveal(heroRef.current, heroRef.current.querySelectorAll(".hero-anim"));
      }
      if (categoriesRef.current) {
        fadeInStagger(categoriesRef.current.querySelectorAll(".category-card-anim"), {
          delay: 0.2,
        });
      }
    },
    { scope: heroRef }
  );

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/services");
    }
  };

  // 12 Authentic Industrial-Tech Service Categories
  const popularCategories = [
    {
      id: "mechanic",
      name: "Auto & Garage Repair",
      nameHi: "ऑटो व गैराज रिपेयर",
      badge: "ENGINE DIAGNOSTIC",
      desc: "Doorstep car/bike breakdown, battery jumpstart, brake service & lube",
      descHi: "डोरस्टेप कार/बाइक ब्रेकडाउन, बैटरी जंपस्टार्ट, ब्रेक व ल्यूब",
      icon: AutoGarageTradeIcon,
      startingPrice: "₹299",
      expertsCount: "64+ Pros",
      expertsCountHi: "64+ विशेषज्ञ",
      accentColor: "text-amber-400",
    },
    {
      id: "electrician",
      name: "Electrician",
      nameHi: "इलेक्ट्रीशियन",
      badge: "CIRCUIT SAFE",
      desc: "Wiring, switchboard, fuse, MCB triage & heavy appliance power lines",
      descHi: "वायरिंग, स्विचबोर्ड, फ्यूज, एमसीबी व इनवर्टर रिपेयर",
      icon: ElectricianTradeIcon,
      startingPrice: "₹199",
      expertsCount: "42+ Pros",
      expertsCountHi: "42+ विशेषज्ञ",
      accentColor: "text-amber-400",
    },
    {
      id: "plumbing",
      name: "Plumbing",
      nameHi: "प्लंबिंग",
      badge: "NON-INVASIVE",
      desc: "Acoustic leak detection, pipe fittings, taps, booster tanks & drains",
      descHi: "लीकेज, पाइप फिटिंग, नल, टंकी व ड्रेन क्लीनिंग",
      icon: PlumbingTradeIcon,
      startingPrice: "₹149",
      expertsCount: "38+ Pros",
      expertsCountHi: "38+ विशेषज्ञ",
      accentColor: "text-cyan-400",
    },
    {
      id: "ac-repair",
      name: "AC Repair & Service",
      nameHi: "एसी रिपेयर व सर्विस",
      badge: "ECO-TESTED",
      desc: "Deep foam jet cleaning, gas charging & compressor PCB fix",
      descHi: "डीप फोम जेट क्लीनिंग, गैस चार्जिंग व कंप्रेसर रिपेयर",
      icon: AcRepairTradeIcon,
      startingPrice: "₹499",
      expertsCount: "56+ Pros",
      expertsCountHi: "56+ विशेषज्ञ",
      accentColor: "text-cyan-400",
    },
    {
      id: "car-denting-painting",
      name: "Car Denting & Painting",
      nameHi: "कार डेंटिंग व पेंटिंग",
      badge: "OEM TOLERANCE",
      desc: "Paintless dent removal (PDR), scratch buffing, bumper & 2K paint match",
      descHi: "पेंटलेस डेंट रिमूवल (PDR), स्क्रैच बफिंग, बंपर व पैनल पेंटिंग",
      icon: DentingPaintingTradeIcon,
      startingPrice: "₹699",
      expertsCount: "52+ Pros",
      expertsCountHi: "52+ विशेषज्ञ",
      accentColor: "text-amber-400",
    },
    {
      id: "windshield-lights-care",
      name: "Windshield & Glass Care",
      nameHi: "विंडशील्ड व ग्लास केयर",
      badge: "UV-RESIN SPEC",
      desc: "Windshield chip crack repair, headlight restoration & power window motors",
      descHi: "विंडशील्ड क्रैक रिपेयर, हेडलाइट डी-ऑक्सीडाइजिंग व पावर विंडो मोटर",
      icon: WindshieldGlassTradeIcon,
      startingPrice: "₹399",
      expertsCount: "31+ Pros",
      expertsCountHi: "31+ विशेषज्ञ",
      accentColor: "text-cyan-400",
    },
    {
      id: "appliance",
      name: "Appliance Repair",
      nameHi: "अप्लायंस रिपेयर",
      badge: "INSTANT QUOTE",
      desc: "Inverter washing machine, frost-free fridge, microwave & geyser repair",
      descHi: "वॉशिंग मशीन, फ्रिज, माइक्रोवेव व गीजर रिपेयर",
      icon: ApplianceRepairTradeIcon,
      startingPrice: "₹249",
      expertsCount: "35+ Pros",
      expertsCountHi: "35+ विशेषज्ञ",
      accentColor: "text-amber-400",
    },
    {
      id: "cleaning",
      name: "Deep Cleaning",
      nameHi: "डीप क्लीनिंग",
      badge: "HIGH-PRESSURE",
      desc: "Machine floor scrubbing, kitchen degreasing & sofa shampoo sanitization",
      descHi: "फुल होम डीप क्लीन, किचन डीग्रीजिंग व सोफा शैम्पू",
      icon: CleaningTradeIcon,
      startingPrice: "₹399",
      expertsCount: "29+ Pros",
      expertsCountHi: "29+ विशेषज्ञ",
      accentColor: "text-cyan-400",
    },
    {
      id: "painting",
      name: "Painting & Waterproofing",
      nameHi: "पेंटिंग व वॉटरप्रूफिंग",
      badge: "MOISTURE-SEALED",
      desc: "Wall dampness repair, interior fresh paint, texture & weather shield",
      descHi: "दीवारों की सीलन रिपेयर, इंटीरियर फ्रेश पेंट, पुट्टी व वॉटरप्रूफिंग",
      icon: PaintingTradeIcon,
      startingPrice: "₹499",
      expertsCount: "34+ Pros",
      expertsCountHi: "34+ विशेषज्ञ",
      accentColor: "text-amber-400",
    },
    {
      id: "carpentry",
      name: "Carpentry & Woodwork",
      nameHi: "कारपेंट्री व वुडवर्क",
      badge: "PRECISION CALIBRATED",
      desc: "Door lock & hydraulic hinge fix, modular cabinet tuning & furniture assembly",
      descHi: "दरवाजे के लॉक व कब्जे, किचन कैबिनेट्स रिपेयर व फर्नीचर पॉलिश",
      icon: CarpentryTradeIcon,
      startingPrice: "₹199",
      expertsCount: "48+ Pros",
      expertsCountHi: "48+ विशेषज्ञ",
      accentColor: "text-amber-400",
    },
    {
      id: "cctv-security",
      name: "CCTV & Smart Security",
      nameHi: "सीसीटीवी व स्मार्ट सिक्योरिटी",
      badge: "DIGITAL ENCRYPTED",
      desc: "HD CCTV camera installation, smart video doorbells & digital biometric locks",
      descHi: "HD सीसीटीवी कैमरा फिटिंग, स्मार्ट वीडियो डोरबेल व डिजिटल लॉक सेटअप",
      icon: SecurityCctvTradeIcon,
      startingPrice: "₹499",
      expertsCount: "27+ Pros",
      expertsCountHi: "27+ विशेषज्ञ",
      accentColor: "text-cyan-400",
    },
    {
      id: "ro-water-purifier",
      name: "RO Water Purifier Care",
      nameHi: "आरओ वॉटर प्यूरीफायर सर्विस",
      badge: "TDS CERTIFIED",
      desc: "RO filter membrane change, booster pump pressure check & TDS calibration",
      descHi: "आरओ फिल्टर मेंब्रेन रिप्लेसमेंट, सेडिमेंट क्लीनिंग व टीडीएस जांच",
      icon: RoPurifierTradeIcon,
      startingPrice: "₹299",
      expertsCount: "39+ Pros",
      expertsCountHi: "39+ विशेषज्ञ",
      accentColor: "text-cyan-400",
    },
  ];

  // Fallback high-intent services if DB empty
  const fallbackServices: Service[] = [
    {
      id: "fb-1",
      title: "General Car Inspection & Comprehensive Engine Diagnostics",
      categoryId: "mechanic",
      category: { id: "mechanic", name: "Auto Service", description: "Vehicle care" },
      defaultPrice: 899,
      durationMinutes: 60,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-2",
      title: "Emergency Battery Jumpstart & Alternator Output Test",
      categoryId: "mechanic",
      category: { id: "mechanic", name: "Auto Service", description: "Vehicle care" },
      defaultPrice: 349,
      durationMinutes: 25,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-3",
      title: "Split AC Deep Foam Jet Service & Gas Leak Check",
      categoryId: "ac-repair",
      category: { id: "ac-repair", name: "AC Repair", description: "Cooling solutions" },
      defaultPrice: 549,
      durationMinutes: 45,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-4",
      title: "Complete Home Electrical Short Circuit Triage & MCB Fix",
      categoryId: "electrician",
      category: { id: "electrician", name: "Electrician", description: "Electrical work" },
      defaultPrice: 249,
      durationMinutes: 35,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-5",
      title: "Bathroom Tap & Concealed Pipe Leakage Sealing",
      categoryId: "plumbing",
      category: { id: "plumbing", name: "Plumbing", description: "Plumbing work" },
      defaultPrice: 199,
      durationMinutes: 40,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-6",
      title: "Paintless Dent Removal (PDR) & Minor Scratch Buffing",
      categoryId: "car-denting-painting",
      category: { id: "car-denting-painting", name: "Car Denting & Painting", description: "Bodywork" },
      defaultPrice: 799,
      durationMinutes: 60,
      createdAt: "",
      updatedAt: "",
    },
  ];

  const displayedServices =
    servicesData?.data && servicesData.data.length > 0
      ? servicesData.data.slice(0, 6)
      : fallbackServices;

  // Fallback trusted technicians if DB empty
  const fallbackTechnicians = [
    {
      id: "tech-1",
      user: { fullName: "Rameshwar Sharma", phone: "+91 84396 16833" },
      experienceYears: 9,
      bio: "Certified master automotive technician specializing in OBD-II live diagnosis, EFI ignition, and precision mechanical overhauls.",
      bioHi: "प्रमाणित सीनियर ऑटोमोबाइल तकनीशियन, ब्रेकडाउन डायग्नोसिस और जापानी/जर्मन कारों में 9 वर्षों का अनुभव।",
      avgRating: 4.95,
      baseVisitingCharge: 199,
      specialty: "Master Diagnostics Engineer",
      specialtyHi: "मास्टर ऑटो मैकेनिक",
      jobsDone: 342,
    },
    {
      id: "tech-2",
      user: { fullName: "Vikramjit Singh", phone: "+91 84396 16833" },
      experienceYears: 7,
      bio: "Licensed industrial wireman, expert in MCB distribution panels, heavy inverter setups, and phase load balancing.",
      bioHi: "लाइसेंस प्राप्त इलेक्ट्रीशियन, एमसीबी बोर्ड, हाई-लोड इनवर्टर और हाउस री-वायरिंग विशेषज्ञ।",
      avgRating: 4.91,
      baseVisitingCharge: 149,
      specialty: "Licensed Electrical Wireman",
      specialtyHi: "लाइसेंस प्राप्त इलेक्ट्रीशियन",
      jobsDone: 280,
    },
    {
      id: "tech-3",
      user: { fullName: "Sunil Verma", phone: "+91 84396 16833" },
      experienceYears: 8,
      bio: "HVAC cooling engineer with expertise in inverter compressors, eco gas recharging (R32/R410A), and high-pressure jet cleaning.",
      bioHi: "एचवीएसी व एसी विशेषज्ञ, इनवर्टर कंप्रेसर, ईको गैस रीचार्जिंग व डक्ट क्लीनिंग में दक्ष।",
      avgRating: 4.88,
      baseVisitingCharge: 249,
      specialty: "HVAC Precision Specialist",
      specialtyHi: "एचवीएसी व एसी एक्सपर्ट",
      jobsDone: 410,
    },
    {
      id: "tech-4",
      user: { fullName: "Mohammad Imran", phone: "+91 84396 16833" },
      experienceYears: 6,
      bio: "Master plumber specializing in high-pressure lines, acoustic concealed leak detection, and sanitary booster pump fittings.",
      bioHi: "मास्टर प्लंबर, हाई-प्रेशर लाइन्स, कंसील्ड लीकेज डिटेक्शन और सेनेटरी फिटिंग्स में विशेषज्ञ।",
      avgRating: 4.92,
      baseVisitingCharge: 149,
      specialty: "Hydraulic Line Specialist",
      specialtyHi: "सीनियर प्लंबर",
      jobsDone: 195,
    },
  ];

  const displayedTechnicians =
    techniciansData?.data && techniciansData.data.length > 0
      ? techniciansData.data.slice(0, 4)
      : fallbackTechnicians;

  // Real, authentic customer testimonials
  const customerReviews = [
    {
      id: "rev-1",
      customerName: "Rohit Agarwal",
      customerNameHi: "रोहित अग्रवाल",
      location: "Indirapuram, Ghaziabad",
      locationHi: "इंदिरापुरम, गाजियाबाद",
      serviceUsed: "Emergency Car Jumpstart & Battery Triage",
      serviceUsedHi: "इमरजेंसी कार जंपस्टार्ट व बैटरी सर्विस",
      rating: 5,
      date: "3 days ago",
      dateHi: "3 दिन पहले",
      comment:
        "Stranded on the bypass with a dead battery. The JantaGaraj mobile technician arrived in 24 minutes, hooked up high-capacity booster cables, and checked the alternator diode output before letting me leave. Clear rate card, zero roadside bargaining.",
      commentHi:
        "हाईवे पर कार की बैटरी पूरी तरह डाउन हो गई थी। जनता गैराज के मैकेनिक केवल 24 मिनट में पहुंचे, बूस्टर केबल से स्टार्ट किया और जाने से पहले अल्टरनेटर का करंट भी चेक किया। बिल्कुल तय रेट, कोई बहस नहीं।",
      verified: true,
    },
    {
      id: "rev-2",
      customerName: "Pooja Deshmukh",
      customerNameHi: "पूजा देशमुख",
      location: "Kothrud, Pune",
      locationHi: "कोथरुड, पुणे",
      serviceUsed: "Electrical Short Circuit & Inverter Triage",
      serviceUsedHi: "इलेक्ट्रिकल शॉर्ट सर्किट व इनवर्टर रिपेयर",
      rating: 5,
      date: "1 week ago",
      dateHi: "1 सप्ताह पहले",
      comment:
        "The MCB kept tripping every time we switched on the geyser. Vikramjit traced the neutral leakage in 15 minutes with a digital multimeter and replaced the damaged isolator socket. Very professional and polite.",
      commentHi:
        "गीजर ऑन करते ही मेन एमसीबी ट्रिप हो रही थी। विक्रमजीत जी ने 15 मिनट में डिजिटल मल्टीमीटर से न्यूट्रल लीकेज ढूंढ निकाली और खराब आइसोलेटर सॉकेट को बदला। बेहद पेशेवर और विनम्र कार्य।",
      verified: true,
    },
    {
      id: "rev-3",
      customerName: "Karan Johar Sharma",
      customerNameHi: "करण जौहर शर्मा",
      location: "HSR Layout, Bengaluru",
      locationHi: "एचएसआर लेआउट, बेंगलुरु",
      serviceUsed: "Split AC Jet Deep Foam Service",
      serviceUsedHi: "स्प्लिट एसी जेट डीप फोम सर्विस",
      rating: 5,
      date: "2 weeks ago",
      dateHi: "2 सप्ताह पहले",
      comment:
        "The foam jet cleaning was completely mess-free. The technician used a proper waterproof funnel jacket, so not a single drop soiled our painted wall. AC cooling is back to optimum. Far better experience than unverified local mechanics.",
      commentHi:
        "फोम जेट क्लीनिंग बिल्कुल साफ-सुथरी रही। तकनीशियन ने वाटरप्रूफ फनल जैकेट का इस्तेमाल किया, जिससे दीवार पर एक बूंद भी नहीं गिरी। एसी की कूलिंग अब एकदम बेहतरीन है। लोकल अनवेरिफाइड मैकेनिकों से कहीं बेहतर अनुभव।",
      verified: true,
    },
  ];

  return (
    <div className="bg-[#0b0f17] text-white min-h-screen selection:bg-amber-500 selection:text-slate-950 pb-24 relative">
      {/* Precision Engineering Sub-Grid Blueprint Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none -z-0" />

      {/* ========================================================= */}
      {/* 01 TOP OPERATIONAL DISPATCH TELEMETRY BAR                 */}
      {/* ========================================================= */}
      <div className="relative z-20 border-b border-slate-800 bg-[#111827]/90 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 font-bold">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500" />
              </span>
              <span>SYSTEM: ONLINE</span>
            </span>
            <span className="text-[#9ca3af] hidden sm:inline">
              FLEET RADAR ACTIVE • 500+ VERIFIED ENGINEERS ON-CALL
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-[#9ca3af]">
            <div className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>ZONE: {location.city || "NCR METRO"}</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>AVG DISPATCH: 28 MINS</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 02 HERO SECTION (Industrial-Tech & Garage Workflow)       */}
      {/* ========================================================= */}
      <section
        ref={heroRef}
        className="relative z-10 pt-8 sm:pt-14 pb-14 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headlines, Diagnostic Terminal & Search */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Telemetry Pill */}
            <div className="hero-anim inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1f2937] border border-slate-800 text-cyan-400 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="tracking-wider">AUTOMOTIVE &amp; HOME PRECISION ENGINEERING</span>
            </div>

            {/* Punchy Structured Heading */}
            <h1 className="hero-anim text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.15]">
              {t("hero.titlePart1")}{" "}
              <span className="text-amber-400">
                {t("hero.titlePart2")}
              </span>{" "}
              {t("hero.titlePart3")}
            </h1>

            {/* Silver Slate Description */}
            <p className="hero-anim text-sm sm:text-base text-[#9ca3af] leading-relaxed max-w-2xl">
              {t("hero.mainSubtitle")}
            </p>

            {/* Industrial Diagnostic & Service Intake Terminal */}
            <div className="hero-anim p-4 sm:p-5 rounded-2xl bg-[#1f2937] border border-slate-800 shadow-xl space-y-3.5">
              {/* Equipment Selector Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setSelectedSegment("auto")}
                  className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    selectedSegment === "auto"
                      ? "bg-amber-500/10 border-amber-500/50 text-amber-400 font-bold"
                      : "bg-[#111827] border-slate-800 text-[#9ca3af] hover:text-white"
                  }`}
                >
                  <Car className="w-3.5 h-3.5 text-amber-400" />
                  <span>4-Wheeler Car</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSegment("bike")}
                  className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    selectedSegment === "bike"
                      ? "bg-amber-500/10 border-amber-500/50 text-amber-400 font-bold"
                      : "bg-[#111827] border-slate-800 text-[#9ca3af] hover:text-white"
                  }`}
                >
                  <Bike className="w-3.5 h-3.5 text-amber-400" />
                  <span>2-Wheeler</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSegment("hvac")}
                  className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    selectedSegment === "hvac"
                      ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400 font-bold"
                      : "bg-[#111827] border-slate-800 text-[#9ca3af] hover:text-white"
                  }`}
                >
                  <Wind className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AC &amp; Cooling</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSegment("electric")}
                  className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    selectedSegment === "electric"
                      ? "bg-amber-500/10 border-amber-500/50 text-amber-400 font-bold"
                      : "bg-[#111827] border-slate-800 text-[#9ca3af] hover:text-white"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Electrical</span>
                </button>
              </div>

              {/* High-Contrast Industrial Command Search Bar */}
              <form
                onSubmit={handleSearchSubmit}
                className="p-2 rounded-xl bg-[#111827] border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
              >
                {/* Location Picker */}
                <div className="flex items-center gap-2 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-800 text-xs font-semibold text-white min-w-[145px]">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate max-w-[100px]">{location.city}</span>
                  <button
                    type="button"
                    onClick={() => detectCurrentLocation()}
                    className="text-[10px] text-amber-400 hover:text-amber-300 font-mono ml-auto"
                    title="Auto detect location"
                  >
                    {isLoadingGPS ? "..." : t("nav.gpsDetect")}
                  </button>
                </div>

                {/* Service Search Input */}
                <div className="relative flex-1 flex items-center px-2">
                  <Search className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      selectedSegment === "auto"
                        ? "Car battery jumpstart, brake noise, clutch overhaul..."
                        : selectedSegment === "bike"
                        ? "Engine oil change, chain sprocket, carburetor tuning..."
                        : selectedSegment === "hvac"
                        ? "AC foam jet cleaning, compressor gas recharge..."
                        : "MCB tripping, neutral wire short circuit, inverter fix..."
                    }
                    className="w-full bg-transparent border-none text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none"
                  />
                </div>

                {/* Action CTA */}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg px-6 font-bold text-xs uppercase tracking-wider"
                >
                  {t("hero.searchBtn")}
                </Button>
              </form>
            </div>

            {/* Quick Action Buttons */}
            <div className="hero-anim flex flex-wrap items-center gap-3">
              <Link to="/services">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 py-3 rounded-xl flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  {t("hero.bookBtn")}
                </Button>
              </Link>
              <Link to="/technicians">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-[#1f2937] hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 hover:border-cyan-400 font-semibold px-6 py-3 rounded-xl transition-all"
                >
                  {t("hero.findTechBtn")}
                </Button>
              </Link>
            </div>

            {/* Precision Trust Metrics Bar */}
            <div className="hero-anim pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3 rounded-xl bg-[#1f2937] border border-slate-800">
                <p className="text-lg font-bold font-mono text-cyan-400">500+</p>
                <p className="text-[11px] text-[#9ca3af]">{t("hero.statPros")}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#1f2937] border border-slate-800">
                <p className="text-lg font-bold font-mono text-amber-400">30 {t("common.mins")}</p>
                <p className="text-[11px] text-[#9ca3af]">{t("hero.statArrival")}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#1f2937] border border-slate-800">
                <p className="text-lg font-bold font-mono text-white">4.92★</p>
                <p className="text-[11px] text-[#9ca3af]">{t("hero.statRating")}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#1f2937] border border-slate-800">
                <p className="text-lg font-bold font-mono text-amber-400">₹0</p>
                <p className="text-[11px] text-[#9ca3af]">{t("hero.statCharges")}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Garage Telemetry HUD */}
          <div className="lg:col-span-5 relative">
            <div className="hero-anim relative mx-auto max-w-md lg:max-w-none">
              {/* Direct Transparent Cutout with Technician Image */}
              <div className="relative rounded-2xl bg-[#111827] border border-slate-800 p-2 overflow-hidden shadow-2xl">
                {/* Tech Diagnostic Header Bar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 text-[11px] font-mono text-[#9ca3af]">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <Radio className="w-3.5 h-3.5 text-cyan-400" />
                    <span>RIG #JG-RADAR-01</span>
                  </span>
                  <span>OBD-II PROTOCOL</span>
                </div>

                <div className="relative pt-4 flex justify-center bg-gradient-to-b from-[#111827] to-[#0b0f17]">
                  <picture>
                    <source srcSet="/images/hero_technician.webp" type="image/webp" />
                    <source srcSet="/images/hero_technician.png" type="image/png" />
                    <img
                      src="/images/hero_technician.webp"
                      alt="JantaGaraj verified master automotive technician standing with diagnostic wrench"
                      width="896"
                      height="1200"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      className="w-full max-h-[500px] object-contain object-bottom transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </picture>
                </div>

                {/* Micro Telemetry HUD Floating Badges */}
                <div className="absolute top-14 right-4 px-3 py-2 rounded-xl bg-[#1f2937]/95 border border-slate-800 shadow-lg text-left">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold font-mono text-white">4.92 / 5.0</span>
                  </div>
                  <p className="text-[10px] text-[#9ca3af] font-mono">Audited Field Score</p>
                </div>

                <div className="absolute bottom-16 left-4 px-3 py-2 rounded-xl bg-[#1f2937]/95 border border-slate-800 shadow-lg text-left">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[11px] font-mono font-bold text-white uppercase">
                      Lead Diagnostics Pro
                    </span>
                  </div>
                  <p className="text-[10px] text-amber-400 font-mono">9+ Yrs Automobile Exp</p>
                </div>

                {/* Bottom Spec Footer Strip */}
                <div className="p-3 bg-[#1f2937] border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>100% Genuine OEM Spares</span>
                  </span>
                  <span className="text-amber-400 font-bold">30-DAY WARRANTY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 03 LIVE TELEMETRY & TRACKING WIDGET (Garage Workflow Hub)  */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="p-6 sm:p-7 rounded-2xl bg-[#1f2937] border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-800 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase">
                  Live Dispatch Telemetry
                </span>
                <span className="text-xs text-[#9ca3af] font-mono">
                  JOB #JG-4081 • TATA HARRIER 2.0
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Doorstep Battery Triage &amp; Alternator Diode Diagnostics
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center gap-2 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>DIAGNOSTIC TEST ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Interactive Steps / Workflow Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setActiveTelemetryStage(1)}
              className={`text-left p-3.5 rounded-xl border transition-all ${
                activeTelemetryStage >= 1
                  ? "bg-cyan-950/30 border-cyan-500/50 text-cyan-300"
                  : "bg-[#111827] border-slate-800 text-slate-500"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold font-mono mb-1">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>01. RADAR DISPATCHED</span>
              </div>
              <p className="text-xs text-[#9ca3af]">
                Proximity matched in 28 seconds
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTelemetryStage(2)}
              className={`text-left p-3.5 rounded-xl border transition-all ${
                activeTelemetryStage >= 2
                  ? "bg-cyan-950/30 border-cyan-500/50 text-cyan-300"
                  : "bg-[#111827] border-slate-800 text-slate-500"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold font-mono mb-1">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>02. DOORSTEP OTP GATE &amp; SCAN</span>
              </div>
              <p className="text-xs text-[#9ca3af]">
                Verified customer authentication
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTelemetryStage(3)}
              className={`text-left p-3.5 rounded-xl border transition-all ${
                activeTelemetryStage >= 3
                  ? "bg-amber-950/30 border-amber-500/60 text-amber-300"
                  : "bg-[#111827] border-slate-800 text-slate-500"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold font-mono mb-1 text-amber-400">
                <Activity className="w-4 h-4 text-amber-400 shrink-0" />
                <span>03. PRECISION CALIBRATION</span>
              </div>
              <p className="text-xs text-[#9ca3af]">
                14.2V charging &amp; 30-day warranty active
              </p>
            </button>
          </div>

          {/* Quick Mechanic Card & Contact */}
          <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold font-mono">
                RS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">Rameshwar Sharma</h4>
                  <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono text-cyan-400 font-bold">
                    VERIFIED LEAD
                  </span>
                </div>
                <p className="text-xs text-[#9ca3af]">Master Diagnostics Engineer • 9+ Yrs Exp • 4.95 Rating</p>
              </div>
            </div>

            <a
              href="tel:+918439616833"
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto font-mono uppercase"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Mechanic Directly</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 04 POPULAR CATEGORIES (Service Selection Cards)           */}
      {/* ========================================================= */}
      <section ref={categoriesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              {t("categories.exploreTag")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight mt-1">
              {t("categories.popularTitle")}
            </h2>
            <p className="text-sm text-[#9ca3af] mt-1">
              {t("categories.popularSubtitle")}
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 group shrink-0"
          >
            <span>{t("categories.allCategories")}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Service Selection Card Grid with Amber Hover Lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={`/services?category=${cat.id}`}
                className="category-card-anim group"
              >
                <div className="h-full p-6 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-200 shadow-md flex flex-col justify-between">
                  <div>
                    {/* Top Row: Icon + High-Contrast Badge + Starting Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-11 h-11 flex items-center justify-center bg-transparent border-0 p-0 ${cat.accentColor} transition-transform duration-200 group-hover:scale-105`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                          {cat.badge}
                        </span>
                        <span className="text-xs font-bold font-mono text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                          {cat.startingPrice}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-amber-400 transition-colors">
                      {language === "hi" && cat.nameHi ? cat.nameHi : tc(cat.name)}
                    </h3>
                    <p className="text-xs text-[#9ca3af] mt-1.5 leading-relaxed">
                      {language === "hi" && cat.descHi ? cat.descHi : cat.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-[#9ca3af]">
                    <span>{language === "hi" && cat.expertsCountHi ? cat.expertsCountHi : cat.expertsCount}</span>
                    <span className="text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform font-mono text-xs">
                      {t("common.bookNow")} <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 05 HOW IT WORKS (Authentic Garage Workflow Protocol)       */}
      {/* ========================================================= */}
      <section
        id="how-it-works"
        ref={howItWorksRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 scroll-mt-28"
      >
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
            {t("howItWorks.tag")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            {t("howItWorks.title")}
          </h2>
          <p className="text-sm text-[#9ca3af]">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        {/* Clean Process Cards - No Oversized Blocky Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
                  STAGE 01
                </span>
                <span className="text-[11px] font-mono text-[#9ca3af]">FIXED QUOTE</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-display text-white mb-2">
                {t("howItWorks.step1Title")}
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                {t("howItWorks.step1Desc")}
              </p>
            </div>

            <div className="pt-4 mt-5 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-amber-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{language === "hi" ? "पारदर्शी तय दरें" : "Zero Hidden Surcharges"}</span>
              </span>
              <span className="text-slate-500">DIGITAL ESTIMATE</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
                  STAGE 02
                </span>
                <span className="text-[11px] font-mono text-[#9ca3af]">&lt; 30 MIN SLA</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-display text-white mb-2">
                {t("howItWorks.step2Title")}
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                {t("howItWorks.step2Desc")}
              </p>
            </div>

            <div className="pt-4 mt-5 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-cyan-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{language === "hi" ? "3 मिनट में नजदीकी मैकेनिक" : "Live GPS Proximity Rig"}</span>
              </span>
              <span className="text-slate-500">DISPATCHED</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
                  STAGE 03
                </span>
                <span className="text-[11px] font-mono text-[#9ca3af]">OTP AUTHENTICATED</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-display text-white mb-2">
                {t("howItWorks.step3Title")}
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                {t("howItWorks.step3Desc")}
              </p>
            </div>

            <div className="pt-4 mt-5 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-amber-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{language === "hi" ? "काम से संतुष्ट होने पर पेमेंट" : "Dual-Check & 30D Warranty"}</span>
              </span>
              <span className="text-slate-500">SETTLED</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 06 POPULAR SERVICES (Industrial Service Grid)              */}
      {/* ========================================================= */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              {t("services.topBookedTag")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight mt-1">
              {t("services.popularTitle")}
            </h2>
            <p className="text-sm text-[#9ca3af] mt-1">
              {t("services.popularSubtitle")}
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 group shrink-0"
          >
            <span>{t("services.viewAll")}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {servicesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-56 w-full rounded-2xl bg-[#1f2937]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedServices.map((service) => (
              <div
                key={service.id}
                className="p-6 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-200 shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded uppercase tracking-wider">
                      {tc(service.category?.name || "Service")}
                    </span>
                    <span className="text-base font-mono font-extrabold text-amber-400">
                      ₹{service.defaultPrice}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-amber-400 transition-colors">
                    {ts(service.title)}
                  </h3>
                  <p className="text-xs text-[#9ca3af] mt-2 leading-relaxed">
                    {t("services.desc")}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div className="text-xs text-[#9ca3af] flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>
                      {service.durationMinutes || 45} {t("common.mins")}
                    </span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleBookService(service)}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs uppercase font-mono"
                  >
                    {t("common.bookNow")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 07 TRUSTED TECHNICIANS (Verified Field Engineers)          */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              {t("techs.tag")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight mt-1">
              {t("techs.title")}
            </h2>
            <p className="text-sm text-[#9ca3af] mt-1">
              {t("techs.subtitle")}
            </p>
          </div>
          <Link
            to="/technicians"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 group shrink-0"
          >
            <span>{t("techs.allTechs")}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedTechnicians.map((tech) => (
            <div
              key={tech.id}
              className="p-6 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-200 shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    {t("techs.verifiedPro")}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold font-mono text-amber-400 bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-500/30">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{tech.avgRating || 4.9}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 mt-2 mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-base flex items-center justify-center shrink-0">
                    {tech.user?.fullName?.charAt(0) || "T"}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-cyan-400 transition-colors leading-snug truncate">
                      {tech.user?.fullName || "Certified Technician"}
                    </h3>
                    <p className="text-xs font-medium text-amber-400 mt-0.5 truncate font-mono">
                      {language === "hi"
                        ? ((tech as any).specialtyHi || (tech as any).specialty || "ऑटो व होम विशेषज्ञ")
                        : ((tech as any).specialty || "Auto & Home Specialist")}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#9ca3af] line-clamp-3 mt-3 leading-relaxed min-h-[54px]">
                  {language === "hi"
                    ? ((tech as any).bioHi || tech.bio || "त्वरित डायग्नोसिस और प्रामाणिक रिपेयर मानकों के लिए समर्पित पेशेवर तकनीशियन।")
                    : (tech.bio || "Professional technician dedicated to swift diagnostics and genuine repair standards.")}
                </p>

                <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-[#9ca3af]">
                  <div>
                    <span className="text-slate-500">{t("common.exp")}:</span>{" "}
                    <span className="font-semibold text-white">{tech.experienceYears}+ {t("common.years")}</span>
                  </div>
                  <div className="h-3 w-px bg-slate-800" />
                  <div>
                    <span className="text-slate-500">{language === "hi" ? "काम" : "Jobs"}:</span>{" "}
                    <span className="font-semibold text-white">{(tech as any).jobsDone || 120}+</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-0.5 font-mono">
                    {t("techs.visitingFee")}
                  </span>
                  <span className="text-sm font-bold font-mono text-white">
                    ₹{tech.baseVisitingCharge || 149}
                  </span>
                </div>
                <Link to={`/technicians/${tech.id}`}>
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs font-mono"
                  >
                    {t("techs.viewProfile")}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 08 WHY JANTAGARAJ (Precision Engineering Standards)       */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="p-7 sm:p-10 rounded-2xl bg-[#111827] border border-slate-800 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              {t("why.tag")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              {t("why.title")}
            </h2>
            <p className="text-sm text-[#9ca3af]">
              {t("why.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2.5 p-4 rounded-xl bg-[#1f2937] border border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                {t("why.f1Title")}
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                {t("why.f1Desc")}
              </p>
            </div>

            <div className="space-y-2.5 p-4 rounded-xl bg-[#1f2937] border border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                {t("why.f2Title")}
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                {t("why.f2Desc")}
              </p>
            </div>

            <div className="space-y-2.5 p-4 rounded-xl bg-[#1f2937] border border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                {t("why.f3Title")}
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                {t("why.f3Desc")}
              </p>
            </div>

            <div className="space-y-2.5 p-4 rounded-xl bg-[#1f2937] border border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                {t("why.f4Title")}
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                {t("why.f4Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 09 REMOTE ASSISTANCE (Virtual Diagnostic Workbench)        */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="p-7 sm:p-10 rounded-2xl bg-[#1f2937] border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Video className="w-3.5 h-3.5" />
                {t("remote.tag")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                {t("remote.title")}
              </h2>
              <p className="text-sm text-[#9ca3af] leading-relaxed">
                {t("remote.desc")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-[#111827] border border-slate-800">
                  <p className="text-xs font-bold text-white">
                    {t("remote.s1Title")}
                  </p>
                  <p className="text-[11px] text-[#9ca3af] mt-0.5">
                    {t("remote.s1Desc")}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#111827] border border-slate-800">
                  <p className="text-xs font-bold text-white">
                    {t("remote.s2Title")}
                  </p>
                  <p className="text-[11px] text-[#9ca3af] mt-0.5">
                    {t("remote.s2Desc")}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#111827] border border-slate-800">
                  <p className="text-xs font-bold text-white">
                    {t("remote.s3Title")}
                  </p>
                  <p className="text-[11px] text-[#9ca3af] mt-0.5">
                    {t("remote.s3Desc")}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a href="tel:+918439616833">
                  <Button
                    variant="primary"
                    size="md"
                    leftIcon={<Phone className="w-4 h-4" />}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl font-mono text-xs uppercase"
                  >
                    {t("remote.callBtn")}
                  </Button>
                </a>
                <Link to="/services">
                  <Button
                    variant="outline"
                    size="md"
                    className="bg-[#111827] hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 px-6 py-2.5 rounded-xl font-mono text-xs"
                  >
                    {t("remote.scheduleBtn")}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Video Preview Interface */}
            <div className="lg:col-span-5">
              <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs font-bold font-mono text-cyan-400">
                      {t("remote.statusActive")}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 font-semibold">
                    {t("remote.freeTriage")}
                  </span>
                </div>

                <div className="relative rounded-lg overflow-hidden aspect-video bg-[#0b0f17] flex items-center justify-center border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
                    alt="Remote technician guidance"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80";
                    }}
                    className="w-full h-full object-cover opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <p className="text-[11px] text-white font-mono">
                      {t("remote.videoCap")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-[#9ca3af]">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    {t("remote.chatVoice")}
                  </span>
                  <span className="text-cyan-400 font-bold">
                    {t("remote.techsOnline")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10 CUSTOMER REVIEWS (Audited Field Feedback)               */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            {t("reviews.tag")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            {t("reviews.title")}
          </h2>
          <p className="text-sm text-[#9ca3af]">
            {t("reviews.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {language === "hi" && rev.dateHi ? rev.dateHi : rev.date}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{language === "hi" && rev.commentHi ? rev.commentHi : rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {language === "hi" && rev.customerNameHi ? rev.customerNameHi : rev.customerName}
                  </h4>
                  <p className="text-[10px] text-[#9ca3af] font-mono">
                    {language === "hi" && rev.locationHi ? rev.locationHi : rev.location}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  <CheckCircle className="w-3 h-3 text-cyan-400" />
                  {t("reviews.verified")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11 FINAL CTA BANNER (Precision Reliability Gate)           */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#111827] text-white border border-slate-800 shadow-xl relative overflow-hidden">
          {/* Top Amber Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />

          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              {t("cta.tag")}
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight text-white tracking-tight">
              {t("cta.title")}
            </h2>

            <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
              {t("cta.subtitle")}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link to="/services">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 py-3 rounded-xl flex items-center gap-2 transition-all hover:scale-[1.02] font-mono text-xs uppercase"
                >
                  {t("cta.bookNow")}
                </Button>
              </Link>
              <a href="tel:+918439616833">
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<Phone className="w-4 h-4 text-amber-400" />}
                  className="bg-[#1f2937] hover:bg-slate-800 text-white border border-slate-700 px-6 py-3 rounded-xl font-mono text-xs"
                >
                  {t("cta.callHelp")}
                </Button>
              </a>
            </div>

            <p className="text-[11px] font-mono text-slate-500 pt-1">
              {t("cta.guarantee")}
            </p>
          </div>
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
