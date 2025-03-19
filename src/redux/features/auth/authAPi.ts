import { apiSlice } from "../api/apiSlice";
import { setAccessToken } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // A mutation that will be used to login a user
    login: builder.mutation({
      query: (credential) => ({
        url: "/auth/login",
        method: "POST",
        credentials: "include",
        body: credential,
      }),
      // ! args: holding the credentials
      // ! queryFulfilled: holding the response from the server
      // ! dispatch: a function that can be used to dispatch actions
      async onQueryStarted(__args, { dispatch, queryFulfilled }) {
        try {
          const { data: loginApiResponse } = await queryFulfilled;
          dispatch(setAccessToken(loginApiResponse.data.accessToken));
        } catch (error) {
          return Promise.reject(error);
        }
      },
    }),

    // A mutation that will be used to register a new user
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authApi;
