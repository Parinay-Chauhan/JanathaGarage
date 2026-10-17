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
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logOut } from "../../features/auth/authSlice";
import { useTheme } from "../../context/ThemeContext";
import { Badge } from "../ui/Badge";

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
    { label: "Overview", path: "/customer/dashboard", icon: LayoutDashboard },
    { label: "My Bookings", path: "/customer/bookings", icon: CalendarCheck },
    { label: "My Profile", path: "/customer/profile", icon: User },
  ];

  const technicianLinks = [
    { label: "Live Job Radar", path: "/technician/dashboard", icon: LayoutDashboard },
    { label: "My Assigned Jobs", path: "/technician/jobs", icon: Briefcase },
    { label: "Pricing & Services", path: "/technician/services", icon: Sliders },
    { label: "Earnings & Stats", path: "/technician/earnings", icon: DollarSign },
    { label: "KYC & Profile", path: "/technician/profile", icon: ShieldCheck },
  ];

  const adminLinks = [
    { label: "Analytics Overview", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "KYC Verification", path: "/admin/technicians/verification", icon: ShieldCheck },
    { label: "All Bookings", path: "/admin/bookings", icon: CalendarCheck },
    { label: "User Directory", path: "/admin/users", icon: Users },
  ];

  const currentLinks =
    user?.role === "ADMIN"
      ? adminLinks
      : user?.role === "TECHNICIAN"
      ? technicianLinks
      : customerLinks;

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 flex transition-colors">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-stone-200/80 dark:border-stone-800">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-glow">
                <Wrench className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-extrabold font-display tracking-tight text-stone-900 dark:text-white">
                Janta<span className="text-brand-500">Garaj</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Role Card */}
          <div className="p-4 m-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60">
            <div className="flex items-center justify-between mb-2">
              <Badge status={user?.role} size="sm" />
              <span className="text-[10px] text-stone-400 font-medium">Session Active</span>
            </div>
            <p className="font-bold text-stone-900 dark:text-white text-sm truncate">
              {user?.fullName || "Authenticated User"}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
              {user?.phone}
            </p>
          </div>

          {/* Links */}
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
                      ? "bg-brand-500 text-white shadow-glow font-semibold"
                      : "text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-brand-500"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-stone-200/80 dark:border-stone-800 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Storefront</span>
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
        <header className="h-20 bg-white dark:bg-stone-900 border-b border-stone-200/80 dark:border-stone-800 px-4 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold font-display text-stone-900 dark:text-white capitalize">
              {location.pathname.split("/").filter(Boolean).join(" · ")}
            </h1>
          </div>

          <div className="flex items-center gap-3">
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
