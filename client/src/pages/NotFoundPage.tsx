import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wrench,
  ArrowLeft,
  Home,
  HelpCircle,
  Briefcase,
  CalendarCheck,
  Phone,
  ShieldCheck,
  Search,
  ArrowRight,
  ChevronRight,
  Car,
  Compass,
  Clock,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/Button";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isHi = language === "hi";

  // 4 Sleek Floating Hub Cards
  const quickHubs = [
    {
      id: "hub-services",
      title: isHi ? "सभी सेवाएं व तय रेट" : "All Services & Rates",
      desc: isHi
        ? "100+ डोरस्टेप ऑटो रिपेयर, एसी व इलेक्ट्रिकल सेवाओं के रेट कार्ड।"
        : "Standardized rate cards for doorstep auto, HVAC, and electrical repairs.",
      route: "/services",
      icon: Wrench,
      actionText: isHi ? "रेट देखें" : "View Services",
    },
    {
      id: "hub-technicians",
      title: isHi ? "प्रमाणित तकनीशियन फ्लीट" : "Certified Technician Fleet",
      desc: isHi
        ? "अनुभवी मास्टर मैकेनिकों के प्रोफाइल, रेटिंग व विशेषज्ञता देखें।"
        : "Browse background-verified master mechanics and diagnostic specialists.",
      route: "/technicians",
      icon: Briefcase,
      actionText: isHi ? "मैकेनिक खोजें" : "Find Pros",
    },
    {
      id: "hub-orders",
      title: isHi ? "एक्टिव वर्क ऑर्डर्स" : "Live Work Orders",
      desc: isHi
        ? "अपनी मौजूदा बुकिंग, तकनीशियन लोकेशन व स्टार्ट OTP ट्रैक करें।"
        : "Track active repair status, technician ETA, and your 4-digit start OTP.",
      route: "/customer/bookings",
      icon: CalendarCheck,
      actionText: isHi ? "ट्रैक करें" : "Track Order",
    },
    {
      id: "hub-help",
      title: isHi ? "सहायता व वारंटी डेस्क" : "Support & Warranty Desk",
      desc: isHi
        ? "30 दिन की लिखित वारंटी दावे, रिफंड नियम व 24/7 हेल्पलाइन।"
        : "Operational guidelines, 30-day warranty claims, and direct dispatch hotline.",
      route: "/help",
      icon: HelpCircle,
      actionText: isHi ? "मदद पाएं" : "Get Help",
    },
  ];

  return (
    <div className="bg-[#080b11] text-slate-100 min-h-screen selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between font-sans relative overflow-x-hidden">
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

          <div className="flex items-center gap-4 text-xs">
            <Link
              to="/help"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>{isHi ? "सहायता केंद्र" : "Help Desk"}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MAIN 404 CONTENT                                          */}
      {/* ========================================================= */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex-1 flex flex-col items-center justify-center text-center">
        {/* Quiet Brand Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-slate-300 text-xs font-medium backdrop-blur-md shadow-sm mb-6 sm:mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span>{isHi ? "त्रुटि 404 · रूट अनुपलब्ध" : "Error 404 · Route Not Found"}</span>
        </div>

        {/* Clean, Human Headline */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.14] max-w-2xl mx-auto">
          {isHi ? (
            <>
              शायद यह रास्ता <span className="text-slate-400 font-normal">बदल चुका है।</span>
            </>
          ) : (
            <>
              This route seems to have <span className="text-slate-400 font-normal">taken a detour.</span>
            </>
          )}
        </h1>

        {/* Fluid Description */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto font-normal">
          {isHi
            ? "आपके द्वारा खोजा गया पेज या सर्विस लिंक उपलब्ध नहीं है। चलिए आपको वापस मुख्य सेवाओं, मैकेनिक रडार या आपकी बुकिंग पर ले चलते हैं।"
            : "The page or service endpoint you're looking for is unavailable or has moved. Let's get you back on track to verified services, live tracking, or roadside assistance."}
        </p>

        {/* Primary & Secondary Action Group */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/">
            <Button
              variant="primary"
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-7 py-3 rounded-full shadow-[0_4px_20px_rgba(245,158,11,0.22)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.32)] flex items-center gap-2 transition-all hover:scale-[1.01]"
            >
              <Home className="w-4 h-4" />
              <span>{isHi ? "मुख्य पृष्ठ पर लौटें" : "Return to Home"}</span>
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate(-1)}
            className="bg-white/[0.03] hover:bg-white/[0.07] text-slate-200 border border-white/[0.1] font-medium px-6 py-3 rounded-full transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            <span>{isHi ? "पिछले पेज पर जाएं" : "Backtrack Previous Page"}</span>
          </Button>
        </div>

        {/* Emergency Hotline Banner */}
        <div className="mt-8 pt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400">
          <span>{isHi ? "क्या आप सड़क पर फंसे हैं?" : "Stranded or need emergency roadside triage?"}</span>
          <a
            href="tel:+918439616833"
            className="text-white hover:text-amber-400 font-semibold flex items-center gap-1 transition-colors underline underline-offset-4 decoration-white/[0.2]"
          >
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span>+91 84396 16833</span>
          </a>
        </div>

        {/* ========================================================= */}
        {/* 1-2-3 RECOVERY WORKFLOW                                   */}
        {/* ========================================================= */}
        <div className="w-full max-w-4xl mt-20 pt-12 border-t border-white/[0.06] space-y-10">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span className="uppercase tracking-wider">
                {isHi ? "मार्गदर्शन" : "Navigation Guide"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              {isHi ? "आगे बढ़ने के 3 आसान कदम" : "Quick steps to get back on track."}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-4">
                  01
                </span>
                <h3 className="text-base font-semibold text-white mb-2">
                  {isHi ? "लिंक या यूआरएल जांचें" : "Verify Destination"}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {isHi
                    ? "यदि आपने कोई पुराना बुकमार्क खोला था, तो संभव है कि सर्विस कैटलॉग अपडेट हो चुका हो।"
                    : "Check the address for typos or return to our verified service catalog to find active bookings."}
                </p>
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-4">
                  02
                </span>
                <h3 className="text-base font-semibold text-white mb-2">
                  {isHi ? "सेवाएं या मैकेनिक खोजें" : "Explore Services"}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {isHi
                    ? "कार, बाइक, एसी या इलेक्ट्रिकल रिपेयर के लिए सीधे तय रेट कार्ड ब्राउज़ करें।"
                    : "Access over 100+ standardized automotive and home maintenance rate cards."}
                </p>
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-4">
                  03
                </span>
                <h3 className="text-base font-semibold text-white mb-2">
                  {isHi ? "24/7 सेंट्रल हेल्पलाइन" : "24/7 Roadside Hotline"}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {isHi
                    ? "यदि आपकी गाड़ी बंद पड़ गई है, तो हमारी सेंट्रल डिस्पैच टीम 30 मिनट में सहायता भेजती है।"
                    : "For immediate breakdowns, our central operations desk connects in under 30 seconds."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SLEEK FLOATING QUICK DESTINATION CARDS                    */}
        {/* ========================================================= */}
        <div className="w-full max-w-4xl mt-16 space-y-6 text-left">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            {isHi ? "अनुशंसित सक्रिय हब" : "Recommended Destinations"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickHubs.map((hub) => {
              const Icon = hub.icon;
              return (
                <Link
                  key={hub.id}
                  to={hub.route}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 shadow-sm flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white shrink-0 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-white group-hover:text-slate-100 transition-colors">
                        {hub.title}
                      </h4>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed font-normal">
                      {hub.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Resolution Metrics Strip: Natural & Elegant Typography */}
        <div className="w-full max-w-4xl mt-16 pt-8 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="space-y-1">
            <p className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              &lt; 28 min
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "औसत रोडसाइड डिस्पैच" : "Roadside Dispatch SLA"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              100% OEM
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "सीरियल नंबर वाले पार्ट्स" : "Serialized Genuine Spares"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              4.92 / 5.0
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "12,000+ संतुष्ट ग्राहक" : "From 12,000+ Verified Jobs"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              ₹0 Hidden
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "तय डिजिटल रेट कार्ड" : "Pre-Published Rate Cards"}
            </p>
          </div>
        </div>
      </main>

      {/* Minimalist Clean Footer */}
      <footer className="relative z-20 h-14 border-t border-white/[0.06] bg-[#080b11] px-6 text-xs text-slate-500 flex items-center justify-between max-w-6xl mx-auto w-full">
        <span>© {new Date().getFullYear()} JantaGaraj · Automotive &amp; Home Technology</span>
        <span className="text-slate-400 font-mono text-[11px]">DISPATCH SYSTEMS OPERATIONAL</span>
      </footer>
    </div>
  );
};
