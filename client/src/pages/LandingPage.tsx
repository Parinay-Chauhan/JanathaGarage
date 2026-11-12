import React, { useRef, useState, useMemo } from "react";
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
  Car,
  Bike,
  ShieldAlert,
  Sliders,
  Check,
  Disc,
  Fuel,
  Compass,
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
  const isHi = language === "hi";
  const { location, detectCurrentLocation, isLoadingGPS } = useLocation();

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Interactive Quick Vehicle-Select & Booking Bar States
  const [vehicleType, setVehicleType] = useState<"car" | "bike">("car");
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>("general");
  const [activeTelemetryStage, setActiveTelemetryStage] = useState<number>(2);

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
          delay: 0.15,
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

  // Pre-configured service options for the Hero Quick-Booking Bar
  const vehicleServiceOptions = useMemo(() => {
    if (vehicleType === "car") {
      return [
        {
          id: "general",
          name: isHi ? "जनरल सर्विस व इंस्पेक्शन" : "Periodic Service & Oil Flush",
          price: "₹899",
          duration: "60 mins",
          desc: isHi ? "इंजन ऑयल, फिल्टर, ब्रेक इंस्पेक्शन व 30-पॉइंट चेक" : "Synthetic lube, oil filter, coolant top-up & 30-pt safety check",
        },
        {
          id: "battery",
          name: isHi ? "इमरजेंसी बैटरी जंपस्टार्ट" : "Emergency Battery Jumpstart",
          price: "₹349",
          duration: "25 mins",
          desc: isHi ? "डोरस्टेप बूस्टर केबल, टर्मिनल क्लीनिंग व अल्टरनेटर डायग्नोसिस" : "Heavy-duty booster cables & alternator diode test",
        },
        {
          id: "diagnostics",
          name: isHi ? "OBD-II कंप्यूटर स्कैन व चेक इंजन" : "OBD-II Engine Diagnostics",
          price: "₹499",
          duration: "35 mins",
          desc: isHi ? "सेंसर एरर कोड रीडिंग, ईसीयू लाइव टेलीमेट्री व फॉल्ट रिसेट" : "Live CAN-bus sensor telemetry & ECM fault clear",
        },
        {
          id: "brakes",
          name: isHi ? "ब्रेक पैड व डिस्क सर्विस" : "Brake Overhaul & Fluid Bleed",
          price: "₹599",
          duration: "45 mins",
          desc: isHi ? "डिस्क पैड क्लीनिंग, कैलिपर ग्रीसिंग व हाइड्रोलिक एयर ब्लीड" : "Pad resurfacing, caliper slide pin lube & DOT4 bleed",
        },
        {
          id: "ac",
          name: isHi ? "कार एसी कूलिंग व गैस चार्ज" : "Car AC Foam Jet & Gas Refill",
          price: "₹799",
          duration: "50 mins",
          desc: isHi ? "कंडेनसर डीप फोम वॉश, केबिन फिल्टर क्लीनिंग व R134a गैस" : "Condenser foam flush, cabin filter & R134a refrigerant",
        },
        {
          id: "denting",
          name: isHi ? "डेंटिंग, स्क्रैच व पैनल पेंटिंग" : "Paintless Dent & Scratch Buffing",
          price: "₹699",
          duration: "60 mins",
          desc: isHi ? "पेंटलेस डेंट रिमूवल (PDR), रबिंग व हाई-ग्लॉस बफिंग" : "PDR vacuum extraction, 3M compound rubbing & gloss seal",
        },
      ];
    } else {
      return [
        {
          id: "bike-tuneup",
          name: isHi ? "बाइक फुल सर्विस व ट्यून-अप" : "Full Bike Service & Tune-Up",
          price: "₹349",
          duration: "45 mins",
          desc: isHi ? "इंजन ऑयल चेंज, स्पार्क प्लग क्लीन, कार्ब क्लीन व चेन ल्यूब" : "Engine lube, spark plug clean, carb flush & chain adjust",
        },
        {
          id: "bike-chain",
          name: isHi ? "चेन स्प्रोकेट व ड्राइव ल्यूब" : "Chain Sprocket Clean & Lube",
          price: "₹199",
          duration: "20 mins",
          desc: isHi ? "हाई-प्रेशर चेन डिग्रेसिंग, टेंशन एडजस्टमेंट व ल्यूब" : "High-pressure kerosene degrease, slack calibrate & Motul lube",
        },
        {
          id: "bike-breakdown",
          name: isHi ? "ऑन-रोड स्टार्ट ट्रबल व पंचर" : "Roadside Breakdown Triage",
          price: "₹249",
          duration: "25 mins",
          desc: isHi ? "ऑन-स्पॉट स्पार्क/फ्यूल लाइन डायग्नोसिस व इमरजेंसी स्टार्ट" : "On-spot electrical/fuel diagnostics & jumpstart",
        },
        {
          id: "bike-brakes",
          name: isHi ? "डिस्क/ड्रम ब्रेक सर्विस" : "Disc & Drum Brake Calibration",
          price: "₹229",
          duration: "30 mins",
          desc: isHi ? "ब्रेक शू क्लीनिंग, वायर ल्यूब व डिस्क पैड रिप्लेसमेंट" : "Shoe cleaning, wire tensioning & master cylinder flush",
        },
        {
          id: "bike-electrical",
          name: isHi ? "बैटरी, वायरिंग व हॉर्न/लाइट्स" : "Battery & Electrical Diagnostic",
          price: "₹199",
          duration: "25 mins",
          desc: isHi ? "बैटरी वोल्टेज टेस्ट, स्विच रिपेयर व वायरिंग फॉल्ट चेक" : "Terminal voltage test, regulator check & short-circuit fix",
        },
      ];
    }
  }, [vehicleType, isHi]);

  const activeSelectedService =
    vehicleServiceOptions.find((s) => s.id === selectedServiceSlug) || vehicleServiceOptions[0];

  const handleHeroInstantEstimate = () => {
    // Navigate to services page with preselected filters
    navigate(
      `/services?vehicle=${vehicleType}&service=${encodeURIComponent(activeSelectedService.name)}`
    );
  };

  // 12 Structured Automotive & Home Engineering Service Categories
  const popularCategories = [
    {
      id: "mechanic",
      name: "Auto & Garage Repair",
      nameHi: "ऑटो व गैराज रिपेयर",
      badge: "ENGINE DIAGNOSTICS",
      desc: "Doorstep breakdown triage, battery jumpstart, brake service, clutch & lube",
      descHi: "डोरस्टेप कार/बाइक ब्रेकडाउन, बैटरी जंपस्टार्ट, ब्रेक व ल्यूब",
      icon: AutoGarageTradeIcon,
      startingPrice: "₹299",
      expertsCount: "64+ Pros",
      expertsCountHi: "64+ विशेषज्ञ",
      accentGlow: "group-hover:border-amber-500/40",
      iconColor: "text-amber-400",
    },
    {
      id: "electrician",
      name: "Electrical Engineering",
      nameHi: "इलेक्ट्रीशियन",
      badge: "CIRCUIT SAFE",
      desc: "Wiring overhaul, switchboard, fuse, MCB short-circuit triage & heavy inverter lines",
      descHi: "वायरिंग, स्विचबोर्ड, फ्यूज, एमसीबी व इनवर्टर रिपेयर",
      icon: ElectricianTradeIcon,
      startingPrice: "₹199",
      expertsCount: "42+ Pros",
      expertsCountHi: "42+ विशेषज्ञ",
      accentGlow: "group-hover:border-amber-500/40",
      iconColor: "text-amber-400",
    },
    {
      id: "plumbing",
      name: "Plumbing & Hydraulics",
      nameHi: "प्लंबिंग",
      badge: "ACOUSTIC TESTED",
      desc: "Concealed leak detection, high-pressure lines, mixer taps, booster tanks & drains",
      descHi: "लीकेज, पाइप फिटिंग, नल, टंकी व ड्रेन क्लीनिंग",
      icon: PlumbingTradeIcon,
      startingPrice: "₹149",
      expertsCount: "38+ Pros",
      expertsCountHi: "38+ विशेषज्ञ",
      accentGlow: "group-hover:border-cyan-500/40",
      iconColor: "text-cyan-400",
    },
    {
      id: "ac-repair",
      name: "HVAC & AC Service",
      nameHi: "एसी रिपेयर व सर्विस",
      badge: "PRESSURE FOAM JET",
      desc: "Deep foam jet cleaning, eco gas charging (R32/R410A) & compressor PCB diagnosis",
      descHi: "डीप फोम जेट क्लीनिंग, गैस चार्जिंग व कंप्रेसर रिपेयर",
      icon: AcRepairTradeIcon,
      startingPrice: "₹499",
      expertsCount: "56+ Pros",
      expertsCountHi: "56+ विशेषज्ञ",
      accentGlow: "group-hover:border-cyan-500/40",
      iconColor: "text-cyan-400",
    },
    {
      id: "car-denting-painting",
      name: "Car Denting & Painting",
      nameHi: "कार डेंटिंग व पेंटिंग",
      badge: "OEM PAINT MATCH",
      desc: "Paintless dent removal (PDR), scratch buffing, bumper realignment & 2K paint booth",
      descHi: "पेंटलेस डेंट रिमूवल (PDR), स्क्रैच बफिंग, बंपर व पैनल पेंटिंग",
      icon: DentingPaintingTradeIcon,
      startingPrice: "₹699",
      expertsCount: "52+ Pros",
      expertsCountHi: "52+ विशेषज्ञ",
      accentGlow: "group-hover:border-amber-500/40",
      iconColor: "text-amber-400",
    },
    {
      id: "windshield-lights-care",
      name: "Windshield & Glass Care",
      nameHi: "विंडशील्ड व ग्लास केयर",
      badge: "UV-RESIN SEAL",
      desc: "Windshield star crack repair, headlight restoration & power window regulator fix",
      descHi: "विंडशील्ड क्रैक रिपेयर, हेडलाइट डी-ऑक्सीडाइजिंग व पावर विंडो मोटर",
      icon: WindshieldGlassTradeIcon,
      startingPrice: "₹399",
      expertsCount: "31+ Pros",
      expertsCountHi: "31+ विशेषज्ञ",
      accentGlow: "group-hover:border-cyan-500/40",
      iconColor: "text-cyan-400",
    },
    {
      id: "appliance",
      name: "Appliance Diagnostics",
      nameHi: "अप्लायंस रिपेयर",
      badge: "GENUINE PARTS",
      desc: "Front-load washing machine, frost-free fridge, microwave & storage geyser service",
      descHi: "वॉशिंग मशीन, फ्रिज, माइक्रोवेव व गीजर रिपेयर",
      icon: ApplianceRepairTradeIcon,
      startingPrice: "₹249",
      expertsCount: "35+ Pros",
      expertsCountHi: "35+ विशेषज्ञ",
      accentGlow: "group-hover:border-amber-500/40",
      iconColor: "text-amber-400",
    },
    {
      id: "cleaning",
      name: "Deep Machine Cleaning",
      nameHi: "डीप क्लीनिंग",
      badge: "HIGH-PRESSURE",
      desc: "Machine floor scrubbing, kitchen degreasing, bathroom descaling & upholstery shampoo",
      descHi: "फुल होम डीप क्लीन, किचन डीग्रीजिंग व सोफा शैम्पू",
      icon: CleaningTradeIcon,
      startingPrice: "₹399",
      expertsCount: "29+ Pros",
      expertsCountHi: "29+ विशेषज्ञ",
      accentGlow: "group-hover:border-cyan-500/40",
      iconColor: "text-cyan-400",
    },
    {
      id: "painting",
      name: "Painting & Waterproofing",
      nameHi: "पेंटिंग व वॉटरप्रूफिंग",
      badge: "MOISTURE-SEALED",
      desc: "Laser wall moisture audit, dampness proofing, interior emulsion & exterior weather coat",
      descHi: "दीवारों की सीलन रिपेयर, इंटीरियर फ्रेश पेंट, पुट्टी व वॉटरप्रूफिंग",
      icon: PaintingTradeIcon,
      startingPrice: "₹499",
      expertsCount: "34+ Pros",
      expertsCountHi: "34+ विशेषज्ञ",
      accentGlow: "group-hover:border-amber-500/40",
      iconColor: "text-amber-400",
    },
    {
      id: "carpentry",
      name: "Carpentry & Hardware",
      nameHi: "कारपेंट्री व वुडवर्क",
      badge: "PRECISION FITTED",
      desc: "Door lock & hydraulic soft-close hinges, modular cabinet tuning & custom woodwork",
      descHi: "दरवाजे के लॉक व कब्जे, किचन कैबिनेट्स रिपेयर व फर्नीचर पॉलिश",
      icon: CarpentryTradeIcon,
      startingPrice: "₹199",
      expertsCount: "48+ Pros",
      expertsCountHi: "48+ विशेषज्ञ",
      accentGlow: "group-hover:border-amber-500/40",
      iconColor: "text-amber-400",
    },
    {
      id: "cctv-security",
      name: "CCTV & Smart Security",
      nameHi: "सीसीटीवी व स्मार्ट सिक्योरिटी",
      badge: "ENCRYPTED FEED",
      desc: "4K IP CCTV surveillance camera installation, video doorbells & biometric door locks",
      descHi: "HD सीसीटीवी कैमरा फिटिंग, स्मार्ट वीडियो डोरबेल व डिजिटल लॉक सेटअप",
      icon: SecurityCctvTradeIcon,
      startingPrice: "₹499",
      expertsCount: "27+ Pros",
      expertsCountHi: "27+ विशेषज्ञ",
      accentGlow: "group-hover:border-cyan-500/40",
      iconColor: "text-cyan-400",
    },
    {
      id: "ro-water-purifier",
      name: "RO Water Purifier Care",
      nameHi: "आरओ वॉटर प्यूरीफायर सर्विस",
      badge: "TDS CALIBRATED",
      desc: "RO membrane replacement, booster pump pressure check & digital TDS mineral calibration",
      descHi: "आरओ फिल्टर मेंब्रेन रिप्लेसमेंट, सेडिमेंट क्लीनिंग व टीडीएस जांच",
      icon: RoPurifierTradeIcon,
      startingPrice: "₹299",
      expertsCount: "39+ Pros",
      expertsCountHi: "39+ विशेषज्ञ",
      accentGlow: "group-hover:border-cyan-500/40",
      iconColor: "text-cyan-400",
    },
  ];

  // Fallback high-intent services if DB empty
  const fallbackServices: Service[] = [
    {
      id: "fb-1",
      title: "Comprehensive Car Inspection & OBD-II Engine Diagnostics",
      categoryId: "mechanic",
      category: { id: "mechanic", name: "Auto Service", description: "Vehicle care" },
      defaultPrice: 899,
      durationMinutes: 60,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-2",
      title: "Emergency Battery Jumpstart & Alternator Output Triage",
      categoryId: "mechanic",
      category: { id: "mechanic", name: "Auto Service", description: "Vehicle care" },
      defaultPrice: 349,
      durationMinutes: 25,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-3",
      title: "Split AC Deep Foam Jet Service & Gas Leak Pressure Check",
      categoryId: "ac-repair",
      category: { id: "ac-repair", name: "AC Repair", description: "Cooling solutions" },
      defaultPrice: 549,
      durationMinutes: 45,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-4",
      title: "Complete Home Electrical Short Circuit Triage & MCB Box Fix",
      categoryId: "electrician",
      category: { id: "electrician", name: "Electrician", description: "Electrical work" },
      defaultPrice: 249,
      durationMinutes: 35,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-5",
      title: "Concealed Pipe Acoustic Leak Detection & Sanitary Repair",
      categoryId: "plumbing",
      category: { id: "plumbing", name: "Plumbing", description: "Plumbing work" },
      defaultPrice: 199,
      durationMinutes: 40,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "fb-6",
      title: "Paintless Dent Removal (PDR) & Minor Body Scratch Buffing",
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
      bio: "Certified master automotive diagnostics engineer specializing in OBD-II live telemetry, electronic fuel injection (EFI), and precision engine overhauls.",
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
      bio: "Licensed industrial wireman with deep expertise in residential distribution panels, inverter load balancing, and high-voltage circuit fault diagnostics.",
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
      bio: "HVAC cooling engineer specialized in inverter compressor PCB diagnostics, eco gas charging (R32/R410A), and anti-bacterial pressure foam jet servicing.",
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
      bio: "Master plumber specializing in high-pressure plumbing, acoustic concealed leak detection, and automatic water pressure booster pump calibrations.",
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
        "Stranded on the expressway with a completely dead battery. The JantaGaraj mobile technician arrived in 24 minutes, hooked up high-capacity booster cables, and verified the alternator diode output before letting me leave. Transparent rate card, zero roadside bargaining.",
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
        "The MCB kept tripping every time we switched on the geyser. Vikramjit traced the neutral leakage in 15 minutes with a digital multimeter and replaced the damaged isolator socket. Very polite, clean work, and zero mess left behind.",
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
        "The foam jet cleaning was completely mess-free. The technician used a proper waterproof funnel jacket, so not a single drop soiled our painted wall. AC cooling is back to showroom condition. Far better experience than unverified local mechanics.",
      commentHi:
        "फोम जेट क्लीनिंग बिल्कुल साफ-सुथरी रही। तकनीशियन ने वाटरप्रूफ फनल जैकेट का इस्तेमाल किया, जिससे दीवार पर एक बूंद भी नहीं गिरी। एसी की कूलिंग अब एकदम बेहतरीन है। लोकल अनवेरिफाइड मैकेनिकों से कहीं बेहतर अनुभव।",
      verified: true,
    },
  ];

  return (
    <div className="bg-[#0b0f17] text-white min-h-screen selection:bg-amber-500 selection:text-slate-950 pb-20 relative overflow-x-hidden font-sans">
      {/* ========================================================= */}
      {/* 00 ATMOSPHERIC LIGHTING & DEEP INDUSTRIAL CANVAS          */}
      {/* ========================================================= */}
      {/* Warm Garage Overhead Floodlight Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[680px] bg-[radial-gradient(ellipse_80%_45%_at_50%_-10%,rgba(245,158,11,0.08),transparent_70%)] pointer-events-none -z-0" />
      {/* Precision Diagnostic Cyan Glow */}
      <div className="absolute top-72 right-0 w-[520px] h-[520px] bg-[radial-gradient(circle_at_100%_25%,rgba(6,182,212,0.03),transparent_60%)] pointer-events-none -z-0" />
      {/* Architectural Engineering Micro-Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:36px_36px] opacity-40 pointer-events-none -z-0" />

      {/* ========================================================= */}
      {/* 02 HERO SECTION: SPLIT VIEW WITH QUICK VEHICLE-BOOKING BAR */}
      {/* ========================================================= */}
      <section
        ref={heroRef}
        className="relative z-10 pt-10 sm:pt-16 pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Fluid Content & Vehicle Select Booking Bar */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Garage Platform Tag */}
            <div className="hero-anim inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#131b28] border border-white/[0.08] text-slate-300 text-xs font-medium backdrop-blur-sm shadow-sm">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="tracking-wide">
                {isHi ? "ऑन-डिमांड ऑटोमोटिव व डोरस्टेप रिपेयर प्लेटफॉर्म" : "Next-Gen Automotive & Doorstep Engineering"}
              </span>
            </div>

            {/* Fluid Display Heading with Warm Garage Gold Highlights */}
            <h1 className="hero-anim text-3xl sm:text-5xl lg:text-[3.35rem] font-bold text-white tracking-tight leading-[1.14]">
              {isHi ? (
                <>
                  विश्वसनीय मैकेनिक, सीधे आपके दरवाजे पर{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">
                    30 मिनट में
                  </span>
                </>
              ) : (
                <>
                  Precision automotive care, dispatched to your door in{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">
                    &lt; 28 minutes.
                  </span>
                </>
              )}
            </h1>

            {/* Natural Paragraph with Breathing Room */}
            <p className="hero-anim text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-2xl font-normal">
              {isHi
                ? "कार व बाइक ब्रेकडाउन, बैटरी जंपस्टार्ट, इंजन डायग्नोस्टिक्स व एसी रिपेयर। तय मानक रेट कार्ड, 4-अंकीय ओटीपी सुरक्षा और 30 दिन की लिखित वारंटी।"
                : "Certified mobile mechanics equipped with OBD-II diagnostic rigs, battery booster cables, and calibrated toolkits. Pre-published standard rates, zero hidden surcharges, and pay only after satisfaction."}
            </p>

            {/* ========================================================= */}
            {/* INTERACTIVE QUICK VEHICLE-SELECT & INSTANT ESTIMATE BAR   */}
            {/* ========================================================= */}
            <div className="hero-anim p-5 sm:p-6 rounded-3xl bg-[#0e1420]/95 border border-white/[0.08] shadow-2xl backdrop-blur-md space-y-4">
              {/* Step 1 Header: Select Vehicle Type */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHi ? "स्टेप 1: वाहन चुनें" : "Step 1: Select Vehicle"}</span>
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  {vehicleType === "car" ? "4-WHEELER FLEET" : "2-WHEELER FLEET"}
                </span>
              </div>

              {/* Segment Selector Chips (Car vs Bike) */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setVehicleType("car");
                    setSelectedServiceSlug("general");
                  }}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2.5 text-xs font-semibold ${
                    vehicleType === "car"
                      ? "bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-sm"
                      : "bg-[#131b28]/60 border-white/[0.06] text-slate-400 hover:text-white hover:border-white/[0.12]"
                  }`}
                >
                  <Car className="w-4 h-4 text-amber-400" />
                  <span>{isHi ? "4-व्हीलर कार" : "4-Wheeler Car"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setVehicleType("bike");
                    setSelectedServiceSlug("bike-tuneup");
                  }}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2.5 text-xs font-semibold ${
                    vehicleType === "bike"
                      ? "bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-sm"
                      : "bg-[#131b28]/60 border-white/[0.06] text-slate-400 hover:text-white hover:border-white/[0.12]"
                  }`}
                >
                  <Bike className="w-4 h-4 text-amber-400" />
                  <span>{isHi ? "2-व्हीलर बाइक / स्कूटर" : "2-Wheeler Motorcycle / Scooter"}</span>
                </button>
              </div>

              {/* Step 2: Choose Service Issue from Quick Chips */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-[11px] uppercase tracking-wider">
                    {isHi ? "स्टेप 2: आवश्यक सर्विस चुनें" : "Step 2: Choose Service Need"}
                  </span>
                  <span className="text-[11px] text-amber-400/90 font-mono">
                    {activeSelectedService.duration}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {vehicleServiceOptions.map((opt) => {
                    const isSelected = selectedServiceSlug === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedServiceSlug(opt.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "bg-white/[0.08] border-amber-400/60 text-white shadow-sm"
                            : "bg-[#131b28]/50 border-white/[0.05] text-slate-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
                        }`}
                      >
                        <p className="text-xs font-semibold truncate">{opt.name}</p>
                        <p className="text-[11px] font-mono text-amber-400 font-bold mt-0.5">
                          {opt.price}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Dynamic Instant Estimate & Call to Action */}
              <div className="p-3.5 rounded-2xl bg-[#131b28]/80 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{isHi ? "अनुमानित लागत:" : "Estimated Cost:"}</span>
                    <span className="text-lg font-bold font-mono text-amber-400">
                      {activeSelectedService.price}
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                      {isHi ? "विज़िट शुल्क 100% समायोजित" : "100% Fee Offset"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {activeSelectedService.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleHeroInstantEstimate}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
                >
                  <span>{isHi ? "तुरंत एस्टिमेट व बुक करें" : "Instant Estimate & Book"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Location quick check pill */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-white/[0.04]">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>
                    {isHi ? "सर्विस स्थान:" : "Location:"} <strong>{location.city || "NCR Metro"}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => detectCurrentLocation()}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-medium underline underline-offset-4"
                >
                  {isLoadingGPS ? "Detecting..." : t("nav.gpsDetect")}
                </button>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="hero-anim flex flex-wrap items-center gap-3 pt-1">
              <Link to="/services">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 shadow-[0_4px_20px_rgba(245,158,11,0.25)] transition-all hover:scale-[1.02]"
                >
                  {isHi ? "सभी 100+ रेट कार्ड देखें" : "Explore All Rate Cards"}
                </Button>
              </Link>
              <Link to="/technicians">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-[#131b28] hover:bg-[#1a2333] text-slate-200 hover:text-white border border-white/[0.1] font-semibold px-6 py-2.5 rounded-full transition-all"
                >
                  {isHi ? "सत्यापित मैकेनिक खोजें" : "Browse Verified Mechanics"}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Workshop Master Technician HUD Terminal */}
          <div className="lg:col-span-5 relative">
            <div className="hero-anim relative mx-auto max-w-md lg:max-w-none">
              {/* Warm Ambient Glow Behind Card */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-500/15 via-transparent to-cyan-500/10 rounded-3xl blur-xl -z-10" />

              <div className="rounded-3xl bg-[#0e1420] border border-white/[0.08] p-3 overflow-hidden shadow-2xl">
                {/* HUD Header Bar */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] text-xs font-mono text-slate-400 bg-[#0b0f17] rounded-t-2xl">
                  <span className="flex items-center gap-2 text-cyan-400 font-medium">
                    <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>RIG #JG-FLEET-01</span>
                  </span>
                  <span className="text-[11px] text-slate-400">OBD-II LIVE TELEMETRY</span>
                </div>

                {/* Technician Portrait with Warm Studio Lighting */}
                <div className="relative pt-4 flex justify-center bg-gradient-to-b from-[#0e1420] via-[#0b0f17] to-[#080b11] rounded-b-2xl overflow-hidden">
                  <picture>
                    <source srcSet="/images/hero_technician.webp" type="image/webp" />
                    <source srcSet="/images/hero_technician.png" type="image/png" />
                    <img
                      src="/images/hero_technician.webp"
                      alt="JantaGaraj verified master automotive technician"
                      width="896"
                      height="1200"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      className="w-full max-h-[460px] object-contain object-bottom transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </picture>

                  {/* Top Floating Diagnostic Beacon */}
                  <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-[#0e1420]/90 border border-white/[0.1] backdrop-blur-md flex items-center gap-2 shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-[11px] font-mono text-slate-300">
                      GPS Proximity: <strong>1.8 km (14 min)</strong>
                    </span>
                  </div>

                  {/* Floating Diagnostic Verification Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-[#131b28]/95 border border-white/[0.1] backdrop-blur-md flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">Rameshwar Sharma</p>
                        <p className="text-[10px] text-slate-400 font-mono">Master Lead · 9+ Yrs Exp</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full">
                      30-DAY WARRANTY
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 03 TRUST & PROOF BAR: LIVE METRICS LAYOUT                 */}
      {/* ========================================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-5 rounded-2xl bg-[#0e1420]/80 border border-white/[0.06] backdrop-blur-md hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400 group-hover:text-cyan-300 transition-colors">
                500+
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-white">
              {isHi ? "सत्यापित मैकेनिक फ्लीट" : "Verified Fleet Mechanics"}
            </p>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              {isHi ? "100% पुलिस व आधार पृष्ठभूमि जांच" : "100% Police & KYC background cleared"}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e1420]/80 border border-white/[0.06] backdrop-blur-md hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 group-hover:text-amber-300 transition-colors">
                &lt; 28 min
              </span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-white">
              {isHi ? "औसत आगमन प्रतिक्रिया" : "Average Response SLA"}
            </p>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              {isHi ? "अल्गोरिद्मिक जीपीएस प्रॉक्सिमिटी डिस्पैच" : "Rapid algorithmic proximity dispatch"}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e1420]/80 border border-white/[0.06] backdrop-blur-md hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-white group-hover:text-amber-400 transition-colors">
                30-Day
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-white">
              {isHi ? "डोरस्टेप रिपेयर गारंटी" : "Workmanship Guarantee"}
            </p>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              {isHi ? "समान समस्या पर फ्री री-विज़िट लेबर वारंटी" : "Free re-visit labor rework assurance"}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e1420]/80 border border-white/[0.06] backdrop-blur-md hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 group-hover:text-amber-300 transition-colors">
                4.92★
              </span>
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-white">
              {isHi ? "ग्राहक संतुष्टि स्कोर" : "Customer Satisfaction"}
            </p>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              {isHi ? "14,000+ ऑडिटेड डोरस्टेप रिपेयर रेटिंग्स" : "14,200+ audited roadside reviews"}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 04 INTERACTIVE HOW IT WORKS: 3-STEP TIMELINE              */}
      {/* ========================================================= */}
      <section
        id="how-it-works"
        ref={howItWorksRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 scroll-mt-24"
      >
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHi ? "तीन चरणों में सहज सर्विस" : "Intuitive 3-Step Service Protocol"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            {isHi ? "कैसे काम करता है JantaGaraj" : "From Breakdown to Solution in Minutes"}
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-lg mx-auto">
            {isHi
              ? "पारदर्शी प्री-बुकिंग एस्टिमेट, लाइव जीपीएस मैकेनिक ट्रैकिंग और कार्य संतुष्टि के बाद ही भुगतान।"
              : "Zero guesswork. Seamless telemetry dispatch, real-time technician GPS tracking, and payment strictly after satisfaction."}
          </p>
        </div>

        {/* 3-Step Interactive Connected Cards with Animated Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 relative">
          {/* Step 1 */}
          <div
            onClick={() => setActiveTelemetryStage(1)}
            className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
              activeTelemetryStage === 1
                ? "bg-[#131b28] border-amber-400/60 shadow-xl -translate-y-1"
                : "bg-[#0e1420]/80 border-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-extrabold font-mono text-white/[0.15]">
                  01
                </span>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300">
                  {isHi ? "तय दरें" : "60-SEC BOOKING"}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                {isHi ? "1. वाहन व समस्या चुनें" : "1. Select Vehicle & Service"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                {isHi
                  ? "कार या बाइक चुनें, आवश्यक कार्य सेलेक्ट करें और तुरंत स्पष्ट रेट कार्ड देखें। कोई गुप्त चार्ज या मनमाना मोलभाव नहीं।"
                  : "Choose your vehicle model, specify the diagnosed fault, and review upfront rate cards. Zero unquoted hidden fees."}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-amber-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isHi ? "पारदर्शी प्री-एस्टिमेट" : "Pre-Published Rates"}</span>
              </span>
              <span className="text-slate-500 font-semibold">STAGE 01</span>
            </div>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => setActiveTelemetryStage(2)}
            className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
              activeTelemetryStage === 2
                ? "bg-[#131b28] border-cyan-400/60 shadow-xl -translate-y-1"
                : "bg-[#0e1420]/80 border-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-extrabold font-mono text-white/[0.15]">
                  02
                </span>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                  {isHi ? "< 28 मिनट आगमन" : "< 28 MIN DISPATCH"}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                {isHi ? "2. लाइव जीपीएस से मैकेनिक ट्रैक करें" : "2. Live GPS Radar Tracking"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                {isHi
                  ? "निकटतम सत्यापित तकनीशियन टूलकिट व स्पेयर पार्ट्स के साथ निकलता है। मैप पर लाइव लोकेशन देखें और 4-अंकीय ओटीपी से कार्य शुरू कराएं।"
                  : "Nearest certified technician is assigned via proximity radar. Track real-time arrival on map and authorize start via secure 4-digit OTP."}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-cyan-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isHi ? "4-अंकीय सुरक्षित OTP" : "4-Digit OTP Gate"}</span>
              </span>
              <span className="text-slate-500 font-semibold">STAGE 02</span>
            </div>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => setActiveTelemetryStage(3)}
            className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
              activeTelemetryStage === 3
                ? "bg-[#131b28] border-amber-400/60 shadow-xl -translate-y-1"
                : "bg-[#0e1420]/80 border-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-extrabold font-mono text-white/[0.15]">
                  03
                </span>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                  {isHi ? "30 दिन वारंटी" : "POST-SATISFACTION"}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                {isHi ? "3. संतुष्टि के बाद ही भुगतान करें" : "3. Pay Post-Satisfaction & Testing"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                {isHi
                  ? "रिपेयर कार्य पूरा होने और टेस्ट ड्राइव से संतुष्ट होने के बाद ही यूपीआई, कार्ड या नकद से भुगतान करें। 30 दिन की लिखित डिजिटल वारंटी स्लिप प्राप्त करें।"
                  : "Inspect and road-test completed work before payment. Settle via UPI, Card, or Cash and receive an instant 30-day warranty slip."}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-amber-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isHi ? "डिजिटल वारंटी स्लिप" : "30-Day SLA Slip"}</span>
              </span>
              <span className="text-slate-500 font-semibold">STAGE 03</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 05 FEATURED SERVICES GRID: INTERACTIVE SERVICE CARDS      */}
      {/* ========================================================= */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-3">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
              {t("services.topBookedTag")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              {t("services.popularTitle")}
            </h2>
            <p className="text-sm text-slate-400 mt-1.5 max-w-xl leading-relaxed">
              {isHi
                ? "सबसे अधिक बुक की जाने वाली ऑन-डिमांड सेवाएं — तय मानक दरों और 30 दिन की वारंटी के साथ।"
                : "Top booked automotive and home engineering services with fixed rate cards and warranty coverage."}
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 group shrink-0 transition-colors"
          >
            <span>{isHi ? "सभी 100+ सेवाएं देखें" : "View All Services"}</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {servicesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-52 w-full rounded-3xl bg-[#131b28]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedServices.map((service) => (
              <div
                key={service.id}
                className="p-6 rounded-3xl bg-[#0e1420]/80 border border-white/[0.07] hover:border-white/[0.18] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-[0_12px_36px_rgba(0,0,0,0.6)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/25 px-2.5 py-0.5 rounded-full uppercase">
                      {tc(service.category?.name || "Service")}
                    </span>
                    <span className="text-lg font-mono font-bold text-amber-400">
                      ₹{service.defaultPrice}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors">
                    {ts(service.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    {isHi
                      ? "प्रमाणित तकनीशियन द्वारा डोरस्टेप निरीक्षण, मूल कंपोनेंट्स व डिजिटल जीएसटी बिल।"
                      : "Doorstep inspection by certified specialist with genuine OEM spares and warranty slip."}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>
                      {service.durationMinutes || 45} {t("common.mins")}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBookService(service)}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-all shadow-[0_4px_16px_rgba(245,158,11,0.25)] hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                  >
                    <span>{t("common.bookNow")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 06 POPULAR CATEGORIES: INTERACTIVE 12-TRADE SELECTION     */}
      {/* ========================================================= */}
      <section ref={categoriesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-3">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
              {t("categories.exploreTag")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              {t("categories.popularTitle")}
            </h2>
            <p className="text-sm text-slate-400 mt-1.5 max-w-xl leading-relaxed">
              {t("categories.popularSubtitle")}
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 group shrink-0 transition-colors"
          >
            <span>{t("categories.allCategories")}</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Interactive Service Selection Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {popularCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={`/services?category=${cat.id}`}
                className="category-card-anim group"
              >
                <div
                  className={`h-full p-5 sm:p-6 rounded-3xl bg-[#0e1420]/80 hover:bg-[#131b28] border border-white/[0.07] ${cat.accentGlow} hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)]`}
                >
                  <div>
                    {/* Card Top: Trade Icon + Precision Badges */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-11 h-11 rounded-2xl bg-[#080b11] border border-white/[0.08] flex items-center justify-center ${cat.iconColor} shadow-inner group-hover:border-amber-400/40 transition-colors`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/25 px-2.5 py-0.5 rounded-full">
                          {cat.badge}
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/40 border border-amber-500/25 px-2.5 py-0.5 rounded-full">
                          {cat.startingPrice}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
                      {language === "hi" && cat.nameHi ? cat.nameHi : tc(cat.name)}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                      {language === "hi" && cat.descHi ? cat.descHi : cat.desc}
                    </p>
                  </div>

                  {/* Card Footer: Pro Count & Book Trigger */}
                  <div className="pt-4 mt-5 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                    <span className="font-medium text-slate-300">
                      {language === "hi" && cat.expertsCountHi ? cat.expertsCountHi : cat.expertsCount}
                    </span>
                    <span className="text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform font-medium">
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
      {/* 07 TRUSTED TECHNICIANS SHOWCASE                           */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-3">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              {t("techs.tag")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              {t("techs.title")}
            </h2>
            <p className="text-sm text-slate-400 mt-1.5 max-w-xl leading-relaxed">
              {t("techs.subtitle")}
            </p>
          </div>
          <Link
            to="/technicians"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 group shrink-0 transition-colors"
          >
            <span>{t("techs.allTechs")}</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayedTechnicians.map((tech) => (
            <div
              key={tech.id}
              className="p-5 sm:p-6 rounded-3xl bg-[#0e1420]/80 border border-white/[0.07] hover:border-white/[0.18] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 border border-cyan-500/25 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3 text-cyan-400" />
                    {t("techs.verifiedPro")}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono font-semibold text-amber-300 bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-500/25">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{tech.avgRating || 4.9}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 mt-1 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                    {tech.user?.fullName?.charAt(0) || "T"}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors truncate">
                      {tech.user?.fullName || "Certified Technician"}
                    </h3>
                    <p className="text-xs text-amber-400 mt-0.5 truncate font-mono">
                      {language === "hi"
                        ? ((tech as any).specialtyHi || (tech as any).specialty || "ऑटो व होम विशेषज्ञ")
                        : ((tech as any).specialty || "Auto & Home Specialist")}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-3 mt-2 leading-relaxed min-h-[50px]">
                  {language === "hi"
                    ? ((tech as any).bioHi || tech.bio || "त्वरित डायग्नोसिस और प्रामाणिक रिपेयर मानकों के लिए समर्पित पेशेवर तकनीशियन।")
                    : (tech.bio || "Professional technician dedicated to swift diagnostics and genuine repair standards.")}
                </p>

                <div className="mt-3.5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                  <div>
                    <span className="text-slate-500">{t("common.exp")}:</span>{" "}
                    <span className="text-white font-medium">{tech.experienceYears}+ {t("common.years")}</span>
                  </div>
                  <div className="h-3 w-px bg-white/[0.08]" />
                  <div>
                    <span className="text-slate-500">{language === "hi" ? "काम" : "Jobs"}:</span>{" "}
                    <span className="text-white font-medium">{(tech as any).jobsDone || 120}+</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-0.5 font-mono">
                    {t("techs.visitingFee")}
                  </span>
                  <span className="text-base font-bold font-mono text-white">
                    ₹{tech.baseVisitingCharge || 149}
                  </span>
                </div>
                <Link to={`/technicians/${tech.id}`}>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-all shadow-sm whitespace-nowrap"
                  >
                    {t("techs.viewProfile")}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 08 WHY JANTAGARAJ (4 PILLARS)                             */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0e1420] border border-white/[0.08] shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
              {t("why.tag")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t("why.title")}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t("why.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="space-y-2.5 p-6 rounded-2xl bg-[#131b28]/70 border border-white/[0.06]">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                {t("why.f1Title")}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t("why.f1Desc")}
              </p>
            </div>

            <div className="space-y-2.5 p-6 rounded-2xl bg-[#131b28]/70 border border-white/[0.06]">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                {t("why.f2Title")}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t("why.f2Desc")}
              </p>
            </div>

            <div className="space-y-2.5 p-6 rounded-2xl bg-[#131b28]/70 border border-white/[0.06]">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                {t("why.f3Title")}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t("why.f3Desc")}
              </p>
            </div>

            <div className="space-y-2.5 p-6 rounded-2xl bg-[#131b28]/70 border border-white/[0.06]">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                {t("why.f4Title")}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t("why.f4Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 09 REMOTE ASSISTANCE & VIDEO TRIAGE                       */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0e1420] border border-white/[0.08] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold uppercase">
                <Video className="w-3.5 h-3.5 text-cyan-400" />
                {t("remote.tag")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {t("remote.title")}
              </h2>
              <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-xl">
                {t("remote.desc")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-[#131b28]/70 border border-white/[0.06]">
                  <p className="text-xs font-semibold text-white">
                    {t("remote.s1Title")}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {t("remote.s1Desc")}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#131b28]/70 border border-white/[0.06]">
                  <p className="text-xs font-semibold text-white">
                    {t("remote.s2Title")}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {t("remote.s2Desc")}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#131b28]/70 border border-white/[0.06]">
                  <p className="text-xs font-semibold text-white">
                    {t("remote.s3Title")}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {t("remote.s3Desc")}
                  </p>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a href="tel:+918439616833">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs uppercase tracking-wider shadow-md transition-all whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{t("remote.callBtn")}</span>
                  </button>
                </a>
                <Link to="/services">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#131b28] hover:bg-[#1a2333] text-slate-200 hover:text-white border border-white/[0.1] text-xs font-medium transition-all whitespace-nowrap"
                  >
                    <span>{t("remote.scheduleBtn")}</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Video Preview Card */}
            <div className="lg:col-span-5">
              <div className="p-4 rounded-2xl bg-[#080b11] border border-white/[0.08] space-y-3.5 shadow-2xl">
                <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06] text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-semibold text-cyan-400">
                      {t("remote.statusActive")}
                    </span>
                  </div>
                  <span className="text-amber-400 font-medium">
                    {t("remote.freeTriage")}
                  </span>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#0b0f17] flex items-center justify-center border border-white/[0.06]">
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
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/80 to-transparent p-3 text-center">
                    <p className="text-[11px] text-white font-mono">
                      {t("remote.videoCap")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    {t("remote.chatVoice")}
                  </span>
                  <span className="text-cyan-400 font-semibold">
                    {t("remote.techsOnline")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10 AUTHENTIC CUSTOMER REVIEWS                             */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
            {t("reviews.tag")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {t("reviews.title")}
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            {t("reviews.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-[#0e1420]/80 border border-white/[0.07] hover:border-white/[0.15] transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
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

              <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">
                    {language === "hi" && rev.customerNameHi ? rev.customerNameHi : rev.customerName}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {language === "hi" && rev.locationHi ? rev.locationHi : rev.location}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-500/25">
                  <CheckCircle className="w-3 h-3 text-cyan-400" />
                  {t("reviews.verified")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11 FINAL WORKSHOP CALL TO ACTION BANNER                   */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#0e1420] text-white border border-white/[0.08] relative overflow-hidden shadow-2xl">
          {/* Warm Amber Accent Ribbon & Glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-amber-500/10 blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-mono font-semibold uppercase tracking-wider border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHi ? "24/7 ऑन-डिमांड डिस्पैच" : "24/7 On-Demand Roadside & Home Care"}</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-bold leading-tight text-white tracking-tight">
              {isHi
                ? "क्या आपकी कार या बाइक में कोई खराबी है?"
                : "Need roadside triage or periodic doorstep service?"}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-lg mx-auto">
              {isHi
                ? "हमारे 500+ सत्यापित मैकेनिक आधुनिक OBD-II डायग्नोस्टिक टूल्स के साथ 28 मिनट में आपके स्थान पर पहुंचने के लिए तैयार हैं।"
                : "Our network of 500+ verified master technicians is standing by with certified diagnostic equipment, ready to arrive within 28 minutes."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
              <Link to="/services">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                >
                  <span>{isHi ? "अभी सर्विस बुक करें" : "Book a Service Now"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <a href="tel:+918439616833">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#131b28] hover:bg-[#1a2333] text-white border border-white/[0.1] text-xs font-medium transition-all whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>{isHi ? "हेल्पलाइन: +91 84396 16833" : "Call Helpline: +91 84396 16833"}</span>
                </button>
              </a>
            </div>

            <p className="text-[11px] font-mono text-slate-500 pt-2">
              {isHi
                ? "100% संतोष गारंटी • 30-दिन वारंटी • कोई गुप्त शुल्क नहीं"
                : "100% Satisfaction Guarantee • 30-Day Workmanship Warranty • Zero Hidden Fees"}
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
