import { baseApi } from "../../../api/baseApi";
import { ApiResponse, User } from "../../../types/api.types";

export interface SyncUserRequest {
  firebaseIdToken: string;
  fullName?: string;
  authProvider: "firebase";
}

export interface SyncUserResponse {
  user: User;
  accessToken: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    syncUser: builder.mutation<ApiResponse<SyncUserResponse>, SyncUserRequest>({
      query: (body) => ({
        url: "/users/sync",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    getCurrentUser: builder.query<ApiResponse<User>, void>({
      query: () => "/users/me",
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation<ApiResponse<User>, { fullName: string }>({
      query: (body) => ({
        url: "/users/update-profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useSyncUserMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
} = authApi;
