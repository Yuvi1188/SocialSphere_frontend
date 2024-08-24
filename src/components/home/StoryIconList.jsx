import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStories } from '../../store/story-action';
import StoryIcon from './StoryIcon';
import CreateStory from '../createStory/createStory';

const StoryIconList = () => {
    const dispatch = useDispatch();
    const { stories, loading, error } = useSelector((state) => state.stories);
    const { user } = useSelector((state) => state.user);
    const [newStory, setNewStory] = useState(false);

    useEffect(() => {
        if (user) {
            dispatch(fetchStories(user._id));
        }
    }, [dispatch, user]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Filter stories to get unique users
    const uniqueUsers = new Map();
    stories.forEach(story => {
        if (!uniqueUsers.has(story.user._id)) {
            uniqueUsers.set(story.user._id, story);
        }
    });

    return (
        <div className='flex items-center space-x-4 mt-10'>
            {/* Upload button with an image and "Write your Story" text below */}
            <div className='flex flex-col items-center'>
                <button
                    onClick={() => setNewStory(true)}
                    className="w-[3.9rem] h-[3.9rem] flex items-center justify-center rounded-full border-2 border-gray-300 text-white bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
                >
                    <img 
                        src={user.userImgUrl.url} 
                        alt="Upload Story" 
                        className='rounded-full'
                    />
                </button>
                <p className="text-sm text-gray-500 mt-1">Upload  Story</p>
            </div>

            {/* Story icons only if there are stories */}
            {uniqueUsers.size > 0 && (
                <div className='flex overflow-x-auto space-x-4'>
                    {Array.from(uniqueUsers.values()).map(story => (
                        <StoryIcon key={story.user._id} story={story} />
                    ))}
                </div>
            )}

            <CreateStory newStory={newStory} setNewStory={setNewStory} />
        </div>
    );
};

export default StoryIconList;
