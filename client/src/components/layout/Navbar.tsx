import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wrench,
  MapPin,
  Sun,
  Moon,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Menu,
  X,
  LayoutDashboard,
  CalendarCheck,
  ShieldAlert,
  Languages,
  Radio,
  Clock,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logOut } from "../../features/auth/authSlice";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { useLocation } from "../../context/LocationContext";
import { Button } from "../ui/Button";

interface NavbarProps {
  onOpenAuthModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuthModal }) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { location, detectCurrentLocation, isLoadingGPS } = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled || mobileMenuOpen
          ? "header-scrolled bg-[#0b0f17]/95 backdrop-blur-md border-b border-slate-800"
          : "header-transparent bg-[#0b0f17]/80 backdrop-blur-sm border-b border-slate-800/80"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 transition-all duration-200 ${
          isScrolled ? "h-16" : "h-18 sm:h-20"
        }`}
      >
        {/* Brand Mark */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold group-hover:scale-105 transition-transform">
            <Wrench className="w-5 h-5 stroke-[2.4]" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
              Janta<span className="text-amber-400">Garaj</span>
            </span>
            <span className="hidden sm:block text-[9px] font-mono tracking-wider uppercase text-slate-400">
              {t("nav.tagline")}
            </span>
          </div>
        </Link>

        {/* Diagnostic Geo-Zone Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1f2937] border border-slate-800 text-xs font-mono text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="max-w-[130px] truncate text-white">{location.city}</span>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => detectCurrentLocation()}
            disabled={isLoadingGPS}
            className="text-amber-400 hover:text-amber-300 font-semibold text-[10px] disabled:opacity-50 transition-colors uppercase"
            title="Auto detect location via GPS"
          >
            {isLoadingGPS ? "..." : t("nav.gpsDetect")}
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-mono font-medium text-slate-300">
          <Link
            to="/services"
            className="hover:text-amber-400 transition-colors uppercase tracking-wider py-1"
          >
            {t("nav.services")}
          </Link>
          <a
            href="/#how-it-works"
            className="hover:text-amber-400 transition-colors uppercase tracking-wider py-1"
          >
            {t("nav.howItWorks")}
          </a>
          <Link
            to="/technicians"
            className="hover:text-amber-400 transition-colors uppercase tracking-wider py-1"
          >
            {t("nav.technicians")}
          </Link>
          <Link
            to="/pricing"
            className="hover:text-amber-400 transition-colors uppercase tracking-wider py-1"
          >
            Rate Card
          </Link>
          <Link
            to="/help"
            className="hover:text-amber-400 transition-colors uppercase tracking-wider py-1"
          >
            {t("nav.help")}
          </Link>
        </nav>

        {/* Right Section Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Live Fleet Beacon (Desktop) */}
          <div className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>RADAR: ACTIVE</span>
          </div>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-[#1f2937] hover:border-slate-700 text-xs font-mono font-semibold text-slate-300 hover:text-white transition-colors"
            title="भाषा बदलें / Switch Language"
            aria-label="Toggle between Hindi and English"
          >
            <Languages className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className={language === "hi" ? "text-amber-400 font-bold" : ""}>
              {language === "en" ? "हिंदी" : "English"}
            </span>
          </button>

          {/* User Auth / Profile Dropdown */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="w-9 h-9 rounded-lg bg-[#1f2937] border border-amber-500/40 text-amber-400 font-mono font-bold flex items-center justify-center text-xs hover:border-amber-400 transition-colors focus:outline-none"
                title={user.fullName}
                aria-label="User Profile Menu"
              >
                {user.fullName.charAt(0).toUpperCase()}
              </button>

              {/* Profile Menu Popup */}
              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-[#1f2937] p-2 border border-slate-800 text-xs font-mono z-50 shadow-2xl"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-800 mb-1">
                    <p className="font-bold text-white truncate">
                      {user.fullName}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {user.phone}
                    </p>
                    <span className="mt-1 inline-block text-[10px] px-1.5 py-0.2 rounded bg-cyan-950/70 text-cyan-400 border border-cyan-500/30 font-bold uppercase">
                      {user.role}
                    </span>
                  </div>

                  <Link
                    to={getDashboardLink()}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-200 hover:bg-[#111827] hover:text-amber-400 transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {user.role === "ADMIN"
                        ? t("nav.adminDashboard")
                        : user.role === "TECHNICIAN"
                        ? t("nav.technicianDashboard")
                        : t("nav.customerDashboard")}
                    </span>
                  </Link>

                  {user.role === "CUSTOMER" && (
                    <Link
                      to="/customer/bookings"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-200 hover:bg-[#111827] hover:text-amber-400 transition-colors"
                    >
                      <CalendarCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Work Orders</span>
                    </Link>
                  )}

                  {user.role === "ADMIN" && (
                    <Link
                      to="/admin/technicians/verification"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-200 hover:bg-[#111827] hover:text-cyan-400 transition-colors"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                      <span>KYC Verification</span>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-950/30 transition-colors text-left mt-1 border-t border-slate-800"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t("nav.logout")}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<UserIcon className="w-3.5 h-3.5 text-slate-400" />}
                onClick={onOpenAuthModal}
                className="hidden sm:inline-flex bg-[#1f2937] border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 rounded-lg text-xs font-mono uppercase px-3 py-1.5"
              >
                {t("nav.login")}
              </Button>
              <Link to="/services">
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider"
                >
                  {t("nav.bookService")}
                </Button>
              </Link>
            </div>
          )}

          {/* Book Now Quick CTA (Logged in) */}
          {isAuthenticated && (
            <Link to="/services" className="hidden sm:block">
              <Button
                variant="primary"
                size="sm"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider"
              >
                {t("nav.bookService")}
              </Button>
            </Link>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 bg-[#1f2937] border border-slate-800 hover:border-slate-700"
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0b0f17] px-4 pt-3 pb-5 space-y-3">
          {/* Location Bar */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1f2937] border border-slate-800 text-xs font-mono text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{location.city} - {location.address}</span>
          </div>

          {/* Mobile Language Switcher Row */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#1f2937] border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span>Language: {language === "en" ? "English" : "हिंदी"}</span>
            </div>
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-mono font-semibold text-xs uppercase"
            >
              {language === "en" ? "हिंदी" : "English"}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="grid gap-1.5 text-xs font-mono uppercase">
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-[#1f2937] hover:text-amber-400 transition-colors flex items-center justify-between"
            >
              <span>{t("nav.allServices")}</span>
              <span className="text-slate-500 font-mono">→</span>
            </Link>
            <Link
              to="/technicians"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-[#1f2937] hover:text-amber-400 transition-colors flex items-center justify-between"
            >
              <span>{t("nav.findMechanics")}</span>
              <span className="text-slate-500 font-mono">→</span>
            </Link>
            <Link
              to="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-[#1f2937] hover:text-amber-400 transition-colors flex items-center justify-between"
            >
              <span>Rate Card</span>
              <span className="text-slate-500 font-mono">→</span>
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-[#1f2937] hover:text-amber-400 transition-colors flex items-center justify-between"
            >
              <span>{t("nav.aboutUs")}</span>
              <span className="text-slate-500 font-mono">→</span>
            </Link>
            <Link
              to="/help"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-[#1f2937] hover:text-amber-400 transition-colors flex items-center justify-between"
            >
              <span>{t("nav.help")}</span>
              <span className="text-slate-500 font-mono">→</span>
            </Link>
          </div>

          {!isAuthenticated && (
            <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal?.();
                }}
                className="w-full bg-[#1f2937] border-slate-800 text-slate-200 text-xs font-mono uppercase"
              >
                {t("nav.login")}
              </Button>
              <Link to="/services" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs font-mono uppercase"
                >
                  {t("nav.bookService")}
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
