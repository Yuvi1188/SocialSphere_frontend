import { createSlice } from "@reduxjs/toolkit";

const followSlice = createSlice({
    name: 'follow',
    initialState: {
        loading: false,
        following: [],
        follower: [],
        buttonLoading: false,
    },
    reducers: {
        setFollowers(state, action) {
            state.loading = action.payload.loading;
            state.follower = action.payload.follower;
            state.buttonLoading = action.payload.buttonLoading;
        },
        setFollowings(state, action) {
            state.loading = action.payload.loading;
            state.following = action.payload.following;
            state.buttonLoading = action.payload.buttonLoading;
        },
        addFollowing(state, action) {
            state.following.push(action.payload);
            state.buttonLoading = false;
        },
        removeFollowing(state, action) {
            state.following = state.following.filter(user => user.id !== action.payload.id);
            state.buttonLoading = false;
        },
        setLoading(state, action) {
            state.buttonLoading = action.payload;
        }
    }
});

export const followActions = followSlice.actions;

export default followSlice;