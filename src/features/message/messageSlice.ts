import type { PayloadAction } from "@reduxjs/toolkit"
import type { AppThunk, RootState } from "../../app/store"
import { createAppSlice } from "../../app/createAppSlice"

export type Message = {
    message: string
}

export const initialState: Message = {
    message: ''
}

export const messageSlice = createAppSlice({
    name:"message",
    initialState,
    reducers: {
        updateMessage:(state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
        clearMessage:(state) => {
            state.message = '';
        },
    }
});

export const { updateMessage, clearMessage } = messageSlice.actions;

export const selectMessage = (state: RootState) => state.message;

// Thunk to handle timed message clearing
export const setMessageWithTimeout = (newMessage: string): AppThunk => (dispatch) => {
    dispatch(updateMessage(newMessage));
    setTimeout(() => {
        dispatch(clearMessage());
    }, 1000);
}

export default messageSlice.reducer;