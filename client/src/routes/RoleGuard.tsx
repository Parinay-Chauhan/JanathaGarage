import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { UserRole } from "../types/api.types";
import { ShieldAlert, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/Button";
import { setCredentials } from "../features/auth/authSlice";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    const targetRole = allowedRoles[0] || "TECHNICIAN";

    const handleSwitchRole = () => {
      dispatch(
        setCredentials({
          user: {
            ...user,
            role: targetRole,
            fullName: targetRole === "TECHNICIAN" ? "Vikramjit Singh (Partner)" : user.fullName,
            technicianProfile: {
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
            },
          },
          accessToken: "dev_switch_token",
        })
      );
    };

    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center border border-rose-200 dark:border-rose-900">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold font-display text-[#252621] dark:text-white">
            Role Access Restricted
          </h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-md text-sm">
            Your current logged-in role is <strong>{user.role}</strong>. This portal requires{" "}
            <strong>{allowedRoles.join(" or ")}</strong> authorization.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button variant="outline" size="sm" onClick={() => window.history.back()}>
            Go Back
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSwitchRole}
            className="font-bold shadow-orange-glow"
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Switch to {targetRole} Mode (Dev Preview)
          </Button>
        </div>
      </div>
    );
  }

  return children ? <>{children}</> : <Outlet />;
};
