import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        loading: false,
        profile: null,

        buttonLoading: false,
    },
    reducers: {
        fetchProfileStart(state) {
            state.loading = true;

        },
        fetchProfileSuccess(state, action) {
            state.profile = action.payload;
            state.loading = false;

        },
        fetchProfileFailure(state, action) {
            state.loading = false;

        },
        updateFollowingStatus(state, action) {
            if (state.profile) {
                state.profile.isFollowing = action.payload;
            }
        },
        setButtonLoading(state, action) {
            state.buttonLoading = action.payload;
        },
        setProfile(state, action) {
            state.profile = action.payload.profile;
        }
    },
});

export const profileActions = profileSlice.actions;

export default profileSlice;