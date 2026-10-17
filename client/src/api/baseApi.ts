import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../app/store";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    credentials: "include", // Send and receive cookies automatically
    prepareHeaders: (headers, { getState }) => {
      // Pull access token from Redux auth slice or fallback to localStorage
      const state = getState() as RootState;
      const token = state.auth.accessToken || localStorage.getItem("jg_access_token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Services",
    "Categories",
    "Technicians",
    "Bookings",
    "AvailableJobs",
    "AdminKYC",
    "AdminStats",
    "Reviews",
  ],
  endpoints: () => ({}),
});
