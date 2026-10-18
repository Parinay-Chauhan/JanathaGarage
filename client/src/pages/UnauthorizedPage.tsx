import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShieldAlert, RefreshCw, ArrowLeft, Home, LifeBuoy, Wrench } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCredentials } from "../features/auth/authSlice";
import { UserRole } from "../types/api.types";

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  // Extract query params if passed: ?requiredRole=ADMIN
  const searchParams = new URLSearchParams(location.search);
  const requiredRole = (searchParams.get("requiredRole") as UserRole) || "ADMIN";

  const handleSwitchRole = (targetRole: UserRole) => {
    if (!user) return;
    dispatch(
      setCredentials({
        user: {
          ...user,
          role: targetRole,
          fullName:
            targetRole === "TECHNICIAN"
              ? "Vikramjit Singh (Partner)"
              : targetRole === "ADMIN"
              ? "System Super Admin"
              : user.fullName,
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
    // After switching role, reload or navigate
    if (targetRole === "ADMIN") navigate("/admin/dashboard");
    else if (targetRole === "TECHNICIAN") navigate("/technician/dashboard");
    else navigate("/customer/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] dark:bg-[#191A16] text-[#252621] dark:text-[#F5F2EB] flex flex-col justify-between selection:bg-[#E87532] selection:text-white">
      {/* Top Header */}
      <header className="h-20 max-w-7xl mx-auto w-full px-4 sm:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#E87532] flex items-center justify-center text-white shadow-orange-glow">
            <Wrench className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-xl font-extrabold font-display tracking-tight text-[#252621] dark:text-white">
            Janta<span className="text-[#E87532]">Garaj</span>
          </span>
        </Link>
        <Link
          to="/help"
          className="text-xs font-semibold text-stone-500 hover:text-[#E87532] dark:text-stone-400 flex items-center gap-1.5"
        >
          <LifeBuoy className="w-4 h-4" />
          <span>Support Desk</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12 text-center flex-1 flex flex-col items-center justify-center">
        {/* Shield graphic */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-6 shadow-xl shadow-rose-600/10 animate-bounce">
          <ShieldAlert className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2]" />
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-900 mb-3 tracking-wider uppercase">
          403 Restricted Clearance
        </span>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-[#252621] dark:text-white mb-3">
          Access Denied
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto mb-6 leading-relaxed">
          {user ? (
            <>
              You are currently authenticated as <strong>{user.fullName || user.email}</strong> with role{" "}
              <span className="px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-800 font-mono font-bold text-xs">
                {user.role}
              </span>
              . This secure area requires <strong>{requiredRole}</strong> privileges.
            </>
          ) : (
            "You must be logged in with appropriate administrative privileges to view this page."
          )}
        </p>

        {/* Developer Sandbox Bypass Pill */}
        {user && (
          <div className="w-full max-w-md p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 mb-8 text-left space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
              <RefreshCw className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: "6s" }} />
              <span>Developer Preview Quick Switch</span>
            </div>
            <p className="text-[11px] text-amber-700/80 dark:text-amber-300/80">
              For frontend evaluation, you can switch your active session identity with one click:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSwitchRole("ADMIN")}
                className="text-xs font-bold border-amber-300 dark:border-amber-800 bg-white dark:bg-[#1A1613]"
              >
                Switch to ADMIN
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSwitchRole("TECHNICIAN")}
                className="text-xs font-bold border-amber-300 dark:border-amber-800 bg-white dark:bg-[#1A1613]"
              >
                Switch to MECHANIC
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSwitchRole("CUSTOMER")}
                className="text-xs font-bold border-amber-300 dark:border-amber-800 bg-white dark:bg-[#1A1613]"
              >
                Switch to CUSTOMER
              </Button>
            </div>
          </div>
        )}

        {/* Navigation CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate(-1)}
            className="border-[#E7E5DF] dark:border-[#2B231D] text-xs sm:text-sm font-semibold"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Go Back
          </Button>

          <Link to="/">
            <Button
              variant="primary"
              size="md"
              className="shadow-orange-glow font-bold text-xs sm:text-sm"
              leftIcon={<Home className="w-4 h-4" />}
            >
              Return to Home
            </Button>
          </Link>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="h-16 text-center text-xs text-stone-400 border-t border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-center">
        © {new Date().getFullYear()} JantaGaraj · Security & Access Control
      </footer>
    </div>
  );
};
