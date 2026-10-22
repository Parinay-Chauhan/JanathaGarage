import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Wrench,
  LayoutDashboard,
  CalendarCheck,
  User,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Users,
  Briefcase,
  Sliders,
  DollarSign,
  ArrowLeft,
  Sun,
  Moon,
  HelpCircle,
  ExternalLink,
  MapPin,
  Radio,
  Phone,
  ChevronRight,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logOut } from "../../features/auth/authSlice";
import { useTheme } from "../../context/ThemeContext";
import { Badge } from "../ui/Badge";

const formatPhoneNumber = (rawPhone?: string) => {
  if (!rawPhone) return "No phone registered";
  const clean = rawPhone.replace(/\D/g, "");
  if (clean.length === 10) {
    return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
  }
  if (clean.length === 12 && clean.startsWith("91")) {
    return `+91 ${clean.slice(2, 7)} ${clean.slice(7)}`;
  }
  return rawPhone;
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  // Define role-specific navigation links
  const customerLinks = [
    { label: "Dashboard", path: "/customer/dashboard", icon: LayoutDashboard },
    { label: "My Bookings", path: "/customer/bookings", icon: CalendarCheck },
    { label: "Saved Addresses", path: "/customer/addresses", icon: MapPin },
    { label: "Book a Service", path: "/services", icon: Wrench },
    { label: "My Profile", path: "/customer/profile", icon: User },
    { label: "Help & Support", path: "/help", icon: HelpCircle },
  ];

  const technicianLinks = [
    { label: "Live Job Radar", path: "/technician/dashboard", icon: LayoutDashboard },
    { label: "My Assigned Jobs", path: "/technician/jobs", icon: Briefcase },
    { label: "Availability & Zones", path: "/technician/availability", icon: Radio },
    { label: "Pricing & Services", path: "/technician/services", icon: Sliders },
    { label: "Earnings & Stats", path: "/technician/earnings", icon: DollarSign },
    { label: "KYC & Profile", path: "/technician/profile", icon: ShieldCheck },
  ];

  const adminLinks = [
    { label: "Executive Overview", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "KYC Verification", path: "/admin/technicians/verification", icon: ShieldCheck },
    { label: "All Bookings", path: "/admin/bookings", icon: CalendarCheck },
    { label: "User Directory", path: "/admin/users", icon: Users },
    { label: "Payments Ledger", path: "/admin/payments", icon: DollarSign },
  ];

  const currentLinks =
    user?.role === "ADMIN"
      ? adminLinks
      : user?.role === "TECHNICIAN"
      ? technicianLinks
      : customerLinks;

  return (
    <div className="min-h-screen bg-[#F8F7F3] dark:bg-[#040404] text-[#252621] dark:text-[#F5F2EB] flex transition-colors">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#040404]/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#0D0D0D] border-r border-[#E7E5DF] dark:border-[#2B231D] flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-[#E7E5DF] dark:border-[#2B231D]">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E87532] flex items-center justify-center text-white shadow-orange-glow">
                <Wrench className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-extrabold font-display tracking-tight text-[#252621] dark:text-white">
                Janta<span className="text-[#E87532]">Garaj</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Card */}
          <Link
            to={
              user?.role === "TECHNICIAN"
                ? "/technician/profile"
                : user?.role === "ADMIN"
                ? "/admin/dashboard"
                : "/customer/profile"
            }
            onClick={() => setSidebarOpen(false)}
            className="block p-4 mx-4 my-3 rounded-2xl bg-gradient-to-br from-white via-[#FCFBF9] to-[#FFF6EE] dark:from-[#171411] dark:via-[#14110E] dark:to-[#1C1611] border border-[#E7E5DF] dark:border-[#2D231B] shadow-sm hover:border-[#FF771C]/50 hover:shadow-card-hover dark:hover:border-[#FF771C]/40 transition-all duration-200 group"
          >
            {/* Top Status Bar */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span
                className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1 ${
                  user?.role === "ADMIN"
                    ? "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                    : user?.role === "TECHNICIAN"
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                    : "bg-[#FFF2E8] dark:bg-[#2B1B10] text-[#FF771C] border-[#FFD9C2] dark:border-[#422615]"
                }`}
              >
                {user?.role || "CUSTOMER"}
              </span>

              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 inline-flex items-center gap-1.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] shadow-[0_0_8px_#00E599] animate-pulse" />
                <span>Active</span>
              </span>
            </div>

            {/* Profile Avatar & Details */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF771C] to-[#E56814] text-white font-extrabold text-base flex items-center justify-center shrink-0 shadow-md shadow-[#FF771C]/25 border border-white/20 transition-transform group-hover:scale-105">
                {(user?.fullName || "U").charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <p className="font-extrabold text-sm text-[#252621] dark:text-[#F5F2EB] capitalize truncate group-hover:text-[#FF771C] transition-colors">
                    {user?.fullName || "Authenticated User"}
                  </p>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                </div>
                <p className="text-[11px] font-mono font-medium text-[#717167] dark:text-[#9E9488] flex items-center gap-1 truncate mt-0.5">
                  <Phone className="w-2.5 h-2.5 text-[#FF771C] shrink-0" />
                  <span>{formatPhoneNumber(user?.phone)}</span>
                </p>
              </div>

              <ChevronRight className="w-4 h-4 text-[#8F8F85] group-hover:text-[#FF771C] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="px-4 space-y-1.5 mt-2">
            {currentLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-[#E87532] text-white shadow-orange-glow font-semibold"
                      : "text-stone-600 dark:text-stone-300 hover:bg-[#F8F7F3] dark:hover:bg-[#2A2B24] hover:text-[#252621] dark:hover:text-white"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-[#E87532]"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-[#E7E5DF] dark:border-[#2B231D] space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-[#F8F7F3] dark:hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Storefront</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-20 bg-white/90 dark:bg-[#141516]/90 backdrop-blur-md border-b border-[#E7E5DF] dark:border-[#2B231D] px-4 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-[#F8F7F3] dark:hover:bg-white/5"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold font-display text-[#252621] dark:text-white capitalize">
                {location.pathname === "/customer/dashboard"
                  ? "Customer Console"
                  : location.pathname.split("/").filter(Boolean).slice(1).join(" · ") || "Dashboard"}
              </h1>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 hidden sm:block">
                Doorstep services, emergency dispatch, and booking management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/services"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-orange-50 text-[#E87532] border border-orange-200 hover:bg-orange-100 transition-colors"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Book a Service</span>
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-[#F8F7F3] dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </header>

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
