import { baseApi } from "../../../api/baseApi";
import {
  ApiResponse,
  Booking,
  BookingStatus,
  PaginatedResult,
} from "../../../types/api.types";

export interface CreateBookingRequest {
  serviceId: string;
  problemDescription: string;
  scheduledAt: string;
  serviceAddress: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface UpdateBookingStatusRequest {
  id: string;
  status: BookingStatus;
  otp?: string;
}

export interface RespondBookingRequest {
  id: string;
  action: "ACCEPT" | "REJECT";
}

export const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<ApiResponse<Booking>, CreateBookingRequest>({
      query: (body) => ({
        url: "/bookings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Bookings", "AvailableJobs", "AdminStats"],
    }),

    getMyBookings: builder.query<
      ApiResponse<PaginatedResult<Booking>>,
      { status?: string; page?: number; limit?: number } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.status) queryParams.append("status", params.status);
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        return `/bookings/my-bookings${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
      },
      providesTags: ["Bookings"],
    }),

    getAvailableJobs: builder.query<ApiResponse<Booking[]>, void>({
      query: () => "/bookings/available-jobs",
      providesTags: ["AvailableJobs"],
    }),

    getBookingById: builder.query<ApiResponse<Booking>, string>({
      query: (id) => `/bookings/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Bookings", id }],
    }),

    respondToBooking: builder.mutation<ApiResponse<Booking>, RespondBookingRequest>({
      query: ({ id, action }) => ({
        url: `/bookings/${id}/respond`,
        method: "PATCH",
        body: { action },
      }),
      invalidatesTags: ["Bookings", "AvailableJobs"],
    }),

    updateBookingStatus: builder.mutation<ApiResponse<Booking>, UpdateBookingStatusRequest>({
      query: ({ id, status, otp }) => ({
        url: `/bookings/${id}/status`,
        method: "PATCH",
        body: { status, otp },
      }),
      invalidatesTags: ["Bookings", "AvailableJobs", "AdminStats"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useGetAvailableJobsQuery,
  useGetBookingByIdQuery,
  useRespondToBookingMutation,
  useUpdateBookingStatusMutation,
} = bookingsApi;
