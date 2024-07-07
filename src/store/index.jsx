import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import suggestionSlice from "./suggestion-slice";
import postSlice from "./post-slice";
import followSlice from "./follow-slice";
import profileSlice from "./profile-slice";
import messageSlice from "./message-slice";
import chatSlice from "./chat-slice";
import searchSlice from "./search-slice";
import storySlice from "./story-slice";
// Import additional slices as needed

// Combine all your slices into one root reducer
const rootReducer = combineReducers({
    user: userSlice.reducer,
    suggestion: suggestionSlice.reducer,
    post: postSlice.reducer,
    profile: profileSlice.reducer,
    follow: followSlice.reducer,
    message: messageSlice.reducer,
    chat: chatSlice.reducer,
    search: searchSlice.reducer,
    stories: storySlice.reducer
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
