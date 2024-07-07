import axiosInstance from '../axiosConfig';
import { fetchStoriesStart, fetchStoriesSuccess, fetchStoriesFailure, addStorySuccess } from './story-slice';
import { toast } from 'react-toastify';


export const fetchStories = (userId) => async (dispatch) => {
    dispatch(fetchStoriesStart());
    try {
        const response = await axiosInstance.get(`/story/getStories?userId=${userId}`);
        console.log(response)
        dispatch(fetchStoriesSuccess(response.data));
    } catch (error) {
        dispatch(fetchStoriesFailure(error.message));
    }
};
export const uploadStory = (formData) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('/story/uploadStory', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch(addStorySuccess(response.data.story));
        toast.success('Story Uploaded successfully');
    } catch (error) {
        console.error("Error uploading story:", error);
        toast.error('Failed to upload story');
    }
};