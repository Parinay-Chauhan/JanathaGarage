import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation as useRouterLocation } from "react-router-dom";
import {
  Wrench,
  MapPin,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Menu,
  X,
  LayoutDashboard,
  CalendarCheck,
  ShieldAlert,
  Languages,
  ArrowRight,
  LifeBuoy,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logOut } from "../../features/auth/authSlice";
import { useLanguage } from "../../context/LanguageContext";
import { useLocation } from "../../context/LocationContext";

interface NavbarProps {
  onOpenAuthModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuthModal }) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const isHi = language === "hi";
  const { location, detectCurrentLocation, isLoadingGPS } = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path: string) => routerLocation.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logOut());
    setUserDropdownOpen(false);
    navigate("/");
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    if (user.role === "ADMIN") return "/admin/dashboard";
    if (user.role === "TECHNICIAN") return "/technician/dashboard";
    return "/customer/dashboard";
  };

  return (
    <header
      id="header"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "bg-[#080b11]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-[#080b11]/70 backdrop-blur-md border-b border-white/[0.04]"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 xl:gap-6 transition-all duration-300 ${
          isScrolled ? "h-16" : "h-[72px]"
        }`}
      >
        {/* ========================================================= */}
        {/* BRAND IDENTITY                                            */}
        {/* ========================================================= */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-white group-hover:border-amber-400/50 group-hover:bg-amber-500/10 transition-all duration-300 shadow-sm shrink-0">
            <Wrench className="w-4 h-4 text-amber-400 stroke-[2.2] group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div className="whitespace-nowrap">
            <span className="text-lg font-bold tracking-tight text-white block leading-none">
              Janta<span className="text-slate-400 font-normal">Garaj</span>
            </span>
            <span className="hidden sm:block text-[10px] text-slate-400 font-normal tracking-wide mt-0.5">
              {isHi ? "डोरस्टेप ऑटो सर्विस" : "Next-Gen Auto Care"}
            </span>
          </div>
        </Link>

        {/* ========================================================= */}
        {/* DESKTOP NAVIGATION LINKS (CLEAN SINGLE-LINE)              */}
        {/* ========================================================= */}
        <nav className="hidden lg:flex items-center gap-1 text-[13px] font-medium text-slate-300 whitespace-nowrap">
          <Link
            to="/services"
            className={`px-3.5 h-9 inline-flex items-center rounded-full whitespace-nowrap shrink-0 transition-all ${
              isActive("/services")
                ? "text-white bg-white/[0.08]"
                : "hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            {isHi ? "सेवाएं" : "Services"}
          </Link>
          <Link
            to="/pricing"
            className={`px-3.5 h-9 inline-flex items-center rounded-full whitespace-nowrap shrink-0 transition-all ${
              isActive("/pricing")
                ? "text-white bg-white/[0.08]"
                : "hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            {isHi ? "रेट कार्ड" : "Rate Card"}
          </Link>
          <Link
            to="/technicians"
            className={`px-3.5 h-9 inline-flex items-center rounded-full whitespace-nowrap shrink-0 transition-all ${
              isActive("/technicians")
                ? "text-white bg-white/[0.08]"
                : "hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            {isHi ? "मैकेनिक" : "Mechanics"}
          </Link>
          <a
            href="/#how-it-works"
            className="px-3.5 h-9 inline-flex items-center rounded-full whitespace-nowrap shrink-0 hover:text-white hover:bg-white/[0.04] transition-all"
          >
            {isHi ? "प्रक्रिया" : "How It Works"}
          </a>
          <Link
            to="/help"
            className={`px-3.5 h-9 inline-flex items-center rounded-full whitespace-nowrap shrink-0 transition-all ${
              isActive("/help")
                ? "text-white bg-white/[0.08]"
                : "hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            {isHi ? "सहायता" : "Help Desk"}
          </Link>
        </nav>

        {/* ========================================================= */}
        {/* RIGHT SECTION: GEO-ZONE, LANG & ACTIONS (UNIFORM h-9)     */}
        {/* ========================================================= */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Compact Geo-Zone Pill */}
          <div className="hidden xl:inline-flex items-center gap-2 h-9 px-3.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300 hover:border-white/[0.15] transition-all whitespace-nowrap shrink-0">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="max-w-[110px] truncate font-medium text-white">
              {location.city || (isHi ? "स्थान चुनें" : "NCR Metro")}
            </span>
            <span className="text-white/[0.15]">•</span>
            <button
              type="button"
              onClick={() => detectCurrentLocation()}
              disabled={isLoadingGPS}
              className="text-amber-400 hover:text-amber-300 font-medium text-[11px] disabled:opacity-50 transition-colors"
              title="Auto detect location via GPS"
            >
              {isLoadingGPS ? "..." : t("nav.gpsDetect")}
            </button>
          </div>

          {/* Language Switcher Pill */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 h-9 px-3.5 rounded-full border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-slate-300 hover:text-white transition-all whitespace-nowrap shrink-0"
            title="भाषा बदलें / Switch Language"
            aria-label="Toggle between Hindi and English"
          >
            <Languages className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className={language === "hi" ? "text-amber-400 font-semibold" : ""}>
              {language === "en" ? "हिंदी" : "English"}
            </span>
          </button>

          {/* Authenticated User Menu */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="h-9 px-3 rounded-full bg-white/[0.04] border border-white/[0.1] hover:border-amber-400/50 text-white font-medium inline-flex items-center gap-2 text-xs transition-all focus:outline-none whitespace-nowrap shrink-0"
                title={user.fullName}
                aria-label="User Profile Menu"
              >
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-[11px]">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="hidden sm:inline truncate max-w-[100px] text-slate-200">
                  {user.fullName || user.phone}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Profile Dropdown Popup */}
              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2.5 w-60 rounded-2xl bg-[#0d121c]/95 backdrop-blur-xl p-2.5 border border-white/[0.08] text-xs font-sans z-50 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2.5 border-b border-white/[0.06] mb-1.5">
                    <p className="font-semibold text-white truncate text-sm">
                      {user.fullName}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                      {user.phone || user.email}
                    </p>
                    <span className="mt-1.5 inline-block text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono font-medium uppercase">
                      {user.role}
                    </span>
                  </div>

                  <Link
                    to={getDashboardLink()}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-200 hover:bg-white/[0.06] hover:text-white transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-400" />
                    <span>
                      {user.role === "ADMIN"
                        ? (isHi ? "एडमिन कंसोल" : "Admin Console")
                        : user.role === "TECHNICIAN"
                        ? (isHi ? "मैकेनिक डैशबोर्ड" : "Partner Console")
                        : (isHi ? "ग्राहक डैशबोर्ड" : "Customer Portal")}
                    </span>
                  </Link>

                  {user.role === "CUSTOMER" && (
                    <Link
                      to="/customer/bookings"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-200 hover:bg-white/[0.06] hover:text-white transition-colors"
                    >
                      <CalendarCheck className="w-4 h-4 text-cyan-400" />
                      <span>{isHi ? "मेरी बुकिंग्स" : "Work Orders"}</span>
                    </Link>
                  )}

                  {user.role === "ADMIN" && (
                    <Link
                      to="/admin/technicians/verification"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-200 hover:bg-white/[0.06] hover:text-white transition-colors"
                    >
                      <ShieldAlert className="w-4 h-4 text-cyan-400" />
                      <span>{isHi ? "केवाईसी सत्यापन" : "KYC Verification"}</span>
                    </Link>
                  )}

                  <Link
                    to="/help"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-200 hover:bg-white/[0.06] hover:text-white transition-colors"
                  >
                    <LifeBuoy className="w-4 h-4 text-slate-400" />
                    <span>{isHi ? "सहायता व विवाद" : "Support & Disputes"}</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-950/30 transition-colors text-left mt-1.5 border-t border-white/[0.06]"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{isHi ? "लॉगआउट" : "Sign Out"}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="hidden sm:inline-flex items-center justify-center gap-1.5 h-9 px-4 sm:px-5 rounded-full border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white text-xs font-medium whitespace-nowrap shrink-0 transition-all"
              >
                <UserIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{isHi ? "लॉग इन" : "Sign In"}</span>
              </button>

              <Link to="/services" className="shrink-0">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-1.5 h-9 px-5 sm:px-6 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs tracking-wide shadow-[0_4px_18px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_24px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
                >
                  <span>{isHi ? "सर्विस बुक करें" : "Book a Service"}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </Link>
            </div>
          )}

          {/* Quick Book CTA for Authenticated Users */}
          {isAuthenticated && (
            <Link to="/services" className="hidden sm:block shrink-0">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-1.5 h-9 px-5 sm:px-6 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs tracking-wide shadow-[0_4px_18px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_24px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
              >
                <span>{isHi ? "सर्विस बुक करें" : "Book a Service"}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </Link>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-slate-300 bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] transition-colors"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-amber-400" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE DRAWER MENU                                        */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.06] bg-[#080b11]/98 backdrop-blur-2xl px-5 pt-4 pb-7 space-y-4 shadow-2xl">
          {/* Location Bar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] text-xs text-slate-300">
            <div className="flex items-center gap-2 truncate">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{location.city || "NCR Metro"}</span>
            </div>
            <button
              onClick={() => detectCurrentLocation()}
              className="text-[11px] text-amber-400 font-medium underline underline-offset-2 shrink-0 ml-2"
            >
              {isLoadingGPS ? "..." : t("nav.gpsDetect")}
            </button>
          </div>

          {/* Mobile Language Switcher Row */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span>Language: {language === "en" ? "English" : "हिंदी"}</span>
            </div>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.1] text-amber-400 font-medium text-xs"
            >
              {language === "en" ? "हिंदी में बदलें" : "Switch to English"}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="grid gap-1 pt-1">
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-slate-200 hover:bg-white/[0.06] hover:text-white transition-colors flex items-center justify-between text-sm font-medium"
            >
              <span>{isHi ? "सभी सेवाएं व रेट कार्ड" : "All Services & Rates"}</span>
              <span className="text-slate-500">→</span>
            </Link>
            <Link
              to="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-slate-200 hover:bg-white/[0.06] hover:text-white transition-colors flex items-center justify-between text-sm font-medium"
            >
              <span>{isHi ? "रेट कार्ड गाइड" : "Transparent Pricing Guide"}</span>
              <span className="text-slate-500">→</span>
            </Link>
            <Link
              to="/technicians"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-slate-200 hover:bg-white/[0.06] hover:text-white transition-colors flex items-center justify-between text-sm font-medium"
            >
              <span>{isHi ? "सत्यापित मैकेनिक खोजें" : "Verified Mechanics"}</span>
              <span className="text-slate-500">→</span>
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-slate-200 hover:bg-white/[0.06] hover:text-white transition-colors flex items-center justify-between text-sm font-medium"
            >
              <span>{isHi ? "हमारे बारे में" : "About JantaGaraj"}</span>
              <span className="text-slate-500">→</span>
            </Link>
            <Link
              to="/help"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-slate-200 hover:bg-white/[0.06] hover:text-white transition-colors flex items-center justify-between text-sm font-medium"
            >
              <span>{isHi ? "सहायता व विवाद निवारण" : "Help Desk & Disputes"}</span>
              <span className="text-slate-500">→</span>
            </Link>
          </div>

          {!isAuthenticated && (
            <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal?.();
                }}
                className="w-full py-2.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-slate-200 font-medium text-xs flex items-center justify-center gap-1.5"
              >
                <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>{isHi ? "लॉग इन" : "Sign In"}</span>
              </button>
              <Link to="/services" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                <button
                  type="button"
                  className="w-full py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs uppercase tracking-wider shadow-md"
                >
                  {isHi ? "सर्विस बुक करें" : "Book a Service"}
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
