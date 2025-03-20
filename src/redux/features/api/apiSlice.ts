import { RootState } from "@/redux/store/store";
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setAccessToken } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithTokenRefresh = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401 || result.error?.status === 500) {
    console.log("Token expired, refreshing token...");
    // Refresh token
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );

    const refreshData = refreshResult.data as {
      data: { accessToken: string };
      success: boolean;
      message: string;
    };
    console.log(refreshData);

    if (refreshData) {
      // Set new access token
      api.dispatch(setAccessToken(refreshData.data.accessToken));
      // Retry the original request
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "gym-management-api",
  baseQuery: baseQueryWithTokenRefresh,
  tagTypes: [],
  endpoints: () => ({}),
});
