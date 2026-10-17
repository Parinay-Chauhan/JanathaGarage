import { baseApi } from "../../../api/baseApi";
import {
  ApiResponse,
  TechnicianProfile,
  TechnicianService,
} from "../../../types/api.types";

export interface SubmitKYCRequest {
  docType: string;
  docNumber: string;
  docUrl: string;
}

export interface UpdateAvailabilityRequest {
  isOnline?: boolean;
  isAvailable?: boolean;
}

export const techniciansApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTechnicians: builder.query<ApiResponse<TechnicianProfile[]>, { serviceId?: string } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params && params.serviceId) {
          queryParams.append("serviceId", params.serviceId);
        }
        return `/technicians${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
      },
      providesTags: ["Technicians"],
    }),

    getTechnicianById: builder.query<ApiResponse<TechnicianProfile>, string>({
      query: (id) => `/technicians/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Technicians", id }],
    }),

    updateAvailability: builder.mutation<ApiResponse<TechnicianProfile>, UpdateAvailabilityRequest>({
      query: (body) => ({
        url: "/technicians/me/availability",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Technicians", "User"],
    }),

    submitKYC: builder.mutation<ApiResponse<TechnicianProfile>, SubmitKYCRequest>({
      query: (body) => ({
        url: "/technicians/me/kyc",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Technicians", "User", "AdminKYC"],
    }),

    updateTechnicianServices: builder.mutation<
      ApiResponse<TechnicianService[]>,
      { services: Array<{ serviceId: string; customPrice?: number }> }
    >({
      query: (body) => ({
        url: "/technicians/me/services",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Technicians", "User"],
    }),
  }),
});

export const {
  useGetTechniciansQuery,
  useGetTechnicianByIdQuery,
  useUpdateAvailabilityMutation,
  useSubmitKYCMutation,
  useUpdateTechnicianServicesMutation,
} = techniciansApi;
