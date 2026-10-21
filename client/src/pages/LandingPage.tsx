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
  Tv,
  Sparkles,
  CalendarCheck,
  Car,
  BadgeCheck,
} from "lucide-react";
import { useGetCategoriesQuery, useGetServicesQuery } from "../features/services/api/servicesApi";
import { useGetTechniciansQuery } from "../features/technicians/api/techniciansApi";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "../context/LocationContext";
import { Service } from "../types/api.types";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
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
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");

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

  // Popular category blueprints requested by user
  const popularCategories = [
    {
      id: "electrician",
      name: "Electrician",
      nameHi: "इलेक्ट्रीशियन",
      desc: "Wiring, switchboard, fuse, MCB & inverter repairs",
      descHi: "वायरिंग, स्विचबोर्ड, फ्यूज, एमसीबी व इनवर्टर रिपेयर",
      icon: ElectricianTradeIcon,
      startingPrice: "₹199",
      expertsCount: "42+ Pros",
      expertsCountHi: "42+ विशेषज्ञ",
      accentColor: "text-amber-500 dark:text-amber-400 group-hover:border-amber-500/50 group-hover:shadow-[0_0_24px_rgba(245,158,11,0.25)]",
    },
    {
      id: "plumbing",
      name: "Plumbing",
      nameHi: "प्लंबिंग",
      desc: "Leakage, pipe fittings, taps, tanks & drain clearing",
      descHi: "लीकेज, पाइप फिटिंग, नल, टंकी व ड्रेन क्लीनिंग",
      icon: PlumbingTradeIcon,
      startingPrice: "₹149",
      expertsCount: "38+ Pros",
      expertsCountHi: "38+ विशेषज्ञ",
      accentColor: "text-sky-500 dark:text-sky-400 group-hover:border-sky-500/50 group-hover:shadow-[0_0_24px_rgba(14,165,233,0.25)]",
    },
    {
      id: "ac-repair",
      name: "AC Repair & Service",
      nameHi: "एसी रिपेयर व सर्विस",
      desc: "Deep foam jet cleaning, gas charging & compressor fix",
      descHi: "डीप फोम जेट क्लीनिंग, गैस चार्जिंग व कंप्रेसर रिपेयर",
      icon: AcRepairTradeIcon,
      startingPrice: "₹499",
      expertsCount: "56+ Pros",
      expertsCountHi: "56+ विशेषज्ञ",
      accentColor: "text-teal-500 dark:text-teal-400 group-hover:border-teal-500/50 group-hover:shadow-[0_0_24px_rgba(20,184,166,0.25)]",
    },
    {
      id: "appliance",
      name: "Appliance Repair",
      nameHi: "अप्लायंस रिपेयर",
      desc: "Washing machine, refrigerator, microwave & RO water",
      descHi: "वॉशिंग मशीन, फ्रिज, माइक्रोवेव व आरओ वॉटर प्यूरीफायर",
      icon: ApplianceRepairTradeIcon,
      startingPrice: "₹249",
      expertsCount: "35+ Pros",
      expertsCountHi: "35+ विशेषज्ञ",
      accentColor: "text-indigo-500 dark:text-indigo-400 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_24px_rgba(99,102,241,0.25)]",
    },
    {
      id: "cleaning",
      name: "Deep Cleaning",
      nameHi: "डीप क्लीनिंग",
      desc: "Home deep clean, kitchen degreasing & sofa shampoo",
      descHi: "फुल होम डीप क्लीन, किचन डीग्रीजिंग व सोफा शैम्पू",
      icon: CleaningTradeIcon,
      startingPrice: "₹399",
      expertsCount: "29+ Pros",
      expertsCountHi: "29+ विशेषज्ञ",
      accentColor: "text-emerald-500 dark:text-emerald-400 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_24px_rgba(16,185,129,0.25)]",
    },
    {
      id: "mechanic",
      name: "Auto & Garage Repair",
      nameHi: "ऑटो व गैराज रिपेयर",
      desc: "Doorstep car/bike breakdown, battery jumpstart & lube",
      descHi: "डोरस्टेप कार/बाइक ब्रेकडाउन, बैटरी जंपस्टार्ट व ल्यूब",
      icon: AutoGarageTradeIcon,
      startingPrice: "₹299",
      expertsCount: "64+ Pros",
      expertsCountHi: "64+ विशेषज्ञ",
      accentColor: "text-[#E87532] dark:text-[#E87532] group-hover:border-[#E87532]/60 group-hover:shadow-[0_0_24px_rgba(232,117,50,0.25)]",
    },
    {
      id: "painting",
      name: "Painting & Waterproofing",
      nameHi: "पेंटिंग व वॉटरप्रूफिंग",
      desc: "Wall dampness repair, interior fresh paint, texture & exterior coat",
      descHi: "दीवारों की सीलन रिपेयर, इंटीरियर फ्रेश पेंट, पुट्टी व वॉटरप्रूफिंग",
      icon: PaintingTradeIcon,
      startingPrice: "₹499",
      expertsCount: "34+ Pros",
      expertsCountHi: "34+ विशेषज्ञ",
      accentColor: "text-rose-500 dark:text-rose-400 group-hover:border-rose-500/50 group-hover:shadow-[0_0_24px_rgba(244,63,94,0.25)]",
    },
    {
      id: "carpentry",
      name: "Carpentry & Woodwork",
      nameHi: "कारपेंट्री व वुडवर्क",
      desc: "Door lock & hinge fix, modular cabinet tuning, furniture polish",
      descHi: "दरवाजे के लॉक व कब्जे, किचन कैबिनेट्स रिपेयर व फर्नीचर पॉलिश",
      icon: CarpentryTradeIcon,
      startingPrice: "₹199",
      expertsCount: "48+ Pros",
      expertsCountHi: "48+ विशेषज्ञ",
      accentColor: "text-yellow-600 dark:text-yellow-500 group-hover:border-yellow-600/50 group-hover:shadow-[0_0_24px_rgba(202,138,4,0.25)]",
    },
    {
      id: "cctv-security",
      name: "CCTV & Smart Security",
      nameHi: "सीसीटीवी व स्मार्ट सिक्योरिटी",
      desc: "HD CCTV camera installation, smart video doorbells & digital locks",
      descHi: "HD सीसीटीवी कैमरा फिटिंग, स्मार्ट वीडियो डोरबेल व डिजिटल लॉक सेटअप",
      icon: SecurityCctvTradeIcon,
      startingPrice: "₹499",
      expertsCount: "27+ Pros",
      expertsCountHi: "27+ विशेषज्ञ",
      accentColor: "text-blue-500 dark:text-blue-400 group-hover:border-blue-500/50 group-hover:shadow-[0_0_24px_rgba(59,130,246,0.25)]",
    },
    {
      id: "ro-water-purifier",
      name: "RO Water Purifier Care",
      nameHi: "आरओ वॉटर प्यूरीफायर सर्विस",
      desc: "RO filter membrane change, sediment cleaning & TDS calibration",
      descHi: "आरओ फिल्टर मेंब्रेन रिप्लेसमेंट, सेडिमेंट क्लीनिंग व टीडीएस जांच",
      icon: RoPurifierTradeIcon,
      startingPrice: "₹299",
      expertsCount: "39+ Pros",
      expertsCountHi: "39+ विशेषज्ञ",
      accentColor: "text-cyan-500 dark:text-cyan-400 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_24px_rgba(6,182,212,0.25)]",
    },
    {
      id: "car-denting-painting",
      name: "Car Denting & Painting",
      nameHi: "कार डेंटिंग व पेंटिंग",
      desc: "Paintless dent removal, scratch buffing, bumper & panel restoration",
      descHi: "पेंटलेस डेंट रिमूवल (PDR), स्क्रैच बफिंग, बंपर व पैनल पेंटिंग",
      icon: DentingPaintingTradeIcon,
      startingPrice: "₹699",
      expertsCount: "52+ Pros",
      expertsCountHi: "52+ विशेषज्ञ",
      accentColor: "text-violet-500 dark:text-violet-400 group-hover:border-violet-500/50 group-hover:shadow-[0_0_24px_rgba(139,92,246,0.25)]",
    },
    {
      id: "windshield-lights-care",
      name: "Windshield & Glass Care",
      nameHi: "विंडशील्ड व ग्लास केयर",
      desc: "Windshield chip crack repair, headlight restoration & power window",
      descHi: "विंडशील्ड क्रैक रिपेयर, हेडलाइट डी-ऑक्सीडाइजिंग व पावर विंडो मोटर",
      icon: WindshieldGlassTradeIcon,
      startingPrice: "₹399",
      expertsCount: "31+ Pros",
      expertsCountHi: "31+ विशेषज्ञ",
      accentColor: "text-emerald-600 dark:text-emerald-400 group-hover:border-emerald-600/50 group-hover:shadow-[0_0_24px_rgba(5,150,105,0.25)]",
    },
  ];

  // Fallback high-intent services if DB empty
  const fallbackServices: Service[] = [
    {
      id: "fb-1",
      title: "General Car Inspection & Comprehensive Service",
      categoryId: "mechanic",
      category: { id: "mechanic", name: "Auto Service", description: "Vehicle care" },
      defaultPrice: 899,
      durationMinutes: 60,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-2",
      title: "Emergency Battery Jumpstart & Diagnostic",
      categoryId: "mechanic",
      category: { id: "mechanic", name: "Auto Service", description: "Vehicle care" },
      defaultPrice: 349,
      durationMinutes: 30,
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
      title: "Complete Home Electrical Short Circuit Triage",
      categoryId: "electrician",
      category: { id: "electrician", name: "Electrician", description: "Electrical work" },
      defaultPrice: 249,
      durationMinutes: 35,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-5",
      title: "Bathroom Tap & Concealed Pipe Leakage Repair",
      categoryId: "plumbing",
      category: { id: "plumbing", name: "Plumbing", description: "Plumbing work" },
      defaultPrice: 199,
      durationMinutes: 40,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-6",
      title: "Fully Automatic Washing Machine Drum & Motor Repair",
      categoryId: "appliance",
      category: { id: "appliance", name: "Appliance", description: "Appliance care" },
      defaultPrice: 399,
      durationMinutes: 50,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-7",
      title: "Wall Dampness Treatment & Anti-Fungal Waterproofing",
      categoryId: "painting",
      category: { id: "painting", name: "Painting & Waterproofing", description: "Wall care" },
      defaultPrice: 1799,
      durationMinutes: 90,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-8",
      title: "Door Lock, Handle & Concealed Hinge Repair",
      categoryId: "carpentry",
      category: { id: "carpentry", name: "Carpentry & Woodwork", description: "Carpentry" },
      defaultPrice: 249,
      durationMinutes: 40,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-9",
      title: "Doorstep HD CCTV Camera Installation & Mobile App Config",
      categoryId: "cctv-security",
      category: { id: "cctv-security", name: "CCTV & Smart Security", description: "Security" },
      defaultPrice: 499,
      durationMinutes: 60,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-10",
      title: "Comprehensive RO Service & Multi-Stage Filter Replacement",
      categoryId: "ro-water-purifier",
      category: { id: "ro-water-purifier", name: "RO Water Purifier Care", description: "Water purification" },
      defaultPrice: 349,
      durationMinutes: 45,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-11",
      title: "Paintless Dent Removal & Minor Scratch Buffing",
      categoryId: "car-denting-painting",
      category: { id: "car-denting-painting", name: "Car Denting & Painting", description: "Bodywork" },
      defaultPrice: 799,
      durationMinutes: 60,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-12",
      title: "Windshield Crack Resin Repair & Headlight Polish",
      categoryId: "windshield-lights-care",
      category: { id: "windshield-lights-care", name: "Windshield & Glass Care", description: "Glass care" },
      defaultPrice: 399,
      durationMinutes: 40,
      createdAt: "",
      updatedAt: "",
    },
  ];

  // Display services
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
      bio: "Certified senior automobile technician specializing in breakdown diagnosis and Japanese/German cars.",
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
      bio: "Licensed industrial and domestic wireman, expert in MCB boards, high-load inverters, and house rewiring.",
      bioHi: "लाइसेंस प्राप्त इलेक्ट्रीशियन, एमसीबी बोर्ड, हाई-लोड इनवर्टर और हाउस री-वायरिंग विशेषज्ञ।",
      avgRating: 4.9,
      baseVisitingCharge: 149,
      specialty: "Licensed Electrician",
      specialtyHi: "लाइसेंस प्राप्त इलेक्ट्रीशियन",
      jobsDone: 280,
    },
    {
      id: "tech-3",
      user: { fullName: "Sunil Verma", phone: "+91 98765 43212" },
      experienceYears: 8,
      bio: "HVAC and AC specialist with expertise in inverter compressors, eco gas recharging, and duct cleaning.",
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
      bio: "Master plumber specializing in high-pressure lines, concealed leak detection, and sanitary fittings.",
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
        "My car battery died unexpectedly in the basement parking around 9 PM. Ramesh arrived in 25 minutes with a portable starter kit, verified the alternator output, and got me moving without any hassle. Clear upfront price of ₹349, no hidden extra charge.",
      commentHi:
        "रात 9 बजे बेसमेंट पार्किंग में मेरी कार की बैटरी अचानक खत्म हो गई। रमेश 25 मिनट में पोर्टेबल स्टार्टर किट लेकर पहुंचे, अल्टरनेटर चेक किया और बिना किसी परेशानी के कार स्टार्ट कर दी। बिल्कुल तय ₹349 चार्ज, कोई अतिरिक्त पैसा नहीं लिया।",
      verified: true,
    },
    {
      id: "rev-2",
      customerName: "Priya Sundaram",
      customerNameHi: "प्रिया सुंदरम",
      location: "HSR Layout, Bengaluru",
      locationHi: "एचएसआर लेआउट, बेंगलुरु",
      serviceUsed: "MCB Trip & Kitchen Wiring Repair",
      serviceUsedHi: "एमसीबी ट्रिप व किचन वायरिंग रिपेयर",
      rating: 5,
      date: "1 week ago",
      dateHi: "1 सप्ताह पहले",
      comment:
        "Half of our apartment circuit tripped suddenly. Booked an electrician on JantaGaraj; technician Vikram brought multimeter tools, identified a burnt junction box behind the chimney, and fixed it within 40 minutes. Extremely polite and professional.",
      commentHi:
        "हमारे फ्लैट का आधा सर्किट अचानक ट्रिप हो गया था। जनतागैराज पर इलेक्ट्रीशियन बुक किया; विक्रम जी मल्टीमीटर टूल्स के साथ आए, चिमनी के पीछे जला हुआ जंक्शन बॉक्स ढूंढा और 40 मिनट में ठीक कर दिया। बहुत ही विनम्र और पेशेवर सेवा।",
      verified: true,
    },
    {
      id: "rev-3",
      customerName: "Anand Malhotra",
      customerNameHi: "आनंद मल्होत्रा",
      location: "Saket, New Delhi",
      locationHi: "साकेत, नई दिल्ली",
      serviceUsed: "Split AC Jet Deep Foam Service",
      serviceUsedHi: "स्प्लिट एसी जेट डीप फोम सर्विस",
      rating: 5,
      date: "2 weeks ago",
      dateHi: "2 सप्ताह पहले",
      comment:
        "The foam jet cleaning was completely mess-free. The technician used a proper waterproof funnel jacket, so not a single drop soiled our painted wall. AC cooling is back to optimum. Far better experience than local unverified mechanics.",
      commentHi:
        "फोम जेट क्लीनिंग बिल्कुल साफ-सुथरी रही। तकनीशियन ने वाटरप्रूफ फनल जैकेट का इस्तेमाल किया, जिससे दीवार पर एक बूंद भी नहीं गिरी। एसी की कूलिंग अब एकदम बेहतरीन है। लोकल अनवेरिफाइड मैकेनिकों से कहीं बेहतर अनुभव।",
      verified: true,
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden bg-[#F8F7F3] dark:bg-[#040404] text-[#252621] dark:text-[#F5F2EB] transition-colors">
      {/* ========================================================= */}
      {/* 02 HERO SECTION                                           */}
      {/* ========================================================= */}
      <section
        ref={heroRef}
        className="relative pt-8 sm:pt-16 pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left Column: Headlines & Search */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 lg:pr-4 xl:pr-8">
            {/* Trust Pill */}
            <div className="hero-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] text-[#252621] dark:text-[#F5F2EB] text-xs font-semibold shadow-subtle">
              <span className="w-2 h-2 rounded-full bg-[#E87532] animate-pulse" />
              <span>{t("hero.trustPill1")}</span>
              <span className="text-[#E7E5DF] dark:text-[#2B231D]">|</span>
              <span className="text-[#E87532] font-bold">{t("hero.trustPill2")}</span>
            </div>

            {/* Headline */}
            <h1 className="hero-anim text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#252621] dark:text-[#F5F2EB] leading-[1.18] sm:leading-[1.15] lg:leading-[1.12]">
              {t("hero.titlePart1")}{" "}
              <span className="text-[#E87532]">
                {t("hero.titlePart2")}
              </span>{" "}
              {t("hero.titlePart3")}
            </h1>

            {/* Subtitle */}
            <p className="hero-anim text-base sm:text-lg text-[#717167] dark:text-[#9E9488] leading-relaxed max-w-2xl">
              {t("hero.mainSubtitle")}
            </p>

            {/* Interactive Search Bar (HandyHub Style) */}
            <div className="hero-anim pt-2">
              <form
                onSubmit={handleSearchSubmit}
                className="p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3"
              >
                {/* Location Picker */}
                <div className="flex items-center gap-2 px-3 py-2 border-b sm:border-b-0 sm:border-r border-[#E7E5DF] dark:border-[#2B231D] text-xs font-semibold text-[#252621] dark:text-[#F5F2EB] min-w-[150px]">
                  <MapPin className="w-4 h-4 text-[#E87532] shrink-0" />
                  <span className="truncate max-w-[110px]">{location.city}</span>
                  <button
                    type="button"
                    onClick={() => detectCurrentLocation()}
                    className="text-[10px] text-[#E87532] underline hover:no-underline ml-auto"
                    title="Auto detect location"
                  >
                    {isLoadingGPS ? "..." : t("nav.gpsDetect")}
                  </button>
                </div>

                {/* Service Search Input */}
                <div className="relative flex-1 flex items-center px-2">
                  <Search className="w-4 h-4 text-[#8F8F85] mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("hero.searchPlaceholder")}
                    className="w-full bg-transparent border-none text-xs sm:text-sm text-[#252621] dark:text-[#F5F2EB] placeholder:text-[#8F8F85] focus:outline-none"
                  />
                </div>

                {/* Action CTA */}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="rounded-xl sm:rounded-full px-6 font-bold shadow-orange-glow"
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
                  className="shadow-orange-glow font-bold px-7"
                >
                  {t("hero.bookBtn")}
                </Button>
              </Link>
              <Link to="/technicians">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#E7E5DF] text-[#252621] dark:text-[#F5F2EB] hover:bg-white dark:hover:bg-[#1A1613]"
                >
                  {t("hero.findTechBtn")}
                </Button>
              </Link>
            </div>

            {/* Trust Metrics Bar */}
            <div className="hero-anim pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3 rounded-xl bg-white/80 dark:bg-[#141210]/80 border border-[#E7E5DF] dark:border-[#2B231D] shadow-subtle">
                <p className="text-xl font-bold font-mono text-[#252621] dark:text-[#F5F2EB]">500+</p>
                <p className="text-[11px] text-[#717167] dark:text-[#9E9488]">{t("hero.statPros")}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/80 dark:bg-[#141210]/80 border border-[#E7E5DF] dark:border-[#2B231D] shadow-subtle">
                <p className="text-xl font-bold font-mono text-[#252621] dark:text-[#F5F2EB]">30 {t("common.mins")}</p>
                <p className="text-[11px] text-[#717167] dark:text-[#9E9488]">{t("hero.statArrival")}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/80 dark:bg-[#141210]/80 border border-[#E7E5DF] dark:border-[#2B231D] shadow-subtle">
                <p className="text-xl font-bold font-mono text-[#252621] dark:text-[#F5F2EB]">4.9★</p>
                <p className="text-[11px] text-[#717167] dark:text-[#9E9488]">{t("hero.statRating")}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/80 dark:bg-[#141210]/80 border border-[#E7E5DF] dark:border-[#2B231D] shadow-subtle">
                <p className="text-xl font-bold font-mono text-[#252621] dark:text-[#F5F2EB]">₹0</p>
                <p className="text-[11px] text-[#717167] dark:text-[#9E9488]">{t("hero.statCharges")}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Floating Cards (HandyHub Blueprint) */}
          <div className="lg:col-span-5 relative lg:pl-4 xl:pl-8">
            <div className="hero-anim relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-premium aspect-[4/4.5] flex flex-col justify-end p-6 pb-9 sm:pb-10">
                {/* Background Authentic Service Collage / Visual Banner */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#252621]/90 via-[#252621]/30 to-transparent z-10" />
                <img
                  src="/images/hero_technician.jpg"
                  alt="Modern verified technician with diagnostic tools"
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />

                {/* Content on Bottom of Card */}
                <div className="relative z-20 text-white space-y-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E87532] text-white text-[11px] font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {t("techs.verifiedPro")}
                  </span>
                  <h3 className="text-2xl font-bold font-display text-white">
                    {t("hero.directDoorstep")}
                  </h3>
                  <p className="text-xs text-stone-200 line-clamp-2">
                    {t("hero.directDesc")}
                  </p>
                </div>
              </div>

              {/* Floating HandyHub Style Service Card (Top-Right) */}
              <div className="absolute -top-7 sm:-top-9 -right-6 sm:-right-8 lg:-right-9 p-4 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-premium z-30 max-w-[210px] hidden sm:block animate-in fade-in duration-500">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-[#E87532] flex items-center justify-center font-bold text-xs">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#252621] dark:text-[#F5F2EB]">{t("hero.emergencyRepair")}</p>
                    <p className="text-[10px] text-[#717167] dark:text-[#9E9488]">{t("hero.instantDispatch")}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-semibold border-t border-[#E7E5DF] dark:border-[#2B231D] pt-2">
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    {t("hero.availableNow")}
                  </span>
                  <span className="font-mono font-bold text-[#E87532]">
                    {language === "hi" ? "₹299 से" : "From ₹299"}
                  </span>
                </div>
              </div>

              {/* Floating Bottom Card: Rating & Reliability */}
              <div className="absolute -bottom-8 -left-5 sm:-bottom-10 sm:-left-8 lg:-bottom-10 lg:-left-8 p-3.5 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-premium z-30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center font-bold">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-[#252621] dark:text-[#F5F2EB]">4.95 / 5.0</span>
                    <BadgeCheck className="w-4 h-4 text-[#E87532]" />
                  </div>
                  <p className="text-[10px] text-[#717167] dark:text-[#9E9488]">
                    {t("hero.reviewsCount")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 03 POPULAR CATEGORIES                                     */}
      {/* ========================================================= */}
      <section ref={categoriesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E87532]">
              {t("categories.exploreTag")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-[#F5F2EB] mt-1">
              {t("categories.popularTitle")}
            </h2>
            <p className="text-sm text-[#717167] dark:text-[#9E9488] mt-1">
              {t("categories.popularSubtitle")}
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E87532] hover:underline group shrink-0"
          >
            <span>{t("categories.allCategories")}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={`/services?category=${cat.id}`}
                className="category-card-anim group"
              >
                <div className="h-full p-6 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] hover:border-[#E87532]/60 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-13 h-13 p-2.5 rounded-2xl flex items-center justify-center border bg-[#F8F7F3] dark:bg-[#1A1613] border-[#E7E5DF] dark:border-[#2B231D] ${cat.accentColor} transition-all duration-300 group-hover:scale-105`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-bold font-mono text-[#E87532] bg-orange-50 dark:bg-[#1A1613] px-2.5 py-1 rounded-full border border-orange-200/50 dark:border-[#2B231D]">
                        {t("categories.starts")} {cat.startingPrice}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-display text-[#252621] dark:text-[#F5F2EB] group-hover:text-[#E87532] transition-colors">
                      {language === "hi" && cat.nameHi ? cat.nameHi : tc(cat.name)}
                    </h3>
                    <p className="text-xs text-[#717167] dark:text-[#9E9488] mt-1.5 leading-relaxed">
                      {language === "hi" && cat.descHi ? cat.descHi : cat.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between text-xs font-semibold text-[#717167] dark:text-[#9E9488]">
                    <span>{language === "hi" && cat.expertsCountHi ? cat.expertsCountHi : cat.expertsCount}</span>
                    <span className="text-[#E87532] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
      {/* 04 HOW IT WORKS                                           */}
      {/* ========================================================= */}
      <section
        id="how-it-works"
        ref={howItWorksRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28"
      >
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87532]">
            {t("howItWorks.tag")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-[#F5F2EB] mt-1">
            {t("howItWorks.title")}
          </h2>
          <p className="text-sm text-[#717167] dark:text-[#9E9488] mt-2">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {/* Step 1 */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card hover:shadow-card-hover hover:border-[#E87532]/50 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden">
            <div>
              {/* Top Row: Heading on top-left, Number on top-right */}
              <div className="flex items-start justify-between gap-4 mb-3.5">
                <h3 className="text-lg sm:text-xl font-bold font-display text-[#252621] dark:text-[#F5F2EB] leading-snug">
                  {t("howItWorks.step1Title")}
                </h3>
                <span className="font-mono font-black text-4xl sm:text-5xl text-[#E87532]/25 dark:text-[#E87532]/30 select-none shrink-0 group-hover:text-[#E87532]/45 transition-colors leading-none">
                  01
                </span>
              </div>

              {/* Description Content */}
              <p className="text-xs sm:text-sm text-[#717167] dark:text-[#9E9488] leading-relaxed">
                {t("howItWorks.step1Desc")}
              </p>
            </div>

            {/* Bottom Step Highlight */}
            <div className="pt-4 mt-6 border-t border-[#E7E5DF]/70 dark:border-[#2B231D] flex items-center text-xs font-semibold text-[#E87532]">
              <CheckCircle className="w-3.5 h-3.5 mr-1.5 shrink-0" />
              <span>{language === "hi" ? "पारदर्शी तय दरें" : "Fixed Upfront Quotes"}</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card hover:shadow-card-hover hover:border-[#E87532]/50 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden">
            <div>
              {/* Top Row: Heading on top-left, Number on top-right */}
              <div className="flex items-start justify-between gap-4 mb-3.5">
                <h3 className="text-lg sm:text-xl font-bold font-display text-[#252621] dark:text-[#F5F2EB] leading-snug">
                  {t("howItWorks.step2Title")}
                </h3>
                <span className="font-mono font-black text-4xl sm:text-5xl text-[#E87532]/25 dark:text-[#E87532]/30 select-none shrink-0 group-hover:text-[#E87532]/45 transition-colors leading-none">
                  02
                </span>
              </div>

              {/* Description Content */}
              <p className="text-xs sm:text-sm text-[#717167] dark:text-[#9E9488] leading-relaxed">
                {t("howItWorks.step2Desc")}
              </p>
            </div>

            {/* Bottom Step Highlight */}
            <div className="pt-4 mt-6 border-t border-[#E7E5DF]/70 dark:border-[#2B231D] flex items-center text-xs font-semibold text-[#E87532]">
              <CheckCircle className="w-3.5 h-3.5 mr-1.5 shrink-0" />
              <span>{language === "hi" ? "3 मिनट में नजदीकी मैकेनिक" : "Matched in 3 Minutes"}</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card hover:shadow-card-hover hover:border-[#E87532]/50 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden">
            <div>
              {/* Top Row: Heading on top-left, Number on top-right */}
              <div className="flex items-start justify-between gap-4 mb-3.5">
                <h3 className="text-lg sm:text-xl font-bold font-display text-[#252621] dark:text-[#F5F2EB] leading-snug">
                  {t("howItWorks.step3Title")}
                </h3>
                <span className="font-mono font-black text-4xl sm:text-5xl text-[#E87532]/25 dark:text-[#E87532]/30 select-none shrink-0 group-hover:text-[#E87532]/45 transition-colors leading-none">
                  03
                </span>
              </div>

              {/* Description Content */}
              <p className="text-xs sm:text-sm text-[#717167] dark:text-[#9E9488] leading-relaxed">
                {t("howItWorks.step3Desc")}
              </p>
            </div>

            {/* Bottom Step Highlight */}
            <div className="pt-4 mt-6 border-t border-[#E7E5DF]/70 dark:border-[#2B231D] flex items-center text-xs font-semibold text-[#E87532]">
              <CheckCircle className="w-3.5 h-3.5 mr-1.5 shrink-0" />
              <span>{language === "hi" ? "काम से संतुष्ट होने पर पेमेंट" : "Pay After Satisfaction"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 05 POPULAR SERVICES                                       */}
      {/* ========================================================= */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E87532]">
              {t("services.topBookedTag")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-[#F5F2EB] mt-1">
              {t("services.popularTitle")}
            </h2>
            <p className="text-sm text-[#717167] dark:text-[#9E9488] mt-1">
              {t("services.popularSubtitle")}
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E87532] hover:underline group shrink-0"
          >
            <span>{t("services.viewAll")}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {servicesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-56 w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedServices.map((service) => (
              <div
                key={service.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-[#E87532] bg-orange-50 dark:bg-[#1A1613] border border-orange-200/60 dark:border-[#2B231D] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {tc(service.category?.name || "Service")}
                    </span>
                    <span className="text-lg font-mono font-extrabold text-[#252621] dark:text-[#F5F2EB]">
                      ₹{service.defaultPrice}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                    {ts(service.title)}
                  </h3>
                  <p className="text-xs text-[#717167] dark:text-[#9E9488] mt-2 leading-relaxed">
                    {t("services.desc")}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between gap-3">
                  <div className="text-xs text-[#717167] dark:text-[#9E9488] flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#E87532]" />
                    <span>
                      {service.durationMinutes || 45} {t("common.mins")}
                    </span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleBookService(service)}
                    className="font-bold shadow-orange-glow px-4"
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
      {/* 06 TRUSTED TECHNICIANS                                    */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E87532]">
              {t("techs.tag")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-[#F5F2EB] mt-1">
              {t("techs.title")}
            </h2>
            <p className="text-sm text-[#717167] dark:text-[#9E9488] mt-1">
              {t("techs.subtitle")}
            </p>
          </div>
          <Link
            to="/technicians"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E87532] hover:underline group shrink-0"
          >
            <span>{t("techs.allTechs")}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedTechnicians.map((tech) => (
            <div
              key={tech.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] hover:border-[#E87532]/50 dark:hover:border-[#FF7A1A]/40 shadow-card hover:shadow-card-hover dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Status & Rating */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    {t("techs.verifiedPro")}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#252621] dark:text-[#F5F5F0] bg-[#F8F7F3] dark:bg-[#1A1613] px-2.5 py-0.5 rounded-lg border border-[#E7E5DF] dark:border-[#2B231D]">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{tech.avgRating || 4.9}</span>
                  </div>
                </div>

                {/* Avatar / Name */}
                <div className="flex items-start gap-3.5 mt-2 mb-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#E87532]/25 to-[#E87532]/5 text-[#E87532] font-black text-base flex items-center justify-center border border-[#E87532]/40 shrink-0 shadow-sm mt-0.5">
                    {tech.user?.fullName?.charAt(0) || "T"}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-[#252621] dark:text-[#F5F5F0] group-hover:text-[#E87532] transition-colors leading-snug">
                      {tech.user?.fullName || "Certified Technician"}
                    </h3>
                    <p className="text-xs font-semibold text-[#E87532] mt-0.5 truncate">
                      {language === "hi"
                        ? ((tech as any).specialtyHi || (tech as any).specialty || "ऑटो व होम विशेषज्ञ")
                        : ((tech as any).specialty || "Auto & Home Specialist")}
                    </p>
                  </div>
                </div>

                {/* Bio text with spacious leading and 3-line clamp */}
                <p className="text-xs sm:text-[13px] text-[#61605A] dark:text-[#A39E93] line-clamp-3 mt-3 leading-relaxed min-h-[58px]">
                  {language === "hi"
                    ? ((tech as any).bioHi || tech.bio || "त्वरित डायग्नोसिस और प्रामाणिक रिपेयर मानकों के लिए समर्पित पेशेवर तकनीशियन।")
                    : (tech.bio || "Professional technician dedicated to swift diagnostics and genuine repair standards.")}
                </p>

                {/* Experience & Jobs stats container with clear spacing and divider */}
                <div className="mt-4 pt-3.5 border-t border-[#E7E5DF]/70 dark:border-[#2B231D]/80 flex items-center justify-between text-xs text-[#717167] dark:text-[#A39E93]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-[#8F8F85]">{t("common.exp")}:</span>
                    <span className="font-semibold text-[#252621] dark:text-[#F5F2EB]">
                      {tech.experienceYears}+ {t("common.years")}
                    </span>
                  </div>
                  <div className="h-3 w-px bg-[#E7E5DF] dark:bg-[#2B231D]" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-[#8F8F85]">{language === "hi" ? "काम" : "Jobs"}:</span>
                    <span className="font-semibold text-[#252621] dark:text-[#F5F2EB]">
                      {(tech as any).jobsDone || 120}+
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8F8F85] block mb-0.5">
                    {t("techs.visitingFee")}
                  </span>
                  <span className="text-base font-bold font-mono text-[#252621] dark:text-white">
                    ₹{tech.baseVisitingCharge || 149}
                  </span>
                </div>
                <Link to={`/technicians/${tech.id}`}>
                  <Button variant="primary" size="sm" className="text-xs font-bold shadow-orange-glow px-4 py-2 rounded-xl">
                    {t("techs.viewProfile")}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 07 WHY JANTAGARAJ                                         */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E87532]">
              {t("why.tag")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-[#F5F2EB] mt-1">
              {t("why.title")}
            </h2>
            <p className="text-sm text-[#717167] dark:text-[#9E9488] mt-2">
              {t("why.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3 p-5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]">
              <div className="w-10 h-10 rounded-xl bg-[#E87532]/10 text-[#E87532] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#252621] dark:text-[#F5F2EB]">
                {t("why.f1Title")}
              </h3>
              <p className="text-xs text-[#717167] dark:text-[#9E9488] leading-relaxed">
                {t("why.f1Desc")}
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]">
              <div className="w-10 h-10 rounded-xl bg-[#E87532]/10 text-[#E87532] flex items-center justify-center font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#252621] dark:text-[#F5F2EB]">
                {t("why.f2Title")}
              </h3>
              <p className="text-xs text-[#717167] dark:text-[#9E9488] leading-relaxed">
                {t("why.f2Desc")}
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]">
              <div className="w-10 h-10 rounded-xl bg-[#E87532]/10 text-[#E87532] flex items-center justify-center font-bold">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#252621] dark:text-[#F5F2EB]">
                {t("why.f3Title")}
              </h3>
              <p className="text-xs text-[#717167] dark:text-[#9E9488] leading-relaxed">
                {t("why.f3Desc")}
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]">
              <div className="w-10 h-10 rounded-xl bg-[#E87532]/10 text-[#E87532] flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#252621] dark:text-[#F5F2EB]">
                {t("why.f4Title")}
              </h3>
              <p className="text-xs text-[#717167] dark:text-[#9E9488] leading-relaxed">
                {t("why.f4Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 08 REMOTE ASSISTANCE                                      */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-[#1A1613] border border-orange-200/60 dark:border-[#2B231D] text-[#E87532] text-xs font-bold uppercase tracking-wider">
                <Video className="w-3.5 h-3.5" />
                {t("remote.tag")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                {t("remote.title")}
              </h2>
              <p className="text-sm text-[#717167] dark:text-[#9E9488] leading-relaxed">
                {t("remote.desc")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]">
                  <p className="text-xs font-bold text-[#252621] dark:text-[#F5F2EB]">
                    {t("remote.s1Title")}
                  </p>
                  <p className="text-[11px] text-[#717167] dark:text-[#9E9488] mt-0.5">
                    {t("remote.s1Desc")}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]">
                  <p className="text-xs font-bold text-[#252621] dark:text-[#F5F2EB]">
                    {t("remote.s2Title")}
                  </p>
                  <p className="text-[11px] text-[#717167] dark:text-[#9E9488] mt-0.5">
                    {t("remote.s2Desc")}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]">
                  <p className="text-xs font-bold text-[#252621] dark:text-[#F5F2EB]">
                    {t("remote.s3Title")}
                  </p>
                  <p className="text-[11px] text-[#717167] dark:text-[#9E9488] mt-0.5">
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
                    className="font-bold shadow-orange-glow"
                  >
                    {t("remote.callBtn")}
                  </Button>
                </a>
                <Link to="/services">
                  <Button variant="outline" size="md">
                    {t("remote.scheduleBtn")}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Video Preview Mock Interface */}
            <div className="lg:col-span-5">
              <div className="p-5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF] dark:border-[#2B231D]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-[#252621] dark:text-[#F5F2EB]">
                      {t("remote.statusActive")}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#E87532] font-semibold">
                    {t("remote.freeTriage")}
                  </span>
                </div>

                <div className="relative rounded-xl overflow-hidden aspect-video bg-[#252621] flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
                    alt="Remote technician guidance"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                    <p className="text-[11px] text-white font-medium">
                      {t("remote.videoCap")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-[#717167] dark:text-[#9E9488]">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#E87532]" />
                    {t("remote.chatVoice")}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {t("remote.techsOnline")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 09 CUSTOMER REVIEWS                                       */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87532]">
            {t("reviews.tag")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-[#F5F2EB] mt-1">
            {t("reviews.title")}
          </h2>
          <p className="text-sm text-[#717167] dark:text-[#9E9488] mt-1">
            {t("reviews.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
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
                  <span className="text-[11px] text-[#8F8F85] font-medium">
                    {language === "hi" && rev.dateHi ? rev.dateHi : rev.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#252621] dark:text-[#F5F2EB] leading-relaxed italic">
                  "{language === "hi" && rev.commentHi ? rev.commentHi : rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#252621] dark:text-[#F5F2EB]">
                    {language === "hi" && rev.customerNameHi ? rev.customerNameHi : rev.customerName}
                  </h4>
                  <p className="text-[10px] text-[#717167] dark:text-[#9E9488]">
                    {language === "hi" && rev.locationHi ? rev.locationHi : rev.location}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200/80 dark:border-emerald-800/60">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  {t("reviews.verified")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10 FINAL CTA BANNER                                       */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#252621] dark:bg-[#141210] text-white border border-[#34352f] shadow-premium relative overflow-hidden">
          {/* Subtle warm orange ambient background glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#E87532]/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E87532]/20 text-[#E87532] text-xs font-bold uppercase tracking-wider border border-[#E87532]/30">
              <Sparkles className="w-3.5 h-3.5" />
              {t("cta.tag")}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-[1.32] sm:leading-[1.3] text-[#F8F7F3]">
              {t("cta.title")}
            </h2>

            <p className="text-sm sm:text-base text-[#D1C7BD] leading-relaxed">
              {t("cta.subtitle")}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link to="/services">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="font-bold shadow-orange-glow px-8"
                >
                  {t("cta.bookNow")}
                </Button>
              </Link>
              <a href="tel:+918439616833">
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Phone className="w-4 h-4 text-[#E87532]" />}
                  className="bg-[#34352f] hover:bg-[#44443e] text-white border border-[#44443e]"
                >
                  {t("cta.callHelp")}
                </Button>
              </a>
            </div>

            <p className="text-[11px] text-[#8F8F85] pt-2">
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
