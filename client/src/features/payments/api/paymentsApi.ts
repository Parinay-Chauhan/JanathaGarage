import { baseApi } from "../../../api/baseApi";
import { ApiResponse, Payment, PaymentMethod, PaymentStatus } from "../../../types/api.types";

export interface CreatePaymentOrderRequest {
  bookingId: string;
  method?: PaymentMethod;
}

export interface VerifyPaymentRequest {
  paymentId: string;
  status: PaymentStatus;
  transactionId?: string;
}

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentOrder: builder.mutation<
      ApiResponse<{ paymentId: string; amount: number; currency: string; status: PaymentStatus }>,
      CreatePaymentOrderRequest
    >({
      query: (body) => ({
        url: "/payments/create-order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Bookings"],
    }),

    verifyPayment: builder.mutation<ApiResponse<Payment>, VerifyPaymentRequest>({
      query: ({ paymentId, ...body }) => ({
        url: `/payments/${paymentId}/verify`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Bookings", "AdminStats"],
    }),
  }),
});

export const { useCreatePaymentOrderMutation, useVerifyPaymentMutation } = paymentsApi;
