import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post';
import { fetchPosts } from '../../store/post-action';

const PostsList = () => {
    const dispatch = useDispatch();
    const { posts, loading, hasMore, page } = useSelector(state => state.post);
    console.log(posts)
    useEffect(() => {
        if (posts.length === 0) {
            dispatch(fetchPosts(page));
        }
    }, [dispatch, posts, page]);

    const loadMorePosts = () => {
        if (hasMore && !loading) {
            dispatch(fetchPosts(page + 1));
        }
    };

    return (
        <>
            {posts.map(post => (
                <Post key={post._id} post={post} />
            ))}
            {loading && <p>Loading...</p>}
            {hasMore && !loading && <button onClick={loadMorePosts}>Load More</button>}
        </>
    );
};

export default PostsList;
