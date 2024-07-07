import { followActions } from './follow-slice';
import axiosInstance from "../axiosConfig";
import { toast } from 'react-toastify';

export const followUser = (followingId) => {
    return async (dispatch, getState) => {
        dispatch(followActions.setLoading(true));

        const { user } = getState().user;

        try {
            const response = await axiosInstance.post('/follow/addfollowing', {
                followingId,
                userId: user._id
            });

            dispatch(followActions.addFollowing(followingId));

            toast.success('Followed successfully');
            return Promise.resolve();
        } catch (error) {
            console.error('Failed to follow user', error);
            toast.error('Failed to follow user. Please try again.');
            dispatch(followActions.setLoading(false));
            return Promise.reject(error);
        }
    }
}

export const unfollowUser = (followingId) => {
    return async (dispatch, getState) => {
        dispatch(followActions.setLoading(true));

        const { user } = getState().user;

        try {
            await axiosInstance.delete(`/follow/removefollowing/${followingId}`, {
                data: { userId: user._id }
            });

            dispatch(followActions.removeFollowing({ id: followingId }));

            toast.success('Unfollowed successfully');
            return Promise.resolve();
        } catch (error) {
            console.error('Failed to unfollow user', error);
            toast.error('Failed to unfollow user. Please try again.');
            dispatch(followActions.setLoading(false));
            return Promise.reject(error);
        }
    }
}

export const fetchFollowers = (Id) => {
    return async (dispatch) => {
        dispatch(followActions.setFollowers({ loading: true, follower: [], buttonLoading: true }));

        try {
            const response = await axiosInstance.get(`/follow/getfollowers/${Id}`);
            console.log(response);
            const followers = response.data.followers;

            dispatch(followActions.setFollowers({
                loading: false,
                follower: followers,
                buttonLoading: false,
            }));


            return Promise.resolve();
        } catch (error) {
            console.error('Failed to update followers', error);
            toast.error('Failed to update followers. Please try again.');
            dispatch(followActions.setFollowers({ loading: false, follower: [], buttonLoading: false }));
            return Promise.reject(error);
        }
    }
}

export const fetchFollowings = (Id) => {
    return async (dispatch) => {
        console.log(Id);
        dispatch(followActions.setFollowings({ loading: true, following: [], buttonLoading: true }));

        try {
            const response = await axiosInstance.get(`/follow/getfollowings/${Id}`);
            const followings = response.data.followings;

            dispatch(followActions.setFollowings({
                loading: false,
                following: followings,
                buttonLoading: false,
            }));


            return Promise.resolve();
        } catch (error) {
            console.error('Failed to update followings', error);
            toast.error('Failed to update followings. Please try again.');
            dispatch(followActions.setFollowings({ loading: false, following: [], buttonLoading: false }));
            return Promise.reject(error);
        }
    }
}