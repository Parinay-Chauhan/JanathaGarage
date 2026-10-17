import React from "react";
import { Link } from "react-router-dom";
import { Star, ShieldCheck } from "lucide-react";
import { useGetTechniciansQuery } from "../features/technicians/api/techniciansApi";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Skeleton } from "../components/ui/Skeleton";
import { Button } from "../components/ui/Button";

export const TechniciansPage: React.FC = () => {
  const { data: techniciansData, isLoading } = useGetTechniciansQuery();

  const technicians = techniciansData?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Government ID Verified</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-stone-900 dark:text-white">
          Certified Mechanics Network
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
          Browse verified automotive technicians available for doorstep and roadside breakdown assistance in your area.
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
            <Card
              key={tech.id}
              hoverable
              className="flex flex-col justify-between border-stone-200/80 dark:border-stone-800"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 font-bold flex items-center justify-center text-lg border border-brand-500/20">
                      {tech.user?.fullName?.charAt(0) || "M"}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg font-display text-stone-900 dark:text-white flex items-center gap-1.5">
                        <span>{tech.user?.fullName || "Certified Mechanic"}</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {tech.experienceYears} Years Auto Experience
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant={tech.isOnline ? "success" : "default"}
                    size="sm"
                  >
                    {tech.isOnline ? "Online" : "Offline"}
                  </Badge>
                </div>

                {/* Rating & Bio */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{tech.avgRating || 4.9}</span>
                  </div>
                  <span className="text-xs text-stone-400">
                    ({tech.totalReviews || 12} reviews)
                  </span>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                  {tech.bio || "Specialized in 2-wheeler and 4-wheeler doorstep repair, engine tuning, electrical diagnostics, and roadside breakdown."}
                </p>

                {/* Services list tags */}
                <div className="flex flex-wrap gap-1.5 pt-4">
                  {tech.servicesOffered && tech.servicesOffered.length > 0 ? (
                    tech.servicesOffered.slice(0, 3).map((s) => (
                      <span
                        key={s.serviceId}
                        className="text-[10px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded-md"
                      >
                        {s.service?.title || "Auto Repair"}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded-md">
                      General Inspection & Repairs
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">
                    Base Visit Fee
                  </span>
                  <span className="text-base font-extrabold font-mono text-stone-900 dark:text-white">
                    ₹{tech.baseVisitingCharge || 199}
                  </span>
                </div>
                <Link to={`/technicians/${tech.id}`}>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        // Demo fallback showcase if database has zero onboarded mechanics initially
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Vikram Singh",
              exp: 8,
              rating: 4.9,
              reviews: 42,
              charge: 199,
              bio: "Expert car mechanic specializing in engine diagnostics, brake replacements, and battery jumpstarts.",
            },
            {
              name: "Mohammad Irfan",
              exp: 6,
              rating: 4.8,
              reviews: 31,
              charge: 149,
              bio: "Specialist two-wheeler technician with 6+ years experience across Honda, Royal Enfield, and TVS.",
            },
            {
              name: "Sunil Verma",
              exp: 10,
              rating: 5.0,
              reviews: 64,
              charge: 249,
              bio: "Master garage technician offering computerized OBD-II scanning, AC servicing, and emergency highway SOS.",
            },
          ].map((demoTech, idx) => (
            <Card key={idx} hoverable className="flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 font-bold flex items-center justify-center text-lg border border-brand-500/20">
                      {demoTech.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg font-display text-stone-900 dark:text-white flex items-center gap-1.5">
                        <span>{demoTech.name}</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {demoTech.exp} Years Auto Experience
                      </p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">
                    Verified
                  </Badge>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{demoTech.rating}</span>
                  </div>
                  <span className="text-xs text-stone-400">
                    ({demoTech.reviews} reviews)
                  </span>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {demoTech.bio}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">
                    Base Visit Fee
                  </span>
                  <span className="text-base font-extrabold font-mono text-stone-900 dark:text-white">
                    ₹{demoTech.charge}
                  </span>
                </div>
                <Link to="/services">
                  <Button variant="primary" size="sm">
                    Book Mechanic
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
