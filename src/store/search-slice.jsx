import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        loading: false,
        query: '',
        results: [],
        history: [],
        error: null,
    },
    reducers: {
        setQuery(state, action) {
            state.query = action.payload.query;
        },
        setResults(state, action) {
            state.results = action.payload.results;
            state.loading = false;
            state.error = null;
        },
        setLoading(state, action) {
            state.loading = action.payload.loading;
        },
        setError(state, action) {
            state.error = action.payload.error;
            state.loading = false;
        },
        clearResults(state) {
            state.results = [];
            state.query = '';
            state.error = null;
        },
        addHistory(state, action) {
            const newQuery = action.payload.search;
            if (!state.history.includes(newQuery)) {
                state.history = [newQuery, ...state.history];
            }
        },
        clearHistory(state) {
            state.history = [];
        }
    }
});

export const {
    setQuery,
    setResults,
    setLoading,
    setError,
    clearResults,
    addHistory,
    clearHistory
} = searchSlice.actions;

export default searchSlice;
