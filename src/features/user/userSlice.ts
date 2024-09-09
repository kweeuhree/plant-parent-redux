import type { PayloadAction } from "@reduxjs/toolkit"
// import type { AppThunk, RootState } from "../../app/store"
import { createAppSlice } from "../../app/createAppSlice"

export type User = {
    userId: number | null,
    dateCreated: Date | null,
    email: string,
    hashedPassword: string,
    isAuthenticated: boolean,
    Flash: string
}

export const initialState: User = {
    userId: null,
    dateCreated: null,
    email: '',
    hashedPassword: '',
    isAuthenticated: false,
    Flash: '',
}

export const userSlice = createAppSlice({
    name:"user",
    initialState,
    reducers: {
        userLogin:(state, action: PayloadAction<{id: number, email: string, password: string}>) => {
            const { id, email, password } = action.payload;
            state.userId = id;
            state.email = email;
            state.hashedPassword = password;
            state.isAuthenticated = true;
        },
        userLogout:(state) => {
            return { ...initialState };
        },
    },
    selectors: {
        selectAuthStatus: state => state.isAuthenticated,
        selectUser: state => state,
      },
});

export const { userLogin, userLogout } = userSlice.actions;

export const { selectUser, selectAuthStatus } = userSlice.selectors


export default userSlice.reducer;