import { setQuery, setResults, setLoading, setError, clearResults, addHistory, clearHistory } from './search-slice';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosConfig';

export const fetchSearchResults = (query) => {
    return async (dispatch) => {
        if (!query) {
            dispatch(clearResults());
            return;
        }

        dispatch(setLoading({ loading: true }));
        dispatch(setQuery({ query }));

        try {
            const { data } = await axiosInstance.get(`/users/search?query=${query}`);
            dispatch(setResults({ results: data.results }));
            // dispatch(addHistory({ query }));
        } catch (error) {
            dispatch(setError({ error: error.message }));
            toast.error('Failed to fetch search results');
        }
    };
};

export const clearSearchHistory = () => {
    return (dispatch) => {
        dispatch(clearHistory());
    };
};
