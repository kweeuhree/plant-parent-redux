import type { PayloadAction } from "@reduxjs/toolkit"
// import type { AppThunk, RootState } from "../../app/store"
import { createAppSlice } from "../../app/createAppSlice"

export type User = {
    userId: number,
    dateCreated: string,
    email: string,
    hashedPassword: string,
    isAuthenticated: boolean,
    Flash: string
}

export const initialState: User = {
    userId: -1,
    dateCreated: '',
    email: '',
    hashedPassword: '',
    isAuthenticated: false,
    Flash: "",
}

export const userSlice = createAppSlice({
    name:"user",
    initialState,
    reducers: {
        userLogin:(state, action: PayloadAction<{id: number, email: string, password: string, dateCreated: string}>) => {
            const { id, email, password, dateCreated } = action.payload;
            console.log(`User logged in.`);
            state.userId = id;
            state.email = email;
            state.hashedPassword = password;
            state.dateCreated = dateCreated;
            state.isAuthenticated = true;
        },
        userLogout:(state) => {
            return { ...initialState };
        },
        changePassword:(state, action: PayloadAction<{newPassword: string}>) => {
            console.log(`Received an attempt to change password to [${action.payload.newPassword}]`);
            state.hashedPassword = action.payload.newPassword;
        },
    },
    selectors: {
        selectAuthStatus: state => state.isAuthenticated,
        selectUser: state => state,
      },
});

export const { userLogin, userLogout, changePassword } = userSlice.actions;

export const { selectUser, selectAuthStatus } = userSlice.selectors


export default userSlice.reducer;

const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

export const getAccountDays = (dateCreated: string): number => {
    const accountCreated = new Date(dateCreated).getTime();
    const today = new Date().getTime();

    return Math.floor((today - accountCreated) / oneDayInMilliseconds);

  }