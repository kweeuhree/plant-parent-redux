import type { PayloadAction } from "@reduxjs/toolkit";
// import type { AppThunk, RootState } from "../../app/store"
import { createAppSlice } from "../../app/createAppSlice";

import { initialState } from "./";

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (
      state,
      action: PayloadAction<{
        id: number;
        email: string;
        password: string;
        dateCreated: string;
      }>,
    ) => {
      const { id, email, password, dateCreated } = action.payload;
      console.log(`User logged in.`);
      state.userId = id;
      state.email = email;
      state.hashedPassword = password;
      state.dateCreated = dateCreated;
      state.isAuthenticated = true;
    },
    userLogout: state => {
      return { ...initialState };
    },
    changePassword: (state, action: PayloadAction<{ newPassword: string }>) => {
      console.log(
        `Received an attempt to change password to [${action.payload.newPassword}]`,
      );
      state.hashedPassword = action.payload.newPassword;
    },
  },
  selectors: {
    selectAuthStatus: state => state.isAuthenticated,
    selectUser: state => state,
  },
});

export const { userLogin, userLogout, changePassword } = userSlice.actions;

export const { selectUser, selectAuthStatus } = userSlice.selectors;
