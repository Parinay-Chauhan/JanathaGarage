import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Zap,
  HeartHandshake,
  Target,
  Users,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Award,
  Sparkles,
  Phone,
  Wrench,
} from "lucide-react";
import { Button } from "../components/ui/Button";

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#F8F7F3] dark:bg-[#040404] text-[#252621] dark:text-[#F5F2EB] min-h-screen pb-24 transition-colors">
      {/* ========================================================= */}
      {/* 01 HERO & MISSION STATEMENT                               */}
      {/* ========================================================= */}
      <section className="border-b border-[#E7E5DF] dark:border-[#2B231D] bg-white/60 dark:bg-[#141210]/60 backdrop-blur-sm py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-[#2B231D] text-[#E87532] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The JantaGaraj Mission</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#252621] dark:text-[#F5F2EB] leading-[1.28] sm:leading-[1.2]">
            Rebuilding Trust in Local Home & Automotive Services.
          </h1>

          <p className="text-base sm:text-lg text-[#717167] dark:text-[#9E9488] leading-relaxed max-w-3xl mx-auto">
            JantaGaraj was founded with a singular purpose: to eliminate the opaque pricing,
            distrust, and unpredictability of local repair markets while giving skilled mechanics,
            electricians, and technicians the dignity and consistent livelihood they deserve.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link to="/services">
              <Button variant="primary" size="lg" className="font-bold shadow-orange-glow px-8">
                Explore Our Services
              </Button>
            </Link>
            <Link to="/technician/dashboard">
              <Button variant="outline" size="lg" className="font-bold">
                Join as Technician Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20 sm:space-y-28">
        {/* ========================================================= */}
        {/* 02 THE PROBLEMS WE SOLVE                                   */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E87532]">
              Why We Exist
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
              The Real Challenges in Unorganized Local Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Pain Points */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg font-display text-[#252621] dark:text-[#F5F2EB]">
                    What Customers Face Today
                  </h3>
                  <p className="text-xs text-[#717167] dark:text-[#9E9488]">
                    Uncertainty and lack of accountability
                  </p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#717167] dark:text-[#9E9488]">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong className="text-[#252621] dark:text-[#F5F2EB]">Arbitrary Pricing:</strong> Repair bills fluctuate wildly without any published standard rate card.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong className="text-[#252621] dark:text-[#F5F2EB]">Safety & Identity Concerns:</strong> Unknown workers entering homes without background verification.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong className="text-[#252621] dark:text-[#F5F2EB]">Sudden Highway Stranding:</strong> Vehicles breaking down with no reliable mechanic reachable nearby.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong className="text-[#252621] dark:text-[#F5F2EB]">Zero Post-Job Warranty:</strong> No one takes responsibility if a repaired appliance or part fails 2 days later.
                  </span>
                </li>
              </ul>
            </div>

            {/* Technician Pain Points */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg font-display text-[#252621] dark:text-[#F5F2EB]">
                    What Skilled Technicians Face
                  </h3>
                  <p className="text-xs text-[#717167] dark:text-[#9E9488]">
                    Exploitation and lack of steady direct work
                  </p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#717167] dark:text-[#9E9488]">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>
                    <strong className="text-[#252621] dark:text-[#F5F2EB]">Heavy Middleman Cuts:</strong> Traditional workshops take 50% to 70% of customer charges, leaving mechanics underpaid.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>
                    <strong className="text-[#252621] dark:text-[#F5F2EB]">Inconsistent Daily Income:</strong> Relying on random walk-in customers leads to days without income.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>
                    <strong className="text-[#252621] dark:text-[#F5F2EB]">No Digital Reputation:</strong> Years of honest hard work go unrecognized without online reviews or ratings.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>
                    <strong className="text-[#252621] dark:text-[#F5F2EB]">Delayed Client Payments:</strong> Customers haggling after completion or delaying dues.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 03 HOW JANTAGARAJ BRIDGES THE GAP                          */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E87532]">
              The Platform
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
              How JantaGaraj Solves This
            </h2>
            <p className="text-sm text-[#717167] dark:text-[#9E9488]">
              A decentralized, fair ecosystem connecting demand and skilled supply in under 3 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3 p-5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]">
              <div className="w-10 h-10 rounded-xl bg-[#E87532]/10 text-[#E87532] flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-bold text-base text-[#252621] dark:text-[#F5F2EB]">
                Strict KYC & Trade Tests
              </h4>
              <p className="text-xs text-[#717167] dark:text-[#9E9488] leading-relaxed">
                Govt ID verification, police records check, and skill qualification tests before any technician appears on search.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]">
              <div className="w-10 h-10 rounded-xl bg-[#E87532]/10 text-[#E87532] flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-bold text-base text-[#252621] dark:text-[#F5F2EB]">
                Transparent Rate Cards
              </h4>
              <p className="text-xs text-[#717167] dark:text-[#9E9488] leading-relaxed">
                Standardized pricing upfront. Customers know the exact visiting and job charge before confirming.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]">
              <div className="w-10 h-10 rounded-xl bg-[#E87532]/10 text-[#E87532] flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-bold text-base text-[#252621] dark:text-[#F5F2EB]">
                Secure Start OTP
              </h4>
              <p className="text-xs text-[#717167] dark:text-[#9E9488] leading-relaxed">
                Technicians can only start and log billable work when the customer shares their unique 4-digit verification OTP.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]">
              <div className="w-10 h-10 rounded-xl bg-[#E87532]/10 text-[#E87532] flex items-center justify-center font-bold">
                4
              </div>
              <h4 className="font-bold text-base text-[#252621] dark:text-[#F5F2EB]">
                Fair Direct Earnings
              </h4>
              <p className="text-xs text-[#717167] dark:text-[#9E9488] leading-relaxed">
                Technicians keep their rightful labor earnings with instant UPI payouts, building a verified digital track record.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 04 TRUST, VERIFICATION & TRANSPARENCY                      */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-3">
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
            <h3 className="text-lg font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
              100% Identity Verified
            </h3>
            <p className="text-xs text-[#717167] dark:text-[#9E9488] leading-relaxed">
              Every technician profile shows their actual verification badge, document status, and police clearance details.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-3">
            <Zap className="w-8 h-8 text-[#E87532]" />
            <h3 className="text-lg font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
              30-Minute Rapid Arrival
            </h3>
            <p className="text-xs text-[#717167] dark:text-[#9E9488] leading-relaxed">
              Proximity-based GPS matching dispatches the nearest active professional equipped with tools and emergency supplies.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-3">
            <Award className="w-8 h-8 text-[#E87532]" />
            <h3 className="text-lg font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
              30-Day Free Warranty
            </h3>
            <p className="text-xs text-[#717167] dark:text-[#9E9488] leading-relaxed">
              Any post-service defects are inspected and corrected at zero charge. We back every appointment with full accountability.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 05 TECHNICIAN ONBOARDING CTA BANNER                       */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-14 rounded-3xl bg-[#252621] dark:bg-[#141210] text-white border border-[#34352f] shadow-premium relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#E87532]/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E87532]/20 text-[#E87532] text-xs font-bold uppercase tracking-wider border border-[#E87532]/30">
              <Wrench className="w-3.5 h-3.5" />
              For Mechanics & Technicians
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-[1.3] text-[#F8F7F3]">
              Grow Your Local Repair Business with JantaGaraj
            </h2>

            <p className="text-sm text-[#D1C7BD] leading-relaxed">
              Are you a skilled mechanic, electrician, plumber, or AC technician?
              Join hundreds of verified professionals getting direct customer bookings,
              instant UPI payouts, and complete control over their service schedule.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link to="/technician/dashboard">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="font-bold shadow-orange-glow px-8"
                >
                  Join as Technician Partner
                </Button>
              </Link>
              <a href="tel:+918439616833">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-[#34352f] text-white hover:bg-[#44443e]"
                >
                  Partner Helpline: 84396 16833
                </Button>
              </a>
            </div>

            <p className="text-[11px] text-[#8F8F85]">
              Zero joining fee. Complete KYC online in under 5 minutes.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
