import React, { useState } from "react";
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
    <header className="sticky top-0 z-40 w-full glass-panel dark:glass-panel-dark border-b border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform duration-200">
            <Wrench className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-2xl font-extrabold font-display tracking-tight text-stone-900 dark:text-white">
              Janta<span className="text-brand-500">Garaj</span>
            </span>
            <span className="hidden sm:block text-[10px] tracking-wider uppercase font-semibold text-stone-600 dark:text-stone-300">
              {t("nav.tagline")}
            </span>
          </div>
        </Link>

        {/* Location Selector (GPS / City) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100/90 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300">
          <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
          <span className="max-w-[140px] truncate">{location.city}</span>
          <button
            onClick={() => detectCurrentLocation()}
            disabled={isLoadingGPS}
            className="text-brand-500 font-semibold hover:underline text-[11px] disabled:opacity-50"
            title="Auto detect location via GPS"
          >
            {isLoadingGPS ? t("nav.detecting") : t("nav.gpsDetect")}
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-stone-600 dark:text-stone-300">
          <Link
            to="/services"
            className="hover:text-brand-500 transition-colors"
          >
            {t("nav.allServices")}
          </Link>
          <Link
            to="/technicians"
            className="hover:text-brand-500 transition-colors"
          >
            {t("nav.findMechanics")}
          </Link>
          <Link
            to="/about"
            className="hover:text-brand-500 transition-colors"
          >
            {t("nav.aboutUs")}
          </Link>
        </nav>

        {/* Right Section Actions */}
        <div className="flex items-center gap-2.5">
          {/* Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-900/60 hover:bg-stone-100 dark:hover:bg-stone-800 hover:border-brand-500/50 text-xs font-bold text-stone-700 dark:text-stone-200 transition-all shadow-sm active:scale-95"
            title="भाषा बदलें / Switch Language"
            aria-label="Toggle between Hindi and English"
          >
            <Languages className="w-4 h-4 text-brand-500 shrink-0" />
            <span className={language === "hi" ? "text-brand-600 dark:text-brand-400 font-extrabold" : ""}>
              {language === "en" ? "हिंदी" : "English"}
            </span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
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
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800/80 transition-colors border border-transparent hover:border-stone-200 dark:hover:border-stone-700"
              >
                <div className="w-9 h-9 rounded-full bg-brand-500/10 text-brand-500 font-bold flex items-center justify-center text-sm border border-brand-500/20">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left text-xs">
                  <p className="font-bold text-stone-900 dark:text-white leading-tight">
                    {user.fullName}
                  </p>
                  <p className="text-[10px] text-brand-500 font-semibold tracking-wider uppercase">
                    {user.role}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {/* Profile Menu Popup */}
              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-stone-900 p-2 shadow-2xl border border-stone-200 dark:border-stone-800 text-sm z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-stone-100 dark:border-stone-800 mb-1">
                    <p className="font-bold text-stone-900 dark:text-white truncate">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {user.phone}
                    </p>
                  </div>

                  <Link
                    to={getDashboardLink()}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-brand-500" />
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
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                      <CalendarCheck className="w-4 h-4 text-brand-500" />
                      <span>{t("nav.customerDashboard")}</span>
                    </Link>
                  )}

                  {user.role === "ADMIN" && (
                    <Link
                      to="/admin/technicians/verification"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                      <ShieldAlert className="w-4 h-4 text-brand-500" />
                      <span>KYC Verification</span>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left mt-1 border-t border-stone-100 dark:border-stone-800"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t("nav.logout")}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<UserIcon className="w-4 h-4" />}
              onClick={onOpenAuthModal}
            >
              {t("nav.login")}
            </Button>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
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
        <div className="lg:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 pt-4 pb-6 space-y-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300">
            <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
            <span className="truncate">{location.city} - {location.address}</span>
          </div>

          {/* Mobile Language Switcher Row */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-100/80 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-700 dark:text-stone-300">
              <Languages className="w-4 h-4 text-brand-500" />
              <span>Language / भाषा</span>
            </div>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-xl bg-brand-500 text-white font-bold text-xs shadow-glow"
            >
              {language === "en" ? "हिंदी में बदलें" : "Switch to English"}
            </button>
          </div>

          <div className="grid gap-2">
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              {t("nav.allServices")}
            </Link>
            <Link
              to="/technicians"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              {t("nav.findMechanics")}
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              {t("nav.aboutUs")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
