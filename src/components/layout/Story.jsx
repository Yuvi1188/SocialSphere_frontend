import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const Story = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { stories } = useSelector((state) => state.stories);
    const [activeStoryIndex, setActiveStoryIndex] = useState(0);

    useEffect(() => {
        const storyIndex = stories.findIndex(story => story._id === id);
        if (storyIndex === -1) {
            // Story not found, navigate back
            navigate(-1);
        } else {
            setActiveStoryIndex(storyIndex);
        }
    }, [id, stories, navigate]);

    const handlePrevious = () => {
        setActiveStoryIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setActiveStoryIndex(prevIndex => Math.min(prevIndex + 1, stories.length - 1));
    };

    const story = stories[activeStoryIndex];
    if (!story) {
        return <div>Story not found</div>;
    }

    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-90">
            <div className="relative w-full max-w-sm">
                {/* Conditionally render image or video */}
                {story.mediaType === 'image' ? (
                    <img
                        src={story.mediaUrl.url}
                        alt={story.user.username}
                        className="w-full h-auto object-cover"
            
                    />
                ) : story.mediaType === 'video' ? (
                    <video
                        src={story.mediaUrl.url}
                        className="w-full h-auto object-cover"
                         autoPlay= {true}
                    />
                ) : (
                    <div>Unsupported media type</div>
                )}
                <button
                    onClick={handlePrevious}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 p-4 text-white"
                >
                    &lt;
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 p-4 text-white"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Story;
