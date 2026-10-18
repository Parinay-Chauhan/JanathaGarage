import { baseApi } from "../../../api/baseApi";
import {
  ApiResponse,
  PaginatedResult,
  PlatformStats,
  TechnicianProfile,
  VerificationStatus,
} from "../../../types/api.types";

export interface UpdateKYCStatusRequest {
  id: string;
  status: VerificationStatus;
  rejectionReason?: string;
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPendingKYCApplications: builder.query<
      ApiResponse<PaginatedResult<TechnicianProfile>>,
      { status?: string; page?: number; limit?: number } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.status) queryParams.append("status", params.status);
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        return `/admin/technicians/kyc/pending${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
      },
      providesTags: ["AdminKYC"],
    }),

    getTechnicianKYCDetails: builder.query<ApiResponse<TechnicianProfile>, string>({
      query: (id) => `/admin/technicians/${id}/kyc`,
      providesTags: (_result, _error, id) => [{ type: "AdminKYC", id }],
    }),

    updateTechnicianKYCStatus: builder.mutation<
      ApiResponse<TechnicianProfile>,
      UpdateKYCStatusRequest
    >({
      query: ({ id, ...body }) => ({
        url: `/admin/technicians/${id}/kyc`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["AdminKYC", "Technicians", "AdminStats"],
    }),

    getPlatformStats: builder.query<ApiResponse<PlatformStats>, void>({
      query: () => "/admin/dashboard/stats",
      providesTags: ["AdminStats"],
    }),

    getAdminUsers: builder.query<
      ApiResponse<PaginatedResult<any>>,
      { role?: string; search?: string; page?: number; limit?: number; isActive?: boolean } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.role) queryParams.append("role", params.role);
        if (params?.search) queryParams.append("search", params.search);
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.isActive !== undefined) queryParams.append("isActive", params.isActive.toString());
        return `/admin/users${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
      },
      providesTags: ["AdminUsers"],
    }),

    toggleUserStatus: builder.mutation<ApiResponse<any>, { id: string; isActive: boolean }>({
      query: ({ id, isActive }) => ({
        url: `/admin/users/${id}/status`,
        method: "PATCH",
        body: { isActive },
      }),
      invalidatesTags: ["AdminUsers", "AdminStats"],
    }),

    getAdminPayments: builder.query<
      ApiResponse<PaginatedResult<any>>,
      { status?: string; search?: string; page?: number; limit?: number } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.status) queryParams.append("status", params.status);
        if (params?.search) queryParams.append("search", params.search);
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        return `/admin/payments${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
      },
      providesTags: ["AdminPayments"],
    }),

    processRefund: builder.mutation<ApiResponse<any>, { id: string; refundReason?: string }>({
      query: ({ id, refundReason }) => ({
        url: `/admin/payments/${id}/refund`,
        method: "POST",
        body: { refundReason },
      }),
      invalidatesTags: ["AdminPayments", "AdminStats"],
    }),
  }),
});

export const {
  useGetPendingKYCApplicationsQuery,
  useGetTechnicianKYCDetailsQuery,
  useUpdateTechnicianKYCStatusMutation,
  useGetPlatformStatsQuery,
  useGetAdminUsersQuery,
  useToggleUserStatusMutation,
  useGetAdminPaymentsQuery,
  useProcessRefundMutation,
} = adminApi;
