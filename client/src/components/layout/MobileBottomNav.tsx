import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Wrench,
  CalendarCheck,
  User,
  Radio,
  Briefcase,
  LayoutDashboard,
  ShieldCheck,
  Users,
  DollarSign,
} from "lucide-react";
import { useAppSelector } from "../../app/hooks";
import { clsx } from "clsx";

interface MobileBottomNavProps {
  onOpenAuthModal?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenAuthModal }) => {
  const location = useLocation();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // Storefront / Customer tabs
  const customerTabs = [
    { label: "Home", path: "/", icon: Home },
    { label: "Services", path: "/services", icon: Wrench },
    {
      label: "Bookings",
      path: "/customer/bookings",
      icon: CalendarCheck,
      requiresAuth: true,
    },
    {
      label: "Account",
      path: isAuthenticated ? "/customer/profile" : "#login",
      icon: User,
      requiresAuth: true,
    },
  ];

  // Technician tabs
  const technicianTabs = [
    { label: "Radar", path: "/technician/dashboard", icon: Radio },
    { label: "Jobs", path: "/technician/jobs", icon: Briefcase },
    { label: "Duty", path: "/technician/availability", icon: LayoutDashboard },
    { label: "Profile", path: "/technician/profile", icon: User },
  ];

  // Admin tabs
  const adminTabs = [
    { label: "Overview", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "KYC Desk", path: "/admin/technicians/verification", icon: ShieldCheck },
    { label: "Bookings", path: "/admin/bookings", icon: CalendarCheck },
    { label: "Users", path: "/admin/users", icon: Users },
  ];

  // Determine current tab group based on route or user role
  const isTechnicianRoute = location.pathname.startsWith("/technician");
  const isAdminRoute = location.pathname.startsWith("/admin");

  const currentTabs = isAdminRoute
    ? adminTabs
    : isTechnicianRoute
    ? technicianTabs
    : customerTabs;

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#1A1613]/95 backdrop-blur-md border-t border-[#E7E5DF] dark:border-[#2B231D] px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {currentTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(tab.path);

          const handleClick = (e: React.MouseEvent) => {
            if (tab.path === "#login" || (tab.requiresAuth && !isAuthenticated)) {
              e.preventDefault();
              if (onOpenAuthModal) onOpenAuthModal();
            }
          };

          return (
            <Link
              key={tab.label}
              to={tab.path === "#login" ? "#" : tab.path}
              onClick={handleClick}
              className={clsx(
                "flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 min-w-[60px]",
                isActive
                  ? "text-[#E87532] font-bold"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 font-medium"
              )}
            >
              <div className="relative">
                <Icon
                  className={clsx(
                    "w-5 h-5 transition-transform duration-200",
                    isActive && "scale-110 stroke-[2.4]"
                  )}
                />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#E87532]" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 leading-none">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
