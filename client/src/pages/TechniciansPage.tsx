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
      user: { fullName: "Vikram Sharma", phone: "+91 98765 00001" },
      experienceYears: 8,
      bio: "8+ years experience as Head Mechanic at Authorized Maruti & Hyundai workshops. Expert in engine diagnostics, brake overhauls, and fast doorstep breakdown resolution.",
      avgRating: 5.0,
      totalReviews: 24,
      baseVisitingCharge: 199,
      isOnline: true,
      servicesOffered: [
        { serviceId: "s-1", service: { title: "Standard Car Engine Oil & Filter Service" } },
        { serviceId: "s-2", service: { title: "Comprehensive 50-Point Car Health Inspection" } },
        { serviceId: "s-3", service: { title: "Complete AC Gas Refill & Cooling Coil Flush" } },
      ],
    },
    {
      id: "tech-2",
      user: { fullName: "Suresh Verma", phone: "+91 98765 00002" },
      experienceYears: 6,
      bio: "Master two-wheeler mechanic with 6 years experience in Royal Enfield, Honda, Yamaha, and KTM tuning. Certified for electrical wiring and high-performance clutch setups.",
      avgRating: 5.0,
      totalReviews: 12,
      baseVisitingCharge: 149,
      isOnline: true,
      servicesOffered: [
        { serviceId: "s-4", service: { title: "Two-Wheeler Full Periodic Tune-Up" } },
        { serviceId: "s-5", service: { title: "Carburetor & Fuel Injector Ultrasonic Clean" } },
        { serviceId: "s-6", service: { title: "Chain Sprocket & Disc Brake Overhaul" } },
      ],
    },
    {
      id: "tech-3",
      user: { fullName: "Rajesh Kumar Verma", phone: "+91 98765 00003" },
      experienceYears: 11,
      bio: "11 years specialized automotive experience. Former senior mechanic at Bosch Car Service. Equipped with digital OBD-II scanning tools, AC recharge kits, and suspension jacks.",
      avgRating: 5.0,
      totalReviews: 18,
      baseVisitingCharge: 249,
      isOnline: true,
      servicesOffered: [
        { serviceId: "s-7", service: { title: "Computerized OBD-II Scanner Diagnostics" } },
        { serviceId: "s-8", service: { title: "Complete AC Gas Refill & Cooling Coil Flush" } },
        { serviceId: "s-9", service: { title: "Suspension Bushing & Strut Replacement" } },
      ],
    },
    {
      id: "tech-4",
      user: { fullName: "Amit Patel", phone: "+91 98765 00004" },
      experienceYears: 5,
      bio: "Fast response emergency breakdown specialist. Covers highway punctures, battery jumpstarts, and coolant leakage issues within 25 minutes of booking.",
      avgRating: 5.0,
      totalReviews: 14,
      baseVisitingCharge: 179,
      isOnline: true,
      servicesOffered: [
        { serviceId: "s-10", service: { title: "Doorstep Tubeless Tyre Puncture Repair" } },
        { serviceId: "s-11", service: { title: "Starter Motor & Alternator Current Check" } },
        { serviceId: "s-12", service: { title: "Emergency Car Jumpstart & Battery Triage" } },
      ],
    },
    {
      id: "tech-5",
      user: { fullName: "Mohammad Imran", phone: "+91 98765 00005" },
      experienceYears: 7,
      bio: "7+ years expertise in residential and commercial plumbing. Concealed leak detection using acoustic meters, sanitary installations, and high-pressure water pump troubleshooting.",
      avgRating: 5.0,
      totalReviews: 16,
      baseVisitingCharge: 149,
      isOnline: true,
      servicesOffered: [
        { serviceId: "s-13", service: { title: "Concealed Pipe Leak Detection & Repair" } },
        { serviceId: "s-14", service: { title: "Bathroom Sanitary Fittings & Mixer Faucet" } },
        { serviceId: "s-15", service: { title: "Water Overhead Tank & Pressure Pump Setup" } },
      ],
    },
    {
      id: "tech-6",
      user: { fullName: "Sunil Kumar Mishra", phone: "+91 98765 00006" },
      experienceYears: 9,
      bio: "HVAC & multi-brand AC specialist with 9 years experience. Inverter PCB board triage, anti-bacterial foam jet cleaning, copper pipe brazing, and R32/R410A gas charging.",
      avgRating: 5.0,
      totalReviews: 21,
      baseVisitingCharge: 249,
      isOnline: true,
      servicesOffered: [
        { serviceId: "s-16", service: { title: "Split AC Deep Foam Jet Service" } },
        { serviceId: "s-17", service: { title: "Inverter PCB Board Repair & Diagnostics" } },
        { serviceId: "s-18", service: { title: "Complete AC Gas Refill & Cooling Coil Flush" } },
      ],
    },
    {
      id: "tech-7",
      user: { fullName: "Rameshwar Singh Yadav", phone: "+91 98765 00007" },
      experienceYears: 10,
      bio: "Senior certified domestic electrician with 10+ years experience in heavy load balancing, 3-phase wiring, MCB tripping triage, inverter battery bank setup, and modular circuits.",
      avgRating: 5.0,
      totalReviews: 19,
      baseVisitingCharge: 179,
      isOnline: true,
      servicesOffered: [
        { serviceId: "s-19", service: { title: "Complete Home Electrical Short Circuit Triage" } },
        { serviceId: "s-20", service: { title: "Inverter & Dual Battery Bank Setup" } },
        { serviceId: "s-21", service: { title: "Ceiling Fan Installation & Regulator Switch Wiring" } },
      ],
    },
    {
      id: "tech-8",
      user: { fullName: "Deepak Chauhan", phone: "+91 98765 00008" },
      experienceYears: 6,
      bio: "Certified Paintless Dent Repair (PDR) & detailing expert. Specialist in German car dent pulling without paint damage, 9H ceramic coating, and doorstep compound buffing.",
      avgRating: 5.0,
      totalReviews: 15,
      baseVisitingCharge: 299,
      isOnline: true,
      servicesOffered: [
        { serviceId: "s-22", service: { title: "Paintless Dent Removal & Minor Scratch Buffing" } },
        { serviceId: "s-23", service: { title: "Ceramic Coating Polish & Hydrophobic Shield" } },
        { serviceId: "s-24", service: { title: "Doorstep Foam Wash & Deep Interior Vacuuming" } },
      ],
    },
    {
      id: "tech-9",
      user: { fullName: "Karan Thapa", phone: "+91 98765 00009" },
      experienceYears: 8,
      bio: "8 years tuning Royal Enfield Himalayan, Classic, KTM Duke, and Japanese commuter bikes. Complete carburetor syncing, disc brake overhaul, and chain sprocket replacements.",
      avgRating: 5.0,
      totalReviews: 17,
      baseVisitingCharge: 159,
      isOnline: true,
      servicesOffered: [
        { serviceId: "s-25", service: { title: "Royal Enfield & Superbike Engine Tuning" } },
        { serviceId: "s-26", service: { title: "Brembo & Bybre Disc Brake System Bleeding" } },
        { serviceId: "s-27", service: { title: "Fork Seal Replacement & Suspension Stiffening" } },
      ],
    },
    {
      id: "tech-10",
      user: { fullName: "Arjun Gupta", phone: "+91 98765 00010" },
      experienceYears: 5,
      bio: "5+ years servicing all major RO water purifiers (Kent, Aquaguard, Pureit). TDS membrane testing, booster pump replacement, and fully automatic washing machine motor repairs.",
      avgRating: 5.0,
      totalReviews: 11,
      baseVisitingCharge: 149,
      isOnline: true,
      servicesOffered: [
        { serviceId: "s-28", service: { title: "Comprehensive RO Service & Multi-Stage Filter Replacement" } },
        { serviceId: "s-29", service: { title: "Water TDS Calibration & Booster Pump Check" } },
        { serviceId: "s-30", service: { title: "Automatic Washing Machine Drum & Motor Repair" } },
      ],
    },
    {
      id: "tech-11",
      user: { fullName: "Pooja Rawat", phone: "+91 98765 00011" },
      experienceYears: 6,
      bio: "Certified smart home security technician with 6 years experience in HD CCTV installation, Cat6 networking, night-vision camera alignment, and smart digital door lock setup.",
      avgRating: 5.0,
      totalReviews: 13,
      baseVisitingCharge: 199,
      isOnline: true,
      servicesOffered: [
        { serviceId: "s-31", service: { title: "Doorstep HD CCTV Camera Installation & Mobile App Config" } },
        { serviceId: "s-32", service: { title: "Smart Video Doorbell & Digital Lock Fitting" } },
        { serviceId: "s-33", service: { title: "Security DVR/NVR Wiring & Mobile App Live Config" } },
      ],
    },
    {
      id: "tech-12",
      user: { fullName: "Harpreet Singh", phone: "+91 98765 00012" },
      experienceYears: 12,
      bio: "12+ years master carpenter and interior woodwork specialist. Heavy-duty hydraulic concealed hinges, mortise locks, sliding wardrobe rollers, and modular kitchen repair.",
      avgRating: 5.0,
      totalReviews: 22,
      baseVisitingCharge: 249,
      isOnline: true,
      servicesOffered: [
        { serviceId: "s-34", service: { title: "Door Lock, Handle & Concealed Hinge Repair" } },
        { serviceId: "s-35", service: { title: "Modular Kitchen Cabinet & Drawer Channel Tuning" } },
        { serviceId: "s-36", service: { title: "Custom Furniture Assembly & Wooden Polish" } },
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
                      <div className="w-10 h-10 flex items-center justify-center bg-transparent border-0 text-[#FF771C] font-black text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
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
