import { setPosts, setLoading, addPost, deletePost, setNewPostLoading } from './post-slice';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosConfig';

export const fetchPosts = (page = 1) => {
    return async (dispatch, getState) => {
        const { post } = getState();
        if (post.loading) return;
        if (page > post.page && !post.hasMore) return;

        dispatch(setLoading({ loading: true }));
        try {
            const { data } = await axiosInstance.get(`/posts/getposts?page=${page}`);
            dispatch(setPosts({ posts: data.posts, hasMore: data.hasMore, page: data.page }));
        } catch (error) {
            toast.error('Failed to fetch posts');
            dispatch(setError({ error: error.message }));
        } finally {
            dispatch(setLoading({ loading: false }));
        }
    };
};

export const createPost = (formData) => {
    return async (dispatch) => {
        try {
            dispatch(setNewPostLoading({ loading: true }));
            const { data } = await axiosInstance.post('/posts/createpost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch(addPost({ post: data.post }));
            toast.success('Post created successfully');
        } catch (error) {
            toast.error('Failed to create post');
        } finally {
            dispatch(setNewPostLoading({ loading: false }));
        }
    };
};

export const removePost = (postId) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading({ loading: true }));
            await axiosInstance.delete(`/posts/${postId}`);
            dispatch(deletePost({ postId }));
            toast.success('Post deleted successfully');
        } catch (error) {
            toast.error('Failed to delete post');
        } finally {
            dispatch(setLoading({ loading: false }));
        }
    };
};
