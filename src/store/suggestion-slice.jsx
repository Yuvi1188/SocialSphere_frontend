import { createSlice } from "@reduxjs/toolkit"

const suggestionSlice = createSlice({
    name: 'suggestion',
    initialState: {
        suggestions: [],
    },
    reducers: {
        setSuggestionsReducer(state, action) {
            state.suggestions = action.payload.suggestions;
        }
    }
});

export const suggestionActions = suggestionSlice.actions;

export default suggestionSlice;