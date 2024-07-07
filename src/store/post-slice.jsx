import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        loading: false,
        posts: [],
        hasMore: true,
        page: 1,
        newPostLoading: false,
    },
    reducers: {
        setPosts(state, action) {
            if (action.payload.page === 1) {
                state.posts = action.payload.posts;
            } else {
                state.posts = [...state.posts, ...action.payload.posts];
            }
            state.hasMore = action.payload.hasMore;
            state.page = action.payload.page;
        },
        setLoading(state, action) {
            state.loading = action.payload.loading;
        },
        addPost(state, action) {
            state.posts.unshift(action.payload.post);
            state.newPostLoading = false;
        },
        deletePost(state, action) {
            state.posts = state.posts.filter(post => post._id !== action.payload.postId);
        },
        setNewPostLoading(state, action) {
            state.newPostLoading = action.payload.loading;
        }
    }
});

export const {
    setPosts,
    setLoading,
    addPost,
    deletePost,
    setNewPostLoading
} = postSlice.actions;

export default postSlice;
