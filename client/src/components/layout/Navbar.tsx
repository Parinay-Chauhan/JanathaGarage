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
      setIsScrolled(window.scrollY > 20);
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
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "header-scrolled bg-[#F8F7F3]/85 dark:bg-[#040404]/85 backdrop-blur-xl border-b border-[#E7E5DF]/80 dark:border-[#2B231D]/80 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
          : "header-transparent bg-transparent border-b border-transparent shadow-none"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 transition-all duration-300 ${
          isScrolled ? "h-16" : "h-20"
        }`}
      >
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-11 h-11 rounded-2xl bg-[#E87532] flex items-center justify-center text-white shadow-orange-glow group-hover:scale-105 transition-transform duration-200">
            <Wrench className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-2xl font-extrabold font-display tracking-tight text-[#252621] dark:text-[#F5F2EB]">
              Janta<span className="text-[#E87532]">Garaj</span>
            </span>
            <span className="hidden sm:block text-[10px] tracking-wider uppercase font-semibold text-[#717167] dark:text-[#9E9488]">
              {t("nav.tagline")}
            </span>
          </div>
        </Link>

        {/* Location Selector (GPS / City) */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-[#141210]/70 backdrop-blur-md border border-[#E7E5DF]/80 dark:border-[#2B231D]/90 text-xs font-medium text-[#252621] dark:text-[#F5F2EB] shadow-subtle hover:border-[#E87532]/50 transition-all">
          <MapPin className="w-4 h-4 text-[#E87532] shrink-0" />
          <span className="max-w-[140px] truncate">{location.city}</span>
          <button
            onClick={() => detectCurrentLocation()}
            disabled={isLoadingGPS}
            className="text-[#E87532] font-semibold hover:underline text-[11px] disabled:opacity-50"
            title="Auto detect location via GPS"
          >
            {isLoadingGPS ? t("nav.detecting") : t("nav.gpsDetect")}
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#252621]/80 dark:text-[#F5F2EB]/80">
          <Link
            to="/services"
            className="hover:text-[#E87532] dark:hover:text-[#E87532] transition-colors relative py-1"
          >
            {t("nav.services")}
          </Link>
          <a
            href="/#how-it-works"
            className="hover:text-[#E87532] dark:hover:text-[#E87532] transition-colors relative py-1"
          >
            {t("nav.howItWorks")}
          </a>
          <Link
            to="/technicians"
            className="hover:text-[#E87532] dark:hover:text-[#E87532] transition-colors relative py-1"
          >
            {t("nav.technicians")}
          </Link>
          <Link
            to="/help"
            className="hover:text-[#E87532] dark:hover:text-[#E87532] transition-colors relative py-1"
          >
            {t("nav.help")}
          </Link>
        </nav>

        {/* Right Section Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E7E5DF]/80 dark:border-[#2B231D]/90 bg-white/70 dark:bg-[#141210]/70 backdrop-blur-md hover:border-[#E87532]/50 text-xs font-bold text-[#252621] dark:text-[#F5F2EB] transition-all shadow-subtle active:scale-95"
            title="भाषा बदलें / Switch Language"
            aria-label="Toggle between Hindi and English"
          >
            <Languages className="w-4 h-4 text-[#E87532] shrink-0" />
            <span className={language === "hi" ? "text-[#E87532] font-extrabold" : ""}>
              {language === "en" ? "हिंदी" : "English"}
            </span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-[#717167] hover:text-[#252621] dark:text-[#9E9488] dark:hover:text-[#F5F2EB] bg-white/70 dark:bg-[#141210]/70 backdrop-blur-md border border-[#E7E5DF]/80 dark:border-[#2B231D]/90 hover:border-[#E87532]/50 transition-all shadow-subtle"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* User Auth / Profile Dropdown */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E87532]/10 hover:bg-[#E87532]/20 text-[#E87532] font-black flex items-center justify-center text-sm border border-[#E87532]/30 hover:border-[#E87532] transition-all shadow-subtle active:scale-95 focus:outline-none ring-2 ring-transparent hover:ring-[#E87532]/20"
                title={user.fullName}
                aria-label="User Profile Menu"
              >
                {user.fullName.charAt(0).toUpperCase()}
              </button>

              {/* Profile Menu Popup */}
              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#141210] p-2 shadow-premium border border-[#E7E5DF] dark:border-[#2B231D] text-sm z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-[#E7E5DF] dark:border-[#2B231D] mb-1">
                    <p className="font-bold text-[#252621] dark:text-[#F5F2EB] truncate">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-[#717167] dark:text-[#9E9488]">
                      {user.phone}
                    </p>
                  </div>

                  <Link
                    to={getDashboardLink()}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#252621] dark:text-[#F5F2EB] hover:bg-[#F8F7F3] dark:hover:bg-[#1A1613] transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#E87532]" />
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
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#252621] dark:text-[#F5F2EB] hover:bg-[#F8F7F3] dark:hover:bg-[#1A1613] transition-colors"
                    >
                      <CalendarCheck className="w-4 h-4 text-[#E87532]" />
                      <span>{t("nav.customerDashboard")}</span>
                    </Link>
                  )}

                  {user.role === "ADMIN" && (
                    <Link
                      to="/admin/technicians/verification"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#252621] dark:text-[#F5F2EB] hover:bg-[#F8F7F3] dark:hover:bg-[#1A1613] transition-colors"
                    >
                      <ShieldAlert className="w-4 h-4 text-[#E87532]" />
                      <span>KYC Verification</span>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left mt-1 border-t border-[#E7E5DF] dark:border-[#2B231D]"
                  >
                    <LogOut className="w-4 h-4" />
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
                leftIcon={<UserIcon className="w-3.5 h-3.5" />}
                onClick={onOpenAuthModal}
                className="hidden sm:inline-flex bg-white/70 dark:bg-[#141210]/70 backdrop-blur-md border-[#E7E5DF]/80 dark:border-[#2B231D]/90 text-[#252621] dark:text-[#F5F2EB] hover:bg-white dark:hover:bg-[#1A1613] hover:border-[#E87532]/50 shadow-subtle"
              >
                {t("nav.login")}
              </Button>
              <Link to="/services">
                <Button
                  variant="primary"
                  size="sm"
                  className="shadow-orange-glow font-bold"
                >
                  {t("nav.bookService")}
                </Button>
              </Link>
            </div>
          )}

          {/* If authenticated, also keep the fast Book CTA accessible */}
          {isAuthenticated && (
            <Link to="/services" className="hidden sm:block">
              <Button
                variant="primary"
                size="sm"
                className="shadow-orange-glow font-bold"
              >
                {t("nav.bookService")}
              </Button>
            </Link>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-[#252621] dark:text-[#F5F2EB] bg-white/70 dark:bg-[#141210]/70 backdrop-blur-md border border-[#E7E5DF]/80 dark:border-[#2B231D]/90 hover:border-[#E87532]/50 shadow-subtle"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E7E5DF] dark:border-[#2B231D] bg-[#F8F7F3]/95 dark:bg-[#040404]/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] text-xs font-medium text-[#252621] dark:text-[#F5F2EB]">
            <MapPin className="w-4 h-4 text-[#E87532] shrink-0" />
            <span className="truncate">{location.city} - {location.address}</span>
          </div>

          {/* Mobile Language Switcher Row */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#252621] dark:text-[#F5F2EB]">
              <Languages className="w-4 h-4 text-[#E87532]" />
              <span>Language / भाषा</span>
            </div>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-xl bg-[#E87532] text-white font-bold text-xs shadow-orange-glow"
            >
              {language === "en" ? "हिंदी में बदलें" : "Switch to English"}
            </button>
          </div>

          <div className="grid gap-2">
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl font-medium text-[#252621] dark:text-[#F5F2EB] hover:bg-white dark:hover:bg-[#141210] transition-colors"
            >
              {t("nav.allServices")}
            </Link>
            <Link
              to="/technicians"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl font-medium text-[#252621] dark:text-[#F5F2EB] hover:bg-white dark:hover:bg-[#141210] transition-colors"
            >
              {t("nav.findMechanics")}
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl font-medium text-[#252621] dark:text-[#F5F2EB] hover:bg-white dark:hover:bg-[#141210] transition-colors"
            >
              {t("nav.aboutUs")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
