import { TUser } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  currUser: null | TUser;
};

const initialState: TInitialState = {
  currUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currUser = action.payload;
    },
    removeUser: (state) => {
      state.currUser = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
