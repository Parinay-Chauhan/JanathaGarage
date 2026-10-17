import { baseApi } from "../../../api/baseApi";
import { ApiResponse, Review } from "../../../types/api.types";

export interface CreateReviewRequest {
  bookingId: string;
  rating: number;
  comment?: string;
}

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<ApiResponse<Review>, CreateReviewRequest>({
      query: ({ bookingId, ...body }) => ({
        url: `/bookings/${bookingId}/review`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Reviews", "Bookings", "Technicians"],
    }),

    getTechnicianReviews: builder.query<ApiResponse<Review[]>, string>({
      query: (technicianId) => `/technicians/${technicianId}/reviews`,
      providesTags: ["Reviews"],
    }),
  }),
});

export const { useCreateReviewMutation, useGetTechnicianReviewsQuery } = reviewsApi;
