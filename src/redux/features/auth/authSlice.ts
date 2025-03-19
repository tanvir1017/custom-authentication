import { createSlice } from "@reduxjs/toolkit";

export type TAuthState = {
  accessToken: string;
};
const initialState: TAuthState = {
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;
