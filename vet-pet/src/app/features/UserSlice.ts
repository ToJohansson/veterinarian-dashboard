import { createSlice } from "@reduxjs/toolkit";

import React from 'react'

const UserSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});
export const {login, logout} = UserSlice.actions;
export const selectUser = (state: any) => state.user.user;
export default UserSlice.reducer;