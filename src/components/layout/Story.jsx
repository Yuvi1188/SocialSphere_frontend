// Story.js
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

    const story = stories[activeStoryIndex];
    if (!story) {
        return <div>Story not found</div>;
    }

    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-90">
            {/* Your story UI */}
        </div>
    );
};

export default Story;