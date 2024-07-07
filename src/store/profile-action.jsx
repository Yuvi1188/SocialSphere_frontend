import { profileActions } from './profile-slice';
import axiosInstance from '../axiosConfig';

export const fetchUserProfile = (userId) => async (dispatch) => {
    dispatch(profileActions.fetchProfileStart());
    try {
        const response = await axiosInstance.get(`/users/profile/${userId}`);
        dispatch(profileActions.fetchProfileSuccess(response.data));
    } catch (error) {
        dispatch(profileActions.fetchProfileFailure(error.message));
    }
};