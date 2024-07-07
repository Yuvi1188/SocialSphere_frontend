// store/storySlice.js
import { createSlice } from '@reduxjs/toolkit';

const storySlice = createSlice({
    name: 'stories',
    initialState: {
        stories: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchStoriesStart: (state) => {
            state.loading = true;
        },
        fetchStoriesSuccess: (state, action) => {
            state.loading = false;
            state.stories = action.payload;
        },
        fetchStoriesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addStorySuccess: (state, action) => {
            state.stories.unshift(action.payload);
        },
    },
});

export const { fetchStoriesStart, fetchStoriesSuccess, fetchStoriesFailure, addStorySuccess } = storySlice.actions;
export default storySlice;