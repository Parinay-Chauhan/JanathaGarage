import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wrench,
  ShieldCheck,
  Zap,
  Cpu,
  Gauge,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Phone,
  Award,
  Sparkles,
  Clock,
  Activity,
  FileText,
  Droplets,
  Wind,
  Radio,
  CheckCircle,
} from "lucide-react";
import { Button } from "../components/ui/Button";

export const AboutPage: React.FC = () => {
  // Interactive Live Telemetry / Tracking Demo State
  const [activeStep, setActiveStep] = useState<number>(3);

  return (
    <div className="bg-[#0b0f17] text-white min-h-screen selection:bg-amber-500 selection:text-slate-950 pb-24">
      {/* Precision Engineering Sub-Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-30 pointer-events-none -z-0" />

      {/* ========================================================= */}
      {/* 01 HERO & MISSION STATEMENT (Industrial-Tech Aesthetic)     */}
      {/* ========================================================= */}
      <section className="relative z-10 border-b border-slate-800/80 bg-[#111827]/70 backdrop-blur-md pt-16 sm:pt-24 pb-16 sm:pb-20 overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Telemetry Status Beacon */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span>FLEET TELEMETRY: ACTIVE • 1,200+ UNITS ON-CALL</span>
          </div>

          {/* Punchy Structured Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display max-w-4xl mx-auto">
            Precision Engineering Meets{" "}
            <span className="text-amber-400 drop-shadow-[0_0_25px_rgba(245,158,11,0.25)]">
              Doorstep Reliability
            </span>
          </h1>

          {/* Silver Slate Description */}
          <p className="text-sm sm:text-base lg:text-lg text-[#9ca3af] leading-relaxed max-w-3xl mx-auto">
            JantaGaraj replaces opaque estimates and unvetted roadside mechanics with a standardized,
            data-driven precision engineering network. Every service is executed by certified field
            engineers using digital diagnostics, genuine OEM parts, and transparent rate cards.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link to="/services">
              <Button
                variant="primary"
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 py-3 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.25)] flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>Explore Verified Services</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/register?role=TECHNICIAN">
              <Button
                variant="outline"
                size="lg"
                className="bg-[#1f2937] hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 hover:border-cyan-400 font-semibold px-6 py-3 rounded-xl transition-all"
              >
                Join Technician Fleet
              </Button>
            </Link>
          </div>

          {/* Industrial Specs Bar */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-[#1f2937]/80 border border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <Navigation className="w-4 h-4 shrink-0" />
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">
                  Response SLA
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-bold font-mono text-white">
                30 Mins
              </p>
              <p className="text-xs text-[#9ca3af]">Proximity GPS Dispatch</p>
            </div>

            <div className="p-4 rounded-xl bg-[#1f2937]/80 border border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">
                  Parts Quality
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-bold font-mono text-white">
                100% OEM
              </p>
              <p className="text-xs text-[#9ca3af]">Serialized & Certified</p>
            </div>

            <div className="p-4 rounded-xl bg-[#1f2937]/80 border border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <Award className="w-4 h-4 shrink-0" />
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">
                  QC Standard
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-bold font-mono text-white">
                4.92 / 5.0
              </p>
              <p className="text-xs text-[#9ca3af]">Audited Customer Score</p>
            </div>

            <div className="p-4 rounded-xl bg-[#1f2937]/80 border border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <FileText className="w-4 h-4 shrink-0" />
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">
                  Transparency
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-bold font-mono text-white">
                ₹0 Hidden
              </p>
              <p className="text-xs text-[#9ca3af]">Standard Rate Cards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Page Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 space-y-20 sm:space-y-24">
        {/* ========================================================= */}
        {/* 02 LIVE TRACKING & TELEMETRY WIDGET (Interactive Showcase) */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-cyan-400">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>Live Telemetry Engine</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
                Real-Time Job Telemetry & Diagnostic Transparency
              </h2>
            </div>
            <p className="text-xs text-[#9ca3af] max-w-xs sm:text-right font-mono">
              JOB_ID: JG-8842-DL • PROTOCOL: V3.2_SECURE
            </p>
          </div>

          {/* High-Contrast Telemetry Dashboard Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#1f2937] border border-slate-800 shadow-xl space-y-6">
            {/* Top Job Card Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase">
                    Vehicle Job Card
                  </span>
                  <span className="text-xs text-[#9ca3af] font-mono">
                    REG: DL-03-CB-9021
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Hyundai Creta 1.5 CRDi • 40-Point Electronic Diagnostic
                </h3>
              </div>

              {/* Status Indicator Pill */}
              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center gap-2 text-xs font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>CALIBRATION IN-PROGRESS</span>
                </div>
              </div>
            </div>

            {/* 3-Step Interactive Process Timeline / Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#9ca3af]">
                <span>WORKFLOW STAGE: {activeStep} / 3</span>
                <span className="text-cyan-400">ESTIMATED COMPLETION: 18 MINS</span>
              </div>

              {/* Connected Progress Track */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className={`text-left p-3.5 rounded-xl border transition-all ${
                    activeStep >= 1
                      ? "bg-cyan-950/30 border-cyan-500/50 text-cyan-300"
                      : "bg-[#111827] border-slate-800 text-slate-500"
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold font-mono mb-1">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>01. RADAR DISPATCHED</span>
                  </div>
                  <p className="text-xs text-[#9ca3af]">
                    Proximity matched • 10:14 AM
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className={`text-left p-3.5 rounded-xl border transition-all ${
                    activeStep >= 2
                      ? "bg-cyan-950/30 border-cyan-500/50 text-cyan-300"
                      : "bg-[#111827] border-slate-800 text-slate-500"
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold font-mono mb-1">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>02. OBD-II SCAN & OTP GATE</span>
                  </div>
                  <p className="text-xs text-[#9ca3af]">
                    Fault code cleared • 10:32 AM
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className={`text-left p-3.5 rounded-xl border transition-all ${
                    activeStep >= 3
                      ? "bg-amber-950/30 border-amber-500/60 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                      : "bg-[#111827] border-slate-800 text-slate-500"
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold font-mono mb-1 text-amber-400">
                    <Activity className="w-4 h-4 animate-spin text-amber-400 shrink-0" />
                    <span>03. TORQUE QC & ROAD TEST</span>
                  </div>
                  <p className="text-xs text-amber-200/70">
                    Active verification stage
                  </p>
                </button>
              </div>
            </div>

            {/* Diagnostic Telemetry Sensor Readouts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#111827] border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-[#9ca3af] uppercase">
                  ECU Code Scan
                </span>
                <p className="text-sm font-mono font-bold text-cyan-400">
                  CODE P0301 (RESOLVED)
                </p>
                <p className="text-[11px] text-[#9ca3af]">
                  Injector timing & coil verified nominal
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111827] border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-[#9ca3af] uppercase">
                  Alternator Load
                </span>
                <p className="text-sm font-mono font-bold text-amber-400">
                  14.2V ACTIVE CHARGE
                </p>
                <p className="text-[11px] text-[#9ca3af]">
                  Battery health at 96% CCA
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111827] border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-[#9ca3af] uppercase">
                  Torque Calibration
                </span>
                <p className="text-sm font-mono font-bold text-white">
                  110 N·M SPEC PASSED
                </p>
                <p className="text-[11px] text-[#9ca3af]">
                  Digital torque wrench logged
                </p>
              </div>
            </div>

            {/* Verified Technician On-Duty Strip */}
            <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold font-mono">
                  VS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">
                      Vikramjit Singh
                    </h4>
                    <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono text-cyan-400 font-bold">
                      VERIFIED PRO
                    </span>
                  </div>
                  <p className="text-xs text-[#9ca3af]">
                    Master Automotive Diagnostics • 9+ Yrs Exp • 4.95 Rating
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="tel:+918439616833"
                  className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Technician</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 03 THE PROBLEMS WE SOLVE (High-Contrast Industrial Matrix) */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              STRUCTURAL COMPARISON
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
              Unorganized Workshops vs. Precision Engineering
            </h2>
            <p className="text-sm text-[#9ca3af]">
              Why traditional local repair markets fail customers and technicians alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional Workshop Failures */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1f2937] border border-rose-900/40 shadow-lg space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-white">
                      Traditional Market Inefficiencies
                    </h3>
                    <p className="text-xs text-rose-400 font-mono">
                      STATUS: UNSTANDARDIZED
                    </p>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#9ca3af]">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Arbitrary Estimates:</strong> Repair
                    bills swing unpredictably without published price formulas or billable hours.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Unvetted Workers:</strong> Random individuals
                    dispatched to homes without police background checks or skill verification.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Exploitation of Mechanics:</strong> Garages
                    pocket up to 65% of customer billing, leaving mechanics under-equipped and underpaid.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Zero Post-Job Warranty:</strong> No one accepts
                    accountability if an replaced part or repaired component breaks within 48 hours.
                  </span>
                </li>
              </ul>
            </div>

            {/* JantaGaraj Precision Standard */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1f2937] border border-cyan-500/30 shadow-lg space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-white">
                      The JantaGaraj Engineering Spec
                    </h3>
                    <p className="text-xs text-cyan-400 font-mono">
                      STATUS: 100% DIGITALLY AUDITED
                    </p>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#9ca3af]">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Audited Rate Cards:</strong> Standardized
                    part and visiting charges published upfront before booking confirmation.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">4-Tier KYC & Skills Testing:</strong> Biometric
                    Aadhaar, clean criminal background check, and bench tests before dispatch.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Fair Direct Compensation:</strong> Field
                    technicians receive 100% of their rightful service rate directly via instant UPI.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">30-Day Free Workmanship Warranty:</strong> Any
                    defects are inspected and corrected at ₹0 charge with corporate accountability.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 04 INTERACTIVE STEPS / 1-2-3 WORKFLOW TIMELINE            */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              OPERATIONAL WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
              The 4-Stage Doorstep Engineering Protocol
            </h2>
            <p className="text-sm text-[#9ca3af]">
              Deterministic, automated, and tamper-proof service execution from dispatch to sign-off.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Step 01 */}
            <div className="p-5 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[11px] font-mono font-bold text-cyan-400">
                  STAGE 01
                </span>
                <Navigation className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="font-bold text-base text-white tracking-tight">
                Radar Telemetry Dispatch
              </h4>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Algorithmic proximity matching dispatches the closest active certified technician equipped with specialized diagnostic tools in under 45 seconds.
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-cyan-400">
                Avg Dispatch: &lt; 45s
              </div>
            </div>

            {/* Step 02 */}
            <div className="p-5 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-[11px] font-mono font-bold text-amber-400">
                  STAGE 02
                </span>
                <Cpu className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="font-bold text-base text-white tracking-tight">
                Doorstep OTP &amp; Scan
              </h4>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Work begins only when the customer provides their secure 4-digit verification OTP. The pro executes a multi-point OBD-II digital scan to establish the baseline.
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-amber-400">
                Zero Ghost Billing
              </div>
            </div>

            {/* Step 03 */}
            <div className="p-5 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-[11px] font-mono font-bold text-amber-400">
                  STAGE 03
                </span>
                <Wrench className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="font-bold text-base text-white tracking-tight">
                OEM Parts Execution
              </h4>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Repairs are carried out using sealed OEM replacement parts with barcode serialization and calibrated torque specifications.
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-amber-400">
                100% Genuine Guarantee
              </div>
            </div>

            {/* Step 04 */}
            <div className="p-5 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[11px] font-mono font-bold text-cyan-400">
                  STAGE 04
                </span>
                <CheckCircle className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="font-bold text-base text-white tracking-tight">
                Quality Check &amp; Warranty
              </h4>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Post-repair road tests and electrical tests logged to the digital job card, followed by electronic invoice generation and 30-day warranty activation.
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-cyan-400">
                30-Day Workmanship Warranty
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 05 SERVICE SELECTION CARDS (Industrial Precision Grid)    */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                CORE CAPABILITIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
                Industrial-Grade Field Engineering Services
              </h2>
            </div>
            <Link
              to="/services"
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
            >
              <span>VIEW FULL SERVICE CATALOG (100+)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Service Card 1 */}
            <div className="p-6 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-300 shadow-md space-y-4 group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-[10px] font-mono font-bold text-amber-400">
                    OBD-II DIAGNOSTIC
                  </span>
                </div>
                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors">
                  Engine &amp; Transmission Diagnostics
                </h3>
                <p className="text-xs text-[#9ca3af] leading-relaxed">
                  Real-time ECU data stream analysis, spark timing evaluation, fuel trim mapping, and transmission fluid condition assessment.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Doorstep Pickup</span>
                <span className="text-amber-400 font-bold">From ₹499</span>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="p-6 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-300 shadow-md space-y-4 group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-400">
                    30-MIN SLA
                  </span>
                </div>
                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-cyan-400 transition-colors">
                  Emergency Roadside &amp; Battery Jumpstart
                </h3>
                <p className="text-xs text-[#9ca3af] leading-relaxed">
                  High-capacity 12V/24V booster jumpstart, alternator load testing, emergency highway fuel delivery, and flatbed recovery triage.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Instant Dispatch</span>
                <span className="text-cyan-400 font-bold">From ₹349</span>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="p-6 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-300 shadow-md space-y-4 group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-[10px] font-mono font-bold text-amber-400">
                    OEM TOLERANCE
                  </span>
                </div>
                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors">
                  Brake Rotor &amp; Hydraulic Overhaul
                </h3>
                <p className="text-xs text-[#9ca3af] leading-relaxed">
                  Ceramic pad replacements, dial gauge disc rotor runout measurement, caliper pin synthetic greasing, and DOT-4 pressure bleeding.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Calibrated Specs</span>
                <span className="text-amber-400 font-bold">From ₹599</span>
              </div>
            </div>

            {/* Service Card 4 */}
            <div className="p-6 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-300 shadow-md space-y-4 group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
                    <Wind className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-400">
                    ECO-TESTED
                  </span>
                </div>
                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-cyan-400 transition-colors">
                  HVAC Deep Foam Jet &amp; Gas Recharge
                </h3>
                <p className="text-xs text-[#9ca3af] leading-relaxed">
                  Automotive and home split AC pressurized foam jet flush, coil deoxidation, vacuum leak test, and digital weight R32/R410A charge.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Full Leak Warranty</span>
                <span className="text-cyan-400 font-bold">From ₹549</span>
              </div>
            </div>

            {/* Service Card 5 */}
            <div className="p-6 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-300 shadow-md space-y-4 group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-[10px] font-mono font-bold text-amber-400">
                    CIRCUIT SAFE
                  </span>
                </div>
                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors">
                  High-Voltage Electrical &amp; Inverter Triage
                </h3>
                <p className="text-xs text-[#9ca3af] leading-relaxed">
                  Megger insulation resistance testing, phase imbalance detection, modular MCB trip diagnostics, and dedicated inverter circuit wiring.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Licensed Engineers</span>
                <span className="text-amber-400 font-bold">From ₹249</span>
              </div>
            </div>

            {/* Service Card 6 */}
            <div className="p-6 rounded-2xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-300 shadow-md space-y-4 group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-400">
                    NON-INVASIVE
                  </span>
                </div>
                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-cyan-400 transition-colors">
                  Acoustic Leak Detection &amp; Pressure Lines
                </h3>
                <p className="text-xs text-[#9ca3af] leading-relaxed">
                  Non-destructive concealed pipe acoustic testing, booster pump pressure switch alignment, and high-flow CPVC replacement.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Zero Wall Damage</span>
                <span className="text-cyan-400 font-bold">From ₹199</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 06 FIELD TECHNICIAN FLEET ONBOARDING CTA                  */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#111827] border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Top Industrial Accent Rule */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-cyan-400 to-amber-500" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider border border-amber-500/30">
              <Wrench className="w-3.5 h-3.5" />
              PRECISION FLEET ONBOARDING
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display leading-tight">
              Equip Your Craft with Direct Bookings and Zero Middleman Deductions
            </h2>

            <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
              Are you a licensed mechanic, electrician, HVAC engineer, or plumber?
              Join over 1,200+ verified professionals earning transparent, direct livelihood
              with instant UPI payouts, corporate work dispatch, and calibrated equipment support.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link to="/register?role=TECHNICIAN">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.25)] flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <span>Apply for Fleet Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="tel:+918439616833">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-[#1f2937] hover:bg-slate-800 text-white border border-slate-700 px-6 py-3 rounded-xl transition-all font-mono text-xs sm:text-sm"
                >
                  Fleet Helpline: 84396 16833
                </Button>
              </a>
            </div>

            <p className="text-[11px] font-mono text-slate-500">
              ZERO REGISTRATION FEE • 4-STAGE KYC IN UNDER 5 MINUTES
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
