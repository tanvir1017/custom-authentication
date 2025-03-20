import { apiSlice } from "../api/apiSlice";
import { setUser } from "./userSlice";

const userAPi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      async onQueryStarted(__args, { dispatch, queryFulfilled }) {
        try {
          const { data: userApiResponse } = await queryFulfilled;
          dispatch(setUser(userApiResponse.data));
        } catch (error) {
          return Promise.reject(error);
        }
      },
    }),
  }),
});

export const { useGetMeQuery } = userAPi;
