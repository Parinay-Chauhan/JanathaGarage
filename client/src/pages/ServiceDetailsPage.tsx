import React, { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Wrench,
  Clock,
  ShieldCheck,
  Star,
  CheckCircle,
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
} from "lucide-react";
import {
  useGetServiceByIdQuery,
  useGetServicesQuery,
} from "../features/services/api/servicesApi";
import { useGetTechniciansQuery } from "../features/technicians/api/techniciansApi";
import { useLanguage } from "../context/LanguageContext";
import { Service } from "../types/api.types";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";
import { BookingModal } from "../features/bookings/components/BookingModal";

interface ServiceDetailsPageProps {
  onOpenAuthModal?: () => void;
}

export const ServiceDetailsPage: React.FC<ServiceDetailsPageProps> = ({
  onOpenAuthModal,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, tc, ts } = useLanguage();

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
      return serviceByIdData.data;
    }
    if (allServicesData?.data && slug) {
      const found = allServicesData.data.find(
        (s) =>
          s.id === slug ||
          s.title.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
      );
      if (found) return found;
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
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
    };
  }, [serviceByIdData, allServicesData, slug]);

  // Included work items
  const includedWork = [
    "High-pressure jet pump wash for indoor evaporator coil and blower",
    "Outdoor unit condenser fin cleaning and dust blow-out",
    "Leakproof drainage tray inspection and antibacterial flush",
    "Operating refrigerant pressure & compressor load amperage testing",
    "Air filter wash and antimicrobial protective spray",
    "Post-service cooling performance temperature check",
  ];

  const excludedWork = [
    "Major copper piping extension (quoted separately if required)",
    "Compressor replacement or outdoor unit wall bracket remounting",
    "Spare part replacements (capacitors, remote PCBs) charged at standardized rate card",
  ];

  // Specific FAQs for service
  const faqs = [
    {
      q: "How soon can a technician arrive at my location?",
      a: "Our smart dispatch system routes your booking to the nearest available verified technician in your sector. The average arrival time is between 25 to 35 minutes.",
    },
    {
      q: "Is there any hidden visiting or inspection charge?",
      a: "No. The price shown (₹" + service.defaultPrice + ") includes standard service labor and doorstep visit. If additional replacement spare parts are necessary, the technician will present the standard price list for your written approval before proceeding.",
    },
    {
      q: "What guarantee or warranty do I get with this service?",
      a: "Every service booked through JantaGaraj includes a 30-day doorstep workmanship warranty. If you encounter any issue within 30 days, we dispatch a senior inspector free of charge.",
    },
    {
      q: "How can I make the payment?",
      a: "Payment is strictly collected after the work is completed and verified by you. You can pay via UPI (GPay, PhonePe, Paytm), Credit/Debit Card, or Cash.",
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
      date: "4 days ago",
      comment:
        "The jet wash was done with a proper plastic funnel jacket so not a single drop soiled my wallpaper. Cooling has significantly improved. Highly recommended!",
    },
    {
      id: "sr-2",
      name: "Meenakshi K.",
      location: "Dwarka, New Delhi",
      rating: 5,
      date: "1 week ago",
      comment:
        "Very clean and punctual. Arrived in 20 minutes, diagnosed low gas pressure, and explained everything transparently. Paid via UPI directly.",
    },
  ];

  if (srvLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-96 w-full rounded-3xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="lg:col-span-2 h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
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
            <Link to="/services" className="hover:text-[#E87532] transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-[#252621] dark:text-[#F5F2EB] font-semibold truncate max-w-xs">
              {ts(service.title)}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {/* Main Grid: Left Details + Right Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Title, Visual, Included Work, FAQs */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header Area */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E87532] bg-orange-50 dark:bg-[#1A1613] border border-orange-200/60 dark:border-[#2B231D] px-3 py-1 rounded-full">
                  {tc(service.category?.name || "Professional Service")}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  30-Day Doorstep Warranty
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold font-display leading-[1.3] text-[#252621] dark:text-[#F5F2EB]">
                {ts(service.title)}
              </h1>

              {/* Rating & Duration */}
              <div className="flex items-center gap-4 text-xs font-medium text-[#717167] dark:text-[#9E9488] pt-1">
                <div className="flex items-center gap-1 text-[#252621] dark:text-[#F5F2EB] font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{service.rating || 4.9}</span>
                  <span className="text-[#8F8F85] font-normal">
                    ({service.reviewsCount || 184} customer reviews)
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#E87532]" />
                  <span>Estimated {service.durationMinutes || 45} minutes</span>
                </div>
              </div>
            </div>

            {/* Service Banner Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[16/9] bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card">
              <img
                src={
                  service.image ||
                  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80"
                }
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <p className="text-xs sm:text-sm text-white font-medium">
                  Standardized execution using professional diagnostic & cleaning gear
                </p>
              </div>
            </div>

            {/* Description Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-4">
              <h2 className="text-xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                Service Overview
              </h2>
              <p className="text-sm text-[#717167] dark:text-[#9E9488] leading-relaxed">
                {service.description ||
                  "Professional doorstep service provided by verified local technicians. Every booking is backed by genuine spare parts, transparent quotes, and full workmanship warranty."}
              </p>
            </div>

            {/* What's Included & Excluded */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-6">
              <h2 className="text-xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                Scope of Work
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Included */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    What is Included
                  </h3>
                  <ul className="space-y-2.5 text-xs text-[#252621] dark:text-[#F5F2EB]">
                    {includedWork.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Excluded */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#8F8F85] flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    What is Not Included
                  </h3>
                  <ul className="space-y-2.5 text-xs text-[#717167] dark:text-[#9E9488]">
                    {excludedWork.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8F8F85] mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Related Certified Technicians */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                    Available Technicians For This Service
                  </h2>
                  <p className="text-xs text-[#717167] dark:text-[#9E9488] mt-0.5">
                    Verified technicians ready to be dispatched to your location
                  </p>
                </div>
                <Link
                  to="/technicians"
                  className="text-xs font-bold text-[#E87532] hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedTechnicians.map((tech) => (
                  <div
                    key={tech.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-subtle flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-9 h-9 rounded-full bg-[#E87532]/10 text-[#E87532] font-bold text-sm flex items-center justify-center">
                          {tech.user?.fullName?.charAt(0) || "T"}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#252621] dark:text-[#F5F2EB] truncate max-w-[120px]">
                            {tech.user?.fullName || "Verified Pro"}
                          </h4>
                          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                            <ShieldCheck className="w-3 h-3" />
                            KYC Verified
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#717167] dark:text-[#9E9488] pt-1">
                        <div className="flex items-center gap-1 font-bold text-[#252621] dark:text-[#F5F2EB]">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{tech.avgRating || 4.9}</span>
                        </div>
                        <span>{tech.experienceYears}+ yrs exp</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setBookingModalOpen(true)}
                      className="w-full text-xs font-bold"
                    >
                      Book With This Pro
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reviews for Service */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                    Customer Reviews
                  </h2>
                  <p className="text-xs text-[#717167] dark:text-[#9E9488] mt-0.5">
                    Real feedback from verified completed appointments
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5.0 Rating</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] space-y-2.5"
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
                      <span className="text-[10px] text-[#8F8F85]">{rev.date}</span>
                    </div>
                    <p className="text-xs text-[#252621] dark:text-[#F5F2EB] italic leading-relaxed">
                      "{rev.comment}"
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-[#E7E5DF] dark:border-[#2B231D] text-[11px]">
                      <span className="font-bold text-[#252621] dark:text-[#F5F2EB]">
                        {rev.name}
                      </span>
                      <span className="text-[#8F8F85]">{rev.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service FAQs */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-4">
              <h2 className="text-xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                Frequently Asked Questions
              </h2>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-[#E7E5DF] dark:border-[#2B231D] overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-[#252621] dark:text-[#F5F2EB] bg-[#F8F7F3]/60 dark:bg-[#1A1613]/60 hover:bg-[#F8F7F3] transition-colors"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#E87532] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#8F8F85] shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="p-4 text-xs text-[#717167] dark:text-[#9E9488] leading-relaxed bg-white dark:bg-[#141210] border-t border-[#E7E5DF] dark:border-[#2B231D]">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Sticky Pricing & Booking Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-premium space-y-6">
              {/* Pricing breakdown */}
              <div>
                <span className="text-xs uppercase font-bold text-[#8F8F85] block">
                  Transparent Upfront Price
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold font-mono text-[#252621] dark:text-[#F5F2EB]">
                    ₹{service.defaultPrice}
                  </span>
                  <span className="text-xs text-[#717167] dark:text-[#9E9488]">
                    (Incl. GST & Inspection)
                  </span>
                </div>
                <p className="text-[11px] text-[#717167] dark:text-[#9E9488] mt-1">
                  No surprise costs. Pay after job is completed and tested.
                </p>
              </div>

              {/* Booking Highlights */}
              <div className="space-y-3 pt-4 border-t border-[#E7E5DF] dark:border-[#2B231D] text-xs">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-[#252621] dark:text-[#F5F2EB]">
                    Instant dispatch within 30 minutes
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-[#252621] dark:text-[#F5F2EB]">
                    100% verified background-checked technician
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-[#252621] dark:text-[#F5F2EB]">
                    30-day post-service free warranty
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-[#252621] dark:text-[#F5F2EB]">
                    Pay securely via UPI / Cash after completion
                  </span>
                </div>
              </div>

              {/* Main Booking Action */}
              <div className="space-y-2.5 pt-4 border-t border-[#E7E5DF] dark:border-[#2B231D]">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full font-bold shadow-orange-glow text-sm py-3"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Book This Service
                </Button>

                <a
                  href="tel:+918439616833"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#E7E5DF] dark:border-[#2B231D] text-xs font-bold text-[#252621] dark:text-[#F5F2EB] hover:bg-[#F8F7F3] dark:hover:bg-[#1A1613] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#E87532]" />
                  <span>Call Support: +91 84396 16833</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bottom Booking Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#141210]/95 backdrop-blur-md border-t border-[#E7E5DF] dark:border-[#2B231D] p-3.5 lg:hidden flex items-center justify-between shadow-premium">
        <div>
          <span className="text-[10px] text-[#8F8F85] uppercase font-bold block">
            Starting Price
          </span>
          <span className="text-xl font-extrabold font-mono text-[#252621] dark:text-[#F5F2EB]">
            ₹{service.defaultPrice}
          </span>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setBookingModalOpen(true)}
          className="font-bold shadow-orange-glow px-6"
        >
          Book Service
        </Button>
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
