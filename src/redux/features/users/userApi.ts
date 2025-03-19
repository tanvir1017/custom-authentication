import { apiSlice } from "../api/apiSlice";

const userAPi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetMeQuery } = userAPi;
