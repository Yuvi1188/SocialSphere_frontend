// suggestion-action.jsx
import { suggestionActions } from './suggestion-slice';
import axiosInstance from "../axiosConfig";
import { toast } from 'react-toastify';

export const getSuggestions = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get('/follow/getsuggestions');
            const suggestions = response.data.suggestedUsers;
            dispatch(suggestionActions.setSuggestionsReducer({
                suggestions,
            }));

            return Promise.resolve();
        } catch (error) {
            console.error('Failed to get suggestions', error);
            toast.error('Failed to get suggestions. Please try again.');
            return Promise.reject(error);
        }
    }
}
