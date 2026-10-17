import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { RoleGuard, ProtectedRoute } from "./RoleGuard";
import { AuthModal } from "../features/auth/components/AuthModal";

// Public Pages
import { LandingPage } from "../pages/LandingPage";
import { ServicesPage } from "../pages/ServicesPage";
import { TechniciansPage } from "../pages/TechniciansPage";
import { AboutPage } from "../pages/AboutPage";

// Customer Pages
import { CustomerDashboardPage } from "../features/customer/pages/CustomerDashboardPage";
import { CustomerBookingsPage } from "../features/customer/pages/CustomerBookingsPage";
import { BookingDetailsPage } from "../features/bookings/pages/BookingDetailsPage";
import { CustomerProfilePage } from "../features/customer/pages/CustomerProfilePage";

// Technician Pages
import { TechnicianDashboardPage } from "../features/technician-dashboard/pages/TechnicianDashboardPage";
import { TechnicianJobsPage } from "../features/technician-dashboard/pages/TechnicianJobsPage";
import { TechnicianProfilePage } from "../features/technician-dashboard/pages/TechnicianProfilePage";
import { TechnicianServicesPage } from "../features/technician-dashboard/pages/TechnicianServicesPage";
import { TechnicianEarningsPage } from "../features/technician-dashboard/pages/TechnicianEarningsPage";

// Admin Pages
import { AdminDashboardPage } from "../features/admin/pages/AdminDashboardPage";
import { AdminKYCVerificationPage } from "../features/admin/pages/AdminKYCVerificationPage";
import { AdminBookingsPage } from "../features/admin/pages/AdminBookingsPage";

export const AppRoutes: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      <Routes>
        {/* Public Storefront Routes with Navbar & Footer */}
        <Route
          path="/"
          element={
            <>
              <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />
              <main className="min-h-screen">
                <LandingPage onOpenAuthModal={() => setAuthModalOpen(true)} />
              </main>
              <Footer />
            </>
          }
        />

        <Route
          path="/services"
          element={
            <>
              <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />
              <main className="min-h-screen">
                <ServicesPage onOpenAuthModal={() => setAuthModalOpen(true)} />
              </main>
              <Footer />
            </>
          }
        />

        <Route
          path="/technicians"
          element={
            <>
              <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />
              <main className="min-h-screen">
                <TechniciansPage />
              </main>
              <Footer />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />
              <main className="min-h-screen">
                <AboutPage />
              </main>
              <Footer />
            </>
          }
        />

        {/* Customer Role Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["CUSTOMER", "ADMIN"]}>
                <DashboardLayout>
                  <CustomerDashboardPage />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
          path="/customer/dashboard"
        />

        <Route
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["CUSTOMER", "ADMIN"]}>
                <DashboardLayout>
                  <CustomerBookingsPage />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
          path="/customer/bookings"
        />

        <Route
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["CUSTOMER", "TECHNICIAN", "ADMIN"]}>
                <DashboardLayout>
                  <BookingDetailsPage />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
          path="/customer/bookings/:id"
        />

        <Route
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["CUSTOMER", "ADMIN"]}>
                <DashboardLayout>
                  <CustomerProfilePage />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
          path="/customer/profile"
        />

        {/* Technician Role Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["TECHNICIAN", "ADMIN"]}>
                <DashboardLayout>
                  <TechnicianDashboardPage />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
          path="/technician/dashboard"
        />

        <Route
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["TECHNICIAN", "ADMIN"]}>
                <DashboardLayout>
                  <TechnicianJobsPage />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
          path="/technician/jobs"
        />

        <Route
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["TECHNICIAN", "ADMIN"]}>
                <DashboardLayout>
                  <TechnicianServicesPage />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
          path="/technician/services"
        />

        <Route
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["TECHNICIAN", "ADMIN"]}>
                <DashboardLayout>
                  <TechnicianEarningsPage />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
          path="/technician/earnings"
        />

        <Route
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["TECHNICIAN", "ADMIN"]}>
                <DashboardLayout>
                  <TechnicianProfilePage />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
          path="/technician/profile"
        />

        {/* Admin Role Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["ADMIN"]}>
                <DashboardLayout>
                  <AdminDashboardPage />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
          path="/admin/dashboard"
        />

        <Route
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["ADMIN"]}>
                <DashboardLayout>
                  <AdminKYCVerificationPage />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
          path="/admin/technicians/verification"
        />

        <Route
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["ADMIN"]}>
                <DashboardLayout>
                  <AdminBookingsPage />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
          path="/admin/bookings"
        />

        {/* Catch-All Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
};
