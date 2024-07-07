import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        isAuthenticated: false,
        user: {},
        buttonLoading: false,
    },
    reducers: {
        userReducer(state, action) {
            state.loading = action.payload.loading;
            if (action.payload.user) {
                state.user = action.payload.user;
            }
            state.isAuthenticated = action.payload.isAuthenticated;
            state.buttonLoading = action.payload.buttonLoading;
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice;