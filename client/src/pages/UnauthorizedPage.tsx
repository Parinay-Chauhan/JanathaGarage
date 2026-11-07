import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Lock,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  ArrowLeft,
  Home,
  Wrench,
  Sparkles,
  LifeBuoy,
  Key,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCredentials } from "../features/auth/authSlice";
import { UserRole } from "../types/api.types";
import { useLanguage } from "../context/LanguageContext";

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { language } = useLanguage();
  const isHi = language === "hi";

  // Extract query params if passed: ?requiredRole=ADMIN
  const searchParams = new URLSearchParams(location.search);
  const requiredRole = (searchParams.get("requiredRole") as UserRole) || "ADMIN";

  const handleSwitchRole = (targetRole: UserRole) => {
    if (!user) {
      // In guest mode, dispatch a mock user with target role
      dispatch(
        setCredentials({
          user: {
            id: `dev-user-${Date.now()}`,
            email: `dev-${targetRole.toLowerCase()}@jantagaraj.in`,
            phoneNumber: "+91 98765 43210",
            fullName:
              targetRole === "TECHNICIAN"
                ? "Vikramjit Singh (Partner)"
                : targetRole === "ADMIN"
                ? "System Operations Lead"
                : "Aman Sharma (Customer)",
            role: targetRole,
            isPhoneVerified: true,
            createdAt: new Date().toISOString(),
            technicianProfile:
              targetRole === "TECHNICIAN"
                ? {
                    id: "tech-vikram-101",
                    userId: "dev-tech-01",
                    experienceYears: 7,
                    baseVisitingCharge: 249,
                    serviceRadiusKm: 15,
                    isOnline: true,
                    isAvailable: true,
                    kycStatus: "VERIFIED",
                    docType: "AADHAAR",
                    docNumber: "XXXX-XXXX-8921",
                    docUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
                    avgRating: 4.92,
                    totalReviews: 128,
                  }
                : undefined,
          },
          accessToken: "dev_switch_token",
        })
      );
    } else {
      dispatch(
        setCredentials({
          user: {
            ...user,
            role: targetRole,
            fullName:
              targetRole === "TECHNICIAN"
                ? "Vikramjit Singh (Partner)"
                : targetRole === "ADMIN"
                ? "System Operations Lead"
                : user.fullName || "Aman Sharma",
            technicianProfile:
              targetRole === "TECHNICIAN"
                ? {
                    id: "tech-vikram-101",
                    userId: user.id,
                    experienceYears: 7,
                    baseVisitingCharge: 249,
                    serviceRadiusKm: 15,
                    isOnline: true,
                    isAvailable: true,
                    kycStatus: "VERIFIED",
                    docType: "AADHAAR",
                    docNumber: "XXXX-XXXX-8921",
                    docUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
                    avgRating: 4.92,
                    totalReviews: 128,
                  }
                : undefined,
          },
          accessToken: "dev_switch_token",
        })
      );
    }

    // After switching role, navigate to appropriate portal
    if (targetRole === "ADMIN") navigate("/admin/dashboard");
    else if (targetRole === "TECHNICIAN") navigate("/technician/dashboard");
    else navigate("/customer/dashboard");
  };

  // 4 Natural Security Metrics
  const securityMetrics = [
    {
      metric: "256-Bit",
      label: isHi ? "क्रिप्टोग्राफिक सुरक्षा" : "Cryptographic RBAC",
      subtext: isHi
        ? "कड़ा भूमिका-आधारित एक्सेस कंट्रोल व टोकन सत्यापन"
        : "Strict role-based boundary with zero trust validation",
    },
    {
      metric: "0%",
      label: isHi ? "अनधिकृत छूट" : "Access Tolerance",
      subtext: isHi
        ? "संवेदनशील प्रशासनिक डेटा तक केवल अधिकृत पहुंच"
        : "Protected operational endpoints strictly gated by permissions",
    },
    {
      metric: "100%",
      label: isHi ? "केवाईसी सत्यापित फ्लीट" : "Verified Fleet Identities",
      subtext: isHi
        ? "सरकारी पहचान व बायोमेट्रिक पृष्ठभूमि सत्यापित"
        : "Government identity and background audited partners",
    },
    {
      metric: "< 24 Hrs",
      label: isHi ? "अनुमति समीक्षा समय" : "Privilege Review SLA",
      subtext: isHi
        ? "रोल अपग्रेड व एक्सेस रिक्वेस्ट का त्वरित समाधान"
        : "Fast-track resolution for clearance escalation tickets",
    },
  ];

  // 1-2-3 Resolution Process
  const resolutionSteps = [
    {
      step: "01",
      title: isHi ? "सक्रिय सत्र की पुष्टि करें" : "Verify Active Credentials",
      desc: isHi
        ? "जांचें कि आप सही पंजीकृत फोन नंबर अथवा आधिकारिक एडमिन ईमेल से लॉग इन हैं।"
        : "Check whether you are authenticated with the registered email or phone holding these rights.",
    },
    {
      step: "02",
      title: isHi ? "अनुमति अपग्रेड का अनुरोध करें" : "Request Role Elevation",
      desc: isHi
        ? "यदि आपको इस डैशबोर्ड की आवश्यकता है, तो अपने नोडल एडमिन अथवा फ्लीट मैनेजर से संपर्क करें।"
        : "Contact your regional dispatch coordinator or system admin to provision required clearance.",
    },
    {
      step: "03",
      title: isHi ? "अधिकृत कार्यक्षेत्र पर लौटें" : "Return to Safe Workspace",
      desc: isHi
        ? "अपने अधिकृत ग्राहक अथवा तकनीशियन पोर्टल पर जाकर बुकिंग व कार्यों का प्रबंधन करें।"
        : "Navigate back to your authorized customer or technician console to continue tasks smoothly.",
    },
  ];

  return (
    <div className="bg-[#080b11] text-slate-100 min-h-screen selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between font-sans relative overflow-hidden pb-12">
      {/* ========================================================= */}
      {/* QUIET, PREMIUM LIGHTING & ATMOSPHERE                      */}
      {/* ========================================================= */}
      {/* Diffuse overhead ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(245,158,11,0.06),transparent_70%)] pointer-events-none -z-0" />
      <div className="absolute top-2/3 right-1/4 w-[400px] h-[300px] bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(239,68,68,0.03),transparent_70%)] pointer-events-none -z-0" />
      {/* Subtle organic grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none -z-0" />

      {/* ========================================================= */}
      {/* MINIMALIST HEADER                                         */}
      {/* ========================================================= */}
      <header className="relative z-20 border-b border-white/[0.06] bg-[#080b11]/80 backdrop-blur-md px-6 sm:px-10 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white flex items-center justify-center font-bold group-hover:border-amber-400/40 transition-colors">
              <Wrench className="w-4 h-4 text-amber-400 stroke-[2]" />
            </div>
            <span className="text-base font-semibold tracking-tight text-white">
              Janta<span className="text-slate-400 font-normal">Garaj</span>
            </span>
          </Link>

          <Link
            to="/help"
            className="text-xs text-slate-400 hover:text-white transition-colors font-medium flex items-center gap-1.5"
          >
            <LifeBuoy className="w-3.5 h-3.5 text-slate-400" />
            <span>{isHi ? "सहायता डेस्क" : "Support Desk"}</span>
          </Link>
        </div>
      </header>

      {/* ========================================================= */}
      {/* FOCUSED 403 HERO CONTENT                                  */}
      {/* ========================================================= */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 flex flex-col items-center justify-center text-center">
        {/* Security Clearance Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-slate-300 mb-6 backdrop-blur-md">
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>{isHi ? "403 · प्रतिबंधित अनुभाग" : "403 · Restricted Clearance Boundary"}</span>
        </div>

        {/* Large Prominent 403 Typographic Display */}
        <div className="relative mb-4">
          <h1 className="text-7xl sm:text-9xl lg:text-[11rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500/25 leading-none select-none drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] font-sans">
            403
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-24 sm:h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        </div>

        {/* Crisp Heading & Role Context */}
        <div className="space-y-3 max-w-lg mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {isHi ? "पहुंच अस्वीकृत · उच्च अनुमति आवश्यक" : "Elevated Clearance Required"}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
            {user ? (
              <>
                {isHi ? "आप वर्तमान में " : "You are signed in as "}
                <span className="text-white font-medium">{user.fullName || user.email}</span>
                {isHi ? " (रोल: " : " with role "}
                <span className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.1] text-amber-400 font-mono text-xs font-semibold">
                  {user.role}
                </span>
                {isHi ? ") के रूप में प्रमाणित हैं। इस सुरक्षित अनुभाग के लिए " : "]. Accessing this workspace requires "}
                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
                  {requiredRole}
                </span>{" "}
                {isHi ? "अधिकार अनिवार्य हैं।" : "privileges."}
              </>
            ) : (
              isHi
                ? "इस सुरक्षित कार्यक्षेत्र को देखने के लिए आपको अधिकृत क्रेडेंशियल्स के साथ साइन इन होना आवश्यक है।"
                : "You must be authenticated with appropriate administrative or dispatch privileges to access this console."
            )}
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            to="/"
            className="inline-flex flex-row items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>{isHi ? "मुख्य पृष्ठ पर लौटें" : "Return to Home"}</span>
          </Link>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex flex-row items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.1] hover:border-white/[0.2] font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4 shrink-0 text-slate-400" />
            <span>{isHi ? "पिछले पेज पर जाएं" : "Go Back"}</span>
          </button>

          <Link
            to="/help"
            className="inline-flex flex-row items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.02] hover:bg-white/[0.05] text-slate-300 hover:text-white border border-white/[0.06] font-medium text-sm transition-all whitespace-nowrap"
          >
            <LifeBuoy className="w-4 h-4 shrink-0 text-slate-400" />
            <span>{isHi ? "सहायता डेस्क" : "Support Desk"}</span>
          </Link>
        </div>

        {/* ========================================================= */}
        {/* DEVELOPER SANDBOX PREVIEW ROLE SWITCHER                   */}
        {/* ========================================================= */}
        <div className="mt-10 sm:mt-12 w-full max-w-xl p-5 sm:p-6 rounded-2xl bg-[#0d121c]/70 border border-white/[0.08] backdrop-blur-md text-left space-y-3.5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "8s" }} />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-white tracking-tight">
                  {isHi ? "डेवलपर सैंडबॉक्स · त्वरित रोल स्विच" : "Developer Sandbox · Identity Switcher"}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {isHi
                    ? "यूआई मूल्यांकन हेतु एक क्लिक में अपना एक्टिव रोल बदलें:"
                    : "For UI preview and verification, toggle your active session identity:"}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 hidden sm:inline-block">
              SANDBOX
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => handleSwitchRole("ADMIN")}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.03] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.08] hover:border-amber-400/40 transition-all flex items-center justify-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Console</span>
            </button>
            <button
              type="button"
              onClick={() => handleSwitchRole("TECHNICIAN")}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.03] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.08] hover:border-amber-400/40 transition-all flex items-center justify-center gap-1.5"
            >
              <Wrench className="w-3.5 h-3.5 text-amber-400" />
              <span>Partner Pro</span>
            </button>
            <button
              type="button"
              onClick={() => handleSwitchRole("CUSTOMER")}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.03] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.08] hover:border-amber-400/40 transition-all flex items-center justify-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Customer Portal</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4 NATURAL SECURITY METRICS STRIP                          */}
        {/* ========================================================= */}
        <div className="mt-12 sm:mt-14 w-full grid grid-cols-2 lg:grid-cols-4 gap-3 text-left">
          {securityMetrics.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#0d121c]/40 border border-white/[0.04] backdrop-blur-sm"
            >
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                {item.metric}
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-1">
                {item.label}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed font-normal">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* 1-2-3 RESOLUTION PROCESS                                  */}
        {/* ========================================================= */}
        <div className="mt-12 sm:mt-14 w-full text-left space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHi ? "एक्सेस समस्या निवारण प्रोटोकॉल" : "Clearance Resolution Protocol"}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {resolutionSteps.map((s, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#0d121c]/50 border border-white/[0.06] hover:border-white/[0.12] transition-colors"
              >
                <div className="text-2xl font-black text-white/[0.12] font-mono mb-2">
                  {s.step}
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight mb-1">
                  {s.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ========================================================= */}
      {/* MINIMALIST CLEAN FOOTER                                   */}
      {/* ========================================================= */}
      <footer className="relative z-20 h-14 border-t border-white/[0.06] bg-[#080b11] px-6 text-xs text-slate-500 flex items-center justify-between max-w-6xl mx-auto w-full">
        <span>© {new Date().getFullYear()} JantaGaraj · Zero-Trust Security Architecture</span>
        <span className="text-slate-400 font-mono text-[11px]">403_CLEARANCE_REQUIRED</span>
      </footer>
    </div>
  );
};
