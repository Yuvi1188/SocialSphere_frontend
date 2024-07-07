import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/post-action';
import Reel from './Reel';

const Reels = () => {
    const dispatch = useDispatch();
    const { posts, hasMore, page, loading } = useSelector(state => state.post);
    const reels = posts.filter(post => post.isReel);
    const observer = useRef();

    useEffect(() => {
        if (posts.length === 0) {
            dispatch(fetchPosts(page));
        }
    }, [dispatch]);

    const lastReelElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                dispatch(fetchPosts(page + 1));
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore, dispatch, page]);

    return (
        <div className="flex-1 h-screen bg-black text-white p-4 overflow-y-scroll">
            <div className="flex flex-col items-center space-y-4">
                {loading && page === 1 ? (
                    <p>Loading...</p>
                ) : reels.length > 0 ? (
                    reels.map((reel, index) => {
                        if (reels.length === index + 1) {
                            return <Reel ref={lastReelElementRef} key={reel._id} reel={reel} />;
                        } else {
                            return <Reel key={reel._id} reel={reel} />;
                        }
                    })
                ) : (
                    <p>No reels available</p>
                )}
                {loading && page > 1 && <p>Loading more...</p>}
            </div>
        </div>
    );
};

export default Reels;
