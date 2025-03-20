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

    logout: (state) => {
      state.accessToken = "";
    },
  },
});

export const { setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
