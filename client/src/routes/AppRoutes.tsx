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
import { ServiceDetailsPage } from "../pages/ServiceDetailsPage";
import { TechniciansPage } from "../pages/TechniciansPage";
import { TechnicianDetailsPage } from "../pages/TechnicianDetailsPage";
import { AboutPage } from "../pages/AboutPage";
import { HelpPage } from "../pages/HelpPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

// Customer Pages
import { CustomerDashboardPage } from "../features/customer/pages/CustomerDashboardPage";
import { CustomerBookingsPage } from "../features/customer/pages/CustomerBookingsPage";
import { BookingDetailsPage } from "../features/bookings/pages/BookingDetailsPage";
import { CustomerProfilePage } from "../features/customer/pages/CustomerProfilePage";
import { CustomerAddressesPage } from "../features/customer/pages/CustomerAddressesPage";
import { BookingFlowPage } from "../features/bookings/pages/BookingFlowPage";

// Technician Pages
import { TechnicianDashboardPage } from "../features/technician-dashboard/pages/TechnicianDashboardPage";
import { TechnicianJobsPage } from "../features/technician-dashboard/pages/TechnicianJobsPage";
import { TechnicianJobDetailsPage } from "../features/technician-dashboard/pages/TechnicianJobDetailsPage";
import { TechnicianAvailabilityPage } from "../features/technician-dashboard/pages/TechnicianAvailabilityPage";
import { TechnicianProfilePage } from "../features/technician-dashboard/pages/TechnicianProfilePage";
import { TechnicianServicesPage } from "../features/technician-dashboard/pages/TechnicianServicesPage";
import { TechnicianEarningsPage } from "../features/technician-dashboard/pages/TechnicianEarningsPage";

// Admin Pages
import { AdminDashboardPage } from "../features/admin/pages/AdminDashboardPage";
import { AdminKYCVerificationPage } from "../features/admin/pages/AdminKYCVerificationPage";
import { AdminBookingsPage } from "../features/admin/pages/AdminBookingsPage";
import { AdminUsersPage } from "../features/admin/pages/AdminUsersPage";
import { AdminPaymentsPage } from "../features/admin/pages/AdminPaymentsPage";

// Error & Common State Pages
import { NotFoundPage } from "../pages/NotFoundPage";
import { UnauthorizedPage } from "../pages/UnauthorizedPage";
import { MobileBottomNav } from "../components/layout/MobileBottomNav";

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
          path="/services/:slug"
          element={
            <>
              <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />
              <main className="min-h-screen">
                <ServiceDetailsPage onOpenAuthModal={() => setAuthModalOpen(true)} />
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
          path="/technicians/:id"
          element={
            <>
              <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />
              <main className="min-h-screen">
                <TechnicianDetailsPage onOpenAuthModal={() => setAuthModalOpen(true)} />
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

        <Route
          path="/help"
          element={
            <>
              <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />
              <main className="min-h-screen">
                <HelpPage />
              </main>
              <Footer />
            </>
          }
        />

        {/* Dedicated Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dedicated Booking Funnel */}
        <Route
          path="/book/:serviceId"
          element={
            <>
              <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />
              <main className="min-h-screen">
                <BookingFlowPage />
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
                  <CustomerAddressesPage />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
          path="/customer/addresses"
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
                  <TechnicianJobDetailsPage />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
          path="/technician/jobs/:id"
        />

        <Route
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["TECHNICIAN", "ADMIN"]}>
                <DashboardLayout>
                  <TechnicianAvailabilityPage />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
          path="/technician/availability"
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

        <Route
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["ADMIN"]}>
                <DashboardLayout>
                  <AdminUsersPage />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
          path="/admin/users"
        />

        <Route
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["ADMIN"]}>
                <DashboardLayout>
                  <AdminPaymentsPage />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
          path="/admin/payments"
        />

        {/* Unauthorized / Access Restricted Page */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Explicit 404 Route */}
        <Route path="/404" element={<NotFoundPage />} />

        {/* Catch-All 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Responsive Mobile Bottom Navigation Bar */}
      <MobileBottomNav onOpenAuthModal={() => setAuthModalOpen(true)} />

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
};
