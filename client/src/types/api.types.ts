// ==========================================
// CORE ENUMS (Synchronized with Backend Prisma Schema)
// ==========================================

export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export type BookingStatus =
  | "PENDING"
  | "ACCEPTED"
  | "EN_ROUTE"
  | "ARRIVED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type BookingType =
  | "PHYSICAL_VISIT"
  | "REMOTE_VIDEO_ASSIST"
  | "REMOTE_CHAT_ASSIST";

export type VerificationStatus =
  | "NOT_SUBMITTED"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "VERIFIED"
  | "REJECTED";

export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";

export type PaymentMethod = "ONLINE" | "CASH" | "UPI";

// ==========================================
// DATA MODELS
// ==========================================

export interface User {
  id: string;
  phone: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  customerProfile?: CustomerProfile | null;
  technicianProfile?: TechnicianProfile | null;
}

export interface CustomerProfile {
  id: string;
  userId: string;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  user?: Partial<User>;
}

export interface TechnicianProfile {
  id: string;
  userId: string;
  bio?: string | null;
  experienceYears: number;
  baseVisitingCharge: number | string;
  serviceRadiusKm: number;
  latitude?: number | null;
  longitude?: number | null;
  isOnline: boolean;
  isAvailable: boolean;
  kycStatus: VerificationStatus;
  docType?: string | null;
  docNumber?: string | null;
  docUrl?: string | null;
  rejectionReason?: string | null;
  user?: Partial<User>;
  servicesOffered?: TechnicianService[];
  avgRating?: number;
  totalReviews?: number;
  reviews?: Review[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  services?: Service[];
}

export interface Service {
  id: string;
  categoryId: string;
  title: string;
  defaultPrice: number | string;
  category?: ServiceCategory;
  description?: string | null;
  durationMinutes?: number | null;
  rating?: number;
  reviewsCount?: number;
  image?: string;
}

export interface TechnicianService {
  technicianId: string;
  serviceId: string;
  customPrice?: number | string | null;
  service?: Service;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  customerId: string;
  technicianId?: string | null;
  serviceId: string;
  status: BookingStatus;
  problemDescription: string;
  scheduledAt: string;
  startOtp?: string | null;
  agreedPrice: number;
  serviceAddress?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  service?: Service;
  customer?: {
    id: string;
    user?: { fullName: string; phone: string };
  };
  technician?: {
    id: string;
    experienceYears?: number;
    user?: { fullName: string; phone: string };
  } | null;
  payment?: Payment | null;
  review?: Review | null;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number | string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string | null;
  invoiceUrl?: string | null;
  createdAt: string;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  bookingId: string;
  customerId: string;
  technicianId: string;
  createdAt: string;
  customer?: {
    user?: { fullName: string };
  };
}

// ==========================================
// API WRAPPERS & PAGINATION
// ==========================================

export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  bookings?: T[];
  technicians?: T[];
  pagination: PaginationMeta;
}

export interface PlatformStats {
  users: {
    total: number;
    customers: number;
    technicians: number;
  };
  kyc: {
    pendingVerification: number;
  };
  bookings: {
    total: number;
    completed: number;
  };
  revenue: {
    totalINR: number;
  };
}
