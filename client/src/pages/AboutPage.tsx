import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wrench,
  ShieldCheck,
  Zap,
  Cpu,
  Navigation,
  CheckCircle2,
  ArrowRight,
  Phone,
  Sparkles,
  Clock,
  Activity,
  FileText,
  Droplets,
  Wind,
  Radio,
  Check,
  ChevronRight,
  Shield,
  Layers,
  Settings,
  Car,
  HeartHandshake,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/Button";

export const AboutPage: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === "hi";

  // Interactive Live Telemetry / Tracking Demo State
  const [activeStep, setActiveStep] = useState<number>(3);

  return (
    <div className="bg-[#080b11] text-slate-100 min-h-screen selection:bg-amber-500 selection:text-slate-950 pb-28 font-sans relative overflow-x-hidden">
      {/* ========================================================= */}
      {/* QUIET, PREMIUM LIGHTING & ATMOSPHERE                      */}
      {/* ========================================================= */}
      {/* Soft, diffuse overhead ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[560px] bg-[radial-gradient(ellipse_70%_50%_at_50%_-15%,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none -z-0" />
      {/* Micro-warm amber accent whisper */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[360px] bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(245,158,11,0.035),transparent_65%)] pointer-events-none -z-0" />
      {/* Subtle organic grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none -z-0" />

      {/* ========================================================= */}
      {/* 01 MODERN HERO: OPEN, WELCOMING & CONFIDENT               */}
      {/* ========================================================= */}
      <section className="relative z-10 pt-20 sm:pt-28 pb-16 sm:pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Quiet Brand Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-slate-300 text-xs font-medium backdrop-blur-md shadow-sm mb-6 sm:mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span>
            {isHi ? "जनता गैराज • भरोसेमंद ऑटो-टेक प्लेटफॉर्म" : "The Modern Standard for Automotive Care"}
          </span>
        </div>

        {/* Clean, Human Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12] max-w-4xl mx-auto">
          {isHi ? (
            <>
              सटीक इंजीनियरिंग और <span className="text-slate-400 font-normal">पारदर्शी डोरस्टेप सर्विस</span>
            </>
          ) : (
            <>
              Automotive care,{" "}
              <span className="text-slate-400 font-normal">engineered for certainty.</span>
            </>
          )}
        </h1>

        {/* Fluid, Generous Paragraph */}
        <p className="mt-6 sm:mt-8 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
          {isHi
            ? "जनता गैराज का लक्ष्य पारंपरिक गैराजों की अस्पष्ट दरों और अनवेरिफाइड पार्ट्स को खत्म करना है। हम डिजिटल डायग्नोस्टिक्स, तय रेट कार्ड और प्रमाणित तकनीशियनों के साथ डोरस्टेप सर्विस प्रदान करते हैं।"
            : "Vehicle maintenance shouldn't feel like a gamble. We replace guesswork and opaque estimates with certified master technicians, digital diagnostic telemetry, upfront pricing, and guaranteed OEM parts."}
        </p>

        {/* Action Buttons: Amber used as a tiny, refined accent */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/services">
            <Button
              variant="primary"
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-7 py-3 rounded-full shadow-[0_4px_20px_rgba(245,158,11,0.22)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.32)] flex items-center gap-2 transition-all hover:scale-[1.01]"
            >
              <span>{isHi ? "सर्विस बुक करें" : "Book a Service"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/technicians">
            <Button
              variant="outline"
              size="lg"
              className="bg-white/[0.03] hover:bg-white/[0.07] text-slate-200 border border-white/[0.1] font-medium px-6 py-3 rounded-full transition-colors backdrop-blur-sm"
            >
              {isHi ? "प्रमाणित मैकेनिक देखें" : "View Certified Technicians"}
            </Button>
          </Link>
        </div>

        {/* Elegant Metrics Strip: Quiet numbers, natural spacing */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              &lt; 28 min
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "औसत डोरस्टेप रिस्पॉन्स" : "Average Doorstep Dispatch"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              100% OEM
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "प्रमाणित ओरिजिनल स्पेयर पार्ट्स" : "Serialized Genuine Parts"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              4.92 / 5.0
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "12,000+ सत्यापित समीक्षाएं" : "From 12,000+ Verified Jobs"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              ₹0 Hidden
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "पारदर्शी तय दरें, कोई मोलभाव नहीं" : "Upfront Standardized Pricing"}
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
        {/* ========================================================= */}
        {/* 02 THE MISSION / EDITORIAL STORY                          */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span className="uppercase tracking-wider">
                {isHi ? "हमारा मिशन" : "Why We Built JantaGaraj"}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight">
              {isHi
                ? "सड़क किनारे के अनिश्चित गैराज से विश्वसनीय ऑटो-टेक तक"
                : "Moving from fragmented repair shops to trusted, data-backed maintenance."}
            </h2>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
              {isHi
                ? "पारंपरिक आफ्टरमार्केट गैराज दशकों से नहीं बदले हैं। जब आपकी गाड़ी खराब होती है, तो आपको पता नहीं होता कि कौन काम कर रहा है, क्या पार्ट डाला जा रहा है, और अंतिम बिल कितना आएगा। तकनीशियन भी गैराज मालिकों द्वारा अत्यधिक मार्जिन कटौती के शिकार होते हैं।"
                : "For decades, car owners faced an uncomfortable reality: unpredictable repair quotes, uncertainty over spare part authenticity, and zero warranty once a vehicle leaves the bay. Meanwhile, hardworking mechanics surrendered up to 60% of their billing to middlemen."}
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
              {isHi
                ? "जनता गैराज एक खुला और निष्पक्ष नेटवर्क है। हम हर सर्विस को डिजिटल डायग्नोस्टिक्स, फिक्स्ड रेट कार्ड और सीधे तकनीशियन भुगतान के साथ जोड़ते हैं ताकि दोनों पक्षों को पूरा सम्मान और सुरक्षा मिले।"
                : "JantaGaraj connects vehicle owners directly to audited, vetted field engineers equipped with factory diagnostic tools. We lock pricing before work starts, provide real-time job progress, and back every repair with an unconditional 30-day corporate warranty."}
            </p>

            <div className="pt-2 flex items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{isHi ? "सत्यापित बैकग्राउंड जांच" : "Background Checked"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{isHi ? "30 दिन की लिखित वारंटी" : "30-Day Free Warranty"}</span>
              </div>
            </div>
          </div>

          {/* Comparison Matrix: Sleek Floating Glass Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Old Roadside Way */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">
                {isHi ? "पारंपरिक गैराज" : "Traditional Roadside"}
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>{isHi ? "मनमाने बिल और मोलभाव" : "Arbitrary pricing & surprise fees"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>{isHi ? "नकली या रिफर्बिश पार्ट्स का खतरा" : "Unverified or counterfeit spares"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>{isHi ? "काम के बाद कोई वारंटी नहीं" : "Zero accountability after 24 hours"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>{isHi ? "मैकेनिकों की कमाई में भारी कटौती" : "Middlemen take up to 60% of earnings"}</span>
                </li>
              </ul>
            </div>

            {/* JantaGaraj Standard */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.1] shadow-lg space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider block">
                  {isHi ? "जनता गैराज मानक" : "JantaGaraj Standard"}
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{isHi ? "100% तय डिजिटल रेट कार्ड" : "Upfront, fixed digital rate card"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{isHi ? "बारकोड सीरियल वाले OEM पार्ट्स" : "Serialized genuine OEM spares"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{isHi ? "30 दिन की नि:शुल्क वारंटी" : "30-day comprehensive warranty"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{isHi ? "तकनीशियनों को सीधा और पूरा भुगतान" : "Direct, fair compensation to pros"}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 03 THE 1-2-3 SERVICE PROCESS (Modern & Intuitive)         */}
        {/* ========================================================= */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span className="uppercase tracking-wider">
                {isHi ? "सर्विस प्रक्रिया" : "How It Works"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              {isHi ? "आसान 3-चरणीय डोरस्टेप प्रोटोकॉल" : "A seamless 3-step service experience."}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
              {isHi
                ? "पारदर्शी बुकिंग से लेकर टेस्ट-ड्राइव और डिजिटल वारंटी तक का स्पष्ट रास्ता।"
                : "Designed around clarity, accountability, and effortless peace of mind."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 01 */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-sm group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-slate-400 tracking-wider">
                    STEP 01
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                    <Car className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2.5">
                  {isHi ? "वाहन चुनें व तय रेट देखें" : "Request with Upfront Pricing"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {isHi
                    ? "अपनी कार या बाइक का मॉडल चुनें और आवश्यक सर्विस सिलेक्ट करें। बुकिंग से पहले 100% स्पष्ट रेट कार्ड देखें।"
                    : "Select your vehicle, specify symptoms or maintenance needs, and get an instant, standardized quote with zero hidden surcharges."}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between font-mono">
                <span>{isHi ? "कोई अग्रिम शुल्क नहीं" : "No prepayment needed"}</span>
                <span className="text-slate-500">DIGITAL</span>
              </div>
            </div>

            {/* Step 02 */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-sm group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-slate-400 tracking-wider">
                    STEP 02
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                    <Navigation className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2.5">
                  {isHi ? "रैपिड डिस्पैच व सुरक्षित OTP" : "Rapid Dispatch & Digital Scan"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {isHi
                    ? "नजदीकी प्रमाणित तकनीशियन आवश्यक टूल्स के साथ 30 मिनट में पहुंचता है। काम आपके 4-अंकीय OTP सत्यापन के बाद ही शुरू होता है।"
                    : "A certified technician arrives at your doorstep in under 30 minutes, verifies arrival via your secure OTP gate, and runs a diagnostic baseline scan."}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between font-mono">
                <span>{isHi ? "औसत पहुंच: < 28 मिनट" : "SLA: < 28 mins"}</span>
                <span className="text-slate-500">PROXIMITY</span>
              </div>
            </div>

            {/* Step 03 */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-sm group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-slate-400 tracking-wider">
                    STEP 03
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2.5">
                  {isHi ? "गुणवत्ता जांच व 30 दिन वारंटी" : "Approval & 30-Day Warranty"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {isHi
                    ? "ओरिजिनल OEM पार्ट्स के साथ रिपेयर के बाद टेस्ट-ड्राइव ली जाती है। पूरी संतुष्टि पर डिजिटल पेमेंट करें और वारंटी सक्रिय पाएं।"
                    : "Repairs are executed with genuine OEM parts and calibrated specs. Pay digitally only after test drive satisfaction, with automatic 30-day warranty."}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between font-mono">
                <span>{isHi ? "100% संतुष्टि गारंटी" : "Guaranteed peace of mind"}</span>
                <span className="text-slate-500">PROTECTED</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 04 INTERACTIVE TELEMETRY & QUALITY CONTROL DASHBOARD      */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="uppercase tracking-wider">
                  {isHi ? "लाइव डायग्नोस्टिक तकनीक" : "Live Job Telemetry"}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                {isHi ? "सत्यापित लाइव सर्विस ट्रैकिंग" : "Complete digital transparency on every job."}
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              JOB_ID: JG-8842-NCR • CAN-BUS OBD-II PROTOCOL
            </p>
          </div>

          {/* Sleek Floating Glass Telemetry Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] shadow-2xl backdrop-blur-xl space-y-6">
            {/* Top Job Card Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/[0.06] gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-300 font-mono text-xs">
                    JOB CARD
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    TATA HARRIER 2.0 DIESEL • DL-03-CB-9021
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  Doorstep 40-Point Electronic Diagnostic &amp; Battery Triage
                </h3>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 self-start md:self-auto">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                <span className="text-xs font-mono text-cyan-400">
                  DIAGNOSTIC TEST ACTIVE
                </span>
              </div>
            </div>

            {/* 3-Step Interactive Process Timeline */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>STAGE {activeStep} OF 3</span>
                <span className="text-slate-300">ESTIMATED COMPLETION: 18 MINS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className={`text-left p-4 rounded-2xl border transition-all ${
                    activeStep >= 1
                      ? "bg-white/[0.05] border-white/[0.15] text-white"
                      : "bg-white/[0.01] border-white/[0.05] text-slate-500"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 text-xs font-mono mb-1">
                    <span className="font-semibold text-slate-200">01. RADAR DISPATCHED</span>
                    <span className="text-emerald-400 text-[10px]">DONE</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Proximity matched within 3.2km radius
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className={`text-left p-4 rounded-2xl border transition-all ${
                    activeStep >= 2
                      ? "bg-white/[0.05] border-white/[0.15] text-white"
                      : "bg-white/[0.01] border-white/[0.05] text-slate-500"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 text-xs font-mono mb-1">
                    <span className="font-semibold text-slate-200">02. OBD-II SCAN &amp; OTP</span>
                    <span className="text-emerald-400 text-[10px]">VERIFIED</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Fault codes logged with secure OTP verification
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className={`text-left p-4 rounded-2xl border transition-all ${
                    activeStep >= 3
                      ? "bg-white/[0.06] border-white/[0.2] text-white shadow-sm"
                      : "bg-white/[0.01] border-white/[0.05] text-slate-500"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 text-xs font-mono mb-1">
                    <span className="font-semibold text-slate-100 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                      03. TORQUE &amp; CALIBRATION
                    </span>
                    <span className="text-amber-400 text-[10px]">IN PROGRESS</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    14.2V alternator charge &amp; 30-day warranty logged
                  </p>
                </button>
              </div>
            </div>

            {/* Diagnostic Telemetry Sensor Readouts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase">
                  ECU Code Scan
                </span>
                <p className="text-sm font-mono font-semibold text-white">
                  CODE P0301 (RESOLVED)
                </p>
                <p className="text-xs text-slate-500">
                  Injector timing &amp; coil nominal
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase">
                  Alternator Load
                </span>
                <p className="text-sm font-mono font-semibold text-white">
                  14.2V ACTIVE CHARGE
                </p>
                <p className="text-xs text-slate-500">
                  Battery health at 96% CCA
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase">
                  Torque Calibration
                </span>
                <p className="text-sm font-mono font-semibold text-white">
                  110 N·M SPEC PASSED
                </p>
                <p className="text-xs text-slate-500">
                  Logged via digital torque sensor
                </p>
              </div>
            </div>

            {/* Verified Technician On-Duty Strip */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-200 flex items-center justify-center font-bold text-sm shrink-0">
                  VS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white">
                      Vikramjit Singh
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-[10px] font-mono text-emerald-400 font-medium">
                      VERIFIED PRO
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Master Automotive Diagnostics • 9+ Yrs Exp • 4.95 Rating (280 Jobs)
                  </p>
                </div>
              </div>

              <a
                href="tel:+918439616833"
                className="px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 hover:text-white border border-white/[0.08] text-xs font-medium flex items-center justify-center gap-2 transition-colors self-start sm:self-auto"
              >
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{isHi ? "मैकेनिक से बात करें" : "Contact Technician"}</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 05 CORE ENGINEERING CAPABILITIES (Floating Cards)        */}
        {/* ========================================================= */}
        <section className="space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span className="uppercase tracking-wider">
                  {isHi ? "हमारी क्षमताएं" : "Core Capabilities"}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                {isHi ? "इंजीनियरिंग ग्रेड फील्ड सर्विसेज" : "High-precision doorstep maintenance."}
              </h2>
            </div>
            <Link
              to="/services"
              className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors group shrink-0"
            >
              <span>{isHi ? "सभी 100+ सेवाएं देखें" : "Explore Full Service Catalog"}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15] hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {isHi ? "इंजन व ट्रांसमिशन डायग्नोस्टिक्स" : "Engine & Transmission Diagnostics"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {isHi
                    ? "रीयल-टाइम ईसीयू डेटा एनालिसिस, स्पार्क टाइमिंग जांच, फ्यूल ट्रिम मैपिंग व ट्रांसमिशन फ्लूइड स्थिति।"
                    : "Live ECU sensor stream analysis, ignition timing calibration, fuel trim mapping, and automatic transmission fluid condition audit."}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">OBD-II SCAN</span>
                <span className="text-slate-200 font-medium font-mono">{isHi ? "₹499 से शुरू" : "From ₹499"}</span>
              </div>
            </div>

            {/* Service 2 */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15] hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {isHi ? "इमरजेंसी ब्रेकडाउन व बैटरी जंपस्टार्ट" : "Emergency Battery & Roadside Triage"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {isHi
                    ? "हाई-कैपेसिटी 12V/24V बूस्टर केबल्स, अल्टरनेटर लोड टेस्टिंग, इमरजेंसी हाईवे सपोर्ट व टोइंग समन्वय।"
                    : "High-capacity commercial booster kit, alternator diode voltage test, highway emergency fuel support, and rapid roadside dispatch."}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">&lt; 30 MIN SLA</span>
                <span className="text-slate-200 font-medium font-mono">{isHi ? "₹349 से शुरू" : "From ₹349"}</span>
              </div>
            </div>

            {/* Service 3 */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15] hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {isHi ? "ब्रेक रोटर व हाइड्रॉलिक्स सर्विस" : "Brake Rotor & Hydraulic Overhaul"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {isHi
                    ? "सिरेमिक पैड रिप्लेसमेंट, डायल गेज रोटर रनआउट जांच, कैलिपर सिंथेटिक ग्रीसिंग व DOT-4 प्रेशर ब्लीडिंग।"
                    : "Ceramic pad replacement, dial gauge disc rotor runout assessment, caliper pin synthetic lube, and DOT-4 pressure bleeding."}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">OEM SPEC</span>
                <span className="text-slate-200 font-medium font-mono">{isHi ? "₹599 से शुरू" : "From ₹599"}</span>
              </div>
            </div>

            {/* Service 4 */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15] hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                  <Wind className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {isHi ? "एचवीएसी डीप फोम जेट व गैस चार्ज" : "HVAC Deep Foam Jet & Eco Gas"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {isHi
                    ? "वाहन व घरेलू एसी के लिए प्रेशराइज्ड फोम जेट क्लीनिंग, कॉइल डी-ऑक्सीडाइजिंग व डिजिटल वेट R32/R410A गैस चार्ज।"
                    : "Automotive and residential split AC pressurized foam jet flush, coil de-oxidation, vacuum leak testing, and digital weight eco-gas recharge."}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">ECO-TESTED</span>
                <span className="text-slate-200 font-medium font-mono">{isHi ? "₹549 से शुरू" : "From ₹549"}</span>
              </div>
            </div>

            {/* Service 5 */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15] hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {isHi ? "इलेक्ट्रिकल शॉर्ट-सर्किट व इनवर्टर" : "Electrical Circuits & Inverter Triage"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {isHi
                    ? "मेगर इंसुलेशन टेस्टिंग, फेज लोड बैलेंसिंग, एमसीबी ट्रिपिंग रिपेयर व हैवी एप्लायंस पावर लाइन सेटअप।"
                    : "Megger insulation resistance testing, phase load balancing, MCB distribution triage, and dedicated high-draw inverter wiring."}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">CIRCUIT SAFE</span>
                <span className="text-slate-200 font-medium font-mono">{isHi ? "₹249 से शुरू" : "From ₹249"}</span>
              </div>
            </div>

            {/* Service 6 */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15] hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                  <Droplets className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {isHi ? "कंसील्ड पाइप लीकेज व प्लंबिंग" : "Concealed Leak Detection & Plumbing"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {isHi
                    ? "दीवार तोड़े बिना अल्ट्रासोनिक लीकेज डिटेक्शन, बूस्टर पंप प्रेशर अलाइनमेंट व हाई-फ्लो पाइप फिटिंग।"
                    : "Non-destructive acoustic leak testing, automatic booster pump pressure calibration, and certified sanitary pipeline installations."}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">NON-INVASIVE</span>
                <span className="text-slate-200 font-medium font-mono">{isHi ? "₹199 से शुरू" : "From ₹199"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 06 FOUR PILLARS OF ENGINEERING EXCELLENCE                 */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.07] space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span className="uppercase tracking-wider">
                {isHi ? "हमारे चार सिद्धांत" : "The Four Pillars"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              {isHi ? "गुणवत्ता व पारदर्शिता के चार आधार स्तंभ" : "Built on principles that put owners first."}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <p className="text-xs font-mono text-slate-500">01</p>
              <h4 className="text-base font-semibold text-white">
                {isHi ? "प्रमाणित मास्टर तकनीशियन" : "Vetted Master Engineers"}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {isHi
                  ? "बायोमेट्रिक आधार, पुलिस सत्यापन और कड़े प्रैक्टिकल बेंच टेस्ट के बाद ही तकनीशियन ऑनबोर्ड होते हैं।"
                  : "Every technician passes multi-tier biometric background audits and rigorous hands-on diagnostic bench evaluations."}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono text-slate-500">02</p>
              <h4 className="text-base font-semibold text-white">
                {isHi ? "100% ओरिजिनल OEM स्पेयर" : "Genuine OEM Parts"}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {isHi
                  ? "सभी स्पेयर पार्ट्स सीधे अधिकृत निर्माताओं से बारकोड सीरियल के साथ आते हैं।"
                  : "All replacement components are sourced directly from authorized OEM manufacturers with serialized authenticity codes."}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono text-slate-500">03</p>
              <h4 className="text-base font-semibold text-white">
                {isHi ? "तय डिजिटल रेट कार्ड" : "Zero Price Ambiguity"}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {isHi
                  ? "कोई छुपा हुआ चार्ज या सड़क किनारे का मोलभाव नहीं। जो रेट ऐप में है, वही अंतिम बिल होगा।"
                  : "Pre-published standardized rate cards ensure total price integrity before a technician ever touches your vehicle."}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono text-slate-500">04</p>
              <h4 className="text-base font-semibold text-white">
                {isHi ? "30 दिन की लिखित वारंटी" : "30-Day Guarantee"}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {isHi
                  ? "सर्विस के बाद यदि कोई समस्या आती है, तो बिना किसी अतिरिक्त शुल्क के पुनः जांच और सुधार किया जाता है।"
                  : "If anything isn't running perfectly, we dispatch an inspection engineer to resolve it at ₹0 cost under our corporate warranty."}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 07 TECHNICIAN RECRUITMENT BANNER (Uber / Tesla Partner)    */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-slate-300 text-xs font-medium">
              <Wrench className="w-3.5 h-3.5 text-slate-400" />
              <span>{isHi ? "प्रमाणित तकनीशियन नेटवर्क" : "Partner with JantaGaraj"}</span>
            </span>

            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight">
              {isHi
                ? "अपने हुनर को मिले सही सम्मान और सीधी कमाई"
                : "Built for technicians who take pride in their craft."}
            </h2>

            <p className="text-sm text-slate-400 leading-relaxed font-normal max-w-xl mx-auto">
              {isHi
                ? "क्या आप प्रमाणित मैकेनिक, इलेक्ट्रीशियन, प्लंबर या एसी इंजीनियर हैं? बिना किसी बिचौलिए के सीधे ग्राहकों से जुड़ें और 100% पारदर्शी दैनिक UPI भुगतान पाएं।"
                : "Join over 1,200+ verified professionals earning transparent livelihoods with instant UPI settlements, corporate dispatch, and cutting-edge diagnostic support."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link to="/register?role=TECHNICIAN">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-8 py-3 rounded-full shadow-[0_4px_20px_rgba(245,158,11,0.22)] flex items-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <span>{isHi ? "तकनीशियन के रूप में जुड़ें" : "Apply to Join the Fleet"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="tel:+918439616833">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/[0.03] hover:bg-white/[0.07] text-slate-200 border border-white/[0.1] px-6 py-3 rounded-full transition-colors font-medium text-xs sm:text-sm"
                >
                  {isHi ? "हेल्पलाइन: 84396 16833" : "Partner Support: 84396 16833"}
                </Button>
              </a>
            </div>

            <p className="text-xs text-slate-500 font-mono pt-2">
              {isHi ? "शून्य पंजीकरण शुल्क • 5 मिनट में डिजिटल सत्यापन" : "ZERO REGISTRATION FEES • 5-MINUTE DIGITAL ONBOARDING"}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
