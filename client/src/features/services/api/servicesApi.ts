import { baseApi } from "../../../api/baseApi";
import { ApiResponse, Service, ServiceCategory } from "../../../types/api.types";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ApiResponse<ServiceCategory[]>, void>({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),

    getCategoryBySlug: builder.query<ApiResponse<ServiceCategory>, string>({
      query: (slug) => `/categories/${slug}`,
      providesTags: (_result, _error, slug) => [{ type: "Categories", id: slug }],
    }),

    getServices: builder.query<ApiResponse<Service[]>, { categoryId?: string; search?: string } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params && params.categoryId && params.categoryId !== "ALL") {
          queryParams.append("categoryId", params.categoryId);
        }
        if (params && params.search) {
          queryParams.append("search", params.search);
        }
        return `/services${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
      },
      providesTags: ["Services"],
    }),

    getServiceById: builder.query<ApiResponse<Service>, string>({
      query: (id) => `/services/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Services", id }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryBySlugQuery,
  useGetServicesQuery,
  useGetServiceByIdQuery,
} = servicesApi;
