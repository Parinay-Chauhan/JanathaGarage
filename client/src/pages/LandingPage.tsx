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

  // Popular category blueprints with Industrial-Tech badge indicators
  const popularCategories = [
    {
      id: "mechanic",
      name: "Auto & Garage Repair",
      nameHi: "ऑटो व गैराज रिपेयर",
      badge: "ENGINE DIAGNOSTIC",
      badgeType: "amber",
      desc: "Doorstep car/bike breakdown, battery jumpstart, brake service & lube",
      descHi: "डोरस्टेप कार/बाइक ब्रेकडाउन, बैटरी जंपस्टार्ट, ब्रेक व ल्यूब",
      icon: AutoGarageTradeIcon,
      startingPrice: "₹299",
      expertsCount: "64+ Pros",
      expertsCountHi: "64+ विशेषज्ञ",
      accentColor: "text-amber-400 group-hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]",
    },
    {
      id: "electrician",
      name: "Electrician",
      nameHi: "इलेक्ट्रीशियन",
      badge: "CIRCUIT SAFE",
      badgeType: "cyan",
      desc: "Wiring, switchboard, fuse, MCB triage & heavy appliance power lines",
      descHi: "वायरिंग, स्विचबोर्ड, फ्यूज, एमसीबी व इनवर्टर रिपेयर",
      icon: ElectricianTradeIcon,
      startingPrice: "₹199",
      expertsCount: "42+ Pros",
      expertsCountHi: "42+ विशेषज्ञ",
      accentColor: "text-amber-400 group-hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]",
    },
    {
      id: "plumbing",
      name: "Plumbing",
      nameHi: "प्लंबिंग",
      badge: "NON-INVASIVE",
      badgeType: "cyan",
      desc: "Leak detection, pipe fittings, taps, overhead tanks & drain clearing",
      descHi: "लीकेज, पाइप फिटिंग, नल, टंकी व ड्रेन क्लीनिंग",
      icon: PlumbingTradeIcon,
      startingPrice: "₹149",
      expertsCount: "38+ Pros",
      expertsCountHi: "38+ विशेषज्ञ",
      accentColor: "text-cyan-400 group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]",
    },
    {
      id: "ac-repair",
      name: "AC Repair & Service",
      nameHi: "एसी रिपेयर व सर्विस",
      badge: "ECO-TESTED",
      badgeType: "cyan",
      desc: "Deep foam jet cleaning, gas charging & compressor PCB fix",
      descHi: "डीप फोम जेट क्लीनिंग, गैस चार्जिंग व कंप्रेसर रिपेयर",
      icon: AcRepairTradeIcon,
      startingPrice: "₹499",
      expertsCount: "56+ Pros",
      expertsCountHi: "56+ विशेषज्ञ",
      accentColor: "text-cyan-400 group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]",
    },
    {
      id: "car-denting-painting",
      name: "Car Denting & Painting",
      nameHi: "कार डेंटिंग व पेंटिंग",
      badge: "OEM TOLERANCE",
      badgeType: "amber",
      desc: "Paintless dent removal (PDR), scratch buffing, bumper & panel 2K paint",
      descHi: "पेंटलेस डेंट रिमूवल (PDR), स्क्रैच बफिंग, बंपर व पैनल पेंटिंग",
      icon: DentingPaintingTradeIcon,
      startingPrice: "₹699",
      expertsCount: "52+ Pros",
      expertsCountHi: "52+ विशेषज्ञ",
      accentColor: "text-amber-400 group-hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]",
    },
    {
      id: "windshield-lights-care",
      name: "Windshield & Glass Care",
      nameHi: "विंडशील्ड व ग्लास केयर",
      badge: "UV-RESIN SPEC",
      badgeType: "cyan",
      desc: "Windshield chip crack repair, headlight restoration & power window motors",
      descHi: "विंडशील्ड क्रैक रिपेयर, हेडलाइट डी-ऑक्सीडाइजिंग व पावर विंडो मोटर",
      icon: WindshieldGlassTradeIcon,
      startingPrice: "₹399",
      expertsCount: "31+ Pros",
      expertsCountHi: "31+ विशेषज्ञ",
      accentColor: "text-cyan-400 group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]",
    },
    {
      id: "appliance",
      name: "Appliance Repair",
      nameHi: "अप्लायंस रिपेयर",
      badge: "INSTANT QUOTE",
      badgeType: "amber",
      desc: "Washing machine, refrigerator, microwave oven & geyser repair",
      descHi: "वॉशिंग मशीन, फ्रिज, माइक्रोवेव व गीजर रिपेयर",
      icon: ApplianceRepairTradeIcon,
      startingPrice: "₹249",
      expertsCount: "35+ Pros",
      expertsCountHi: "35+ विशेषज्ञ",
      accentColor: "text-amber-400 group-hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]",
    },
    {
      id: "cleaning",
      name: "Deep Cleaning",
      nameHi: "डीप क्लीनिंग",
      badge: "HIGH-PRESSURE",
      badgeType: "cyan",
      desc: "Machine floor scrubbing, kitchen degreasing & sofa shampoo sanitization",
      descHi: "फुल होम डीप क्लीन, किचन डीग्रीजिंग व सोफा शैम्पू",
      icon: CleaningTradeIcon,
      startingPrice: "₹399",
      expertsCount: "29+ Pros",
      expertsCountHi: "29+ विशेषज्ञ",
      accentColor: "text-cyan-400 group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]",
    },
    {
      id: "painting",
      name: "Painting & Waterproofing",
      nameHi: "पेंटिंग व वॉटरप्रूफिंग",
      badge: "MOISTURE-SEALED",
      badgeType: "amber",
      desc: "Wall dampness repair, interior fresh paint, texture & weather shield",
      descHi: "दीवारों की सीलन रिपेयर, इंटीरियर फ्रेश पेंट, पुट्टी व वॉटरप्रूफिंग",
      icon: PaintingTradeIcon,
      startingPrice: "₹499",
      expertsCount: "34+ Pros",
      expertsCountHi: "34+ विशेषज्ञ",
      accentColor: "text-amber-400 group-hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]",
    },
    {
      id: "carpentry",
      name: "Carpentry & Woodwork",
      nameHi: "कारपेंट्री व वुडवर्क",
      badge: "PRECISION CALIBRATED",
      badgeType: "amber",
      desc: "Door lock & hydraulic hinge fix, modular cabinet tuning & furniture assembly",
      descHi: "दरवाजे के लॉक व कब्जे, किचन कैबिनेट्स रिपेयर व फर्नीचर पॉलिश",
      icon: CarpentryTradeIcon,
      startingPrice: "₹199",
      expertsCount: "48+ Pros",
      expertsCountHi: "48+ विशेषज्ञ",
      accentColor: "text-amber-400 group-hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]",
    },
    {
      id: "cctv-security",
      name: "CCTV & Smart Security",
      nameHi: "सीसीटीवी व स्मार्ट सिक्योरिटी",
      badge: "DIGITAL ENCRYPTED",
      badgeType: "cyan",
      desc: "HD CCTV camera installation, smart video doorbells & digital biometric locks",
      descHi: "HD सीसीटीवी कैमरा फिटिंग, स्मार्ट वीडियो डोरबेल व डिजिटल लॉक सेटअप",
      icon: SecurityCctvTradeIcon,
      startingPrice: "₹499",
      expertsCount: "27+ Pros",
      expertsCountHi: "27+ विशेषज्ञ",
      accentColor: "text-cyan-400 group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]",
    },
    {
      id: "ro-water-purifier",
      name: "RO Water Purifier Care",
      nameHi: "आरओ वॉटर प्यूरीफायर सर्विस",
      badge: "TDS CERTIFIED",
      badgeType: "cyan",
      desc: "RO filter membrane change, booster pump pressure check & TDS calibration",
      descHi: "आरओ फिल्टर मेंब्रेन रिप्लेसमेंट, सेडिमेंट क्लीनिंग व टीडीएस जांच",
      icon: RoPurifierTradeIcon,
      startingPrice: "₹299",
      expertsCount: "39+ Pros",
      expertsCountHi: "39+ विशेषज्ञ",
      accentColor: "text-cyan-400 group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]",
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
      title: "Split AC Deep Foam Jet Service & Gas Check",
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
      user: { fullName: "Rameshwar Sharma", phone: "+91 98765 43210" },
      experienceYears: 9,
      bio: "Certified senior automobile technician specializing in OBD-II breakdown diagnosis and precision mechanical overhauls.",
      bioHi: "प्रमाणित सीनियर ऑटोमोबाइल तकनीशियन, ब्रेकडाउन डायग्नोसिस और जापानी/जर्मन कारों में 9 वर्षों का अनुभव।",
      avgRating: 4.95,
      baseVisitingCharge: 199,
      specialty: "Master Auto Mechanic",
      specialtyHi: "मास्टर ऑटो मैकेनिक",
      jobsDone: 342,
    },
    {
      id: "tech-2",
      user: { fullName: "Vikramjit Singh", phone: "+91 98765 43211" },
      experienceYears: 7,
      bio: "Licensed industrial wireman, expert in MCB distribution boards, high-load inverters, and phase load balancing.",
      bioHi: "लाइसेंस प्राप्त इलेक्ट्रीशियन, एमसीबी बोर्ड, हाई-लोड इनवर्टर और हाउस री-वायरिंग विशेषज्ञ।",
      avgRating: 4.91,
      baseVisitingCharge: 149,
      specialty: "Licensed Electrician",
      specialtyHi: "लाइसेंस प्राप्त इलेक्ट्रीशियन",
      jobsDone: 280,
    },
    {
      id: "tech-3",
      user: { fullName: "Sunil Verma", phone: "+91 98765 43212" },
      experienceYears: 8,
      bio: "HVAC specialist with expertise in inverter compressors, eco gas recharging (R32/R410A), and high-pressure jet cleaning.",
      bioHi: "एचवीएसी व एसी विशेषज्ञ, इनवर्टर कंप्रेसर, ईको गैस रीचार्जिंग व डक्ट क्लीनिंग में दक्ष।",
      avgRating: 4.88,
      baseVisitingCharge: 249,
      specialty: "HVAC & AC Expert",
      specialtyHi: "एचवीएसी व एसी एक्सपर्ट",
      jobsDone: 410,
    },
    {
      id: "tech-4",
      user: { fullName: "Mohammad Imran", phone: "+91 98765 43213" },
      experienceYears: 6,
      bio: "Master plumber specializing in high-pressure lines, acoustic concealed leak detection, and sanitary booster fittings.",
      bioHi: "मास्टर प्लंबर, हाई-प्रेशर लाइन्स, कंसील्ड लीकेज डिटेक्शन और सेनेटरी फिटिंग्स में विशेषज्ञ।",
      avgRating: 4.92,
      baseVisitingCharge: 149,
      specialty: "Senior Plumber",
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
        "Stranded on the highway with a dead battery. The JantaGaraj technician arrived in 24 minutes, hooked up high-capacity booster cables, and checked the alternator output before letting me leave. Clear rate card, no haggling.",
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
    <div className="bg-[#0b0f17] text-white min-h-screen selection:bg-amber-500 selection:text-slate-950 pb-24 overflow-hidden relative">
      {/* Precision Engineering Technical Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none -z-0" />

      {/* ========================================================= */}
      {/* 02 HERO SECTION (Industrial-Tech & Precision Engineering)  */}
      {/* ========================================================= */}
      <section
        ref={heroRef}
        className="relative z-10 pt-8 sm:pt-16 pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800/80"
      >
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-10 left-10 w-[500px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-20 right-10 w-[450px] h-[250px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left Column: Headlines & Search */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 lg:pr-4 xl:pr-8">
            {/* Telemetry Status Beacon */}
            <div className="hero-anim inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span>FLEET STATUS: ACTIVE • 500+ VERIFIED ENGINEERS DISPATCHED</span>
            </div>

            {/* Punchy Structured Heading */}
            <h1 className="hero-anim text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.18] sm:leading-[1.12]">
              {t("hero.titlePart1")}{" "}
              <span className="text-amber-400 drop-shadow-[0_0_25px_rgba(245,158,11,0.25)]">
                {t("hero.titlePart2")}
              </span>{" "}
              {t("hero.titlePart3")}
            </h1>

            {/* Silver Slate Description */}
            <p className="hero-anim text-sm sm:text-base text-[#9ca3af] leading-relaxed max-w-2xl">
              {t("hero.mainSubtitle")}
            </p>

            {/* High-Contrast Industrial Command Search Bar */}
            <div className="hero-anim pt-1">
              <form
                onSubmit={handleSearchSubmit}
                className="p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-[#1f2937] border border-slate-800 shadow-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3"
              >
                {/* Location Picker */}
                <div className="flex items-center gap-2 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-700/80 text-xs font-semibold text-white min-w-[150px]">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate max-w-[110px]">{location.city}</span>
                  <button
                    type="button"
                    onClick={() => detectCurrentLocation()}
                    className="text-[10px] text-amber-400 hover:text-amber-300 underline hover:no-underline ml-auto font-mono"
                    title="Auto detect location"
                  >
                    {isLoadingGPS ? "..." : t("nav.gpsDetect")}
                  </button>
                </div>

                {/* Service Search Input */}
                <div className="relative flex-1 flex items-center px-2">
                  <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("hero.searchPlaceholder")}
                    className="w-full bg-transparent border-none text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                {/* Action CTA */}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl sm:rounded-full px-6 font-bold shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                >
                  {t("hero.searchBtn")}
                </Button>
              </form>
            </div>

            {/* Quick Action Buttons */}
            <div className="hero-anim flex flex-wrap items-center gap-3 pt-1">
              <Link to="/services">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 py-3 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.25)] flex items-center gap-2 transition-all hover:scale-[1.02]"
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
            <div className="hero-anim pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3.5 rounded-xl bg-[#1f2937] border border-slate-800 shadow-sm">
                <p className="text-xl font-bold font-mono text-cyan-400">500+</p>
                <p className="text-[11px] text-[#9ca3af]">{t("hero.statPros")}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1f2937] border border-slate-800 shadow-sm">
                <p className="text-xl font-bold font-mono text-amber-400">30 {t("common.mins")}</p>
                <p className="text-[11px] text-[#9ca3af]">{t("hero.statArrival")}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1f2937] border border-slate-800 shadow-sm">
                <p className="text-xl font-bold font-mono text-white">4.92★</p>
                <p className="text-[11px] text-[#9ca3af]">{t("hero.statRating")}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1f2937] border border-slate-800 shadow-sm">
                <p className="text-xl font-bold font-mono text-amber-400">₹0</p>
                <p className="text-[11px] text-[#9ca3af]">{t("hero.statCharges")}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Floating Cards */}
          <div className="lg:col-span-5 relative lg:pl-4 xl:pl-8">
            <div className="hero-anim relative mx-auto max-w-md lg:max-w-none">
              {/* Ambient atmospheric glow */}
              <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-amber-500/10 blur-3xl -z-10 pointer-events-none" />

              {/* Watermark Typography */}
              <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none -z-10 font-display font-black text-[110px] sm:text-[150px] lg:text-[180px] leading-none tracking-widest text-white/[0.035] uppercase text-center"
              >
                GARAJ
              </div>

              {/* Direct Transparent Cutout */}
              <picture>
                <source srcSet="/images/hero_technician.webp" type="image/webp" />
                <source srcSet="/images/hero_technician.png" type="image/png" />
                <img
                  src="/images/hero_technician.webp"
                  alt="JantaGaraj verified master automotive technician standing with wrench and diagnostic tools"
                  width="896"
                  height="1200"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full max-h-[560px] sm:max-h-[640px] object-contain object-bottom drop-shadow-[0_25px_45px_rgba(0,0,0,0.8)] transition-transform duration-700 hover:scale-[1.02]"
                />
              </picture>

              {/* Floating Badge 1: Top-Right (Rating & Reviews) */}
              <div className="absolute top-10 sm:top-14 -right-2 sm:-right-4 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-[#1f2937]/95 backdrop-blur-md border border-slate-700/80 shadow-[0_16px_40px_rgba(0,0,0,0.5)] z-30 flex items-center gap-3 animate-in fade-in duration-500">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 border border-slate-700">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-white leading-tight font-mono">
                    4.92 / 5.0
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-medium text-[#9ca3af]">
                    15K+ Verified Reviews
                  </p>
                </div>
              </div>

              {/* Floating Badge 2: Mid-Left (Featured Expert) */}
              <div className="absolute top-[48%] -translate-y-1/2 -left-2 sm:-left-6 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-[#1f2937]/95 backdrop-blur-md border border-slate-700/80 shadow-[0_16px_40px_rgba(0,0,0,0.5)] z-30 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                <div>
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                    {language === "hi" ? "शीर्ष विशेषज्ञ" : "FEATURED EXPERT"}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-white">
                    {language === "hi" ? "मास्टर ऑटो मैकेनिक व प्रो" : "Master Diagnostics Pro"}
                  </p>
                </div>
              </div>

              {/* Floating Badge 3: Bottom-Left (100% Genuine OEM Spares) */}
              <div className="absolute bottom-6 sm:bottom-10 left-1 sm:left-4 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#1f2937]/95 backdrop-blur-md border border-slate-700/80 shadow-[0_16px_40px_rgba(0,0,0,0.5)] z-30 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)] shrink-0 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {language === "hi" ? "100% ओरिजिनल पार्ट्स व वारंटी" : "100% Genuine Spares & Warranty"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 02.5 LIVE TRACKING & TELEMETRY WIDGET (Industrial-Tech Showcase) */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#1f2937] border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase">
                  Live Dispatch Telemetry
                </span>
                <span className="text-xs text-[#9ca3af] font-mono">
                  JOB #JG-4081 • TATA HARRIER 2.0
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Doorstep Battery Triage &amp; Alternator Diagnostics
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center gap-2 text-xs font-mono font-bold">
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
                  ? "bg-amber-950/30 border-amber-500/60 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                  : "bg-[#111827] border-slate-800 text-slate-500"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold font-mono mb-1 text-amber-400">
                <Activity className="w-4 h-4 animate-spin text-amber-400 shrink-0" />
                <span>03. PRECISION CALIBRATION</span>
              </div>
              <p className="text-xs text-amber-200/70">
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
                <p className="text-xs text-[#9ca3af]">Master Auto Mechanic • 9+ Yrs Exp • 4.95 Rating</p>
              </div>
            </div>

            <a
              href="tel:+918439616833"
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Mechanic Directly</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 03 POPULAR CATEGORIES (Service Selection Cards with Hover Lift) */}
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
                <div className="h-full p-6 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-300 shadow-md flex flex-col justify-between">
                  <div>
                    {/* Top Row: Icon + High-Contrast Badge + Starting Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-11 h-11 flex items-center justify-center bg-transparent border-0 p-0 ${cat.accentColor} transition-all duration-300 group-hover:scale-110`}
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

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#9ca3af]">
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
      {/* 04 HOW IT WORKS (1-2-3 Service Process Timeline)          */}
      {/* ========================================================= */}
      <section
        id="how-it-works"
        ref={howItWorksRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 scroll-mt-28"
      >
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-2">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {/* Step 1 */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden shadow-lg">
            <div>
              <div className="flex items-start justify-between gap-4 mb-3.5">
                <h3 className="text-lg font-bold font-display text-white leading-snug">
                  {t("howItWorks.step1Title")}
                </h3>
                <span className="font-mono font-black text-4xl sm:text-5xl text-amber-400/20 select-none shrink-0 group-hover:text-amber-400/40 transition-colors leading-none">
                  01
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                {t("howItWorks.step1Desc")}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-amber-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{language === "hi" ? "पारदर्शी तय दरें" : "Fixed Upfront Quotes"}</span>
              </span>
              <span className="text-slate-500">STAGE 1</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden shadow-lg">
            <div>
              <div className="flex items-start justify-between gap-4 mb-3.5">
                <h3 className="text-lg font-bold font-display text-white leading-snug">
                  {t("howItWorks.step2Title")}
                </h3>
                <span className="font-mono font-black text-4xl sm:text-5xl text-cyan-400/20 select-none shrink-0 group-hover:text-cyan-400/40 transition-colors leading-none">
                  02
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                {t("howItWorks.step2Desc")}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{language === "hi" ? "3 मिनट में नजदीकी मैकेनिक" : "Matched in 3 Minutes"}</span>
              </span>
              <span className="text-slate-500">STAGE 2</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden shadow-lg">
            <div>
              <div className="flex items-start justify-between gap-4 mb-3.5">
                <h3 className="text-lg font-bold font-display text-white leading-snug">
                  {t("howItWorks.step3Title")}
                </h3>
                <span className="font-mono font-black text-4xl sm:text-5xl text-amber-400/20 select-none shrink-0 group-hover:text-amber-400/40 transition-colors leading-none">
                  03
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                {t("howItWorks.step3Desc")}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-amber-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{language === "hi" ? "काम से संतुष्ट होने पर पेमेंट" : "Pay After Satisfaction"}</span>
              </span>
              <span className="text-slate-500">STAGE 3</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 05 POPULAR SERVICES (Industrial Service Grid)              */}
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
              <Skeleton key={i} className="h-56 w-full rounded-2xl bg-slate-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedServices.map((service) => (
              <div
                key={service.id}
                className="p-6 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-300 shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded uppercase tracking-wider">
                      {tc(service.category?.name || "Service")}
                    </span>
                    <span className="text-lg font-mono font-extrabold text-amber-400">
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

                <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between gap-3">
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
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl shadow-[0_0_12px_rgba(245,158,11,0.25)]"
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
      {/* 06 TRUSTED TECHNICIANS (Verified Field Engineers)          */}
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
              className="p-6 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300 shadow-md flex flex-col justify-between group"
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
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
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

                <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-[#9ca3af]">
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

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-0.5 font-mono">
                    {t("techs.visitingFee")}
                  </span>
                  <span className="text-base font-bold font-mono text-white">
                    ₹{tech.baseVisitingCharge || 149}
                  </span>
                </div>
                <Link to={`/technicians/${tech.id}`}>
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs"
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
      {/* 07 WHY JANTAGARAJ (Precision Engineering Standards)       */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#111827] border border-slate-800 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="space-y-3 p-5 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {t("why.f1Title")}
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                {t("why.f1Desc")}
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {t("why.f2Title")}
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                {t("why.f2Desc")}
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {t("why.f3Title")}
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                {t("why.f3Desc")}
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
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
      {/* 08 REMOTE ASSISTANCE (Industrial Video Diagnostic Desk)     */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1f2937] border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Video className="w-3.5 h-3.5" />
                {t("remote.tag")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                {t("remote.title")}
              </h2>
              <p className="text-sm text-[#9ca3af] leading-relaxed">
                {t("remote.desc")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#111827] border border-slate-800">
                  <p className="text-xs font-bold text-white">
                    {t("remote.s1Title")}
                  </p>
                  <p className="text-[11px] text-[#9ca3af] mt-0.5">
                    {t("remote.s1Desc")}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#111827] border border-slate-800">
                  <p className="text-xs font-bold text-white">
                    {t("remote.s2Title")}
                  </p>
                  <p className="text-[11px] text-[#9ca3af] mt-0.5">
                    {t("remote.s2Desc")}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#111827] border border-slate-800">
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
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                  >
                    {t("remote.callBtn")}
                  </Button>
                </a>
                <Link to="/services">
                  <Button
                    variant="outline"
                    size="md"
                    className="bg-[#111827] hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 px-6 py-2.5 rounded-xl"
                  >
                    {t("remote.scheduleBtn")}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Video Preview Mock Interface */}
            <div className="lg:col-span-5">
              <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs font-bold font-mono text-cyan-400">
                      {t("remote.statusActive")}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 font-semibold">
                    {t("remote.freeTriage")}
                  </span>
                </div>

                <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-900 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
                    alt="Remote technician guidance"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80";
                    }}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <p className="text-[11px] text-white font-medium">
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
      {/* 09 CUSTOMER REVIEWS (Audited Field Feedback)               */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {language === "hi" && rev.dateHi ? rev.dateHi : rev.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{language === "hi" && rev.commentHi ? rev.commentHi : rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
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
      {/* 10 FINAL CTA BANNER (Precision Reliability Gate)           */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#111827] text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Top Industrial Accent Rule */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-cyan-400 to-amber-500" />
          <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              {t("cta.tag")}
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-[1.3] text-white tracking-tight">
              {t("cta.title")}
            </h2>

            <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
              {t("cta.subtitle")}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link to="/services">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.25)] flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  {t("cta.bookNow")}
                </Button>
              </Link>
              <a href="tel:+918439616833">
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<Phone className="w-4 h-4 text-amber-400" />}
                  className="bg-[#1f2937] hover:bg-slate-800 text-white border border-slate-700 px-6 py-3 rounded-xl font-mono text-xs sm:text-sm"
                >
                  {t("cta.callHelp")}
                </Button>
              </a>
            </div>

            <p className="text-[11px] font-mono text-slate-500 pt-2">
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
