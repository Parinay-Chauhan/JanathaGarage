import React from "react";
import { ShieldCheck, HeartHandshake, Zap, Target } from "lucide-react";
import { Card } from "../components/ui/Card";

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
          The JantaGaraj Mission
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-stone-900 dark:text-[#FDF6EE]">
          Reinventing Vehicle Repair For Every Indian Citizen
        </h1>
        <p className="text-stone-600 dark:text-[#A89C90] text-sm sm:text-base leading-relaxed">
          Built to empower local skilled mechanics with digital discovery and to protect vehicle owners from opaque workshop pricing and sudden highway breakdowns.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-y-3 border-stone-200/80 dark:border-[#261E18]">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-display text-stone-900 dark:text-[#FDF6EE]">
            100% KYC Verified
          </h3>
          <p className="text-xs text-stone-500 dark:text-[#9E938A] leading-relaxed">
            Every technician is verified with government documents (Aadhaar/DL) and police background clearance to ensure customer security at home.
          </p>
        </Card>

        <Card className="space-y-3 border-stone-200/80 dark:border-[#261E18]">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-display text-stone-900 dark:text-[#FDF6EE]">
            30-Min Rapid Response
          </h3>
          <p className="text-xs text-stone-500 dark:text-[#9E938A] leading-relaxed">
            Smart geographic dispatch routes your request to the closest online mechanic equipped with tools and emergency spare parts.
          </p>
        </Card>

        <Card className="space-y-3 border-stone-200/80 dark:border-[#261E18]">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-display text-stone-900 dark:text-[#FDF6EE]">
            Zero Hidden Costs
          </h3>
          <p className="text-xs text-stone-500 dark:text-[#9E938A] leading-relaxed">
            Transparent rate cards before job start. Secure start OTP ensures mechanics only charge for work verified and authorized by you.
          </p>
        </Card>
      </div>

      {/* Vision Statement */}
      <div className="p-8 sm:p-12 rounded-3xl bg-brand-500 text-white shadow-glow space-y-4 text-center max-w-3xl mx-auto">
        <Target className="w-10 h-10 mx-auto" />
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
          Our Vision for 2026 and Beyond
        </h2>
        <p className="text-brand-100 text-sm leading-relaxed">
          To become India’s largest, most dependable decentralized network of certified auto mechanics, serving 500+ cities with emergency highway coverage and seamless digital repair management.
        </p>
      </div>
    </div>
  );
};
