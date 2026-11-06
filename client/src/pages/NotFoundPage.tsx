import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wrench,
  ArrowLeft,
  Home,
  HelpCircle,
  Briefcase,
  CalendarCheck,
  Compass,
  AlertTriangle,
  Radio,
  Search,
  Phone,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../components/ui/Button";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 relative overflow-hidden">
      {/* Precision Blueprint Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none -z-0" />

      {/* Top Operational Navigation Bar */}
      <header className="relative z-20 border-b border-slate-800 bg-[#111827] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Wrench className="w-4 h-4 stroke-[2.4]" />
            </div>
            <span className="text-lg font-bold font-display tracking-tight text-white">
              Janta<span className="text-amber-400">Garaj</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>RADAR: ONLINE</span>
            </span>
            <Link
              to="/help"
              className="text-xs font-mono text-slate-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Support Desk</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Diagnostic 404 Hero */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 py-12 sm:py-16 text-center flex-1 flex flex-col items-center justify-center">
        {/* Diagnostic Status Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#1f2937] border border-slate-800 w-full max-w-xl space-y-6">
          {/* Telemetry Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 font-semibold uppercase">
                DIAGNOSTIC STATUS: DISCONNECT
              </span>
            </div>
            <span className="text-slate-500">RIG #JG-404</span>
          </div>

          {/* Diagnostic Code Box (No Oversized Blocky Text) */}
          <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                  OBD-II FAULT CLASSIFICATION
                </p>
                <h2 className="text-base font-bold font-mono text-white">
                  DTC-404: ROUTE_UNRESOLVED
                </h2>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold">
              SECTOR 0
            </span>
          </div>

          {/* Structured Diagnostic Message */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Service Route Not Found
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
              The diagnostic radar could not establish a connection to this endpoint. The link may be decommissioned, or the requested vehicle service is offline.
            </p>
          </div>

          {/* Recovery Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate(-1)}
              leftIcon={<ArrowLeft className="w-4 h-4 text-cyan-400" />}
              className="bg-[#111827] hover:bg-slate-800 text-white border border-slate-700 px-5 py-2.5 rounded-lg text-xs font-mono uppercase"
            >
              Backtrack Route
            </Button>

            <Link to="/">
              <Button
                variant="primary"
                size="md"
                leftIcon={<Home className="w-4 h-4" />}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-6 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all hover:scale-[1.01]"
              >
                Return to Central Base
              </Button>
            </Link>
          </div>

          {/* Roadside Emergency Hotlink */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
            <span>Stranded or need roadside assistance?</span>
            <a
              href="tel:+918439616833"
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 84396 16833</span>
            </a>
          </div>
        </div>

        {/* Popular Pit Stops & Diagnostic Shortcuts */}
        <div className="w-full max-w-xl pt-8">
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-3 text-left">
            RECOMMENDED ACTIVE HUBS
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <Link
              to="/services"
              className="p-3.5 rounded-xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 transition-colors flex items-center gap-3 group"
            >
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:scale-105 transition-transform">
                <Wrench className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white group-hover:text-amber-400 transition-colors">
                  All Service Rates
                </p>
                <p className="text-[11px] text-slate-400 truncate">Standardized price cards</p>
              </div>
            </Link>

            <Link
              to="/technicians"
              className="p-3.5 rounded-xl bg-[#1f2937] border border-slate-800 hover:border-cyan-500/50 transition-colors flex items-center gap-3 group"
            >
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-105 transition-transform">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  Technician Fleet
                </p>
                <p className="text-[11px] text-slate-400 truncate">Find verified mechanics</p>
              </div>
            </Link>

            <Link
              to="/customer/bookings"
              className="p-3.5 rounded-xl bg-[#1f2937] border border-slate-800 hover:border-cyan-500/50 transition-colors flex items-center gap-3 group"
            >
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-105 transition-transform">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  Work Orders
                </p>
                <p className="text-[11px] text-slate-400 truncate">Track live jobs &amp; OTP</p>
              </div>
            </Link>

            <Link
              to="/help"
              className="p-3.5 rounded-xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 transition-colors flex items-center gap-3 group"
            >
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:scale-105 transition-transform">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white group-hover:text-amber-400 transition-colors">
                  Central Helpdesk
                </p>
                <p className="text-[11px] text-slate-400 truncate">Warranty &amp; guidelines</p>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Industrial Footer Strip */}
      <footer className="relative z-20 h-14 border-t border-slate-800 bg-[#111827] px-4 text-center text-xs font-mono text-slate-500 flex items-center justify-between max-w-7xl mx-auto w-full">
        <span>© {new Date().getFullYear()} JantaGaraj · Engineering Systems</span>
        <span className="text-cyan-400 hidden sm:inline">DISPATCH STATUS: NORMAL</span>
      </footer>
    </div>
  );
};
