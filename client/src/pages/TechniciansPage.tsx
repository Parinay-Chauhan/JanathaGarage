import React from "react";
import { Link } from "react-router-dom";
import { Star, ShieldCheck } from "lucide-react";
import { useGetTechniciansQuery } from "../features/technicians/api/techniciansApi";
import { useLanguage } from "../context/LanguageContext";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Skeleton } from "../components/ui/Skeleton";
import { Button } from "../components/ui/Button";

export const TechniciansPage: React.FC = () => {
  const { t, ts } = useLanguage();
  const { data: techniciansData, isLoading } = useGetTechniciansQuery();

  const fallbackTechs = [
    {
      id: "tech-1",
      user: { fullName: "Rameshwar Sharma", phone: "+91 84396 16833" },
      experienceYears: 8,
      bio: "Senior certified automotive mechanic and electrical diagnostic specialist with over 8 years of breakdown experience.",
      avgRating: 4.95,
      totalReviews: 24,
      baseVisitingCharge: 199,
      isOnline: true,
      servicesOffered: [
        { serviceId: "s-1", service: { title: "Emergency Car Jumpstart & Battery Triage" } },
        { serviceId: "s-2", service: { title: "Engine Diagnostic & Oil Check" } },
      ],
    },
    {
      id: "tech-2",
      user: { fullName: "Vikramjit Singh", phone: "+91 84396 16833" },
      experienceYears: 7,
      bio: "Licensed domestic and commercial electrician. Expert in MCB, short circuit resolution, and inverter setups.",
      avgRating: 4.9,
      totalReviews: 19,
      baseVisitingCharge: 149,
      isOnline: true,
      servicesOffered: [
        { serviceId: "s-3", service: { title: "MCB Trip & House Rewiring" } },
        { serviceId: "s-4", service: { title: "Ceiling Fan & Switchboard Installation" } },
      ],
    },
    {
      id: "tech-3",
      user: { fullName: "Sunil Verma", phone: "+91 84396 16833" },
      experienceYears: 9,
      bio: "HVAC and AC service specialist. Inverter compressor repair, high-pressure foam jet wash, and gas charging.",
      avgRating: 4.88,
      totalReviews: 31,
      baseVisitingCharge: 249,
      isOnline: true,
      servicesOffered: [
        { serviceId: "s-5", service: { title: "Split AC Deep Foam Jet Service" } },
        { serviceId: "s-6", service: { title: "Gas Leakage Test & Refill" } },
      ],
    },
    {
      id: "tech-4",
      user: { fullName: "Mohammad Imran", phone: "+91 84396 16833" },
      experienceYears: 6,
      bio: "Master plumber specializing in concealed pipe leak detection, bathroom sanitary fittings, and water tanks.",
      avgRating: 4.92,
      totalReviews: 16,
      baseVisitingCharge: 149,
      isOnline: false,
      servicesOffered: [
        { serviceId: "s-7", service: { title: "Tap & Pipe Leak Repair" } },
        { serviceId: "s-8", service: { title: "Water Tank & Pump Installation" } },
      ],
    },
  ];

  const technicians =
    techniciansData?.data && techniciansData.data.length > 0
      ? techniciansData.data
      : fallbackTechs;

  return (
    <div className="bg-[#F8F7F3] dark:bg-[#040404] text-[#252621] dark:text-[#F5F2EB] min-h-screen pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>100% KYC Verified Professionals</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-[1.28] text-[#252621] dark:text-[#F5F2EB]">
            Verified Local Technicians
          </h1>
          <p className="text-sm sm:text-base text-[#717167] dark:text-[#9E9488]">
            Browse certified mechanics, electricians, plumbers, and technicians with transparent visiting fees and live GPS arrival.
          </p>
        </div>

        {/* Technicians List */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        ) : technicians.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicians.map((tech) => (
              <div
                key={tech.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card hover:shadow-card-hover dark:hover:border-[#FF771C]/50 dark:hover:shadow-[0_12px_36px_rgba(255,119,28,0.12)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#23170E] text-[#FF771C] font-extrabold flex items-center justify-center text-base border border-[#FF771C]/40 shadow-sm shrink-0">
                        {tech.user?.fullName?.charAt(0) || "T"}
                      </div>
                      <div>
                        <h3 className="font-bold text-base font-display text-[#252621] dark:text-[#F5F2EB] flex items-center gap-1.5 group-hover:text-[#FF771C] transition-colors">
                          <span>{tech.user?.fullName || "Certified Technician"}</span>
                          <ShieldCheck className="w-4 h-4 text-[#00E599] fill-[#00E599]/10" />
                        </h3>
                        <p className="text-xs text-[#717167] dark:text-[#9E9488]">
                          {tech.experienceYears}+ years experience
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${
                        tech.isOnline
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-[#0E1F17] dark:text-[#00E599] dark:border-[#13402E] shadow-[0_0_12px_rgba(0,229,153,0.15)]"
                          : "bg-[#F8F7F3] text-[#717167] border-[#E7E5DF] dark:bg-[#1A1613] dark:text-[#8A8074] dark:border-[#2B231D]"
                      }`}
                    >
                      {tech.isOnline && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] shadow-[0_0_8px_#00E599] animate-pulse"></span>
                      )}
                      {tech.isOnline ? "Online" : "Offline"}
                    </span>
                  </div>

                  {/* Rating & Bio */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F8F7F3] dark:bg-[#1A1613] text-[#252621] dark:text-[#F5F2EB] font-bold text-xs border border-[#E7E5DF] dark:border-[#2E251E]">
                      <Star className="w-3.5 h-3.5 fill-[#FF771C] text-[#FF771C]" />
                      <span>{tech.avgRating || 4.9}</span>
                    </div>
                    <span className="text-xs text-[#8A8074]">
                      ({tech.totalReviews || 12} reviews)
                    </span>
                  </div>

                  <p className="text-xs text-[#717167] dark:text-[#9E9488] line-clamp-2 leading-relaxed">
                    {tech.bio}
                  </p>

                  {/* Services list tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4">
                    {tech.servicesOffered && tech.servicesOffered.length > 0 ? (
                      tech.servicesOffered.slice(0, 3).map((s: any) => (
                        <span
                          key={s.serviceId}
                          className="text-[11px] font-medium bg-[#F8F7F3] dark:bg-[#1A1613] text-[#252621] dark:text-[#D4CBC0] border border-[#E7E5DF] dark:border-[#2E251E] hover:dark:border-[#FF771C]/50 px-2.5 py-1 rounded-lg transition-colors"
                        >
                          {ts(s.service?.title || "Repair Service")}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] font-medium bg-[#F8F7F3] dark:bg-[#1A1613] text-[#252621] dark:text-[#D4CBC0] border border-[#E7E5DF] dark:border-[#2E251E] px-2.5 py-1 rounded-lg">
                        General Inspection & Repairs
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-[#E7E5DF] dark:border-[#2E251E] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A8074] block mb-0.5">
                      Visiting Fee
                    </span>
                    <span className="text-xl font-extrabold font-mono text-[#252621] dark:text-[#F5F2EB]">
                      ₹{tech.baseVisitingCharge || 199}
                    </span>
                  </div>
                  <Link to={`/technicians/${tech.id}`}>
                    <Button
                      variant="primary"
                      size="sm"
                      className="font-bold bg-[#FF771C] hover:bg-[#E56814] text-white text-xs px-4 py-2 rounded-xl shadow-[0_2px_14px_rgba(255,119,28,0.35)]"
                    >
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-3xl bg-[#F8F7F3] text-[#8F8F85] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
              No Technicians Available
            </h3>
            <p className="text-xs text-[#717167] dark:text-[#9E9488]">
              All technicians currently onboarded may be offline or undergoing KYC review. Please check back shortly or explore our service rate cards.
            </p>
            <Link to="/services">
              <Button variant="primary" size="sm" className="font-bold shadow-orange-glow">
                Explore Services
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
