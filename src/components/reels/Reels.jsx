import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/post-action';
import Reel from './Reel';
import Loader from "../layout/loader/Loader";

const Reels = () => {
    const dispatch = useDispatch();
    const { posts, hasMore, page, loading } = useSelector(state => state.post);
    const reels = posts.filter(post => post.isReel);
    const observer = useRef();
    const [activeReelId, setActiveReelId] = useState(null);

    useEffect(() => {
        if (posts.length === 0) {
            dispatch(fetchPosts(page));
        }
    }, [dispatch, page, posts.length]);

    useEffect(() => {
        if (activeReelId) {
            // Stop all other reels
            reels.forEach(reel => {
                if (reel._id !== activeReelId) {
                    const reelElement = document.getElementById(reel._id);
                    if (reelElement) {
                        const video = reelElement.querySelector('video');
                        if (video) video.pause();
                    }
                }
            });
        }
    }, [activeReelId, reels]);

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
                    <Loader />
                ) : reels.length > 0 ? (
                    reels.map((reel, index) => {
                        const isLastReel = reels.length === index + 1;
                        return (
                            <Reel
                                id={reel._id}
                                ref={isLastReel ? lastReelElementRef : null}
                                key={reel._id}
                                reel={reel}
                                isActive={reel._id === activeReelId}
                                setActiveReelId={setActiveReelId}
                            />
                        );
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
