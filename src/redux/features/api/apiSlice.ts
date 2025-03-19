import { RootState } from "@/redux/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAccessToken } from "../auth/authSlice";

// // Custom baseQuery with token refresh logic
// const customBaseQuery = async <T extends FetchArgs, Q extends {}>(
//   args: T,
//   api: BaseQueryApi,
//   extraOptions: Q
// ) => {
//   const refreshToken = useRefreshTokenMutation;
//   // Fetch the initial result
//   let result = await fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_APP_BASE_URL,
//     credentials: "include",
//     prepareHeaders: (headers, { getState }) => {
//       const token = (getState() as TAuthState).accessToken;
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   })(args, api, extraOptions);

//   // If the request fails with a 401 error, try refreshing the token
//   if (result.error && result.error.status === 401) {
//     // Dispatch refreshToken mutation to get a new access token
//     const refreshTokenResult = api.dispatch(refreshToken());
//     console.log("🚀 ~ refreshTokenResult:", refreshTokenResult);

//     if (refreshTokenResult.error) {
//       return result; // Return the original error if refreshing the token fails
//     }

//     // Store the new access token in Redux
//     const newAccessToken = refreshTokenResult.data.accessToken;
//     api.dispatch(setAccessToken(newAccessToken));

//     // Retry the original request with the new access token
//     result = await fetchBaseQuery({
//       baseUrl: import.meta.env.VITE_APP_BASE_URL,
//       credentials: "include",
//       prepareHeaders: (headers) => {
//         headers.set("Authorization", `Bearer ${newAccessToken}`);
//         return headers;
//       },
//     })(args, api, extraOptions);
//   }

//   return result; // Return the final result (success or failure)
// };

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithTokenRefresh = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    console.log("Token expired, refreshing token...");
    // Refresh token
    const RefreshTokenResponse = await baseQuery(
      "/users/refresh-token",
      api,
      extraOptions
    );
    api.dispatch(setAccessToken(RefreshTokenResponse?.data?.accessToken));
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "gym-management-api",
  baseQuery: baseQueryWithTokenRefresh,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
