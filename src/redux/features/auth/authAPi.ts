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

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),

      async onQueryStarted(__args, { dispatch }) {
        dispatch(setAccessToken(""));
      },
    }),

    refreshToken: builder.mutation({
      query: () => ({ url: "/auth/refresh-token", method: "POST" }),

      async onQueryStarted(__args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAccessToken(data.data.accessToken));
        } catch (error) {
          return Promise.reject(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation, useLogoutMutation } =
  authApi;
