import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wrench, ArrowLeft, Home, Phone } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isHi = language === "hi";

  return (
    <div className="bg-[#080b11] text-slate-100 min-h-screen selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between font-sans relative overflow-hidden">
      {/* ========================================================= */}
      {/* QUIET, PREMIUM LIGHTING & ATMOSPHERE                      */}
      {/* ========================================================= */}
      {/* Soft, diffuse overhead ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(245,158,11,0.06),transparent_70%)] pointer-events-none -z-0" />
      {/* Subtle organic grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none -z-0" />

      {/* ========================================================= */}
      {/* MINIMALIST HEADER                                         */}
      {/* ========================================================= */}
      <header className="relative z-20 border-b border-white/[0.06] bg-[#080b11]/80 backdrop-blur-md px-6 sm:px-10 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white flex items-center justify-center font-bold group-hover:border-white/[0.2] transition-colors">
              <Wrench className="w-4 h-4 stroke-[2]" />
            </div>
            <span className="text-base font-semibold tracking-tight text-white">
              Janta<span className="text-slate-400 font-normal">Garaj</span>
            </span>
          </Link>

          <Link
            to="/help"
            className="text-xs text-slate-400 hover:text-white transition-colors font-medium"
          >
            {isHi ? "सहायता केंद्र" : "Help Desk"}
          </Link>
        </div>
      </header>

      {/* ========================================================= */}
      {/* PURE, FOCUSED 404 HERO CONTENT                            */}
      {/* ========================================================= */}
      <main className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex-1 flex flex-col items-center justify-center text-center">
        {/* Large Prominent 404 Headline */}
        <div className="relative mb-3 sm:mb-4">
          <h1 className="text-8xl sm:text-[11rem] lg:text-[13rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-500/30 leading-none select-none drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
            404
          </h1>
          {/* Subtle warm glow behind 404 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-24 sm:h-32 bg-amber-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
        </div>

        {/* Clear, Human Heading & Description */}
        <div className="space-y-3 max-w-lg mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {isHi ? "पेज नहीं मिला" : "Page not found"}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
            {isHi
              ? "आप जिस पेज या लिंक को ढूंढ रहे हैं, वह मौजूद नहीं है या हटा दिया गया है।"
              : "The page you're looking for doesn't exist, was removed, or has taken an unexpected detour."}
          </p>
        </div>

        {/* Perfectly Aligned Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>{isHi ? "मुख्य पृष्ठ पर लौटें" : "Return to Home"}</span>
          </Link>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.1] hover:border-white/[0.2] font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4 shrink-0 text-slate-400" />
            <span>{isHi ? "पिछले पेज पर जाएं" : "Go Back"}</span>
          </button>
        </div>

        {/* Subtle Emergency Assistance Line */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-2 text-xs text-slate-400">
          <span>{isHi ? "सड़क पर सहायता चाहिए?" : "Need roadside assistance?"}</span>
          <a
            href="tel:+918439616833"
            className="text-slate-200 hover:text-amber-400 font-semibold transition-colors flex items-center gap-1 underline underline-offset-4 decoration-white/[0.2]"
          >
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span>+91 84396 16833</span>
          </a>
        </div>
      </main>

      {/* Minimalist Clean Footer */}
      <footer className="relative z-20 h-14 border-t border-white/[0.06] bg-[#080b11] px-6 text-xs text-slate-500 flex items-center justify-between max-w-6xl mx-auto w-full">
        <span>© {new Date().getFullYear()} JantaGaraj</span>
        <span className="text-slate-400 font-mono text-[11px]">404_ROUTE_UNRESOLVED</span>
      </footer>
    </div>
  );
};
